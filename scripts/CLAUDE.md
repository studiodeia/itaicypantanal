# scripts/ — Build & Data Pipelines

## Overview

Utility scripts for building, deploying, image optimization, content export, and bird species data enrichment.

## Build & Deploy

| Script | Command | Purpose |
|--------|---------|---------|
| `vercel-build.sh` | `bash scripts/vercel-build.sh` | Full Vercel Build Output API v3 build. Runs Vite + esbuild, arranges static/function dirs, writes configs |

### Vercel Build Steps
1. `npm run build` (Vite client + esbuild server)
2. esbuild `server/vercel-handler.ts` → `.vercel/output/functions/api/index.func/index.js` (CJS, bundled)
3. `{"type":"commonjs"}` in function dir (overrides root ESM)
4. Copy static assets → `.vercel/output/static/` (minus `index.html`)
5. Copy `_index.html` + seed data into function dir
6. Write `.vc-config.json` and `config.json` (routing rules)

**Critical**: esbuild must NOT use `--packages=external` — all deps must be bundled inline.

## Image Pipeline

| Script | Command | Purpose |
|--------|---------|---------|
| `figma-assets.ts` | `npm run figma:assets <manifest.json>` | Download Figma images → WebP+AVIF, max 1920px |
| `optimize-images.mjs` | `node scripts/optimize-images.mjs` | Batch optimize existing images |

### Figma Assets Workflow
1. Get `downloadUrls` from Figma MCP `get_design_context`
2. Create manifest: `{"name": "https://figma-url...", ...}`
3. Run: `npm run figma:assets tmp/figma-assets.json`
4. Output: `client/public/images/<name>.webp` + `.avif`
5. Use `--force` to overwrite existing. Skips by default

## Content Management

| Script | Command | Purpose |
|--------|---------|---------|
| `export-content-for-payload.ts` | `npm run cms:seed:check` | Audit seed data (dry run) |
| `export-content-for-payload.ts --write` | `npm run cms:seed:write` | Export content → `docs/payload-seed/` |
| `audit-sections-for-cms.ts` | `npm run cms:audit:sections` | Audit which sections are CMS-ready |
| `map-links-and-sitemap.ts` | `npm run links:map` | Map all internal links and generate sitemap |

## Bird Enrichment Pipeline (`bird-enrichment/`)

166 species from João Andriola field survey (May 2024). Pipeline stages:

| Script | Stage | Input → Output |
|--------|-------|---------------|
| `00-parse-csv.ts` | Parse | CSV → `00-parsed.json` (species list) |
| `01-gbif-match.ts` | Taxonomy | → `01-gbif-matched.json` (GBIF IDs, taxonomy) |
| `02-wikidata-enrich.ts` | Enrich | → `02-wikidata-enriched.json` (conservation, range) |
| `02b-wikidata-patch.ts` | Patch | → Fills gaps in Wikidata results |
| `03-wikipedia-scrape.ts` | Content | → `03-wikipedia-scraped.json` (descriptions, images) |
| `04-consolidate.ts` | Merge | → `consolidated.json` (166 species, 100% coverage) |
| `05-llm-editorial.ts` | Editorial | → LLM-generated PT/EN descriptions (needs `ANTHROPIC_API_KEY`) |
| `06-generate-seed.ts` | Seed | → `bird-species-seed.json` for CMS import |

### Data Files
- `consolidated.json` — 166 species with taxonomy, conservation, descriptions
- `photo-mapping.json` — 54 species with curated photo URLs
- `bird-species-seed.json` — Ready for `importSeed.ts` upsert

## Admin & Testing

| Script | Command | Purpose |
|--------|---------|---------|
| `panel-smoke.ts` | `npm run panel:smoke` | Smoke test admin panel endpoints |
| `chat-visual-playwright.ts` | `npm run chat:visual` | Visual test of chat widget via Playwright |
