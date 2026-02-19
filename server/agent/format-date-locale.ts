/**
 * Locale-aware date formatting for agent responses.
 * Replaces the duplicated `formatDatePT()` in check-availability.ts and get-rates.ts.
 */

type AgentLocale = "pt" | "en" | "es";

const MONTHS: Record<AgentLocale, string[]> = {
  pt: [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
  ],
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
  es: [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ],
};

/**
 * Formats an ISO date string (YYYY-MM-DD) into a human-readable locale string.
 *
 * PT: "15 de março de 2026"
 * EN: "March 15, 2026"
 * ES: "15 de marzo de 2026"
 */
export function formatDate(iso: string, locale: AgentLocale = "pt"): string {
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;

  const year = Number.parseInt(parts[0]!, 10);
  const month = Number.parseInt(parts[1]!, 10) - 1;
  const day = Number.parseInt(parts[2]!, 10);

  if (!Number.isFinite(year) || month < 0 || month > 11 || !Number.isFinite(day)) return iso;

  const monthName = MONTHS[locale]?.[month] ?? MONTHS.pt[month]!;

  if (locale === "en") {
    return `${monthName} ${day}, ${year}`;
  }

  return `${day} de ${monthName} de ${year}`;
}

/**
 * Formats a check-in / check-out range for display in agent messages.
 *
 * PT: "de 15 de março a 18 de março de 2026"
 * EN: "from March 15 to March 18, 2026"
 * ES: "del 15 de marzo al 18 de marzo de 2026"
 */
export function formatDateRange(
  checkIn: string,
  checkOut: string,
  locale: AgentLocale = "pt",
): string {
  const ciFormatted = formatDate(checkIn, locale);
  const coFormatted = formatDate(checkOut, locale);

  if (locale === "en") {
    return `from ${ciFormatted} to ${coFormatted}`;
  }
  if (locale === "es") {
    return `del ${ciFormatted} al ${coFormatted}`;
  }
  return `de ${ciFormatted} a ${coFormatted}`;
}
