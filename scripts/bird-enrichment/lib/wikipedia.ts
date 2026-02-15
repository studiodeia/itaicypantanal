/**
 * wikipedia.ts — Extract article text from Wikipedia using the MediaWiki API.
 *
 * Uses the TextExtracts API (action=query, prop=extracts) which returns
 * clean plain text with section headings. Free, no API key needed.
 *
 * Rate limit: 200 requests/second for MediaWiki API, but we use 300ms
 * delay out of courtesy.
 */

import { delay } from "./utils.js";

const DELAY_MS = 300;

interface WikiExtractResponse {
  query?: {
    pages?: Record<
      string,
      {
        pageid?: number;
        title?: string;
        extract?: string;
        missing?: boolean;
      }
    >;
  };
}

/**
 * Extract the article title from a Wikipedia URL.
 * e.g. "https://pt.wikipedia.org/wiki/Tuiuiú" → "Tuiuiú"
 *      "https://pt.wikipedia.org/wiki/Beija-flor-de-garganta-verde" → "Beija-flor-de-garganta-verde"
 */
function extractTitle(url: string): string | null {
  const match = url.match(/wikipedia\.org\/wiki\/(.+)$/);
  if (!match) return null;
  return decodeURIComponent(match[1].replace(/_/g, " "));
}

/**
 * Detect language from Wikipedia URL.
 * e.g. "https://pt.wikipedia.org/..." → "pt"
 */
function extractLang(url: string): string {
  const match = url.match(/https?:\/\/(\w+)\.wikipedia\.org/);
  return match ? match[1] : "en";
}

/**
 * Fetch plain text extract from a Wikipedia article.
 * Returns the full article text with section headings marked as "== Heading ==".
 */
export async function fetchWikipediaText(
  url: string,
): Promise<string | null> {
  const title = extractTitle(url);
  if (!title) return null;

  const lang = extractLang(url);
  const apiBase = `https://${lang}.wikipedia.org/w/api.php`;

  const params = new URLSearchParams({
    action: "query",
    titles: title,
    prop: "extracts",
    format: "json",
    explaintext: "1", // plain text, no HTML
    exsectionformat: "wiki", // keep == Section == headers
  });

  try {
    const res = await fetch(`${apiBase}?${params}`, {
      headers: {
        "User-Agent": "ItaicyBirdPipeline/1.0 (bird-enrichment script)",
      },
    });

    if (!res.ok) return null;

    const data = (await res.json()) as WikiExtractResponse;
    const pages = data.query?.pages;
    if (!pages) return null;

    // Get first (only) page result
    const page = Object.values(pages)[0];
    if (!page || page.missing || !page.extract) return null;

    return page.extract;
  } catch {
    return null;
  }
}

/**
 * Fetch Wikipedia text for all species that have Wikipedia URLs.
 * Returns a Map of scientificName → { wikiPT, wikiEN } text content.
 */
export async function fetchAllWikipedia(
  species: { scientificName: string; wikiPT: string | null; wikiEN: string | null; tier: number }[],
  onProgress?: (current: number, total: number) => void,
): Promise<Map<string, { wikiPT: string | null; wikiEN: string | null }>> {
  const results = new Map<string, { wikiPT: string | null; wikiEN: string | null }>();

  // Count total requests
  let totalRequests = 0;
  for (const s of species) {
    if (s.wikiPT) totalRequests++;
    // EN: Tier 1+2 always, Tier 3 only if no PT
    if (s.wikiEN && (s.tier <= 2 || !s.wikiPT)) totalRequests++;
  }

  let current = 0;

  for (const s of species) {
    let wikiPT: string | null = null;
    let wikiEN: string | null = null;

    // Fetch PT (all tiers)
    if (s.wikiPT) {
      wikiPT = await fetchWikipediaText(s.wikiPT);
      current++;
      if (onProgress) onProgress(current, totalRequests);
      await delay(DELAY_MS);
    }

    // Fetch EN (Tier 1+2 always, Tier 3 only if no PT)
    if (s.wikiEN && (s.tier <= 2 || !s.wikiPT)) {
      wikiEN = await fetchWikipediaText(s.wikiEN);
      current++;
      if (onProgress) onProgress(current, totalRequests);
      await delay(DELAY_MS);
    }

    results.set(s.scientificName, { wikiPT, wikiEN });
  }

  return results;
}
