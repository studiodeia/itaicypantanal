/**
 * Downloads Wikimedia Commons images for species that don't have local photos,
 * converts them to optimized WebP + AVIF, and updates the seed file.
 *
 * Wikimedia Special:FilePath URLs redirect to the actual image file.
 * We add a small delay between requests to be respectful.
 */
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, join } from "path";

const ROOT = resolve(import.meta.dirname, "../..");
const OUTPUT_DIR = resolve(ROOT, "client/public/images/birds");
const SEED_PATH = resolve(ROOT, "docs/payload-seed/full-seed.json");
const DOWNLOAD_DIR = resolve(import.meta.dirname, "images/wikimedia");

mkdirSync(OUTPUT_DIR, { recursive: true });
mkdirSync(DOWNLOAD_DIR, { recursive: true });

const seed = JSON.parse(readFileSync(SEED_PATH, "utf8"));

// Find species that still use Wikimedia URLs
const wikiSpecies = seed.birdwatching.species.filter(
  (s) => s.src && s.src.startsWith("http")
);

console.log(`Found ${wikiSpecies.length} species with Wikimedia URLs to download\n`);

const DELAY_MS = 300; // polite delay between requests
const TIMEOUT_MS = 15_000;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function downloadImage(url, destPath) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "ItaicyPantanalBot/1.0 (https://itaicypantanal.vercel.app; educational project)",
      },
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    writeFileSync(destPath, buffer);
    return buffer;
  } finally {
    clearTimeout(timeout);
  }
}

let downloaded = 0;
let converted = 0;
let failed = 0;
const failedSpecies = [];

for (const species of wikiSpecies) {
  const slug = species.slug;
  const webpPath = join(OUTPUT_DIR, `${slug}.webp`);
  const avifPath = join(OUTPUT_DIR, `${slug}.avif`);

  // Skip if already converted
  if (existsSync(webpPath) && existsSync(avifPath)) {
    species.src = `/images/birds/${slug}`;
    converted++;
    continue;
  }

  const rawPath = join(DOWNLOAD_DIR, `${slug}.raw`);

  try {
    // Download
    let buffer;
    if (existsSync(rawPath)) {
      buffer = readFileSync(rawPath);
    } else {
      process.stdout.write(`  Downloading ${slug}...`);
      buffer = await downloadImage(species.src, rawPath);
      downloaded++;
      process.stdout.write(` ${Math.round(buffer.length / 1024)}KB`);
      await sleep(DELAY_MS);
    }

    // Convert
    const img = sharp(buffer).resize(800, 600, {
      fit: "cover",
      position: "centre",
    });

    await img.clone().webp({ quality: 80 }).toFile(webpPath);
    await img.clone().avif({ quality: 65 }).toFile(avifPath);

    species.src = `/images/birds/${slug}`;
    converted++;
    process.stdout.write(` -> converted\n`);
  } catch (err) {
    failed++;
    failedSpecies.push({ slug, url: species.src, error: err.message });
    process.stdout.write(` FAILED: ${err.message}\n`);
    // Keep the Wikimedia URL for failed ones — BirdImage component handles external URLs
  }
}

// Also update details
for (const detail of seed.birdwatching.details) {
  if (detail.src && detail.src.startsWith("http")) {
    const webpExists = existsSync(join(OUTPUT_DIR, `${detail.slug}.webp`));
    if (webpExists) {
      detail.src = `/images/birds/${detail.slug}`;
      detail.heroImage = `/images/birds/${detail.slug}`;
    }
  }
}

console.log(`\n--- Summary ---`);
console.log(`Downloaded: ${downloaded}`);
console.log(`Converted: ${converted}`);
console.log(`Failed: ${failed}`);

if (failedSpecies.length > 0) {
  console.log(`\nFailed species:`);
  for (const f of failedSpecies) {
    console.log(`  ${f.slug}: ${f.error}`);
  }
}

// Count final distribution
const localCount = seed.birdwatching.species.filter((s) =>
  s.src.startsWith("/images/birds/")
).length;
const wikiCount = seed.birdwatching.species.filter((s) =>
  s.src.startsWith("http")
).length;
const emptyCount = seed.birdwatching.species.filter((s) => !s.src).length;

console.log(`\nFinal distribution:`);
console.log(`  Local: ${localCount}`);
console.log(`  Wikimedia: ${wikiCount}`);
console.log(`  Empty: ${emptyCount}`);

// Save updated seed
writeFileSync(SEED_PATH, JSON.stringify(seed, null, 2), "utf8");
console.log(`\nSeed updated: docs/payload-seed/full-seed.json`);
