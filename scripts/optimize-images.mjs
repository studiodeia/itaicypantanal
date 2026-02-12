import sharp from "sharp";
import { mkdir, stat } from "fs/promises";
import path from "path";

const PUBLIC = "client/public";
const FIGMA = `${PUBLIC}/figmaAssets`;
const OUT = `${PUBLIC}/images`;

const images = [
  // Home
  { src: `${FIGMA}/image.png`, out: `${OUT}/home/expedition-pesca`, w: 1440 },
  { src: `${FIGMA}/image-1.png`, out: `${OUT}/home/expedition-birdwatching`, w: 1280 },
  { src: `${FIGMA}/image-2.png`, out: `${OUT}/home/expedition-ecoturismo`, w: 1440 },
  { src: `${FIGMA}/img.png`, out: `${OUT}/home/about-us`, w: null },
  { src: `${FIGMA}/img-1.png`, out: `${OUT}/home/impact`, w: null },
  { src: `${FIGMA}/section---acomoda--es.png`, out: `${OUT}/home/accommodations-bg`, w: 1920 },
  { src: `${FIGMA}/frame-2-2.png`, out: `${OUT}/home/blog-card`, w: 832 },
  { src: `${FIGMA}/ellipse-1-2.png`, out: `${OUT}/home/blog-avatar`, w: 88 },
  // Acomodacoes
  { src: `${FIGMA}/acomodacoes/apartamento-duplo.jpg`, out: `${OUT}/acomodacoes/suite-explorer`, w: 1024 },
  { src: `${FIGMA}/acomodacoes/apartamento-triplo.jpg`, out: `${OUT}/acomodacoes/suite-adventure`, w: 1024 },
  { src: `${FIGMA}/acomodacoes/apartamento-extra.jpg`, out: `${OUT}/acomodacoes/suite-family`, w: 1440 },
  { src: `${FIGMA}/acomodacoes/culinaria-1.jpg`, out: `${OUT}/acomodacoes/culinaria-1`, w: 720 },
  { src: `${FIGMA}/acomodacoes/culinaria-2.jpg`, out: `${OUT}/acomodacoes/culinaria-2`, w: 720 },
  { src: `${FIGMA}/acomodacoes/culinaria-3.jpg`, out: `${OUT}/acomodacoes/culinaria-3`, w: 720 },
  { src: `${FIGMA}/acomodacoes/culinaria-4.jpg`, out: `${OUT}/acomodacoes/culinaria-4`, w: 720 },
];

async function optimize() {
  await mkdir(`${OUT}/home`, { recursive: true });
  await mkdir(`${OUT}/acomodacoes`, { recursive: true });

  let totalSrcKB = 0;
  let totalOutKB = 0;

  for (const img of images) {
    const srcStat = await stat(img.src);
    const srcKB = srcStat.size / 1024;
    totalSrcKB += srcKB;

    const pipeline = sharp(img.src);
    if (img.w) pipeline.resize(img.w, null, { withoutEnlargement: true });

    // WebP
    await pipeline.clone().webp({ quality: 80 }).toFile(`${img.out}.webp`);
    // AVIF
    await pipeline.clone().avif({ quality: 60 }).toFile(`${img.out}.avif`);

    const webpStat = await stat(`${img.out}.webp`);
    const webpKB = webpStat.size / 1024;
    totalOutKB += webpKB;

    const savings = ((1 - webpKB / srcKB) * 100).toFixed(0);
    console.log(
      `  ${path.basename(img.out)}.webp  ${srcKB.toFixed(0)}KB -> ${webpKB.toFixed(0)}KB  (-${savings}%)`
    );
  }

  console.log(`\nTotal: ${totalSrcKB.toFixed(0)}KB -> ${totalOutKB.toFixed(0)}KB  (-${((1 - totalOutKB / totalSrcKB) * 100).toFixed(0)}%)`);
  console.log("Done! All images optimized to WebP + AVIF.");
}

optimize().catch(console.error);
