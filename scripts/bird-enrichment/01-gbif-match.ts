/**
 * 01-gbif-match.ts — Validate all species against GBIF Backbone Taxonomy.
 *
 * For each species from the parsed CSV:
 * - Validates scientific name
 * - Returns canonical name, order, family, genus
 * - Detects synonyms and fuzzy matches
 * - Flags confidence < 90 for manual review
 *
 * Input:  data/species-parsed.json
 * Output: data/gbif-results.json
 */

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { CsvSpecies } from "./lib/types.js";
import { matchAllSpecies } from "./lib/gbif.js";
import { readJson, writeJson, logProgress } from "./lib/utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_PATH = resolve(__dirname, "data", "species-parsed.json");
const OUTPUT_PATH = resolve(__dirname, "data", "gbif-results.json");

async function main() {
  const parsed = await readJson<(CsvSpecies & { tier: number })[]>(INPUT_PATH);
  console.log(`Loaded ${parsed.length} species from parsed CSV\n`);

  const names = parsed.map((s) => s.scientificName);

  console.log("Querying GBIF Species Match API...");
  const results = await matchAllSpecies(names, (c, t) =>
    logProgress(c, t, "species matched"),
  );

  // Build output with analysis
  const output: Record<string, unknown>[] = [];
  let exact = 0;
  let fuzzy = 0;
  let noMatch = 0;
  let synonyms = 0;
  const lowConfidence: string[] = [];
  const nameChanges: { csv: string; gbif: string; confidence: number }[] = [];

  for (const species of parsed) {
    const match = results.get(species.scientificName) ?? null;
    output.push({
      scientificName: species.scientificName,
      commonNamePT: species.commonNamePT,
      match,
    });

    if (!match) {
      noMatch++;
      continue;
    }

    if (match.matchType === "EXACT") exact++;
    else if (match.matchType === "FUZZY") fuzzy++;

    if (match.status === "SYNONYM" && match.synonym) {
      synonyms++;
      nameChanges.push({
        csv: species.scientificName,
        gbif: match.canonicalName,
        confidence: match.confidence,
      });
    }

    if (match.confidence < 90) {
      lowConfidence.push(
        `${species.scientificName} (${match.confidence}%, ${match.matchType})`,
      );
    }

    // Check if GBIF corrected the name
    if (
      match.canonicalName !== species.scientificName &&
      match.status === "ACCEPTED"
    ) {
      nameChanges.push({
        csv: species.scientificName,
        gbif: match.canonicalName,
        confidence: match.confidence,
      });
    }
  }

  await writeJson(OUTPUT_PATH, output);

  console.log(`\n=== GBIF Results ===`);
  console.log(`  Exact matches: ${exact}`);
  console.log(`  Fuzzy matches: ${fuzzy}`);
  console.log(`  No match: ${noMatch}`);
  console.log(`  Synonyms detected: ${synonyms}`);

  if (nameChanges.length > 0) {
    console.log(`\n=== Name Changes/Corrections ===`);
    for (const nc of nameChanges) {
      console.log(`  ${nc.csv} → ${nc.gbif} (${nc.confidence}%)`);
    }
  }

  if (lowConfidence.length > 0) {
    console.log(`\n=== Low Confidence (< 90%) - Manual Review Needed ===`);
    for (const lc of lowConfidence) {
      console.log(`  ${lc}`);
    }
  }

  if (noMatch > 0) {
    console.log(`\n=== No Match - Manual Review Needed ===`);
    for (const entry of output) {
      if (!entry.match) {
        console.log(`  ${entry.scientificName} (${entry.commonNamePT})`);
      }
    }
  }

  console.log(`\nOutput: ${OUTPUT_PATH}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
