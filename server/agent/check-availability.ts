import { tool } from "ai";
import { z } from "zod";
import type { AgentConfig } from "../../shared/agent-config";
import { cloudbedsClient, formatCloudbedsError } from "./cloudbeds";
import { formatDate, formatDateRange } from "./format-date-locale";
import { buildBookingDeepLink } from "./booking-link";
import type { VisitorProfile } from "./conversation-profile";

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

// formatDate, formatDateRange → imported from ./format-date-locale
// buildBookingDeepLink → imported from ./booking-link

type AgentLocale = "pt" | "en" | "es";

/** Profile-specific highlight injected into availability response. */
function getProfileHighlight(profile: VisitorProfile, locale: AgentLocale): string {
  const highlights: Record<string, Record<AgentLocale, string>> = {
    pescador: {
      pt: "A pesca está inclusa no pacote — Cota Zero, com guia e lancha dedicados.",
      en: "Fishing is included in the package — Cota Zero, with a dedicated guide and boat.",
      es: "La pesca está incluida en el paquete — Cota Zero, con guía y lancha dedicados.",
    },
    birdwatcher: {
      pt: "Já catalogamos 166 espécies de aves na propriedade — binóculos e guia disponíveis.",
      en: "We've cataloged 166 bird species on the property — binoculars and guide available.",
      es: "Hemos catalogado 166 especies de aves en la propiedad — binoculares y guía disponibles.",
    },
    familia: {
      pt: "Temos suítes para famílias, com atividades seguras para todas as idades.",
      en: "We have family suites with safe activities for all ages.",
      es: "Tenemos suites familiares con actividades seguras para todas las edades.",
    },
    casal: {
      pt: "Nossos chalés oferecem privacidade total, com varandas voltadas para o rio.",
      en: "Our chalets offer total privacy, with balconies overlooking the river.",
      es: "Nuestros chalés ofrecen total privacidad, con balcones con vista al río.",
    },
  };
  return highlights[profile]?.[locale] ?? "";
}

/** All-inclusive description per locale. */
function getAllInclusiveDesc(locale: AgentLocale): string {
  if (locale === "en") {
    return "Our all-inclusive package covers accommodation, breakfast, lunch, dinner and beverages (water, juices, soft drinks, beer, caipirinha).";
  }
  if (locale === "es") {
    return "Nuestro paquete all inclusive incluye alojamiento, desayuno, almuerzo, cena y bebidas (agua, jugos, refrescos, cerveza, caipirinha).";
  }
  return "Nosso pacote all inclusive inclui hospedagem, café da manhã, almoço, jantar e bebidas (água, sucos, refrigerantes, cerveja, caipirinha).";
}

/** No-availability message per locale. */
function getNoAvailabilityMsg(locale: AgentLocale, dateRange: string): string {
  if (locale === "en") {
    return `I didn't find confirmed availability ${dateRange}.`;
  }
  if (locale === "es") {
    return `No encontré disponibilidad confirmada ${dateRange}.`;
  }
  return `Não encontrei disponibilidade confirmada ${dateRange}.`;
}

/** No-availability alternatives prompt per locale. */
function getNoAvailAlternatives(locale: AgentLocale): string {
  if (locale === "en") {
    return "I can check:\n• Nearby dates (1 to 3 days before or after)?\n• A different accommodation category?";
  }
  if (locale === "es") {
    return "Puedo verificar:\n• Fechas cercanas (1 a 3 días antes o después)?\n• ¿Otra categoría de alojamiento?";
  }
  return "Posso verificar:\n• Datas próximas (1 a 3 dias antes ou depois)?\n• Outra categoria de acomodação?";
}

/** Great news confirmation per locale. */
function getGreatNewsMsg(locale: AgentLocale, dateRange: string): string {
  if (locale === "en") {
    return `Great news — there's availability ${dateRange}!`;
  }
  if (locale === "es") {
    return `¡Excelente noticia — hay disponibilidad ${dateRange}!`;
  }
  return `Ótima notícia — há disponibilidade ${dateRange}!`;
}

/** CTA text per locale. */
function getBookingCta(locale: AgentLocale, bookingUrl: string): string {
  if (locale === "en") {
    return `Book with your dates pre-filled:\n${bookingUrl}`;
  }
  if (locale === "es") {
    return `Reserve con sus fechas ya completadas:\n${bookingUrl}`;
  }
  return `Garanta sua vaga com as datas já preenchidas:\n${bookingUrl}`;
}

type BuildAvailabilityOpts = {
  hasResults: boolean;
  checkIn: string;
  checkOut: string;
  bookingUrl: string;
  disclaimer: string;
  preview: string[];
  locale: AgentLocale;
  profile: VisitorProfile;
};

function buildAvailabilityAnswer(opts: BuildAvailabilityOpts): string {
  const { hasResults, checkIn, checkOut, bookingUrl, disclaimer, preview, locale, profile } = opts;
  const dateRange = formatDateRange(checkIn, checkOut, locale);

  if (!hasResults) {
    return [
      getNoAvailabilityMsg(locale, dateRange),
      getNoAvailAlternatives(locale),
      disclaimer,
    ].join("\n\n");
  }

  const roomList = preview.map((p) => `• ${p}`).join("\n");
  const profileLine = getProfileHighlight(profile, locale);

  const blocks = [
    getGreatNewsMsg(locale, dateRange),
    roomList,
  ];

  if (profileLine) {
    blocks.push(profileLine);
  }

  blocks.push(`${getAllInclusiveDesc(locale)} ${getBookingCta(locale, bookingUrl)}`);
  blocks.push(disclaimer);

  return blocks.join("\n\n");
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

function getCloudbedsUnavailableMessage(config: AgentConfig, locale: AgentLocale): string {
  if (locale === "en") {
    return `You can check availability and complete your booking at: ${config.bookingEngineUrl} — or our team can confirm via WhatsApp.`;
  }
  if (locale === "es") {
    return `Puede verificar disponibilidad y completar su reserva en: ${config.bookingEngineUrl} — o nuestro equipo puede confirmar por WhatsApp.`;
  }
  return `Você pode verificar disponibilidade e finalizar sua reserva diretamente em: ${config.bookingEngineUrl} — ou nossa equipe confirma por WhatsApp.`;
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
        profile: z.enum(["pescador", "birdwatcher", "familia", "casal", "grupo", "unknown"]).default("unknown"),
      })
      .refine((value) => value.checkOut > value.checkIn, {
        message: "checkOut must be after checkIn",
      }),
    execute: async ({ checkIn, checkOut, adults, children, roomType, lang: locale, profile }) => {
      const availabilityPath =
        process.env.CLOUDBEDS_AVAILABILITY_PATH || "/getAvailableRoomTypes";

      const disclaimer = config.disclaimers.availability[locale] ?? config.disclaimers.availability.pt;
      const propertyIds = process.env.CLOUDBEDS_PROPERTY_IDS?.trim() || "";
      const rooms = Number.parseInt(process.env.CLOUDBEDS_DEFAULT_ROOMS || "1", 10);

      if (!cloudbedsClient.isEnabled()) {
        const unavailable = getCloudbedsUnavailableMessage(config, locale);
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
              const origRange = formatDateRange(checkIn, checkOut, locale);
              const nearbyRange = formatDateRange(nearby.checkIn, nearby.checkOut, locale);
              const roomList = nearby.categories.map((c) => `• ${c}`).join("\n");
              nearbyDeepLink = buildBookingDeepLink(
                config.bookingEngineUrl, nearby.checkIn, nearby.checkOut, adults, children,
                "chat_availability",
              );

              const nearbyMessages: Record<AgentLocale, string[]> = {
                pt: [
                  `Não encontrei disponibilidade ${origRange}.`,
                  `Mas há vagas ${nearbyRange}:\n${roomList}`,
                  `${getBookingCta(locale, nearbyDeepLink)}`,
                  disclaimer,
                ],
                en: [
                  `I didn't find availability ${origRange}.`,
                  `But there are openings ${nearbyRange}:\n${roomList}`,
                  `${getBookingCta(locale, nearbyDeepLink)}`,
                  disclaimer,
                ],
                es: [
                  `No encontré disponibilidad ${origRange}.`,
                  `Pero hay plazas ${nearbyRange}:\n${roomList}`,
                  `${getBookingCta(locale, nearbyDeepLink)}`,
                  disclaimer,
                ],
              };

              nearbyAnswer = (nearbyMessages[locale] ?? nearbyMessages.pt).join("\n\n");
              nearbyConfidence = 0.85;
              nearbyGrounding = "full";
            } else {
              nearbyAnswer = buildAvailabilityAnswer({
                hasResults: false, checkIn, checkOut,
                bookingUrl: config.bookingEngineUrl, disclaimer, preview: [],
                locale, profile,
              });
            }
          } catch {
            nearbyAnswer = buildAvailabilityAnswer({
              hasResults: false, checkIn, checkOut,
              bookingUrl: config.bookingEngineUrl, disclaimer, preview: [],
              locale, profile,
            });
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
          "chat_availability",
        );

        return {
          checkIn,
          checkOut,
          adults,
          children,
          roomType: roomType || null,
          shouldHandoff: false,
          answer: buildAvailabilityAnswer({
            hasResults: true,
            checkIn,
            checkOut,
            bookingUrl: deepLinkUrl,
            disclaimer,
            preview,
            locale,
            profile,
          }),
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
          answer: `${config.fallback.apiUnavailable[locale] ?? config.fallback.apiUnavailable.pt} ${disclaimer}`,
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
