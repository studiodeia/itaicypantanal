# payload-cms/ — Payload CMS v3

## Overview

Headless CMS running as a separate Next.js 15 process on port 3001. Provides REST API consumed by the Express server. Supports 3 locales (PT default, EN, ES) with field-level localization.

```bash
npm run dev            # Start dev server (port 3001)
npm run seed           # Import full-seed.json → Payload collections/globals
npm run seed:multilingual  # Import multilingual seed data
npm run owner:ensure   # Bootstrap admin user from env vars
```

## Configuration (`src/payload.config.ts`)

- **Database**: Auto-selects `postgresAdapter` (if `DATABASE_URL` starts with `postgres://`) or `sqliteAdapter` (`file:./payload.db`)
- **Localization**: `{locales: ["pt","en","es"], defaultLocale: "pt", fallback: true}`
- **Admin**: Port 3001, custom logo/icon, date format `dd/MM/yyyy HH:mm`
- **Auth**: `Users` collection, `PAYLOAD_OWNER_EMAIL/PASSWORD/NAME` env vars for bootstrap

## Collections (7)

| Collection | Slug | Key Details |
|-----------|------|------------|
| `BlogPosts` | `blog-posts` | title, slug (unique), subtitle, description, tag, primaryCategory (relation→blog-categories), categories (hasMany), contentBlocks (Blocks), relatedPosts, isFeatured, isRecent |
| `BlogCategories` | `blog-categories` | name (localized), slug |
| `BirdSpecies` | `bird-species` | commonName (localized), scientificName, slug (unique), description (localized), taxonomicOrder, family, category (relation→bird-categories), conservationStatus (localized), habitat/overview/diet/behavior/bestTime (all localized), photographyTips[] ({tip}), relatedSpecies, SEO tab |
| `BirdCategories` | `bird-categories` | name, slug |
| `Media` | `media` | Standard Payload media upload |
| `Pages` | `pages` | slug, title, sections |
| `Users` | `users` | email, password (Payload auth) |

### Localized Fields
Fields with `localized: true` store per-locale values. When fetching via REST API, use `?locale=pt|en|es` to get the right translation. With `fallback: true`, missing translations fall back to PT.

## Globals (12)

| Global | Slug | Content |
|--------|------|---------|
| `AgentConfig` | `agent-config` | AI agent operational config: disclaimers, handoff contacts, welcome greeting, FAQ threshold, booking URL. All localized |
| `SiteSettings` | `site-settings` | Contact info, CTA, FAQ items (array), testimonials (array), footer links, SEO. Has `afterChange` hook → triggers FAQ reindex |
| `HomeContent` | `home-content` | Home page: aboutUs, expeditions, stats, accommodation, impact, paraQuem, blog sections |
| `AcomodacoesContent` | `acomodacoes-content` | Hero, manifesto, highlights, rooms, culinary cross-sell |
| `CulinariaContent` | `culinaria-content` | Hero, manifesto, menu, highlights, services, experience, crossSell |
| `PescaContent` | `pesca-content` | Hero, manifesto, sobreNos, highlights, services |
| `EcoturismoContent` | `ecoturismo-content` | Ecotourism page sections |
| `BirdwatchingContent` | `birdwatching-content` | Birdwatching page sections |
| `ContatoContent` | `contato-content` | Hero, formTitle, steps, channels, mapCoords |
| `NossoImpactoContent` | `nosso-impacto-content` | Hero, manifesto, rioVivo, biodiversidade, comunidade, operacao, engagement |
| `PrivacidadeContent` | `privacidade-content` | Privacy policy sections |
| `NotFoundContent` | `not-found-content` | 404 page hero + button text |

## Seed Import (`src/scripts/importSeed.ts`)

Imports `docs/payload-seed/full-seed.json` + `page-content.json` into Payload via local API.

### Import Flow
1. `importBlog()` — Upserts categories (by slug), then posts (slug-based). Resolves category/related post relations. Maps `type` → `blockType` for content blocks
2. `importBirdwatching()` — Same pattern. Maps `photographyTips: string[]` → `[{tip: string}]`
3. `importPages()` — Upserts `pages` collection for all routes
4. `importSharedSections()` — Transforms seed `shared` shape into `site-settings` global. Maps `href` → `url` for footer links
5. `importPageGlobals()` — Routes each page to its global slug. `buildGlobalData()` wraps `string[]` → `{text: string}[]`

### String Array Convention
Payload array fields require objects, not primitives:
- **Going in**: `wrapStrings(["a","b"])` → `[{text:"a"},{text:"b"}]`
- **Coming out** (in `server/cms-content.ts`): `unwrapTextArray()` reverses this

### Route → Global Slug Mapping
```typescript
routeToGlobalSlug: {
  "/": "home-content",
  "/acomodacoes": "acomodacoes-content",
  "/culinaria": "culinaria-content",
  "/pesca": "pesca-content",
  "/ecoturismo": "ecoturismo-content",
  "/observacao-de-aves": "birdwatching-content",
  "/contato": "contato-content",
  "/nosso-impacto": "nosso-impacto-content",
  "/politica-de-privacidade": "privacidade-content",
  "/404": "not-found-content"
}
```

## Adding a New Page Global

1. Create `src/globals/NewPageContent.ts` with the global definition
2. Add it to the `globals` array in `src/payload.config.ts`
3. Add the route → slug mapping in `importSeed.ts` (`routeToGlobalSlug`)
4. Add the same mapping in `server/cms-content.ts` (`PAGE_GLOBAL_SLUGS`)
5. Add the type in `shared/cms-page-content.ts` (`PageContentMap`)
6. Create default content in seed files
7. Add `transformGlobalToPageContent` handling if the page has text arrays

## Versioning

All 12 globals have `versions: { max: 5 }`. `BlogPosts` has `versions: { maxPerDoc: 10 }`. Access version history via the "Versões" button in the Payload admin when editing any document or global.

## Vercel Deployment

- Deploy via `vercel --prod` from `payload-cms/` directory (NOT from project root)
- Database: Supabase Postgres via **Supavisor pooler** (`aws-1-sa-east-1.pooler.supabase.com:5432`, session mode) — required for Vercel IPv4 connectivity
- **`push: true` does NOT work on Vercel serverless** — run migrations locally first: `npx tsx src/scripts/migrate.ts`
- CMS is deployed separately at `https://cms-itaicypantanal.vercel.app`
- Set `FRONTEND_ORIGIN` env var to the frontend URL for preview links

## Adding a New Localized Field

1. Add `localized: true` to the field definition in the collection/global
2. Run Payload migration if needed (`npm run dev` auto-migrates in dev)
3. Add translations in seed multilingual script
4. The server's `?locale=` passthrough handles it automatically
