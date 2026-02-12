# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server with HMR (port 5000)
npm run build     # Production build (Vite client + esbuild server → dist/)
npm run start     # Run production build
npm run check     # TypeScript type checking (no emit)
npm run db:push       # Push Drizzle schema to database
npm run figma:assets  # Download + optimize Figma images (see workflow below)
```

```bash
npm test          # Run Vitest test suite
npm run test:watch  # Watch mode
```

## Architecture

Fullstack single-repo with three directories:

- **`client/`** — React 18 SPA (Vite, TypeScript, Tailwind 3, shadcn/ui New York)
- **`server/`** — Express server (serves SPA, API routes scaffolded but currently empty)
- **`shared/`** — Drizzle ORM schema + Zod validation + TypeScript types (shared between client/server)

**Path aliases** in tsconfig: `@/*` → `client/src/*`, `@shared/*` → `shared/*`, `@assets` → `attached_assets/`

**Routing**: Wouter — routes: `/` (home), `/acomodacoes`, `/culinaria`, `/pesca`, `/observacao-de-aves`, `/ecoturismo`, `/blog`, `/blog/:categorySlug/:slug`

**State**: TanStack Query with conservative defaults (staleTime: Infinity, no auto-refetch). No global state store.

**Animations**: Framer Motion

**Database**: Drizzle ORM + PostgreSQL (Neon serverless). Currently using in-memory storage placeholder (`server/storage.ts`). Auth libraries (Passport) are installed but not yet wired up.

**Environment variables**: `DATABASE_URL` (PostgreSQL), `PORT` (default 5000), `NODE_ENV`

## Design System

**Read `.interface-design/system.md` before making UI changes.** Tailwind plugin at `.interface-design/utilities.js`.

### Figma Implementation Workflow

Before implementing any Figma design, **always cross-reference against the existing design system and components**. Many UI patterns (buttons, cards, typography, section layouts, headers) are already built. Check `client/src/components/pantanal/` and `client/src/pages/sections/` first — map Figma elements to existing components, tokens, and utilities before writing new code. Only create new components when no existing one covers the need.

### Image Assets from Figma

**Do not download Figma image assets directly — the API will hang on large files.** Instead, use the optimization pipeline:

1. Call `get_design_context` from the Figma MCP — it returns `downloadUrls` for each asset
2. Save those URLs to a manifest file:
   ```json
   // tmp/figma-assets.json
   { "hero-bg": "https://figma-alpha-api...", "room-single": "https://..." }
   ```
3. Run the pipeline: `npm run figma:assets tmp/figma-assets.json`
4. The script downloads via streaming (no memory issues), converts to WebP + AVIF, resizes to max 1920px
5. Output lands in `client/public/images/<name>.webp` and `.avif`
6. Reference images using the `<OptimizedImage>` component (see below)

Use `--force` flag to overwrite existing files. The script skips assets that already exist.

**Important:** Filter Figma assets before creating the manifest — ignore icons, UI elements, and SVGs. Only include content photos/backgrounds. Name them semantically by section: `culinaria-hero-bg`, `culinaria-menu-1`, etc. Figma may export placeholder images (very small files) — verify file sizes and skip those.

### Rules

- All colors via `pantanal-*` Tailwind tokens — **never use raw hex values**
- Typography: Playfair Display (headings), Lato (body), font-weight **400** (not 600)
- Responsive breakpoints: 390px (mobile default), 768px (tablet), 1024px (desktop)
- Section padding: `px-5 md:px-8 lg:px-16`
- Container: `max-w-[1440px] mx-auto`

### Components

Located in `client/src/components/pantanal/` — buttons, cards, layout, typography. All support `theme="dark" | "light"` prop for dark/cream sections.

Shared global components in `client/src/components/`: NavHeader, BookingDatePicker, LanguageSwitcher, Divider, OptimizedImage.

### Optimized Images

**Always use `<OptimizedImage>` for content photos** (`client/src/components/OptimizedImage.tsx`). It renders a `<picture>` with AVIF and WebP sources automatically.

```tsx
<OptimizedImage src="/images/culinaria-menu-1" alt="Prato" className="w-full h-full object-cover" />
```

- `src` is the base path **without extension** — the component appends `.avif`, `.webp` automatically
- Optimized images live in `client/public/images/`
- Legacy unoptimized images remain in `client/public/figmaAssets/` (being migrated)
- For CSS `background-image`, use the `.webp` file directly (no `<picture>` possible)

### Interactions

- Buttons: `transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90`
- Gold focus: `focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]`
- OutlineButton hover: full inversion (white bg + dark text)
- Links: `.link-hover` utility class (animated underline via ::after)

## Page Composition

Pages are thin composition files that import and render section components:

- **Shared sections**: `client/src/pages/sections/` (footer, FAQ, CTA, testimonials)
- **Page-specific sections**: `client/src/pages/[page-name]/sections/`
- New UI should use pantanal/* components; avoid duplicating existing component logic

### Blog

The blog listing page (`/blog`) follows a different structure than experience pages (Pesca, Ecoturismo, etc.):

**File structure**: `client/src/pages/blog/`
- `data.ts` — Types (`BlogArticle`, `BlogArticleDetail`, `ArticleContentBlock`), categories, articles, `getArticleBySlug()`, `getRelatedArticles()`, `getArticleUrl()`, `categorySlugMap`, `slugToCategoryMap`
- `components/BlogArticleCard.tsx` — Overlay card for listing page (Mais Recentes + Categorias)
- `components/RelatedArticleCard.tsx` — Image-on-top card for related articles section
- `sections/BlogHeroSection.tsx` — Featured article hero with NavHeader (listing page)
- `sections/BlogRecentSection.tsx` — "Mais Recentes" horizontal row (3 cards, dark bg)
- `sections/BlogCategoriesSection.tsx` — Filterable grid with pagination (cream bg)
- `sections/ArticleHeroSection.tsx` — Article page hero (dark bg, tag, title, description, author row, hero image)
- `sections/ArticleContentSection.tsx` — Rich article body (paragraphs, headings, species blocks, lists, footer divider)
- `sections/RelatedArticlesSection.tsx` — Related articles (dark bg, 3 cards)
- `BlogArticlePage.tsx` — Article page composition (route: `/blog/:categorySlug/:slug`)

**Listing page** (`/blog`): Hero → Mais Recentes → Categorias → shared CTA → shared Footer

**Article page** (`/blog/:categorySlug/:slug`): ArticleHero → ArticleContent → RelatedArticles → shared CTA → shared Footer

**URL structure**: SEO-optimized with category in URL. Articles have `primaryCategory` (used for canonical URL) + `categories[]` (used for multi-category filtering). URL helper: `getArticleUrl(article)` builds `/blog/:categorySlug/:articleSlug`. Category slugs handle accents (Conservação → conservacao) and multi-word names (Roteiros Exclusivos → roteiros-exclusivos).

**Testing**: Vitest + React Testing Library — tests in `client/src/pages/blog/**/*.test.{ts,tsx}`

**Key design decisions**:
- Blog cards are **510px tall** (desktop) — NOT 910px like species cards on experience pages
- 7 categories: Todas, Aventura, Gastronomia, Conservacao, Sustentabilidade, Roteiros Exclusivos, Eventos e Workshops
- Category filtering uses `categories[]` array (articles appear in multiple categories); URL uses `primaryCategory`
- Category filtering + pagination are client-side (React state, 9 per page)
- Hero author name: Lato Bold `text-base lg:text-lg` with `w-[245px]` truncation — intentionally smaller than Figma's 24px to stay proportional with the site
- Hero bottom separator: `border-t border-[#f2fcf7] pt-8` (not the Divider component)
- Categorias section uses cream bg `#fcf4ed` (light theme); Recentes uses dark bg `#263a30`
- Active pagination button: gold `#ac8042` bg + white text
- Category pills: active = `bg-[#f5e8db] rounded-lg`, inactive = `rounded-full`

### 404 Page

**File structure**: `client/src/pages/not-found/`
- `index.tsx` — Page composition (default export `NotFound`)
- `sections/NotFoundHeroSection.tsx` — 404-specific hero with background image, "404" label, title, description, "Voltar para o início" link

**Composition**: NotFoundHeroSection → ExclusiveExpeditionsSection (reused) → PantanalBlogSection (reused) → SiteFooterSection (reused)

**Route**: Wouter catch-all `<Route component={NotFound} />` (last route in Switch)
