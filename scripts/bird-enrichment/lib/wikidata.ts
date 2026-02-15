import type { WikidataResult } from "./types.js";
import { delay } from "./utils.js";

const SEARCH_BASE = "https://www.wikidata.org/w/api.php";
const ENTITY_BASE = "https://www.wikidata.org/wiki/Special:EntityData";
const DELAY_MS = 300;

// Wikidata property IDs
const P_IUCN = "P141";          // IUCN conservation status
const P_IMAGE = "P18";          // image (Wikimedia Commons)
const P_LENGTH = "P2043";       // length
const P_MASS = "P2067";         // mass

// IUCN status QIDs → abbreviations
const iucnMap: Record<string, string> = {
  Q211005: "LC",   // Least Concern
  Q719675: "NT",   // Near Threatened
  Q278113: "VU",   // Vulnerable
  Q11394: "EN",    // Endangered
  Q219127: "CR",   // Critically Endangered
  Q239509: "EW",   // Extinct in the Wild
  Q237350: "EX",   // Extinct
  Q3245245: "DD",  // Data Deficient
  Q14860464: "NE", // Not Evaluated
};

/** Search Wikidata for a species by scientific name */
async function searchEntity(scientificName: string): Promise<string | null> {
  const params = new URLSearchParams({
    action: "wbsearchentities",
    search: scientificName,
    language: "en",
    type: "item",
    format: "json",
    limit: "5",
  });

  try {
    const res = await fetch(`${SEARCH_BASE}?${params}`);
    if (!res.ok) return null;

    const data = (await res.json()) as {
      search?: { id: string; label: string; description?: string }[];
    };

    // Find the best match — prefer items that look like taxa
    const results = data.search ?? [];
    for (const item of results) {
      const desc = (item.description ?? "").toLowerCase();
      if (
        desc.includes("species") ||
        desc.includes("bird") ||
        desc.includes("ave")
      ) {
        return item.id;
      }
    }
    // Fallback to first result
    return results[0]?.id ?? null;
  } catch {
    return null;
  }
}

/** Extract a numeric quantity from a Wikidata claim */
function extractQuantity(
  claims: Record<string, unknown[]>,
  property: string,
): number | null {
  const claim = claims[property];
  if (!claim || !Array.isArray(claim) || claim.length === 0) return null;

  const mainsnak = (claim[0] as Record<string, unknown>)
    .mainsnak as Record<string, unknown>;
  if (!mainsnak?.datavalue) return null;

  const dv = mainsnak.datavalue as { value?: { amount?: string } };
  const amount = dv.value?.amount;
  if (!amount) return null;

  return parseFloat(amount.replace("+", ""));
}

/** Extract IUCN status from claims */
function extractIucn(claims: Record<string, unknown[]>): string | null {
  const claim = claims[P_IUCN];
  if (!claim || !Array.isArray(claim) || claim.length === 0) return null;

  // Get the most recent claim (last in array, usually)
  const latest = claim[claim.length - 1] as Record<string, unknown>;
  const mainsnak = latest.mainsnak as Record<string, unknown>;
  if (!mainsnak?.datavalue) return null;

  const dv = mainsnak.datavalue as { value?: { id?: string } };
  const qid = dv.value?.id;
  if (!qid) return null;

  return iucnMap[qid] ?? null;
}

/** Extract Wikimedia Commons image filename */
function extractImage(claims: Record<string, unknown[]>): string | null {
  const claim = claims[P_IMAGE];
  if (!claim || !Array.isArray(claim) || claim.length === 0) return null;

  const mainsnak = (claim[0] as Record<string, unknown>)
    .mainsnak as Record<string, unknown>;
  if (!mainsnak?.datavalue) return null;

  const dv = mainsnak.datavalue as { value?: string };
  const filename = dv.value;
  if (!filename) return null;

  // Build Wikimedia Commons URL
  const encoded = encodeURIComponent(filename.replace(/ /g, "_"));
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}`;
}

/** Extract Wikipedia sitelinks */
function extractSitelink(
  sitelinks: Record<string, { title?: string }>,
  site: string,
): string | null {
  const link = sitelinks[site];
  if (!link?.title) return null;

  const lang = site.replace("wiki", "");
  const encoded = encodeURIComponent(link.title.replace(/ /g, "_"));
  return `https://${lang}.wikipedia.org/wiki/${encoded}`;
}

/** Fetch full entity data from Wikidata */
async function fetchEntity(qid: string): Promise<WikidataResult | null> {
  try {
    const res = await fetch(`${ENTITY_BASE}/${qid}.json`);
    if (!res.ok) return null;

    const data = (await res.json()) as {
      entities?: Record<
        string,
        {
          claims?: Record<string, unknown[]>;
          sitelinks?: Record<string, { title?: string }>;
        }
      >;
    };

    const entity = data.entities?.[qid];
    if (!entity) return null;

    const claims = entity.claims ?? {};
    const sitelinks = entity.sitelinks ?? {};

    // Length: convert to cm if in meters
    let lengthCm = extractQuantity(claims, P_LENGTH);
    if (lengthCm !== null && lengthCm < 10) {
      // Likely in meters, convert to cm
      lengthCm = Math.round(lengthCm * 100);
    }

    // Mass: convert to grams if in kg
    let massG = extractQuantity(claims, P_MASS);
    if (massG !== null && massG < 50) {
      // Likely in kg, convert to grams
      massG = Math.round(massG * 1000);
    }

    return {
      qid,
      iucnStatus: extractIucn(claims),
      lengthCm,
      massG,
      wikimediaImage: extractImage(claims),
      wikipediaPT: extractSitelink(sitelinks, "ptwiki"),
      wikipediaEN: extractSitelink(sitelinks, "enwiki"),
    };
  } catch {
    return null;
  }
}

/** Enrich a single species via Wikidata */
export async function enrichSpecies(
  scientificName: string,
): Promise<WikidataResult | null> {
  const qid = await searchEntity(scientificName);
  if (!qid) return null;

  return fetchEntity(qid);
}

/** Enrich all species with rate limiting */
export async function enrichAllSpecies(
  names: string[],
  onProgress?: (current: number, total: number) => void,
): Promise<Map<string, WikidataResult | null>> {
  const results = new Map<string, WikidataResult | null>();

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const result = await enrichSpecies(name);
    results.set(name, result);

    if (onProgress) onProgress(i + 1, names.length);
    if (i < names.length - 1) await delay(DELAY_MS);
  }

  return results;
}
