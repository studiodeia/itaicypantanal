# Owner Photo Highlights Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Show only birds with João Vitor Andriola's own photos in the highlight ("destaque") slots on the Home page (BirdServicesSection — 4 cards) and the Bird Catalog page (FeaturedBirdsSection — 2 large cards).

**Architecture:** Add a `hasOwnerPhoto` boolean flag to the `BirdSpecies` interface, add 6 new charismatic bird entries that have owner photos, update `featuredBirds` to use only owner-photo birds, and sort `BirdServicesSection` to show owner-photo birds first. Image paths follow the existing `slug-image-map.json` convention: `/images/birds/{slug}`. Actual image files (WebP/AVIF) must be placed by the client; a placeholder fallback handles missing files gracefully.

**Tech Stack:** TypeScript, React 18, Vitest + RTL, Wouter, Tailwind 3

---

## Context: What We Know

### Files touched
- Modify: `client/src/pages/birdwatching/data.ts`
- Modify: `client/src/pages/birdwatching/sections/BirdServicesSection.tsx`
- Modify: `client/src/pages/birdwatching/sections/FeaturedBirdsSection.tsx`
- Modify: `client/src/pages/birdwatching/sections/BirdServicesSection.test.tsx`
- Create: `client/src/pages/birdwatching/sections/FeaturedBirdsSection.test.tsx`

### Cross-reference: current 9 birds vs photo-mapping.json

| Bird in data.ts | Scientific name | Has owner photo | Owner slug (slug-image-map) |
|---|---|---|---|
| Arara-Azul | Anodorhynchus hyacinthinus | ❌ NO | — |
| João-pinto | Icterus croconotus | ✅ YES | `joao-pinto` |
| Anhinga | Anhinga anhinga | ✅ YES | `biguatinga` (rename needed) |
| Tuiuiú | Jabiru mycteria | ✅ YES | `tuiuiu` |
| Arara-Vermelha | Ara chloropterus | ❌ NO | — |
| Garça-Branca-Grande | Ardea alba | ❌ NO | — |
| Colhereiro | Platalea ajaja | ❌ NO | — |
| Gavião-Real | Harpia harpyja | ❌ NO | — |
| Urutau | Nyctibius griseus | ❌ NO | — |

### New owner-photo birds to add (from photo-mapping.json)

| commonName | scientificName | slug | Photo file |
|---|---|---|---|
| Arara-Canindé | Ara ararauna | `arara-caninde` | `Ara-ararauna_arara-caninde_IMG2577.jpg` |
| Martim-Pescador-Grande | Megaceryle torquata | `martim-pescador-grande` | `Megaceryle-torquata_martim-pescador-grande_IMG1433.jpg` |
| Araçari-Castanho | Pteroglossus castanotis | `aracari-castanho` | `Pteroglossus-castanotis_aracari-castanho_IMG2684.jpg` |
| Garça-Azul | Egretta caerulea | `garca-azul` | `Egretta-caerulea_garca-azul_IMG2160.jpg` |
| Gavião-Belo | Busarellus nigricollis | `gaviao-belo` | `Busarellus-nigricollis_gaviao-belo_IMG2132.jpg` |
| Águia-Pescadora | Pandion haliaetus | `aguia-pescadora` | `Pandion-haliaetus_aguia-pescadora_IMG1633.jpg` |

After this plan, we'll have **9 owner-photo birds** in allBirds — enough for both highlight sections with margin.

### Image path convention (already established in slug-image-map.json)
- Pattern: `/images/birds/{slug}` (BirdImage component appends `.webp`/`.avif`)
- Fallback: `bird-placeholder.webp` (already handled by BirdImage component)
- ⚠️ **Note for client:** The actual processed image files (WebP + AVIF) must be placed at `client/public/images/birds/{slug}.webp` and `.avif`. Use the originals from `scripts/bird-enrichment/data/` filenames listed above. Run through `sharp` or Squoosh to convert and resize to ~1200×800px.

---

## Task 1: Add `hasOwnerPhoto` flag to `BirdSpecies` interface

**Files:**
- Modify: `client/src/pages/birdwatching/data.ts:1-13`

**Step 1: Write a failing test that imports `BirdSpecies` and checks the new field exists**

Create test file at `client/src/pages/birdwatching/data.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { allBirds, getOwnerPhotoBirds } from "./data";

describe("BirdSpecies hasOwnerPhoto", () => {
  it("allBirds contains birds with hasOwnerPhoto: true", () => {
    const owned = allBirds.filter((b) => b.hasOwnerPhoto === true);
    expect(owned.length).toBeGreaterThanOrEqual(8);
  });

  it("getOwnerPhotoBirds returns only birds with hasOwnerPhoto: true", () => {
    const owned = getOwnerPhotoBirds();
    expect(owned.every((b) => b.hasOwnerPhoto === true)).toBe(true);
    expect(owned.length).toBeGreaterThanOrEqual(8);
  });

  it("owner-photo birds have photoCredit set to João Vitor Andriola", () => {
    const owned = getOwnerPhotoBirds();
    owned.forEach((b) => {
      expect(b.photoCredit).toContain("João Vitor Andriola");
    });
  });

  it("owner-photo birds use /images/birds/ path convention", () => {
    const owned = getOwnerPhotoBirds();
    owned.forEach((b) => {
      expect(b.src).toMatch(/^\/images\/birds\//);
    });
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- data.test
```
Expected: FAIL — `getOwnerPhotoBirds is not a function`, `hasOwnerPhoto` missing

**Step 3: Add `hasOwnerPhoto` to the interface and export `getOwnerPhotoBirds`**

In `client/src/pages/birdwatching/data.ts`, update the `BirdSpecies` interface:

```typescript
export interface BirdSpecies {
  slug: string;
  commonName: string;
  scientificName: string;
  description: string;
  category: string;
  tag: string;
  src: string;
  author: string;
  date: string;
  photoCredit?: string;
  photoLicense?: string;
  hasOwnerPhoto?: boolean;        // true = João Vitor Andriola's own photo
}
```

Add the helper at the bottom of data.ts (before or after the detail exports):

```typescript
/** Returns all birds that have a João Vitor Andriola owner photo */
export function getOwnerPhotoBirds(): BirdSpecies[] {
  return allBirds.filter((b) => b.hasOwnerPhoto === true);
}
```

**Step 4: Run test to verify it passes**

```bash
npm test -- data.test
```
Expected: PASS (at least the interface/function tests — others will pass after Task 2–3)

**Step 5: Commit**

```bash
git add client/src/pages/birdwatching/data.ts client/src/pages/birdwatching/data.test.ts
git commit -m "feat(birds): add hasOwnerPhoto flag to BirdSpecies interface"
```

---

## Task 2: Update existing 3 owner-photo birds + rename Anhinga → Biguatinga

**Files:**
- Modify: `client/src/pages/birdwatching/data.ts`

The "Anhinga" entry uses slug `anhinga` but the photo-mapping and slug-image-map use `biguatinga` (the correct Portuguese common name). We need to rename it. Also update `tuiuiuDetail.relatedSlugs` which references `"anhinga"`.

**Step 1: Update `allBirds` entries for the 3 owner-photo birds**

Replace the `joao-pinto` entry:
```typescript
{
  slug: "joao-pinto",
  commonName: "João-pinto",
  scientificName: "Icterus croconotus",
  description:
    "O João-pinto é um ícone colorido do Pantanal, com plumagem laranja-vibrante contrastando com preto e branco. Frequente em matas ciliares e beiras de lagoa.",
  category: "Noturno Perto",
  tag: "Fauna",
  src: "/images/birds/joao-pinto",
  author: "João Vitor Andriola",
  date: "09 de Agosto, 2025",
  photoCredit: "João Vitor Andriola",
  hasOwnerPhoto: true,
},
```

Replace the `anhinga` entry (rename slug + use correct Portuguese name):
```typescript
{
  slug: "biguatinga",
  commonName: "Biguatinga",
  scientificName: "Anhinga anhinga",
  description:
    "Conhecida como o 'peixe-espeto', a biguatinga possui pescoço longo e é uma exímia mergulhadora, encontrada frequentemente em rios e lagoas do Pantanal.",
  category: "Aquáticas",
  tag: "Fauna",
  src: "/images/birds/biguatinga",
  author: "João Vitor Andriola",
  date: "09 de Agosto, 2025",
  photoCredit: "João Vitor Andriola",
  hasOwnerPhoto: true,
},
```

Replace the `tuiuiu` entry in `allBirds` (there are two copies — one in `featuredBirds`, one in `allBirds`; update both):
```typescript
{
  slug: "tuiuiu",
  commonName: "Tuiuiú",
  scientificName: "Jabiru mycteria",
  description:
    "Símbolo do Pantanal, o tuiuiú é a maior cegonha das Américas e um importante indicador da saúde do ecossistema. Sua presença é sempre um espetáculo.",
  category: "Aquáticas",
  tag: "Fauna",
  src: "/images/birds/tuiuiu",
  author: "João Vitor Andriola",
  date: "09 de Agosto, 2025",
  photoCredit: "João Vitor Andriola",
  hasOwnerPhoto: true,
},
```

**Step 2: Fix `tuiuiuDetail.relatedSlugs`**

The `tuiuiuDetail` currently has `relatedSlugs: ["arara-azul", "anhinga", "garca-branca-grande"]`. Update to replace `"anhinga"` with `"biguatinga"`:

```typescript
relatedSlugs: ["arara-azul", "biguatinga", "garca-branca-grande"],
```

**Step 3: Run the data tests**

```bash
npm test -- data.test
```
Expected: PASS all 4 tests (now we have at least 3 owner-photo birds — the remaining tests will pass fully after Task 3)

**Step 4: Commit**

```bash
git add client/src/pages/birdwatching/data.ts
git commit -m "feat(birds): mark João-pinto, Biguatinga, Tuiuiú with hasOwnerPhoto + rename Anhinga→Biguatinga"
```

---

## Task 3: Add 6 new charismatic owner-photo birds to `allBirds`

**Files:**
- Modify: `client/src/pages/birdwatching/data.ts`

**Step 1: Add 6 new birds to the `allBirds` array**

Append the following entries to the `allBirds` array (keep existing 9 entries, add after them):

```typescript
  // --- Owner-photo birds (João Vitor Andriola) ---
  {
    slug: "arara-caninde",
    commonName: "Arara-Canindé",
    scientificName: "Ara ararauna",
    description:
      "Com plumagem azul-turquesa e amarelo-solar, a arara-canindé é uma das aves mais fotogênicas do Pantanal. Vive em casais e ninifica em ocos de árvores nativas.",
    category: "Papagaio",
    tag: "Fauna",
    src: "/images/birds/arara-caninde",
    author: "João Vitor Andriola",
    date: "09 de Agosto, 2025",
    photoCredit: "João Vitor Andriola",
    hasOwnerPhoto: true,
  },
  {
    slug: "martim-pescador-grande",
    commonName: "Martim-Pescador-Grande",
    scientificName: "Megaceryle torquata",
    description:
      "O maior martim-pescador das Américas. Sua plumagem azul-acinzentada e peito ruivo são inconfundíveis às margens dos rios pantaneiros.",
    category: "Aquáticas",
    tag: "Fauna",
    src: "/images/birds/martim-pescador-grande",
    author: "João Vitor Andriola",
    date: "05 de Agosto, 2025",
    photoCredit: "João Vitor Andriola",
    hasOwnerPhoto: true,
  },
  {
    slug: "aracari-castanho",
    commonName: "Araçari-Castanho",
    scientificName: "Pteroglossus castanotis",
    description:
      "Primo menor do tucano, o araçari-castanho tem bico colorido e personalidade exuberante. Frugívoro social, viaja em grupos animados pela mata ciliar.",
    category: "Noturno Perto",
    tag: "Fauna",
    src: "/images/birds/aracari-castanho",
    author: "João Vitor Andriola",
    date: "01 de Agosto, 2025",
    photoCredit: "João Vitor Andriola",
    hasOwnerPhoto: true,
  },
  {
    slug: "garca-azul",
    commonName: "Garça-Azul",
    scientificName: "Egretta caerulea",
    description:
      "Graciosidade em azul-ardósia, a garça-azul caça peixes em postura estática e elegante. Sazonal no Pantanal, seu avistamento é sempre especial.",
    category: "Aquáticas",
    tag: "Fauna",
    src: "/images/birds/garca-azul",
    author: "João Vitor Andriola",
    date: "28 de Julho, 2025",
    photoCredit: "João Vitor Andriola",
    hasOwnerPhoto: true,
  },
  {
    slug: "gaviao-belo",
    commonName: "Gavião-Belo",
    scientificName: "Busarellus nigricollis",
    description:
      "Raptor especialista em peixes com plumagem canela e colar preto marcante. Planeja sobre lagoas em busca de sua próxima refeição no Pantanal.",
    category: "Aquáticas",
    tag: "Fauna",
    src: "/images/birds/gaviao-belo",
    author: "João Vitor Andriola",
    date: "25 de Julho, 2025",
    photoCredit: "João Vitor Andriola",
    hasOwnerPhoto: true,
  },
  {
    slug: "aguia-pescadora",
    commonName: "Águia-Pescadora",
    scientificName: "Pandion haliaetus",
    description:
      "Migrante boreal de alto voo, a águia-pescadora mergulha em alta velocidade para capturar peixes. Avistá-la é um dos momentos mais emocionantes nas expedições fotográficas.",
    category: "Migratórias",
    tag: "Fauna",
    src: "/images/birds/aguia-pescadora",
    author: "João Vitor Andriola",
    date: "20 de Julho, 2025",
    photoCredit: "João Vitor Andriola",
    hasOwnerPhoto: true,
  },
```

**Step 2: Run all data tests**

```bash
npm test -- data.test
```
Expected: PASS — `getOwnerPhotoBirds()` returns ≥ 8 birds, all with `hasOwnerPhoto: true`, all with `photoCredit: "João Vitor Andriola"`, all with `/images/birds/` src.

**Step 3: Commit**

```bash
git add client/src/pages/birdwatching/data.ts
git commit -m "feat(birds): add 6 charismatic owner-photo species to bird catalog"
```

---

## Task 4: Update `featuredBirds` array to use only owner-photo birds

**Files:**
- Modify: `client/src/pages/birdwatching/data.ts:57-82`

**Step 1: Update the `featuredBirds` export**

Replace the current two entries (Arara-Azul + Tuiuiú) with owner-photo birds: Tuiuiú (Pantanal symbol, already updated) + Arara-Canindé (photogenic, new).

```typescript
/** 2 featured birds for the catalog hero area — always owner-photo birds */
export const featuredBirds: BirdSpecies[] = [
  {
    slug: "tuiuiu",
    commonName: "Tuiuiú",
    scientificName: "Jabiru mycteria",
    description:
      "Símbolo do Pantanal, o tuiuiú é a maior cegonha das Américas e um importante indicador da saúde do ecossistema. Sua presença é sempre um espetáculo.",
    category: "Aquáticas",
    tag: "Fauna",
    src: "/images/birds/tuiuiu",
    author: "João Vitor Andriola",
    date: "09 de Agosto, 2025",
    photoCredit: "João Vitor Andriola",
    hasOwnerPhoto: true,
  },
  {
    slug: "arara-caninde",
    commonName: "Arara-Canindé",
    scientificName: "Ara ararauna",
    description:
      "Com plumagem azul-turquesa e amarelo-solar, a arara-canindé é uma das aves mais fotogênicas do Pantanal. Vive em casais e ninifica em ocos de árvores nativas.",
    category: "Papagaio",
    tag: "Fauna",
    src: "/images/birds/arara-caninde",
    author: "João Vitor Andriola",
    date: "09 de Agosto, 2025",
    photoCredit: "João Vitor Andriola",
    hasOwnerPhoto: true,
  },
];
```

Note: `featuredBirds` is a separate array from `allBirds`; they can duplicate entries. This is acceptable and already the pattern in the existing code.

**Step 2: Run all tests**

```bash
npm test
```
Expected: all existing tests PASS (no component breakage)

**Step 3: Commit**

```bash
git add client/src/pages/birdwatching/data.ts
git commit -m "feat(birds): update featuredBirds to use owner-photo Tuiuiú + Arara-Canindé"
```

---

## Task 5: Update `BirdServicesSection` to prioritize owner-photo birds

**Files:**
- Modify: `client/src/pages/birdwatching/sections/BirdServicesSection.tsx`
- Modify: `client/src/pages/birdwatching/sections/BirdServicesSection.test.tsx`

The section currently does `birds.slice(0, 4)`. We need to sort so owner-photo birds come first.

**Step 1: Write the failing test**

Add to `BirdServicesSection.test.tsx`:

```typescript
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BirdServicesSection } from "./BirdServicesSection";
import type { BirdSpecies } from "../data";

const makebird = (slug: string, hasOwnerPhoto?: boolean): BirdSpecies => ({
  slug,
  commonName: slug,
  scientificName: "Test sp.",
  description: "Test",
  category: "Aquáticas",
  tag: "Fauna",
  src: "/images/birds/test",
  author: "Test",
  date: "2025",
  hasOwnerPhoto,
});

describe("BirdServicesSection", () => {
  it("renders the contextual CTA card", () => {
    render(<BirdServicesSection />);
    expect(screen.getByText(/quer fotografar/i)).toBeInTheDocument();
  });

  it("renders the CTA button with booking link", () => {
    render(<BirdServicesSection />);
    const link = screen.getByRole("link", { name: /agendar expedição fotográfica/i });
    expect(link).toBeInTheDocument();
  });

  it("shows owner-photo birds before non-owner birds when both are provided", () => {
    const mixed: BirdSpecies[] = [
      makebird("no-photo-1"),
      makebird("no-photo-2"),
      makebird("owner-1", true),
      makebird("owner-2", true),
      makebird("no-photo-3"),
      makebird("owner-3", true),
    ];
    render(<BirdServicesSection birds={mixed} />);
    // All 3 owner-photo birds should be displayed (section takes first 4 sorted)
    expect(screen.getByText("owner-1")).toBeInTheDocument();
    expect(screen.getByText("owner-2")).toBeInTheDocument();
    expect(screen.getByText("owner-3")).toBeInTheDocument();
  });
});
```

**Step 2: Run to verify test fails**

```bash
npm test -- BirdServicesSection
```
Expected: FAIL on "shows owner-photo birds before non-owner birds"

**Step 3: Update `BirdServicesSection.tsx` to sort by owner photo**

Add sorting before slice. At line 19 (the `const birdSpecies = birds.slice(0, 4)` line), replace with:

```typescript
  const birdSpecies = [...birds]
    .sort((a, b) => (b.hasOwnerPhoto ? 1 : 0) - (a.hasOwnerPhoto ? 1 : 0))
    .slice(0, 4);
```

**Step 4: Run tests to verify passing**

```bash
npm test -- BirdServicesSection
```
Expected: PASS all 3 tests

**Step 5: Commit**

```bash
git add client/src/pages/birdwatching/sections/BirdServicesSection.tsx client/src/pages/birdwatching/sections/BirdServicesSection.test.tsx
git commit -m "feat(birds): sort BirdServicesSection to show owner-photo birds first"
```

---

## Task 6: Update `FeaturedBirdsSection` to filter to owner-photo birds only

**Files:**
- Modify: `client/src/pages/birdwatching/sections/FeaturedBirdsSection.tsx`
- Create: `client/src/pages/birdwatching/sections/FeaturedBirdsSection.test.tsx`

**Step 1: Write the failing test**

Create `client/src/pages/birdwatching/sections/FeaturedBirdsSection.test.tsx`:

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturedBirdsSection } from "./FeaturedBirdsSection";
import type { BirdSpecies } from "../data";

const ownerBird = (slug: string): BirdSpecies => ({
  slug,
  commonName: slug,
  scientificName: "Test sp.",
  description: "Test desc",
  category: "Aquáticas",
  tag: "Fauna",
  src: "/images/birds/test",
  author: "João Vitor Andriola",
  date: "2025",
  photoCredit: "João Vitor Andriola",
  hasOwnerPhoto: true,
});

const noPhotoBird = (slug: string): BirdSpecies => ({
  ...ownerBird(slug),
  hasOwnerPhoto: false,
  photoCredit: undefined,
  author: "Unknown",
});

describe("FeaturedBirdsSection", () => {
  it("renders the section header text", () => {
    render(<FeaturedBirdsSection birds={[ownerBird("a"), ownerBird("b")]} />);
    expect(screen.getByText(/curadoria especial/i)).toBeInTheDocument();
  });

  it("does NOT render non-owner-photo birds", () => {
    const mixed = [ownerBird("owner-1"), noPhotoBird("no-photo-1"), ownerBird("owner-2")];
    render(<FeaturedBirdsSection birds={mixed} />);
    expect(screen.getByText("owner-1")).toBeInTheDocument();
    expect(screen.getByText("owner-2")).toBeInTheDocument();
    expect(screen.queryByText("no-photo-1")).not.toBeInTheDocument();
  });

  it("shows photo credit for owner birds", () => {
    render(<FeaturedBirdsSection birds={[ownerBird("tuiuiu"), ownerBird("arara")]} />);
    const credits = screen.getAllByText(/joão vitor andriola/i);
    expect(credits.length).toBeGreaterThanOrEqual(1);
  });
});
```

**Step 2: Run to verify test fails**

```bash
npm test -- FeaturedBirdsSection
```
Expected: FAIL — "does NOT render non-owner-photo birds" fails (section doesn't filter yet), "shows photo credit" may fail

**Step 3: Update `FeaturedBirdsSection.tsx` to filter + show credit**

Read the full file first (`client/src/pages/birdwatching/sections/FeaturedBirdsSection.tsx`) to see the current `FeaturedBirdsSection` component signature. It already takes `birds?: BirdSpecies[]`. Add filtering at the start of the component body:

```typescript
interface FeaturedBirdsSectionProps {
  birds?: BirdSpecies[];
}

export const FeaturedBirdsSection = ({
  birds = featuredBirds,
}: FeaturedBirdsSectionProps): JSX.Element => {
  // Only show birds with owner photos in this curated section
  const ownerPhotoBirds = birds.filter((b) => b.hasOwnerPhoto === true);
```

Then replace the array used to render cards from `birds` to `ownerPhotoBirds`.

Also, in the `FeaturedBirdCard` component (inside the same file), add a photo credit display. Find where `photoCredit` is rendered (it should already be there based on explore agent report — the card has `photoCredit` at top-right). If it only shows when `photoCredit` is set, it will automatically show for all owner-photo birds.

If `FeaturedBirdCard` does not yet show credit, add it:
```tsx
{bird.photoCredit && (
  <div className="absolute top-4 right-4 z-10 text-xs text-white/80 font-functional-sm tracking-wide">
    Foto: {bird.photoCredit}
  </div>
)}
```

**Step 4: Add the `featuredBirds` import to FeaturedBirdsSection.tsx**

The component needs a default value. Import from data:
```typescript
import { featuredBirds } from "../data";
import type { BirdSpecies } from "../data";
```

**Step 5: Run tests**

```bash
npm test -- FeaturedBirdsSection
```
Expected: PASS all 3 tests

**Step 6: Run full test suite**

```bash
npm test
```
Expected: all pass

**Step 7: Commit**

```bash
git add client/src/pages/birdwatching/sections/FeaturedBirdsSection.tsx client/src/pages/birdwatching/sections/FeaturedBirdsSection.test.tsx
git commit -m "feat(birds): FeaturedBirdsSection filters to owner-photo only + shows photo credit"
```

---

## Task 7: Show photo credit on BirdCard in BirdServicesSection

**Files:**
- Modify: `client/src/pages/birdwatching/sections/BirdServicesSection.tsx`

The home page BirdCard should also display credit when the photo is João Vitor's.

**Step 1: Add failing test to BirdServicesSection.test.tsx**

```typescript
  it("shows photo credit for owner-photo birds", () => {
    const bird = makebird("owner-photo-bird", true);
    bird.photoCredit = "João Vitor Andriola";
    render(<BirdServicesSection birds={[bird, makebird("b"), makebird("c"), makebird("d")]} />);
    expect(screen.getByText(/joão vitor andriola/i)).toBeInTheDocument();
  });
```

**Step 2: Run to verify fails**

```bash
npm test -- BirdServicesSection
```
Expected: FAIL

**Step 3: Add credit display to the `BirdCard` component inside BirdServicesSection.tsx**

Find the `BirdCard` inner component and add a credit element near the top-right of the card (position: `absolute top-4 right-4 z-10`):

```tsx
{bird.photoCredit && (
  <div className="absolute top-4 right-4 z-10 text-xs text-white/70 font-functional-sm tracking-wide">
    Foto: {bird.photoCredit}
  </div>
)}
```

**Step 4: Run tests**

```bash
npm test -- BirdServicesSection
```
Expected: PASS all tests

**Step 5: Commit**

```bash
git add client/src/pages/birdwatching/sections/BirdServicesSection.tsx client/src/pages/birdwatching/sections/BirdServicesSection.test.tsx
git commit -m "feat(birds): show photo credit on BirdCard for owner-photo birds"
```

---

## Task 8: Verify full test suite + manual smoke test

**Step 1: Run all tests**

```bash
npm test
```
Expected: ALL PASS — zero TypeScript errors

**Step 2: Start dev server and check visually**

```bash
npm run dev
```

Check these pages:
1. **Home page** (`/`) → BirdServicesSection shows 4 owner-photo birds (Tuiuiú, João-pinto, Arara-Canindé, etc.)
2. **Catalog page** (`/observacao-de-aves/catalogo`) → FeaturedBirdsSection shows Tuiuiú + Arara-Canindé
3. **Grid** on catalog page → expanded list includes all 9+ owner-photo birds
4. All cards show "Foto: João Vitor Andriola" credit (bottom-right or top-right)
5. Image placeholder fallback shows correctly (since real images aren't in public/ yet)

**Step 3: Final commit with docs note**

Add a comment at the top of `slug-image-map.json` (actually, add a note in a README inside the images folder):

```bash
# Note: actual bird image files must be placed at:
# client/public/images/birds/{slug}.webp (and .avif for modern browsers)
# Source originals: scripts/bird-enrichment/data/ (filenames in photo-mapping.json)
# Processing: convert originals with sharp or squoosh to 1200x800px WebP + AVIF
```

---

## Image Setup Reference (for client / post-plan)

The following image files need to be placed in `client/public/images/birds/`:

| Slug | Source file | Notes |
|---|---|---|
| `tuiuiu` | `Jabiru-mycteria_tuiuiu_IMG1517.jpg` | Use IMG1915 as alternate |
| `joao-pinto` | `Icterus-croconotus_joao-pinto_IMG1384.jpg` | |
| `biguatinga` | `Anhinga-anhinga_biguatinga_IMG2515.jpg` | |
| `arara-caninde` | `Ara-ararauna_arara-caninde_IMG2577.jpg` | |
| `martim-pescador-grande` | `Megaceryle-torquata_martim-pescador-grande_IMG1433.jpg` | |
| `aracari-castanho` | `Pteroglossus-castanotis_aracari-castanho_IMG2684.jpg` | |
| `garca-azul` | `Egretta-caerulea_garca-azul_IMG2160.jpg` | Use IMG2160-2 as alternate |
| `gaviao-belo` | `Busarellus-nigricollis_gaviao-belo_IMG2132.jpg` | |
| `aguia-pescadora` | `Pandion-haliaetus_aguia-pescadora_IMG1633.jpg` | |

For each, produce:
- `{slug}.webp` — 1200×800px, quality 85
- `{slug}.avif` — 1200×800px, quality 70

Use `sharp` (Node) or `Squoosh` CLI to batch convert.
