/**
 * Converts local bird photos from JPG to optimized WebP + AVIF,
 * outputs to client/public/images/birds/{slug}.webp/.avif
 * Also generates a bird-placeholder.webp from a solid dark-green image.
 */
import sharp from "sharp";
import { readFileSync, mkdirSync, existsSync } from "fs";
import { resolve, join } from "path";

const ROOT = resolve(import.meta.dirname, "../..");
const LOCAL_PHOTOS_DIR = resolve(import.meta.dirname, "images/local");
const OUTPUT_DIR = resolve(ROOT, "client/public/images/birds");
const PHOTO_MAPPING_PATH = resolve(import.meta.dirname, "data/photo-mapping.json");
const CONSOLIDATED_PATH = resolve(import.meta.dirname, "data/consolidated.json");
const SEED_PATH = resolve(ROOT, "docs/payload-seed/full-seed.json");

// Ensure output directory exists
mkdirSync(OUTPUT_DIR, { recursive: true });

// Load data
const photoMapping = JSON.parse(readFileSync(PHOTO_MAPPING_PATH, "utf8"));
const consolidated = JSON.parse(readFileSync(CONSOLIDATED_PATH, "utf8"));
const seed = JSON.parse(readFileSync(SEED_PATH, "utf8"));

// Build a map: scientificName → slug (from consolidated data)
function slugify(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Build scientificName → slug from seed species data
const sciNameToSlug = new Map();
for (const species of seed.birdwatching.species) {
  sciNameToSlug.set(species.scientificName.toLowerCase(), species.slug);
}

// Also build from consolidated as backup
for (const entry of consolidated) {
  const slug = slugify(entry.commonNamePT);
  if (!sciNameToSlug.has(entry.scientificName.toLowerCase())) {
    sciNameToSlug.set(entry.scientificName.toLowerCase(), slug);
  }
}

// Pick one best photo per species (prefer first occurrence)
const speciesPhotoMap = new Map();
for (const bird of photoMapping.birds) {
  const sciName = bird.scientificName.toLowerCase();
  if (!speciesPhotoMap.has(sciName)) {
    speciesPhotoMap.set(sciName, bird.filename);
  }
}

console.log(`Found ${speciesPhotoMap.size} unique species with local photos`);

// Convert each photo
let converted = 0;
let skipped = 0;
const slugImageMap = {};

for (const [sciName, filename] of speciesPhotoMap) {
  const slug = sciNameToSlug.get(sciName);
  if (!slug) {
    console.log(`  SKIP: No slug for ${sciName}`);
    skipped++;
    continue;
  }

  const inputPath = join(LOCAL_PHOTOS_DIR, filename);
  if (!existsSync(inputPath)) {
    console.log(`  SKIP: File not found: ${filename}`);
    skipped++;
    continue;
  }

  const webpPath = join(OUTPUT_DIR, `${slug}.webp`);
  const avifPath = join(OUTPUT_DIR, `${slug}.avif`);

  try {
    const img = sharp(inputPath).resize(800, 600, {
      fit: "cover",
      position: "centre",
    });

    await img.clone().webp({ quality: 80 }).toFile(webpPath);
    await img.clone().avif({ quality: 65 }).toFile(avifPath);

    slugImageMap[slug] = `/images/birds/${slug}`;
    converted++;
    if (converted % 10 === 0) {
      console.log(`  Converted ${converted}...`);
    }
  } catch (err) {
    console.log(`  ERROR converting ${filename}: ${err.message}`);
    skipped++;
  }
}

console.log(`\nConverted: ${converted}, Skipped: ${skipped}`);

// Generate placeholder (dark green with subtle bird silhouette overlay)
const placeholderWebp = resolve(ROOT, "client/public/images/bird-placeholder.webp");
const placeholderAvif = resolve(ROOT, "client/public/images/bird-placeholder.avif");

if (!existsSync(placeholderWebp)) {
  // Create a simple dark green gradient placeholder
  const svg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#344e41"/>
        <stop offset="100%" stop-color="#263a30"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#bg)"/>
    <text x="400" y="280" text-anchor="middle" font-family="serif" font-size="60" fill="#446354" opacity="0.4">🐦</text>
    <text x="400" y="340" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#8aad9c" opacity="0.6">Foto em breve</text>
  </svg>`;

  const placeholderImg = sharp(Buffer.from(svg)).resize(800, 600);
  await placeholderImg.clone().webp({ quality: 80 }).toFile(placeholderWebp);
  await placeholderImg.clone().avif({ quality: 65 }).toFile(placeholderAvif);
  console.log("Placeholder image created");
}

// Now update the seed data — set local paths for species with photos
let updated = 0;
for (const species of seed.birdwatching.species) {
  const localPath = slugImageMap[species.slug];
  if (localPath) {
    species.src = localPath;
    updated++;
  }
  // Species without local photos keep their Wikimedia URLs
}

// Also update details
for (const detail of seed.birdwatching.details) {
  const localPath = slugImageMap[detail.slug];
  if (localPath) {
    detail.src = localPath;
    detail.heroImage = localPath;
  }
}

console.log(`Updated ${updated} species in seed with local image paths`);

// Write updated seed
const { writeFileSync } = await import("fs");
writeFileSync(SEED_PATH, JSON.stringify(seed, null, 2), "utf8");
console.log("Seed file updated: docs/payload-seed/full-seed.json");

// Write the slug→image mapping for reference
writeFileSync(
  resolve(import.meta.dirname, "data/slug-image-map.json"),
  JSON.stringify(slugImageMap, null, 2),
  "utf8"
);
console.log("Slug image mapping saved: data/slug-image-map.json");
