/**
 * 06-generate-seed.ts — Generate CMS seed JSON from pipeline data.
 *
 * Merges consolidated.json + editorial.json into the format expected
 * by importSeed.ts (Payload CMS).
 *
 * Input:  data/consolidated.json + data/editorial.json (optional)
 * Output: ../../docs/payload-seed/bird-species-seed.json
 *         (also updates birdwatching section in full-seed.json)
 */

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { EnrichedSpecies, EditorialContent } from "./lib/types.js";
import { readJson, writeJson } from "./lib/utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA = (f: string) => resolve(__dirname, "data", f);
const SEED_DIR = resolve(__dirname, "..", "..", "docs", "payload-seed");

// ── Slug generation (must match importSeed.ts slugify) ──────────────

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── Category assignment by taxonomic order ──────────────────────────

const ORDER_TO_CATEGORY: Record<string, string> = {
  // Aquáticas (waterbirds)
  Pelecaniformes: "Aquáticas",
  Ciconiiformes: "Aquáticas",
  Suliformes: "Aquáticas",
  Charadriiformes: "Aquáticas",
  Gruiformes: "Aquáticas",
  Anseriformes: "Aquáticas",
  Eurypygiformes: "Aquáticas",

  // Psitacídeos (parrots)
  Psittaciformes: "Psitacídeos",

  // Rapinas (raptors)
  Accipitriformes: "Rapinas",
  Falconiformes: "Rapinas",
  Cathartiformes: "Rapinas",
  Strigiformes: "Rapinas",

  // Galiformes (game birds)
  Galliformes: "Galiformes",

  // Columbiformes (doves/pigeons)
  Columbiformes: "Columbiformes",

  // Piciformes (woodpeckers, toucans)
  Piciformes: "Piciformes",

  // Coraciiformes (kingfishers)
  Coraciiformes: "Coraciiformes",

  // Caprimulgiformes (nightjars) + Nyctibiiformes (potoos) + Apodiformes (swifts/hummingbirds)
  Caprimulgiformes: "Caprimulgiformes",
  Nyctibiiformes: "Caprimulgiformes",
  Apodiformes: "Caprimulgiformes",

  // Cuculiformes (cuckoos)
  Cuculiformes: "Outros",

  // Trogoniformes (trogons)
  Trogoniformes: "Outros",

  // Galbuliformes (jacamars, puffbirds)
  Galbuliformes: "Outros",

  // Tinamiformes (tinamous)
  Tinamiformes: "Outros",

  // Passeriformes (songbirds — largest group)
  Passeriformes: "Passeriformes",
};

function assignCategory(species: ConsolidatedEntry): string {
  const order = species.gbif?.order || species.csvOrder;
  const normalized =
    order.charAt(0).toUpperCase() + order.slice(1).toLowerCase();
  return ORDER_TO_CATEGORY[normalized] || "Outros";
}

// ── IUCN status mapping ─────────────────────────────────────────────

const IUCN_LABELS: Record<string, string> = {
  LC: "Pouco Preocupante (LC)",
  NT: "Quase Ameaçada (NT)",
  VU: "Vulnerável (VU)",
  EN: "Em Perigo (EN)",
  CR: "Criticamente Em Perigo (CR)",
  DD: "Dados Insuficientes (DD)",
  NE: "Não Avaliada (NE)",
};

function formatIucn(code: string | null): string {
  if (!code) return "Pouco Preocupante (LC)";
  return IUCN_LABELS[code] || code;
}

// ── Related species (same family, max 3) ────────────────────────────

function buildRelatedMap(
  species: ConsolidatedEntry[],
): Map<string, string[]> {
  // Group by family
  const byFamily = new Map<string, ConsolidatedEntry[]>();
  for (const s of species) {
    const family = s.gbif?.family || s.csvFamily;
    if (!byFamily.has(family)) byFamily.set(family, []);
    byFamily.get(family)!.push(s);
  }

  const related = new Map<string, string[]>();
  for (const s of species) {
    const slug = slugify(s.commonNamePT);
    const family = s.gbif?.family || s.csvFamily;
    const familyMembers = byFamily.get(family) || [];

    // Same family, different species, prefer those with photos, max 3
    const candidates = familyMembers
      .filter((c) => c.scientificName !== s.scientificName)
      .sort((a, b) => {
        // Prefer species with photos
        if (a.photos.length > 0 && b.photos.length === 0) return -1;
        if (a.photos.length === 0 && b.photos.length > 0) return 1;
        // Then prefer lower tier
        return a.tier - b.tier;
      })
      .slice(0, 3)
      .map((c) => slugify(c.commonNamePT));

    related.set(slug, candidates);
  }

  return related;
}

// ── Featured species selection ──────────────────────────────────────

function selectFeatured(species: ConsolidatedEntry[]): string[] {
  // Pick Tier 1 species with photos, max 6
  return species
    .filter((s) => s.tier === 1 && s.photos.length > 0)
    .sort((a, b) => {
      // Threatened first, then notable, then alphabetical
      if (a.report.isThreatened && !b.report.isThreatened) return -1;
      if (!a.report.isThreatened && b.report.isThreatened) return 1;
      return a.commonNamePT.localeCompare(b.commonNamePT, "pt-BR");
    })
    .slice(0, 6)
    .map((s) => slugify(s.commonNamePT));
}

// ── Image path for a species ────────────────────────────────────────

function getImagePath(species: ConsolidatedEntry): string {
  if (species.photos.length > 0) {
    // Use first local photo
    return `/images/birds/${species.photos[0]}`;
  }
  // Wikimedia fallback — store as external URL for now
  if (species.wikidata?.wikimediaImage) {
    return species.wikidata.wikimediaImage;
  }
  return "";
}

// ── Types ───────────────────────────────────────────────────────────

interface ConsolidatedEntry extends EnrichedSpecies {
  photos: string[];
}

interface SeedBird {
  slug: string;
  commonName: string;
  scientificName: string;
  description: string;
  category: string;
  tag: string;
  src: string;
  author: string;
  date: string;
  taxonomicOrder: string;
  family: string;
  commonNameEN: string;
}

interface SeedBirdDetail extends SeedBird {
  heroImage: string;
  conservationStatus: string;
  size: string;
  habitat: string;
  overview: string;
  diet: string;
  behavior: string;
  bestTime: string;
  photographyTips: string[];
  relatedSlugs: string[];
}

interface BirdSeed {
  categories: string[];
  species: SeedBird[];
  details: SeedBirdDetail[];
  featuredSlugs: string[];
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  const consolidated = await readJson<ConsolidatedEntry[]>(
    DATA("consolidated.json"),
  );
  console.log(`Loaded ${consolidated.length} species from consolidated.json`);

  // Load editorial.json if available
  let editorial: Record<string, EditorialContent> = {};
  try {
    editorial = await readJson<Record<string, EditorialContent>>(
      DATA("editorial.json"),
    );
    console.log(
      `Loaded editorial.json with ${Object.keys(editorial).length} entries`,
    );
  } catch {
    console.log(
      "No editorial.json found — generating seed with basic data only",
    );
  }

  const relatedMap = buildRelatedMap(consolidated);
  const featuredSlugs = selectFeatured(consolidated);

  // Collect categories
  const categorySet = new Set<string>();
  for (const s of consolidated) {
    categorySet.add(assignCategory(s));
  }
  const categories = [...categorySet].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );

  const species: SeedBird[] = [];
  const details: SeedBirdDetail[] = [];

  let withEditorial = 0;
  let withPhotos = 0;

  for (const s of consolidated) {
    const slug = slugify(s.commonNamePT);
    const category = assignCategory(s);
    const ed = editorial[s.scientificName];
    const imagePath = getImagePath(s);

    if (ed) withEditorial++;
    if (s.photos.length > 0) withPhotos++;

    // Capitalize common name properly
    const commonName = s.commonNamePT
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("-");

    const bird: SeedBird = {
      slug,
      commonName,
      scientificName: s.scientificName,
      description: ed?.description || "",
      category,
      tag: s.report.isThreatened
        ? "Ameaçada"
        : s.report.isPantanalRestricted
          ? "Endêmica"
          : "Fauna",
      src: imagePath,
      author: s.photos.length > 0 ? "João Andriola" : "",
      date: s.photos.length > 0 ? "Maio de 2024" : "",
      taxonomicOrder: s.gbif?.order || s.csvOrder,
      family: s.gbif?.family || s.csvFamily,
      commonNameEN: s.commonNameEN,
    };

    species.push(bird);

    // Always generate detail entry
    const detail: SeedBirdDetail = {
      ...bird,
      heroImage: imagePath,
      conservationStatus: ed?.conservationStatus || formatIucn(s.wikidata?.iucnStatus || null),
      size: ed?.size || "",
      habitat: ed?.habitat || "",
      overview: ed?.overview || "",
      diet: ed?.diet || "",
      behavior: ed?.behavior || "",
      bestTime: ed?.bestTime || "",
      photographyTips: ed?.photographyTips || [],
      relatedSlugs: relatedMap.get(slug) || [],
    };

    details.push(detail);
  }

  const seed: BirdSeed = {
    categories,
    species,
    details,
    featuredSlugs,
  };

  // Write bird-specific seed
  const birdSeedPath = resolve(SEED_DIR, "bird-species-seed.json");
  await writeJson(birdSeedPath, seed);

  // Also update full-seed.json if it exists
  try {
    const fullSeedPath = resolve(SEED_DIR, "full-seed.json");
    const fullSeed = await readJson<Record<string, unknown>>(fullSeedPath);
    fullSeed.birdwatching = seed;
    await writeJson(fullSeedPath, fullSeed);
    console.log(`\nUpdated full-seed.json birdwatching section`);
  } catch {
    console.log("\nfull-seed.json not found — skipping update");
  }

  // Summary
  console.log(`\n=== Seed Generation Summary ===`);
  console.log(`  Total species:      ${species.length}`);
  console.log(`  With editorial:     ${withEditorial}`);
  console.log(`  With local photos:  ${withPhotos}`);
  console.log(`  Categories:         ${categories.length} (${categories.join(", ")})`);
  console.log(`  Featured:           ${featuredSlugs.length} (${featuredSlugs.join(", ")})`);
  console.log(`  Details:            ${details.length}`);

  // Show Tier 1 species for review
  const tier1 = consolidated.filter((s) => s.tier === 1);
  console.log(`\n=== Tier 1 Species (${tier1.length}) ===`);
  for (const s of tier1) {
    const slug = slugify(s.commonNamePT);
    const hasEd = editorial[s.scientificName] ? "✓" : "✗";
    const hasPhoto = s.photos.length > 0 ? "📷" : "  ";
    const featured = featuredSlugs.includes(slug) ? "⭐" : "  ";
    console.log(
      `  ${featured} ${hasPhoto} [${hasEd}] ${s.commonNamePT} (${s.scientificName})`,
    );
  }

  console.log(`\nOutput: ${birdSeedPath}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
