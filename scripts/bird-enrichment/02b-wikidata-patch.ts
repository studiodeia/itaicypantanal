/**
 * 02b-wikidata-patch.ts — Patch wikidata-results.json with manual corrections.
 *
 * Fixes 8 species where automated Wikidata search returned wrong/incomplete
 * data due to taxonomic reclassifications (CBRO 2024) or spelling differences.
 *
 * Input:  data/wikidata-results.json (from 02-wikidata-enrich.ts)
 * Output: data/wikidata-results.json (patched in place)
 */

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { WikidataResult } from "./lib/types.js";
import { wikidataOverrides } from "./lib/wikidata-fixes.js";
import { readJson, writeJson } from "./lib/utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "data", "wikidata-results.json");

interface WikidataEntry {
  scientificName: string;
  commonNamePT: string;
  tier: number;
  result: WikidataResult | null;
}

async function main() {
  const data = await readJson<WikidataEntry[]>(DATA_PATH);
  console.log(`Loaded ${data.length} species from wikidata-results.json\n`);

  let patched = 0;
  let added = 0;

  for (const entry of data) {
    const override = wikidataOverrides[entry.scientificName];
    if (!override) continue;

    const had = entry.result !== null;
    const hadWikiPT = had && entry.result!.wikipediaPT !== null;

    entry.result = override;

    if (had) {
      patched++;
      console.log(
        `  PATCH: ${entry.scientificName} — ${override.qid}` +
          (hadWikiPT ? "" : ` (+Wiki PT: ${override.wikipediaPT ? "yes" : "no"})`),
      );
    } else {
      added++;
      console.log(
        `  ADD:   ${entry.scientificName} — ${override.qid} (was null)`,
      );
    }
  }

  await writeJson(DATA_PATH, data);

  // Recompute coverage stats
  let withResult = 0;
  let withIucn = 0;
  let withImage = 0;
  let withWikiPT = 0;
  let withWikiEN = 0;
  let withLength = 0;
  let withMass = 0;

  for (const entry of data) {
    if (!entry.result) continue;
    withResult++;
    if (entry.result.iucnStatus) withIucn++;
    if (entry.result.wikimediaImage) withImage++;
    if (entry.result.wikipediaPT) withWikiPT++;
    if (entry.result.wikipediaEN) withWikiEN++;
    if (entry.result.lengthCm) withLength++;
    if (entry.result.massG) withMass++;
  }

  const total = data.length;
  const pct = (n: number) => `${Math.round((n / total) * 100)}%`;

  console.log(`\n=== Patch Summary ===`);
  console.log(`  Patched (had data): ${patched}`);
  console.log(`  Added (was null):   ${added}`);
  console.log(`  Total changes:      ${patched + added}`);

  console.log(`\n=== Updated Coverage ===`);
  console.log(`  Found:       ${withResult}/${total} (${pct(withResult)})`);
  console.log(`  IUCN status: ${withIucn}/${total} (${pct(withIucn)})`);
  console.log(`  Image:       ${withImage}/${total} (${pct(withImage)})`);
  console.log(`  Wiki PT:     ${withWikiPT}/${total} (${pct(withWikiPT)})`);
  console.log(`  Wiki EN:     ${withWikiEN}/${total} (${pct(withWikiEN)})`);
  console.log(`  Length:      ${withLength}/${total} (${pct(withLength)})`);
  console.log(`  Mass:        ${withMass}/${total} (${pct(withMass)})`);

  // Show remaining gaps
  const noResult = data.filter((e) => !e.result);
  const noWikiPT = data.filter((e) => e.result && !e.result.wikipediaPT);

  if (noResult.length > 0) {
    console.log(`\n=== Still No Result (${noResult.length}) ===`);
    for (const e of noResult) {
      console.log(`  ${e.scientificName} (${e.commonNamePT}, Tier ${e.tier})`);
    }
  }

  if (noWikiPT.length > 0) {
    console.log(`\n=== Still No Wikipedia PT (${noWikiPT.length}) ===`);
    for (const e of noWikiPT) {
      const r = e.result!;
      console.log(
        `  ${e.scientificName} (Tier ${e.tier})` +
          (r.wikipediaEN ? " — has EN" : " — NO WIKI"),
      );
    }
  }

  console.log(`\nOutput: ${DATA_PATH}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
