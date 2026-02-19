# CLAUDE.md — Itaicy Pantanal Eco Lodge

## Quick Reference

```bash
# Development
npm run dev              # Express + Vite HMR (port 5000)
npm run cms:payload:dev  # Payload CMS admin (port 3001, separate terminal)

# Build & Deploy
npm run build            # Vite client + esbuild server → dist/
npm run check            # TypeScript type checking
npm test                 # Vitest (93+ tests)
npm run test:watch       # Watch mode
bash scripts/vercel-build.sh  # Full Vercel Build Output API v3
vercel deploy --prebuilt --prod  # Deploy after build

# CMS Operations
npm run cms:payload:seed         # Import full-seed.json → Payload
npm run cms:seed:check           # Audit seed data (dry run)
npm run cms:seed:write           # Export content → seed JSON
npm run figma:assets <manifest>  # Download + optimize Figma images
```

## Architecture Overview

Fullstack TypeScript monorepo with four main directories:

```
itaicypantanal/
├── client/          → React 18 SPA (Vite + Tailwind 3 + shadcn/ui)
├── server/          → Express API (CMS proxy, AI agent, admin panel)
├── shared/          → Types, Drizzle schema, CMS contracts (shared client↔server)
├── payload-cms/     → Payload CMS v3 (Next.js 15, separate process on :3001)
├── scripts/         → Build scripts, image pipeline, bird enrichment
├── docs/            → Seed data (payload-seed/), architecture docs
└── .interface-design/ → Design system tokens + Tailwind plugin
```

### Per-Directory Documentation

Each major directory has its own CLAUDE.md with detailed guidance:

- [**`server/CLAUDE.md`**](server/CLAUDE.md) — Express routes, CMS data layer, AI agent, admin panel
- [**`payload-cms/CLAUDE.md`**](payload-cms/CLAUDE.md) — Collections, globals, localization, seed scripts
- [**`client/src/CLAUDE.md`**](client/src/CLAUDE.md) — Pages, components, CMS hooks, i18n, animations
- [**`scripts/CLAUDE.md`**](scripts/CLAUDE.md) — Build pipeline, image optimization, bird enrichment
- [**`shared/CLAUDE.md`**](shared/CLAUDE.md) — Type contracts, Drizzle schema, agent config

## CMS Data Flow

```
Payload CMS (:3001)  ←→  Payload REST API
        ↓ (4s timeout, 30s per-locale cache)
Express server (:5000)
  → /api/cms/shared?locale=pt|en|es     → SharedCmsSections
  → /api/cms/page/:slug?locale=         → PageContentMap[slug]
  → /api/cms/blog?locale=               → BlogCmsData
  → /api/cms/birdwatching?locale=       → BirdCmsData
        ↓ (on Payload failure → seed fallback)
  docs/payload-seed/full-seed.json + page-content.json
        ↓
React hooks (module-level cache + locale awareness)
  → useSharedCmsSections()    → SharedCmsSections
  → usePageCms<K>(slug)       → PageContentMap[K]
  → useBlogCmsData()          → BlogCmsData
  → useBirdCmsData()          → BirdCmsData
```

**Payload-first, seed-fallback**: If `PAYLOAD_CMS_BASE_URL` is set, server fetches from Payload REST API with `?locale=` param. On failure (timeout/error), silently falls back to seed JSON files. Client hooks always have hardcoded defaults as initial state.

### String Array Convention

Payload requires arrays of objects, not plain string arrays. Symmetric transformations:
- **Seed → Payload** (`importSeed.ts`): `wrapStrings(["a","b"])` → `[{text:"a"},{text:"b"}]`
- **Payload → Frontend** (`cms-content.ts`): `unwrapTextArray([{text:"a"}])` → `["a"]`

## Multilingual System (PT/EN/ES)

Three locales supported end-to-end:

| Layer | How it works |
|-------|-------------|
| **Payload CMS** | `localized: true` on fields, `?locale=` REST param, fallback to PT |
| **Express server** | `getLocale(req)` extracts `?locale=` from query, passes to `getCmsContent()` |
| **Server cache** | `Map<string, CachedEntry>` keyed by locale, 30s TTL |
| **Client hooks** | `useLanguage()` → `LOCALE_MAP[lang]` → fetch with `?locale=` |
| **Client defaults** | `shared-defaults.ts` has full EN/ES translations; PT from `defaultSharedCmsSections` |
| **UI strings** | `i18n/ui-strings.ts` — nav, mega-menu, static UI text |
| **localStorage** | Key `itaicy_lang`, `document.documentElement.lang` synced |

## Design System

**Read `.interface-design/system.md` before making UI changes.**

- Tokens: `pantanal-*` namespace in `tailwind.config.ts` — **never use raw hex**
- Typography: Playfair Display (headings), Lato (body), weight **400**
- Section padding: `px-5 md:px-8 lg:px-16` | Container: `max-w-[1440px] mx-auto`
- Components: `client/src/components/pantanal/` — all support `theme="dark"|"light"`
- Utilities plugin: `.interface-design/utilities.js`
- Interactions: buttons use `hover:-translate-y-0.5`, gold focus ring, `.link-hover` utility
- Animations: Framer Motion variants in `client/src/lib/motion.ts`, `MotionProvider` wraps app

### Figma Workflow

1. Get `downloadUrls` from Figma MCP `get_design_context`
2. Save to manifest JSON file
3. Run `npm run figma:assets <manifest>` (streams, converts to WebP+AVIF, max 1920px)
4. Use `<OptimizedImage src="/images/name" />` (no extension — auto `.avif`/`.webp`)

## AI Agent System

Full conversational AI with tool-calling, SSE streaming, and Cloudbeds PMS integration.

- **Entry**: `POST /api/chat` → `server/agent/chat-route.ts`
- **Intent routing**: 10 intents (negotiation, birdwatching, fishing, availability, rates, etc.)
- **Fast paths**: Availability/rates with dates → direct tool call (no LLM). Negotiation → immediate escalation
- **Tools**: `searchFAQ` (pgvector + keyword), `checkAvailability`, `getRates`, `getReservation`
- **Streaming**: SSE events (token, tool_start, tool_end, done, error)
- **Models**: OpenAI GPT-5-mini / Anthropic Claude 3.5 Sonnet (configurable per intent)
- **Admin panel**: JWT auth, `/api/panel/` routes, role-based access

## Vercel Deployment

### Frontend (Express + React SPA)

Build Output API v3 via `scripts/vercel-build.sh`:

- Handler: `server/vercel-handler.ts` (NOT in `api/` — avoids Vercel auto-detection)
- **esbuild must NOT use `--packages=external`** — all deps bundled inline
- Static → `.vercel/output/static/` | Function → `.vercel/output/functions/api/index.func/`
- `.vc-config.json`: `"handler": "index.js"` (filename, NOT `"index.handler"`)
- `{"type":"commonjs"}` in function dir (overrides root `"type":"module"`)
- Seed data + `_index.html` copied into function dir for runtime
- SPA catch-all injects per-route meta tags for AI crawlers

### CMS (Payload CMS)

Deploy from `payload-cms/` dir: `vercel --prod`
- Live at `https://cms-itaicypantanal.vercel.app`
- DB: Supabase Postgres via **Supavisor pooler** (`aws-1-sa-east-1.pooler.supabase.com:5432`, session mode) — required for Vercel IPv4 connectivity
- **Schema migrations**: `push: true` fails on Vercel — run `npx tsx src/scripts/migrate.ts` locally first
- Set `FRONTEND_ORIGIN` so admin preview links work

## Path Aliases

```
@/*      → client/src/*
@shared/* → shared/*
@assets   → attached_assets/
```

## Routes

| Route | Page | Content Source |
|-------|------|--------------|
| `/` | Home | `home-content` global |
| `/acomodacoes` | Accommodations | `acomodacoes-content` global |
| `/culinaria` | Culinary | `culinaria-content` global |
| `/pesca` | Fishing | `pesca-content` global |
| `/observacao-de-aves` | Birdwatching | `birdwatching-content` global |
| `/observacao-de-aves/catalogo` | Bird Catalog | `bird-species` + `bird-categories` collections |
| `/observacao-de-aves/catalogo/:slug` | Species Detail | `bird-species` collection |
| `/ecoturismo` | Ecotourism | `ecoturismo-content` global |
| `/blog` | Blog Listing | `blog-posts` + `blog-categories` collections |
| `/blog/:categorySlug/:slug` | Blog Article | `blog-posts` collection |
| `/contato` | Contact | `contato-content` global |
| `/nosso-impacto` | Impact | `nosso-impacto-content` global |
| `/politica-de-privacidade` | Privacy | `privacidade-content` global |
| `*` (catch-all) | 404 | `not-found-content` global |

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Production | PostgreSQL (Neon) connection string |
| `PAYLOAD_CMS_BASE_URL` | Optional | Payload REST API base (e.g., `http://localhost:3001`) |
| `PAYLOAD_OWNER_EMAIL/PASSWORD/NAME` | CMS init | Bootstrap admin user |
| `OPENAI_API_KEY` | Agent | GPT models for chat + embeddings |
| `ANTHROPIC_API_KEY` | Agent | Claude models for chat |
| `CLOUDBEDS_*` | Agent | OAuth credentials for PMS integration |
| `AGENT_PROVIDER` | Optional | Force agent LLM provider |
| `PORT` | Optional | Server port (default 5000) |

## Testing

- **Framework**: Vitest 4 + React Testing Library + jsdom
- **Config**: `vitest.config.ts` (separate from `vite.config.ts`)
- **Setup**: `client/src/test/setup.ts` (`@testing-library/jest-dom/vitest`)
- **Pattern**: Co-located `*.test.{ts,tsx}` files next to source
- **Guard**: `typeof IntersectionObserver === "undefined"` for jsdom compatibility

## Gestão de Memória

Raiz: `C:\Users\User\.claude\projects\c--Itaicy\memory\`

```
memory/
  MEMORY.md          ← índice (sempre carregado), leia a cada sessão
  domain/
    project.md       ← localização, stack, comandos, rotas, env vars
    cms.md           ← Payload CMS v3, locales, seed, collections
    frontend.md      ← design system, componentes, i18n
    agent.md         ← AI agent, intents, tools
    birds.md         ← pipeline enriquecimento
  tools/
    vercel.md        ← deploy, gotchas críticos
    testing.md       ← Vitest, jsdom, RTL
```

### Regras
1. Ao descobrir algo valioso → escreva **imediatamente** no arquivo correto
2. Não espere ser solicitado. Não espere o fim da sessão.
3. Entradas curtas: `data · o que aconteceu · por quê importa`
4. Leia `MEMORY.md` no início da sessão; carregue outros arquivos só quando relevantes
5. Se o arquivo não existir ainda, crie-o

### Manutenção
Quando o usuário disser "reorganize memory":
1. Leia todos os arquivos de memória
2. Remova duplicatas e entradas desatualizadas
3. Mescle entradas relacionadas
4. Separe arquivos que cobrem muitos tópicos
5. Reordene entradas por data dentro de cada arquivo
6. Atualize o índice `MEMORY.md`
7. Mostre resumo do que mudou

## Known Issues

- Home sections use raw hex/CSS vars instead of `pantanal-*` tokens (tech debt)
- `CLOUDBEDS_PROPERTY_ID` is placeholder — needs real ID from client
- Bird enrichment pipeline step 05 (LLM editorial) pending `ANTHROPIC_API_KEY`
