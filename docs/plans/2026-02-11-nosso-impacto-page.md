# Nosso Impacto — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a premium "Nosso Impacto" (Our Impact) page that serves as a sales tool validating the eco-lodge's premium pricing through conservation pillars, science, community impact, and a closing engagement CTA.

**Architecture:** 6 custom sections + 2 shared sections + footer, following the thin page composition pattern. Each pillar is an independent section component with its own test file. The animated counter section reuses the existing `PantanalStatsSection` pattern (IntersectionObserver + requestAnimationFrame). All sections use the established dark theme on `bg-[#263a30]` / `bg-[#344e41]` with proper pantanal tokens.

**Tech Stack:** React 18, TypeScript, Tailwind 3 (pantanal tokens), Framer Motion (counters), Vitest + RTL (tests), Wouter (routing)

---

## Phase 1: Page Shell & Hero (Tasks 1–3)

### Task 1: Route + Page Composition

**Files:**
- Modify: `client/src/App.tsx`
- Create: `client/src/pages/NossoImpacto.tsx`
- Create: `client/src/pages/nosso-impacto/sections/` (empty directory via first section file)

**Step 1: Add route to App.tsx**

In `client/src/App.tsx`, add the import and route. Insert the route before the `<Route component={NotFound} />` fallback, after the `/contato` route:

```tsx
import { NossoImpacto } from "@/pages/NossoImpacto";
```

```tsx
<Route path="/nosso-impacto" component={NossoImpacto} />
```

**Step 2: Create page composition file**

Create `client/src/pages/NossoImpacto.tsx`:

```tsx
import { ImpactHeroSection } from "./nosso-impacto/sections/ImpactHeroSection";
import { ImpactManifestoSection } from "./nosso-impacto/sections/ImpactManifestoSection";
import { RioVivoSection } from "./nosso-impacto/sections/RioVivoSection";
import { BiodiversidadeSection } from "./nosso-impacto/sections/BiodiversidadeSection";
import { ComunidadeSection } from "./nosso-impacto/sections/ComunidadeSection";
import { OperacaoConscienteSection } from "./nosso-impacto/sections/OperacaoConscienteSection";
import { ImpactEngagementSection } from "./nosso-impacto/sections/ImpactEngagementSection";
import { ImmersionCallToActionSection } from "./sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";

export const NossoImpacto = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <ImpactHeroSection />
      <ImpactManifestoSection />
      <RioVivoSection />
      <BiodiversidadeSection />
      <ComunidadeSection />
      <OperacaoConscienteSection />
      <ImpactEngagementSection />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
```

> Note: This file will not compile until all section files exist. That's expected. We build section-by-section in subsequent tasks.

**Step 3: Verify route file is saved**

No test yet — we'll verify after all sections exist.

---

### Task 2: ImpactHeroSection (TDD)

**Files:**
- Create: `client/src/pages/nosso-impacto/sections/ImpactHeroSection.tsx`
- Create: `client/src/pages/nosso-impacto/sections/ImpactHeroSection.test.tsx`

**Placeholder image:** `/images/impacto-hero-bg.webp` (does not exist yet, will show broken — acceptable)

**Step 1: Write the failing test**

Create `client/src/pages/nosso-impacto/sections/ImpactHeroSection.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImpactHeroSection } from "./ImpactHeroSection";

describe("ImpactHeroSection", () => {
  it("renders the gold label", () => {
    render(<ImpactHeroSection />);
    expect(screen.getByText("NOSSO LEGADO")).toBeInTheDocument();
  });

  it("renders the hero title", () => {
    render(<ImpactHeroSection />);
    expect(
      screen.getByText("O Pantanal de amanhã se constrói hoje."),
    ).toBeInTheDocument();
  });

  it("renders the hero description", () => {
    render(<ImpactHeroSection />);
    expect(
      screen.getByText(/não somos apenas observadores/i),
    ).toBeInTheDocument();
  });

  it("renders scroll indicator on desktop", () => {
    render(<ImpactHeroSection />);
    expect(screen.getByText("Deslize para baixo")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run client/src/pages/nosso-impacto/sections/ImpactHeroSection.test.tsx`
Expected: FAIL — module not found

**Step 3: Implement the hero section**

Create `client/src/pages/nosso-impacto/sections/ImpactHeroSection.tsx`:

```tsx
import { useState, useCallback } from "react";
import { ArrowDown } from "lucide-react";
import { NavHeader } from "@/components/NavHeader";

export const ImpactHeroSection = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuStateChange = useCallback((isOpen: boolean) => {
    setMenuOpen(isOpen);
  }, []);

  return (
    <section className="relative flex flex-col h-[844px] md:h-[680px] lg:h-[920px] items-center justify-end w-full z-[11] overflow-hidden">
      {/* Background image */}
      <img
        src="/images/impacto-hero-bg.webp"
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-[filter,transform] duration-300 ${
          menuOpen ? "blur-[8px] scale-105" : ""
        }`}
      />

      {/* Overlay gradients */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          menuOpen
            ? "z-[3] bg-[rgba(21,34,24,0.7)] backdrop-blur-[8px]"
            : "z-[1]"
        }`}
        style={
          !menuOpen
            ? {
                background:
                  "linear-gradient(0deg, rgba(21,34,24,0.5) 19.7%, rgba(21,34,24,0) 62.4%), linear-gradient(180deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0) 11.6%), linear-gradient(90deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.32) 100%)",
              }
            : undefined
        }
      />

      {/* Navigation */}
      <NavHeader onMenuStateChange={handleMenuStateChange} />

      {/* Hero content */}
      <div className="relative z-[2] flex flex-col max-w-[1440px] items-start justify-end gap-8 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full flex-1">
        {/* Top: Label + Title */}
        <div className="flex flex-col items-start gap-6 md:gap-8 w-full max-w-[738px] overflow-hidden">
          <span className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#d7a45d] text-[length:var(--lead-md-font-size)] tracking-[3.84px] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)] uppercase">
            NOSSO LEGADO
          </span>

          <h1
            className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] text-[#e3f7ec] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            O Pantanal de amanhã se constrói hoje.
          </h1>
        </div>

        {/* Bottom: border-top + description + scroll */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 w-full border-t border-[#f2fcf7] pt-8">
          <p className="max-w-[600px] font-body-md font-[number:var(--body-md-font-weight)] text-[#f2fcf7] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
            Não somos apenas observadores. Somos guardiões. Na Itaicy, cada
            estadia financia a proteção de 166 espécies de aves e garante que o
            Dourado continue reinando em nossos rios.
          </p>

          <div className="hidden md:flex items-center gap-2 text-[#e3f7ec] shrink-0">
            <span className="font-body-md font-[number:var(--body-md-font-weight)] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)] whitespace-nowrap">
              Deslize para baixo
            </span>
            <ArrowDown className="w-6 h-6" />
          </div>
        </div>
      </div>
    </section>
  );
};
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run client/src/pages/nosso-impacto/sections/ImpactHeroSection.test.tsx`
Expected: 4 tests PASS

---

### Task 3: ImpactManifestoSection (TDD)

**Files:**
- Create: `client/src/pages/nosso-impacto/sections/ImpactManifestoSection.tsx`
- Create: `client/src/pages/nosso-impacto/sections/ImpactManifestoSection.test.tsx`

**Step 1: Write the failing test**

Create `client/src/pages/nosso-impacto/sections/ImpactManifestoSection.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImpactManifestoSection } from "./ImpactManifestoSection";

describe("ImpactManifestoSection", () => {
  it("renders the manifesto text", () => {
    render(<ImpactManifestoSection />);
    expect(screen.getByTestId("text-impact-manifesto")).toBeInTheDocument();
  });

  it("renders gold highlight on 'guardiões'", () => {
    render(<ImpactManifestoSection />);
    const manifesto = screen.getByTestId("text-impact-manifesto");
    const goldSpans = manifesto.querySelectorAll("span.text-\\[\\#d7a45d\\]");
    expect(goldSpans.length).toBeGreaterThanOrEqual(1);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run client/src/pages/nosso-impacto/sections/ImpactManifestoSection.test.tsx`
Expected: FAIL

**Step 3: Implement**

Create `client/src/pages/nosso-impacto/sections/ImpactManifestoSection.tsx`:

```tsx
export const ImpactManifestoSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#263a30]">
      <div className="flex flex-col max-w-[1440px] items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <p
          className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[#e3f7ec] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]"
          style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          data-testid="text-impact-manifesto"
        >
          Cada hóspede que chega à Itaicy se torna parte de algo maior:{" "}
          <span className="text-[#d7a45d]">guardiões de um ecossistema</span>{" "}
          que sustenta milhares de espécies. Sua estadia não é apenas uma
          viagem — é um ato de{" "}
          <span className="text-[#d7a45d]">preservação</span>.
        </p>
      </div>
    </section>
  );
};
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run client/src/pages/nosso-impacto/sections/ImpactManifestoSection.test.tsx`
Expected: 2 tests PASS

---

## Phase 2: Content Pillars (Tasks 4–7)

### Task 4: RioVivoSection — Pilar 1: Cota Zero (TDD)

**Files:**
- Create: `client/src/pages/nosso-impacto/sections/RioVivoSection.tsx`
- Create: `client/src/pages/nosso-impacto/sections/RioVivoSection.test.tsx`

**Placeholder image:** `/images/impacto-rio-vivo.webp`

**Design:** Split layout (image left, text right on desktop). Shows the catch-and-release cycle with 4 icon-steps. Background `bg-[#344e41]`.

**Step 1: Write the failing test**

Create `client/src/pages/nosso-impacto/sections/RioVivoSection.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RioVivoSection } from "./RioVivoSection";

describe("RioVivoSection", () => {
  it("renders the section label", () => {
    render(<RioVivoSection />);
    expect(screen.getByText("O RIO VIVO")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    render(<RioVivoSection />);
    expect(
      screen.getByText("100% Cota Zero: O Compromisso com o Gigante."),
    ).toBeInTheDocument();
  });

  it("renders the 4 cycle steps", () => {
    render(<RioVivoSection />);
    expect(screen.getByText("Captura")).toBeInTheDocument();
    expect(screen.getByText("Foto")).toBeInTheDocument();
    expect(screen.getByText("Soltura")).toBeInTheDocument();
    expect(screen.getByText("Reprodução")).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(<RioVivoSection />);
    expect(screen.getByText(/pioneiros em entender/i)).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run client/src/pages/nosso-impacto/sections/RioVivoSection.test.tsx`
Expected: FAIL

**Step 3: Implement**

Create `client/src/pages/nosso-impacto/sections/RioVivoSection.tsx`:

```tsx
import { Fish, Camera, Waves, Heart } from "lucide-react";

const cycleSteps = [
  { icon: Fish, label: "Captura" },
  { icon: Camera, label: "Foto" },
  { icon: Waves, label: "Soltura" },
  { icon: Heart, label: "Reprodução" },
];

export const RioVivoSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#344e41]">
      <div className="flex flex-col max-w-[1440px] gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Section header */}
        <div className="flex flex-col gap-6 md:gap-8">
          <span className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#d7a45d] text-[length:var(--lead-md-font-size)] tracking-[3.84px] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)] uppercase">
            O RIO VIVO
          </span>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-[100px] items-start lg:items-center">
            <h2
              className="lg:w-[664px] shrink-0 font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            >
              100% Cota Zero: O Compromisso com o Gigante.
            </h2>
            <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              Fomos pioneiros em entender que um Dourado vivo vale mil vezes
              mais que um no prato. Nossa política estrita de devolução garante
              que os troféus cresçam, se reproduzam e desafiem gerações de
              pescadores.
            </p>
          </div>
        </div>

        {/* Content: Image + Cycle */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[64px] items-center">
          {/* Image */}
          <div className="w-full lg:w-1/2 h-[320px] md:h-[400px] lg:h-[480px] rounded-lg overflow-hidden bg-[#263a30]">
            <img
              src="/images/impacto-rio-vivo.webp"
              alt="Pesque e solte no Pantanal"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Cycle steps */}
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-6">
              {cycleSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3 p-6 rounded-lg bg-[#263a30]"
                  data-testid={`cycle-step-${index}`}
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[rgba(172,128,66,0.15)]">
                    <step.icon className="w-7 h-7 text-[#d7a45d]" strokeWidth={1.5} />
                  </div>
                  <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Cycle connector text */}
            <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] leading-[var(--body-sm-line-height)] tracking-[var(--body-sm-letter-spacing)] [font-style:var(--body-sm-font-style)] text-center">
              O ciclo que mantém o gigante vivo nos rios do Pantanal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run client/src/pages/nosso-impacto/sections/RioVivoSection.test.tsx`
Expected: 4 tests PASS

---

### Task 5: BiodiversidadeSection — Pilar 2: Santuário de Biodiversidade (TDD)

**Files:**
- Create: `client/src/pages/nosso-impacto/sections/BiodiversidadeSection.tsx`
- Create: `client/src/pages/nosso-impacto/sections/BiodiversidadeSection.test.tsx`

**Design:** Animated counters (reuse pattern from `PantanalStatsSection`) + contextual CTA link to bird guide. Background `bg-[#263a30]`.

**Step 1: Write the failing test**

Create `client/src/pages/nosso-impacto/sections/BiodiversidadeSection.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BiodiversidadeSection } from "./BiodiversidadeSection";

describe("BiodiversidadeSection", () => {
  it("renders the section label", () => {
    render(<BiodiversidadeSection />);
    expect(screen.getByText("BIODIVERSIDADE")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    render(<BiodiversidadeSection />);
    expect(
      screen.getByText("Santuário de Vida Selvagem"),
    ).toBeInTheDocument();
  });

  it("renders the 3 stat cards", () => {
    render(<BiodiversidadeSection />);
    expect(screen.getByTestId("bio-stat-0")).toBeInTheDocument();
    expect(screen.getByTestId("bio-stat-1")).toBeInTheDocument();
    expect(screen.getByTestId("bio-stat-2")).toBeInTheDocument();
  });

  it("renders stat labels", () => {
    render(<BiodiversidadeSection />);
    expect(screen.getByText("ESPÉCIES CATALOGADAS")).toBeInTheDocument();
    expect(screen.getByText("ESPÉCIES AMEAÇADAS PROTEGIDAS")).toBeInTheDocument();
    expect(screen.getByText("DE ÁREA PRESERVADA")).toBeInTheDocument();
  });

  it("renders CTA link to bird guide", () => {
    render(<BiodiversidadeSection />);
    const ctaLink = screen.getByText(/inventário de vida selvagem/i);
    expect(ctaLink.closest("a")).toHaveAttribute(
      "href",
      "/observacao-de-aves",
    );
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run client/src/pages/nosso-impacto/sections/BiodiversidadeSection.test.tsx`
Expected: FAIL

**Step 3: Implement**

Create `client/src/pages/nosso-impacto/sections/BiodiversidadeSection.tsx`:

```tsx
import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronRight } from "lucide-react";

const stats = [
  { target: 166, suffix: "+", label: "ESPÉCIES CATALOGADAS" },
  { target: 4, suffix: "", label: "ESPÉCIES AMEAÇADAS PROTEGIDAS" },
  { target: 85, suffix: "%", label: "DE ÁREA PRESERVADA" },
];

const ANIMATION_DURATION = 2000;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export const BiodiversidadeSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  const animateCounts = useCallback(() => {
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
      const eased = easeOutCubic(progress);

      setCounts(stats.map((s) => Math.round(s.target * eased)));

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCounts();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [animateCounts]);

  return (
    <section ref={sectionRef} className="flex flex-col items-center w-full bg-[#263a30]">
      <div className="flex flex-col max-w-[1440px] gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Section header */}
        <div className="flex flex-col gap-6 md:gap-8">
          <span className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#d7a45d] text-[length:var(--lead-md-font-size)] tracking-[3.84px] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)] uppercase">
            BIODIVERSIDADE
          </span>
          <h2
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)] max-w-[664px]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            Santuário de Vida Selvagem
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[32px]">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-3 p-8 rounded-lg bg-[#344e41]"
              data-testid={`bio-stat-${index}`}
            >
              <span className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[#d7a45d] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]">
                {counts[index]}
                {stat.suffix}
              </span>
              <span className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[3.84px] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)] uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA link */}
        <a
          href="/observacao-de-aves"
          className="flex items-center justify-between w-full py-4 border-b border-[#f2fcf7] transition-all duration-300 group"
        >
          <span className="link-hover font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
            Veja nosso inventário de vida selvagem
          </span>
          <ChevronRight
            className="w-5 h-5 text-[#e3f7ec] transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={2}
          />
        </a>
      </div>
    </section>
  );
};
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run client/src/pages/nosso-impacto/sections/BiodiversidadeSection.test.tsx`
Expected: 5 tests PASS

---

### Task 6: ComunidadeSection — Pilar 3: Comunidade & Raízes (TDD)

**Files:**
- Create: `client/src/pages/nosso-impacto/sections/ComunidadeSection.tsx`
- Create: `client/src/pages/nosso-impacto/sections/ComunidadeSection.test.tsx`

**Placeholder image:** `/images/impacto-comunidade.webp`

**Design:** Full-width image on left, text content on right. Desaturated look via CSS `grayscale` + slight saturation. Background `bg-[#344e41]`.

**Step 1: Write the failing test**

Create `client/src/pages/nosso-impacto/sections/ComunidadeSection.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComunidadeSection } from "./ComunidadeSection";

describe("ComunidadeSection", () => {
  it("renders the section label", () => {
    render(<ComunidadeSection />);
    expect(screen.getByText("COMUNIDADE & RAÍZES")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    render(<ComunidadeSection />);
    expect(screen.getByText("Guardiões Nativos.")).toBeInTheDocument();
  });

  it("renders the description about local guides", () => {
    render(<ComunidadeSection />);
    expect(
      screen.getByText(/nasceram no ritmo das águas/i),
    ).toBeInTheDocument();
  });

  it("renders the community image", () => {
    render(<ComunidadeSection />);
    expect(screen.getByTestId("img-comunidade")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run client/src/pages/nosso-impacto/sections/ComunidadeSection.test.tsx`
Expected: FAIL

**Step 3: Implement**

Create `client/src/pages/nosso-impacto/sections/ComunidadeSection.tsx`:

```tsx
export const ComunidadeSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#344e41]">
      <div className="flex flex-col lg:flex-row max-w-[1440px] gap-12 lg:gap-[64px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full items-center">
        {/* Image — desaturated */}
        <div className="w-full lg:w-1/2 h-[360px] md:h-[440px] lg:h-[560px] rounded-lg overflow-hidden bg-[#263a30]">
          <img
            src="/images/impacto-comunidade.webp"
            alt="Guia local do Pantanal"
            className="w-full h-full object-cover grayscale-[30%]"
            data-testid="img-comunidade"
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-1/2">
          <span className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#d7a45d] text-[length:var(--lead-md-font-size)] tracking-[3.84px] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)] uppercase">
            COMUNIDADE & RAÍZES
          </span>

          <h2
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            Guardiões Nativos.
          </h2>

          <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
            Nossos guias não aprenderam sobre o Pantanal em livros; eles
            nasceram no ritmo das águas. Valorizamos o saber ancestral,
            empregando e capacitando a comunidade local. Sua visita gera renda
            e dignidade para Santo Antônio do Leverger.
          </p>

          <div className="flex flex-col gap-4 pt-4 border-t border-[#446354]">
            <div className="flex items-center gap-4">
              <span className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[#d7a45d] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] [font-style:var(--display-lg-font-style)]">
                100%
              </span>
              <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#a8cab9] text-[length:var(--functional-md-font-size)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
                Dos guias são moradores da região
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run client/src/pages/nosso-impacto/sections/ComunidadeSection.test.tsx`
Expected: 4 tests PASS

---

### Task 7: OperacaoConscienteSection — Pilar 4: Sustentabilidade (TDD)

**Files:**
- Create: `client/src/pages/nosso-impacto/sections/OperacaoConscienteSection.tsx`
- Create: `client/src/pages/nosso-impacto/sections/OperacaoConscienteSection.test.tsx`

**Design:** 3-column icon grid showing sustainability practices. Minimal, sober. Background `bg-[#263a30]`.

**Step 1: Write the failing test**

Create `client/src/pages/nosso-impacto/sections/OperacaoConscienteSection.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OperacaoConscienteSection } from "./OperacaoConscienteSection";

describe("OperacaoConscienteSection", () => {
  it("renders the section label", () => {
    render(<OperacaoConscienteSection />);
    expect(screen.getByText("OPERAÇÃO CONSCIENTE")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    render(<OperacaoConscienteSection />);
    expect(
      screen.getByText("Turismo que Regenera"),
    ).toBeInTheDocument();
  });

  it("renders the 3 practice cards", () => {
    render(<OperacaoConscienteSection />);
    expect(screen.getByTestId("practice-0")).toBeInTheDocument();
    expect(screen.getByTestId("practice-1")).toBeInTheDocument();
    expect(screen.getByTestId("practice-2")).toBeInTheDocument();
  });

  it("renders practice titles", () => {
    render(<OperacaoConscienteSection />);
    expect(screen.getByText("Gestão de Resíduos")).toBeInTheDocument();
    expect(screen.getByText("Zero Plástico Descartável")).toBeInTheDocument();
    expect(screen.getByText("Tratamento de Água")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run client/src/pages/nosso-impacto/sections/OperacaoConscienteSection.test.tsx`
Expected: FAIL

**Step 3: Implement**

Create `client/src/pages/nosso-impacto/sections/OperacaoConscienteSection.tsx`:

```tsx
import { Recycle, Droplets, GlassWater } from "lucide-react";

const practices = [
  {
    icon: Recycle,
    title: "Gestão de Resíduos",
    description:
      "Separação, compostagem e destinação responsável de 100% dos resíduos gerados na operação da pousada.",
  },
  {
    icon: GlassWater,
    title: "Zero Plástico Descartável",
    description:
      "Garrafas reutilizáveis em todas as embarcações e quartos. Eliminamos o plástico de uso único da operação.",
  },
  {
    icon: Droplets,
    title: "Tratamento de Água",
    description:
      "Sistema próprio de tratamento de efluentes que devolve água limpa ao ecossistema pantaneiro.",
  },
];

export const OperacaoConscienteSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#263a30]">
      <div className="flex flex-col max-w-[1440px] gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Section header */}
        <div className="flex flex-col gap-6 md:gap-8">
          <span className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#d7a45d] text-[length:var(--lead-md-font-size)] tracking-[3.84px] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)] uppercase">
            OPERAÇÃO CONSCIENTE
          </span>
          <h2
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)] max-w-[664px]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            Turismo que Regenera
          </h2>
        </div>

        {/* Practice cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[32px]">
          {practices.map((practice, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-5 p-8 rounded-lg bg-[#344e41]"
              data-testid={`practice-${index}`}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[rgba(172,128,66,0.15)]">
                <practice.icon
                  className="w-7 h-7 text-[#d7a45d]"
                  strokeWidth={1.5}
                />
              </div>
              <h3
                className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[#e3f7ec] text-[length:var(--heading-sm-font-size)] tracking-[var(--heading-sm-letter-spacing)] leading-[var(--heading-sm-line-height)] [font-style:var(--heading-sm-font-style)]"
                style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
              >
                {practice.title}
              </h3>
              <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
                {practice.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run client/src/pages/nosso-impacto/sections/OperacaoConscienteSection.test.tsx`
Expected: 4 tests PASS

---

## Phase 3: Engagement Footer + Integration (Tasks 8–9)

### Task 8: ImpactEngagementSection — Closing CTA (TDD)

**Files:**
- Create: `client/src/pages/nosso-impacto/sections/ImpactEngagementSection.tsx`
- Create: `client/src/pages/nosso-impacto/sections/ImpactEngagementSection.test.tsx`

**Design:** Full-width dark section with centered headline + gold CTA button. Feels like a final statement before the booking CTA. Background `bg-[#152218]` (darkest).

**Step 1: Write the failing test**

Create `client/src/pages/nosso-impacto/sections/ImpactEngagementSection.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImpactEngagementSection } from "./ImpactEngagementSection";

describe("ImpactEngagementSection", () => {
  it("renders the headline", () => {
    render(<ImpactEngagementSection />);
    expect(
      screen.getByText("Faça parte deste legado."),
    ).toBeInTheDocument();
  });

  it("renders the CTA button", () => {
    render(<ImpactEngagementSection />);
    const button = screen.getByRole("link", {
      name: /reservar minha experiência consciente/i,
    });
    expect(button).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run client/src/pages/nosso-impacto/sections/ImpactEngagementSection.test.tsx`
Expected: FAIL

**Step 3: Implement**

Create `client/src/pages/nosso-impacto/sections/ImpactEngagementSection.tsx`:

```tsx
export const ImpactEngagementSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#152218]">
      <div className="flex flex-col max-w-[1440px] items-center justify-center gap-10 md:gap-12 lg:gap-16 px-5 md:px-8 lg:px-16 py-16 md:py-24 lg:py-[140px] w-full text-center">
        <h2
          className="font-heading-xl font-[number:var(--heading-xl-font-weight)] text-[#e3f7ec] text-[length:var(--heading-xl-font-size)] leading-[var(--heading-xl-line-height)] tracking-[var(--heading-xl-letter-spacing)] [font-style:var(--heading-xl-font-style)] max-w-[800px]"
          style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
        >
          Faça parte deste legado.
        </h2>

        <a
          href="#reservar"
          className="inline-flex items-center justify-center h-14 px-8 bg-[#ac8042] hover:bg-[#8f6a35] rounded-[6px] text-[#f2fcf7] font-['Lato',sans-serif] font-semibold text-base lg:text-lg whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]"
        >
          Reservar Minha Experiência Consciente
        </a>
      </div>
    </section>
  );
};
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run client/src/pages/nosso-impacto/sections/ImpactEngagementSection.test.tsx`
Expected: 2 tests PASS

---

### Task 9: Full Integration + Final Test Run

**Files:**
- Verify: `client/src/pages/NossoImpacto.tsx` (already created in Task 1)
- Modify: `client/src/App.tsx` (already modified in Task 1)

**Step 1: Run full test suite**

Run: `npx vitest run`
Expected: ALL tests pass (previous 63 + 25 new = 88 total)

**Step 2: Start dev server and verify page renders**

Run: `npm run dev` (if not already running)
Open: `http://localhost:5000/nosso-impacto`

**Visual verification checklist:**
- [ ] Hero: background placeholder area, gold "NOSSO LEGADO" label, title, description, scroll indicator
- [ ] Manifesto: centered large text with gold highlights
- [ ] Rio Vivo: split layout with image placeholder + 4 cycle step cards
- [ ] Biodiversidade: 3 stat cards with animated counters + CTA link to bird guide
- [ ] Comunidade: desaturated image placeholder + text with "100% dos guias" stat
- [ ] Operação Consciente: 3 icon cards (Recycle, GlassWater, Droplets)
- [ ] Engagement: centered headline + gold CTA button
- [ ] Shared ImmersionCallToActionSection renders
- [ ] Shared SiteFooterSection renders
- [ ] Navigation works (NavHeader visible, menu opens)

**Step 3: Commit**

```bash
git add client/src/pages/NossoImpacto.tsx client/src/pages/nosso-impacto/ client/src/App.tsx
git commit -m "feat: add Nosso Impacto page with 7 sections (TDD)

- ImpactHeroSection: manifesto hero with gold label
- ImpactManifestoSection: centered statement with gold highlights
- RioVivoSection: Cota Zero pillar with catch-release cycle
- BiodiversidadeSection: animated counters (166+ species, 4 threatened, 85% preserved)
- ComunidadeSection: local guides pillar with desaturated image
- OperacaoConscienteSection: sustainability practices (waste, plastic, water)
- ImpactEngagementSection: closing CTA 'Reservar Minha Experiência Consciente'
- 25 new tests, all passing"
```

---

## Summary

| Task | Section | Tests | Key Elements |
|------|---------|-------|--------------|
| 1 | Route + Page Shell | — | App.tsx route, NossoImpacto.tsx composition |
| 2 | ImpactHeroSection | 4 | Gold label, title, description, scroll indicator |
| 3 | ImpactManifestoSection | 2 | Centered statement, gold highlights |
| 4 | RioVivoSection | 4 | Cota Zero, 4 cycle steps, split image/text |
| 5 | BiodiversidadeSection | 5 | 3 animated stat cards, CTA link |
| 6 | ComunidadeSection | 4 | Desaturated image, guides text, 100% stat |
| 7 | OperacaoConscienteSection | 4 | 3 sustainability practice cards |
| 8 | ImpactEngagementSection | 2 | Centered headline + gold CTA |
| 9 | Integration | — | Full test run, visual verification, commit |
| **Total** | **7 new sections** | **25** | **+ 2 shared (CTA + Footer)** |

**Placeholder images needed (3):**
- `/images/impacto-hero-bg.webp`
- `/images/impacto-rio-vivo.webp`
- `/images/impacto-comunidade.webp`
