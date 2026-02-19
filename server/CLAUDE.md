# server/ — Express API Server

## Overview

Express server that serves the React SPA, proxies CMS content, hosts the AI chat agent, and provides an admin panel. Runs on port 5000 (dev) or as a Vercel serverless function (prod).

## Key Files

| File | Purpose |
|------|---------|
| `index.ts` | Entry point (local dev/prod). Creates Express app, registers routes, starts Vite HMR or static serving |
| `routes.ts` | All route registration. CMS endpoints, sitemap, robots.txt, chat, agent admin, panel routes |
| `cms-content.ts` | **Core CMS data layer**. Payload-first with seed fallback, per-locale caching |
| `cms-seed.ts` | Loads `docs/payload-seed/full-seed.json` + `page-content.json`. Module-level cache |
| `vercel-handler.ts` | Vercel serverless entry. Lazy init, SPA catch-all with meta tag injection |
| `vite.ts` | Vite dev server middleware integration |
| `storage.ts` | In-memory storage placeholder (not actively used) |

## CMS Content Layer (`cms-content.ts`)

### Architecture
- **Cache**: `Map<string, CachedEntry>` keyed by locale. 30-second TTL (`CACHE_TTL_MS`)
- **Strategy**: If `PAYLOAD_CMS_BASE_URL` env var is set → fetch Payload REST API (4s timeout). On failure → silent fallback to seed JSON
- **Locales**: `pt` (default), `en`, `es`. Normalized via `normalizeLocale()`

### Key Functions
- `getCmsContent(rawLocale?)` — Main export. Returns `{content, source, timestamp}`
- `getCmsAgentConfig()` — Agent config global (separate cache)
- `clearCmsContentCache()` — Clears all locale caches (testing/forced refresh)
- `loadFromPayloadRest(baseUrl, locale)` — Parallel fetch of all collections + globals
- `buildFromPayloadData()` — Normalizes Payload responses to `CmsContent` shape
- `transformGlobalToPageContent(route, raw)` — Per-route unwrapping of Payload globals

### Data Transformations
Payload stores `string[]` as `{text: string}[]` (array field constraint):
- `unwrapTextArray(arr)` — `[{text:"a"}]` → `["a"]` (Payload → frontend)
- Inverse in `importSeed.ts`: `wrapStrings(arr)` — `["a"]` → `[{text:"a"}]`

### Page Global Mapping
```
PAGE_GLOBAL_SLUGS:
  home-content        → /
  acomodacoes-content → /acomodacoes
  culinaria-content   → /culinaria
  pesca-content       → /pesca
  ecoturismo-content  → /ecoturismo
  birdwatching-content → /observacao-de-aves
  contato-content     → /contato
  nosso-impacto-content → /nosso-impacto
  privacidade-content → /politica-de-privacidade
  not-found-content   → /404
```

## Route Endpoints

### CMS Routes (all accept `?locale=pt|en|es`)
- `GET /api/cms/health` — CMS source check
- `GET /api/cms/source` — Current data source info
- `GET /api/cms/shared` — Shared sections (footer, FAQ, CTA, testimonials)
- `GET /api/cms/page/:slug` — Per-page content
- `GET /api/cms/blog` — All blog posts + categories
- `GET /api/cms/blog/article/:slug` — Single article detail
- `GET /api/cms/birdwatching` — Bird catalog
- `GET /api/cms/birdwatching/species/:slug` — Species detail
- `GET /api/cms/agent-config` — Agent operational config

### SEO Routes
- `GET /sitemap.xml` — Dynamic sitemap
- `GET /robots.txt` — Robots directives
- `GET /llms.txt` — LLM crawler info

### Agent Routes
- `POST /api/chat` — AI chat (SSE streaming)
- `POST /api/agent/reindex/faqs` — Trigger FAQ vector reindex
- `GET /api/agent/metrics` — Agent metrics dashboard
- `GET /api/agent/cloudbeds/status` — Cloudbeds OAuth status
- `GET /api/agent/cloudbeds/oauth/start` — Start OAuth flow
- `GET /api/agent/cloudbeds/oauth/callback` — OAuth callback

### Admin Panel (`/api/panel/`)
- `POST /api/panel/auth/login` — JWT login
- `GET /api/panel/auth/me` — Current user
- `GET /api/panel/dashboard` — Dashboard data
- `GET|POST|PATCH|DELETE /api/panel/admin/users` — User management

## AI Agent System (`agent/`)

### Chat Pipeline (`chat-route.ts`)
1. Validate payload (20KB limit, Zod schema)
2. Extract context: locale, intent, visitor profile, conversation stage, date/occupancy slots
3. Rate limit check (sliding window, DB or in-memory)
4. Build system prompt with all context sections
5. **Fast paths** (no LLM call):
   - `negotiation` or `grupo` profile → immediate escalation text
   - `availability`/`rates` with dates → direct tool `.execute()` call
   - `availability`/`rates` without dates → ask for check-in date
6. **General path**: `ToolLoopAgent` (Vercel AI SDK) with 4 tools, max 6 steps
7. Stream SSE events: `token`, `tool_start`, `tool_end`, `done`, `error`
8. Log to `agent_logs` table

### Agent Tools
| Tool | File | What it does |
|------|------|-------------|
| `searchFAQ` | `search-faq.ts` | pgvector cosine similarity + keyword fallback. Sources: DB → CMS → config |
| `checkAvailability` | `check-availability.ts` | Cloudbeds API. Auto-searches ±1/±2 day shifts on no results |
| `getRates` | `get-rates.ts` | Cloudbeds rate plans |
| `getReservation` | `get-reservation.ts` | Lookup by ID + email (LGPD-safe) |

### Intent Detection (`conversation-profile.ts`)
10 intents in priority order: `negotiation` → `birdwatching` → `day_use` → `package_inquiry` → `fishing` → `availability` → `rates` → `policy` → `reservation_help` → `general`

5 visitor profiles: `pescador`, `birdwatcher`, `familia`, `casal`, `grupo`, `unknown`

### Model Selection (`config.ts`)
- `getAgentModel(intent)`: Selects provider based on `AGENT_PROVIDER` env, model prefix, or available API keys
- Default models: OpenAI `gpt-5-mini`, Anthropic `claude-3-5-sonnet-latest`
- "Lite" model for `general`/`policy` intents (lower cost)

### System Prompt (`instructions.ts`)
Multi-section prompt composed from:
- `V2_SYSTEM_CORE` — Identity, UX rules, strategic objectives
- `PACKAGES_2025` — All-inclusive package descriptions with prices
- Language style section (PT/EN/ES tone rules)
- Intent-specific directives
- Visitor profile discourse
- CMS-editable operational data (from `agent-config` global)
- Slot awareness (prevents re-asking dates/occupancy)
- 6 locked guardrails (never invent values, never negotiate, etc.)

## Vercel Handler (`vercel-handler.ts`)

- Default export: `handler(req, res)` for Vercel Node.js launcher
- Lazy init pattern (`ensureInit()` runs once)
- `findIndexHtml()`: Looks for `_index.html` (bundled) then `dist/public/index.html`
- SPA catch-all injects per-route meta tags via `injectRouteMeta()` for SEO/AI crawlers
- `canonicalHostRedirectMiddleware` at top level

### Build Rules
- **esbuild must NOT use `--packages=external`** — all deps bundled inline
- Function dir needs `{"type":"commonjs"}` package.json
- `.vc-config.json`: `"handler": "index.js"` (NOT `"index.handler"`)
