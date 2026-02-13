# Payload CMS Admin Completo — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transformar o painel admin do Payload CMS em uma interface estilizada com a marca Itaicy, com campos estruturados para edição amigável, e garantir integração completa frontend-CMS sem perder nada do site existente.

**Architecture:** O Payload CMS v3 roda como app Next.js separado (port 3001). Customizamos via `custom.scss` para cores/fontes, componentes React para logo/dashboard, e refatoramos collections para usar Blocks/Arrays em vez de JSON livre. O Express server (port 5000) já tem a camada de normalização; ajustamos para novos formatos de campo.

**Tech Stack:** Payload CMS 3.0 + Next.js 15 + React 19 + SCSS + SQLite (dev) / PostgreSQL (prod)

---

## Phase 1: Admin Panel Branding & Styling

### Task 1: Create custom admin SCSS with Itaicy brand colors

**Files:**
- Create: `payload-cms/src/app/(payload)/custom.scss`

**Step 1: Create the SCSS file with Pantanal color overrides**

```scss
/* Itaicy Pantanal — Admin Panel Brand Override */

/* Import Google Fonts for admin */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap');

:root {
  /* Typography */
  --font-body: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;

  /* Pantanal palette mapped to Payload elevation system */
  --theme-elevation-0: #fcf4ed;     /* cream - main background */
  --theme-elevation-50: #f5e8db;    /* warm sand */
  --theme-elevation-100: #ede0d2;
  --theme-elevation-150: #e5d8c8;
  --theme-elevation-200: #ddd0be;
  --theme-elevation-250: #d5c8b4;
  --theme-elevation-300: #cdc0aa;
  --theme-elevation-350: #c5b8a0;
  --theme-elevation-400: #bdb096;
  --theme-elevation-450: #b5a88c;
  --theme-elevation-500: #ac8042;   /* gold accent */
  --theme-elevation-600: #8f6a35;   /* gold hover */
  --theme-elevation-700: #446354;   /* muted green */
  --theme-elevation-800: #344e41;   /* medium green */
  --theme-elevation-900: #263a30;   /* dark secondary */
  --theme-elevation-950: #1a2e23;
  --theme-elevation-1000: #152218;  /* darkest */

  /* Semantic - success uses green palette */
  --color-success-500: #344e41;

  /* Semantic - warning uses gold */
  --color-warning-500: #ac8042;

  /* Radius */
  --style-radius-s: 4px;
  --style-radius-m: 8px;
  --style-radius-l: 12px;
}

/* Dark mode - inverted for admin editors who prefer dark */
[data-theme='dark'] {
  --theme-elevation-0: #152218;
  --theme-elevation-50: #1a2e23;
  --theme-elevation-100: #263a30;
  --theme-elevation-150: #2d4238;
  --theme-elevation-200: #344e41;
  --theme-elevation-250: #3b5a49;
  --theme-elevation-300: #446354;
  --theme-elevation-350: #4d6f5f;
  --theme-elevation-400: #567b6a;
  --theme-elevation-450: #6c927f;
  --theme-elevation-500: #ac8042;
  --theme-elevation-600: #d7a45d;
  --theme-elevation-700: #a8cab9;
  --theme-elevation-800: #cfebdd;
  --theme-elevation-900: #e3f7ec;
  --theme-elevation-950: #f2fcf7;
  --theme-elevation-1000: #fcf4ed;
}

/* Login page branding */
.login {
  &__brand {
    margin-bottom: 2rem;
  }
}

/* Nav sidebar brand area */
.nav {
  &__brand {
    padding: 1.5rem 1rem;
  }
}

/* Collection group labels */
.nav__group-label {
  font-family: var(--font-serif);
  text-transform: none;
  letter-spacing: 0;
  font-weight: 500;
}

/* Dashboard card hover */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(21, 34, 24, 0.1);
  }
}

/* Buttons - gold accent for primary */
.btn {
  font-family: var(--font-body);
  border-radius: var(--style-radius-m);
  transition: all 0.2s ease;
}

/* Table headers use serif */
.table .row .cell--header {
  font-family: var(--font-body);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}
```

**Step 2: Verify the file loads automatically**

Payload v3 auto-loads `src/app/(payload)/custom.scss`. No config change needed.

Run: `cd c:/Itaicy/Replit/itaicypantanal/payload-cms && npx next build --no-lint 2>&1 | head -20`
Expected: Build succeeds without SCSS errors.

**Step 3: Commit**

```bash
git add payload-cms/src/app/\(payload\)/custom.scss
git commit -m "style(admin): add Itaicy brand SCSS with pantanal color palette

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2: Create custom Logo and Icon components

**Files:**
- Create: `payload-cms/src/components/admin/Logo.tsx`
- Create: `payload-cms/src/components/admin/Icon.tsx`
- Modify: `payload-cms/src/payload.config.ts:69-80` (admin block)

**Step 1: Create the Logo component (login/signup page)**

```tsx
// payload-cms/src/components/admin/Logo.tsx
import React from "react";

export default function Logo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "28px",
          fontWeight: 500,
          color: "#152218",
          letterSpacing: "0.02em",
          lineHeight: 1.2,
          textAlign: "center",
        }}
      >
        Itaicy Pantanal
      </div>
      <div
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: "13px",
          fontWeight: 400,
          color: "#446354",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Eco Lodge &bull; CMS
      </div>
    </div>
  );
}
```

**Step 2: Create the Icon component (sidebar nav)**

```tsx
// payload-cms/src/components/admin/Icon.tsx
import React from "react";

export default function Icon() {
  return (
    <div
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "6px",
        backgroundColor: "#263a30",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "16px",
        fontWeight: 600,
        color: "#d7a45d",
        lineHeight: 1,
      }}
    >
      I
    </div>
  );
}
```

**Step 3: Register components in payload.config.ts**

In `payload-cms/src/payload.config.ts`, replace the `admin` block (lines 69-80) with:

```typescript
  admin: {
    user: Users.slug,
    autoRefresh: true,
    dateFormat: "dd/MM/yyyy HH:mm",
    meta: {
      titleSuffix: " - Itaicy CMS",
      description: "Sistema de gestao de conteudo do Itaicy Pantanal Eco Lodge",
      icons: [
        {
          rel: "icon",
          type: "image/png",
          url: "/favicon.ico",
        },
      ],
    },
    components: {
      graphics: {
        Logo: "/src/components/admin/Logo",
        Icon: "/src/components/admin/Icon",
      },
    },
    importMap: {
      baseDir: dirname,
      importMapFile: path.resolve(dirname, "app/(payload)/admin/importMap.ts"),
    },
  },
```

**Step 4: Regenerate import map**

Run: `cd c:/Itaicy/Replit/itaicypantanal/payload-cms && npx payload generate:importmap`
Expected: `importMap.ts` updated with new component references.

**Step 5: Commit**

```bash
git add payload-cms/src/components/admin/Logo.tsx payload-cms/src/components/admin/Icon.tsx payload-cms/src/payload.config.ts payload-cms/src/app/\(payload\)/admin/importMap.ts
git commit -m "feat(admin): add Itaicy logo and icon components to admin panel

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3: Create Welcome Dashboard banner

**Files:**
- Create: `payload-cms/src/components/admin/WelcomeBanner.tsx`
- Modify: `payload-cms/src/payload.config.ts` (add beforeDashboard)

**Step 1: Create the WelcomeBanner component**

```tsx
// payload-cms/src/components/admin/WelcomeBanner.tsx
"use client";

import React from "react";

export default function WelcomeBanner() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #263a30 0%, #344e41 100%)",
        color: "#e3f7ec",
        padding: "32px",
        borderRadius: "12px",
        marginBottom: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "24px",
            fontWeight: 500,
            margin: "0 0 8px 0",
            color: "#f2fcf7",
          }}
        >
          Painel Itaicy Pantanal
        </h2>
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "15px",
            fontWeight: 400,
            margin: "0 0 16px 0",
            color: "#a8cab9",
            maxWidth: "600px",
          }}
        >
          Gerencie o conteudo do site: artigos do blog, catalogo de aves,
          depoimentos, perguntas frequentes e configuracoes gerais.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a
            href="/admin/collections/blog-posts"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              backgroundColor: "#ac8042",
              color: "#f2fcf7",
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "'Lato', sans-serif",
              textDecoration: "none",
              transition: "background-color 0.2s",
            }}
          >
            Blog Posts
          </a>
          <a
            href="/admin/collections/bird-species"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#e3f7ec",
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "'Lato', sans-serif",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            Catalogo de Aves
          </a>
          <a
            href="/admin/globals/site-settings"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#e3f7ec",
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "'Lato', sans-serif",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            Configuracoes
          </a>
        </div>
      </div>
      {/* Decorative gold accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "200px",
          height: "100%",
          background:
            "linear-gradient(135deg, transparent 50%, rgba(172,128,66,0.08) 100%)",
        }}
      />
    </div>
  );
}
```

**Step 2: Register in payload.config.ts**

Add `beforeDashboard` to the `components` object:

```typescript
    components: {
      graphics: {
        Logo: "/src/components/admin/Logo",
        Icon: "/src/components/admin/Icon",
      },
      beforeDashboard: ["/src/components/admin/WelcomeBanner"],
    },
```

**Step 3: Regenerate import map**

Run: `cd c:/Itaicy/Replit/itaicypantanal/payload-cms && npx payload generate:importmap`

**Step 4: Commit**

```bash
git add payload-cms/src/components/admin/WelcomeBanner.tsx payload-cms/src/payload.config.ts payload-cms/src/app/\(payload\)/admin/importMap.ts
git commit -m "feat(admin): add welcome dashboard banner with quick-action links

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Phase 2: Structured Fields (Replace JSON Blobs)

### Task 4: Refactor SiteSettings — FAQ as structured array

**Files:**
- Modify: `payload-cms/src/globals/SiteSettings.ts`

**Step 1: Read the current SiteSettings file**

Read: `payload-cms/src/globals/SiteSettings.ts`

**Step 2: Replace the sharedSections JSON field with structured tabs**

Replace the entire `SiteSettings` global with:

```typescript
import type { GlobalConfig } from "payload";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Configuracoes do Site",
  admin: {
    group: "Conteudo do Site",
    description:
      "Configuracoes globais compartilhadas em todo o site: contato, rodape, FAQ, depoimentos e secoes da home.",
    preview: () => frontendOrigin,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Geral",
          fields: [
            {
              name: "brandName",
              type: "text",
              label: "Nome da Marca",
              admin: { width: "50%" },
            },
            {
              name: "contactEmail",
              type: "email",
              label: "Email de Contato",
              admin: { width: "50%" },
            },
            {
              name: "contactPhone",
              type: "text",
              label: "Telefone",
              admin: { width: "50%" },
            },
            {
              name: "contactAddress",
              type: "textarea",
              label: "Endereco",
              admin: { width: "100%" },
            },
          ],
        },
        {
          label: "CTA de Reserva",
          fields: [
            {
              name: "ctaHeading",
              type: "text",
              label: "Titulo do CTA",
            },
            {
              name: "ctaDescription",
              type: "textarea",
              label: "Descricao do CTA",
            },
            {
              name: "ctaBackgroundImage",
              type: "text",
              label: "Imagem de Fundo (path)",
              admin: {
                description: "Caminho da imagem, ex: /images/cta-bg",
              },
            },
          ],
        },
        {
          label: "FAQ",
          fields: [
            {
              name: "faqLabel",
              type: "text",
              label: "Label da Secao",
              defaultValue: "FAQ",
              admin: { width: "30%" },
            },
            {
              name: "faqHeading",
              type: "text",
              label: "Titulo",
              admin: { width: "70%" },
            },
            {
              name: "faqDescription",
              type: "textarea",
              label: "Descricao",
            },
            {
              name: "faqItems",
              type: "array",
              label: "Perguntas e Respostas",
              labels: {
                singular: "Pergunta",
                plural: "Perguntas",
              },
              admin: {
                initCollapsed: false,
                description: "Adicione perguntas frequentes. Arraste para reordenar.",
              },
              fields: [
                {
                  name: "question",
                  type: "text",
                  label: "Pergunta",
                  required: true,
                },
                {
                  name: "answer",
                  type: "textarea",
                  label: "Resposta",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "Depoimentos",
          fields: [
            {
              name: "testimonialsLabel",
              type: "text",
              label: "Label da Secao",
              defaultValue: "Depoimentos",
              admin: { width: "30%" },
            },
            {
              name: "testimonialsHeading",
              type: "text",
              label: "Titulo",
              admin: { width: "70%" },
            },
            {
              name: "testimonialsDescription",
              type: "textarea",
              label: "Descricao",
            },
            {
              name: "testimonialItems",
              type: "array",
              label: "Depoimentos",
              labels: {
                singular: "Depoimento",
                plural: "Depoimentos",
              },
              fields: [
                {
                  name: "quote",
                  type: "textarea",
                  label: "Texto do Depoimento",
                  required: true,
                },
                {
                  name: "author",
                  type: "text",
                  label: "Autor",
                  required: true,
                  admin: { width: "50%" },
                },
                {
                  name: "location",
                  type: "text",
                  label: "Localidade",
                  admin: { width: "50%" },
                },
                {
                  name: "rating",
                  type: "number",
                  label: "Nota (1-5)",
                  min: 1,
                  max: 5,
                  defaultValue: 5,
                  admin: { width: "30%" },
                },
              ],
            },
          ],
        },
        {
          label: "Rodape",
          fields: [
            {
              name: "footerPousadaLinks",
              type: "array",
              label: "Links Pousada",
              labels: { singular: "Link", plural: "Links" },
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  admin: { width: "50%" },
                },
                {
                  name: "url",
                  type: "text",
                  required: true,
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "footerExperienciasLinks",
              type: "array",
              label: "Links Experiencias",
              labels: { singular: "Link", plural: "Links" },
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  admin: { width: "50%" },
                },
                {
                  name: "url",
                  type: "text",
                  required: true,
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "footerLegalLinks",
              type: "array",
              label: "Links Legais",
              labels: { singular: "Link", plural: "Links" },
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  admin: { width: "50%" },
                },
                {
                  name: "url",
                  type: "text",
                  required: true,
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "footerCopyright",
              type: "text",
              label: "Texto de Copyright",
            },
          ],
        },
        {
          label: "Home Hero",
          fields: [
            {
              name: "homeHeroHeading",
              type: "text",
              label: "Titulo Principal",
            },
            {
              name: "homeHeroSubtitle",
              type: "text",
              label: "Subtitulo",
            },
            {
              name: "homeHeroBookingHeading",
              type: "text",
              label: "Titulo do Card de Reserva",
            },
            {
              name: "homeHeroBookingDescription",
              type: "text",
              label: "Descricao do Card de Reserva",
            },
          ],
        },
        {
          label: "Home Manifesto",
          fields: [
            {
              name: "homeManifestoLabel",
              type: "text",
              label: "Label",
              admin: { width: "30%" },
            },
            {
              name: "homeManifestoDetailsButtonLabel",
              type: "text",
              label: "Texto do Botao",
              admin: { width: "70%" },
            },
            {
              name: "homeManifestoSegments",
              type: "array",
              label: "Segmentos do Manifesto",
              labels: { singular: "Segmento", plural: "Segmentos" },
              fields: [
                {
                  name: "type",
                  type: "select",
                  label: "Tipo",
                  options: [
                    { label: "Texto", value: "text" },
                    { label: "Destaque", value: "highlight" },
                    { label: "Separador", value: "divider" },
                  ],
                  required: true,
                  admin: { width: "30%" },
                },
                {
                  name: "content",
                  type: "text",
                  label: "Conteudo",
                  admin: {
                    width: "70%",
                    condition: (_data, siblingData) =>
                      siblingData?.type !== "divider",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "JSON Legado",
          description: "Campo JSON legado para compatibilidade. Sera removido apos migracao completa.",
          fields: [
            {
              name: "sharedSections",
              type: "json",
              label: "Secoes Compartilhadas (Legado)",
              admin: {
                description:
                  "ATENCAO: Este campo sera descontinuado. Edite o conteudo nas abas acima.",
              },
            },
          ],
        },
      ],
    },
  ],
};
```

**Step 3: Rebuild to verify schema**

Run: `cd c:/Itaicy/Replit/itaicypantanal/payload-cms && npx payload generate:types 2>&1 | tail -5`
Expected: Types generated without errors.

**Step 4: Commit**

```bash
git add payload-cms/src/globals/SiteSettings.ts
git commit -m "feat(cms): refactor SiteSettings from JSON blob to structured fields

FAQ items, testimonials, footer links, home hero, and manifesto now have
dedicated array/text fields with proper admin UI for non-technical editors.
Legacy sharedSections JSON kept in separate tab for backward compatibility.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 5: Update server normalization to read new structured fields

**Files:**
- Modify: `server/cms-content.ts` (buildFromPayloadData function)
- Modify: `shared/cms-shared-content.ts` (types)

**Step 1: Read current shared types**

Read: `shared/cms-shared-content.ts`

**Step 2: Update the buildFromPayloadData function**

In `server/cms-content.ts`, add a new function after `buildFromPayloadData` to extract shared sections from the new structured fields:

```typescript
function buildSharedFromStructuredSettings(
  settings: AnyDoc | null,
): Record<string, unknown> | null {
  if (!settings) return null;

  // Check if new structured fields exist (migration complete)
  const hasFaqItems = Array.isArray(settings.faqItems) && settings.faqItems.length > 0;
  const hasTestimonials = Array.isArray(settings.testimonialItems) && settings.testimonialItems.length > 0;

  if (!hasFaqItems && !hasTestimonials) {
    // Fallback to legacy JSON blob
    return null;
  }

  const str = (v: unknown) => (typeof v === "string" ? v : "");

  return {
    immersionCta: {
      heading: str(settings.ctaHeading),
      description: str(settings.ctaDescription),
      backgroundImage: str(settings.ctaBackgroundImage),
    },
    faq: {
      label: str(settings.faqLabel) || "FAQ",
      heading: str(settings.faqHeading),
      description: str(settings.faqDescription),
      items: Array.isArray(settings.faqItems)
        ? settings.faqItems.map((item: AnyDoc) => ({
            question: str(item.question),
            answer: str(item.answer),
          }))
        : [],
    },
    testimonials: {
      label: str(settings.testimonialsLabel) || "Depoimentos",
      heading: str(settings.testimonialsHeading),
      description: str(settings.testimonialsDescription),
      items: Array.isArray(settings.testimonialItems)
        ? settings.testimonialItems.map((item: AnyDoc) => ({
            quote: str(item.quote),
            author: str(item.author),
            location: str(item.location),
            rating: typeof item.rating === "number" ? item.rating : 5,
          }))
        : [],
    },
    footer: {
      pousadaLinks: Array.isArray(settings.footerPousadaLinks)
        ? settings.footerPousadaLinks.map((l: AnyDoc) => ({
            label: str(l.label),
            url: str(l.url),
          }))
        : [],
      experienciasLinks: Array.isArray(settings.footerExperienciasLinks)
        ? settings.footerExperienciasLinks.map((l: AnyDoc) => ({
            label: str(l.label),
            url: str(l.url),
          }))
        : [],
      legalLinks: Array.isArray(settings.footerLegalLinks)
        ? settings.footerLegalLinks.map((l: AnyDoc) => ({
            label: str(l.label),
            url: str(l.url),
          }))
        : [],
      copyright: str(settings.footerCopyright),
    },
    homeHero: {
      heading: str(settings.homeHeroHeading),
      subtitle: str(settings.homeHeroSubtitle),
      bookingHeading: str(settings.homeHeroBookingHeading),
      bookingDescription: str(settings.homeHeroBookingDescription),
    },
    homeManifesto: {
      label: str(settings.homeManifestoLabel),
      segments: Array.isArray(settings.homeManifestoSegments)
        ? settings.homeManifestoSegments.map((seg: AnyDoc) => ({
            type: str(seg.type),
            content: str(seg.content),
          }))
        : [],
      detailsButtonLabel: str(settings.homeManifestoDetailsButtonLabel),
    },
  };
}
```

Then update the `shared` resolution in `buildFromPayloadData` (around line 247-253):

```typescript
  // Try new structured fields first, then legacy JSON, then defaults
  const structuredShared = buildSharedFromStructuredSettings(payloadSiteSettings);
  const legacyShared = payloadSiteSettings?.sharedSections;
  const shared =
    structuredShared ??
    (legacyShared &&
    typeof legacyShared === "object" &&
    !Array.isArray(legacyShared)
      ? (legacyShared as Record<string, unknown>)
      : defaultSharedCmsSections);
```

**Step 3: Update the loadFromPayloadRest fetch to include depth=1**

Change the site settings fetch (line ~333):
```typescript
    const siteSettingsRes = await fetchJsonWithTimeout(
      `${normalizedBase}/api/globals/site-settings?depth=1`,
    );
```

**Step 4: Test the server still builds**

Run: `cd c:/Itaicy/Replit/itaicypantanal && npx tsc --noEmit 2>&1 | head -20`
Expected: No TypeScript errors.

**Step 5: Commit**

```bash
git add server/cms-content.ts
git commit -m "feat(server): support structured SiteSettings fields with legacy fallback

Server now reads FAQ items, testimonials, footer links from dedicated fields.
Falls back to sharedSections JSON blob if structured fields are empty.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 6: Refactor BlogPosts contentBlocks from JSON to Payload Blocks

**Files:**
- Modify: `payload-cms/src/collections/BlogPosts.ts`

**Step 1: Read current BlogPosts collection**

Read: `payload-cms/src/collections/BlogPosts.ts`

**Step 2: Replace the contentBlocks JSON field with a blocks field**

Replace the `contentBlocks` field (in the "Conteudo" tab) with:

```typescript
            {
              name: "contentBlocks",
              type: "blocks",
              label: "Blocos de Conteudo",
              labels: {
                singular: "Bloco",
                plural: "Blocos",
              },
              blocks: [
                {
                  slug: "paragraph",
                  labels: { singular: "Paragrafo", plural: "Paragrafos" },
                  fields: [
                    {
                      name: "text",
                      type: "textarea",
                      label: "Texto",
                      required: true,
                      admin: {
                        description:
                          "Use **texto** para negrito (compativel com markdown).",
                      },
                    },
                  ],
                },
                {
                  slug: "heading",
                  labels: { singular: "Titulo", plural: "Titulos" },
                  fields: [
                    {
                      name: "text",
                      type: "text",
                      label: "Texto do Titulo",
                      required: true,
                    },
                  ],
                },
                {
                  slug: "species",
                  labels: { singular: "Especie", plural: "Especies" },
                  fields: [
                    {
                      name: "name",
                      type: "text",
                      label: "Nome Popular",
                      required: true,
                      admin: { width: "50%" },
                    },
                    {
                      name: "scientificName",
                      type: "text",
                      label: "Nome Cientifico",
                      required: true,
                      admin: { width: "50%" },
                    },
                    {
                      name: "description",
                      type: "textarea",
                      label: "Descricao",
                      required: true,
                    },
                    {
                      name: "image",
                      type: "text",
                      label: "Imagem (path)",
                      admin: {
                        description:
                          "Caminho da imagem, ex: /images/bird-species-1",
                      },
                    },
                  ],
                },
                {
                  slug: "orderedList",
                  labels: { singular: "Lista Ordenada", plural: "Listas Ordenadas" },
                  fields: [
                    {
                      name: "items",
                      type: "array",
                      label: "Itens",
                      labels: { singular: "Item", plural: "Itens" },
                      fields: [
                        {
                          name: "bold",
                          type: "text",
                          label: "Texto em Negrito",
                          required: true,
                          admin: { width: "40%" },
                        },
                        {
                          name: "text",
                          type: "text",
                          label: "Texto do Item",
                          required: true,
                          admin: { width: "60%" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
```

**Step 3: Regenerate types**

Run: `cd c:/Itaicy/Replit/itaicypantanal/payload-cms && npx payload generate:types 2>&1 | tail -5`
Expected: Types generated successfully with new block types.

**Step 4: Commit**

```bash
git add payload-cms/src/collections/BlogPosts.ts
git commit -m "feat(cms): replace blog contentBlocks JSON with Payload Blocks field

Editors now get visual block picker: Paragrafo, Titulo, Especie, Lista Ordenada.
Each block has typed fields instead of raw JSON editing.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 7: Update server normalization for new blog blocks format

**Files:**
- Modify: `server/cms-content.ts`

**Step 1: Update content block normalization**

The Payload Blocks field adds `blockType` and `id` to each block. We need to normalize this to the frontend's `ArticleContentBlock` format.

In `buildFromPayloadData`, update the content extraction (around line 122):

```typescript
      content: Array.isArray(doc.contentBlocks)
        ? doc.contentBlocks.map((block: AnyDoc) => {
            // Payload Blocks add blockType; legacy JSON uses type
            const blockType =
              typeof block.blockType === "string"
                ? block.blockType
                : typeof block.type === "string"
                  ? block.type
                  : "paragraph";

            if (blockType === "species") {
              return {
                type: "species",
                name: typeof block.name === "string" ? block.name : "",
                scientificName:
                  typeof block.scientificName === "string"
                    ? block.scientificName
                    : "",
                description:
                  typeof block.description === "string"
                    ? block.description
                    : "",
                image: typeof block.image === "string" ? block.image : "",
              };
            }

            if (blockType === "orderedList") {
              return {
                type: "orderedList",
                items: Array.isArray(block.items)
                  ? block.items.map((item: AnyDoc) => ({
                      bold: typeof item.bold === "string" ? item.bold : "",
                      text: typeof item.text === "string" ? item.text : "",
                    }))
                  : [],
              };
            }

            // paragraph and heading both just have text
            return {
              type: blockType,
              text: typeof block.text === "string" ? block.text : "",
            };
          })
        : [],
```

**Step 2: Verify TypeScript compilation**

Run: `cd c:/Itaicy/Replit/itaicypantanal && npx tsc --noEmit 2>&1 | head -10`
Expected: No errors.

**Step 3: Commit**

```bash
git add server/cms-content.ts
git commit -m "fix(server): normalize Payload Blocks format (blockType) to frontend format (type)

Handles both new Blocks format and legacy JSON for backward compatibility.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Phase 3: Seed Data Migration

### Task 8: Update seed import script for new field structure

**Files:**
- Modify: `payload-cms/src/scripts/importSeed.ts`

**Step 1: Read the current import script**

Read: `payload-cms/src/scripts/importSeed.ts`

**Step 2: Update blog post content block format for Payload Blocks**

When importing blog post `contentBlocks`, wrap each block with `blockType` instead of `type`:

```typescript
// In the blog post upsert, transform content blocks:
const transformedBlocks = (detail.content || []).map((block: any) => ({
  blockType: block.type,  // Payload Blocks uses blockType
  ...block,
  type: undefined,        // Remove the old type field
}));
```

**Step 3: Add shared sections import from structured fields**

After the blog/bird import, add SiteSettings structured field population:

```typescript
// Import shared sections into structured SiteSettings fields
if (seedData.shared) {
  const shared = seedData.shared;

  const updateData: Record<string, unknown> = {};

  // CTA
  if (shared.immersionCta) {
    updateData.ctaHeading = shared.immersionCta.heading;
    updateData.ctaDescription = shared.immersionCta.description;
    updateData.ctaBackgroundImage = shared.immersionCta.backgroundImage;
  }

  // FAQ
  if (shared.faq) {
    updateData.faqLabel = shared.faq.label;
    updateData.faqHeading = shared.faq.heading;
    updateData.faqDescription = shared.faq.description;
    updateData.faqItems = (shared.faq.items || []).map((item: any) => ({
      question: item.question,
      answer: item.answer,
    }));
  }

  // Testimonials
  if (shared.testimonials) {
    updateData.testimonialsLabel = shared.testimonials.label;
    updateData.testimonialsHeading = shared.testimonials.heading;
    updateData.testimonialsDescription = shared.testimonials.description;
    updateData.testimonialItems = (shared.testimonials.items || []).map(
      (item: any) => ({
        quote: item.quote,
        author: item.author,
        location: item.location || "",
        rating: item.rating || 5,
      }),
    );
  }

  // Footer
  if (shared.footer) {
    updateData.footerPousadaLinks = shared.footer.pousadaLinks || [];
    updateData.footerExperienciasLinks = shared.footer.experienciasLinks || [];
    updateData.footerLegalLinks = shared.footer.legalLinks || [];
    updateData.footerCopyright = shared.footer.copyright || "";
  }

  // Home Hero
  if (shared.homeHero) {
    updateData.homeHeroHeading = shared.homeHero.heading;
    updateData.homeHeroSubtitle = shared.homeHero.subtitle;
    updateData.homeHeroBookingHeading = shared.homeHero.bookingHeading;
    updateData.homeHeroBookingDescription = shared.homeHero.bookingDescription;
  }

  // Home Manifesto
  if (shared.homeManifesto) {
    updateData.homeManifestoLabel = shared.homeManifesto.label;
    updateData.homeManifestoDetailsButtonLabel =
      shared.homeManifesto.detailsButtonLabel;
    updateData.homeManifestoSegments = (
      shared.homeManifesto.segments || []
    ).map((seg: any) => ({
      type: seg.type,
      content: seg.content || "",
    }));
  }

  // Keep legacy JSON too for backward compat
  updateData.sharedSections = shared;

  await payload.updateGlobal({
    slug: "site-settings",
    data: updateData,
  });

  console.log("SiteSettings structured fields populated.");
}
```

**Step 4: Run the seed import**

Run: `cd c:/Itaicy/Replit/itaicypantanal && npm --prefix payload-cms run seed 2>&1 | tail -20`
Expected: All posts/species upserted + "SiteSettings structured fields populated."

**Step 5: Commit**

```bash
git add payload-cms/src/scripts/importSeed.ts
git commit -m "feat(seed): migrate shared sections to structured SiteSettings fields

Seed import now populates FAQ array, testimonial array, footer link arrays,
home hero fields, and manifesto segments in addition to legacy JSON blob.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Phase 4: Verify Full Integration

### Task 9: Delete SQLite database and re-seed from scratch

**Step 1: Remove old database**

Run: `rm -f c:/Itaicy/Replit/itaicypantanal/payload-cms/payload.db`

**Step 2: Start Payload to create fresh schema**

Run: `cd c:/Itaicy/Replit/itaicypantanal/payload-cms && timeout 30 npx next dev -p 3001 2>&1 | tail -20` (let it initialize then Ctrl+C)

**Step 3: Run full seed import**

Run: `cd c:/Itaicy/Replit/itaicypantanal && npm --prefix payload-cms run seed`

**Step 4: Verify data in admin**

Run: `cd c:/Itaicy/Replit/itaicypantanal/payload-cms && npx next dev -p 3001` and navigate to http://127.0.0.1:3001/admin

Checklist:
- [ ] Login works with owner credentials
- [ ] Itaicy logo appears on login page
- [ ] Icon shows in sidebar
- [ ] Welcome banner appears on dashboard
- [ ] Brand colors visible (cream bg, green accents)
- [ ] Blog Posts list shows all 9+ articles
- [ ] Blog Post edit shows Blocks field with visual block picker
- [ ] Bird Species list shows all 9 species
- [ ] SiteSettings FAQ tab shows array of Q&A items
- [ ] SiteSettings Testimonials tab shows depoimentos
- [ ] SiteSettings Footer tab shows link arrays

**Step 5: Commit**

```bash
git commit --allow-empty -m "chore: verify fresh seed import with new schema

All collections populated, structured fields working, admin branding applied.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 10: Start both servers and verify end-to-end integration

**Step 1: Start Payload CMS**

Run (terminal 1): `cd c:/Itaicy/Replit/itaicypantanal/payload-cms && npx next dev -p 3001`

**Step 2: Start Express+Vite frontend with CMS URL**

Run (terminal 2): `cd c:/Itaicy/Replit/itaicypantanal && PAYLOAD_CMS_BASE_URL=http://127.0.0.1:3001 npm run dev`

**Step 3: Verify CMS source**

Run: `curl -s http://127.0.0.1:5000/api/cms/source | head -5`
Expected: `{"source":"payload"}`

**Step 4: Verify blog endpoint**

Run: `curl -s http://127.0.0.1:5000/api/cms/blog | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'Posts: {len(d.get(\"posts\",[]))}, Details: {len(d.get(\"details\",[]))}')" 2>&1`
Expected: `Posts: 9+, Details: 1+`

**Step 5: Verify shared sections endpoint**

Run: `curl -s http://127.0.0.1:5000/api/cms/shared | python3 -c "import sys,json; d=json.load(sys.stdin); s=d.get('shared',{}); print(f'FAQ items: {len(s.get(\"faq\",{}).get(\"items\",[]))}, Testimonials: {len(s.get(\"testimonials\",{}).get(\"items\",[]))}')" 2>&1`
Expected: `FAQ items: 5+, Testimonials: 3+`

**Step 6: Verify frontend renders CMS data**

Open http://127.0.0.1:5000 in browser:
- [ ] Home page loads with hero text from CMS
- [ ] FAQ section shows items
- [ ] Footer shows correct links
- [ ] /blog shows articles from CMS
- [ ] /observacao-de-aves/catalogo shows species from CMS
- [ ] Blog article page renders content blocks

**Step 7: Verify CMS edit → frontend update cycle**

1. In admin (port 3001), edit a FAQ question text
2. Wait 30 seconds (cache TTL)
3. Refresh frontend — should see updated text

**Step 8: Commit**

```bash
git add -A
git commit -m "chore: verify end-to-end CMS integration working

Payload CMS serves structured content, Express normalizes it,
frontend renders correctly with 30s cache refresh.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Phase 5: Blog ContentBlocks Visual Quality (Optional Enhancement)

### Task 11: Add admin descriptions and field help text to all collections

**Files:**
- Modify: `payload-cms/src/collections/BlogPosts.ts`
- Modify: `payload-cms/src/collections/BirdSpecies.ts`
- Modify: `payload-cms/src/collections/Pages.ts`

**Step 1: Add Portuguese descriptions to BlogPosts fields**

Add `admin.description` to key fields:

```typescript
// title field
admin: {
  width: "70%",
  description: "Titulo principal do artigo. Aparece no card e na pagina.",
},

// slug field
admin: {
  width: "30%",
  description: "Identificador na URL. Ex: meu-artigo gera /blog/categoria/meu-artigo",
},

// heroImage field
admin: {
  description: "Caminho da imagem do hero. Ex: /images/blog-article-1 (sem extensao, otimizado automaticamente).",
},

// isFeatured
admin: {
  description: "Marque para exibir como artigo principal na pagina do blog.",
},

// isRecent
admin: {
  description: "Marque para exibir na secao 'Mais Recentes' do blog.",
},
```

**Step 2: Add Portuguese descriptions to BirdSpecies fields**

```typescript
// conservationStatus
admin: {
  description: "Status IUCN. Ex: 'Vulneravel (VU)', 'Pouco Preocupante (LC)'",
},

// photographyTips
admin: {
  description: "Dicas praticas para fotografar esta especie no Pantanal.",
},

// isFeatured
admin: {
  description: "Marque para exibir na secao de aves em destaque.",
},
```

**Step 3: Commit**

```bash
git add payload-cms/src/collections/BlogPosts.ts payload-cms/src/collections/BirdSpecies.ts payload-cms/src/collections/Pages.ts
git commit -m "docs(cms): add Portuguese help text to all collection fields

Helps non-technical editors understand each field's purpose.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Summary

| Phase | Tasks | Purpose |
|-------|-------|---------|
| **1: Branding** | Tasks 1-3 | SCSS colors, Logo/Icon components, Welcome banner |
| **2: Structured Fields** | Tasks 4-7 | SiteSettings refactor, Blog Blocks, server normalization |
| **3: Seed Migration** | Task 8 | Update seed import for new field formats |
| **4: Integration** | Tasks 9-10 | Fresh DB, end-to-end verification |
| **5: Polish** | Task 11 | Field descriptions for editor UX |

**Total: 11 tasks, ~30-40 bite-sized steps**

After this plan, the admin will have:
- Itaicy brand colors and logo
- Welcome dashboard with quick links
- Structured FAQ/Testimonials/Footer editing (no more JSON)
- Visual blog content block picker
- Full CMS → frontend data flow verified
- Portuguese help text on all fields
