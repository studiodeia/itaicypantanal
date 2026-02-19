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
        asString(row.roomTypeName) ||
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

const PT_MONTHS = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

function formatDatePT(iso: string): string {
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  const year = Number.parseInt(parts[0]!, 10);
  const month = Number.parseInt(parts[1]!, 10) - 1;
  const day = Number.parseInt(parts[2]!, 10);
  if (!Number.isFinite(year) || month < 0 || month > 11 || !Number.isFinite(day)) return iso;
  return `${day} de ${PT_MONTHS[month]} de ${year}`;
}

function buildBookingDeepLink(
  baseUrl: string,
  checkIn: string,
  checkOut: string,
  adults: number,
  children: number,
): string {
  const separator = baseUrl.includes("?") ? "&" : "?";
  const pairs: string[] = [
    "currency=brl",
    "utm_source=site_itaicy",
    "utm_medium=chat",
    "utm_campaign=booking_engine",
    "utm_content=chat_rates",
    `checkin=${checkIn}`,
    `checkout=${checkOut}`,
    `adults=${adults}`,
  ];
  if (children > 0) {
    pairs.push(`kids=${children}`);
  }
  return `${baseUrl}${separator}${pairs.join("&")}`;
}

function buildRatesAnswer(
  hasResults: boolean,
  checkIn: string,
  checkOut: string,
  adults: number,
  bookingEngineUrl: string,
  disclaimer: string,
  preview: string[],
): string {
  const checkInPT = formatDatePT(checkIn);
  const checkOutPT = formatDatePT(checkOut);

  if (!hasResults) {
    return [
      `Não consegui recuperar tarifas em tempo real de ${checkInPT} a ${checkOutPT}.`,
      "Posso verificar:\n• Datas próximas (1 a 3 dias antes ou depois)?\n• Outra categoria de acomodação?\n\nOu consulte diretamente: " + bookingEngineUrl,
      disclaimer,
    ].join("\n\n");
  }

  const adultsLabel = adults === 1 ? "1 adulto" : `${adults} adultos`;

  return [
    `Tarifas encontradas para ${adultsLabel}, de ${checkInPT} a ${checkOutPT}:`,
    preview.map((p) => `• ${p}`).join("\n"),
    `Nosso pacote all inclusive inclui hospedagem, café da manhã, almoço, jantar e bebidas. Garanta sua vaga com as datas já preenchidas:\n${bookingEngineUrl}`,
    disclaimer,
  ].join("\n\n");
}

function getCloudbedsUnavailableMessage(config: AgentConfig): string {
  return `Você pode consultar tarifas e reservar diretamente em: ${config.bookingEngineUrl} — ou nossa equipe envia os valores por WhatsApp.`;
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
        const byCategory = new Map<
          string,
          { category: string; amount: number; currency: string }
        >();
        for (const item of normalized) {
          const key = item.category.trim();
          if (!key || item.amount === null) continue;
          const existing = byCategory.get(key);
          if (!existing || item.amount < existing.amount) {
            byCategory.set(key, { category: item.category, amount: item.amount, currency: item.currency });
          }
        }

        const preview = Array.from(byCategory.values())
          .sort((a, b) => a.amount - b.amount)
          .slice(0, 3)
          .map((row) => {
            const code = (row.currency || "BRL").toUpperCase();
            const formatted = new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: code,
              maximumFractionDigits: 0,
            }).format(row.amount);
            return `${row.category} (a partir de ${formatted})`;
          });

        const deepLinkUrl = buildBookingDeepLink(
          config.bookingEngineUrl,
          checkIn,
          checkOut,
          adults,
          children,
        );

        return {
          checkIn,
          checkOut,
          adults,
          children,
          roomType: roomType || null,
          currency,
          shouldHandoff: !hasResults,
          answer: buildRatesAnswer(
            hasResults,
            checkIn,
            checkOut,
            adults,
            deepLinkUrl,
            disclaimer,
            preview,
          ),
          disclaimer,
          bookingEngineUrl: deepLinkUrl,
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
