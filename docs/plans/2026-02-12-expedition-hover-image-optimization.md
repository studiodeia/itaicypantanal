# Expedition Cards Hover + Image Optimization Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** (1) Add interactive hover expansion to expedition cards; (2) Convert and optimize all images on Home and Acomodacoes pages from unoptimized PNGs/JPGs to WebP+AVIF.

**Architecture:** Expedition cards use React state (`activeIndex`) + CSS `transition-all` for smooth width/content reveal. Image optimization uses a Node.js sharp script to batch-convert, then update all component references to use `<picture>` with WebP/AVIF sources. Star SVG duplicates are consolidated to a single file.

**Tech Stack:** React 18, TypeScript, Tailwind 3, Framer Motion (existing), sharp 0.34.5 (already installed)

---

## Part A: Expedition Cards Hover Interaction

### Current State

`client/src/pages/sections/ExclusiveExpeditionsSection.tsx`:
- 3 cards in a flex row: Pesca (55% wide, has description), Birdwatching (flex-1, no description), Ecoturismo (flex-1, no description)
- Static widths — no interactivity beyond existing motion animations
- Cards are 740px tall on desktop, bg-image with gradient overlay
- **User will provide full-resolution images later** — current images work as placeholders

### Target Behavior (Desktop only, lg+)

- **Default:** Card 0 (Pesca) is expanded — wider, shows title + description + CTA
- **On hover of any card:** That card expands, others collapse
- **Expanded card:** `lg:w-[664px] lg:flex-shrink-0`, shows h3 + p + button
- **Collapsed card:** `lg:flex-1`, shows only h3 + button (description hidden)
- **Transition:** `transition-all duration-500 ease-[cubic-bezier(0.25,0.4,0.25,1)]`
- **Mobile/Tablet:** No hover — all cards stacked vertically with full content visible

### Task 1: Add descriptions to all expedition cards + state

**Files:**
- Modify: `client/src/pages/sections/ExclusiveExpeditionsSection.tsx`

**Step 1: Write the failing test**

Create `client/src/pages/sections/__tests__/ExclusiveExpeditionsSection.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ExclusiveExpeditionsSection } from "../ExclusiveExpeditionsSection";

describe("ExclusiveExpeditionsSection", () => {
  it("renders all 3 expedition cards", () => {
    render(<ExclusiveExpeditionsSection />);
    expect(screen.getByTestId("card-expedition-0")).toBeInTheDocument();
    expect(screen.getByTestId("card-expedition-1")).toBeInTheDocument();
    expect(screen.getByTestId("card-expedition-2")).toBeInTheDocument();
  });

  it("shows description for the first card by default", () => {
    render(<ExclusiveExpeditionsSection />);
    expect(
      screen.getByText(/Em águas privativas, a pesca transcende/)
    ).toBeInTheDocument();
  });

  it("all cards have titles", () => {
    render(<ExclusiveExpeditionsSection />);
    expect(screen.getByText("Pesca Esportiva Cota Zero")).toBeInTheDocument();
    expect(screen.getByText("Birdwatching")).toBeInTheDocument();
    expect(screen.getByText("Ecoturismo")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run client/src/pages/sections/__tests__/ExclusiveExpeditionsSection.test.tsx`
Expected: PASS (existing cards already satisfy these basic tests)

**Step 3: Implement the interactive hover behavior**

Update `ExclusiveExpeditionsSection.tsx` — full replacement:

```tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fadeIn, fadeUp, stagger, cardItem, viewport } from "@/lib/motion";

const expeditions = [
  {
    title: "Pesca Esportiva Cota Zero",
    description:
      "Em águas privativas, a pesca transcende, uma imersão tática com guias que leem o rio.",
    backgroundImage: "/figmaAssets/image.png",
  },
  {
    title: "Birdwatching",
    description:
      "166 espécies catalogadas em nosso santuário. Guias ornitólogos conduzem expedições imersivas ao amanhecer.",
    backgroundImage: "/figmaAssets/image-1.png",
  },
  {
    title: "Ecoturismo",
    description:
      "Trilhas guiadas, passeios de barco e safáris fotográficos no coração do Pantanal intocado.",
    backgroundImage: "/figmaAssets/image-2.png",
  },
];

export const ExclusiveExpeditionsSection = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="flex flex-col items-center justify-end w-full bg-[#344e41]">
      <div className="flex flex-col max-w-[1440px] items-center justify-end gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-10 py-12 md:py-16 lg:py-[100px] w-full">
        <motion.header
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[32px] w-full"
        >
          <motion.p
            variants={fadeIn}
            className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]"
            data-testid="text-services-label"
          >
            NOSSOS SERVIÇOS
          </motion.p>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 md:gap-6 lg:gap-[100px] w-full">
            <motion.h2
              variants={fadeUp}
              className="w-full lg:w-[664px] font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
              data-testid="text-services-heading"
            >
              Expedições Exclusivas no Coração do Pantanal
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="w-full lg:flex-1 font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]"
            >
              Nossas atividades são desenhadas para uma conexão profunda com o
              ecossistema. Escolha a sua expedição.
            </motion.p>
          </div>
        </motion.header>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col md:flex-row w-full items-stretch gap-4 md:gap-6 lg:gap-[32px]"
        >
          {expeditions.map((expedition, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={index}
                variants={cardItem}
                className={`w-full transition-all duration-500 ease-[cubic-bezier(0.25,0.4,0.25,1)] ${
                  isActive
                    ? "lg:w-[664px] lg:flex-shrink-0"
                    : "lg:flex-1 lg:min-w-0"
                }`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <Card
                  className="w-full h-[464px] md:h-[500px] lg:h-[740px] rounded-lg overflow-hidden border-0 bg-center bg-cover bg-no-repeat cursor-pointer"
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(21,34,24,0.5) 0%, rgba(21,34,24,0) 100%), linear-gradient(0deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.32) 100%), url(${expedition.backgroundImage})`,
                  }}
                  data-testid={`card-expedition-${index}`}
                >
                  <CardContent className="flex flex-col justify-end h-full p-5 md:p-6 lg:p-[32px]">
                    <div className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[40px]">
                      <div className="flex flex-col items-start gap-3 md:gap-5 lg:gap-[20px] w-full">
                        <h3 className="font-heading-md font-[number:var(--heading-md-font-weight)] text-[#e3f7ec] text-[length:var(--heading-md-font-size)] tracking-[var(--heading-md-letter-spacing)] leading-[var(--heading-md-line-height)] [font-style:var(--heading-md-font-style)]">
                          {expedition.title}
                        </h3>

                        {/* Description — always visible on mobile, only on active for lg */}
                        <div
                          className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.4,0.25,1)] ${
                            isActive
                              ? "lg:max-h-[120px] lg:opacity-100"
                              : "max-h-[120px] lg:max-h-0 lg:opacity-0"
                          }`}
                        >
                          <p className="max-w-[355px] font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
                            {expedition.description}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        className="flex items-center justify-between w-full py-3 md:py-4 lg:h-[56px] lg:py-[12px] px-0 lg:px-[24px] border-b lg:border-b-0 border-[#f2fcf7] rounded-none lg:rounded-[6px] h-auto"
                        data-testid={`button-expedition-details-${index}`}
                      >
                        <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] lg:text-[#f2fcf7] text-[length:var(--functional-md-font-size)] lg:text-[24px] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] lg:leading-[32px] [font-style:var(--functional-md-font-style)] lg:font-[number:var(--functional-lg-font-weight)]">
                          Quero conhecer
                        </span>
                        <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-[#e3f7ec] lg:text-[#f2fcf7]" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
```

Key changes:
- `useState(0)` tracks active card — default is card 0 (Pesca)
- `onMouseEnter` on the `motion.div` wrapper switches active card
- Active card: `lg:w-[664px] lg:flex-shrink-0` — wider, fixed width
- Inactive card: `lg:flex-1 lg:min-w-0` — fills remaining space
- Description: `max-h` + `opacity` transition — hidden on inactive (lg only)
- Mobile: all descriptions always visible (no hover on touch devices)
- `items-stretch` on parent ensures equal heights
- `cursor-pointer` signals interactivity
- `transition-all duration-500 ease-[cubic-bezier(0.25,0.4,0.25,1)]` matches motion.ts easing

**Step 4: Run tests to verify they pass**

Run: `npx vitest run client/src/pages/sections/__tests__/ExclusiveExpeditionsSection.test.tsx`
Expected: PASS

**Step 5: Add hover interaction tests**

Add to the test file:

```tsx
it("expands card on hover (shows description)", () => {
  render(<ExclusiveExpeditionsSection />);
  const card1Wrapper = screen.getByTestId("card-expedition-1").closest("[data-testid]")?.parentElement;
  if (card1Wrapper) {
    fireEvent.mouseEnter(card1Wrapper);
  }
  // After hover on Birdwatching card, its description should be visible
  expect(
    screen.getByText(/166 espécies catalogadas/)
  ).toBeInTheDocument();
});
```

**Step 6: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS

**Step 7: Commit**

```bash
git add client/src/pages/sections/ExclusiveExpeditionsSection.tsx client/src/pages/sections/__tests__/ExclusiveExpeditionsSection.test.tsx
git commit -m "feat: add interactive hover expansion to expedition cards"
```

---

## Part B: Image Optimization (Home + Acomodacoes)

### Current State — Images to Optimize

All Home page images live in `/figmaAssets/` as unoptimized PNGs/JPGs:

| Current Path | Dimensions | Size | Used In | Target Resize |
|---|---|---|---|---|
| `figmaAssets/image.png` | 4000x2667 | 2.8MB | ExclusiveExpeditions (Pesca) | 1440w |
| `figmaAssets/image-1.png` | 1280x853 | 136KB | ExclusiveExpeditions (Birdwatching) | Keep |
| `figmaAssets/image-2.png` | 4000x2667 | 4.3MB | ExclusiveExpeditions (Ecoturismo) | 1440w |
| `figmaAssets/img.png` | 606x816 | 1.0MB | AuthenticRestSection | Keep |
| `figmaAssets/img-1.png` | 606x816 | 679KB | NaturalRefugeDescriptionSection | Keep |
| `figmaAssets/section---acomoda--es.png` | 4000x2667 | 4.0MB | AccommodationInfoSection | 1920w |
| `figmaAssets/frame-2-2.png` | 4000x2250 | 2.5MB | PantanalBlogSection (cards) | 832w |
| `figmaAssets/ellipse-1-2.png` | 1024x1024 | 1.2MB | PantanalBlogSection (avatar) | 88px |
| `figmaAssets/acomodacoes/apartamento-duplo.jpg` | 1024x683 | 593KB | ApartmentSection (Explorer) | Keep |
| `figmaAssets/acomodacoes/apartamento-triplo.jpg` | 1024x1024 | 783KB | ApartmentSection (Adventure) | Keep |
| `figmaAssets/acomodacoes/apartamento-extra.jpg` | 4000x2667 | 2.2MB | ApartmentSection (Family) | 1440w |
| `figmaAssets/acomodacoes/culinaria-1.jpg` | 4000x2667 | 2.7MB | CulinarySection | 720w |
| `figmaAssets/acomodacoes/culinaria-2.jpg` | 4000x2667 | 2.5MB | CulinarySection | 720w |
| `figmaAssets/acomodacoes/culinaria-3.jpg` | 4000x2667 | 2.6MB | CulinarySection | 720w |
| `figmaAssets/acomodacoes/culinaria-4.jpg` | 1248x832 | 1.6MB | CulinarySection | 720w |

Also: 25 identical star SVGs (`star.svg` through `star-24.svg`) → consolidate to 1.

**Total unoptimized:** ~28MB across 15 raster images
**Target:** <2MB total (WebP quality 80 + resize)

### Output Convention

All optimized images go to `/images/home/` and `/images/acomodacoes/`:

```
images/
  home/
    expedition-pesca.webp         (from image.png)
    expedition-birdwatching.webp  (from image-1.png)
    expedition-ecoturismo.webp    (from image-2.png)
    about-us.webp                 (from img.png)
    impact.webp                   (from img-1.png)
    accommodations-bg.webp        (from section---acomoda--es.png)
    blog-card.webp                (from frame-2-2.png)
    blog-avatar.webp              (from ellipse-1-2.png)
    star.svg                      (single star, consolidate 25 → 1)
  acomodacoes/
    suite-explorer.webp           (from apartamento-duplo.jpg)
    suite-adventure.webp          (from apartamento-triplo.jpg)
    suite-family.webp             (from apartamento-extra.jpg)
    culinaria-1.webp              (from culinaria-1.jpg)
    culinaria-2.webp              (from culinaria-2.jpg)
    culinaria-3.webp              (from culinaria-3.jpg)
    culinaria-4.webp              (from culinaria-4.jpg)
```

### Task 2: Create image optimization script

**Files:**
- Create: `scripts/optimize-images.mjs`

**Step 1: Write the script**

```js
import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";

const PUBLIC = "client/public";
const FIGMA = `${PUBLIC}/figmaAssets`;
const OUT = `${PUBLIC}/images`;

const images = [
  // Home
  { src: `${FIGMA}/image.png`, out: `${OUT}/home/expedition-pesca`, w: 1440 },
  { src: `${FIGMA}/image-1.png`, out: `${OUT}/home/expedition-birdwatching`, w: 1280 },
  { src: `${FIGMA}/image-2.png`, out: `${OUT}/home/expedition-ecoturismo`, w: 1440 },
  { src: `${FIGMA}/img.png`, out: `${OUT}/home/about-us`, w: null },
  { src: `${FIGMA}/img-1.png`, out: `${OUT}/home/impact`, w: null },
  { src: `${FIGMA}/section---acomoda--es.png`, out: `${OUT}/home/accommodations-bg`, w: 1920 },
  { src: `${FIGMA}/frame-2-2.png`, out: `${OUT}/home/blog-card`, w: 832 },
  { src: `${FIGMA}/ellipse-1-2.png`, out: `${OUT}/home/blog-avatar`, w: 88 },
  // Acomodacoes
  { src: `${FIGMA}/acomodacoes/apartamento-duplo.jpg`, out: `${OUT}/acomodacoes/suite-explorer`, w: 1024 },
  { src: `${FIGMA}/acomodacoes/apartamento-triplo.jpg`, out: `${OUT}/acomodacoes/suite-adventure`, w: 1024 },
  { src: `${FIGMA}/acomodacoes/apartamento-extra.jpg`, out: `${OUT}/acomodacoes/suite-family`, w: 1440 },
  { src: `${FIGMA}/acomodacoes/culinaria-1.jpg`, out: `${OUT}/acomodacoes/culinaria-1`, w: 720 },
  { src: `${FIGMA}/acomodacoes/culinaria-2.jpg`, out: `${OUT}/acomodacoes/culinaria-2`, w: 720 },
  { src: `${FIGMA}/acomodacoes/culinaria-3.jpg`, out: `${OUT}/acomodacoes/culinaria-3`, w: 720 },
  { src: `${FIGMA}/acomodacoes/culinaria-4.jpg`, out: `${OUT}/acomodacoes/culinaria-4`, w: 720 },
];

async function optimize() {
  // Ensure output dirs
  await mkdir(`${OUT}/home`, { recursive: true });
  await mkdir(`${OUT}/acomodacoes`, { recursive: true });

  for (const img of images) {
    const pipeline = sharp(img.src);
    if (img.w) pipeline.resize(img.w, null, { withoutEnlargement: true });

    // WebP
    await pipeline.clone().webp({ quality: 80 }).toFile(`${img.out}.webp`);
    // AVIF
    await pipeline.clone().avif({ quality: 60 }).toFile(`${img.out}.avif`);

    const webpSize = (await sharp(`${img.out}.webp`).metadata()).size;
    console.log(`✓ ${path.basename(img.out)}.webp (${(webpSize / 1024).toFixed(0)}KB)`);
  }

  console.log("\nDone! All images optimized to WebP + AVIF.");
}

optimize().catch(console.error);
```

**Step 2: Run the script**

Run: `cd /c/Itaicy/Replit/itaicypantanal && node scripts/optimize-images.mjs`
Expected: All 15 images converted, output shows sizes

**Step 3: Commit optimized images**

```bash
git add scripts/optimize-images.mjs client/public/images/home/ client/public/images/acomodacoes/
git commit -m "feat: optimize Home + Acomodacoes images to WebP + AVIF"
```

### Task 3: Consolidate star SVGs

**Files:**
- Create: `client/public/images/home/star.svg` (copy from `figmaAssets/star.svg`)
- Modify: `client/src/pages/sections/ImmersionTestimonialsSection.tsx`

**Step 1: Copy single star SVG**

Run: `cp client/public/figmaAssets/star.svg client/public/images/home/star.svg`

**Step 2: Update ImmersionTestimonialsSection.tsx**

Replace all 25 unique star paths with a single path. Change the testimonials data — each testimonial's `stars` array becomes just a number (5):

```tsx
// Before: stars: ["/figmaAssets/star-8.svg", "/figmaAssets/star-5.svg", ...]
// After: remove stars array, just render 5 stars inline

// In the JSX, replace:
{testimonial.stars.map((star, starIndex) => (
  <img key={starIndex} className="w-4 h-4 md:w-5 md:h-5" alt="Star" src={star} />
))}

// With:
{Array.from({ length: 5 }).map((_, starIndex) => (
  <img key={starIndex} className="w-4 h-4 md:w-5 md:h-5" alt="Star" src="/images/home/star.svg" />
))}
```

Remove the `stars` property from the testimonials data array entirely.

**Step 3: Run tests**

Run: `npx vitest run`
Expected: All tests PASS

**Step 4: Commit**

```bash
git add client/public/images/home/star.svg client/src/pages/sections/ImmersionTestimonialsSection.tsx
git commit -m "refactor: consolidate 25 duplicate star SVGs into single file"
```

### Task 4: Update Home section components to use optimized images

**Files:**
- Modify: `client/src/pages/sections/ExclusiveExpeditionsSection.tsx`
- Modify: `client/src/pages/sections/AuthenticRestSection.tsx`
- Modify: `client/src/pages/sections/NaturalRefugeDescriptionSection.tsx`
- Modify: `client/src/pages/sections/AccommodationInfoSection.tsx`
- Modify: `client/src/pages/sections/PantanalBlogSection.tsx`

**Step 1: Update ExclusiveExpeditionsSection**

Change image paths:
```tsx
// Before:
backgroundImage: "/figmaAssets/image.png",
backgroundImage: "/figmaAssets/image-1.png",
backgroundImage: "/figmaAssets/image-2.png",

// After:
backgroundImage: "/images/home/expedition-pesca.webp",
backgroundImage: "/images/home/expedition-birdwatching.webp",
backgroundImage: "/images/home/expedition-ecoturismo.webp",
```

**Step 2: Update AuthenticRestSection**

Change Tailwind bg class:
```tsx
// Before:
bg-[url(/figmaAssets/img.png)]

// After:
bg-[url(/images/home/about-us.webp)]
```

**Step 3: Update NaturalRefugeDescriptionSection**

```tsx
// Before:
bg-[url(/figmaAssets/img-1.png)]

// After:
bg-[url(/images/home/impact.webp)]
```

**Step 4: Update AccommodationInfoSection** (also fix double-slash typo)

```tsx
// Before (line 7 — has ..// typo):
url(..//figmaAssets/section---acomoda--es.png)

// After:
url(/images/home/accommodations-bg.webp)
```

**Step 5: Update PantanalBlogSection**

```tsx
// Before:
image: "/figmaAssets/frame-2-2.png",
avatar: "/figmaAssets/ellipse-1-2.png",

// After:
image: "/images/home/blog-card.webp",
avatar: "/images/home/blog-avatar.webp",
```

**Step 6: Run tests**

Run: `npx vitest run`
Expected: All tests PASS

**Step 7: Visual verification**

Open `http://localhost:5000` — scroll through all sections, verify images load correctly.

**Step 8: Commit**

```bash
git add client/src/pages/sections/ExclusiveExpeditionsSection.tsx client/src/pages/sections/AuthenticRestSection.tsx client/src/pages/sections/NaturalRefugeDescriptionSection.tsx client/src/pages/sections/AccommodationInfoSection.tsx client/src/pages/sections/PantanalBlogSection.tsx
git commit -m "feat: switch Home sections to optimized WebP images"
```

### Task 5: Update Acomodacoes section components to use optimized images

**Files:**
- Modify: `client/src/pages/Acomodacoes.tsx`
- Modify: `client/src/pages/acomodacoes/sections/CulinarySection.tsx`

**Step 1: Update Acomodacoes.tsx apartment images**

```tsx
// Before:
image: "/figmaAssets/acomodacoes/apartamento-duplo.jpg",
image: "/figmaAssets/acomodacoes/apartamento-triplo.jpg",
image: "/figmaAssets/acomodacoes/apartamento-extra.jpg",

// After:
image: "/images/acomodacoes/suite-explorer.webp",
image: "/images/acomodacoes/suite-adventure.webp",
image: "/images/acomodacoes/suite-family.webp",
```

**Step 2: Update CulinarySection.tsx**

```tsx
// Before:
src: "/figmaAssets/acomodacoes/culinaria-1.jpg",
src: "/figmaAssets/acomodacoes/culinaria-2.jpg",
src: "/figmaAssets/acomodacoes/culinaria-3.jpg",
src: "/figmaAssets/acomodacoes/culinaria-4.jpg",

// After:
src: "/images/acomodacoes/culinaria-1.webp",
src: "/images/acomodacoes/culinaria-2.webp",
src: "/images/acomodacoes/culinaria-3.webp",
src: "/images/acomodacoes/culinaria-4.webp",
```

**Step 3: Run tests**

Run: `npx vitest run`
Expected: All tests PASS

**Step 4: Visual verification**

Open `http://localhost:5000/acomodacoes` — scroll through all sections, verify images load correctly.

**Step 5: Commit**

```bash
git add client/src/pages/Acomodacoes.tsx client/src/pages/acomodacoes/sections/CulinarySection.tsx
git commit -m "feat: switch Acomodacoes sections to optimized WebP images"
```

### Task 6: Final validation

**Step 1: TypeScript check**

Run: `npx tsc --noEmit`
Expected: Zero errors

**Step 2: All tests**

Run: `npx vitest run`
Expected: All tests PASS

**Step 3: Size comparison**

Run: `du -sh client/public/images/home/ client/public/images/acomodacoes/`
Expected: Total <2MB (down from ~28MB in figmaAssets)

**Step 4: Visual check — localhost**

Verify on `http://localhost:5000`:
1. Home: expedition cards hover works (expand/collapse smooth)
2. Home: all images load (about-us, impact, accommodations-bg, blog, avatar, stars)
3. Acomodacoes: all apartment + culinary images load
4. Responsive: check 390px and 768px — no broken images

**Step 5: Commit all**

```bash
git commit -m "chore: final validation — expedition hover + image optimization complete"
```

---

## Summary

| Task | What | Files Modified |
|---|---|---|
| 1 | Expedition cards hover interaction | ExclusiveExpeditionsSection.tsx + test |
| 2 | Image optimization script (sharp) | scripts/optimize-images.mjs |
| 3 | Consolidate star SVGs | ImmersionTestimonialsSection.tsx |
| 4 | Home sections → optimized images | 5 section files |
| 5 | Acomodacoes sections → optimized images | 2 files |
| 6 | Final validation | — |

**Estimated output savings:** ~26MB removed, ~1.5MB added = **~24.5MB savings**
