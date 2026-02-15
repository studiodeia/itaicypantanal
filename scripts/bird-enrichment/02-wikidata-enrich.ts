/**
 * 02-wikidata-enrich.ts — Enrich species with Wikidata structured data.
 *
 * For each species:
 * - IUCN conservation status (P141)
 * - Wikimedia Commons image (P18)
 * - Body length (P2043), mass (P2067)
 * - Wikipedia PT and EN sitelinks
 *
 * Input:  data/species-parsed.json
 * Output: data/wikidata-results.json
 */

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { CsvSpecies } from "./lib/types.js";
import { enrichAllSpecies } from "./lib/wikidata.js";
import { readJson, writeJson, logProgress } from "./lib/utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_PATH = resolve(__dirname, "data", "species-parsed.json");
const OUTPUT_PATH = resolve(__dirname, "data", "wikidata-results.json");

async function main() {
  const parsed = await readJson<(CsvSpecies & { tier: number })[]>(INPUT_PATH);
  console.log(`Loaded ${parsed.length} species\n`);

  const names = parsed.map((s) => s.scientificName);

  console.log("Querying Wikidata...");
  const results = await enrichAllSpecies(names, (c, t) =>
    logProgress(c, t, "species enriched"),
  );

  // Build output with coverage stats
  const output: Record<string, unknown>[] = [];
  let withIucn = 0;
  let withImage = 0;
  let withWikiPT = 0;
  let withWikiEN = 0;
  let withLength = 0;
  let withMass = 0;

  for (const species of parsed) {
    const result = results.get(species.scientificName) ?? null;
    output.push({
      scientificName: species.scientificName,
      commonNamePT: species.commonNamePT,
      tier: species.tier,
      result,
    });

    if (result) {
      if (result.iucnStatus) withIucn++;
      if (result.wikimediaImage) withImage++;
      if (result.wikipediaPT) withWikiPT++;
      if (result.wikipediaEN) withWikiEN++;
      if (result.lengthCm) withLength++;
      if (result.massG) withMass++;
    }
  }

  await writeJson(OUTPUT_PATH, output);

  const total = parsed.length;
  const found = output.filter((o) => o.result !== null).length;

  console.log(`\n=== Wikidata Coverage ===`);
  console.log(`  Found:       ${found}/${total} (${pct(found, total)})`);
  console.log(`  IUCN status: ${withIucn}/${total} (${pct(withIucn, total)})`);
  console.log(`  Image:       ${withImage}/${total} (${pct(withImage, total)})`);
  console.log(`  Wiki PT:     ${withWikiPT}/${total} (${pct(withWikiPT, total)})`);
  console.log(`  Wiki EN:     ${withWikiEN}/${total} (${pct(withWikiEN, total)})`);
  console.log(`  Length:      ${withLength}/${total} (${pct(withLength, total)})`);
  console.log(`  Mass:        ${withMass}/${total} (${pct(withMass, total)})`);

  // Flag species without Wikipedia PT (will need EN fallback or reduced content)
  const noWikiPT = output.filter(
    (o) => o.result && !(o.result as Record<string, unknown>).wikipediaPT,
  );
  if (noWikiPT.length > 0) {
    console.log(`\n=== Missing Wikipedia PT (${noWikiPT.length}) ===`);
    for (const s of noWikiPT.slice(0, 20)) {
      const r = s.result as Record<string, unknown>;
      console.log(
        `  ${s.scientificName} (Tier ${s.tier})${r?.wikipediaEN ? " — has EN" : " — NO WIKI"}`,
      );
    }
    if (noWikiPT.length > 20) console.log(`  ... and ${noWikiPT.length - 20} more`);
  }

  console.log(`\nOutput: ${OUTPUT_PATH}`);
}

function pct(n: number, total: number): string {
  return `${Math.round((n / total) * 100)}%`;
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
