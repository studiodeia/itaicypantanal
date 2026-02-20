/**
 * Builds a Cloudbeds booking engine deep link with dates, occupancy and UTMs pre-filled.
 * Guests land on a pre-populated booking engine — no manual entry required.
 *
 * Extracted from check-availability.ts and get-rates.ts to eliminate duplication.
 */
export function buildBookingDeepLink(
  baseUrl: string,
  checkIn: string,
  checkOut: string,
  adults: number,
  children: number,
  utmContent: "chat_availability" | "chat_rates" = "chat_availability",
): string {
  const separator = baseUrl.includes("?") ? "&" : "?";
  const pairs: string[] = [
    "currency=brl",
    "utm_source=site_itaicy",
    "utm_medium=chat",
    "utm_campaign=booking_engine",
    `utm_content=${utmContent}`,
    `checkin=${checkIn}`,
    `checkout=${checkOut}`,
    `adults=${adults}`,
  ];
  if (children > 0) {
    pairs.push(`kids=${children}`);
  }
  return `${baseUrl}${separator}${pairs.join("&")}`;
}
