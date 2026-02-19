# Multilingual i18n Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement PT/EN/ES multilingual support across the entire site using React Context + `LocalizedCopy` pattern; enable the LanguageSwitcher in the header.

**Architecture:** React Context (`useLanguage`) holds current locale. Static UI strings live in `ui-strings.ts`. Page content defaults are expanded to `{ pt, en, es }` objects. `usePageCms` reads locale from context and picks the right defaults. A script auto-translates PT → EN/ES using Claude API.

**Tech Stack:** React 18 + TypeScript + Vite. No external i18n library — reuse the `LocalizedCopy = { pt, en, es }` pattern already in `shared/agent-config.ts`. date-fns v3 for calendar locale.

---

### Task 1: LanguageContext + LanguageProvider + useLanguage

**Files:**
- Create: `client/src/i18n/context.tsx`
- Modify: `client/src/App.tsx`

**Step 1: Create the context file**

```tsx
// client/src/i18n/context.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "pt" | "en" | "es";

const STORAGE_KEY = "itaicy_lang";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "pt",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    return stored && ["pt", "en", "es"].includes(stored) ? stored : "pt";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l === "pt" ? "pt-BR" : l === "es" ? "es" : "en";
  };

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang === "es" ? "es" : "en";
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
```

**Step 2: Wrap App with LanguageProvider in App.tsx**

In `App.tsx`, import `LanguageProvider` and wrap the outermost element:
```tsx
// Add import
import { LanguageProvider } from "@/i18n/context";

// In App() function, wrap MotionProvider:
function App() {
  return (
    <LanguageProvider>
      <MotionProvider>
        ...
      </MotionProvider>
    </LanguageProvider>
  );
}
```

**Step 3: Verify no TypeScript errors**
Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: no errors related to the new files

**Step 4: Commit**
```bash
git add client/src/i18n/context.tsx client/src/App.tsx
git commit -m "feat: LanguageContext + LanguageProvider para i18n (PT/EN/ES)"
```

---

### Task 2: Create ui-strings.ts — all static chrome strings

**Files:**
- Create: `client/src/i18n/ui-strings.ts`

**Step 1: Create the file with all chrome strings**

```ts
// client/src/i18n/ui-strings.ts
import type { Lang } from "./context";

export const ui = {
  nav: {
    pt: {
      home: "Início",
      accommodations: "Hospedagens",
      experiences: "Experiências",
      impact: "Nosso impacto",
      contact: "Contato",
      blog: "Blog",
      reserve: "Reservar",
      // mega menu categories
      megaAccommodations: "Hospedagens",
      megaExperiences: "Experiências",
      megaBlog: "Blog",
      // mega menu items
      culinary: "Culinária",
      culinaryDesc: "Sabores regionais autênticos preparados com ingredientes do Pantanal.",
      accommodationsItem: "Acomodações",
      accommodationsDesc: "Conforto e natureza em harmonia no coração do Pantanal.",
      fishing: "Pesca Esportiva",
      fishingDesc: "Pesca em águas privativas com guias experientes do Pantanal.",
      birdwatching: "Birdwatching",
      birdwatchingDesc: "166 espécies catalogadas em expedições guiadas ao amanhecer.",
      ecotourism: "Ecoturismo",
      ecotourismDesc: "Trilhas, passeios de barco e safáris fotográficos imersivos.",
      wildlife: "Vida Selvagem",
      wildlifeDesc: "Histórias e descobertas da fauna e flora do Pantanal.",
      sustainability: "Sustentabilidade",
      sustainabilityDesc: "Nosso compromisso com a preservação do ecossistema pantaneiro.",
      backToMenu: "Menu",
    },
    en: {
      home: "Home",
      accommodations: "Accommodations",
      experiences: "Experiences",
      impact: "Our Impact",
      contact: "Contact",
      blog: "Blog",
      reserve: "Book Now",
      megaAccommodations: "Accommodations",
      megaExperiences: "Experiences",
      megaBlog: "Blog",
      culinary: "Culinary",
      culinaryDesc: "Authentic regional flavors prepared with Pantanal ingredients.",
      accommodationsItem: "Accommodations",
      accommodationsDesc: "Comfort and nature in harmony at the heart of the Pantanal.",
      fishing: "Sport Fishing",
      fishingDesc: "Fishing in private waters with experienced Pantanal guides.",
      birdwatching: "Birdwatching",
      birdwatchingDesc: "166 catalogued species in guided expeditions at dawn.",
      ecotourism: "Ecotourism",
      ecotourismDesc: "Trails, boat rides and immersive photo safaris.",
      wildlife: "Wildlife",
      wildlifeDesc: "Stories and discoveries of Pantanal fauna and flora.",
      sustainability: "Sustainability",
      sustainabilityDesc: "Our commitment to preserving the Pantanal ecosystem.",
      backToMenu: "Menu",
    },
    es: {
      home: "Inicio",
      accommodations: "Alojamiento",
      experiences: "Experiencias",
      impact: "Nuestro Impacto",
      contact: "Contacto",
      blog: "Blog",
      reserve: "Reservar",
      megaAccommodations: "Alojamiento",
      megaExperiences: "Experiencias",
      megaBlog: "Blog",
      culinary: "Gastronomía",
      culinaryDesc: "Sabores regionales auténticos elaborados con ingredientes del Pantanal.",
      accommodationsItem: "Alojamiento",
      accommodationsDesc: "Confort y naturaleza en armonía en el corazón del Pantanal.",
      fishing: "Pesca Deportiva",
      fishingDesc: "Pesca en aguas privadas con guías expertos del Pantanal.",
      birdwatching: "Avistamiento de Aves",
      birdwatchingDesc: "166 especies catalogadas en expediciones guiadas al amanecer.",
      ecotourism: "Ecoturismo",
      ecotourismDesc: "Senderos, paseos en bote y safaris fotográficos inmersivos.",
      wildlife: "Vida Silvestre",
      wildlifeDesc: "Historias y descubrimientos de la fauna y flora del Pantanal.",
      sustainability: "Sostenibilidad",
      sustainabilityDesc: "Nuestro compromiso con la preservación del ecosistema pantanero.",
      backToMenu: "Menú",
    },
  },
  booking: {
    pt: {
      checkIn: "Check-in",
      checkOut: "Check-out",
      guests: "Hóspedes",
      adults: "Adultos",
      children: "Crianças",
      reserve: "Reservar",
      selectDate: "Selecionar data",
      nights: "noite",
      nightsPlural: "noites",
    },
    en: {
      checkIn: "Check-in",
      checkOut: "Check-out",
      guests: "Guests",
      adults: "Adults",
      children: "Children",
      reserve: "Book",
      selectDate: "Select date",
      nights: "night",
      nightsPlural: "nights",
    },
    es: {
      checkIn: "Llegada",
      checkOut: "Salida",
      guests: "Huéspedes",
      adults: "Adultos",
      children: "Niños",
      reserve: "Reservar",
      selectDate: "Seleccionar fecha",
      nights: "noche",
      nightsPlural: "noches",
    },
  },
  footer: {
    pt: {
      rights: "Todos os direitos reservados.",
      privacy: "Política de Privacidade",
    },
    en: {
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
    },
    es: {
      rights: "Todos los derechos reservados.",
      privacy: "Política de Privacidad",
    },
  },
  common: {
    pt: {
      learnMore: "Saber mais",
      seeAll: "Ver todos",
      bookNow: "Reservar agora",
      checkAvailability: "Verificar disponibilidade",
      scrollDown: "Deslize para baixo",
      backToTop: "Voltar ao topo",
      backToHome: "Voltar para o início",
      loading: "Carregando...",
    },
    en: {
      learnMore: "Learn more",
      seeAll: "See all",
      bookNow: "Book now",
      checkAvailability: "Check availability",
      scrollDown: "Scroll down",
      backToTop: "Back to top",
      backToHome: "Back to home",
      loading: "Loading...",
    },
    es: {
      learnMore: "Saber más",
      seeAll: "Ver todos",
      bookNow: "Reservar ahora",
      checkAvailability: "Verificar disponibilidad",
      scrollDown: "Desliza hacia abajo",
      backToTop: "Volver arriba",
      backToHome: "Volver al inicio",
      loading: "Cargando...",
    },
  },
} as const;

export function t<
  Section extends keyof typeof ui,
  Key extends keyof (typeof ui)[Section]["pt"],
>(section: Section, key: Key, lang: Lang): string {
  return (ui[section][lang] as Record<string, string>)[key as string]
    ?? (ui[section]["pt"] as Record<string, string>)[key as string]
    ?? String(key);
}
```

**Step 2: Verify TypeScript**
Run: `npx tsc --noEmit 2>&1 | head -20`

**Step 3: Commit**
```bash
git add client/src/i18n/ui-strings.ts
git commit -m "feat: ui-strings.ts com strings de chrome em PT/EN/ES"
```

---

### Task 3: Wire LanguageSwitcher + NavHeader

**Files:**
- Modify: `client/src/components/LanguageSwitcher.tsx`
- Modify: `client/src/components/NavHeader.tsx`

**Step 1: Update LanguageSwitcher to use context**

Replace internal `activeLanguage` state with context. Add `onLanguageChange` callback:

```tsx
// Remove: const [activeLanguage, setActiveLanguage] = useState("pt");
// Add:
import { useLanguage } from "@/i18n/context";
// Inside component:
const { lang: activeLanguage, setLang } = useLanguage();
// In onClick:
onClick={() => { setLang(lang.code as "pt"|"en"|"es"); onOpenChange(false); }}
```

**Step 2: Update NavHeader**

- Import `useLanguage` and `t` from i18n
- Change hardcoded `"PT"` button label → `lang.toUpperCase()`
- Translate `navigationItems` labels using `t("nav", ..., lang)`
- Translate `menuData` entries using `t("nav", ..., lang)`
- Keep `href` values the same (URLs stay PT for now)

The `navigationItems` and `menuData` should be computed inside the component using `lang`:
```tsx
const { lang } = useLanguage();
const navItems = [
  { label: t("nav", "home", lang), active: true, hasDropdown: false, href: "/" },
  { label: t("nav", "accommodations", lang), ... href: "/acomodacoes" },
  { label: t("nav", "experiences", lang), ... href: "/ecoturismo" },
  { label: t("nav", "impact", lang), ... href: "/nosso-impacto" },
  { label: t("nav", "contact", lang), ... href: "/contato" },
  { label: t("nav", "blog", lang), ... href: "/blog" },
];
```

And for the `menuData`:
```tsx
const localMenuData = {
  [t("nav", "accommodations", lang)]: {
    label: t("nav", "megaAccommodations", lang),
    items: [
      { title: t("nav", "culinary", lang), description: t("nav", "culinaryDesc", lang), image: "/images/nav/menu-culinaria.webp", href: "/culinaria" },
      { title: t("nav", "accommodationsItem", lang), description: t("nav", "accommodationsDesc", lang), image: "/images/nav/menu-acomodacoes.webp", href: "/acomodacoes" },
    ],
  },
  [t("nav", "experiences", lang)]: {
    label: t("nav", "megaExperiences", lang),
    items: [
      { title: t("nav", "fishing", lang), description: t("nav", "fishingDesc", lang), image: "/images/nav/menu-pesca.webp", href: "/pesca" },
      { title: t("nav", "birdwatching", lang), description: t("nav", "birdwatchingDesc", lang), image: "/images/nav/menu-birdwatching.webp", href: "/observacao-de-aves" },
      { title: t("nav", "ecotourism", lang), description: t("nav", "ecotourismDesc", lang), image: "/images/nav/menu-ecoturismo.webp", href: "/ecoturismo" },
    ],
  },
  [t("nav", "blog", lang)]: {
    label: t("nav", "megaBlog", lang),
    items: [
      { title: t("nav", "wildlife", lang), description: t("nav", "wildlifeDesc", lang), image: "/images/nav/menu-vida-selvagem.webp", href: "/blog" },
      { title: t("nav", "sustainability", lang), description: t("nav", "sustainabilityDesc", lang), image: "/images/nav/menu-sustentabilidade.webp", href: "/blog" },
    ],
  },
};
```

Also update the GoldButton "Reservar" → `t("nav", "reserve", lang)`.

**Step 3: TypeScript check**
Run: `npx tsc --noEmit 2>&1 | head -30`

**Step 4: Commit**
```bash
git add client/src/components/LanguageSwitcher.tsx client/src/components/NavHeader.tsx
git commit -m "feat: LanguageSwitcher e NavHeader usam LanguageContext — switcher funcional"
```

---

### Task 4: Update usePageCms to be locale-aware

**Files:**
- Modify: `client/src/lib/cms/page-content.ts`

**Step 1: Update the hook signature and logic**

```ts
// client/src/lib/cms/page-content.ts
import { useEffect, useState } from "react";
import type { PageContentMap } from "@shared/cms-page-content";
import { useLanguage, type Lang } from "@/i18n/context";

export type LocalizedDefaults<K extends keyof PageContentMap> = Record<Lang, PageContentMap[K]>;

const pageCache = new Map<string, unknown>();
const pagePromises = new Map<string, Promise<unknown>>();

async function fetchPageContent<K extends keyof PageContentMap>(
  slug: K,
): Promise<PageContentMap[K] | null> {
  const apiSlug = slug === "/" ? "home" : (slug as string).replace(/^\//, "");
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
  defaults: LocalizedDefaults<K>,
): PageContentMap[K] {
  const { lang } = useLanguage();
  const localDefault = defaults[lang] ?? defaults.pt;
  const [content, setContent] = useState<PageContentMap[K]>(localDefault);

  useEffect(() => {
    if (import.meta.env.MODE === "test") return;

    // For non-PT, always use frontend translations (CMS is PT-only for now)
    if (lang !== "pt") {
      setContent(defaults[lang] ?? defaults.pt);
      return;
    }

    // For PT: fetch from CMS with fallback to PT defaults
    const cacheKey = slug as string;

    if (pageCache.has(cacheKey)) {
      setContent(pageCache.get(cacheKey) as PageContentMap[K]);
      return;
    }

    let mounted = true;
    let promise = pagePromises.get(cacheKey) as Promise<PageContentMap[K] | null> | undefined;
    if (!promise) {
      promise = fetchPageContent(slug);
      pagePromises.set(cacheKey, promise);
    }

    promise.then((data) => {
      if (data && mounted) {
        pageCache.set(cacheKey, data);
        setContent(data);
      }
    }).finally(() => {
      pagePromises.delete(cacheKey);
    });

    return () => { mounted = false; };
  }, [slug, lang]);

  return content;
}
```

Note: cache key stays as `slug` for PT (CMS content). Non-PT goes straight to defaults.

**Step 2: Check for TypeScript errors**
Run: `npx tsc --noEmit 2>&1 | head -30`

**Step 3: Commit**
```bash
git add client/src/lib/cms/page-content.ts
git commit -m "feat: usePageCms lê idioma do contexto — EN/ES usa defaults, PT usa CMS"
```

---

### Task 5: Translation script — generate EN/ES for all page defaults

**Files:**
- Create: `scripts/translate-defaults.ts`

**Step 1: Create the translation script**

```ts
// scripts/translate-defaults.ts
// Usage: ANTHROPIC_API_KEY=xxx npx tsx scripts/translate-defaults.ts
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a professional translator for Itaicy Pantanal Eco Lodge, a luxury eco-lodge in the Brazilian Pantanal (Miranda, Mato Grosso do Sul).
You translate website content from Brazilian Portuguese to English and Spanish.

Rules:
- Keep translations natural and evocative for eco-tourism marketing
- Keep all property names as-is: "Itaicy", "Pantanal", "Rio Negro", "Tuiuiú", "Arara-Azul"
- Keep species names: "pintado", "pacu", "dourado"
- Keep place names: "Miranda", "Campo Grande", "Bonito", "Serra de Maracaju"
- Keep certification references: "IBAMA", "UNESCO", "LATAM", "Gol", "Azul"
- Keep numbers, FAQs ids, icon names, image paths EXACTLY as-is
- "cota zero" → "catch-and-release" (en) / "cuota cero" (es)
- "pensão completa" → "full board" (en) / "pensión completa" (es)
- Return ONLY valid JSON, no markdown, no explanation
- Translate all string values recursively; skip numbers, booleans, arrays of non-strings
`;

async function translateObject(obj: unknown, targetLang: "en" | "es"): Promise<unknown> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    system: SYSTEM_PROMPT,
    messages: [{
      role: "user",
      content: `Translate this JSON object from Portuguese to ${targetLang === "en" ? "English" : "Spanish"}. Return ONLY the translated JSON:\n\n${JSON.stringify(obj, null, 2)}`,
    }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`No JSON in response for ${targetLang}`);
  return JSON.parse(jsonMatch[0]);
}

// Import all defaults dynamically
const DEFAULTS_FILES = [
  { name: "home", file: "../client/src/pages/home-defaults.ts", export: "homeDefaults" },
  { name: "acomodacoes", file: "../client/src/pages/acomodacoes-defaults.ts", export: "acomodacoesDefaults" },
  { name: "birdwatching", file: "../client/src/pages/birdwatching-defaults.ts", export: "birdwatchingDefaults" },
  { name: "pesca", file: "../client/src/pages/pesca-defaults.ts", export: "pescaDefaults" },
  { name: "culinaria", file: "../client/src/pages/culinaria-defaults.ts", export: "culinariaDefaults" },
  { name: "ecoturismo", file: "../client/src/pages/ecoturismo-defaults.ts", export: "ecoturismoDefaults" },
  { name: "contato", file: "../client/src/pages/contato-defaults.ts", export: "contatoDefaults" },
  { name: "nosso-impacto", file: "../client/src/pages/nosso-impacto-defaults.ts", export: "nossoImpactoDefaults" },
  { name: "privacidade", file: "../client/src/pages/privacidade-defaults.ts", export: "privacidadeDefaults" },
  { name: "regiao", file: "../client/src/pages/regiao-defaults.ts", export: "regiaoDefaults" },
  { name: "not-found", file: "../client/src/pages/not-found-defaults.ts", export: "notFoundDefaults" },
];

async function main() {
  const outDir = path.join(__dirname, "../client/src/i18n/translations");
  fs.mkdirSync(outDir, { recursive: true });

  for (const { name, file, export: exportName } of DEFAULTS_FILES) {
    console.log(`Translating ${name}...`);
    const mod = await import(path.join(__dirname, file));
    const ptContent = mod[exportName];

    const [enContent, esContent] = await Promise.all([
      translateObject(ptContent, "en"),
      translateObject(ptContent, "es"),
    ]);

    const output = {
      pt: ptContent,
      en: enContent,
      es: esContent,
    };

    fs.writeFileSync(
      path.join(outDir, `${name}.json`),
      JSON.stringify(output, null, 2),
      "utf-8",
    );
    console.log(`  ✓ ${name}.json written`);
  }

  console.log("\nAll translations complete! Files in client/src/i18n/translations/");
}

main().catch(console.error);
```

**Step 2: Run the script**
```bash
cd C:/Itaicy/Replit/itaicypantanal
ANTHROPIC_API_KEY=$(grep ANTHROPIC_API_KEY .env | cut -d= -f2) npx tsx scripts/translate-defaults.ts
```

**Step 3: Verify output**
Check that `client/src/i18n/translations/` contains 11 JSON files, each with `pt`, `en`, `es` keys.

**Step 4: Commit**
```bash
git add scripts/translate-defaults.ts client/src/i18n/translations/
git commit -m "feat: script de tradução automática + translations JSON gerados para 11 páginas"
```

---

### Task 6: Update all *-defaults.ts to export { pt, en, es }

**Files:**
- Modify: all 11 `client/src/pages/*-defaults.ts` files

**Pattern for each file** (example: home-defaults.ts):
```ts
// BEFORE:
import type { HomePageContent } from "@shared/cms-page-content";
export const homeDefaults: HomePageContent = { ... }

// AFTER:
import type { HomePageContent } from "@shared/cms-page-content";
import translations from "@/i18n/translations/home.json";
import type { LocalizedDefaults } from "@/lib/cms/page-content";

export const homeDefaults: LocalizedDefaults<"/"> = {
  pt: translations.pt as HomePageContent,
  en: translations.en as HomePageContent,
  es: translations.es as HomePageContent,
};
```

Apply this pattern to all 11 defaults files. The JSON import provides the content.

**Step 2: TypeScript check**
Run: `npx tsc --noEmit 2>&1 | head -30`

**Step 3: Commit**
```bash
git add client/src/pages/*-defaults.ts
git commit -m "feat: todos os *-defaults.ts expandidos para { pt, en, es } via JSON translations"
```

---

### Task 7: Update page components to use new defaults format

**Files:**
- Modify: `Desktop.tsx`, `Acomodacoes.tsx`, `BirdWatching.tsx`, `Pesca.tsx`, `Culinaria.tsx`, `Ecoturismo.tsx`, `contato/index.tsx`, `NossoImpacto.tsx`, `Privacidade.tsx`, `Regiao.tsx`, `not-found/index.tsx`

The `usePageCms` signature changed from `(slug, PageContentMap[K])` to `(slug, Record<Lang, PageContentMap[K]>)`. Since the defaults files now export the multilingual object, each page just needs to pass the new format.

Each call site is already correct because the defaults files now export `{ pt, en, es }` objects. The only change needed is REMOVING the explicit type annotation from the import if any page does `homeDefaults as HomePageContent`.

**Verify all pass TypeScript:**
Run: `npx tsc --noEmit 2>&1 | head -50`

**Run tests:**
Run: `npx vitest run 2>&1 | tail -15`
Expected: all 94 tests pass

**Commit:**
```bash
git add client/src/pages/
git commit -m "feat: páginas usam defaults multilingues — conteúdo muda com idioma selecionado"
```

---

### Task 8: BookingDatePicker — dynamic date-fns locale

**Files:**
- Modify: `client/src/components/BookingDatePicker.tsx`

**Step 1: Import all three locales and use context**

```ts
import { ptBR } from "date-fns/locale/pt-BR";
import { enUS } from "date-fns/locale/en-US";
import { es } from "date-fns/locale/es";
import { useLanguage } from "@/i18n/context";

// Inside component:
const { lang } = useLanguage();
const dateLocale = lang === "en" ? enUS : lang === "es" ? es : ptBR;

// Pass to DayPicker:
<DayPicker locale={dateLocale} ... />
```

Apply to both DayPicker instances in the file (hero variant and CTA variant).

**Step 2: TypeScript check + commit**
```bash
git add client/src/components/BookingDatePicker.tsx
git commit -m "feat: BookingDatePicker usa locale dinâmico (ptBR/enUS/es) baseado no idioma"
```

---

### Task 9: Blog and bird category UI strings

**Files:**
- Modify: `client/src/pages/blog/data.ts`
- Modify: `client/src/pages/birdwatching/data.ts`

**Step 1: Add category translations to ui-strings.ts**

Add to `ui-strings.ts`:
```ts
categories: {
  pt: {
    all: "Todas",
    blog: {
      adventure: "Aventura", gastronomy: "Gastronomia", conservation: "Conservação",
      birdwatching: "Observação de Aves", fishing: "Pesca", ecotourism: "Ecoturismo",
      culture: "Cultura",
    },
    birds: {
      all: "Todas", parrot: "Papagaio", aquatic: "Aquáticas",
      migratory: "Migratórias", nocturnal: "Noturno Perto",
    },
  },
  en: {
    all: "All",
    blog: {
      adventure: "Adventure", gastronomy: "Gastronomy", conservation: "Conservation",
      birdwatching: "Birdwatching", fishing: "Fishing", ecotourism: "Ecotourism",
      culture: "Culture",
    },
    birds: {
      all: "All", parrot: "Parrots", aquatic: "Aquatic",
      migratory: "Migratory", nocturnal: "Nocturnal",
    },
  },
  es: {
    all: "Todas",
    blog: {
      adventure: "Aventura", gastronomy: "Gastronomía", conservation: "Conservación",
      birdwatching: "Avistamiento de Aves", fishing: "Pesca", ecotourism: "Ecoturismo",
      culture: "Cultura",
    },
    birds: {
      all: "Todas", parrot: "Loros", aquatic: "Acuáticas",
      migratory: "Migratorias", nocturnal: "Nocturnas",
    },
  },
},
```

**Step 2: Update blog/data.ts category display**

The `slugToCategoryMap` stays in PT (used for URL lookups). Add a `getCategoryLabel(slug, lang)` helper:
```ts
export function getCategoryLabel(slug: string, lang: Lang): string {
  const ptLabel = slugToCategoryMap[slug] ?? slug;
  if (lang === "pt") return ptLabel;
  // Map PT label to translation key
  const categoryKey = Object.entries(categorySlugMap).find(([label]) => label === ptLabel)?.[0];
  if (!categoryKey) return ptLabel;
  return t("categories", "blog" as never, lang); // use ui helper
}
```

Note: URL slugs stay PT-based (e.g. `/blog/aventura/slug`) for now. Only display labels translate.

**Step 3: Update birdwatching/data.ts category display**
Same pattern — add `getBirdCategoryLabel(cat, lang)` helper.

**Step 4: Commit**
```bash
git add client/src/i18n/ui-strings.ts client/src/pages/blog/data.ts client/src/pages/birdwatching/data.ts
git commit -m "feat: categorias de blog e aves traduzidas em PT/EN/ES"
```

---

### Task 10: Final wiring — App.tsx lang update + og:locale

**Files:**
- Modify: `client/src/pages/PageMeta.tsx` (if exists) or where og:locale is set

**Step 1: Update og:locale dynamically**

If `PageMeta.tsx` exists with hardcoded `og:locale = "pt_BR"`:
```tsx
import { useLanguage } from "@/i18n/context";
const { lang } = useLanguage();
const ogLocale = lang === "en" ? "en_US" : lang === "es" ? "es_ES" : "pt_BR";
// <meta property="og:locale" content={ogLocale} />
```

**Step 2: Run full test suite**
Run: `npx vitest run 2>&1 | tail -20`
Expected: all 94 tests pass

**Step 3: Build check**
Run: `npx vite build 2>&1 | tail -10`
Expected: successful build, no errors

**Step 4: Final commit**
```bash
git add -A
git commit -m "feat: og:locale dinâmico + i18n PT/EN/ES completo — switcher funcional em toda a app"
```
