/**
 * Extracts image credits from consolidated.json and photo-mapping.json,
 * then adds photoCredit field to each species in the seed.
 *
 * Sources:
 * - Local photos (João Andriola): credit = "João Andriola / Itaicy Pantanal"
 * - Wikimedia photos: credit = author from Wikimedia API (via filename)
 *
 * For Wikimedia, we query the API to get the actual author/license.
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(import.meta.dirname, "../..");
const CONSOLIDATED_PATH = resolve(import.meta.dirname, "data/consolidated.json");
const PHOTO_MAPPING_PATH = resolve(import.meta.dirname, "data/photo-mapping.json");
const SEED_PATH = resolve(ROOT, "docs/payload-seed/full-seed.json");

const consolidated = JSON.parse(readFileSync(CONSOLIDATED_PATH, "utf8"));
const photoMapping = JSON.parse(readFileSync(PHOTO_MAPPING_PATH, "utf8"));
const seed = JSON.parse(readFileSync(SEED_PATH, "utf8"));

// Build set of scientific names that have local photos
const localPhotoSpecies = new Set();
for (const bird of photoMapping.birds) {
  localPhotoSpecies.add(bird.scientificName.toLowerCase());
}

// Build map: slug → wikimedia image filename (from consolidated)
const slugToWikiFile = new Map();
for (const entry of consolidated) {
  if (entry.wikidata?.wikimediaImage) {
    const url = entry.wikidata.wikimediaImage;
    // Extract filename from URL: Special:FilePath/Filename.jpg
    const match = url.match(/FilePath\/(.+)$/);
    if (match) {
      const filename = decodeURIComponent(match[1]);
      const slug = seed.birdwatching.species.find(
        (s) => s.scientificName === entry.scientificName
      )?.slug;
      if (slug) {
        slugToWikiFile.set(slug, filename);
      }
    }
  }
}

console.log(`Local photo species: ${localPhotoSpecies.size}`);
console.log(`Wikimedia filenames mapped: ${slugToWikiFile.size}`);

// Query Wikimedia API for author info in batches
const BATCH_SIZE = 50;
const wikiFilenames = [...slugToWikiFile.values()];
const fileInfoMap = new Map(); // filename → { author, license }

console.log(`\nQuerying Wikimedia API for ${wikiFilenames.length} images...`);

for (let i = 0; i < wikiFilenames.length; i += BATCH_SIZE) {
  const batch = wikiFilenames.slice(i, i + BATCH_SIZE);
  const titles = batch.map((f) => `File:${f}`).join("|");

  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=imageinfo&iiprop=extmetadata&format=json`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "ItaicyPantanalBot/1.0 (https://itaicypantanal.vercel.app; educational project)",
      },
    });

    if (!res.ok) {
      console.log(`  API batch ${i / BATCH_SIZE + 1} failed: HTTP ${res.status}`);
      continue;
    }

    const data = await res.json();
    const pages = data.query?.pages ?? {};

    for (const page of Object.values(pages)) {
      const title = page.title?.replace(/^File:/, "") ?? "";
      const meta = page.imageinfo?.[0]?.extmetadata ?? {};

      const author = meta.Artist?.value
        ? stripHtml(meta.Artist.value)
        : "Wikimedia Commons";
      const license = meta.LicenseShortName?.value ?? "CC";

      fileInfoMap.set(title, { author, license });
    }

    console.log(
      `  Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(wikiFilenames.length / BATCH_SIZE)}: ${Object.keys(pages).length} results`
    );
  } catch (err) {
    console.log(`  API batch error: ${err.message}`);
  }

  // Small delay between batches
  await new Promise((r) => setTimeout(r, 200));
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}

// Now assign credits to each species
let localCredits = 0;
let wikiCredits = 0;
let fallbackCredits = 0;

for (const species of seed.birdwatching.species) {
  // Check if this species has a local photo from João Andriola
  if (localPhotoSpecies.has(species.scientificName.toLowerCase())) {
    species.photoCredit = "João Andriola / Itaicy Pantanal Eco Lodge";
    species.photoLicense = "Todos os direitos reservados";
    localCredits++;
    continue;
  }

  // Check if it has a Wikimedia image with known author
  const wikiFile = slugToWikiFile.get(species.slug);
  if (wikiFile && fileInfoMap.has(wikiFile)) {
    const info = fileInfoMap.get(wikiFile);
    species.photoCredit = info.author;
    species.photoLicense = info.license;
    wikiCredits++;
    continue;
  }

  // Fallback
  species.photoCredit = "Wikimedia Commons";
  species.photoLicense = "CC";
  fallbackCredits++;
}

// Also update details
for (const detail of seed.birdwatching.details) {
  const species = seed.birdwatching.species.find((s) => s.slug === detail.slug);
  if (species) {
    detail.photoCredit = species.photoCredit;
    detail.photoLicense = species.photoLicense;
  }
}

console.log(`\n--- Credits Summary ---`);
console.log(`João Andriola (local): ${localCredits}`);
console.log(`Wikimedia (with author): ${wikiCredits}`);
console.log(`Wikimedia (fallback): ${fallbackCredits}`);

// Save updated seed
writeFileSync(SEED_PATH, JSON.stringify(seed, null, 2), "utf8");
console.log(`\nSeed updated with credits`);

// Print a few samples
console.log(`\nSamples:`);
const samples = seed.birdwatching.species.slice(0, 5);
for (const s of samples) {
  console.log(`  ${s.commonName}: ${s.photoCredit} (${s.photoLicense})`);
}
