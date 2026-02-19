/**
 * Multilingual route mapping — SEO-friendly URL slugs per language.
 *
 * PT is the canonical language (no prefix).
 * EN and ES get /en/ and /es/ prefixes with translated slugs.
 *
 * IMPORTANT: if you add a new page, add the slug here AND in App.tsx routes.
 * Keep server/i18n-routes.ts in sync (copy the SLUG_MAP and functions).
 */

// Inline type — avoids importing from context.tsx (which has React deps)
type Lang = "pt" | "en" | "es";

/**
 * Map of PT slug segments → localized equivalents.
 * Dynamic segments (species slugs, blog article slugs) are NOT mapped here
 * — they pass through unchanged because they're identifiers, not translatable.
 */
const SLUG_MAP: Record<string, Record<string, string>> = {
  pesca: { en: "sport-fishing", es: "pesca-deportiva" },
  "observacao-de-aves": { en: "birdwatching", es: "observacion-de-aves" },
  catalogo: { en: "catalog", es: "catalogo" },
  ecoturismo: { en: "ecotourism", es: "ecoturismo" },
  acomodacoes: { en: "accommodations", es: "alojamientos" },
  culinaria: { en: "cuisine", es: "gastronomia" },
  blog: { en: "blog", es: "blog" },
  contato: { en: "contact", es: "contacto" },
  "nosso-impacto": { en: "our-impact", es: "nuestro-impacto" },
  regiao: { en: "region", es: "region" },
  "politica-de-privacidade": {
    en: "privacy-policy",
    es: "politica-de-privacidad",
  },
};

/** Reverse lookup: localized slug → PT slug, keyed by lang */
const REVERSE_MAP: Record<string, Record<string, string>> = { en: {}, es: {} };
for (const [ptSlug, translations] of Object.entries(SLUG_MAP)) {
  for (const [lang, localizedSlug] of Object.entries(translations)) {
    REVERSE_MAP[lang][localizedSlug] = ptSlug;
  }
}

// ── Public helpers ────────────────────────────────────────────────────

export const SUPPORTED_LANGS: readonly Lang[] = ["pt", "en", "es"] as const;

/** Detect language from a URL path by its prefix. */
export function detectLangFromPath(path: string): Lang {
  if (path.startsWith("/en/") || path === "/en") return "en";
  if (path.startsWith("/es/") || path === "/es") return "es";
  return "pt";
}

/** Remove the /en/ or /es/ prefix, returning the bare path. */
export function stripLangPrefix(path: string): string {
  if (path.startsWith("/en/")) return path.slice(3) || "/";
  if (path.startsWith("/es/")) return path.slice(3) || "/";
  if (path === "/en" || path === "/es") return "/";
  return path;
}

/**
 * Convert any localized path to its PT canonical.
 * `/en/sport-fishing` → `/pesca`
 * `/es/pesca-deportiva` → `/pesca`
 * `/pesca` → `/pesca` (no-op)
 */
export function delocalizePath(path: string): string {
  const lang = detectLangFromPath(path);
  if (lang === "pt") return path;

  const stripped = stripLangPrefix(path);
  if (stripped === "/") return "/";

  const segments = stripped.split("/").filter(Boolean);
  const ptSegments = segments.map(
    (seg) => REVERSE_MAP[lang]?.[seg] ?? seg,
  );
  return "/" + ptSegments.join("/");
}

/**
 * Convert a PT canonical path to its localized version.
 * `/pesca` + "en" → `/en/sport-fishing`
 * `/pesca` + "pt" → `/pesca` (no-op)
 */
export function localizePath(ptPath: string, lang: Lang): string {
  if (lang === "pt") return ptPath;

  const prefix = lang === "en" ? "/en" : "/es";

  if (ptPath === "/") return prefix;

  const segments = ptPath.split("/").filter(Boolean);
  const localizedSegments = segments.map(
    (seg) => SLUG_MAP[seg]?.[lang] ?? seg,
  );
  return prefix + "/" + localizedSegments.join("/");
}

/**
 * Build the full set of hreflang URLs for a given PT canonical path.
 * Used by PageMeta and sitemap to emit proper alternates.
 */
export function getHreflangUrls(
  ptPath: string,
  baseUrl: string,
): Record<string, string> {
  const ptUrl = `${baseUrl}${ptPath === "/" ? "" : ptPath}`;
  const enPath = localizePath(ptPath, "en");
  const esPath = localizePath(ptPath, "es");
  return {
    "pt-BR": ptUrl,
    en: `${baseUrl}${enPath}`,
    es: `${baseUrl}${esPath}`,
    "x-default": ptUrl,
  };
}

/**
 * Check if a path belongs to the admin panel (should NOT be localized).
 */
export function isPanelPath(path: string): boolean {
  const bare = stripLangPrefix(path);
  return bare.startsWith("/painel");
}
