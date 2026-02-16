# CMS Full Content Migration — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Extract ALL hardcoded content from React sections into the CMS, serve it via API, and consume it on the frontend — making every text string, image path, and data array editable from the Payload admin panel.

**Architecture:** Extend the existing hybrid pattern (Payload REST → seed JSON fallback). Add a new `pages` key to the shared content type with per-page section data. Use `SiteSettings` for cross-page shared content (already done) and a new `pageContent` field in `full-seed.json` for page-specific sections. A single new API endpoint `/api/cms/page/:slug` serves page content. Frontend gets a new `usePageCms(slug)` hook.

**Tech Stack:** Payload CMS 3 + SQLite, Express API, React 18 + TypeScript, TanStack Query (optional), Vitest + RTL

---

## Current State

### Already CMS-driven (6 shared sections via `useSharedCmsSections()`)
- `homeHero` — Hero heading, subtitle, booking card text
- `homeManifesto` — Manifesto label, color segments, button label
- `testimonials` — Label, heading, description, items[]
- `faq` — Label, heading, description, items[]
- `immersionCta` — Heading, description, backgroundImage
- `footer` — All links, newsletter, copyright, contact

### Already CMS-driven (blog + birds via dedicated hooks)
- Blog listing + articles via `/api/cms/blog`
- Bird catalog + species via `/api/cms/birdwatching`

### NOT CMS-driven (hardcoded in ~35 section files)
Every section below has strings, arrays, or image paths baked into the React component.

---

## Content Inventory (What Needs Migration)

### HOME (`/`) — 5 sections to migrate

| Section | Hardcoded Content |
|---------|-------------------|
| `AuthenticRestSection` | label, heading, 2 paragraphs, 3 features (number, title, desc), 1 image |
| `ExclusiveExpeditionsSection` | label, heading, description, 3 expedition cards (title, desc, bgImage), button text |
| `PantanalStatsSection` | 4 stats (target, suffix, label) |
| `AccommodationInfoSection` | label, heading, body, 2 button texts, 1 bg image |
| `NaturalRefugeDescriptionSection` | label, heading, 3 impact items (number, title, desc), 1 image |
| `PantanalBlogSection` | label, heading, description, 3 blog cards (hardcoded!), button text |

### ACOMODACOES (`/acomodacoes`) — 5 sections

| Section | Hardcoded Content |
|---------|-------------------|
| `AccommodationsHeroSection` | label, heading, subtitle, scroll hint, video paths (webm/mp4), poster |
| `ManifestoStatementSection` | manifesto text with gold highlights |
| `AccommodationsHighlightsSection` | heading, 6 highlight cards (icon, title, desc) |
| `ApartmentSection` (x3) | 3 room types: title, desc, 4 features each (icon, label), image, CTA text |
| `CulinarySection` | label, heading, desc, 4 culinary images (src, alt, tag), CTA link text |

### CULINARIA (`/culinaria`) — 6 sections

| Section | Hardcoded Content |
|---------|-------------------|
| `CulinaryHeroSection` | label, heading, subtitle, scroll hint, video/poster |
| `CulinaryManifestoSection` | manifesto text with highlights |
| `CulinaryMenuSection` | about text + image |
| `CulinaryHighlightsSection` | heading, 6 highlight cards |
| `CulinaryServicesSection` | service cards |
| `CulinaryExperienceSection` | experience description |
| `AccommodationsCrossSellSection` | cross-sell CTA |

### PESCA (`/pesca`) — 5 sections

| Section | Hardcoded Content |
|---------|-------------------|
| `PescaHeroSection` | label, heading, subtitle, video/poster |
| `PescaManifestoSection` | manifesto text |
| `PescaSobreNosSection` | about text + image |
| `PescaHighlightsSection` | heading, 6 highlight cards |
| `PescaServicesSection` | service cards |

### ECOTURISMO (`/ecoturismo`) — 5 sections

| Section | Hardcoded Content |
|---------|-------------------|
| `EcoHeroSection` | label, heading, subtitle, video/poster |
| `EcoManifestoSection` | manifesto text |
| `EcoSobreNosSection` | about text + image |
| `EcoHighlightsSection` | heading, 6 highlight cards |
| `EcoServicesSection` | service cards |

### BIRDWATCHING (`/observacao-de-aves`) — 4 sections

| Section | Hardcoded Content |
|---------|-------------------|
| `BirdHeroSection` | label, heading, subtitle, description, video/poster |
| `BirdManifestoSection` | manifesto text |
| `BirdSobreNosSection` | about text + image |
| `BirdHighlightsSection` | heading, 6 highlight cards |

### CONTATO (`/contato`) — 2 sections

| Section | Hardcoded Content |
|---------|-------------------|
| `ContactHeroSection` | label, heading, form title, step labels, input placeholders, buttons, description |
| `ContactChannelsSection` | heading, 3 channel cards (icon, title, info), map coords |

### NOSSO IMPACTO (`/nosso-impacto`) — 7 sections

| Section | Hardcoded Content |
|---------|-------------------|
| `ImpactHeroSection` | label, heading, description, scroll hint, bg image |
| `ImpactManifestoSection` | manifesto text |
| `RioVivoSection` | heading, description, 4 cycle steps |
| `BiodiversidadeSection` | heading, description, counter items |
| `ComunidadeSection` | heading, description, content |
| `OperacaoConscienteSection` | heading, description, 3 practice cards |
| `ImpactEngagementSection` | heading, description, CTA button |

### PRIVACIDADE (`/politica-de-privacidade`) — 2 sections

| Section | Hardcoded Content |
|---------|-------------------|
| `PrivacyHeroSection` | title, last updated date |
| `PrivacyContentSection` | 6 legal sections (titles + body text), sidebar ToC |

### 404 — 1 section

| Section | Hardcoded Content |
|---------|-------------------|
| `NotFoundHeroSection` | "404" label, heading, description, button text, bg image |

---

## Architecture Decision

### Approach: Typed JSON per page in seed + SiteSettings global extension

Rather than creating dozens of new Payload collections (one per page), we:

1. **Extend `full-seed.json`** with a `pageContent` map keyed by route slug
2. **Extend `SiteSettings`** with a `pageContent` JSON field (editable in admin)
3. **Add one new API endpoint**: `GET /api/cms/page/:slug`
4. **Add one new React hook**: `usePageCms<T>(slug)` with typed defaults
5. **Keep hardcoded defaults** in each section as SSR fallback (graceful degradation)

### Data Flow

```
Payload Admin → SiteSettings.pageContent[slug] → /api/cms/page/:slug → usePageCms(slug) → Section
                                                                    ↘ fallback: hardcoded defaults
```

### Type Safety

Each page gets a TypeScript interface describing its sections:

```typescript
type HomePageContent = {
  aboutUs: { label: string; heading: string; body: string[]; features: Feature[]; image: string };
  expeditions: { label: string; heading: string; description: string; items: ExpeditionCard[]; buttonText: string };
  stats: { items: StatItem[] };
  accommodation: { label: string; heading: string; body: string; buttons: string[]; backgroundImage: string };
  impact: { label: string; heading: string; items: ImpactItem[]; image: string };
  blog: { label: string; heading: string; description: string; buttonText: string };
};
```

---

## Phase 1: Content Extraction Script (seed generation)

### Task 1: Create page content type definitions

**Files:**
- Create: `shared/cms-page-content.ts`

**Step 1: Write the shared types**

Define TypeScript interfaces for every page's CMS content. These are shared between server and client.

```typescript
// shared/cms-page-content.ts

// === Reusable field types ===
export type CmsFeature = { number: string; title: string; description: string };
export type CmsHighlight = { iconName: string; title: string; description: string };
export type CmsExpeditionCard = { title: string; description: string; backgroundImage: string; href: string };
export type CmsStatItem = { target: number; suffix: string; label: string; hasIcon?: boolean };
export type CmsImpactItem = { number: string; title: string; description: string };
export type CmsRoomType = {
  title: string; description: string; image: string; ctaText: string;
  features: { iconName: string; label: string }[];
};
export type CmsCulinaryImage = { src: string; alt: string; tag: string };
export type CmsServiceCard = { title: string; description: string; image: string; href?: string };
export type CmsContactChannel = { iconName: string; title: string; info: string };
export type CmsCycleStep = { iconName: string; title: string; description: string };
export type CmsPracticeCard = { iconName: string; title: string; description: string };
export type CmsPrivacySection = { id: string; title: string; content: string[] };

// === Hero (shared pattern across pages) ===
export type CmsHero = {
  label: string;
  heading: string;
  subtitle?: string;
  description?: string;
  scrollHint?: string;
  backgroundImage?: string;
  videoWebm?: string;
  videoMp4?: string;
  videoWebmLow?: string;
  videoMp4Low?: string;
  videoPoster?: string;
};

// === Manifesto (shared pattern) ===
export type CmsManifesto = {
  segments: { text: string; isHighlight: boolean }[];
};

// === About Us / Sobre Nós (shared pattern) ===
export type CmsSobreNos = {
  label?: string;
  heading: string;
  body: string[];
  image: string;
  features?: CmsFeature[];
};

// === Highlights (shared pattern — 6 cards) ===
export type CmsHighlights = {
  heading: string;
  items: CmsHighlight[];
};

// === Services (shared pattern) ===
export type CmsServices = {
  label?: string;
  heading?: string;
  description?: string;
  items: CmsServiceCard[];
  buttonText?: string;
  buttonHref?: string;
};

// === Per-page content types ===
export type HomePageContent = {
  aboutUs: CmsSobreNos;
  expeditions: {
    label: string; heading: string; description: string;
    items: CmsExpeditionCard[]; buttonText: string;
  };
  stats: { items: CmsStatItem[] };
  accommodation: {
    label: string; heading: string; body: string;
    buttonReserve: string; buttonDetails: string; backgroundImage: string;
  };
  impact: { label: string; heading: string; items: CmsImpactItem[]; image: string };
  blog: { label: string; heading: string; description: string; buttonText: string };
};

export type AcomodacoesPageContent = {
  hero: CmsHero;
  manifesto: CmsManifesto;
  highlights: CmsHighlights;
  rooms: CmsRoomType[];
  culinary: {
    label: string; heading: string; description: string;
    images: CmsCulinaryImage[]; ctaText: string; ctaHref: string;
  };
};

export type CulinariaPageContent = {
  hero: CmsHero;
  manifesto: CmsManifesto;
  menu: CmsSobreNos;
  highlights: CmsHighlights;
  services: CmsServices;
  experience: { heading: string; body: string[]; image: string };
  crossSell: { heading: string; description: string; buttonText: string; buttonHref: string; image: string };
};

export type PescaPageContent = {
  hero: CmsHero;
  manifesto: CmsManifesto;
  sobreNos: CmsSobreNos;
  highlights: CmsHighlights;
  services: CmsServices;
};

export type EcoturismoPageContent = {
  hero: CmsHero;
  manifesto: CmsManifesto;
  sobreNos: CmsSobreNos;
  highlights: CmsHighlights;
  services: CmsServices;
};

export type BirdwatchingPageContent = {
  hero: CmsHero;
  manifesto: CmsManifesto;
  sobreNos: CmsSobreNos;
  highlights: CmsHighlights;
};

export type ContatoPageContent = {
  hero: CmsHero;
  formTitle: string;
  steps: { placeholders: string[]; buttonNext: string; buttonBack: string; buttonSubmit: string };
  channels: { heading: string; items: CmsContactChannel[] };
  mapCoords: { lat: number; lng: number };
};

export type NossoImpactoPageContent = {
  hero: CmsHero;
  manifesto: CmsManifesto;
  rioVivo: { heading: string; description: string; steps: CmsCycleStep[] };
  biodiversidade: { heading: string; description: string; counters: CmsStatItem[] };
  comunidade: { heading: string; description: string; body: string[]; image: string };
  operacao: { heading: string; description: string; practices: CmsPracticeCard[] };
  engagement: { heading: string; description: string; buttonText: string };
};

export type PrivacidadePageContent = {
  hero: { title: string; lastUpdated: string };
  sections: CmsPrivacySection[];
};

export type NotFoundPageContent = {
  hero: CmsHero;
  buttonText: string;
};

// === Map route → content type ===
export type PageContentMap = {
  "/": HomePageContent;
  "/acomodacoes": AcomodacoesPageContent;
  "/culinaria": CulinariaPageContent;
  "/pesca": PescaPageContent;
  "/ecoturismo": EcoturismoPageContent;
  "/observacao-de-aves": BirdwatchingPageContent;
  "/contato": ContatoPageContent;
  "/nosso-impacto": NossoImpactoPageContent;
  "/politica-de-privacidade": PrivacidadePageContent;
  "/404": NotFoundPageContent;
};
```

**Step 2: Commit**

```bash
git add shared/cms-page-content.ts
git commit -m "feat: add typed page content interfaces for CMS migration"
```

---

### Task 2: Create content extraction script

**Files:**
- Create: `scripts/extract-page-content.ts`

**Purpose:** Read every hardcoded section, extract all strings/arrays/images, and write to `docs/payload-seed/page-content.json`. This becomes the source of truth for the initial seed.

**Step 1: Write the extraction script**

The script imports each section's defaults (or reads the TSX files) and outputs structured JSON matching the types from Task 1. Since the content is hardcoded in React components, the script manually declares the current values (copy-paste from sections) to build the JSON. This is a one-time export.

**Step 2: Run it**

```bash
npx tsx scripts/extract-page-content.ts
```

Expected output: `docs/payload-seed/page-content.json` with all 10 pages.

**Step 3: Update `full-seed.json`**

The script also merges `page-content.json` into `full-seed.json` under a new `pageContent` key.

**Step 4: Commit**

```bash
git add scripts/extract-page-content.ts docs/payload-seed/page-content.json docs/payload-seed/full-seed.json
git commit -m "feat: extract all hardcoded page content to seed JSON"
```

---

## Phase 2: CMS Schema Extension

### Task 3: Add `pageContent` JSON field to SiteSettings

**Files:**
- Modify: `payload-cms/src/globals/SiteSettings.ts`

**Step 1: Add a new tab "Conteúdo das Páginas" with a JSON field**

```typescript
{
  label: "Conteudo das Paginas",
  fields: [
    {
      name: "pageContent",
      type: "json",
      admin: {
        description: "JSON com conteudo editavel por pagina. Chaves: /, /acomodacoes, /culinaria, etc.",
      },
    },
  ],
}
```

**Step 2: Update `importSeed.ts`** to populate `pageContent` from `full-seed.json`

In `importSharedSections()`, add:

```typescript
if (seed.pageContent) {
  updateData.pageContent = seed.pageContent;
}
```

**Step 3: Regenerate types**

```bash
cd payload-cms && npx payload generate:types
```

**Step 4: Run seed import**

```bash
cd payload-cms && npm run seed
```

**Step 5: Commit**

```bash
git add payload-cms/src/globals/SiteSettings.ts payload-cms/src/scripts/importSeed.ts payload-cms/payload-types.ts
git commit -m "feat: add pageContent JSON field to SiteSettings for per-page CMS content"
```

---

## Phase 3: API Layer

### Task 4: Add `/api/cms/page/:slug` endpoint

**Files:**
- Modify: `server/routes.ts`
- Modify: `server/cms-content.ts`

**Step 1: Extend `CmsContent` type**

In `cms-content.ts`, ensure the content includes `pageContent`:

```typescript
// In the seed type or cms-content type
pageContent?: Record<string, unknown>;
```

**Step 2: Load `pageContent` from Payload or seed**

In `getCmsContent()`, include `pageContent` from either source:
- From Payload: `settings.pageContent`
- From seed: `seed.pageContent`

**Step 3: Add route handler**

In `routes.ts`:

```typescript
app.get("/api/cms/page/:slug", async (req, res) => {
  try {
    const { content, source } = await getCmsContent();
    const slug = "/" + (req.params.slug === "home" ? "" : req.params.slug);
    const pageData = content.pageContent?.[slug] ?? null;
    if (!pageData) {
      res.status(404).json({ message: "Page content not found" });
      return;
    }
    res.json({ slug, content: pageData, source });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to load page content",
    });
  }
});
```

**Step 4: Test manually**

```bash
curl http://127.0.0.1:5000/api/cms/page/home
curl http://127.0.0.1:5000/api/cms/page/acomodacoes
curl http://127.0.0.1:5000/api/cms/page/culinaria
```

**Step 5: Commit**

```bash
git add server/routes.ts server/cms-content.ts
git commit -m "feat: add /api/cms/page/:slug endpoint for per-page content"
```

---

## Phase 4: Frontend Hook

### Task 5: Create `usePageCms<T>(slug)` hook

**Files:**
- Create: `client/src/lib/cms/page-content.ts`

**Step 1: Write the hook**

Follow the same pattern as `useSharedCmsSections()` — fetch with cache, fallback to defaults.

```typescript
// client/src/lib/cms/page-content.ts
import { useEffect, useState } from "react";
import type { PageContentMap } from "@shared/cms-page-content";

const pageCache = new Map<string, unknown>();
const pagePromises = new Map<string, Promise<unknown>>();

async function fetchPageContent<K extends keyof PageContentMap>(
  slug: K,
): Promise<PageContentMap[K] | null> {
  const apiSlug = slug === "/" ? "home" : slug.replace(/^\//, "");
  try {
    const res = await fetch(`/api/cms/page/${apiSlug}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.content as PageContentMap[K];
  } catch {
    return null;
  }
}

export function usePageCms<K extends keyof PageContentMap>(
  slug: K,
  defaults: PageContentMap[K],
): PageContentMap[K] {
  const [content, setContent] = useState<PageContentMap[K]>(defaults);

  useEffect(() => {
    if (import.meta.env.MODE === "test") return;

    let mounted = true;

    // Check cache
    if (pageCache.has(slug)) {
      setContent(pageCache.get(slug) as PageContentMap[K]);
      return;
    }

    // Deduplicate in-flight requests
    let promise = pagePromises.get(slug) as Promise<PageContentMap[K] | null> | undefined;
    if (!promise) {
      promise = fetchPageContent(slug);
      pagePromises.set(slug, promise);
    }

    promise.then((data) => {
      if (data && mounted) {
        pageCache.set(slug, data);
        setContent(data);
      }
    }).finally(() => {
      pagePromises.delete(slug);
    });

    return () => { mounted = false; };
  }, [slug, defaults]);

  return content;
}
```

**Step 2: Commit**

```bash
git add client/src/lib/cms/page-content.ts
git commit -m "feat: add usePageCms hook for per-page CMS content"
```

---

## Phase 5: Migrate Sections (page by page)

### Strategy

For each page, the migration follows the same pattern:

1. **Define defaults** — Move the current hardcoded data to a `defaults` object matching the type
2. **Use hook** — Call `usePageCms(slug, defaults)` in the page component
3. **Pass to sections** — Sections receive content as props instead of hardcoding
4. **Sections become "dumb"** — They render props, no hardcoded strings

### Task 6: Migrate HOME page sections

**Files:**
- Modify: `client/src/pages/Desktop.tsx`
- Modify: `client/src/pages/sections/AuthenticRestSection.tsx`
- Modify: `client/src/pages/sections/ExclusiveExpeditionsSection.tsx`
- Modify: `client/src/pages/sections/PantanalStatsSection.tsx`
- Modify: `client/src/pages/sections/AccommodationInfoSection.tsx`
- Modify: `client/src/pages/sections/NaturalRefugeDescriptionSection.tsx`
- Modify: `client/src/pages/sections/PantanalBlogSection.tsx`
- Create: `client/src/pages/home-defaults.ts` (extracted hardcoded content)

**Step 1: Create `home-defaults.ts`** with all current hardcoded values as a `HomePageContent` object.

**Step 2: In `Desktop.tsx`**, add `usePageCms("/", homeDefaults)` and pass sub-objects to each section as props.

**Step 3: Update each section** to accept content props instead of hardcoding text. Keep the existing component structure, just replace string literals with `props.heading`, `props.items.map(...)`, etc.

**Step 4: Run tests**

```bash
npm test
```

**Step 5: Visual test** — Open http://127.0.0.1:5000 and verify nothing changed visually.

**Step 6: Commit**

```bash
git commit -m "feat: migrate home page sections to CMS content"
```

---

### Task 7: Migrate ACOMODACOES page sections

**Files:**
- Modify: `client/src/pages/Acomodacoes.tsx`
- Modify: all files in `client/src/pages/acomodacoes/sections/`
- Create: `client/src/pages/acomodacoes/defaults.ts`

Same pattern as Task 6. Extract hardcoded content → defaults file → usePageCms → props.

**Commit:** `feat: migrate acomodacoes page sections to CMS content`

---

### Task 8: Migrate CULINARIA page sections

**Files:**
- Modify: `client/src/pages/Culinaria.tsx`
- Modify: all files in `client/src/pages/culinaria/sections/`
- Create: `client/src/pages/culinaria/defaults.ts`

**Commit:** `feat: migrate culinaria page sections to CMS content`

---

### Task 9: Migrate PESCA page sections

**Files:**
- Modify: `client/src/pages/Pesca.tsx`
- Modify: all files in `client/src/pages/pesca/sections/`
- Create: `client/src/pages/pesca/defaults.ts`

**Commit:** `feat: migrate pesca page sections to CMS content`

---

### Task 10: Migrate ECOTURISMO page sections

**Files:**
- Modify: `client/src/pages/Ecoturismo.tsx`
- Modify: all files in `client/src/pages/ecoturismo/sections/`
- Create: `client/src/pages/ecoturismo/defaults.ts`

**Commit:** `feat: migrate ecoturismo page sections to CMS content`

---

### Task 11: Migrate BIRDWATCHING main page sections

**Files:**
- Modify: `client/src/pages/BirdWatching.tsx`
- Modify: hero, manifesto, sobreNos, highlights sections in `client/src/pages/birdwatching/sections/`
- Create: `client/src/pages/birdwatching/page-defaults.ts`

Note: Bird catalog and species pages already use CMS data. Only the main `/observacao-de-aves` page has hardcoded hero/manifesto/highlights.

**Commit:** `feat: migrate birdwatching main page sections to CMS content`

---

### Task 12: Migrate CONTATO page sections

**Files:**
- Modify: `client/src/pages/contato/index.tsx`
- Modify: all files in `client/src/pages/contato/sections/`
- Create: `client/src/pages/contato/defaults.ts`

**Commit:** `feat: migrate contato page sections to CMS content`

---

### Task 13: Migrate NOSSO IMPACTO page sections

**Files:**
- Modify: `client/src/pages/NossoImpacto.tsx`
- Modify: all files in `client/src/pages/nosso-impacto/sections/`
- Create: `client/src/pages/nosso-impacto/defaults.ts`

**Commit:** `feat: migrate nosso-impacto page sections to CMS content`

---

### Task 14: Migrate PRIVACIDADE page

**Files:**
- Modify: `client/src/pages/Privacidade.tsx`
- Modify: `client/src/pages/privacidade/sections/PrivacyHeroSection.tsx`
- Modify: `client/src/pages/privacidade/sections/PrivacyContentSection.tsx`
- Create: `client/src/pages/privacidade/defaults.ts`

**Commit:** `feat: migrate privacidade page sections to CMS content`

---

### Task 15: Migrate 404 page

**Files:**
- Modify: `client/src/pages/not-found/index.tsx`
- Modify: `client/src/pages/not-found/sections/NotFoundHeroSection.tsx`
- Create: `client/src/pages/not-found/defaults.ts`

**Commit:** `feat: migrate 404 page sections to CMS content`

---

## Phase 6: Verification & Cleanup

### Task 16: Full integration test

**Step 1: Verify API serves all pages**

```bash
for slug in home acomodacoes culinaria pesca ecoturismo observacao-de-aves contato nosso-impacto politica-de-privacidade 404; do
  echo -n "$slug: "
  curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5000/api/cms/page/$slug
  echo ""
done
```

All should return 200.

**Step 2: Verify CMS admin can edit**

1. Open http://127.0.0.1:3001/admin
2. Go to Site Settings → Conteúdo das Páginas
3. Edit a text field (e.g., home aboutUs heading)
4. Save
5. Hard-refresh the frontend
6. Verify the change appears

**Step 3: Verify fallback works**

1. Stop the Payload CMS server
2. Refresh the frontend
3. Verify it still loads with seed defaults (no blank pages)

**Step 4: Run full test suite**

```bash
npm test
npx tsc --noEmit
```

**Step 5: Commit**

```bash
git commit -m "test: verify full CMS content migration across all pages"
```

---

### Task 17: Update seed script for ongoing maintenance

**Files:**
- Modify: `scripts/export-content-for-payload.ts` (existing)

Update the existing export script to include `pageContent` in its output, so future content changes in code can be re-exported to the seed.

**Commit:** `feat: update content export script to include pageContent`

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| **1** | 1-2 | Type definitions + content extraction to seed JSON |
| **2** | 3 | CMS schema extension (pageContent JSON field) |
| **3** | 4 | API endpoint `/api/cms/page/:slug` |
| **4** | 5 | Frontend `usePageCms()` hook |
| **5** | 6-15 | Migrate 10 pages (one commit per page) |
| **6** | 16-17 | Integration test + maintenance script |

**Total:** 17 tasks, ~10 commits, zero visual changes to the site.

**Key principle:** Every section keeps its hardcoded defaults as fallback. The CMS is additive — it can override any value, but the site always works without it.
