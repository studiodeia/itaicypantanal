# Design System Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Corrigir 31 inconsistências do design system identificadas na auditoria — substituindo hex raw por tokens `pantanal-*`, corrigindo uso incorreto de componentes e eliminando padrões divergentes.

**Architecture:** Correções bottom-up: primeiro o token layer (tailwind.config.ts + componentes base), depois as seções que consomem. Sem refatoração estrutural (SectionContainer) — esse é um epic separado. Cada fase é independente e pode ser commitada separadamente.

**Tech Stack:** React 18 + TypeScript + Tailwind 3 (tokens `pantanal.*`) + shadcn/ui + Vitest + RTL

**Nota:** O item #9 da auditoria (usar SectionContainer em todas as seções da home) é um refactor estrutural grande demais para este plano — tratar como epic separado. O item BirdSpeciesCard avatar é dependência de dados do CMS.

---

## Referência de tokens disponíveis (tailwind.config.ts)

```ts
pantanal: {
  dark: {
    primary: "#152218",
    secondary: "#263a30",
    overlay: "rgba(10, 19, 12, 0.2)",
    overlayHeavy: "rgba(10, 19, 12, 0.4)",
  },
  medium: "#344e41",
  cream: "#fcf4ed",
  light: {
    primary: "#e3f7ec",
    secondary: "#f2fcf7",
    muted: "#a8cab9",
    tertiary: "#cfebdd",
    highlight: "#d7a45d",
    quarternary: "#6c927f",
    numberMuted: "#8aad9c",
  },
  gold: {
    DEFAULT: "#ac8042",
    hover: "#8f6a35",
  },
  border: {
    light: "#446354",
    primary: "#f2fcf7",
    muted: "#a8cab9",
  },
  darkText: {
    primary: "#263a30",
    secondary: "#446354",
    muted: "#8aad9c",
  },
}
```

---

## Phase 1: Token Layer

### Task 1: Adicionar token `creamDark` + corrigir GoldButton + bug NumberedFeatureItem

**Por quê primeiro:** Essas são as dependências de todos os outros tasks.

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `client/src/components/pantanal/buttons/GoldButton.tsx`
- Modify: `client/src/components/pantanal/cards/NumberedFeatureItem.tsx`

**Step 1: Adicionar token creamDark no tailwind.config.ts**

Localizar o bloco `pantanal:` em `tailwind.config.ts` e adicionar `creamDark` logo após `cream`:

```ts
// Antes (linha ~75):
cream: "#fcf4ed",          // Background/Section/Light (NaturalRefuge)

// Depois:
cream: "#fcf4ed",          // Background/Section/Light (NaturalRefuge)
creamDark: "#f5e8db",      // Background/Section/Light variant (darker cream)
```

**Step 2: Corrigir GoldButton — substituir hex por tokens**

Em `client/src/components/pantanal/buttons/GoldButton.tsx`, linha 22:

```ts
// Antes:
"bg-[#ac8042] hover:bg-[#8f6a35] text-[#f2fcf7]",

// Depois:
"bg-pantanal-gold hover:bg-pantanal-gold-hover text-pantanal-light-secondary",
```

**Step 3: Corrigir bug NumberedFeatureItem — borderColor dark theme**

Em `client/src/components/pantanal/cards/NumberedFeatureItem.tsx`, linhas 22-24:

```ts
// Antes:
const borderColor = theme === "light"
  ? "border-pantanal-border-muted"
  : "border-pantanal-border-muted";  // BUG: mesmo valor para dark

// Depois:
const borderColor = theme === "light"
  ? "border-pantanal-border-muted"
  : "border-pantanal-border-light";
```

**Step 4: Rodar testes**

```bash
cd c:/Itaicy/Replit/itaicypantanal && npm test
```

Esperado: todos os testes passam (nenhum teste checa classes CSS diretamente)

**Step 5: Commit**

```bash
git add tailwind.config.ts client/src/components/pantanal/buttons/GoldButton.tsx client/src/components/pantanal/cards/NumberedFeatureItem.tsx
git commit -m "fix: adiciona token creamDark, corrige hex no GoldButton e bug border no NumberedFeatureItem"
```

---

## Phase 2: High Priority Color Fixes

### Task 2: PantanalHeroSection — corrigir 3 cores incorretas + shadow

**Files:**
- Modify: `client/src/pages/sections/PantanalHeroSection.tsx`

**Step 1: Corrigir accent color do heading (linha 64)**

```tsx
// Antes:
style={{ color: "#a88b56" }}

// Depois:
className="block text-pantanal-light-highlight"
// (remover o style={{ color }}, adicionar className na <span>)
```

A span resultante:
```tsx
{homeHero.headingAccent && (
  <span className="block text-pantanal-light-highlight">
    {homeHero.headingAccent}
  </span>
)}
```

**Step 2: Corrigir disclaimer text color (linha 110)**

```tsx
// Antes:
<p className="w-full text-center text-xs leading-4 text-[#9ca3af] [font-family:'Lato',sans-serif] font-normal">

// Depois:
<p className="w-full text-center text-xs leading-4 text-pantanal-light-muted font-body-xs">
```

**Step 3: Corrigir gold underline accent (linha 96)**

```tsx
// Antes:
<div className="w-8 h-[2px] bg-[#ac8042]" />

// Depois:
<div className="w-8 h-[2px] bg-pantanal-gold" />
```

**Step 4: Corrigir shadow do booking card (linha 82)**

```tsx
// Antes:
"shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"

// Depois:
"shadow-pantanal"
```

Nota: `shadow-pantanal` está definido em `.interface-design/utilities.js`. Verificar se produz efeito visual aceitável. Se a sombra for muito diferente visualmente, manter a original e criar um token de sombra dedicado.

**Step 5: Rodar testes**

```bash
npm test
```

**Step 6: Commit**

```bash
git add client/src/pages/sections/PantanalHeroSection.tsx
git commit -m "fix: corrige cores e shadow do PantanalHeroSection para tokens pantanal"
```

---

### Task 3: ParaQuemSection — bg-[#f5f0eb] + text-[#4a6741]

**Files:**
- Modify: `client/src/pages/sections/ParaQuemSection.tsx`

**Step 1: Corrigir background da seção (linha 10)**

```tsx
// Antes:
<section className="flex flex-col items-center w-full bg-[#f5f0eb]">

// Depois:
<section className="flex flex-col items-center w-full bg-pantanal-creamDark">
```

**Step 2: Corrigir texto do parágrafo de descrição (linha 33)**

```tsx
// Antes:
text-[#4a6741]

// Depois:
text-pantanal-darkText-secondary
```

**Step 3: Corrigir texto dos cards de segmento (linha 63)**

```tsx
// Antes:
text-[#4a6741]

// Depois:
text-pantanal-darkText-secondary
```

**Step 4: Rodar testes + commit**

```bash
npm test
git add client/src/pages/sections/ParaQuemSection.tsx
git commit -m "fix: ParaQuemSection usa tokens pantanal em vez de hex"
```

---

### Task 4: AccommodationsHighlightsSection — adicionar background

**Files:**
- Modify: `client/src/pages/acomodacoes/sections/AccommodationsHighlightsSection.tsx`

**Step 1: Adicionar bg-pantanal-dark-primary à seção (linha 10)**

```tsx
// Antes:
<section className="flex flex-col items-center w-full">

// Depois:
<section className="flex flex-col items-center w-full bg-pantanal-dark-primary">
```

**Step 2: Rodar testes + commit**

```bash
npm test
git add client/src/pages/acomodacoes/sections/AccommodationsHighlightsSection.tsx
git commit -m "fix: AccommodationsHighlightsSection define background explicitamente"
```

---

## Phase 3: Button System

### Task 5: Adicionar `buttonSize` ao GoldButton + exportar `outlineButtonClass`

**Por quê:** AccommodationInfoSection precisa de botões tamanho `lg` (functional-lg, 24px). GoldButton só tem `sm`. NotFoundHeroSection precisa de Link com estilo OutlineButton.

**Files:**
- Modify: `client/src/components/pantanal/buttons/GoldButton.tsx`
- Modify: `client/src/components/pantanal/buttons/OutlineButton.tsx`

**Step 1: Adicionar `buttonSize` prop + classes lg ao GoldButton**

```tsx
// client/src/components/pantanal/buttons/GoldButton.tsx
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface GoldButtonProps extends ButtonProps {
  children: React.ReactNode;
  buttonSize?: "sm" | "lg";
}

/** Classes para elementos <a> com estilo gold CTA (tamanho sm) */
export const goldButtonClass = [
  "bg-pantanal-gold hover:bg-pantanal-gold-hover text-pantanal-light-secondary",
  "font-functional-sm",
  "font-[number:var(--functional-sm-font-weight)]",
  "text-[length:var(--functional-sm-font-size)]",
  "tracking-[var(--functional-sm-letter-spacing)]",
  "leading-[var(--functional-sm-line-height)]",
  "[font-style:var(--functional-sm-font-style)]",
  "rounded px-4 py-2 h-auto",
  "inline-flex items-center justify-center whitespace-nowrap",
  "transition-all duration-300",
  "hover:-translate-y-0.5 active:translate-y-0 active:opacity-90",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]",
].join(" ");

/** Classes para elementos <a> com estilo gold CTA (tamanho lg) */
export const goldButtonLgClass = [
  "bg-pantanal-gold hover:bg-pantanal-gold-hover text-pantanal-light-secondary",
  "h-auto lg:h-[56px]",
  "font-functional-lg font-[number:var(--functional-lg-font-weight)] tracking-[0]",
  "text-lg md:text-xl lg:text-[24px] leading-7 md:leading-8 lg:leading-[32px]",
  "px-5 md:px-6 lg:px-[24px] py-2.5 md:py-3 lg:py-[12px]",
  "rounded-md inline-flex items-center justify-center whitespace-nowrap",
  "transition-all duration-300",
  "hover:-translate-y-0.5 active:translate-y-0 active:opacity-90",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]",
].join(" ");

export function GoldButton({
  children,
  className,
  buttonSize = "sm",
  ...props
}: GoldButtonProps) {
  return (
    <Button
      className={cn(buttonSize === "lg" ? goldButtonLgClass : goldButtonClass, className)}
      {...props}
    >
      {children}
    </Button>
  );
}
```

**Step 2: Exportar `outlineButtonClass` de OutlineButton.tsx + corrigir hover hex**

```tsx
// client/src/components/pantanal/buttons/OutlineButton.tsx
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface OutlineButtonProps extends ButtonProps {
  children: React.ReactNode;
}

/** Classes para elementos <a> com estilo outline (ex: Link wouter) */
export const outlineButtonClass = [
  "h-auto lg:h-[56px] bg-transparent",
  "text-pantanal-light-primary border border-pantanal-border-primary",
  "text-lg md:text-xl lg:text-[24px] leading-7 md:leading-8 lg:leading-[32px]",
  "font-[number:var(--functional-lg-font-weight)] tracking-[0]",
  "px-5 md:px-6 lg:px-[24px] py-2.5 md:py-3 lg:py-[12px]",
  "rounded-md inline-flex items-center justify-center whitespace-nowrap",
  "transition-all duration-300",
  "hover:bg-pantanal-light-secondary hover:text-pantanal-dark-primary hover:-translate-y-0.5",
  "active:translate-y-0 active:opacity-90",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(242,252,247,0.3)]",
].join(" ");

export function OutlineButton({
  children,
  className,
  ...props
}: OutlineButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(outlineButtonClass, className)}
      {...props}
    >
      {children}
    </Button>
  );
}
```

**Step 3: Rodar testes + commit**

```bash
npm test
git add client/src/components/pantanal/buttons/GoldButton.tsx client/src/components/pantanal/buttons/OutlineButton.tsx
git commit -m "feat: GoldButton suporta buttonSize lg, OutlineButton exporta outlineButtonClass"
```

---

### Task 6: AccommodationInfoSection — substituir Button manual por GoldButton + OutlineButton

**Files:**
- Modify: `client/src/pages/sections/AccommodationInfoSection.tsx`

**Step 1: Atualizar imports**

```tsx
// Antes:
import { Button } from "@/components/ui/button";

// Depois:
import { GoldButton } from "@/components/pantanal/buttons/GoldButton";
import { OutlineButton } from "@/components/pantanal/buttons/OutlineButton";
```

**Step 2: Substituir botões (linhas 32-50)**

```tsx
// Antes:
<Button
  className="h-auto lg:h-[56px] bg-[#ac8042] hover:bg-[#8f6a35] text-[#f2fcf7] text-lg ... rounded-md transition-all duration-300 ..."
  data-testid="button-reservar-accommodations"
  onClick={() => goToCloudbedsBooking({ utmContent: "accommodations_section_reservar" })}
>
  {content.buttonReserve}
</Button>

<Button
  variant="outline"
  className="h-auto lg:h-[56px] bg-transparent text-[#e3f7ec] border-[#f2fcf7] text-lg ... hover:bg-[#f2fcf7] hover:text-[#152218] ..."
  data-testid="button-accommodations-details"
>
  {content.buttonDetails}
</Button>

// Depois:
<GoldButton
  buttonSize="lg"
  data-testid="button-reservar-accommodations"
  onClick={() => goToCloudbedsBooking({ utmContent: "accommodations_section_reservar" })}
>
  {content.buttonReserve}
</GoldButton>

<OutlineButton data-testid="button-accommodations-details">
  {content.buttonDetails}
</OutlineButton>
```

**Step 3: Rodar testes — verificar data-testid dos botões**

```bash
npm test -- --reporter=verbose
```

Verificar que `button-reservar-accommodations` e `button-accommodations-details` ainda existem nos testes.

**Step 4: Commit**

```bash
git add client/src/pages/sections/AccommodationInfoSection.tsx
git commit -m "fix: AccommodationInfoSection usa GoldButton e OutlineButton do DS"
```

---

### Task 7: NotFoundHeroSection — substituir Link manual por outlineButtonClass

**Files:**
- Modify: `client/src/pages/not-found/sections/NotFoundHeroSection.tsx`

**Step 1: Atualizar imports**

```tsx
// Adicionar:
import { outlineButtonClass } from "@/components/pantanal/buttons/OutlineButton";
```

**Step 2: Substituir o Link (linha 84-89)**

```tsx
// Antes:
<Link
  href="/"
  className="flex items-center justify-center h-14 px-6 border border-[#f2fcf7] rounded-[6px] text-[#f2fcf7] font-['Lato',sans-serif] font-semibold text-base lg:text-[24px] lg:leading-[32px] whitespace-nowrap shrink-0 transition-all duration-300 hover:bg-[#f2fcf7] hover:text-[#152218] hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)] no-underline"
>
  {buttonText}
</Link>

// Depois:
<Link href="/" className={`${outlineButtonClass} no-underline shrink-0`}>
  {buttonText}
</Link>
```

**Step 3: Rodar testes + commit**

```bash
npm test
git add client/src/pages/not-found/sections/NotFoundHeroSection.tsx
git commit -m "fix: NotFoundHeroSection usa outlineButtonClass em vez de classes manuais"
```

---

### Task 8: ExclusiveExpeditionsSection — `<div>` → `<button>` acessível

**Files:**
- Modify: `client/src/pages/sections/ExclusiveExpeditionsSection.tsx`

**Step 1: Localizar o div do botão de card**

Buscar pelo padrão `"flex items-center justify-between w-full py-3"` na seção de card.

**Step 2: Substituir `<div>` por `<button>`**

```tsx
// Antes:
<div className="flex items-center justify-between w-full py-3 ...">
  {/* conteúdo */}
</div>

// Depois:
<button
  type="button"
  className="flex items-center justify-between w-full py-3 ... cursor-pointer"
  aria-label={`Ver detalhes de ${expedition.title}`}
>
  {/* conteúdo */}
</button>
```

Nota: preservar todas as classes existentes, apenas trocar a tag.

**Step 3: Rodar testes + commit**

```bash
npm test
git add client/src/pages/sections/ExclusiveExpeditionsSection.tsx
git commit -m "fix: ExclusiveExpeditionsSection usa button acessível em vez de div"
```

---

## Phase 4: Component Usage

### Task 9: NaturalRefugeDescriptionSection — usar NumberedFeatureItem

**Files:**
- Modify: `client/src/pages/sections/NaturalRefugeDescriptionSection.tsx`

**Step 1: Atualizar imports**

```tsx
// Adicionar:
import { NumberedFeatureItem } from "@/components/pantanal/cards/NumberedFeatureItem";
```

**Step 2: Substituir implementação manual (linhas 22-44)**

```tsx
// Antes: map com motion.div + divs manuais + hex hardcoded
{content.items.map((item, index) => (
  <motion.div variants={cardItem} key={item.number} className={...}>
    <div className="flex items-start gap-4 md:gap-6 lg:gap-[24px]">
      <div className="flex w-[32px] items-start pt-[6px]">
        <span className="... text-[#8aad9c] text-[14px] ...">
        ...

// Depois: NumberedFeatureItem com theme="light"
{content.items.map((item, index) => (
  <motion.div variants={cardItem} key={item.number}>
    <NumberedFeatureItem
      number={item.number}
      title={item.title}
      description={item.description}
      theme="light"
      showBorder={index > 0}
    />
  </motion.div>
))}
```

**Step 3: Rodar testes — verificar data-testid de items**

Verificar se existem testes que buscam `text-impact-title-${item.number}`. Se existirem, adicionar `data-testid` ao componente ou ajustar.

```bash
npm test -- --reporter=verbose 2>&1 | grep -i "impact"
```

Se testes quebrarem por data-testid: adicionar `data-testid={`text-impact-title-${item.number}`}` como prop no NumberedFeatureItem ou envolver com div com testid.

**Step 4: Commit**

```bash
git add client/src/pages/sections/NaturalRefugeDescriptionSection.tsx
git commit -m "fix: NaturalRefugeDescriptionSection usa NumberedFeatureItem do DS"
```

---

### Task 10: AuthenticRestSection — usar NumberedFeatureItem

**Files:**
- Modify: `client/src/pages/sections/AuthenticRestSection.tsx`

**Step 1: Atualizar imports**

```tsx
// Adicionar:
import { NumberedFeatureItem } from "@/components/pantanal/cards/NumberedFeatureItem";
```

**Step 2: Substituir implementação manual (linhas 30-52)**

```tsx
// Antes: motion.div + divs manuais com hex hardcoded
{(content.features ?? []).map((feature, index) => (
  <motion.div variants={cardItem} key={feature.number} className={...}>
    <div className="flex items-start gap-4 ...">
      <div className="flex w-8 pt-[6px]">
        <span className="... text-[#6c927f] ...">
        ...

// Depois:
{(content.features ?? []).map((feature, index) => (
  <motion.div variants={cardItem} key={feature.number}>
    <NumberedFeatureItem
      number={feature.number}
      title={feature.title}
      description={feature.description}
      theme="dark"
      showBorder={index > 0}
    />
  </motion.div>
))}
```

**Step 3: Verificar data-testids**

```bash
npm test -- --reporter=verbose 2>&1 | grep -i "feature"
```

Se existirem testes com `text-feature-title-${feature.number}`, o comportamento deve ser mantido pois `HeadingSmall` dentro de `NumberedFeatureItem` renderiza como `h3`.

**Step 4: Commit**

```bash
git add client/src/pages/sections/AuthenticRestSection.tsx
git commit -m "fix: AuthenticRestSection usa NumberedFeatureItem do DS"
```

---

### Task 11: PantanalExperienceIntroSection — corrigir font-normal no h1

**Files:**
- Modify: `client/src/pages/sections/PantanalExperienceIntroSection.tsx`

**Step 1: Remover `font-normal` do h1 (linha 30)**

O `h1` pai tem `font-normal` hardcoded. Cada `<span>` filho já aplica `font-[number:var(--display-lg-font-weight)]`. O h1 pai deve apenas fazer o reset e deixar os spans controlarem o peso:

```tsx
// Antes (linha 30):
className="w-full text-left [font-family:'Playfair_Display',Helvetica] font-normal text-[length:var(--display-lg-font-size)] tracking-[0] leading-[var(--display-lg-line-height)]"

// Depois:
className="w-full text-left font-display-lg text-[length:var(--display-lg-font-size)] tracking-[0] leading-[var(--display-lg-line-height)]"
```

(Remove `font-normal` e `[font-family:'Playfair_Display',Helvetica]`, substitui por `font-display-lg`)

**Step 2: Rodar testes + commit**

```bash
npm test
git add client/src/pages/sections/PantanalExperienceIntroSection.tsx
git commit -m "fix: PantanalExperienceIntroSection usa font-display-lg no h1"
```

---

## Phase 5: Medium Priority Fixes

### Task 12: BlogHeroSection + ArticleHeroSection — corrigir font-bold do autor

**Files:**
- Modify: `client/src/pages/blog/sections/BlogHeroSection.tsx`
- Modify: `client/src/pages/blog/sections/ArticleHeroSection.tsx`

**Step 1: Em ambos os arquivos, substituir `font-bold` por `font-normal` no nome do autor**

```tsx
// Antes (linha ~88 em BlogHeroSection, ~87 em ArticleHeroSection):
className="font-['Lato',sans-serif] font-bold text-[#e3f7ec] text-base lg:text-lg leading-6 lg:leading-7"

// Depois:
className="font-body-sm font-[number:var(--body-sm-font-weight)] text-pantanal-light-primary"
```

**Step 2: Rodar testes + commit**

```bash
npm test
git add client/src/pages/blog/sections/BlogHeroSection.tsx client/src/pages/blog/sections/ArticleHeroSection.tsx
git commit -m "fix: nome do autor no blog usa peso correto do DS (400)"
```

---

### Task 13: SpeciesContentSection — corrigir leading hardcoded

**Files:**
- Modify: `client/src/pages/birdwatching/sections/SpeciesContentSection.tsx`

**Step 1: Localizar a constante PROSE_TEXT**

```tsx
// Antes:
const PROSE_TEXT = "font-['Lato',Helvetica] font-normal text-[#263a30] text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[1.6]";

// Depois:
const PROSE_TEXT = "font-body-lg font-[number:var(--body-lg-font-weight)] text-pantanal-darkText-primary text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)]";
```

**Step 2: Corrigir text-sm inline**

Substituir todas as ocorrências de:
```tsx
className="font-['Lato',Helvetica] font-normal text-[#263a30] text-sm leading-relaxed"
```
por:
```tsx
className="font-body-sm font-[number:var(--body-sm-font-weight)] text-pantanal-darkText-primary"
```

**Step 3: Rodar testes + commit**

```bash
npm test
git add client/src/pages/birdwatching/sections/SpeciesContentSection.tsx
git commit -m "fix: SpeciesContentSection usa tokens de tipografia e cor do DS"
```

---

### Task 14: ImmersionCallToActionSection — corrigir text-[20px] mobile

**Files:**
- Modify: `client/src/pages/sections/ImmersionCallToActionSection.tsx`

**Step 1: Localizar e corrigir (linha ~37)**

```tsx
// Antes:
className="... text-[20px] md:text-[length:var(--body-lg-font-size)] leading-[1.5] md:leading-[var(--body-lg-line-height)] ..."

// Depois:
className="... text-[length:var(--body-lg-font-size)] leading-[var(--body-lg-line-height)] ..."
```

(Remove os overrides mobile — o CSS variable já é responsivo via media query em index.css)

**Step 2: Rodar testes + commit**

```bash
npm test
git add client/src/pages/sections/ImmersionCallToActionSection.tsx
git commit -m "fix: ImmersionCallToActionSection usa token responsivo body-lg"
```

---

### Task 15: ExpeditionCard — remover override de cor no HeadingMedium

**Files:**
- Modify: `client/src/components/pantanal/cards/ExpeditionCard.tsx`

**Step 1: Localizar e corrigir (linha 45)**

```tsx
// Antes:
<HeadingMedium className="text-pantanal-light-primary">
  {title}
</HeadingMedium>

// Depois:
<HeadingMedium theme="dark">
  {title}
</HeadingMedium>
```

**Step 2: Rodar testes + commit**

```bash
npm test
git add client/src/components/pantanal/cards/ExpeditionCard.tsx
git commit -m "fix: ExpeditionCard usa prop theme no HeadingMedium em vez de override"
```

---

### Task 16: NavHeader — substituir hex por tokens (seletivo)

**Escopo limitado:** Apenas substituições diretas de hex por tokens equivalentes, sem mudança de layout ou comportamento.

**Files:**
- Modify: `client/src/components/NavHeader.tsx`

**Step 1: Substituições de cor via busca e replace**

Fazer as seguintes substituições no arquivo inteiro:

| De | Para |
|----|------|
| `text-[#f2fcf7]` | `text-pantanal-light-secondary` |
| `text-[#e3f7ec]` | `text-pantanal-light-primary` |
| `text-[#cfebdd]` | `text-pantanal-light-tertiary` |
| `text-[#a8cab9]` | `text-pantanal-light-muted` |
| `text-[#d7a45d]` | `text-pantanal-light-highlight` |
| `border-[#446354]` | `border-pantanal-border-light` |
| `bg-[#344e41]` | `bg-pantanal-medium` |
| `bg-[#263a30]` | `bg-pantanal-dark-secondary` |
| `bg-[#152218]` | `bg-pantanal-dark-primary` |

**Step 2: NÃO alterar:**
- `font-semibold text-[22px]` no mobile menu (tipografia — tarefa separada)
- Classes de layout, tamanhos, `px-`, `py-`
- Opacidades inline (rgba)
- `shadow-[...]` (avaliar separadamente)

**Step 3: Rodar testes + commit**

```bash
npm test
git add client/src/components/NavHeader.tsx
git commit -m "fix: NavHeader substitui hex por tokens pantanal-*"
```

---

## Phase 6: Low Priority + Cleanup

### Task 17: Divider + ApartmentSection + PrivacyContentSection

**Files:**
- Modify: `client/src/components/Divider.tsx`
- Modify: `client/src/pages/acomodacoes/sections/ApartmentSection.tsx`
- Modify: `client/src/pages/privacidade/sections/PrivacyContentSection.tsx`

**Step 1: Divider.tsx — substituir hex por tokens (linhas 17-18)**

```tsx
// Antes:
theme === "dark" ? "bg-[#f2fcf7]" : "bg-[#344E41]"

// Depois:
theme === "dark" ? "bg-pantanal-border-primary" : "bg-pantanal-medium"
```

**Step 2: ApartmentSection.tsx — substituir separador por token**

```tsx
// Antes:
<div className="w-full h-px bg-[rgba(168,202,185,0.2)]" />

// Depois:
<div className="w-full h-px bg-pantanal-border-muted/20" />
```

**Step 3: PrivacyContentSection.tsx — corrigir leading-[48px]**

```tsx
// Antes (linhas ~113, ~148):
leading-relaxed lg:leading-[48px]

// Depois:
leading-[var(--body-lg-line-height)]
```

**Step 4: Rodar testes + commit**

```bash
npm test
git add client/src/components/Divider.tsx client/src/pages/acomodacoes/sections/ApartmentSection.tsx client/src/pages/privacidade/sections/PrivacyContentSection.tsx
git commit -m "fix: Divider, ApartmentSection e PrivacyContent usam tokens do DS"
```

---

### Task 18: Paginação — rounded → rounded-md

**Files:**
- Modify: `client/src/pages/blog/sections/BlogCategoriesSection.tsx`
- Modify: `client/src/pages/birdwatching/sections/AllBirdsSection.tsx`

**Step 1: Em ambos os arquivos, substituir botões de paginação**

Buscar por `rounded` nos botões de paginação (classes como `"rounded"`) e substituir por `"rounded-md"`.

Contexto dos botões de paginação (são 3 botões: anterior, páginas, próximo):
```tsx
// Antes: className="... rounded ..."
// Depois: className="... rounded-md ..."
```

**Step 2: Também corrigir hex nessas seções**

```tsx
// Em BlogCategoriesSection.tsx e AllBirdsSection.tsx, substituir:
bg-[#f5e8db]  → bg-pantanal-creamDark
bg-[#ac8042]  → bg-pantanal-gold
text-[#f2fcf7] → text-pantanal-light-secondary
text-[#263a30] → text-pantanal-darkText-primary
```

**Step 3: Rodar testes + commit**

```bash
npm test
git add client/src/pages/blog/sections/BlogCategoriesSection.tsx client/src/pages/birdwatching/sections/AllBirdsSection.tsx
git commit -m "fix: paginação usa rounded-md e tokens de cor do DS"
```

---

## Phase 7: Hero Sections — 100vh

### Task 19: Padronizar altura de todas as hero sections para `h-screen` (100vh)

**Contexto:** Atualmente cada hero usa alturas fixas em pixels diferentes por breakpoint — resquício de design por dispositivo específico. A uniformização para `h-screen` (= `100vh`) elimina os valores arbitrários e garante que a hero sempre preencha a viewport inteira.

**Nota sobre PrivacyHeroSection:** É um cabeçalho de conteúdo curto sem imagem de fundo. Torná-lo 100vh deixará espaço vazio excessivo. Incluído aqui por consistência, mas é o único candidato a ser `min-h-[40vh]` em vez de `h-screen` — decidir visualmente.

**Nota sobre SpeciesHeroSection:** Não tem altura definida (auto). Receberá `min-h-screen` (permite crescer além de 100vh se o conteúdo exigir).

**Inventário de alturas atuais a substituir:**

| Arquivo | Antes | Depois |
|---------|-------|--------|
| `sections/PantanalHeroSection.tsx` | `h-[844px] md:h-[680px] lg:h-[740px]` | `h-screen` |
| `acomodacoes/sections/AccommodationsHeroSection.tsx` | `h-[844px] md:h-[680px] lg:h-[920px]` | `h-screen` |
| `birdwatching/sections/BirdHeroSection.tsx` | `h-[844px] md:h-[680px] lg:h-[920px]` | `h-screen` |
| `birdwatching/sections/CatalogHeroSection.tsx` | `h-[844px] md:h-[680px] lg:h-[920px]` | `h-screen` |
| `blog/sections/ArticleHeroSection.tsx` | `h-[844px] md:h-[680px] lg:h-[1000px]` | `h-screen` |
| `blog/sections/BlogHeroSection.tsx` | `h-[844px] md:h-[680px] lg:h-[1000px]` | `h-screen` |
| `culinaria/sections/CulinaryHeroSection.tsx` | `h-[844px] md:h-[680px] lg:h-[920px]` | `h-screen` |
| `ecoturismo/sections/EcoHeroSection.tsx` | `h-[844px] md:h-[680px] lg:h-[920px]` | `h-screen` |
| `nosso-impacto/sections/ImpactHeroSection.tsx` | `h-[844px] md:h-[680px] lg:h-[920px]` | `h-screen` |
| `not-found/sections/NotFoundHeroSection.tsx` | `h-[844px] md:h-[680px] lg:h-[1080px]` | `h-screen` |
| `pesca/sections/PescaHeroSection.tsx` | `h-[844px] md:h-[680px] lg:h-[920px]` | `h-screen` |
| `contato/sections/ContactHeroSection.tsx` | `h-[844px] md:h-[680px] lg:h-[1080px]` | `h-screen` |
| `regiao/sections/RegiaoHeroSection.tsx` | `min-h-[70vh] md:min-h-[80vh]` | `min-h-screen` |
| `birdwatching/sections/SpeciesHeroSection.tsx` | *(sem altura — auto)* | `min-h-screen` |
| `privacidade/sections/PrivacyHeroSection.tsx` | `h-[480px] md:h-[480px] lg:h-[592px]` | `h-screen` *(ver nota)* |

**Files:**
- Modify: `client/src/pages/sections/PantanalHeroSection.tsx`
- Modify: `client/src/pages/acomodacoes/sections/AccommodationsHeroSection.tsx`
- Modify: `client/src/pages/birdwatching/sections/BirdHeroSection.tsx`
- Modify: `client/src/pages/birdwatching/sections/CatalogHeroSection.tsx`
- Modify: `client/src/pages/blog/sections/ArticleHeroSection.tsx`
- Modify: `client/src/pages/blog/sections/BlogHeroSection.tsx`
- Modify: `client/src/pages/culinaria/sections/CulinaryHeroSection.tsx`
- Modify: `client/src/pages/ecoturismo/sections/EcoHeroSection.tsx`
- Modify: `client/src/pages/nosso-impacto/sections/ImpactHeroSection.tsx`
- Modify: `client/src/pages/not-found/sections/NotFoundHeroSection.tsx`
- Modify: `client/src/pages/pesca/sections/PescaHeroSection.tsx`
- Modify: `client/src/pages/contato/sections/ContactHeroSection.tsx`
- Modify: `client/src/pages/regiao/sections/RegiaoHeroSection.tsx`
- Modify: `client/src/pages/birdwatching/sections/SpeciesHeroSection.tsx`
- Modify: `client/src/pages/privacidade/sections/PrivacyHeroSection.tsx`

**Step 1: Aplicar `h-screen` nas 12 heroes com alturas fixas em px**

Em cada arquivo da lista acima (exceto RegiaoHeroSection, SpeciesHeroSection e PrivacyHeroSection), localizar a className do `<section>` raiz e substituir o bloco de altura:

```tsx
// Padrão a buscar em cada arquivo:
h-[844px] md:h-[680px] lg:h-[Npx]

// Substituir por:
h-screen
```

Exemplo concreto em `AccommodationsHeroSection.tsx`:
```tsx
// Antes:
<section className="relative flex flex-col h-[844px] md:h-[680px] lg:h-[920px] items-center justify-end w-full z-[11] overflow-hidden">

// Depois:
<section className="relative flex flex-col h-screen items-center justify-end w-full z-[11] overflow-hidden">
```

Repetir para todos os 12 arquivos com o mesmo padrão `h-[844px] md:h-[680px] lg:h-[Npx]`.

**Step 2: RegiaoHeroSection — atualizar de vh parcial para min-h-screen**

```tsx
// Antes:
<section className="relative flex flex-col items-center justify-center w-full min-h-[70vh] md:min-h-[80vh] overflow-hidden">

// Depois:
<section className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden">
```

**Step 3: SpeciesHeroSection — adicionar min-h-screen à section raiz**

```tsx
// Antes (linha 23):
<section className="relative flex flex-col items-center w-full z-[11] overflow-hidden bg-[#263a30]">

// Depois:
<section className="relative flex flex-col items-center w-full min-h-screen z-[11] overflow-hidden bg-pantanal-dark-secondary">
```

(Aproveitar para corrigir `bg-[#263a30]` → `bg-pantanal-dark-secondary` junto)

**Step 4: PrivacyHeroSection — aplicar h-screen**

```tsx
// Antes (linha 17):
<section className="relative flex flex-col h-[480px] md:h-[480px] lg:h-[592px] items-center justify-end w-full z-[11] overflow-hidden bg-pantanal-dark-secondary">

// Depois:
<section className="relative flex flex-col h-screen items-center justify-end w-full z-[11] overflow-hidden bg-pantanal-dark-secondary">
```

**Step 5: Rodar testes**

```bash
cd c:/Itaicy/Replit/itaicypantanal && npm test
```

Esperado: todos os testes passam. Os testes existentes não verificam altura de seções, apenas presença de elementos e comportamento.

**Step 6: Commit**

```bash
git add \
  client/src/pages/sections/PantanalHeroSection.tsx \
  client/src/pages/acomodacoes/sections/AccommodationsHeroSection.tsx \
  client/src/pages/birdwatching/sections/BirdHeroSection.tsx \
  client/src/pages/birdwatching/sections/CatalogHeroSection.tsx \
  client/src/pages/blog/sections/ArticleHeroSection.tsx \
  client/src/pages/blog/sections/BlogHeroSection.tsx \
  client/src/pages/culinaria/sections/CulinaryHeroSection.tsx \
  client/src/pages/ecoturismo/sections/EcoHeroSection.tsx \
  client/src/pages/nosso-impacto/sections/ImpactHeroSection.tsx \
  client/src/pages/not-found/sections/NotFoundHeroSection.tsx \
  client/src/pages/pesca/sections/PescaHeroSection.tsx \
  client/src/pages/contato/sections/ContactHeroSection.tsx \
  client/src/pages/regiao/sections/RegiaoHeroSection.tsx \
  client/src/pages/birdwatching/sections/SpeciesHeroSection.tsx \
  client/src/pages/privacidade/sections/PrivacyHeroSection.tsx
git commit -m "feat: todas as hero sections usam h-screen (100vh) em vez de alturas fixas"
```

---

## Checklist de verificação final

Após todos os tasks:

**Rodar suite completa:**
```bash
cd c:/Itaicy/Replit/itaicypantanal && npm test
```
Esperado: todos os testes passam (88+)

**Buscar hex residual nas seções:**
```bash
grep -rn 'bg-\[#' client/src/pages/ --include="*.tsx" | head -20
grep -rn 'text-\[#' client/src/pages/ --include="*.tsx" | head -20
```

Valores que podem permanecer (são legítimos):
- `bg-[linear-gradient(...)]` — gradientes em heroes
- `bg-[rgba(10,19,12,0.65)]` — overlays com opacidade não representável via token Tailwind
- `style={{ color: segment.color }}` — cores dinâmicas do CMS

**Buscar font-family hardcoded:**
```bash
grep -rn "font-family:" client/src/pages/ --include="*.tsx" | grep -v "CSS"
grep -rn "\[font-family:" client/src/pages/ --include="*.tsx" | head -20
```

---

## O que este plano NÃO cobre (epics separados)

1. **SectionContainer refactor** — Envolver todas as home sections em `<SectionContainer>` + `<Container>` + `<SectionHeader>`. Requer redesenho de como o conteúdo é passado e pode quebrar animações.
2. **BirdSpeciesCard avatar** — Requer campo `authorAvatar` no modelo `BirdSpecies` do CMS.
3. **NavHeader tipografia mobile** — `font-semibold text-[22px]` requer decisão de design sobre qual token usar (heading-sm = 24px ou criar novo token).
4. **Gaps de seções (64px vs 100px)** — Requer validação visual com o designer antes de padronizar.
5. **Footer/NavHeader lg:px-10 vs lg:px-16** — Pode ser intencional para alinhar com logo. Requer decisão de design.
