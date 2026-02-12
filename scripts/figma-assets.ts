/**
 * Figma Assets Download + Optimization Pipeline
 *
 * Usage:
 *   npx tsx scripts/figma-assets.ts <manifest.json>
 *   npx tsx scripts/figma-assets.ts tmp/figma-assets.json
 *   npx tsx scripts/figma-assets.ts tmp/figma-assets.json --force
 *
 * Manifest format (tmp/figma-assets.json):
 *   {
 *     "hero-bg": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/...",
 *     "room-single": "https://..."
 *   }
 *
 * Output: client/public/images/<name>.webp + .avif
 */

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";

// --- Config ---
const OUTPUT_DIR = "client/public/images";
const TEMP_DIR = "tmp/figma-downloads";
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 65;
const DOWNLOAD_TIMEOUT_MS = 30_000;

// --- Helpers ---
function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function downloadWithStreaming(
  url: string,
  dest: string
): Promise<number> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DOWNLOAD_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    if (!response.body) {
      throw new Error("No response body");
    }

    const fileStream = fs.createWriteStream(dest);
    await pipeline(Readable.fromWeb(response.body as any), fileStream);

    const stats = fs.statSync(dest);
    return stats.size;
  } finally {
    clearTimeout(timeout);
  }
}

async function optimizeImage(
  inputPath: string,
  outputName: string
): Promise<{ webpSize: number; avifSize: number }> {
  const img = sharp(inputPath).resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
  });

  const webpPath = path.join(OUTPUT_DIR, `${outputName}.webp`);
  const avifPath = path.join(OUTPUT_DIR, `${outputName}.avif`);

  await img.clone().webp({ quality: WEBP_QUALITY }).toFile(webpPath);
  await img.clone().avif({ quality: AVIF_QUALITY }).toFile(avifPath);

  return {
    webpSize: fs.statSync(webpPath).size,
    avifSize: fs.statSync(avifPath).size,
  };
}

// --- Main ---
async function main() {
  const manifestPath = process.argv[2];
  const force = process.argv.includes("--force");

  if (!manifestPath) {
    console.error("Usage: npx tsx scripts/figma-assets.ts <manifest.json> [--force]");
    console.error("");
    console.error("Manifest format:");
    console.error('  { "image-name": "https://figma-url...", ... }');
    process.exit(1);
  }

  if (!fs.existsSync(manifestPath)) {
    console.error(`Manifest not found: ${manifestPath}`);
    process.exit(1);
  }

  const manifest: Record<string, string> = JSON.parse(
    fs.readFileSync(manifestPath, "utf-8")
  );
  const entries = Object.entries(manifest);

  if (entries.length === 0) {
    console.log("No assets in manifest.");
    return;
  }

  // Ensure directories exist
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(TEMP_DIR, { recursive: true });

  console.log(`\nProcessing ${entries.length} asset(s)...\n`);

  let processed = 0;
  let skipped = 0;
  let failed = 0;

  for (const [name, url] of entries) {
    const webpExists = fs.existsSync(path.join(OUTPUT_DIR, `${name}.webp`));
    const avifExists = fs.existsSync(path.join(OUTPUT_DIR, `${name}.avif`));

    if (webpExists && avifExists && !force) {
      console.log(`  SKIP  ${name} (already exists, use --force to overwrite)`);
      skipped++;
      continue;
    }

    try {
      // Download
      const ext = url.includes(".png") ? ".png" : ".jpg";
      const tempFile = path.join(TEMP_DIR, `${name}${ext}`);

      process.stdout.write(`  DOWN  ${name}...`);
      const originalSize = await downloadWithStreaming(url, tempFile);
      console.log(` ${formatBytes(originalSize)}`);

      // Optimize
      process.stdout.write(`  OPT   ${name}...`);
      const { webpSize, avifSize } = await optimizeImage(tempFile, name);

      const bestSize = Math.min(webpSize, avifSize);
      const savings = ((1 - bestSize / originalSize) * 100).toFixed(0);

      console.log(
        ` webp=${formatBytes(webpSize)} avif=${formatBytes(avifSize)} (${savings}% smaller)`
      );

      // Clean up temp file
      fs.unlinkSync(tempFile);
      processed++;
    } catch (err: any) {
      console.log(` FAIL`);
      console.error(`        ${err.message}`);
      failed++;
    }
  }

  // Clean up temp dir if empty
  try {
    fs.rmdirSync(TEMP_DIR);
  } catch {}

  console.log(
    `\nDone: ${processed} processed, ${skipped} skipped, ${failed} failed`
  );
  console.log(`Output: ${OUTPUT_DIR}/\n`);
}

main();
