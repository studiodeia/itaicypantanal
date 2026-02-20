type CloudbedsBookingOptions = {
  locale?: string;
  checkIn?: Date;
  checkOut?: Date;
  currency?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
};

const CLOUDBEDS_LOCALE_MAP: Record<string, string> = {
  pt: "pt-br",
  en: "en",
  es: "es",
};
const CLOUDBEDS_PROPERTY_PATH = "reservas/M9G54y";
export const CLOUDBEDS_DEFAULT_CURRENCY = "brl";

function getBaseUrl(locale = "pt"): string {
  const cloudbedsLocale = CLOUDBEDS_LOCALE_MAP[locale] ?? "pt-br";
  return `https://us2.cloudbeds.com/${cloudbedsLocale}/${CLOUDBEDS_PROPERTY_PATH}`;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function buildCloudbedsBookingUrl(
  options: CloudbedsBookingOptions = {},
): string {
  const url = new URL(getBaseUrl(options.locale));

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
