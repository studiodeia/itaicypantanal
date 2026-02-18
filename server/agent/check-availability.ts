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

function getPrimaryCurrency(entry: AnyRecord): string {
  const propertyCurrency = entry.propertyCurrency;
  if (!Array.isArray(propertyCurrency)) return "";
  for (let index = 0; index < propertyCurrency.length; index += 1) {
    const item = propertyCurrency[index];
    if (!isRecord(item)) continue;
    const code = asString(item.currencyCode);
    if (code) return code;
  }
  return "";
}

function extractRows(raw: unknown): AnyRecord[] {
  if (Array.isArray(raw)) {
    return raw.filter(isRecord);
  }
  if (!isRecord(raw)) {
    return [];
  }

  const candidates = [raw.data, raw.items, raw.results, raw.rooms, raw.availability];
  for (let index = 0; index < candidates.length; index += 1) {
    const candidate = candidates[index];
    if (Array.isArray(candidate)) {
      const directRows = candidate.filter(isRecord);
      const flattenedRows: AnyRecord[] = [];

      for (let rowIndex = 0; rowIndex < directRows.length; rowIndex += 1) {
        const row = directRows[rowIndex];
        const propertyRooms = row.propertyRooms;
        if (!Array.isArray(propertyRooms)) {
          flattenedRows.push(row);
          continue;
        }

        const propertyCurrency = getPrimaryCurrency(row);
        for (let roomIndex = 0; roomIndex < propertyRooms.length; roomIndex += 1) {
          const room = propertyRooms[roomIndex];
          if (!isRecord(room)) continue;
          flattenedRows.push({
            ...room,
            propertyID: row.propertyID,
            propertyCurrency,
          });
        }
      }

      return flattenedRows;
    }
  }

  return [];
}

function normalizeAvailabilityRows(rows: AnyRecord[]) {
  return rows
    .map((row, index) => {
      const category =
        asString(row.category) ||
        asString(row.roomType) ||
        asString(row.room_type) ||
        asString(row.roomName) ||
        asString(row.name) ||
        `Categoria ${index + 1}`;

      const available =
        asNumber(row.available) ??
        asNumber(row.availability) ??
        asNumber(row.roomsAvailable) ??
        asNumber(row.inventory) ??
        asNumber(row.unitsAvailable) ??
        0;

      const priceFrom =
        asNumber(row.priceFrom) ??
        asNumber(row.price) ??
        asNumber(row.rate) ??
        asNumber(row.roomRate) ??
        asNumber(row.totalRate) ??
        asNumber((row.ratePlan as AnyRecord | undefined)?.amount);

      const currency =
        asString(row.currency) ||
        asString(row.propertyCurrency) ||
        asString(row.currencyCode) ||
        asString((row.ratePlan as AnyRecord | undefined)?.currency) ||
        "BRL";

      const shared = asBoolean(row.isSharedRoom);

      return {
        category,
        available,
        priceFrom,
        currency,
        roomTypeId: asString(row.roomTypeID) || null,
        ratePlanName: asString(row.ratePlanNamePublic) || null,
        isSharedRoom: shared === true,
      };
    })
    .filter((row) => row.available > 0);
}

function buildAvailabilityAnswer(
  hasResults: boolean,
  checkIn: string,
  checkOut: string,
  bookingEngineUrl: string,
  disclaimer: string,
): string {
  if (!hasResults) {
    return [
      "Nao encontrei disponibilidade confirmada em tempo real para esse periodo.",
      "Posso encaminhar para nossa equipe validar manualmente.",
      disclaimer,
    ].join(" ");
  }

  return [
    `Encontrei disponibilidade entre ${checkIn} e ${checkOut}.`,
    `Voce pode continuar no motor oficial: ${bookingEngineUrl}`,
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
    return "A integracao Cloudbeds esta pendente de autorizacao OAuth. Posso te conectar com nossa equipe para confirmar disponibilidade agora.";
  }

  return config.fallback.apiUnavailable.pt;
}

export function createCheckAvailabilityTool(config: AgentConfig) {
  return tool({
    description:
      "Consulta disponibilidade de acomodacoes em tempo real no Cloudbeds para datas e ocupacao informadas.",
    inputSchema: z
      .object({
        checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        adults: z.number().int().min(1).max(10).default(2),
        children: z.number().int().min(0).max(10).default(0),
        roomType: z.string().min(1).max(120).optional(),
        lang: z.enum(["pt", "en", "es"]).default("pt"),
      })
      .refine((value) => value.checkOut > value.checkIn, {
        message: "checkOut must be after checkIn",
      }),
    execute: async ({ checkIn, checkOut, adults, children, roomType }) => {
      const availabilityPath =
        process.env.CLOUDBEDS_AVAILABILITY_PATH || "/getAvailableRoomTypes";

      const disclaimer = config.disclaimers.availability.pt;
      const propertyIds = process.env.CLOUDBEDS_PROPERTY_IDS?.trim() || "";
      const rooms = Number.parseInt(process.env.CLOUDBEDS_DEFAULT_ROOMS || "1", 10);

      if (!cloudbedsClient.isEnabled()) {
        const unavailable = getCloudbedsUnavailableMessage(config);
        return {
          checkIn,
          checkOut,
          adults,
          children,
          roomType: roomType || null,
          shouldHandoff: true,
          answer: `${unavailable} ${disclaimer}`,
          disclaimer,
          bookingEngineUrl: config.bookingEngineUrl,
          availability: [],
          sourceRefs: [],
          confidenceScore: 0.2,
          groundingLevel: "none" as const,
          provider: "cloudbeds",
          providerStatus: "disabled",
        };
      }

      try {
        const raw = await cloudbedsClient.request<unknown>(availabilityPath, {
          method: "GET",
          query: {
            startDate: checkIn,
            endDate: checkOut,
            rooms: Number.isFinite(rooms) && rooms > 0 ? rooms : 1,
            adults,
            children,
            roomTypeID: roomType,
            propertyIDs: propertyIds || undefined,
            detailedRates: false,
            includeSharedRooms: false,
          },
        });

        const rows = extractRows(raw);
        const normalized = normalizeAvailabilityRows(rows);
        const hasResults = normalized.length > 0;

        return {
          checkIn,
          checkOut,
          adults,
          children,
          roomType: roomType || null,
          shouldHandoff: !hasResults,
          answer: buildAvailabilityAnswer(
            hasResults,
            checkIn,
            checkOut,
            config.bookingEngineUrl,
            disclaimer,
          ),
          disclaimer,
          bookingEngineUrl: config.bookingEngineUrl,
          availability: normalized.slice(0, 6),
          sourceRefs: hasResults
            ? [
                {
                  source_id: `cloudbeds-availability:${checkIn}:${checkOut}`,
                  source_type: "reservation" as const,
                  title: "Cloudbeds disponibilidade",
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
          shouldHandoff: true,
          answer: `${config.fallback.apiUnavailable.pt} ${disclaimer}`,
          disclaimer,
          bookingEngineUrl: config.bookingEngineUrl,
          availability: [],
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
