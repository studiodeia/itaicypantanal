/**
 * 03-wikipedia-scrape.ts — Fetch Wikipedia article text for all species.
 *
 * Uses the free MediaWiki TextExtracts API (no Firecrawl credits needed).
 * Saves each article as individual .md files in data/wikipedia-raw/.
 *
 * Strategy:
 * - Wikipedia PT: all 166 species (if URL available from Wikidata)
 * - Wikipedia EN: Tier 1+2 always, Tier 3 only if no PT available
 *
 * Input:  data/wikidata-results.json
 * Output: data/wikipedia-raw/{lang}/{slug}.md (one file per article)
 *         data/wikipedia-index.json (mapping species → files)
 */

import { resolve, dirname } from "node:path";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type { WikidataResult } from "./lib/types.js";
import { fetchAllWikipedia } from "./lib/wikipedia.js";
import { readJson, writeJson, writeText, logProgress } from "./lib/utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WIKIDATA_PATH = resolve(__dirname, "data", "wikidata-results.json");
const OUTPUT_DIR = resolve(__dirname, "data", "wikipedia-raw");
const INDEX_PATH = resolve(__dirname, "data", "wikipedia-index.json");

interface WikidataEntry {
  scientificName: string;
  commonNamePT: string;
  tier: number;
  result: WikidataResult | null;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

async function main() {
  const data = await readJson<WikidataEntry[]>(WIKIDATA_PATH);
  console.log(`Loaded ${data.length} species\n`);

  // Ensure output dirs
  await mkdir(resolve(OUTPUT_DIR, "pt"), { recursive: true });
  await mkdir(resolve(OUTPUT_DIR, "en"), { recursive: true });

  // Build input for fetchAllWikipedia
  const speciesInput = data.map((d) => ({
    scientificName: d.scientificName,
    wikiPT: d.result?.wikipediaPT ?? null,
    wikiEN: d.result?.wikipediaEN ?? null,
    tier: d.tier,
  }));

  // Count expected requests
  let expectedPT = 0;
  let expectedEN = 0;
  for (const s of speciesInput) {
    if (s.wikiPT) expectedPT++;
    if (s.wikiEN && (s.tier <= 2 || !s.wikiPT)) expectedEN++;
  }
  console.log(`Expected requests: ${expectedPT} PT + ${expectedEN} EN = ${expectedPT + expectedEN} total`);
  console.log("Fetching Wikipedia articles...\n");

  const results = await fetchAllWikipedia(speciesInput, (c, t) =>
    logProgress(c, t, "articles fetched"),
  );

  // Save individual files and build index
  const index: Record<string, { pt?: string; en?: string }> = {};
  let savedPT = 0;
  let savedEN = 0;
  let emptyPT = 0;
  let emptyEN = 0;

  for (const [scientificName, texts] of results) {
    const slug = slugify(scientificName);
    const entry: { pt?: string; en?: string } = {};

    if (texts.wikiPT) {
      const filePath = resolve(OUTPUT_DIR, "pt", `${slug}.md`);
      await writeText(filePath, texts.wikiPT);
      entry.pt = `wikipedia-raw/pt/${slug}.md`;
      savedPT++;
    } else if (speciesInput.find((s) => s.scientificName === scientificName)?.wikiPT) {
      emptyPT++;
    }

    if (texts.wikiEN) {
      const filePath = resolve(OUTPUT_DIR, "en", `${slug}.md`);
      await writeText(filePath, texts.wikiEN);
      entry.en = `wikipedia-raw/en/${slug}.md`;
      savedEN++;
    } else {
      const spec = speciesInput.find((s) => s.scientificName === scientificName);
      if (spec?.wikiEN && (spec.tier <= 2 || !spec.wikiPT)) {
        emptyEN++;
      }
    }

    if (entry.pt || entry.en) {
      index[scientificName] = entry;
    }
  }

  await writeJson(INDEX_PATH, index);

  const total = data.length;
  const withAny = Object.keys(index).length;
  const withBoth = Object.values(index).filter((e) => e.pt && e.en).length;

  console.log(`\n=== Wikipedia Scrape Results ===`);
  console.log(`  Saved PT articles: ${savedPT}/${expectedPT}${emptyPT > 0 ? ` (${emptyPT} empty)` : ""}`);
  console.log(`  Saved EN articles: ${savedEN}/${expectedEN}${emptyEN > 0 ? ` (${emptyEN} empty)` : ""}`);
  console.log(`  Species with any text: ${withAny}/${total}`);
  console.log(`  Species with both PT+EN: ${withBoth}`);

  // Report species without any Wikipedia text
  const noText = data.filter((d) => !index[d.scientificName]);
  if (noText.length > 0) {
    console.log(`\n=== No Wikipedia Text (${noText.length}) ===`);
    for (const s of noText) {
      console.log(`  ${s.scientificName} (${s.commonNamePT}, Tier ${s.tier})`);
    }
  }

  console.log(`\nOutput: ${INDEX_PATH}`);
  console.log(`Files:  ${OUTPUT_DIR}/`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
