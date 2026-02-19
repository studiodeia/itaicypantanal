# Payload CMS Multilingual (PT/EN/ES) — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Enable native Payload CMS localization (PT/EN/ES), seed all existing EN/ES content from the `*-defaults.ts` files into the CMS, and make the frontend consume 100% of content from the CMS for all languages.

**Architecture:** Payload v3 native `localization` (`{ locales: ["pt","en","es"], defaultLocale: "pt", fallback: true }`). Text/textarea fields get `localized: true`. The REST API then accepts `?locale=en` etc. The server passes the locale from the request. The client includes the active lang in the fetch URL.

**Tech Stack:** Payload CMS v3 + Next.js 15, SQLite (`payload.db`), Express server (`server/cms-content.ts`), React + `useLanguage()` hook.

---

## Task 1: Add localization to `payload.config.ts`

**Files:**
- Modify: `payload-cms/src/payload.config.ts`

**Step 1: Add localization config**

Add the `localization` block to `buildConfig()`:

```typescript
export default buildConfig({
  // ...existing config...
  localization: {
    locales: [
      { label: "Português", code: "pt" },
      { label: "English",   code: "en" },
      { label: "Español",   code: "es" },
    ],
    defaultLocale: "pt",
    fallback: true,
  },
  // ...rest of config unchanged...
});
```

**Step 2: Commit**

```bash
cd payload-cms && git add src/payload.config.ts
cd .. && git add payload-cms/src/payload.config.ts
git commit -m "feat(cms): add Payload native localization PT/EN/ES"
```

---

## Task 2: Add `localized: true` to shared field factories

**Files:**
- Modify: `payload-cms/src/fields/heroFields.ts`
- Modify: `payload-cms/src/fields/manifestoFields.ts`
- Modify: `payload-cms/src/fields/sobreNosFields.ts`
- Modify: `payload-cms/src/fields/highlightsFields.ts`
- Modify: `payload-cms/src/fields/servicesFields.ts`
- Modify: `payload-cms/src/fields/faqFields.ts`

**Step 1: Update `heroFields.ts`**

Add `localized: true` to: `heading`, `subtitle`, `description`, `scrollHint`.
Do NOT localize: `label` (same across langs), `backgroundImage`, `videoMp4`, `videoWebm`, `videoMp4Low`, `videoWebmLow`, `videoPoster`.

Wait — `label` is the eyebrow chip (e.g. "PESCA ESPORTIVA" → "SPORT FISHING") — it DOES need localization. Add `localized: true` to `label` too.

Fields to add `localized: true` in `heroFields()`:
- `label`
- `heading`
- `subtitle`
- `description`
- `scrollHint`

**Step 2: Update `manifestoFields.ts`**

In the `segments` array field, the sub-field `text` needs `localized: true`. `isHighlight` does NOT.

**Step 3: Update `sobreNosFields.ts`**

Add `localized: true` to: `label`, `heading`. In `body` array: `text` subfield. In `features` array: `number` (the display text like "1"), `title`, `description`. Leave `image` without localization.

**Step 4: Update `highlightsFields.ts`**

Add `localized: true` to: `heading`. In `items` array: `title`, `description`. Leave `iconName` without localization.

**Step 5: Update `servicesFields.ts`**

Add `localized: true` to: `label`, `heading`, `description`, `buttonText`. In `items` array: `title`, `description`. Leave `image`, `href`, `buttonHref` without localization.

**Step 6: Update `faqFields.ts`**

Add `localized: true` to: `label`, `heading`, `description`. In `items` array: `question`, `answer`. Leave `id`, `number` without localization.

**Step 7: Commit**

```bash
git add payload-cms/src/fields/
git commit -m "feat(cms): mark shared field factories as localized"
```

---

## Task 3: Add `localized: true` to individual global fields

**Files:**
- Modify: `payload-cms/src/globals/HomeContent.ts`
- Modify: `payload-cms/src/globals/AcomodacoesContent.ts`
- Modify: `payload-cms/src/globals/CulinariaContent.ts`
- Modify: `payload-cms/src/globals/ContatoContent.ts`
- Modify: `payload-cms/src/globals/NossoImpactoContent.ts`
- Modify: `payload-cms/src/globals/PrivacidadeContent.ts`
- Modify: `payload-cms/src/globals/NotFoundContent.ts`
- Modify: `payload-cms/src/globals/SiteSettings.ts`
- Modify: `payload-cms/src/globals/AgentConfig.ts`

**Step 1: `HomeContent.ts`**

In `expeditions` group: `label`, `heading`, `description`, `buttonText`; in `items[]`: `title`, `description`. Leave `backgroundImage`.

In `stats` group: in `items[]`: `suffix`, `label`. Leave `target` (number).

In `accommodation` group: `label`, `heading`, `body`, `buttonReserve`, `buttonDetails`. Leave `backgroundImage`.

In `impact` group: `label`, `heading`; in `items[]`: `number` (display text), `title`, `description`. Leave `image`.

In `blog` group: `label`, `heading`, `description`, `buttonText`.

**Step 2: `AcomodacoesContent.ts`**

In `rooms[]`: `title`, `description`, `ctaText`; in `features[]`: `label`. Leave `image`, `iconName`.

In `culinary` group: `label`, `heading`, `description`, `ctaText`. In `images[]`: `alt`, `tag`. Leave `src`, `ctaHref`.

**Step 3: `CulinariaContent.ts`**

In `experience` group: `heading`; in `body[]`: `text`. Leave `image`.

In `crossSell` group: `heading`, `description`, `buttonText`. Leave `buttonHref`, `image`.

**Step 4: `ContatoContent.ts`**

`formTitle`; in `steps`: `buttonNext`, `buttonBack`, `buttonSubmit`; in `placeholders[]`: `text`.

In `channels`: `heading`; in `items[]`: `title`, `info`. Leave `iconName`.

**Step 5: `NossoImpactoContent.ts`**

In `rioVivo`: `heading`, `description`; in `steps[]`: `title`, `description`. Leave `iconName`.

In `biodiversidade`: `heading`, `description`; in `counters[]`: `suffix`, `label`. Leave `target`.

In `comunidade`: `heading`, `description`; in `body[]`: `text`. Leave `image`.

In `operacao`: `heading`, `description`; in `practices[]`: `title`, `description`. Leave `iconName`.

In `engagement`: `heading`, `description`, `buttonText`.

**Step 6: `PrivacidadeContent.ts`**

In `hero`: `title`, `lastUpdated`.

In `sections[]`: `title`; in `content[]`: `text`. Leave `id` (anchor).

**Step 7: `NotFoundContent.ts`**

`buttonText`.

**Step 8: `SiteSettings.ts`**

`ctaHeading`, `ctaDescription`; `faqLabel`, `faqHeading`, `faqDescription`; in `faqItems[]`: `question`, `answer`; `testimonialsLabel`, `testimonialsHeading`, `testimonialsDescription`; in `testimonialItems[]`: `quote`, `author`, `location`; in footer link arrays: `label`; `footerCopyright`; `defaultMetaTitle`, `defaultMetaDescription`.

Leave: `brandName`, `contactEmail`, `contactPhone`, `contactAddress`, `siteUrl`, `googleSiteVerification`, `url` in link arrays.

**Step 9: `AgentConfig.ts` — migrate from manual groups to native localization**

Currently uses `localizedTextField()` helper that creates `{ pt: textarea, en: textarea, es: textarea }` groups. Replace all those fields with single `textarea` fields each with `localized: true`.

Fields to migrate: `priceDisclaimer`, `availabilityDisclaimer`, `policyDisclaimer`, `genericErrorFallback`, `apiUnavailableFallback`, `leadConsentPrompt`, `leadSuccessMessage`, `welcomeGreeting`.

Also update `shared/agent-config-payload.ts` to read from the new shape (single string instead of `{ pt, en, es }` object).

**Step 10: Commit**

```bash
git add payload-cms/src/globals/ shared/agent-config-payload.ts
git commit -m "feat(cms): mark all global fields as localized"
```

---

## Task 4: Add `localized: true` to collections

**Files:**
- Modify: `payload-cms/src/collections/BlogPosts.ts`
- Modify: `payload-cms/src/collections/BirdSpecies.ts`

**Step 1: `BlogPosts.ts`**

Add `localized: true` to: `title`, `subtitle`, `description`, `tag`, `readingTime`.

For `contentBlocks` (blocks field): add `localized: true` to the blocks field itself (this is the Payload way to localize blocks).

Actually — for blocks, Payload v3 localization on the blocks field localizes all sub-fields. Add `localized: true` on the `contentBlocks` field directly.

Leave without localization: `slug`, `src`, `heroImage`, `author`, `date`, `primaryCategory`, `categories`, `relatedPosts`, `isFeatured`, `isRecent`.

**Step 2: `BirdSpecies.ts`**

Add `localized: true` to: `commonName`, `description`, `overview`, `diet`, `behavior`, `bestTime`, `habitat`, `conservationStatus`, `tag`.

In `photographyTips[]`: add `localized: true` to the `tip` subfield.

Remove `commonNameEN` field (will be replaced by `commonName` in `en` locale).

Wait — removing `commonNameEN` would be a breaking change. Keep it for now, mark it `deprecated` in admin label. Add a migration note. The `commonNameEN` data should be migrated to `commonName` in locale `en`.

Leave without localization: `scientificName`, `slug`, `src`, `heroImage`, `author`, `date`, `taxonomicOrder`, `family`, `size`, `category`, `isFeatured`.

**Step 3: Commit**

```bash
git add payload-cms/src/collections/BlogPosts.ts payload-cms/src/collections/BirdSpecies.ts
git commit -m "feat(cms): mark collection content fields as localized"
```

---

## Task 5: Run DB migration and verify schema

**Step 1: Start Payload dev server (it auto-migrates)**

```bash
npm --prefix payload-cms run dev
```

Wait for "Ready in Xs" — Payload will detect schema changes and auto-create new columns in SQLite for each locale. Watch the console for migration messages.

**Step 2: Verify in admin UI**

Open `http://localhost:3001/admin` → click any global (e.g. CulinariaContent) → should see a language switcher in the admin panel between PT / EN / ES.

**Step 3: Verify PT content is intact**

Check that existing PT content was NOT lost — the `defaultLocale: "pt"` should preserve all existing data as PT locale.

Run sanity check query:
```bash
node -e "
const {createClient} = require('./payload-cms/node_modules/@libsql/client');
const db = createClient({url:'file:./payload-cms/payload.db'});
db.execute('SELECT COUNT(*) as n FROM blog_posts').then(r => console.log('blog_posts:', r.rows[0].n));
db.execute('SELECT COUNT(*) as n FROM bird_species').then(r => console.log('bird_species:', r.rows[0].n));
"
```

---

## Task 6: Create multilingual seed script

**Files:**
- Create: `payload-cms/src/scripts/seedMultilingual.ts`

**Step 1: Write the script**

The script must:
1. Extract EN/ES content from all `*-defaults.ts` files
2. Use Payload's `payload.updateGlobal(slug, data, { locale: 'en' })` to update each global
3. Update blog posts with EN titles/descriptions (where available)
4. Update bird species with EN common names from `commonNameEN` field

```typescript
import payload from "payload";
import config from "../payload.config";

// Import all defaults
import { homeDefaults } from "../../../../client/src/pages/home-defaults";
import { culinariaDefaults } from "../../../../client/src/pages/culinaria-defaults";
import { pescaDefaults } from "../../../../client/src/pages/pesca-defaults";
import { acomodacoesDefaults } from "../../../../client/src/pages/acomodacoes-defaults";
import { ecoturismoDefaults } from "../../../../client/src/pages/ecoturismo-defaults";
import { birdwatchingDefaults } from "../../../../client/src/pages/birdwatching-defaults";
import { nossoImpactoDefaults } from "../../../../client/src/pages/nosso-impacto-defaults";
import { contatoDefaults } from "../../../../client/src/pages/contato-defaults";
import { privacidadeDefaults } from "../../../../client/src/pages/privacidade-defaults";
import { notFoundDefaults } from "../../../../client/src/pages/not-found-defaults";

const LOCALES: Array<"en" | "es"> = ["en", "es"];

// Map route slug → Payload global slug + defaults file
const PAGE_MAP = [
  { route: "/",                        globalSlug: "home-content",           defaults: homeDefaults },
  { route: "/culinaria",               globalSlug: "culinaria-content",      defaults: culinariaDefaults },
  { route: "/pesca",                   globalSlug: "pesca-content",          defaults: pescaDefaults },
  { route: "/acomodacoes",             globalSlug: "acomodacoes-content",    defaults: acomodacoesDefaults },
  { route: "/ecoturismo",              globalSlug: "ecoturismo-content",     defaults: ecoturismoDefaults },
  { route: "/observacao-de-aves",      globalSlug: "birdwatching-content",   defaults: birdwatchingDefaults },
  { route: "/nosso-impacto",           globalSlug: "nosso-impacto-content",  defaults: nossoImpactoDefaults },
  { route: "/contato",                 globalSlug: "contato-content",        defaults: contatoDefaults },
  { route: "/politica-de-privacidade", globalSlug: "privacidade-content",    defaults: privacidadeDefaults },
  { route: "/404",                     globalSlug: "not-found-content",      defaults: notFoundDefaults },
] as const;

async function run() {
  await payload.init({ config, local: true });

  for (const { globalSlug, defaults } of PAGE_MAP) {
    for (const locale of LOCALES) {
      const data = defaults[locale];
      if (!data) continue;
      // Transform frontend shape → Payload shape (string[] → {text: string}[])
      const payloadData = transformToPayloadShape(globalSlug, data);
      await payload.updateGlobal({ slug: globalSlug, data: payloadData, locale });
      console.log(`  ✓ ${globalSlug} [${locale}]`);
    }
  }

  // Migrate commonNameEN → commonName in locale "en" for all bird species
  const birds = await payload.find({ collection: "bird-species", limit: 200, locale: "pt" });
  for (const bird of birds.docs) {
    if (bird.commonNameEN) {
      await payload.update({
        collection: "bird-species",
        id: bird.id,
        data: { commonName: bird.commonNameEN },
        locale: "en",
      });
    }
  }

  console.log("✅ Multilingual seed complete");
  process.exit(0);
}

run().catch((err) => { console.error(err); process.exit(1); });
```

Note: `transformToPayloadShape()` is the same transformation logic that `buildGlobalData()` in `importSeed.ts` uses — wraps `string[]` bodies into `{text: string}[]`. Reuse/import it.

**Step 2: Add npm script to payload-cms/package.json**

```json
"seed:multilingual": "tsx src/scripts/seedMultilingual.ts"
```

**Step 3: Run the script**

```bash
npm --prefix payload-cms run seed:multilingual
```

Verify in admin: open CulinariaContent, switch to EN, check that hero heading shows "Authentic Pantanal Cuisine" (or whatever the EN default says).

**Step 4: Commit**

```bash
git add payload-cms/src/scripts/seedMultilingual.ts payload-cms/package.json
git commit -m "feat(cms): seed EN/ES translations from frontend defaults"
```

---

## Task 7: Update server to pass locale to Payload REST

**Files:**
- Modify: `server/cms-content.ts`
- Modify: `server/routes.ts`

**Step 1: Update `getCmsContent()` signature in `cms-content.ts`**

Change the function to accept an optional `locale` parameter:

```typescript
export async function getCmsContent(locale: "pt" | "en" | "es" = "pt"): Promise<{ source: string; content: CmsContent }> {
```

Update the cache key to include locale:

```typescript
const cacheKey = `cms-content-${locale}`;
```

**Step 2: Update `loadFromPayloadRest()` to pass locale**

All `fetch()` calls to Payload REST need `?locale=${locale}` appended:

```typescript
async function loadFromPayloadRest(locale: "pt" | "en" | "es"): Promise<CmsContent | null> {
  const localeParam = `locale=${locale}`;
  // Change all fetch URLs:
  const [cats, posts, birdCats, birds, settings, ...globals] = await Promise.all([
    fetch(`${base}/api/blog-categories?limit=200&${localeParam}`, opts),
    fetch(`${base}/api/blog-posts?limit=200&depth=1&${localeParam}`, opts),
    fetch(`${base}/api/bird-categories?limit=200&${localeParam}`, opts),
    fetch(`${base}/api/bird-species?limit=200&depth=1&${localeParam}`, opts),
    fetch(`${base}/api/globals/site-settings?depth=1&${localeParam}`, opts),
    // ...all globals:
    fetch(`${base}/api/globals/home-content?depth=0&${localeParam}`, opts),
    // etc.
  ]);
```

**Step 3: Update `server/routes.ts` — accept locale param**

All CMS API routes should read locale from query param or `Accept-Language` header:

```typescript
function getLocale(req: Request): "pt" | "en" | "es" {
  const q = req.query.locale as string;
  if (q === "en" || q === "es" || q === "pt") return q;
  const header = req.headers["accept-language"] || "";
  if (header.startsWith("en")) return "en";
  if (header.startsWith("es")) return "es";
  return "pt";
}

// In each route:
router.get("/api/cms/page/:slug", async (req, res) => {
  const locale = getLocale(req);
  const { content } = await getCmsContent(locale);
  // ...
});
```

**Step 4: Commit**

```bash
git add server/cms-content.ts server/routes.ts
git commit -m "feat(server): pass locale to Payload REST API"
```

---

## Task 8: Update client to pass locale in CMS requests

**Files:**
- Modify: `client/src/lib/cms/page-content.ts`

**Step 1: Remove the `lang !== "pt"` bypass**

Change `fetchPageContent()` to include locale in the request:

```typescript
async function fetchPageContent<K extends keyof PageContentMap>(
  slug: K,
  locale: Lang,
): Promise<PageContentMap[K] | null> {
  const apiSlug = slug === "/" ? "home" : (slug as string).replace(/^\//, "");
  try {
    const res = await fetch(`/api/cms/page/${apiSlug}?locale=${locale}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.content as PageContentMap[K];
  } catch {
    return null;
  }
}
```

**Step 2: Update `usePageCms()` hook**

Remove the early return for `lang !== "pt"`. Use `lang` in the cache key and fetch call:

```typescript
export function usePageCms<K extends keyof PageContentMap>(
  slug: K,
  defaults: LocalizedDefaults<K>,
): PageContentMap[K] {
  const { lang } = useLanguage();
  const localDefault = defaults[lang] ?? defaults.pt;
  const [content, setContent] = useState<PageContentMap[K]>(localDefault);

  useEffect(() => {
    if (import.meta.env.MODE === "test") return;

    // Fetch from CMS for all locales (PT, EN, ES) — no more early return
    const cacheKey = `${String(slug)}__${lang}`;
    if (pageCache.has(cacheKey)) {
      setContent(pageCache.get(cacheKey) as PageContentMap[K]);
      return;
    }
    // ...same deduplication logic, but with lang in cacheKey and fetch
    void fetchPageContent(slug, lang).then((cms) => {
      const value = cms ?? (defaults[lang] ?? defaults.pt);
      pageCache.set(cacheKey, value);
      pagePromises.delete(cacheKey);
      setContent(value);
    });
  }, [slug, lang]);

  return content;
}
```

**Step 3: Run tests**

```bash
npm test
```

Fix any test failures (tests that were using the PT-only behavior).

**Step 4: Commit**

```bash
git add client/src/lib/cms/page-content.ts
git commit -m "feat(client): usePageCms fetches CMS for all locales"
```

---

## Task 9: Update AgentConfig consumption in the server

**Files:**
- Modify: `shared/agent-config-payload.ts`

**Step 1: Read current file**

Read `shared/agent-config-payload.ts` to understand the current mapping from `{ pt, en, es }` groups to the app's `AgentConfig` type.

**Step 2: Update to read native localized fields**

Since `AgentConfig` now stores each disclaimer as a single localized string (instead of `{ pt: string, en: string, es: string }`), the mapping function needs to accept the Payload response for a given locale and return the single string value.

The server should call `GET /api/globals/agent-config?locale=pt` (or en/es) and each localized field returns the value for that locale directly.

Update `getCmsAgentConfig()` in `server/cms-content.ts` to accept locale and pass `?locale=${locale}` to the agent-config endpoint.

**Step 3: Commit**

```bash
git add shared/agent-config-payload.ts server/cms-content.ts
git commit -m "feat(cms): update AgentConfig to use native localized fields"
```

---

## Task 10: Build Payload CMS production build + rebuild frontend + deploy

**Step 1: Build Payload for production**

```bash
npm --prefix payload-cms run build
```

This will take 5-10 minutes (Next.js build with Payload). Wait for completion.

**Step 2: Run full Vite + esbuild + deploy pipeline**

```bash
npx vite build
```

Then esbuild server handler:
```bash
npx esbuild server/vercel-handler.ts --platform=node --bundle --format=cjs --outfile=.vercel/output/functions/api/index.func/index.js "--alias:@shared=./shared" --target=node20
```

Then copy files and deploy:
```bash
node -e "/* copy script as before */"
vercel deploy --prebuilt --prod
```

**Step 3: Verify on production**

1. Open `https://itaicypantanal.com.br` in PT — content loads from CMS
2. Switch to EN — content loads from CMS (no more frontend defaults bypass)
3. Switch to ES — content loads from CMS
4. Check `/culinaria`, `/pesca`, `/acomodacoes` — all three languages work
5. Test AI agent in EN and ES — disclaimers show in correct language

**Step 4: Final commit**

```bash
git add .
git commit -m "feat: Payload CMS fully multilingual PT/EN/ES — frontend consumes CMS for all languages"
```

---

## Notes

- **Fallback behavior**: Payload `fallback: true` means if EN/ES translation is missing, it falls back to PT. So the site never shows blank content.
- **`*-defaults.ts` files**: Keep them as emergency fallback in `usePageCms()`. If the CMS API fails (network error), the local defaults kick in.
- **`commonNameEN` field**: Keep in BirdSpecies for now (backwards compatibility). After seed, data exists in `commonName` locale `en`. The field can be removed in a future cleanup.
- **Blog posts EN/ES**: Blog posts are PT-only. The EN/ES locales will fall back to PT via `fallback: true`. Full blog translation can be done via the admin UI later.
- **SiteSettings shared content**: CTA sections, FAQ, testimonials, footer all need EN/ES seeds. These come from the `home-defaults.ts` and component-level defaults.
