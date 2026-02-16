# CMS Admin-Friendly Page Globals — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the unusable JSON blob (`SiteSettings.pageContent`) with 10 Payload globals — one per page — giving non-technical admins editable, labeled fields in Portuguese for every section of every page.

**Architecture:** Create reusable Payload field-builder functions (hero, manifesto, highlights, sobreNos, services) that mirror the TypeScript types in `shared/cms-page-content.ts`. Each page gets its own Payload global with tabs per section. The seed import populates these globals from `page-content.json`. The Express server reads from them via Payload REST API.

**Tech Stack:** Payload CMS 3, TypeScript, Express, Next.js (Payload admin)

---

## Current State & Problems

1. **`SiteSettings.pageContent`** is a JSON blob field — currently `null`, unusable for admins
2. **`Pages` collection** has `sections: []` — empty, never populated
3. **Home Hero/Manifesto** exist in SiteSettings but segments have empty `content` (import bug)
4. **No editable fields** for any page beyond Home Hero/Manifesto/FAQ/Testimonials/Footer

## Target State

- 10 Payload globals in admin sidebar under **"Páginas"** group
- Each global has labeled tabs in Portuguese, one per section
- Field names match TypeScript types exactly (no transformation needed)
- `importSeed.ts` populates all globals from `page-content.json`
- Express server fetches individual globals from Payload REST
- Frontend unchanged (`usePageCms` + defaults work as-is)

## Mapping: Route → Global Slug → TypeScript Type

| Route | Global Slug | TypeScript Type |
|-------|-------------|-----------------|
| `/` | `home-content` | `HomePageContent` |
| `/acomodacoes` | `acomodacoes-content` | `AcomodacoesPageContent` |
| `/culinaria` | `culinaria-content` | `CulinariaPageContent` |
| `/pesca` | `pesca-content` | `PescaPageContent` |
| `/ecoturismo` | `ecoturismo-content` | `EcoturismoPageContent` |
| `/observacao-de-aves` | `birdwatching-content` | `BirdwatchingPageContent` |
| `/contato` | `contato-content` | `ContatoPageContent` |
| `/nosso-impacto` | `nosso-impacto-content` | `NossoImpactoPageContent` |
| `/politica-de-privacidade` | `privacidade-content` | `PrivacidadePageContent` |
| `/404` | `not-found-content` | `NotFoundPageContent` |

---

## Task 1: Create Reusable Field Builders

**Files:**
- Create: `payload-cms/src/fields/heroFields.ts`
- Create: `payload-cms/src/fields/manifestoFields.ts`
- Create: `payload-cms/src/fields/highlightsFields.ts`
- Create: `payload-cms/src/fields/sobreNosFields.ts`
- Create: `payload-cms/src/fields/servicesFields.ts`

These functions return Payload `Field[]` arrays matching the TypeScript types from `shared/cms-page-content.ts`.

**Step 1: Create `payload-cms/src/fields/heroFields.ts`**

Matches `CmsHero` type. Used by: acomodacoes, culinaria, pesca, eco, bird, contato, nosso-impacto, not-found.

```typescript
import type { Field } from "payload";

export function heroFields(options?: { hasVideo?: boolean }): Field[] {
  const base: Field[] = [
    { name: "label", type: "text", label: "Rótulo (ex: PESCA ESPORTIVA)", admin: { width: "50%" } },
    { name: "heading", type: "text", label: "Título Principal", required: true },
    { name: "subtitle", type: "textarea", label: "Subtítulo" },
    { name: "description", type: "textarea", label: "Descrição" },
    { name: "scrollHint", type: "text", label: "Texto de Scroll", defaultValue: "Deslize para baixo", admin: { width: "50%" } },
    { name: "backgroundImage", type: "text", label: "Imagem de Fundo (path)", admin: { description: "Ex: /images/pesca-hero-bg.webp" } },
  ];

  if (options?.hasVideo) {
    base.push(
      { name: "videoMp4", type: "text", label: "Video MP4 (path)" },
      { name: "videoWebm", type: "text", label: "Video WebM (path)" },
      { name: "videoMp4Low", type: "text", label: "Video MP4 Low (path)" },
      { name: "videoWebmLow", type: "text", label: "Video WebM Low (path)" },
      { name: "videoPoster", type: "text", label: "Video Poster (path)" },
    );
  }

  return base;
}
```

**Step 2: Create `payload-cms/src/fields/manifestoFields.ts`**

Matches `CmsManifesto` type. Used by: acomodacoes, culinaria, pesca, eco, bird, nosso-impacto.

```typescript
import type { Field } from "payload";

export function manifestoFields(): Field[] {
  return [
    {
      name: "segments",
      type: "array",
      label: "Segmentos do Manifesto",
      labels: { singular: "Segmento", plural: "Segmentos" },
      admin: {
        description: "Cada segmento é um trecho de texto. Marque 'Destaque' para texto dourado.",
        initCollapsed: false,
      },
      fields: [
        { name: "text", type: "text", label: "Texto", required: true },
        { name: "isHighlight", type: "checkbox", label: "Destaque (texto dourado)", defaultValue: false },
      ],
    },
  ];
}
```

**Step 3: Create `payload-cms/src/fields/highlightsFields.ts`**

Matches `CmsHighlights` type. Used by: acomodacoes, culinaria, pesca, eco, bird.

```typescript
import type { Field } from "payload";

export function highlightsFields(): Field[] {
  return [
    { name: "heading", type: "text", label: "Título" },
    {
      name: "items",
      type: "array",
      label: "Destaques",
      labels: { singular: "Destaque", plural: "Destaques" },
      fields: [
        { name: "iconName", type: "text", label: "Ícone (nome lucide-react)", admin: { width: "30%", description: "Ex: Fish, Star, Compass" } },
        { name: "title", type: "text", label: "Título", admin: { width: "70%" } },
        { name: "description", type: "textarea", label: "Descrição" },
      ],
    },
  ];
}
```

**Step 4: Create `payload-cms/src/fields/sobreNosFields.ts`**

Matches `CmsSobreNos` type. Used by: pesca, eco, bird, home (aboutUs), culinaria (menu).

```typescript
import type { Field } from "payload";

export function sobreNosFields(): Field[] {
  return [
    { name: "label", type: "text", label: "Rótulo (ex: NOSSA FILOSOFIA)", admin: { width: "50%" } },
    { name: "heading", type: "text", label: "Título" },
    {
      name: "body",
      type: "array",
      label: "Parágrafos",
      labels: { singular: "Parágrafo", plural: "Parágrafos" },
      fields: [
        { name: "text", type: "textarea", label: "Texto", required: true },
      ],
    },
    { name: "image", type: "text", label: "Imagem (path)", admin: { description: "Ex: /images/pesca-about-1" } },
    {
      name: "features",
      type: "array",
      label: "Pilares / Diferenciais",
      labels: { singular: "Pilar", plural: "Pilares" },
      fields: [
        { name: "number", type: "text", label: "Número", admin: { width: "20%" } },
        { name: "title", type: "text", label: "Título", admin: { width: "80%" } },
        { name: "description", type: "textarea", label: "Descrição" },
      ],
    },
  ];
}
```

**Step 5: Create `payload-cms/src/fields/servicesFields.ts`**

Matches `CmsServices` type. Used by: pesca, eco, culinaria.

```typescript
import type { Field } from "payload";

export function servicesFields(): Field[] {
  return [
    { name: "label", type: "text", label: "Rótulo (ex: O SANTUÁRIO)", admin: { width: "50%" } },
    { name: "heading", type: "text", label: "Título" },
    { name: "description", type: "textarea", label: "Descrição" },
    {
      name: "items",
      type: "array",
      label: "Cards de Serviço",
      labels: { singular: "Card", plural: "Cards" },
      fields: [
        { name: "title", type: "text", label: "Título", required: true },
        { name: "description", type: "textarea", label: "Descrição" },
        { name: "image", type: "text", label: "Imagem (path)" },
        { name: "href", type: "text", label: "Link (opcional)" },
      ],
    },
    { name: "buttonText", type: "text", label: "Texto do Botão (opcional)" },
    { name: "buttonHref", type: "text", label: "Link do Botão (opcional)" },
  ];
}
```

**Step 6: Verify TypeScript compiles**

Run: `cd payload-cms && npx tsc --noEmit`
Expected: 0 errors

**Step 7: Commit**

```bash
git add payload-cms/src/fields/
git commit -m "feat(cms): add reusable Payload field builders for page sections"
```

---

## Task 2: Create HomeContent Global

**Files:**
- Create: `payload-cms/src/globals/HomeContent.ts`

Matches `HomePageContent` from `shared/cms-page-content.ts`. Also absorbs Home Hero and Home Manifesto fields that are currently in SiteSettings.

**Step 1: Create the global**

```typescript
import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { sobreNosFields } from "../fields/sobreNosFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const HomeContent: GlobalConfig = {
  slug: "home-content",
  label: "Home",
  admin: {
    group: "Paginas",
    description: "Conteudo editavel da pagina inicial.",
    preview: () => `${frontendOrigin}/`,
  },
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Sobre Nos",
          description: "Secao 'Sobre Nos' com pilares e imagem.",
          fields: [
            {
              name: "aboutUs",
              type: "group",
              label: "Sobre Nos",
              fields: sobreNosFields(),
            },
          ],
        },
        {
          label: "Expedicoes",
          description: "Cards de expedicoes (Pesca, Birdwatching, Ecoturismo).",
          fields: [
            {
              name: "expeditions",
              type: "group",
              label: "Expedicoes",
              fields: [
                { name: "label", type: "text", label: "Rotulo" },
                { name: "heading", type: "text", label: "Titulo" },
                { name: "description", type: "textarea", label: "Descricao" },
                {
                  name: "items",
                  type: "array",
                  label: "Cards de Expedicao",
                  labels: { singular: "Expedicao", plural: "Expedicoes" },
                  fields: [
                    { name: "title", type: "text", label: "Titulo", required: true },
                    { name: "description", type: "textarea", label: "Descricao" },
                    { name: "backgroundImage", type: "text", label: "Imagem de Fundo (path)" },
                    { name: "href", type: "text", label: "Link" },
                  ],
                },
                { name: "buttonText", type: "text", label: "Texto do Botao" },
              ],
            },
          ],
        },
        {
          label: "Estatisticas",
          description: "Contadores animados (hospedes, aves, anos, avaliacao).",
          fields: [
            {
              name: "stats",
              type: "group",
              label: "Estatisticas",
              fields: [
                {
                  name: "items",
                  type: "array",
                  label: "Contadores",
                  labels: { singular: "Contador", plural: "Contadores" },
                  fields: [
                    { name: "target", type: "number", label: "Valor Alvo", required: true },
                    { name: "suffix", type: "text", label: "Sufixo (ex: +, %)", admin: { width: "30%" } },
                    { name: "label", type: "text", label: "Legenda", admin: { width: "70%" } },
                    { name: "hasIcon", type: "checkbox", label: "Tem Icone?", defaultValue: false },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Acomodacoes (CTA)",
          description: "Secao de acomodacoes com imagem de fundo e botoes.",
          fields: [
            {
              name: "accommodation",
              type: "group",
              label: "Acomodacoes",
              fields: [
                { name: "label", type: "text", label: "Rotulo" },
                { name: "heading", type: "text", label: "Titulo" },
                { name: "body", type: "textarea", label: "Texto" },
                { name: "buttonReserve", type: "text", label: "Texto Botao Reservar" },
                { name: "buttonDetails", type: "text", label: "Texto Botao Detalhes" },
                { name: "backgroundImage", type: "text", label: "Imagem de Fundo (path)" },
              ],
            },
          ],
        },
        {
          label: "Nosso Impacto",
          description: "Secao de impacto com pilares e imagem.",
          fields: [
            {
              name: "impact",
              type: "group",
              label: "Impacto",
              fields: [
                { name: "label", type: "text", label: "Rotulo" },
                { name: "heading", type: "text", label: "Titulo" },
                {
                  name: "items",
                  type: "array",
                  label: "Pilares de Impacto",
                  labels: { singular: "Pilar", plural: "Pilares" },
                  fields: [
                    { name: "number", type: "text", label: "Numero", admin: { width: "20%" } },
                    { name: "title", type: "text", label: "Titulo", admin: { width: "80%" } },
                    { name: "description", type: "textarea", label: "Descricao" },
                  ],
                },
                { name: "image", type: "text", label: "Imagem (path)" },
              ],
            },
          ],
        },
        {
          label: "Blog",
          description: "Secao do blog na home.",
          fields: [
            {
              name: "blog",
              type: "group",
              label: "Blog",
              fields: [
                { name: "label", type: "text", label: "Rotulo" },
                { name: "heading", type: "text", label: "Titulo" },
                { name: "description", type: "textarea", label: "Descricao" },
                { name: "buttonText", type: "text", label: "Texto do Botao" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
```

**Step 2: Verify TypeScript**

Run: `cd payload-cms && npx tsc --noEmit`
Expected: 0 errors

**Step 3: Commit**

```bash
git add payload-cms/src/globals/HomeContent.ts
git commit -m "feat(cms): add HomeContent global with structured fields"
```

---

## Task 3: Create AcomodacoesContent + CulinariaContent Globals

**Files:**
- Create: `payload-cms/src/globals/AcomodacoesContent.ts`
- Create: `payload-cms/src/globals/CulinariaContent.ts`

**Step 1: Create `AcomodacoesContent.ts`**

Matches `AcomodacoesPageContent`: hero (video), manifesto, highlights, rooms[], culinary.

```typescript
import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";
import { manifestoFields } from "../fields/manifestoFields";
import { highlightsFields } from "../fields/highlightsFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const AcomodacoesContent: GlobalConfig = {
  slug: "acomodacoes-content",
  label: "Acomodacoes",
  admin: {
    group: "Paginas",
    description: "Conteudo editavel da pagina de acomodacoes.",
    preview: () => `${frontendOrigin}/acomodacoes`,
  },
  access: { read: () => true, update: isAuthenticated },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [{ name: "hero", type: "group", label: "Hero", fields: heroFields({ hasVideo: true }) }],
        },
        {
          label: "Manifesto",
          fields: [{ name: "manifesto", type: "group", label: "Manifesto", fields: manifestoFields() }],
        },
        {
          label: "Destaques",
          fields: [{ name: "highlights", type: "group", label: "Destaques", fields: highlightsFields() }],
        },
        {
          label: "Quartos",
          description: "Tipos de acomodacao (Explorer, Adventure, Family).",
          fields: [
            {
              name: "rooms",
              type: "array",
              label: "Tipos de Quarto",
              labels: { singular: "Quarto", plural: "Quartos" },
              fields: [
                { name: "title", type: "text", label: "Nome do Quarto", required: true },
                { name: "description", type: "textarea", label: "Descricao" },
                { name: "image", type: "text", label: "Imagem (path)" },
                { name: "ctaText", type: "text", label: "Texto do Botao" },
                {
                  name: "features",
                  type: "array",
                  label: "Caracteristicas",
                  labels: { singular: "Item", plural: "Itens" },
                  fields: [
                    { name: "iconName", type: "text", label: "Icone", admin: { width: "30%" } },
                    { name: "label", type: "text", label: "Texto", admin: { width: "70%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Culinaria",
          description: "Cross-sell da culinaria na pagina de acomodacoes.",
          fields: [
            {
              name: "culinary",
              type: "group",
              label: "Culinaria",
              fields: [
                { name: "label", type: "text", label: "Rotulo" },
                { name: "heading", type: "text", label: "Titulo" },
                { name: "description", type: "textarea", label: "Descricao" },
                {
                  name: "images",
                  type: "array",
                  label: "Imagens",
                  labels: { singular: "Imagem", plural: "Imagens" },
                  fields: [
                    { name: "src", type: "text", label: "Caminho", required: true },
                    { name: "alt", type: "text", label: "Alt Text" },
                    { name: "tag", type: "text", label: "Tag (overlay)" },
                  ],
                },
                { name: "ctaText", type: "text", label: "Texto do Botao" },
                { name: "ctaHref", type: "text", label: "Link do Botao" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
```

**Step 2: Create `CulinariaContent.ts`**

Matches `CulinariaPageContent`: hero, manifesto, menu (CmsSobreNos), highlights, services, experience, crossSell.

```typescript
import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";
import { manifestoFields } from "../fields/manifestoFields";
import { highlightsFields } from "../fields/highlightsFields";
import { sobreNosFields } from "../fields/sobreNosFields";
import { servicesFields } from "../fields/servicesFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const CulinariaContent: GlobalConfig = {
  slug: "culinaria-content",
  label: "Culinaria",
  admin: {
    group: "Paginas",
    description: "Conteudo editavel da pagina de culinaria.",
    preview: () => `${frontendOrigin}/culinaria`,
  },
  access: { read: () => true, update: isAuthenticated },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [{ name: "hero", type: "group", label: "Hero", fields: heroFields() }],
        },
        {
          label: "Manifesto",
          fields: [{ name: "manifesto", type: "group", label: "Manifesto", fields: manifestoFields() }],
        },
        {
          label: "Menu",
          description: "Secao do menu com categorias e imagens.",
          fields: [{ name: "menu", type: "group", label: "Menu", fields: sobreNosFields() }],
        },
        {
          label: "Destaques",
          fields: [{ name: "highlights", type: "group", label: "Destaques", fields: highlightsFields() }],
        },
        {
          label: "Servicos",
          fields: [{ name: "services", type: "group", label: "Servicos", fields: servicesFields() }],
        },
        {
          label: "Experiencia",
          fields: [
            {
              name: "experience",
              type: "group",
              label: "Experiencia",
              fields: [
                { name: "heading", type: "text", label: "Titulo" },
                {
                  name: "body",
                  type: "array",
                  label: "Paragrafos",
                  labels: { singular: "Paragrafo", plural: "Paragrafos" },
                  fields: [{ name: "text", type: "textarea", label: "Texto", required: true }],
                },
                { name: "image", type: "text", label: "Imagem de Fundo (path)" },
              ],
            },
          ],
        },
        {
          label: "Cross-Sell",
          description: "CTA para pagina de acomodacoes.",
          fields: [
            {
              name: "crossSell",
              type: "group",
              label: "Cross-Sell",
              fields: [
                { name: "heading", type: "text", label: "Titulo" },
                { name: "description", type: "textarea", label: "Descricao" },
                { name: "buttonText", type: "text", label: "Texto do Botao" },
                { name: "buttonHref", type: "text", label: "Link do Botao" },
                { name: "image", type: "text", label: "Imagem (path)" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
```

**Step 3: Verify TypeScript**

Run: `cd payload-cms && npx tsc --noEmit`
Expected: 0 errors

**Step 4: Commit**

```bash
git add payload-cms/src/globals/AcomodacoesContent.ts payload-cms/src/globals/CulinariaContent.ts
git commit -m "feat(cms): add AcomodacoesContent + CulinariaContent globals"
```

---

## Task 4: Create PescaContent + EcoturismoContent + BirdwatchingContent Globals

**Files:**
- Create: `payload-cms/src/globals/PescaContent.ts`
- Create: `payload-cms/src/globals/EcoturismoContent.ts`
- Create: `payload-cms/src/globals/BirdwatchingContent.ts`

All three share the same pattern: hero, manifesto, sobreNos, highlights (+services for pesca/eco).

**Step 1: Create `PescaContent.ts`**

```typescript
import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";
import { manifestoFields } from "../fields/manifestoFields";
import { highlightsFields } from "../fields/highlightsFields";
import { sobreNosFields } from "../fields/sobreNosFields";
import { servicesFields } from "../fields/servicesFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const PescaContent: GlobalConfig = {
  slug: "pesca-content",
  label: "Pesca Esportiva",
  admin: {
    group: "Paginas",
    description: "Conteudo editavel da pagina de pesca esportiva.",
    preview: () => `${frontendOrigin}/pesca`,
  },
  access: { read: () => true, update: isAuthenticated },
  fields: [
    {
      type: "tabs",
      tabs: [
        { label: "Hero", fields: [{ name: "hero", type: "group", label: "Hero", fields: heroFields() }] },
        { label: "Manifesto", fields: [{ name: "manifesto", type: "group", label: "Manifesto", fields: manifestoFields() }] },
        { label: "Sobre Nos", fields: [{ name: "sobreNos", type: "group", label: "Sobre Nos", fields: sobreNosFields() }] },
        { label: "Destaques", fields: [{ name: "highlights", type: "group", label: "Destaques", fields: highlightsFields() }] },
        { label: "Servicos", fields: [{ name: "services", type: "group", label: "Servicos", fields: servicesFields() }] },
      ],
    },
  ],
};
```

**Step 2: Create `EcoturismoContent.ts`**

Identical structure to Pesca, different slug/label/preview.

```typescript
import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";
import { manifestoFields } from "../fields/manifestoFields";
import { highlightsFields } from "../fields/highlightsFields";
import { sobreNosFields } from "../fields/sobreNosFields";
import { servicesFields } from "../fields/servicesFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const EcoturismoContent: GlobalConfig = {
  slug: "ecoturismo-content",
  label: "Ecoturismo",
  admin: {
    group: "Paginas",
    description: "Conteudo editavel da pagina de ecoturismo.",
    preview: () => `${frontendOrigin}/ecoturismo`,
  },
  access: { read: () => true, update: isAuthenticated },
  fields: [
    {
      type: "tabs",
      tabs: [
        { label: "Hero", fields: [{ name: "hero", type: "group", label: "Hero", fields: heroFields() }] },
        { label: "Manifesto", fields: [{ name: "manifesto", type: "group", label: "Manifesto", fields: manifestoFields() }] },
        { label: "Sobre Nos", fields: [{ name: "sobreNos", type: "group", label: "Sobre Nos", fields: sobreNosFields() }] },
        { label: "Destaques", fields: [{ name: "highlights", type: "group", label: "Destaques", fields: highlightsFields() }] },
        { label: "Servicos", fields: [{ name: "services", type: "group", label: "Servicos", fields: servicesFields() }] },
      ],
    },
  ],
};
```

**Step 3: Create `BirdwatchingContent.ts`**

Same as Pesca but WITHOUT services tab.

```typescript
import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";
import { manifestoFields } from "../fields/manifestoFields";
import { highlightsFields } from "../fields/highlightsFields";
import { sobreNosFields } from "../fields/sobreNosFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const BirdwatchingContent: GlobalConfig = {
  slug: "birdwatching-content",
  label: "Observacao de Aves",
  admin: {
    group: "Paginas",
    description: "Conteudo editavel da pagina de observacao de aves.",
    preview: () => `${frontendOrigin}/observacao-de-aves`,
  },
  access: { read: () => true, update: isAuthenticated },
  fields: [
    {
      type: "tabs",
      tabs: [
        { label: "Hero", fields: [{ name: "hero", type: "group", label: "Hero", fields: heroFields() }] },
        { label: "Manifesto", fields: [{ name: "manifesto", type: "group", label: "Manifesto", fields: manifestoFields() }] },
        { label: "Sobre Nos", fields: [{ name: "sobreNos", type: "group", label: "Sobre Nos", fields: sobreNosFields() }] },
        { label: "Destaques", fields: [{ name: "highlights", type: "group", label: "Destaques", fields: highlightsFields() }] },
      ],
    },
  ],
};
```

**Step 4: Verify + Commit**

Run: `cd payload-cms && npx tsc --noEmit`

```bash
git add payload-cms/src/globals/PescaContent.ts payload-cms/src/globals/EcoturismoContent.ts payload-cms/src/globals/BirdwatchingContent.ts
git commit -m "feat(cms): add Pesca + Ecoturismo + Birdwatching content globals"
```

---

## Task 5: Create ContatoContent + NossoImpactoContent Globals

**Files:**
- Create: `payload-cms/src/globals/ContatoContent.ts`
- Create: `payload-cms/src/globals/NossoImpactoContent.ts`

**Step 1: Create `ContatoContent.ts`**

Matches `ContatoPageContent`: hero, formTitle, steps, channels, mapCoords.

```typescript
import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const ContatoContent: GlobalConfig = {
  slug: "contato-content",
  label: "Contato",
  admin: {
    group: "Paginas",
    description: "Conteudo editavel da pagina de contato.",
    preview: () => `${frontendOrigin}/contato`,
  },
  access: { read: () => true, update: isAuthenticated },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [{ name: "hero", type: "group", label: "Hero", fields: heroFields() }],
        },
        {
          label: "Formulario",
          fields: [
            { name: "formTitle", type: "text", label: "Titulo do Formulario" },
            {
              name: "steps",
              type: "group",
              label: "Etapas do Formulario",
              fields: [
                {
                  name: "placeholders",
                  type: "array",
                  label: "Placeholders dos Campos",
                  labels: { singular: "Campo", plural: "Campos" },
                  fields: [
                    { name: "text", type: "text", label: "Placeholder", required: true },
                  ],
                },
                { name: "buttonNext", type: "text", label: "Botao Avancar" },
                { name: "buttonBack", type: "text", label: "Botao Voltar" },
                { name: "buttonSubmit", type: "text", label: "Botao Enviar" },
              ],
            },
          ],
        },
        {
          label: "Canais de Atendimento",
          fields: [
            {
              name: "channels",
              type: "group",
              label: "Canais",
              fields: [
                { name: "heading", type: "text", label: "Titulo" },
                {
                  name: "items",
                  type: "array",
                  label: "Canais de Contato",
                  labels: { singular: "Canal", plural: "Canais" },
                  fields: [
                    { name: "iconName", type: "text", label: "Icone (ex: Phone, Mail, MapPin)", admin: { width: "30%" } },
                    { name: "title", type: "text", label: "Titulo", admin: { width: "70%" } },
                    { name: "info", type: "text", label: "Informacao (telefone, email, endereco)" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Mapa",
          fields: [
            {
              name: "mapCoords",
              type: "group",
              label: "Coordenadas do Mapa",
              fields: [
                { name: "lat", type: "number", label: "Latitude", admin: { width: "50%" } },
                { name: "lng", type: "number", label: "Longitude", admin: { width: "50%" } },
              ],
            },
          ],
        },
      ],
    },
  ],
};
```

**Step 2: Create `NossoImpactoContent.ts`**

Matches `NossoImpactoPageContent`: hero, manifesto, rioVivo, biodiversidade, comunidade, operacao, engagement.

```typescript
import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";
import { manifestoFields } from "../fields/manifestoFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const NossoImpactoContent: GlobalConfig = {
  slug: "nosso-impacto-content",
  label: "Nosso Impacto",
  admin: {
    group: "Paginas",
    description: "Conteudo editavel da pagina Nosso Impacto (conservacao).",
    preview: () => `${frontendOrigin}/nosso-impacto`,
  },
  access: { read: () => true, update: isAuthenticated },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [{ name: "hero", type: "group", label: "Hero", fields: heroFields() }],
        },
        {
          label: "Manifesto",
          fields: [{ name: "manifesto", type: "group", label: "Manifesto", fields: manifestoFields() }],
        },
        {
          label: "Rio Vivo (Cota Zero)",
          fields: [
            {
              name: "rioVivo",
              type: "group",
              label: "Rio Vivo",
              fields: [
                { name: "heading", type: "text", label: "Titulo" },
                { name: "description", type: "textarea", label: "Descricao" },
                {
                  name: "steps",
                  type: "array",
                  label: "Ciclo Cota Zero",
                  labels: { singular: "Etapa", plural: "Etapas" },
                  fields: [
                    { name: "iconName", type: "text", label: "Icone (ex: Fish, Camera, Waves, Heart)", admin: { width: "30%" } },
                    { name: "title", type: "text", label: "Titulo", admin: { width: "70%" } },
                    { name: "description", type: "textarea", label: "Descricao" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Biodiversidade",
          fields: [
            {
              name: "biodiversidade",
              type: "group",
              label: "Biodiversidade",
              fields: [
                { name: "heading", type: "text", label: "Titulo" },
                { name: "description", type: "textarea", label: "Descricao" },
                {
                  name: "counters",
                  type: "array",
                  label: "Contadores Animados",
                  labels: { singular: "Contador", plural: "Contadores" },
                  fields: [
                    { name: "target", type: "number", label: "Valor Alvo", required: true },
                    { name: "suffix", type: "text", label: "Sufixo (ex: +, %)", admin: { width: "30%" } },
                    { name: "label", type: "text", label: "Legenda", admin: { width: "70%" } },
                    { name: "hasIcon", type: "checkbox", label: "Tem Icone?", defaultValue: false },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Comunidade",
          fields: [
            {
              name: "comunidade",
              type: "group",
              label: "Comunidade",
              fields: [
                { name: "heading", type: "text", label: "Titulo" },
                { name: "description", type: "textarea", label: "Descricao" },
                {
                  name: "body",
                  type: "array",
                  label: "Paragrafos",
                  labels: { singular: "Paragrafo", plural: "Paragrafos" },
                  fields: [{ name: "text", type: "textarea", label: "Texto", required: true }],
                },
                { name: "image", type: "text", label: "Imagem (path)" },
              ],
            },
          ],
        },
        {
          label: "Operacao Consciente",
          fields: [
            {
              name: "operacao",
              type: "group",
              label: "Operacao Consciente",
              fields: [
                { name: "heading", type: "text", label: "Titulo" },
                { name: "description", type: "textarea", label: "Descricao" },
                {
                  name: "practices",
                  type: "array",
                  label: "Praticas Sustentaveis",
                  labels: { singular: "Pratica", plural: "Praticas" },
                  fields: [
                    { name: "iconName", type: "text", label: "Icone (ex: Recycle, GlassWater, Droplets)", admin: { width: "30%" } },
                    { name: "title", type: "text", label: "Titulo", admin: { width: "70%" } },
                    { name: "description", type: "textarea", label: "Descricao" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Engajamento (CTA)",
          fields: [
            {
              name: "engagement",
              type: "group",
              label: "Engajamento",
              fields: [
                { name: "heading", type: "text", label: "Titulo" },
                { name: "description", type: "textarea", label: "Descricao" },
                { name: "buttonText", type: "text", label: "Texto do Botao" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
```

**Step 3: Verify + Commit**

Run: `cd payload-cms && npx tsc --noEmit`

```bash
git add payload-cms/src/globals/ContatoContent.ts payload-cms/src/globals/NossoImpactoContent.ts
git commit -m "feat(cms): add Contato + NossoImpacto content globals"
```

---

## Task 6: Create PrivacidadeContent + NotFoundContent Globals

**Files:**
- Create: `payload-cms/src/globals/PrivacidadeContent.ts`
- Create: `payload-cms/src/globals/NotFoundContent.ts`

**Step 1: Create `PrivacidadeContent.ts`**

Matches `PrivacidadePageContent`: hero (title, lastUpdated), sections[].

```typescript
import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const PrivacidadeContent: GlobalConfig = {
  slug: "privacidade-content",
  label: "Politica de Privacidade",
  admin: {
    group: "Paginas",
    description: "Conteudo editavel da politica de privacidade.",
    preview: () => `${frontendOrigin}/politica-de-privacidade`,
  },
  access: { read: () => true, update: isAuthenticated },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Cabecalho",
          fields: [
            {
              name: "hero",
              type: "group",
              label: "Cabecalho",
              fields: [
                { name: "title", type: "text", label: "Titulo da Pagina" },
                { name: "lastUpdated", type: "text", label: "Ultima Atualizacao (ex: 15 de Fevereiro, 2026)" },
              ],
            },
          ],
        },
        {
          label: "Secoes",
          description: "Secoes da politica de privacidade. Cada secao tem um ID, titulo e paragrafos. Use **negrito** para itens de lista.",
          fields: [
            {
              name: "sections",
              type: "array",
              label: "Secoes",
              labels: { singular: "Secao", plural: "Secoes" },
              fields: [
                { name: "id", type: "text", label: "ID (ancora, ex: dados-coletados)", required: true, admin: { width: "30%" } },
                { name: "title", type: "text", label: "Titulo da Secao", required: true, admin: { width: "70%" } },
                {
                  name: "content",
                  type: "array",
                  label: "Paragrafos",
                  labels: { singular: "Paragrafo", plural: "Paragrafos" },
                  admin: { description: "Cada item e um paragrafo. Comece com ** para criar itens de lista com negrito." },
                  fields: [
                    { name: "text", type: "textarea", label: "Texto", required: true },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
```

**Step 2: Create `NotFoundContent.ts`**

Matches `NotFoundPageContent`: hero (CmsHero), buttonText.

```typescript
import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const NotFoundContent: GlobalConfig = {
  slug: "not-found-content",
  label: "Pagina 404",
  admin: {
    group: "Paginas",
    description: "Conteudo da pagina de erro 404.",
    preview: () => `${frontendOrigin}/404-preview`,
  },
  access: { read: () => true, update: isAuthenticated },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [{ name: "hero", type: "group", label: "Hero", fields: heroFields() }],
        },
        {
          label: "Acao",
          fields: [
            { name: "buttonText", type: "text", label: "Texto do Botao (Voltar)" },
          ],
        },
      ],
    },
  ],
};
```

**Step 3: Verify + Commit**

Run: `cd payload-cms && npx tsc --noEmit`

```bash
git add payload-cms/src/globals/PrivacidadeContent.ts payload-cms/src/globals/NotFoundContent.ts
git commit -m "feat(cms): add Privacidade + NotFound content globals"
```

---

## Task 7: Register All Globals + Generate Import Map

**Files:**
- Modify: `payload-cms/src/payload.config.ts`
- Modify: `payload-cms/src/globals/SiteSettings.ts` (remove Home Hero, Home Manifesto, pageContent, and legacy JSON tabs)

**Step 1: Update `payload.config.ts`**

Add all 10 page content globals to the `globals` array.

```typescript
// Add these imports at the top:
import { HomeContent } from "./globals/HomeContent";
import { AcomodacoesContent } from "./globals/AcomodacoesContent";
import { CulinariaContent } from "./globals/CulinariaContent";
import { PescaContent } from "./globals/PescaContent";
import { EcoturismoContent } from "./globals/EcoturismoContent";
import { BirdwatchingContent } from "./globals/BirdwatchingContent";
import { ContatoContent } from "./globals/ContatoContent";
import { NossoImpactoContent } from "./globals/NossoImpactoContent";
import { PrivacidadeContent } from "./globals/PrivacidadeContent";
import { NotFoundContent } from "./globals/NotFoundContent";

// Update the globals array to:
globals: [
  SiteSettings,
  HomeContent,
  AcomodacoesContent,
  CulinariaContent,
  PescaContent,
  EcoturismoContent,
  BirdwatchingContent,
  ContatoContent,
  NossoImpactoContent,
  PrivacidadeContent,
  NotFoundContent,
],
```

**Step 2: Remove obsolete tabs from SiteSettings**

Remove these tabs from `SiteSettings.ts`:
- **"Home Hero"** tab (fields: homeHeroHeading, homeHeroSubtitle, homeHeroBookingHeading, homeHeroBookingDescription)
- **"Home Manifesto"** tab (fields: homeManifestoLabel, homeManifestoDetailsButtonLabel, homeManifestoSegments)
- **"Conteudo das Paginas"** tab (field: pageContent JSON)
- **"JSON Legado"** tab (field: sharedSections JSON)

Keep: Geral, CTA de Reserva, FAQ, Depoimentos, Rodape, SEO Padroes Globais.

**Step 3: Generate import map**

Run: `cd payload-cms && npx payload generate:importmap`

**Step 4: Verify TypeScript**

Run: `cd payload-cms && npx tsc --noEmit`

**Step 5: Commit**

```bash
git add payload-cms/src/payload.config.ts payload-cms/src/globals/SiteSettings.ts
git commit -m "feat(cms): register 10 page globals, clean SiteSettings"
```

---

## Task 8: Update importSeed.ts — Populate Page Globals

**Files:**
- Modify: `payload-cms/src/scripts/importSeed.ts`

Replace `importPageContent()` (which wrote to SiteSettings.pageContent) with `importPageGlobals()` that populates each page global individually from page-content.json.

**Step 1: Add the page global mapping and import function**

Add after the existing `importSharedSections` function. The key insight: `page-content.json` stores body/paragraphs as `string[]`, but the Payload array fields expect `{ text: string }[]`. We need to transform.

```typescript
const pageGlobalMap: Record<string, string> = {
  "/": "home-content",
  "/acomodacoes": "acomodacoes-content",
  "/culinaria": "culinaria-content",
  "/pesca": "pesca-content",
  "/ecoturismo": "ecoturismo-content",
  "/observacao-de-aves": "birdwatching-content",
  "/contato": "contato-content",
  "/nosso-impacto": "nosso-impacto-content",
  "/politica-de-privacidade": "privacidade-content",
  "/404": "not-found-content",
};

/** Convert string[] to { text: string }[] for Payload array fields */
function wrapStrings(arr: unknown): { text: string }[] {
  if (!Array.isArray(arr)) return [];
  return arr.map((item) => ({
    text: typeof item === "string" ? item : String(item),
  }));
}

/** Convert string[] to { text: string }[] for Contato placeholders */
function wrapPlaceholders(arr: unknown): { text: string }[] {
  return wrapStrings(arr);
}

/** Convert CmsPrivacySection content string[] to { text: string }[] */
function transformPrivacySections(sections: unknown): unknown[] {
  if (!Array.isArray(sections)) return [];
  return sections.map((section: Record<string, unknown>) => ({
    id: section.id ?? "",
    title: section.title ?? "",
    content: wrapStrings(section.content),
  }));
}

/**
 * Transform page-content.json data to match Payload group/array field shapes.
 * Key transforms:
 * - body: string[] → body: { text: string }[]
 * - features: CmsFeature[] stays as-is (already objects)
 * - sections[].content: string[] → sections[].content: { text: string }[]
 * - steps.placeholders: string[] → steps.placeholders: { text: string }[]
 */
function transformPageData(
  route: string,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const result = JSON.parse(JSON.stringify(data)) as Record<string, unknown>;

  // Recursively transform body: string[] → body: { text: string }[]
  function transformBody(obj: Record<string, unknown>): void {
    for (const [key, value] of Object.entries(obj)) {
      if (key === "body" && Array.isArray(value) && typeof value[0] === "string") {
        obj[key] = wrapStrings(value);
      } else if (value && typeof value === "object" && !Array.isArray(value)) {
        transformBody(value as Record<string, unknown>);
      } else if (key !== "body" && Array.isArray(value)) {
        for (const item of value) {
          if (item && typeof item === "object") {
            transformBody(item as Record<string, unknown>);
          }
        }
      }
    }
  }

  transformBody(result);

  // Special: Contato steps.placeholders: string[] → { text: string }[]
  if (route === "/contato") {
    const steps = result.steps as Record<string, unknown> | undefined;
    if (steps && Array.isArray(steps.placeholders) && typeof steps.placeholders[0] === "string") {
      steps.placeholders = wrapPlaceholders(steps.placeholders);
    }
  }

  // Special: Privacidade sections[].content: string[] → { text: string }[]
  if (route === "/politica-de-privacidade") {
    result.sections = transformPrivacySections(result.sections);
  }

  return result;
}

async function importPageGlobals(
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  const candidates = [
    resolve(process.cwd(), "..", "docs", "payload-seed", "page-content.json"),
    resolve(process.cwd(), "docs", "payload-seed", "page-content.json"),
  ];

  let raw: string | undefined;
  for (const candidate of candidates) {
    try {
      raw = await readFile(candidate, "utf8");
      break;
    } catch {
      // try next
    }
  }

  if (!raw) {
    console.log("page-content.json nao encontrado, pulando importacao de globals de pagina.");
    return;
  }

  const allPageContent = JSON.parse(raw) as Record<string, Record<string, unknown>>;

  for (const [route, globalSlug] of Object.entries(pageGlobalMap)) {
    const pageData = allPageContent[route];
    if (!pageData) {
      console.log(`Sem conteudo para rota ${route}, pulando ${globalSlug}.`);
      continue;
    }

    const transformedData = transformPageData(route, pageData);

    try {
      await payload.updateGlobal({
        slug: globalSlug,
        data: transformedData,
        depth: 0,
        overrideAccess: true,
      });
      console.log(`Global ${globalSlug} populado com sucesso.`);
    } catch (error) {
      console.error(`Erro ao popular ${globalSlug}:`, error);
    }
  }
}
```

**Step 2: Update the `main()` function**

Replace `importPageContent(payload)` with `importPageGlobals(payload)`.

Also remove the `importPageContent` function and the Home Hero/Manifesto import from `importSharedSections` (since those moved to HomeContent global — or keep them for backward compat if needed).

```typescript
async function main() {
  const seed = await readSeed();
  const payload = await getPayload({ config });

  await importBlog(payload, seed.blog);
  await importBirdwatching(payload, seed.birdwatching);
  await importPages(payload, seed.pages.routes);
  await importSharedSections(payload, seed.shared);
  await importPageGlobals(payload);

  console.log("Seed importado para o Payload com sucesso.");
}
```

**Step 3: Verify TypeScript**

Run: `cd payload-cms && npx tsc --noEmit`

**Step 4: Commit**

```bash
git add payload-cms/src/scripts/importSeed.ts
git commit -m "feat(cms): update seed import to populate page globals"
```

---

## Task 9: Update Express Server — Read from Page Globals

**Files:**
- Modify: `server/cms-content.ts`

When fetching from Payload REST, instead of reading `SiteSettings.pageContent` (JSON blob), fetch individual page globals.

**Step 1: Add page global map and fetch logic**

Add to `cms-content.ts`:

```typescript
const pageGlobalSlugs: Record<string, string> = {
  "/": "home-content",
  "/acomodacoes": "acomodacoes-content",
  "/culinaria": "culinaria-content",
  "/pesca": "pesca-content",
  "/ecoturismo": "ecoturismo-content",
  "/observacao-de-aves": "birdwatching-content",
  "/contato": "contato-content",
  "/nosso-impacto": "nosso-impacto-content",
  "/politica-de-privacidade": "privacidade-content",
  "/404": "not-found-content",
};

/** Strip Payload internal fields (id, blockType, etc.) from deeply nested objects */
function stripPayloadMeta(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(stripPayloadMeta);
  }
  if (obj && typeof obj === "object") {
    const record = obj as Record<string, unknown>;
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(record)) {
      // Keep 'id' only for privacy sections (they need it)
      if (key === "blockType" || key === "blockName" || key === "globalType" ||
          key === "createdAt" || key === "updatedAt") {
        continue;
      }
      result[key] = stripPayloadMeta(value);
    }
    return result;
  }
  return obj;
}

/**
 * Transform Payload array fields back to the frontend expected shapes.
 * - body: { text: string }[] → string[]
 * - placeholders: { text: string }[] → string[]
 * - sections[].content: { text: string }[] → string[]
 */
function transformGlobalToPageContent(
  route: string,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const result = JSON.parse(JSON.stringify(data)) as Record<string, unknown>;

  // Recursively unwrap body: { text: string }[] → string[]
  function unwrapBody(obj: Record<string, unknown>): void {
    for (const [key, value] of Object.entries(obj)) {
      if (key === "body" && Array.isArray(value) && value[0] && typeof value[0] === "object" && "text" in value[0]) {
        obj[key] = value.map((item: Record<string, unknown>) => item.text ?? "");
      } else if (value && typeof value === "object" && !Array.isArray(value)) {
        unwrapBody(value as Record<string, unknown>);
      } else if (key !== "body" && Array.isArray(value)) {
        for (const item of value) {
          if (item && typeof item === "object") {
            unwrapBody(item as Record<string, unknown>);
          }
        }
      }
    }
  }

  unwrapBody(result);

  // Special: Contato steps.placeholders: { text: string }[] → string[]
  if (route === "/contato") {
    const steps = result.steps as Record<string, unknown> | undefined;
    if (steps && Array.isArray(steps.placeholders)) {
      const first = steps.placeholders[0];
      if (first && typeof first === "object" && "text" in first) {
        steps.placeholders = steps.placeholders.map((p: Record<string, unknown>) => p.text ?? "");
      }
    }
  }

  // Special: Privacidade sections[].content: { text: string }[] → string[]
  if (route === "/politica-de-privacidade" && Array.isArray(result.sections)) {
    result.sections = result.sections.map((section: Record<string, unknown>) => {
      if (Array.isArray(section.content)) {
        const first = section.content[0];
        if (first && typeof first === "object" && "text" in first) {
          section.content = section.content.map((item: Record<string, unknown>) => item.text ?? "");
        }
      }
      return section;
    });
  }

  return result;
}
```

**Step 2: Update `loadFromPayloadRest`**

After fetching site settings, also fetch all page globals:

```typescript
// In loadFromPayloadRest, after siteSettings fetch:
const pageContent: Record<string, unknown> = {};
const pageGlobalFetches = Object.entries(pageGlobalSlugs).map(
  async ([route, globalSlug]) => {
    try {
      const globalData = await fetchJsonWithTimeout(
        `${normalizedBase}/api/globals/${globalSlug}?depth=0`,
      );
      const record = toRecord(globalData);
      if (record) {
        const cleaned = stripPayloadMeta(record) as Record<string, unknown>;
        pageContent[route] = transformGlobalToPageContent(route, cleaned);
      }
    } catch {
      // Individual global fetch failure is non-fatal
    }
  },
);
await Promise.all(pageGlobalFetches);
```

**Step 3: Update `buildFromPayloadData` signature**

Add `pageContent` parameter and remove the old `SiteSettings.pageContent` extraction:

```typescript
function buildFromPayloadData(
  payloadCategories: AnyDoc[],
  payloadPosts: AnyDoc[],
  payloadBirdCategories: AnyDoc[],
  payloadBirdSpecies: AnyDoc[],
  payloadSiteSettings: AnyDoc | null,
  pageContent?: Record<string, unknown>,  // NEW PARAM
): CmsContent {
  // ... existing code ...

  // REPLACE the old pageContent extraction (lines 397-403) with:
  // pageContent is now passed as a parameter

  return {
    // ... existing fields ...
    pageContent, // use the parameter directly
    // ...
  };
}
```

Update the call site in `loadFromPayloadRest`:
```typescript
return buildFromPayloadData(
  blogCategoriesDocs,
  blogPostsDocs,
  birdCategoryDocs,
  birdSpeciesDocs,
  siteSettings,
  pageContent, // pass the page globals data
);
```

**Step 4: Verify TypeScript + restart servers**

Run: `cd payload-cms && npx tsc --noEmit`
Run: `npx tsc --noEmit` (root project)

**Step 5: Commit**

```bash
git add server/cms-content.ts
git commit -m "feat(cms): read page content from individual Payload globals"
```

---

## Task 10: Run Seed + Verify Admin Panel

**Step 1: Run the seed import**

```bash
cd payload-cms && npm run seed
```

Expected: All 10 globals populated with content from page-content.json.

**Step 2: Restart Payload dev server**

Kill and restart: `npm --prefix payload-cms run dev`

**Step 3: Verify in admin panel**

Open http://127.0.0.1:3001/admin and check:

1. Sidebar shows **"Paginas"** group with 10 items (Home, Acomodacoes, Culinaria, etc.)
2. Click **Home** → see Sobre Nos, Expedicoes, Estatisticas, Acomodacoes, Impacto, Blog tabs — all with content
3. Click **Acomodacoes** → see Hero (with video paths), Manifesto (segments), Destaques, Quartos, Culinaria tabs
4. Click **Pesca** → see Hero, Manifesto, Sobre Nos, Destaques, Servicos tabs
5. **SiteSettings** → NO more "Home Hero", "Home Manifesto", "Conteudo das Paginas", "JSON Legado" tabs

**Step 4: Verify API endpoint**

```bash
curl -s http://127.0.0.1:5000/api/cms/page/acomodacoes | head -200
```

Expected: JSON with hero, manifesto, highlights, rooms, culinary content.

**Step 5: Verify frontend renders correctly**

Open http://127.0.0.1:5000 — browse through all pages, confirm text renders.

**Step 6: Commit**

```bash
git commit --allow-empty -m "verify: seed imported, admin panel + frontend working"
```

---

## Task 11: Cleanup Legacy Fields

**Files:**
- Modify: `payload-cms/src/globals/SiteSettings.ts` (verify no legacy tabs remain)
- Modify: `payload-cms/src/collections/Pages.ts` (remove `sections` JSON field)
- Modify: `payload-cms/src/scripts/importSeed.ts` (remove old `importPageContent` function, remove homeHero/homeManifesto from `importSharedSections`)

**Step 1: Remove `sections` field from Pages collection**

In `Pages.ts`, remove the "Conteudo da pagina" tab that contains the `sections` JSON field. Pages collection keeps only: Identificacao (title, slug) + SEO.

**Step 2: Clean importSeed.ts**

- Delete the old `importPageContent` function entirely
- In `importSharedSections`, remove the `homeHero` and `homeManifesto` blocks (they're now in HomeContent global)
- Keep: immersionCta, faq, testimonials, footer

**Step 3: Update `importSharedSections` to not write homeHero/homeManifesto to SiteSettings**

Remove lines that set:
- `updateData.homeHeroHeading`
- `updateData.homeHeroSubtitle`
- `updateData.homeHeroBookingHeading`
- `updateData.homeHeroBookingDescription`
- `updateData.homeManifestoLabel`
- `updateData.homeManifestoDetailsButtonLabel`
- `updateData.homeManifestoSegments`

**Step 4: Update `buildSharedFromStructuredSettings` in `server/cms-content.ts`**

Remove the `homeHero` and `homeManifesto` blocks from the shared settings builder. These are now served via the HomeContent global at `/api/cms/page/home`.

**Step 5: Verify TypeScript**

Run: `cd payload-cms && npx tsc --noEmit`
Run: `npx tsc --noEmit`

**Step 6: Run tests**

Run: `npm test`
Expected: All 93 tests pass

**Step 7: Commit**

```bash
git add payload-cms/src/globals/SiteSettings.ts payload-cms/src/collections/Pages.ts payload-cms/src/scripts/importSeed.ts server/cms-content.ts
git commit -m "refactor(cms): remove legacy JSON fields, clean up SiteSettings"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Field builders (hero, manifesto, highlights, sobreNos, services) | 5 new |
| 2 | HomeContent global | 1 new |
| 3 | AcomodacoesContent + CulinariaContent globals | 2 new |
| 4 | PescaContent + EcoturismoContent + BirdwatchingContent globals | 3 new |
| 5 | ContatoContent + NossoImpactoContent globals | 2 new |
| 6 | PrivacidadeContent + NotFoundContent globals | 2 new |
| 7 | Register globals in config + clean SiteSettings | 2 modified |
| 8 | Update importSeed.ts for page globals | 1 modified |
| 9 | Update Express server to read from globals | 1 modified |
| 10 | Run seed + verify admin + frontend | verification |
| 11 | Cleanup legacy fields | 4 modified |

**Total: 15 new files, 8 modified files, 11 tasks**
