/**
 * 00-parse-csv.ts — Parse the raw CSV from João Andriola's bird survey.
 *
 * Handles:
 * - Multiline CSV fields (quoted values split across lines)
 * - Order/family header rows (no common name) → extracted as taxonomy context
 * - Known data errors (Phimosus EN name fix)
 * - Outputs clean JSON with 166 species + order/family from context
 *
 * Input:  data/species-source.csv
 * Output: data/species-parsed.json
 */

import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { CsvSpecies } from "./lib/types.js";
import { csvFixes, getReportMetadata, getTier } from "./lib/report-data.js";
import { writeJson } from "./lib/utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV_PATH = resolve(__dirname, "data", "species-source.csv");
const OUTPUT_PATH = resolve(__dirname, "data", "species-parsed.json");

/**
 * Parse the CSV handling multiline quoted fields.
 * The CSV has occasional line breaks inside quoted fields like:
 *   Phaethornis pretrei,rabo-branco-acanelado,"
 *   Cinnamon-throated Hermit"
 */
function parseRawCsv(raw: string): string[][] {
  const rows: string[][] = [];
  let current: string[] = [];
  let inQuote = false;
  let field = "";

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];

    if (ch === '"') {
      inQuote = !inQuote;
      continue;
    }

    if (ch === "," && !inQuote) {
      current.push(field.trim());
      field = "";
      continue;
    }

    if ((ch === "\n" || ch === "\r") && !inQuote) {
      if (ch === "\r" && raw[i + 1] === "\n") i++; // skip \r\n
      current.push(field.trim());
      field = "";
      if (current.some((c) => c.length > 0)) {
        rows.push(current);
      }
      current = [];
      continue;
    }

    // Inside a quoted multiline field, convert newlines to spaces
    if ((ch === "\n" || ch === "\r") && inQuote) {
      if (ch === "\r" && raw[i + 1] === "\n") i++;
      field += " ";
      continue;
    }

    field += ch;
  }

  // Last field/row
  current.push(field.trim());
  if (current.some((c) => c.length > 0)) {
    rows.push(current);
  }

  return rows;
}

async function main() {
  const raw = await readFile(CSV_PATH, "utf8");
  const rows = parseRawCsv(raw);

  // Skip header row
  const dataRows = rows.slice(1);

  const species: CsvSpecies[] = [];
  let currentOrder = "";
  let currentFamily = "";
  const orders: string[] = [];
  const families: string[] = [];

  for (const row of dataRows) {
    const taxa = row[0] ?? "";
    const nomePT = row[1] ?? "";
    const nomeEN = row.slice(2).join(",").trim(); // Handle commas in EN names

    if (!taxa) continue;

    // Header rows: order (ALL CAPS, no common name) or family (no common name)
    if (!nomePT) {
      if (taxa === taxa.toUpperCase()) {
        currentOrder = taxa;
        if (!orders.includes(taxa)) orders.push(taxa);
      } else {
        currentFamily = taxa;
        if (!families.includes(taxa)) families.push(taxa);
      }
      continue;
    }

    // Species row
    let enName = nomeEN;

    // Apply known fixes
    if (taxa in csvFixes) {
      enName = csvFixes[taxa].commonNameEN;
      console.log(`  FIX: ${taxa} EN name: "${nomeEN}" → "${enName}"`);
    }

    species.push({
      scientificName: taxa,
      commonNamePT: nomePT,
      commonNameEN: enName,
      order: currentOrder,
      family: currentFamily,
    });
  }

  // Compute tiers
  const tierCounts = { 1: 0, 2: 0, 3: 0 };
  const output = species.map((s) => {
    const tier = getTier(s.scientificName);
    const report = getReportMetadata(s.scientificName);
    tierCounts[tier]++;
    return { ...s, tier, report };
  });

  await writeJson(OUTPUT_PATH, output);

  console.log(`\nParsed ${species.length} species from CSV`);
  console.log(`  Orders: ${orders.length}`);
  console.log(`  Families: ${families.length}`);
  console.log(`  Tier 1 (threatened/restricted/notable): ${tierCounts[1]}`);
  console.log(`  Tier 2 (iconic/tourist): ${tierCounts[2]}`);
  console.log(`  Tier 3 (other): ${tierCounts[3]}`);
  console.log(`\nOutput: ${OUTPUT_PATH}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
