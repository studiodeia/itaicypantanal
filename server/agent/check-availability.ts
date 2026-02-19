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
        asString(row.roomTypeName) ||
        asString(row.roomTypeNameShort) ||
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

/**
 * Builds a Cloudbeds booking engine deep link with dates, occupancy and UTMs pre-filled.
 * Guests land on a pre-populated booking engine — no manual entry required.
 */
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
    "utm_content=chat_availability",
    `checkin=${checkIn}`,
    `checkout=${checkOut}`,
    `adults=${adults}`,
  ];
  if (children > 0) {
    pairs.push(`kids=${children}`);
  }
  return `${baseUrl}${separator}${pairs.join("&")}`;
}

function buildAvailabilityAnswer(
  hasResults: boolean,
  checkIn: string,
  checkOut: string,
  bookingUrl: string,
  disclaimer: string,
  preview: string[],
): string {
  const checkInPT = formatDatePT(checkIn);
  const checkOutPT = formatDatePT(checkOut);

  if (!hasResults) {
    return [
      `Não encontrei disponibilidade confirmada de ${checkInPT} a ${checkOutPT}.`,
      "Posso verificar:\n• Datas próximas (1 a 3 dias antes ou depois)?\n• Outra categoria de acomodação?",
      disclaimer,
    ].join("\n\n");
  }

  const roomList = preview.map((p) => `• ${p}`).join("\n");

  return [
    `Ótima notícia — há disponibilidade de ${checkInPT} a ${checkOutPT}!`,
    roomList,
    `Nosso pacote all inclusive inclui hospedagem, café da manhã, almoço, jantar e bebidas (água, sucos, refrigerantes, cerveja, caipirinha). Garanta sua vaga com as datas já preenchidas:\n${bookingUrl}`,
    disclaimer,
  ].join("\n\n");
}

/**
 * Shifts a date string (YYYY-MM-DD) by N days. Returns ISO date string.
 */
function shiftDate(iso: string, days: number): string {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

type NearbyAlternative = {
  checkIn: string;
  checkOut: string;
  categories: string[];
};

/**
 * When no availability found for the requested dates, try ±1 and ±2 day shifts
 * in parallel (2 calls max) and return the first match.
 */
async function findNearbyAvailability(
  checkIn: string,
  checkOut: string,
  adults: number,
  children: number,
  roomType: string | undefined,
  propertyIds: string,
  rooms: number,
  availabilityPath: string,
): Promise<NearbyAlternative | null> {
  const shifts = [-1, 1, -2, 2];
  const attempts = shifts.map((shift) => ({
    checkIn: shiftDate(checkIn, shift),
    checkOut: shiftDate(checkOut, shift),
    shift,
  }));

  // Run first pair in parallel, then second pair if needed (limit API load)
  for (let batch = 0; batch < attempts.length; batch += 2) {
    const pair = attempts.slice(batch, batch + 2);
    const results = await Promise.allSettled(
      pair.map(async (attempt) => {
        const raw = await cloudbedsClient.request<unknown>(availabilityPath, {
          method: "GET",
          query: {
            startDate: attempt.checkIn,
            endDate: attempt.checkOut,
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
        if (normalized.length === 0) return null;

        const categories = Array.from(
          new Set(normalized.map((r) => r.category.trim()).filter(Boolean)),
        ).slice(0, 3);

        return {
          checkIn: attempt.checkIn,
          checkOut: attempt.checkOut,
          categories,
        } satisfies NearbyAlternative;
      }),
    );

    for (const result of results) {
      if (result.status === "fulfilled" && result.value) {
        return result.value;
      }
    }
  }

  return null;
}

function getCloudbedsUnavailableMessage(config: AgentConfig): string {
  return `Voce pode verificar disponibilidade e finalizar sua reserva diretamente em: ${config.bookingEngineUrl} — ou nossa equipe confirma por WhatsApp.`;
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

        // No availability → auto-search nearby dates (±1, ±2 days)
        if (!hasResults) {
          let nearbyAnswer: string;
          let nearbyDeepLink = config.bookingEngineUrl;
          let nearbyConfidence = 0.45;
          let nearbyGrounding: "full" | "none" = "none";

          try {
            const nearby = await findNearbyAvailability(
              checkIn, checkOut, adults, children, roomType, propertyIds, rooms, availabilityPath,
            );

            if (nearby) {
              const ciPT = formatDatePT(nearby.checkIn);
              const coPT = formatDatePT(nearby.checkOut);
              const roomList = nearby.categories.map((c) => `• ${c}`).join("\n");
              nearbyDeepLink = buildBookingDeepLink(
                config.bookingEngineUrl, nearby.checkIn, nearby.checkOut, adults, children,
              );
              nearbyAnswer = [
                `Não encontrei disponibilidade de ${formatDatePT(checkIn)} a ${formatDatePT(checkOut)}.`,
                `Mas há vagas de ${ciPT} a ${coPT}:\n${roomList}`,
                `Garanta sua vaga:\n${nearbyDeepLink}`,
                disclaimer,
              ].join("\n\n");
              nearbyConfidence = 0.85;
              nearbyGrounding = "full";
            } else {
              nearbyAnswer = buildAvailabilityAnswer(
                false, checkIn, checkOut, config.bookingEngineUrl, disclaimer, [],
              );
            }
          } catch {
            // If nearby search fails, fall back to standard no-availability message
            nearbyAnswer = buildAvailabilityAnswer(
              false, checkIn, checkOut, config.bookingEngineUrl, disclaimer, [],
            );
          }

          return {
            checkIn,
            checkOut,
            adults,
            children,
            roomType: roomType || null,
            shouldHandoff: nearbyGrounding === "none",
            answer: nearbyAnswer,
            disclaimer,
            bookingEngineUrl: nearbyDeepLink,
            availability: [],
            sourceRefs: nearbyGrounding === "full"
              ? [{
                  source_id: `cloudbeds-availability-nearby:${checkIn}:${checkOut}`,
                  source_type: "reservation" as const,
                  title: "Cloudbeds disponibilidade (datas próximas)",
                  score: 0.85,
                }]
              : [],
            confidenceScore: nearbyConfidence,
            groundingLevel: nearbyGrounding,
            provider: "cloudbeds",
            providerStatus: "ok",
          };
        }

        const byCategory = new Map<string, { category: string; available: number }>();
        for (const item of normalized) {
          const key = item.category.trim();
          if (!key) continue;
          const existing = byCategory.get(key);
          if (!existing || item.available > existing.available) {
            byCategory.set(key, { category: item.category, available: item.available });
          }
        }
        const preview = Array.from(byCategory.values())
          .sort((a, b) => b.available - a.available)
          .slice(0, 3)
          .map((row) => row.category);

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
          shouldHandoff: false,
          answer: buildAvailabilityAnswer(
            true,
            checkIn,
            checkOut,
            deepLinkUrl,
            disclaimer,
            preview,
          ),
          disclaimer,
          bookingEngineUrl: deepLinkUrl,
          availability: normalized.slice(0, 6),
          sourceRefs: [
            {
              source_id: `cloudbeds-availability:${checkIn}:${checkOut}`,
              source_type: "reservation" as const,
              title: "Cloudbeds disponibilidade",
              score: 0.98,
            },
          ],
          confidenceScore: 0.98,
          groundingLevel: "full" as const,
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
