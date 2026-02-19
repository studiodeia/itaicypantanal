# shared/ — Type Contracts & Database Schema

## Overview

Shared TypeScript types, Drizzle ORM schema, and CMS contracts used by both `client/` and `server/`. Path alias: `@shared/*` → `shared/*`.

## Key Files

| File | Purpose |
|------|---------|
| `schema.ts` | Drizzle ORM table definitions + pgvector support |
| `cms-page-content.ts` | Per-page CMS content types (`PageContentMap`) |
| `cms-shared-content.ts` | Shared CMS sections type + PT defaults (`SharedCmsSections`, `defaultSharedCmsSections`) |
| `agent-config.ts` | Agent configuration type + defaults (`AgentConfig`, `defaultAgentConfig`) |
| `agent-config-payload.ts` | Payload global → `AgentConfig` mapper |
| `chat-types.ts` | Chat request/response schemas (Zod), SSE event types |

## Database Schema (`schema.ts`)

PostgreSQL via Drizzle ORM + Neon serverless. Tables:

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `users` | Auth users | id (uuid PK), username (unique), password |
| `faqs` | FAQ knowledge base | question, answer, category, lang, embedding (vector 1536), sourceDocId. Indexed: category, lang, unique(sourceDocId,lang) |
| `leads` | Lead capture | name, email, phone, consentLgpd, sourceIntent, context (jsonb) |
| `handoffs` | Agent escalations | sessionId, intent, urgency, contextSummary, channel, status |
| `agentLogs` | Chat analytics | sessionId, intent, toolUsed, promptVersionHash, latencyMs, confidenceScore, groundingLevel, sourceRefs (jsonb), tokensIn/Out |
| `rateLimits` | Rate limiting | sessionId, ipHash, actionType, count, windowStart |
| `panelUsers` | Admin panel users | username (unique), passwordHash, role (user/manager/admin), enabled |

pgvector: Uses `customType` for `vector(1536)` columns (OpenAI embeddings dimension).

## CMS Page Content Types (`cms-page-content.ts`)

### Reusable Primitives
`CmsFeature`, `CmsHighlight`, `CmsExpeditionCard`, `CmsStatItem`, `CmsImpactItem`, `CmsRoomType`, `CmsServiceCard`, `CmsContactChannel`, `CmsCycleStep`, `CmsPracticeCard`, `CmsPrivacySection`, `CmsFaqItem`, `CmsHero`, `CmsManifesto`, `CmsSobreNos`, `CmsHighlights`, `CmsServices`

### Page Types
`HomePageContent`, `AcomodacoesPageContent`, `CulinariaPageContent`, `PescaPageContent`, `EcoturismoPageContent`, `BirdwatchingPageContent`, `ContatoPageContent`, `NossoImpactoPageContent`, `PrivacidadePageContent`, `NotFoundPageContent`, `RegiaoPageContent`

### `PageContentMap`
Discriminated union mapping route slug → content type. Used by `usePageCms<K>()` hook for type-safe per-page CMS data.

## Shared CMS Sections (`cms-shared-content.ts`)

`SharedCmsSections` includes:
- `immersionCta` — Call-to-action section
- `faq` — FAQ items
- `testimonials` — Guest testimonials
- `footer` — Navigation links, contact info, newsletter, copyright
- `homeHero` — Home page hero content
- `homeManifesto` — Home page manifesto

`defaultSharedCmsSections` provides complete PT defaults (hardcoded fallback).

## Agent Config (`agent-config.ts`)

`AgentConfig` shape:
- `enabled`, `assistantName`, `bookingEngineUrl`
- `disclaimers` — price, availability, policy disclaimers (localized)
- `handoff` — escalation contacts and messages
- `fallback` — error messages
- `lead` — consent prompts and success messages
- `welcome` — greeting message
- `retrieval` — FAQ confidence threshold

`AgentLocale` = `"pt" | "en" | "es"`, `LocalizedCopy` = `{pt, en, es}`

## Chat Types (`chat-types.ts`)

- `chatRequestSchema` (Zod): message (1-4000 chars), messages[] (max 20), session_id (uuid), lang
- SSE events: `token`, `tool_start`, `tool_end`, `done`, `error`
- `ChatSseEvent` — discriminated union on `event` field
- `GroundingLevel` = `"full" | "partial" | "none"`
- `SourceRef` — `{source_id, source_type, title?, score?}`

## Adding a New Page Type

1. Define the type (e.g., `NewPageContent`) in `cms-page-content.ts`
2. Add entry to `PageContentMap`: `"new-page": NewPageContent`
3. Create the Payload global in `payload-cms/src/globals/`
4. Add route mapping in `server/cms-content.ts` (`PAGE_GLOBAL_SLUGS`)
5. Create defaults and use `usePageCms<"new-page">(slug, defaults)` in client
