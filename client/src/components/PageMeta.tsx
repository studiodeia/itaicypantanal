import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/i18n/context";

const OG_LOCALE: Record<string, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};

/** Alternate OG locales (languages other than current) */
const OG_LOCALE_ALT: Record<string, string[]> = {
  pt: ["en_US", "es_ES"],
  en: ["pt_BR", "es_ES"],
  es: ["pt_BR", "en_US"],
};

/** hreflang values per supported language */
const HREFLANG: Record<string, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

const HTML_LANG: Record<string, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

const SITE_NAME = "Itaicy Pantanal Eco Lodge";
const DEFAULT_OG_IMAGE = "/images/og-default.webp";

export interface PageMetaProps {
  /** Page title — will be appended with " | Itaicy Pantanal Eco Lodge" */
  title?: string;
  /** Meta description — ideal 120-155 chars */
  description?: string;
  /** Canonical URL path (e.g. "/blog/fauna/tuiuiu") */
  canonicalPath?: string;
  /** Open Graph image path */
  ogImage?: string;
  /** og:type — defaults to "website" */
  ogType?: string;
  /** Set true to add noindex,nofollow */
  noIndex?: boolean;
  /** Breadcrumb items for BreadcrumbList JSON-LD */
  breadcrumbs?: { name: string; path: string }[];
}

export function PageMeta({
  title,
  description,
  canonicalPath,
  ogImage,
  ogType = "website",
  noIndex = false,
  breadcrumbs,
}: PageMetaProps) {
  const { lang } = useLanguage();
  const ogLocale = OG_LOCALE[lang] ?? "pt_BR";
  const htmlLang = HTML_LANG[lang] ?? "pt-BR";
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const ogLocaleAlternates = OG_LOCALE_ALT[lang] ?? [];
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const hreflangPath = canonicalPath ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const hreflangUrl = `${origin}${hreflangPath}`;
  const canonicalUrl = canonicalPath ? `${origin}${canonicalPath}` : undefined;
  const ogImageUrl = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${origin}${ogImage}`
    : `${origin}${DEFAULT_OG_IMAGE}`;

  const breadcrumbLd =
    breadcrumbs && breadcrumbs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: `${origin}${item.path}`,
          })),
        }
      : null;

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImageUrl} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={ogLocale} />
      {ogLocaleAlternates.map((alt) => (
        <meta key={alt} property="og:locale:alternate" content={alt} />
      ))}

      {/* hreflang — multilingual signals for search engines */}
      {Object.entries(HREFLANG).map(([, hreflang]) => (
        <link key={hreflang} rel="alternate" hrefLang={hreflang} href={hreflangUrl} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={hreflangUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImageUrl} />

      {/* BreadcrumbList JSON-LD */}
      {breadcrumbLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>
      )}
    </Helmet>
  );
}
