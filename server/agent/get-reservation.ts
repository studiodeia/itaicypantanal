import { tool } from "ai";
import { z } from "zod";
import type { AgentConfig } from "../../shared/agent-config";
import { cloudbedsClient, formatCloudbedsError } from "./cloudbeds";

type AnyRecord = Record<string, unknown>;

function isRecord(value: unknown): value is AnyRecord {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asInt(value: unknown, fallback: number): number {
  if (typeof value === "number" && Number.isFinite(value)) return Math.round(value);
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
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

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function nightsBetween(checkIn: string, checkOut: string): number {
  const ci = Date.parse(checkIn);
  const co = Date.parse(checkOut);
  if (!Number.isFinite(ci) || !Number.isFinite(co)) return 0;
  return Math.max(0, Math.round((co - ci) / (1000 * 60 * 60 * 24)));
}

function translateStatus(status: string, lang: "pt" | "en" | "es" = "pt"): string {
  const lower = status.toLowerCase().replace(/[_\s-]/g, "");

  if (lang === "en") {
    if (lower === "confirmed" || lower === "new") return "Confirmed";
    if (lower === "checkedin" || lower === "inhouse") return "Checked in";
    if (lower === "checkedout" || lower === "pastguest") return "Checked out";
    if (lower === "canceled" || lower === "cancelled" || lower === "noshow") return "Cancelled";
    if (lower === "tentative") return "Tentative";
    return status;
  }

  if (lang === "es") {
    if (lower === "confirmed" || lower === "new") return "Confirmada";
    if (lower === "checkedin" || lower === "inhouse") return "Hospedado";
    if (lower === "checkedout" || lower === "pastguest") return "Concluída";
    if (lower === "canceled" || lower === "cancelled" || lower === "noshow") return "Cancelada";
    if (lower === "tentative") return "Tentativa";
    return status;
  }

  // PT default
  if (lower === "confirmed" || lower === "new") return "Confirmada";
  if (lower === "checkedin" || lower === "inhouse") return "Em hospedagem";
  if (lower === "checkedout" || lower === "pastguest") return "Concluída";
  if (lower === "canceled" || lower === "cancelled" || lower === "noshow") return "Cancelada";
  if (lower === "tentative") return "Tentativa";
  return status;
}

/**
 * Defensively extracts reservation fields from Cloudbeds API response.
 * Handles multiple possible response shapes (data wrapper, direct object, nested guest).
 */
function extractReservationData(raw: unknown): {
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  status: string;
  roomTypeName: string;
  adults: number;
  children: number;
} | null {
  if (!isRecord(raw)) return null;

  // Cloudbeds wraps responses in { success: true, data: { ... } }
  const root: AnyRecord = isRecord(raw.data) ? (raw.data as AnyRecord) : raw;

  // Guest data may be nested inside a "guest" sub-object
  const guestObj: AnyRecord = isRecord(root.guest) ? (root.guest as AnyRecord) : root;

  const guestFirstName =
    asString(root.guestFirstName) ||
    asString(guestObj.guestFirstName) ||
    asString(guestObj.firstName) ||
    "";

  const guestLastName =
    asString(root.guestLastName) ||
    asString(guestObj.guestLastName) ||
    asString(guestObj.lastName) ||
    "";

  const guestEmail =
    asString(root.guestEmail) ||
    asString(root.email) ||
    asString(guestObj.email) ||
    asString(guestObj.guestEmail) ||
    "";

  const checkIn =
    asString(root.checkIn) ||
    asString(root.startDate) ||
    asString(root.dateCheckIn) ||
    "";

  const checkOut =
    asString(root.checkOut) ||
    asString(root.endDate) ||
    asString(root.dateCheckOut) ||
    "";

  const status =
    asString(root.status) ||
    asString(root.reservationStatus) ||
    asString(root.currentStatus) ||
    "";

  // Room type name — may be in a rooms[] array
  let roomTypeName =
    asString(root.roomTypeName) ||
    asString(root.roomTypeNameShort) ||
    asString(root.room_type) ||
    "";

  if (!roomTypeName && Array.isArray(root.rooms) && root.rooms.length > 0) {
    const firstRoom = root.rooms[0];
    if (isRecord(firstRoom)) {
      roomTypeName =
        asString(firstRoom.roomTypeName) ||
        asString(firstRoom.roomTypeNameShort) ||
        asString(firstRoom.roomType) ||
        "";
    }
  }

  // Require at minimum valid check-in and check-out dates
  if (!checkIn || !checkOut) return null;

  return {
    guestFirstName,
    guestLastName,
    guestEmail,
    checkIn,
    checkOut,
    status,
    roomTypeName,
    adults: asInt(root.adults, 2),
    children: asInt(root.children, 0),
  };
}

function buildReservationAnswer(
  guestFirstName: string,
  checkIn: string,
  checkOut: string,
  status: string,
  roomTypeName: string,
  nights: number,
  lang: "pt" | "en" | "es",
  config: AgentConfig,
): string {
  const checkInFmt = formatDatePT(checkIn);
  const checkOutFmt = formatDatePT(checkOut);
  const statusFmt = translateStatus(status, lang);
  const room = roomTypeName || "Acomodação";
  const nightLabel = nights === 1 ? (lang === "en" ? "night" : "noite") : lang === "en" ? "nights" : "noites";

  if (lang === "en") {
    const greeting = guestFirstName ? `Hi, ${guestFirstName}!` : "Hi!";
    return [
      `${greeting} I found your reservation.`,
      `Check-in: ${checkInFmt}\nCheck-out: ${checkOutFmt}\nRoom: ${room} (${nights} ${nightLabel})\nStatus: ${statusFmt}`,
      `For changes, cancellations or any other needs, please contact our team directly via WhatsApp ${config.handoff.whatsapp} — available ${config.handoff.serviceHours}.`,
    ].join("\n\n");
  }

  if (lang === "es") {
    const greeting = guestFirstName ? `¡Hola, ${guestFirstName}!` : "¡Hola!";
    return [
      `${greeting} Encontré tu reserva.`,
      `Llegada: ${checkInFmt}\nSalida: ${checkOutFmt}\nHabitación: ${room} (${nights} ${nightLabel})\nEstado: ${statusFmt}`,
      `Para cambios, cancelaciones o cualquier otra necesidad, contacta a nuestro equipo por WhatsApp ${config.handoff.whatsapp} — disponible ${config.handoff.serviceHours}.`,
    ].join("\n\n");
  }

  // PT default
  const greeting = guestFirstName ? `Olá, ${guestFirstName}!` : "Olá!";
  return [
    `${greeting} Encontrei sua reserva.`,
    `Check-in: ${checkInFmt}\nCheck-out: ${checkOutFmt}\nAcomodação: ${room} (${nights} ${nightLabel})\nStatus: ${statusFmt}`,
    `Para alterações, cancelamento ou qualquer outra necessidade, nossa equipe atende pelo WhatsApp ${config.handoff.whatsapp} — disponível ${config.handoff.serviceHours}.`,
  ].join("\n\n");
}

function buildNotFoundAnswer(
  lang: "pt" | "en" | "es",
  config: AgentConfig,
): string {
  if (lang === "en") {
    return `I couldn't find a reservation with those details. Please check the reservation code and email, or contact our team via WhatsApp ${config.handoff.whatsapp}.`;
  }
  if (lang === "es") {
    return `No encontré una reserva con esos datos. Verifica el código y el correo, o contacta a nuestro equipo por WhatsApp ${config.handoff.whatsapp}.`;
  }
  return `Não encontrei uma reserva com esses dados. Verifique o código e o e-mail e tente novamente, ou entre em contato com nossa equipe pelo WhatsApp ${config.handoff.whatsapp}.`;
}

function buildUnavailableAnswer(
  lang: "pt" | "en" | "es",
  config: AgentConfig,
): string {
  if (lang === "en") {
    return `I couldn't retrieve your reservation right now. Please contact our team via WhatsApp ${config.handoff.whatsapp} — available ${config.handoff.serviceHours}.`;
  }
  if (lang === "es") {
    return `No pude consultar tu reserva ahora. Contacta a nuestro equipo por WhatsApp ${config.handoff.whatsapp} — disponible ${config.handoff.serviceHours}.`;
  }
  return `Não consegui consultar sua reserva agora. Nossa equipe pode verificar pelo WhatsApp ${config.handoff.whatsapp} — disponível ${config.handoff.serviceHours}.`;
}

export function createGetReservationTool(config: AgentConfig) {
  return tool({
    description:
      "Consulta detalhes de uma reserva existente no Cloudbeds. Requer o ID da reserva e o e-mail cadastrado pelo hóspede para verificação de identidade (LGPD). Retorna check-in, check-out, status e tipo de acomodação.",
    inputSchema: z.object({
      reservationId: z
        .string()
        .min(1)
        .max(60)
        .describe("Código ou número de identificação da reserva (ex: 12345678)"),
      guestEmail: z
        .string()
        .email()
        .max(200)
        .describe("E-mail do hóspede cadastrado na reserva — usado para verificação LGPD"),
      lang: z
        .enum(["pt", "en", "es"])
        .default("pt")
        .describe("Idioma para a resposta"),
    }),
    execute: async ({ reservationId, guestEmail, lang = "pt" }) => {
      // Cloudbeds disabled or not configured
      if (!cloudbedsClient.isEnabled()) {
        return {
          found: false,
          shouldHandoff: true,
          answer: buildUnavailableAnswer(lang, config),
          groundingLevel: "none" as const,
          confidenceScore: 0.1,
          sourceRefs: [],
        };
      }

      try {
        const raw = await cloudbedsClient.request<unknown>("/getReservation", {
          method: "GET",
          query: { reservationID: reservationId },
          // Never cache reservation lookups — data must always be real-time
          bypassCache: true,
        });

        const data = extractReservationData(raw);

        // Reservation not found or response malformed
        if (!data) {
          return {
            found: false,
            shouldHandoff: false,
            answer: buildNotFoundAnswer(lang, config),
            groundingLevel: "none" as const,
            confidenceScore: 0.2,
            sourceRefs: [],
          };
        }

        // LGPD identity check: compare email case-insensitively
        // If Cloudbeds returned no email (unusual), fail safe → don't expose data
        const cloudbedsEmail = data.guestEmail.trim();
        const emailMatch =
          cloudbedsEmail.length > 0 &&
          normalizeEmail(cloudbedsEmail) === normalizeEmail(guestEmail);

        if (!emailMatch) {
          // Do NOT reveal whether the reservation exists — neutral "not found" message
          return {
            found: false,
            shouldHandoff: false,
            answer: buildNotFoundAnswer(lang, config),
            groundingLevel: "none" as const,
            confidenceScore: 0.2,
            sourceRefs: [],
          };
        }

        // Identity verified — build sanitized response (no payment, no CPF, no full email)
        const nights = nightsBetween(data.checkIn, data.checkOut);
        const answer = buildReservationAnswer(
          data.guestFirstName,
          data.checkIn,
          data.checkOut,
          data.status,
          data.roomTypeName,
          nights,
          lang,
          config,
        );

        return {
          found: true,
          shouldHandoff: false,
          // Expose only safe, non-sensitive fields
          guestFirstName: data.guestFirstName,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          status: data.status,
          roomTypeName: data.roomTypeName,
          adults: data.adults,
          children: data.children,
          nights,
          answer,
          groundingLevel: "full" as const,
          confidenceScore: 0.98,
          sourceRefs: [
            {
              source_id: `cloudbeds-reservation:${reservationId}`,
              source_type: "reservation" as const,
              title: "Cloudbeds reserva",
              score: 0.98,
            },
          ],
        };
      } catch (error) {
        const formatted = formatCloudbedsError(error);

        // 404 = reservation doesn't exist in Cloudbeds
        if (formatted.code === "api_error" && formatted.status === 404) {
          return {
            found: false,
            shouldHandoff: false,
            answer: buildNotFoundAnswer(lang, config),
            groundingLevel: "none" as const,
            confidenceScore: 0.2,
            sourceRefs: [],
          };
        }

        return {
          found: false,
          shouldHandoff: true,
          answer: buildUnavailableAnswer(lang, config),
          groundingLevel: "none" as const,
          confidenceScore: 0.1,
          sourceRefs: [],
          providerError: formatted.message,
        };
      }
    },
  });
}
