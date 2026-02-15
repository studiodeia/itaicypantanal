import type { GbifMatch } from "./types.js";
import { delay } from "./utils.js";

const GBIF_BASE = "https://api.gbif.org/v1/species/match";
const DELAY_MS = 200; // courtesy delay between requests

export interface GbifRawResponse {
  usageKey?: number;
  scientificName?: string;
  canonicalName?: string;
  order?: string;
  family?: string;
  genus?: string;
  status?: string;
  confidence?: number;
  matchType?: string;
  synonym?: boolean;
  note?: string;
  [key: string]: unknown;
}

/** Match a species name against GBIF Backbone Taxonomy */
export async function matchSpecies(
  scientificName: string,
): Promise<GbifMatch | null> {
  const url = `${GBIF_BASE}?name=${encodeURIComponent(scientificName)}&kingdom=Animalia&class=Aves`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`  GBIF HTTP ${res.status} for ${scientificName}`);
      return null;
    }

    const data = (await res.json()) as GbifRawResponse;

    if (data.matchType === "NONE" || !data.usageKey) {
      return null;
    }

    return {
      usageKey: data.usageKey!,
      scientificName: data.scientificName ?? scientificName,
      canonicalName: data.canonicalName ?? scientificName,
      order: data.order ?? "",
      family: data.family ?? "",
      genus: data.genus ?? "",
      status: data.status ?? "UNKNOWN",
      confidence: data.confidence ?? 0,
      matchType: data.matchType ?? "NONE",
      synonym: data.synonym ? data.scientificName : undefined,
      note: data.note ?? undefined,
    };
  } catch (err) {
    console.error(`  GBIF error for ${scientificName}:`, (err as Error).message);
    return null;
  }
}

/** Match all species with rate limiting */
export async function matchAllSpecies(
  names: string[],
  onProgress?: (current: number, total: number) => void,
): Promise<Map<string, GbifMatch | null>> {
  const results = new Map<string, GbifMatch | null>();

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const match = await matchSpecies(name);
    results.set(name, match);

    if (onProgress) onProgress(i + 1, names.length);
    if (i < names.length - 1) await delay(DELAY_MS);
  }

  return results;
}
