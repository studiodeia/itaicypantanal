/**
 * 04-consolidate.ts — Merge all enrichment data into a single JSON.
 *
 * Combines:
 * - Parsed CSV (species-parsed.json)
 * - GBIF results (gbif-results.json)
 * - Wikidata results (wikidata-results.json)
 * - Wikipedia index (wikipedia-index.json)
 * - Photo mapping (photo-mapping.json)
 *
 * Output: data/consolidated.json
 */

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { CsvSpecies, GbifMatch, WikidataResult, ReportMetadata, EnrichedSpecies, Tier } from "./lib/types.js";
import { readJson, writeJson } from "./lib/utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA = (f: string) => resolve(__dirname, "data", f);

interface ParsedEntry extends CsvSpecies {
  tier: Tier;
  report: ReportMetadata;
}

interface GbifEntry {
  scientificName: string;
  commonNamePT: string;
  match: GbifMatch | null;
}

interface WikidataEntry {
  scientificName: string;
  commonNamePT: string;
  tier: number;
  result: WikidataResult | null;
}

interface PhotoEntry {
  filename: string;
  imgId: string;
  scientificName: string;
  commonNamePT: string;
  note: string | null;
}

interface PhotoMapping {
  birds: PhotoEntry[];
  nonBirds: { filename: string; imgId: string; animal: string }[];
  summary: Record<string, unknown>;
}

async function main() {
  // Load all data sources
  const [parsed, gbifData, wikidataData, wikiIndex, photoMapping] = await Promise.all([
    readJson<ParsedEntry[]>(DATA("species-parsed.json")),
    readJson<GbifEntry[]>(DATA("gbif-results.json")),
    readJson<WikidataEntry[]>(DATA("wikidata-results.json")),
    readJson<Record<string, { pt?: string; en?: string }>>(DATA("wikipedia-index.json")).catch(() => ({})),
    readJson<PhotoMapping>(DATA("photo-mapping.json")).catch(() => ({
      birds: [] as PhotoEntry[],
      nonBirds: [],
      summary: {},
    })),
  ]);

  console.log(`Loaded: ${parsed.length} species, ${gbifData.length} GBIF, ${wikidataData.length} Wikidata`);
  console.log(`  Wikipedia index: ${Object.keys(wikiIndex).length} species`);
  console.log(`  Photo mapping: ${photoMapping.birds.length} bird photos\n`);

  // Build lookup maps
  const gbifMap = new Map(gbifData.map((g) => [g.scientificName, g.match]));
  const wikidataMap = new Map(wikidataData.map((w) => [w.scientificName, w.result]));

  // Build photo map: scientificName → filenames[]
  const photoMap = new Map<string, string[]>();
  for (const photo of photoMapping.birds) {
    const existing = photoMap.get(photo.scientificName) || [];
    existing.push(photo.filename);
    photoMap.set(photo.scientificName, existing);
  }

  // Consolidate
  const output: (EnrichedSpecies & {
    photos: string[];
    nonBirdPhotos?: never;
  })[] = [];

  let withGbif = 0;
  let withWikidata = 0;
  let withWikiText = 0;
  let withPhotos = 0;

  for (const species of parsed) {
    const gbif = gbifMap.get(species.scientificName) ?? null;
    const wikidata = wikidataMap.get(species.scientificName) ?? null;
    const wikiFiles = wikiIndex[species.scientificName] ?? {};
    const photos = photoMap.get(species.scientificName) ?? [];

    if (gbif) withGbif++;
    if (wikidata) withWikidata++;
    if (wikiFiles.pt || wikiFiles.en) withWikiText++;
    if (photos.length > 0) withPhotos++;

    output.push({
      scientificName: species.scientificName,
      commonNamePT: species.commonNamePT,
      commonNameEN: species.commonNameEN,
      csvOrder: species.order,
      csvFamily: species.family,
      gbif,
      wikidata,
      report: species.report,
      tier: species.tier,
      firecrawlFiles: {
        wikiPT: wikiFiles.pt,
        wikiEN: wikiFiles.en,
      },
      photos,
    });
  }

  await writeJson(DATA("consolidated.json"), output);

  const total = parsed.length;
  const pct = (n: number) => `${Math.round((n / total) * 100)}%`;

  console.log(`=== Consolidation Summary ===`);
  console.log(`  Total species: ${total}`);
  console.log(`  With GBIF:     ${withGbif}/${total} (${pct(withGbif)})`);
  console.log(`  With Wikidata: ${withWikidata}/${total} (${pct(withWikidata)})`);
  console.log(`  With Wiki text: ${withWikiText}/${total} (${pct(withWikiText)})`);
  console.log(`  With photos:   ${withPhotos}/${total} (${pct(withPhotos)})`);

  // Tier breakdown
  const tierStats = { 1: { total: 0, photo: 0 }, 2: { total: 0, photo: 0 }, 3: { total: 0, photo: 0 } };
  for (const s of output) {
    tierStats[s.tier].total++;
    if (s.photos.length > 0) tierStats[s.tier].photo++;
  }

  console.log(`\n=== Photo Coverage by Tier ===`);
  for (const tier of [1, 2, 3] as const) {
    const ts = tierStats[tier];
    console.log(`  Tier ${tier}: ${ts.photo}/${ts.total} species have photos (${pct(ts.photo)})`);
  }

  // Non-bird photos (for fauna gallery)
  if (photoMapping.nonBirds.length > 0) {
    console.log(`\n=== Non-Bird Wildlife Photos (${photoMapping.nonBirds.length}) ===`);
    for (const nb of photoMapping.nonBirds) {
      console.log(`  ${nb.animal} (${nb.filename})`);
    }
  }

  console.log(`\nOutput: ${DATA("consolidated.json")}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
