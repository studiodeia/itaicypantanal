/**
 * Server-side route localization helpers.
 *
 * KEEP IN SYNC with client/src/i18n/routes.ts — same SLUG_MAP and logic.
 * This file has zero dependencies (no React, no browser APIs).
 */

type Lang = "pt" | "en" | "es";

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

const REVERSE_MAP: Record<string, Record<string, string>> = { en: {}, es: {} };
for (const [ptSlug, translations] of Object.entries(SLUG_MAP)) {
  for (const [lang, localizedSlug] of Object.entries(translations)) {
    REVERSE_MAP[lang][localizedSlug] = ptSlug;
  }
}

export const SUPPORTED_LANGS: readonly Lang[] = ["pt", "en", "es"] as const;

export function detectLangFromPath(path: string): Lang {
  if (path.startsWith("/en/") || path === "/en") return "en";
  if (path.startsWith("/es/") || path === "/es") return "es";
  return "pt";
}

export function stripLangPrefix(path: string): string {
  if (path.startsWith("/en/")) return path.slice(3) || "/";
  if (path.startsWith("/es/")) return path.slice(3) || "/";
  if (path === "/en" || path === "/es") return "/";
  return path;
}

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

/** Build hreflang URL map for a given PT canonical path. */
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
