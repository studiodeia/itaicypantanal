import { tool } from "ai";
import { z } from "zod";
import type { AgentConfig } from "../../shared/agent-config";
import { cloudbedsClient, formatCloudbedsError } from "./cloudbeds";
import { formatDateRange } from "./format-date-locale";
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

type AgentLocale = "pt" | "en" | "es";

/* ── Trilingual helpers for rates answer ── */

function getAdultsLabel(adults: number, locale: AgentLocale): string {
  if (locale === "en") return adults === 1 ? "1 adult" : `${adults} adults`;
  if (locale === "es") return adults === 1 ? "1 adulto" : `${adults} adultos`;
  return adults === 1 ? "1 adulto" : `${adults} adultos`;
}

function getRatesFoundMsg(adultsLabel: string, dateRange: string, locale: AgentLocale): string {
  if (locale === "en") return `Rates found for ${adultsLabel}, ${dateRange}:`;
  if (locale === "es") return `Tarifas encontradas para ${adultsLabel}, ${dateRange}:`;
  return `Tarifas encontradas para ${adultsLabel}, ${dateRange}:`;
}

function getNoRatesMsg(dateRange: string, locale: AgentLocale): string {
  if (locale === "en") return `I couldn't retrieve real-time rates ${dateRange}.`;
  if (locale === "es") return `No pude recuperar tarifas en tiempo real ${dateRange}.`;
  return `Não consegui recuperar tarifas em tempo real ${dateRange}.`;
}

function getNoRatesAlternatives(bookingUrl: string, locale: AgentLocale): string {
  if (locale === "en") {
    return `I can check:\n• Nearby dates (1–3 days before or after)?\n• Another accommodation category?\n\nOr check directly: ${bookingUrl}`;
  }
  if (locale === "es") {
    return `Puedo verificar:\n• Fechas cercanas (1 a 3 días antes o después)?\n• Otra categoría de alojamiento?\n\nO consulte directamente: ${bookingUrl}`;
  }
  return `Posso verificar:\n• Datas próximas (1 a 3 dias antes ou depois)?\n• Outra categoria de acomodação?\n\nOu consulte diretamente: ${bookingUrl}`;
}

function getRatesAllInclusiveDesc(locale: AgentLocale): string {
  if (locale === "en") {
    return "Our all-inclusive package covers accommodation, breakfast, lunch, dinner, and beverages.";
  }
  if (locale === "es") {
    return "Nuestro paquete all inclusive incluye hospedaje, desayuno, almuerzo, cena y bebidas.";
  }
  return "Nosso pacote all inclusive inclui hospedagem, café da manhã, almoço, jantar e bebidas.";
}

function getRatesProfileHighlight(profile: VisitorProfile, locale: AgentLocale): string {
  const map: Record<VisitorProfile, Record<AgentLocale, string>> = {
    pescador: {
      pt: "Os pacotes de pesca incluem Cota Zero, barco com piloteiro e guia experiente.",
      en: "Fishing packages include Cota Zero catch-and-release, boat with pilot and expert guide.",
      es: "Los paquetes de pesca incluyen Cota Zero, bote con piloto y guía experto.",
    },
    birdwatcher: {
      pt: "Já catalogamos 166 espécies de aves na propriedade — o guia é incluído.",
      en: "We've catalogued 166 bird species on the property — guide included.",
      es: "Hemos catalogado 166 especies de aves en la propiedad — guía incluido.",
    },
    familia: {
      pt: "Temos suítes familiares e atividades para todas as idades.",
      en: "We have family suites and activities for all ages.",
      es: "Tenemos suites familiares y actividades para todas las edades.",
    },
    casal: {
      pt: "Os chalés às margens do rio são ideais para casais.",
      en: "Our riverside chalets are ideal for couples.",
      es: "Las cabañas junto al río son ideales para parejas.",
    },
    grupo: {
      pt: "Para grupos, temos condições especiais — posso conectar com a equipe.",
      en: "For groups, we offer special conditions — I can connect you with our team.",
      es: "Para grupos tenemos condiciones especiales — puedo conectarle con el equipo.",
    },
    unknown: { pt: "", en: "", es: "" },
  };
  return map[profile]?.[locale] ?? "";
}

function getRatesBookingCta(bookingUrl: string, locale: AgentLocale): string {
  if (locale === "en") return `Book with dates pre-filled:\n${bookingUrl}`;
  if (locale === "es") return `Reserve con las fechas ya completadas:\n${bookingUrl}`;
  return `Garanta sua vaga com as datas já preenchidas:\n${bookingUrl}`;
}

function getPreviewLabel(category: string, formatted: string, locale: AgentLocale): string {
  if (locale === "en") return `${category} (from ${formatted})`;
  if (locale === "es") return `${category} (desde ${formatted})`;
  return `${category} (a partir de ${formatted})`;
}

/* ── buildRatesAnswer ── */

type BuildRatesOpts = {
  hasResults: boolean;
  checkIn: string;
  checkOut: string;
  adults: number;
  bookingUrl: string;
  disclaimer: string;
  preview: string[];
  locale: AgentLocale;
  profile: VisitorProfile;
};

function buildRatesAnswer(opts: BuildRatesOpts): string {
  const { hasResults, checkIn, checkOut, adults, bookingUrl, disclaimer, preview, locale, profile } = opts;
  const dateRange = formatDateRange(checkIn, checkOut, locale);

  if (!hasResults) {
    return [
      getNoRatesMsg(dateRange, locale),
      getNoRatesAlternatives(bookingUrl, locale),
      disclaimer,
    ].join("\n\n");
  }

  const adultsLabel = getAdultsLabel(adults, locale);
  const profileLine = getRatesProfileHighlight(profile, locale);

  const blocks: string[] = [
    getRatesFoundMsg(adultsLabel, dateRange, locale),
    preview.map((p) => `• ${p}`).join("\n"),
  ];

  if (profileLine) blocks.push(profileLine);

  blocks.push(
    `${getRatesAllInclusiveDesc(locale)} ${getRatesBookingCta(bookingUrl, locale)}`,
    disclaimer,
  );

  return blocks.join("\n\n");
}

function getCloudbedsUnavailableMessage(config: AgentConfig, locale: AgentLocale): string {
  const url = config.bookingEngineUrl;
  if (locale === "en") {
    return `You can check rates and book directly at: ${url} — or our team can send the prices via WhatsApp.`;
  }
  if (locale === "es") {
    return `Puede consultar tarifas y reservar directamente en: ${url} — o nuestro equipo le envía los valores por WhatsApp.`;
  }
  return `Você pode consultar tarifas e reservar diretamente em: ${url} — ou nossa equipe envia os valores por WhatsApp.`;
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
        profile: z
          .enum(["pescador", "birdwatcher", "familia", "casal", "grupo", "unknown"])
          .default("unknown"),
      })
      .refine((value) => value.checkOut > value.checkIn, {
        message: "checkOut must be after checkIn",
      }),
    execute: async ({ checkIn, checkOut, adults, children, roomType, currency, lang: locale, profile }) => {
      const ratesPath = process.env.CLOUDBEDS_RATES_PATH || "/getRatePlans";
      const disclaimer = config.disclaimers.price[locale] ?? config.disclaimers.price.pt;
      const propertyIds = process.env.CLOUDBEDS_PROPERTY_IDS?.trim() || "";

      if (!cloudbedsClient.isEnabled()) {
        const unavailable = getCloudbedsUnavailableMessage(config, locale);
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

        const intlLocale = locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "pt-BR";
        const preview = Array.from(byCategory.values())
          .sort((a, b) => a.amount - b.amount)
          .slice(0, 3)
          .map((row) => {
            const code = (row.currency || "BRL").toUpperCase();
            const formatted = new Intl.NumberFormat(intlLocale, {
              style: "currency",
              currency: code,
              maximumFractionDigits: 0,
            }).format(row.amount);
            return getPreviewLabel(row.category, formatted, locale);
          });

        const deepLinkUrl = buildBookingDeepLink(
          config.bookingEngineUrl,
          checkIn,
          checkOut,
          adults,
          children,
          "chat_rates",
        );

        return {
          checkIn,
          checkOut,
          adults,
          children,
          roomType: roomType || null,
          currency,
          shouldHandoff: !hasResults,
          answer: buildRatesAnswer({
            hasResults,
            checkIn,
            checkOut,
            adults,
            bookingUrl: deepLinkUrl,
            disclaimer,
            preview,
            locale,
            profile,
          }),
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
          answer: `${config.fallback.apiUnavailable[locale] ?? config.fallback.apiUnavailable.pt} ${disclaimer}`,
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
