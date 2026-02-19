# client/src/ — React SPA

## Overview

React 18 SPA built with Vite, TypeScript, Tailwind 3, and shadcn/ui (New York variant). Uses Wouter for routing, TanStack Query for server state, and Framer Motion for animations.

## Directory Structure

```
client/src/
├── components/
│   ├── pantanal/        → Design system components (16+): buttons, cards, typography
│   ├── ui/              → shadcn/ui primitives
│   ├── NavHeader.tsx    → Site navigation with mega-menu
│   ├── BookingDatePicker.tsx → Cloudbeds booking widget
│   ├── LanguageSwitcher.tsx  → PT/EN/ES toggle
│   ├── Divider.tsx      → Section divider
│   ├── OptimizedImage.tsx → <picture> with AVIF/WebP
│   └── MotionProvider.tsx → LazyMotion + MotionConfig wrapper
├── pages/
│   ├── sections/        → Shared sections (footer, FAQ, CTA, testimonials)
│   ├── home.tsx         → Home page composition
│   ├── acomodacoes/     → Accommodations (sections/)
│   ├── culinaria/       → Culinary (sections/)
│   ├── pesca/           → Fishing (sections/)
│   ├── observacao-de-aves/ → Birdwatching landing (sections/)
│   ├── birdwatching/    → Bird catalog + species (data.ts, components/, sections/, cms.ts)
│   ├── ecoturismo/      → Ecotourism (sections/)
│   ├── blog/            → Blog listing + articles (data.ts, components/, sections/, cms.ts)
│   ├── contato/         → Contact (sections/)
│   ├── nosso-impacto/   → Impact (sections/)
│   ├── privacidade/     → Privacy policy (sections/)
│   └── not-found/       → 404 page (sections/)
├── lib/
│   ├── cms/             → CMS data hooks and defaults
│   ├── motion.ts        → Framer Motion variant definitions
│   ├── queryClient.ts   → TanStack Query config
│   └── utils.ts         → cn() utility
├── i18n/
│   ├── context.tsx      → LanguageContext + LanguageProvider
│   └── ui-strings.ts    → Static UI string tables (nav, mega-menu)
├── hooks/               → Custom React hooks
├── test/                → Test setup (vitest + jest-dom)
└── App.tsx              → Root: MotionProvider → LanguageProvider → QueryClient → Router
```

## CMS Integration (`lib/cms/`)

### Hooks
| Hook | File | Returns | Endpoint |
|------|------|---------|----------|
| `usePageCms<K>(slug, defaults)` | `page-content.ts` | `PageContentMap[K]` | `/api/cms/page/:slug?locale=` |
| `useSharedCmsSections()` | `shared-content.ts` | `SharedCmsSections` | `/api/cms/shared?locale=` |
| `useBlogCmsData()` | `pages/blog/cms.ts` | `BlogCmsData` | `/api/cms/blog?locale=` |
| `useBirdCmsData()` | `pages/birdwatching/cms.ts` | `BirdCmsData` | `/api/cms/birdwatching?locale=` |

### Pattern
All hooks follow the same pattern:
1. Initial state from hardcoded locale-aware defaults
2. `useEffect` with `[lang]` dependency
3. Fetch from `/api/cms/*?locale=` with module-level cache (Map keyed by locale)
4. On success → update state + cache; on failure → keep defaults
5. Skip fetch in test mode (`import.meta.env.MODE === "test"`)

### Defaults
- PT defaults: `shared/cms-shared-content.ts` → `defaultSharedCmsSections`
- EN/ES defaults: `lib/cms/shared-defaults.ts` → `sharedDefaults.en` / `sharedDefaults.es`
- Page defaults: Each page provides its own `defaults: Record<Lang, T>` to `usePageCms`

## i18n System (`i18n/`)

- `Lang` = `"pt" | "en" | "es"`
- `LanguageProvider` wraps app, persists to `localStorage` key `"itaicy_lang"`
- Sets `document.documentElement.lang` (`pt-BR` / `en` / `es`)
- `useLanguage()` → `{lang, setLang}`
- `ui-strings.ts` has static UI text (nav labels, mega-menu sections) per locale
- CMS content is locale-aware via hooks (see above)

## Page Composition Pattern

Pages are thin composition files importing section components:

```tsx
// pages/pesca/index.tsx
export default function Pesca() {
  return (
    <>
      <PescaHeroSection />
      <PescaManifestoSection />
      <PescaHighlightsSection />
      <PescaServicesSection />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </>
  );
}
```

- **Shared sections** live in `pages/sections/` (footer, FAQ, CTA, testimonials)
- **Page-specific sections** live in `pages/[name]/sections/`
- Sections consume CMS data via hooks internally
- New UI should use `pantanal/*` components; avoid duplicating existing logic

## Design System Components (`components/pantanal/`)

All support `theme="dark" | "light"` prop for dark/cream section backgrounds.

Key components: `GoldButton`, `OutlineButton`, `SectionLabel`, `SectionTitle`, `BodyText`, `FeatureCard`, `HighlightCard`, `ServiceCard`, `ExperienceCard`, `TestimonialCard`, etc.

### OptimizedImage
```tsx
<OptimizedImage src="/images/name" alt="..." className="..." />
```
- `src` is base path **without extension** — auto-appends `.avif`, `.webp`
- Images in `client/public/images/`
- For CSS `background-image`, use `.webp` directly

## Animations (`lib/motion.ts` + `MotionProvider.tsx`)

- `MotionProvider` wraps entire app: `LazyMotion` (code-split) + `MotionConfig` (`reducedMotion="user"`)
- Variants: `fadeUp`, `fadeIn`, `scaleIn`, `stagger`, `staggerSlow`, `cardItem`
- Easing: `[0.25, 0.4, 0.25, 1]` (organic curve)
- Viewport trigger: `{ once: true, amount: 0.15 }` (scroll-reveal, one-time)
- Split-header pattern: stagger container + fadeIn label + fadeUp title/description
- Heroes: `staggerSlow` for content, `scaleIn` for images
- Card grids: `stagger` + `cardItem` per card
- `AnimatePresence mode="wait"` for filter/pagination grids
- CSS hover effects are PRESERVED (not replaced by motion)

## Blog (`pages/blog/`)

- Listing: `/blog` | Article: `/blog/:categorySlug/:slug`
- Two card types: `BlogArticleCard` (overlay, 510px) vs `RelatedArticleCard` (image-on-top)
- 7 categories, client-side filtering with `categories[]` array, pagination (9/page)
- Content blocks: paragraph (supports `**bold**`), heading, species, orderedList
- `categorySlugMap` / `slugToCategoryMap` for URL ↔ display name

## Bird Catalog (`pages/birdwatching/`)

- Catalog: `/observacao-de-aves/catalogo` | Species: `/observacao-de-aves/catalogo/:slug`
- `BirdSpeciesCard` (510px, overlay) + `FeaturedBirdCard` (910px)
- 5 categories, search input + category pills + 3x3 grid + pagination
- Species detail: conservation card, overview, size/habitat, diet, behavior, photography tips

## Testing

- Framework: Vitest 4 + React Testing Library + jsdom
- Co-located `*.test.{ts,tsx}` files next to source
- Setup: `test/setup.ts` (`@testing-library/jest-dom/vitest`)
- Guard for jsdom: `typeof IntersectionObserver === "undefined"`
- CMS hooks skip fetch in test mode
