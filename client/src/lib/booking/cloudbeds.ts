type CloudbedsBookingOptions = {
  checkIn?: Date;
  checkOut?: Date;
  currency?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
};

export const CLOUDBEDS_BOOKING_BASE_URL =
  "https://us2.cloudbeds.com/pt-br/reservas/M9G54y";
export const CLOUDBEDS_DEFAULT_CURRENCY = "brl";

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function buildCloudbedsBookingUrl(
  options: CloudbedsBookingOptions = {},
): string {
  const url = new URL(CLOUDBEDS_BOOKING_BASE_URL);

  url.searchParams.set("currency", options.currency ?? CLOUDBEDS_DEFAULT_CURRENCY);
  url.searchParams.set("utm_source", options.utmSource ?? "site_itaicy");
  url.searchParams.set("utm_medium", options.utmMedium ?? "website");
  url.searchParams.set("utm_campaign", options.utmCampaign ?? "booking_engine");
  if (options.utmContent) {
    url.searchParams.set("utm_content", options.utmContent);
  }

  if (options.checkIn) {
    url.searchParams.set("checkin", formatDate(options.checkIn));
  }
  if (options.checkOut) {
    url.searchParams.set("checkout", formatDate(options.checkOut));
  }

  return url.toString();
}

export function goToCloudbedsBooking(options: CloudbedsBookingOptions = {}): void {
  if (typeof window === "undefined") {
    return;
  }
  window.location.assign(buildCloudbedsBookingUrl(options));
}
