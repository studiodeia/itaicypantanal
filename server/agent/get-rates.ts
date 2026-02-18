import { tool } from "ai";
import { z } from "zod";
import type { AgentConfig } from "../../shared/agent-config";
import { cloudbedsClient, formatCloudbedsError } from "./cloudbeds";

type AnyRecord = Record<string, unknown>;

function isRecord(value: unknown): value is AnyRecord {
  return typeof value === "object" && value !== null;
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true") return true;
    if (normalized === "false") return false;
  }
  return null;
}

function extractRows(raw: unknown): AnyRecord[] {
  if (Array.isArray(raw)) {
    return raw.filter(isRecord);
  }
  if (!isRecord(raw)) {
    return [];
  }

  const candidates = [raw.data, raw.items, raw.results, raw.rates, raw.ratePlans];
  for (let index = 0; index < candidates.length; index += 1) {
    const candidate = candidates[index];
    if (Array.isArray(candidate)) {
      return candidate.filter(isRecord);
    }
  }

  return [];
}

function normalizeRatesRows(rows: AnyRecord[]) {
  return rows
    .map((row, index) => {
      const category =
        asString(row.category) ||
        asString(row.roomType) ||
        asString(row.room_type) ||
        asString(row.roomName) ||
        asString(row.name) ||
        `Categoria ${index + 1}`;

      const amount =
        asNumber(row.amount) ??
        asNumber(row.price) ??
        asNumber(row.rate) ??
        asNumber(row.value) ??
        asNumber(row.roomRate) ??
        asNumber(row.totalRate) ??
        asNumber((row.ratePlan as AnyRecord | undefined)?.amount);

      const currency =
        asString(row.currency) ||
        asString(row.currencyCode) ||
        asString(row.propertyCurrency) ||
        asString((row.ratePlan as AnyRecord | undefined)?.currency) ||
        "BRL";

      const roomsAvailable =
        asNumber(row.roomsAvailable) ??
        asNumber(row.available) ??
        asNumber(row.inventory) ??
        null;
      const isDerived = asBoolean(row.isDerived);

      return {
        category,
        amount,
        currency,
        roomsAvailable,
        ratePlanName:
          asString(row.ratePlanNamePublic) || asString(row.ratePlanNamePrivate) || null,
        roomTypeId: asString(row.roomTypeID) || null,
        isDerived: isDerived === true,
      };
    })
    .filter(
      (row) =>
        row.amount !== null &&
        row.amount > 0 &&
        (typeof row.roomsAvailable !== "number" || row.roomsAvailable > 0),
    );
}

function buildRatesAnswer(
  hasResults: boolean,
  bookingEngineUrl: string,
  disclaimer: string,
): string {
  if (!hasResults) {
    return [
      "Nao consegui recuperar tarifas em tempo real para esse periodo.",
      "Posso acionar nossa equipe para confirmar os valores.",
      disclaimer,
    ].join(" ");
  }

  return [
    `Encontrei tarifas atualizadas. Consulte e finalize no motor oficial: ${bookingEngineUrl}`,
    disclaimer,
  ].join(" ");
}

function getCloudbedsUnavailableMessage(config: AgentConfig): string {
  const enabledByEnv = (process.env.CLOUDBEDS_ENABLED || "").trim().toLowerCase() === "true";
  const hasClient = Boolean((process.env.CLOUDBEDS_CLIENT_ID || "").trim());
  const hasSecret = Boolean((process.env.CLOUDBEDS_CLIENT_SECRET || "").trim());
  const hasAccessToken = Boolean((process.env.CLOUDBEDS_ACCESS_TOKEN || "").trim());
  const hasRefreshToken = Boolean((process.env.CLOUDBEDS_REFRESH_TOKEN || "").trim());

  if (enabledByEnv && hasClient && hasSecret && !hasAccessToken && !hasRefreshToken) {
    return "A integracao Cloudbeds esta pendente de autorizacao OAuth. Posso te conectar com nossa equipe para confirmar tarifas agora.";
  }

  return config.fallback.apiUnavailable.pt;
}

export function createGetRatesTool(config: AgentConfig) {
  return tool({
    description:
      "Consulta tarifas no Cloudbeds para o periodo informado, retornando valores por categoria de acomodacao.",
    inputSchema: z
      .object({
        checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        adults: z.number().int().min(1).max(10).default(2),
        children: z.number().int().min(0).max(10).default(0),
        roomType: z.string().min(1).max(120).optional(),
        currency: z.string().min(3).max(3).default("BRL"),
        lang: z.enum(["pt", "en", "es"]).default("pt"),
      })
      .refine((value) => value.checkOut > value.checkIn, {
        message: "checkOut must be after checkIn",
      }),
    execute: async ({ checkIn, checkOut, adults, children, roomType, currency }) => {
      const ratesPath = process.env.CLOUDBEDS_RATES_PATH || "/getRatePlans";
      const disclaimer = config.disclaimers.price.pt;
      const propertyIds = process.env.CLOUDBEDS_PROPERTY_IDS?.trim() || "";

      if (!cloudbedsClient.isEnabled()) {
        const unavailable = getCloudbedsUnavailableMessage(config);
        return {
          checkIn,
          checkOut,
          adults,
          children,
          roomType: roomType || null,
          currency,
          shouldHandoff: true,
          answer: `${unavailable} ${disclaimer}`,
          disclaimer,
          bookingEngineUrl: config.bookingEngineUrl,
          rates: [],
          sourceRefs: [],
          confidenceScore: 0.2,
          groundingLevel: "none" as const,
          provider: "cloudbeds",
          providerStatus: "disabled",
        };
      }

      try {
        const raw = await cloudbedsClient.request<unknown>(ratesPath, {
          method: "GET",
          query: {
            startDate: checkIn,
            endDate: checkOut,
            adults,
            children,
            roomTypeID: roomType,
            propertyIDs: propertyIds || undefined,
            detailedRates: false,
            includePromoCode: true,
          },
        });

        const rows = extractRows(raw);
        const normalized = normalizeRatesRows(rows);
        const hasResults = normalized.length > 0;

        return {
          checkIn,
          checkOut,
          adults,
          children,
          roomType: roomType || null,
          currency,
          shouldHandoff: !hasResults,
          answer: buildRatesAnswer(hasResults, config.bookingEngineUrl, disclaimer),
          disclaimer,
          bookingEngineUrl: config.bookingEngineUrl,
          rates: normalized.slice(0, 6),
          sourceRefs: hasResults
            ? [
                {
                  source_id: `cloudbeds-rates:${checkIn}:${checkOut}`,
                  source_type: "reservation" as const,
                  title: "Cloudbeds tarifas",
                  score: 0.98,
                },
              ]
            : [],
          confidenceScore: hasResults ? 0.98 : 0.45,
          groundingLevel: hasResults ? ("full" as const) : ("none" as const),
          provider: "cloudbeds",
          providerStatus: "ok",
        };
      } catch (error) {
        const formatted = formatCloudbedsError(error);
        return {
          checkIn,
          checkOut,
          adults,
          children,
          roomType: roomType || null,
          currency,
          shouldHandoff: true,
          answer: `${config.fallback.apiUnavailable.pt} ${disclaimer}`,
          disclaimer,
          bookingEngineUrl: config.bookingEngineUrl,
          rates: [],
          sourceRefs: [],
          confidenceScore: 0.2,
          groundingLevel: "none" as const,
          provider: "cloudbeds",
          providerStatus: "error",
          providerError: formatted.message,
        };
      }
    },
  });
}
