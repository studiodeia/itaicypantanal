# Audit 360° — Refinamentos de Copy, UX & Conversão

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implementar os ajustes de copy, UX e conversão identificados na auditoria 360° para transformar o site em máquina de vendas alinhada à estratégia "Eco Lodge Internacional All-Inclusive".

**Architecture:** Edições pontuais em seções existentes (copy, badges, CTAs contextuais), um novo componente de segmentação na newsletter, e uma nova página `/contato`. Tudo dentro da arquitetura de composição por seções já estabelecida.

**Tech Stack:** React 18, TypeScript, Tailwind 3, design system pantanal/*, Vitest + RTL para testes.

---

## Fase 1: Mensagem All-Inclusive (O Grande Diferencial)

### Task 1: Badge "All-Inclusive Premium" no Booking Widget

**Contexto:** O diferencial all-inclusive está sutil demais. Adicionar badge dourada visível no widget de reserva.

**Files:**
- Modify: `client/src/components/BookingDatePicker.tsx`

**Step 1: Adicionar badge acima do date picker (variante hero)**

No `BookingDatePicker.tsx`, adicionar uma tag/badge dourada "Sistema Premium All-Inclusive" logo acima do trigger do calendário, visível apenas na variante `hero`.

```tsx
{variant === "hero" && (
  <span className="font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[#ac8042] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] tracking-[1.5px] uppercase">
    Sistema Premium All-Inclusive
  </span>
)}
```

Posicionar dentro do container, antes do trigger button.

**Step 2: Verificar visualmente**

Run: `npm run dev` → http://localhost:5000
Expected: Badge dourada "SISTEMA PREMIUM ALL-INCLUSIVE" visível acima do seletor de datas no hero da home.

**Step 3: Commit**

```bash
git add client/src/components/BookingDatePicker.tsx
git commit -m "feat: add All-Inclusive Premium badge to booking widget"
```

---

### Task 2: Elevar copy "O Essencial da Sua Estadia" para All-Inclusive

**Contexto:** Os ícones precisam gritar valor. Ajustar títulos e descrições dos highlight cards para enfatizar o pacote all-inclusive.

**Files:**
- Modify: `client/src/pages/acomodacoes/sections/AccommodationsHighlightsSection.tsx`

**Step 1: Reescrever os highlights**

Atualizar o array `highlights` (linhas 3-39) com copy mais impactante:

| De | Para (título) | Para (descrição) |
|----|---------------|-------------------|
| Pensão Completa | Gastronomia Full-Board | Café da manhã, almoço com ingredientes locais, lanche da tarde e jantar autoral — tudo incluso |
| Bebidas Inclusas | Open Bar & Bebidas Premium | Água, sucos naturais, café especial e refrigerantes disponíveis durante toda a estadia |
| Expedições Guiadas | Expedições Privativas Inclusas | Passeio de barco e cavalgada guiada inclusos — explore a fauna e flora com especialistas |
| Varanda Privativa | Varanda com Vista para o Pantanal | Todas as suítes possuem varanda privativa para contemplação e observação de aves |
| Conforto Climatizado | Climatização Individual | Ar-condicionado split em todas as suítes para conforto em qualquer estação |
| Wi-Fi Satélite | Conectividade Essencial | Wi-Fi via satélite nas áreas sociais — desconecte-se do mundo, conecte-se ao Pantanal |

**Step 2: Verificar visualmente**

Run: `npm run dev` → http://localhost:5000/acomodacoes
Expected: Cards com títulos e descrições atualizados na seção de highlights.

**Step 3: Commit**

```bash
git add client/src/pages/acomodacoes/sections/AccommodationsHighlightsSection.tsx
git commit -m "feat: elevate accommodation highlights copy for all-inclusive positioning"
```

---

## Fase 2: Refinamento de Copy Estratégico

### Task 3: Renomear Acomodações (Suítes com Nome)

**Contexto:** Nomes criam percepção de valor. "Apartamento" → "Suíte" com nome evocativo.

**Files:**
- Modify: `client/src/pages/Acomodacoes.tsx` (linhas 12-49, constantes dos apartamentos)

**Step 1: Atualizar constantes**

```tsx
const apartments = [
  {
    label: "SUÍTE EXPLORER",
    title: "Suíte Explorer",
    subtitle: "Single · 1 hóspede",
    description: "O refúgio ideal para o viajante solo que busca imersão total. Privacidade, silêncio e conexão com a natureza no seu próprio ritmo.",
    // ... manter resto (images, amenities)
  },
  {
    label: "SUÍTE ADVENTURE",
    title: "Suíte Adventure",
    subtitle: "Duplo · 2 hóspedes",
    description: "Projetada para casais que buscam uma experiência a dois no coração do Pantanal. Conforto, natureza e momentos inesquecíveis.",
    // ... manter resto
  },
  {
    label: "SUÍTE FAMILY",
    title: "Suíte Family",
    subtitle: "Triplo · 3 hóspedes",
    description: "A mais espaçosa das nossas suítes. Perfeita para famílias ou pequenos grupos, com cama de casal, solteiro e ampla área de convivência.",
    // ... manter resto
  },
];
```

**Step 2: Verificar que ApartmentSection renderiza os novos nomes**

Run: `npm run dev` → http://localhost:5000/acomodacoes
Expected: Títulos "Suíte Explorer", "Suíte Adventure", "Suíte Family" nas seções de acomodação.

**Step 3: Commit**

```bash
git add client/src/pages/Acomodacoes.tsx
git commit -m "feat: rename apartments to named suites (Explorer, Adventure, Family)"
```

---

### Task 4: Refinar Copy da Gastronomia (Tom Sofisticado)

**Contexto:** "Não buscamos o gourmet, mas o autêntico" pode ser lido como "simples". Precisamos do meio-termo sofisticado: ingredientes locais + técnica de alta gastronomia.

**Files:**
- Modify: `client/src/pages/culinaria/sections/CulinaryManifestoSection.tsx` (manifesto principal)
- Modify: `client/src/pages/culinaria/sections/CulinaryHeroSection.tsx` (subtítulo do hero)

**Step 1: Reescrever o manifesto da culinária**

De:
```
Não buscamos o gourmet, mas o autêntico. ingredientes locais frescos,
o resgate de receitas pantaneiras e o preparo 'bem feitinho', com o
tempo que o fogo e a natureza exigem.
```

Para:
```
A alma do Pantanal, a técnica do mundo. Ingredientes locais colhidos no dia,
técnicas de alta gastronomia e o tempo que cada prato merece — uma
cozinha autoral que honra a terra e surpreende o paladar.
```

Palavras em dourado (`#d7a45d`): "alma do Pantanal" e "técnicas de alta gastronomia".

**Step 2: Reescrever o subtítulo do hero da culinária**

De:
```
Uma jornada de sabores autênticos, do rio e da terra pantaneira direto para a sua mesa.
```

Para:
```
Ingredientes do rio e da terra, técnica internacional e alma pantaneira em cada prato.
```

**Step 3: Verificar visualmente**

Run: `npm run dev` → http://localhost:5000/culinaria
Expected: Manifesto e subtítulo com novo tom sofisticado.

**Step 4: Commit**

```bash
git add client/src/pages/culinaria/sections/CulinaryManifestoSection.tsx client/src/pages/culinaria/sections/CulinaryHeroSection.tsx
git commit -m "feat: elevate culinary copy — sophisticated tone balancing local + technique"
```

---

### Task 5: Aumentar Contraste do Subtítulo no Hero da Home

**Contexto:** O subtítulo do hero da home tem pouco contraste contra o vídeo. Precisa ser mais legível.

**Files:**
- Modify: `client/src/pages/sections/PantanalHeroSection.tsx` (linhas 42-45)

**Step 1: Aumentar contraste do subtítulo**

Trocar a cor do subtítulo de `text-[#e3f7ec]` (igual ao heading) para `text-[#f2fcf7]` (branco puro do design system) e aumentar o tamanho para `body-lg`:

De:
```tsx
<p className="font-body-md ... text-[#e3f7ec] ...">
```

Para:
```tsx
<p className="font-body-lg font-[number:var(--body-lg-font-weight)] text-[length:var(--body-lg-font-size)] leading-[var(--body-lg-line-height)] text-[#f2fcf7] tracking-[var(--body-lg-letter-spacing)] [font-style:var(--body-lg-font-style)] max-w-[592px]">
```

**Step 2: Verificar visualmente**

Run: `npm run dev` → http://localhost:5000
Expected: Subtítulo do hero mais legível, com fonte maior e cor mais clara.

**Step 3: Commit**

```bash
git add client/src/pages/sections/PantanalHeroSection.tsx
git commit -m "feat: increase hero subtitle contrast and size for better readability"
```

---

## Fase 3: Funis de Conversão (CTAs Contextuais)

### Task 6: CTA Contextual nas Páginas de Aves (Birdwatcher Funnel)

**Contexto:** O birdwatcher lê sobre a ave e não tem call-to-action. Precisamos de um card de conversão contextual dentro da BirdServicesSection.

**Files:**
- Modify: `client/src/pages/birdwatching/sections/BirdServicesSection.tsx`

**Step 1: Escrever teste para o CTA contextual**

```tsx
// Em BirdServicesSection.test.tsx (criar arquivo)
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BirdServicesSection } from "./BirdServicesSection";

describe("BirdServicesSection", () => {
  it("renders the contextual CTA card", () => {
    render(<BirdServicesSection />);
    expect(
      screen.getByText(/quer fotografar/i),
    ).toBeInTheDocument();
  });

  it("renders the CTA button with booking link", () => {
    render(<BirdServicesSection />);
    const link = screen.getByRole("link", {
      name: /agendar expedição fotográfica/i,
    });
    expect(link).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `cd /c/Itaicy/Replit/itaicypantanal && npx vitest run client/src/pages/birdwatching/sections/BirdServicesSection.test.tsx`
Expected: FAIL — texto "quer fotografar" não encontrado.

**Step 3: Adicionar card CTA após o grid de espécies**

Depois do grid 2x2 de aves, antes do link "Ver guia completo", adicionar:

```tsx
{/* CTA contextual — conversão do birdwatcher */}
<div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 w-full p-6 md:p-8 lg:p-10 bg-[#344e41] rounded-lg">
  <div className="flex flex-col gap-3 flex-1">
    <h3
      className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[#e3f7ec] text-[length:var(--heading-sm-font-size)] leading-[var(--heading-sm-line-height)] tracking-[var(--heading-sm-letter-spacing)] [font-style:var(--heading-sm-font-style)]"
      style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
    >
      Quer fotografar essas espécies de perto?
    </h3>
    <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)] max-w-[600px]">
      Nossos guias especializados sabem onde estão os ninhos ativos e os melhores pontos de observação. Expedições fotográficas exclusivas com acesso a áreas restritas.
    </p>
  </div>
  <a
    href="/observacao-de-aves#reservar"
    className="flex items-center justify-center h-14 px-6 bg-[#ac8042] hover:bg-[#8f6a35] rounded-[6px] text-[#f2fcf7] font-['Lato',sans-serif] font-semibold text-base lg:text-lg whitespace-nowrap shrink-0 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]"
  >
    Agendar Expedição Fotográfica
  </a>
</div>
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run client/src/pages/birdwatching/sections/BirdServicesSection.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add client/src/pages/birdwatching/sections/BirdServicesSection.tsx client/src/pages/birdwatching/sections/BirdServicesSection.test.tsx
git commit -m "feat: add contextual CTA card to bird species section (birdwatcher funnel)"
```

---

### Task 7: CTA Contextual nas Páginas de Pesca (Fisherman Funnel)

**Contexto:** O pescador precisa ver prova de performance. Adicionar CTA contextual na PescaServicesSection.

**Files:**
- Modify: `client/src/pages/pesca/sections/PescaServicesSection.tsx`
- Create: `client/src/pages/pesca/sections/PescaServicesSection.test.tsx`

**Step 1: Escrever teste**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PescaServicesSection } from "./PescaServicesSection";

describe("PescaServicesSection", () => {
  it("renders the contextual CTA card", () => {
    render(<PescaServicesSection />);
    expect(
      screen.getByText(/pronto para pescar/i),
    ).toBeInTheDocument();
  });

  it("renders the CTA button with booking link", () => {
    render(<PescaServicesSection />);
    const link = screen.getByRole("link", {
      name: /reservar expedição/i,
    });
    expect(link).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run client/src/pages/pesca/sections/PescaServicesSection.test.tsx`
Expected: FAIL

**Step 3: Adicionar card CTA após o grid de peixes**

Mesmo padrão visual da Task 6, mas com copy de pesca:

```tsx
{/* CTA contextual — conversão do pescador */}
<div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 w-full p-6 md:p-8 lg:p-10 bg-[#344e41] rounded-lg">
  <div className="flex flex-col gap-3 flex-1">
    <h3
      className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[#e3f7ec] text-[length:var(--heading-sm-font-size)] leading-[var(--heading-sm-line-height)] tracking-[var(--heading-sm-letter-spacing)] [font-style:var(--heading-sm-font-style)]"
      style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
    >
      Pronto para pescar os gigantes do Pantanal?
    </h3>
    <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)] max-w-[600px]">
      Barcos equipados com sonar, piloteiros nativos e acesso exclusivo a zonas de pesca restrita. Sua melhor pescaria começa aqui.
    </p>
  </div>
  <a
    href="/pesca#reservar"
    className="flex items-center justify-center h-14 px-6 bg-[#ac8042] hover:bg-[#8f6a35] rounded-[6px] text-[#f2fcf7] font-['Lato',sans-serif] font-semibold text-base lg:text-lg whitespace-nowrap shrink-0 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]"
  >
    Reservar Expedição de Pesca
  </a>
</div>
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run client/src/pages/pesca/sections/PescaServicesSection.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add client/src/pages/pesca/sections/PescaServicesSection.tsx client/src/pages/pesca/sections/PescaServicesSection.test.tsx
git commit -m "feat: add contextual CTA card to fish species section (fisherman funnel)"
```

---

## Fase 4: Segmentação de Leads (Newsletter)

### Task 8: Tags de Interesse na Newsletter

**Contexto:** Não sabemos se o lead quer pescar ou ver passarinho. Adicionar tags clicáveis antes do input de e-mail para segmentação.

**Files:**
- Modify: `client/src/pages/sections/SiteFooterSection.tsx`

**Step 1: Escrever teste**

```tsx
// Em SiteFooterSection.test.tsx (criar arquivo)
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SiteFooterSection } from "./SiteFooterSection";

describe("SiteFooterSection — newsletter segmentation", () => {
  it("renders interest tags", () => {
    render(<SiteFooterSection />);
    expect(screen.getByText("Quero Pescar")).toBeInTheDocument();
    expect(screen.getByText("Quero Natureza")).toBeInTheDocument();
    expect(screen.getByText("Viagem em Família")).toBeInTheDocument();
  });

  it("toggles tag selection on click", () => {
    render(<SiteFooterSection />);
    const tag = screen.getByText("Quero Pescar");
    fireEvent.click(tag);
    expect(tag.closest("button")).toHaveClass("bg-[#ac8042]");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run client/src/pages/sections/SiteFooterSection.test.tsx`
Expected: FAIL — textos "Quero Pescar" etc. não encontrados.

**Step 3: Adicionar tags de segmentação antes do input**

Na `SiteFooterSection.tsx`, logo abaixo do label "Diário de Campo Itaicy", adicionar:

```tsx
{/* Interest tags for lead segmentation */}
<div className="flex flex-wrap gap-2">
  {["Quero Pescar", "Quero Natureza", "Viagem em Família"].map(
    (interest) => (
      <button
        key={interest}
        type="button"
        onClick={() => toggleInterest(interest)}
        className={`px-3 py-1 rounded-full border text-sm transition-all duration-300 ${
          selectedInterests.includes(interest)
            ? "bg-[#ac8042] border-[#ac8042] text-[#f2fcf7]"
            : "bg-transparent border-[#a8cab9] text-[#a8cab9] hover:border-[#e3f7ec] hover:text-[#e3f7ec]"
        }`}
      >
        {interest}
      </button>
    ),
  )}
</div>
```

Adicionar state no componente:
```tsx
const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

const toggleInterest = (interest: string) => {
  setSelectedInterests((prev) =>
    prev.includes(interest)
      ? prev.filter((i) => i !== interest)
      : [...prev, interest],
  );
};
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run client/src/pages/sections/SiteFooterSection.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add client/src/pages/sections/SiteFooterSection.tsx client/src/pages/sections/SiteFooterSection.test.tsx
git commit -m "feat: add interest segmentation tags to newsletter form"
```

---

## Fase 5: Página de Contato

### Task 9: Criar Página /contato

**Contexto:** Não existe página de contato. Criar com formulário dark theme incluindo campo "Data Prevista" (opcional) para priorização de leads.

**Files:**
- Create: `client/src/pages/contato/sections/ContactHeroSection.tsx`
- Create: `client/src/pages/contato/sections/ContactHeroSection.test.tsx`
- Create: `client/src/pages/contato/sections/ContactFormSection.tsx`
- Create: `client/src/pages/contato/sections/ContactFormSection.test.tsx`
- Create: `client/src/pages/contato/index.tsx`
- Modify: `client/src/App.tsx` (adicionar rota)

**Step 1: Escrever testes do formulário**

```tsx
// ContactFormSection.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactFormSection } from "./ContactFormSection";

describe("ContactFormSection", () => {
  it("renders name field", () => {
    render(<ContactFormSection />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
  });

  it("renders email field", () => {
    render(<ContactFormSection />);
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
  });

  it("renders interest select", () => {
    render(<ContactFormSection />);
    expect(screen.getByLabelText(/interesse/i)).toBeInTheDocument();
  });

  it("renders optional planned date field", () => {
    render(<ContactFormSection />);
    expect(screen.getByLabelText(/data prevista/i)).toBeInTheDocument();
  });

  it("renders message field", () => {
    render(<ContactFormSection />);
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactFormSection />);
    expect(
      screen.getByRole("button", { name: /enviar mensagem/i }),
    ).toBeInTheDocument();
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `npx vitest run client/src/pages/contato/sections/ContactFormSection.test.tsx`
Expected: FAIL — módulo não encontrado.

**Step 3: Implementar ContactFormSection**

Seção com background dark (`#263a30`), formulário com campos:
- Nome completo (text input)
- E-mail (email input)
- Interesse (select: Pesca Esportiva / Observação de Aves / Ecoturismo / Gastronomia / Hospedagem / Outro)
- Data prevista (date input, opcional, com label "(opcional)")
- Mensagem (textarea)
- Botão "Enviar Mensagem" (gold `#ac8042`)

Estilização: inputs com `bg-transparent border-b border-[#a8cab9]` + `focus:border-[#ac8042]`, igual à newsletter.

**Step 4: Implementar ContactHeroSection**

Hero simples com background image, NavHeader, label "CONTATO", título "Fale Conosco", descrição. Mesmo padrão de outros internal heroes.

**Step 5: Criar página de composição**

```tsx
// client/src/pages/contato/index.tsx
import { ContactHeroSection } from "./sections/ContactHeroSection";
import { ContactFormSection } from "./sections/ContactFormSection";
import { FrequentlyAskedQuestionsSection } from "@/pages/sections/FrequentlyAskedQuestionsSection";
import { SiteFooterSection } from "@/pages/sections/SiteFooterSection";

export const Contato = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <ContactHeroSection />
      <ContactFormSection />
      <FrequentlyAskedQuestionsSection />
      <SiteFooterSection />
    </div>
  );
};
```

**Step 6: Adicionar rota no App.tsx**

```tsx
import { Contato } from "@/pages/contato";
// ...
<Route path="/contato" component={Contato} />
```

**Step 7: Run all tests**

Run: `npx vitest run`
Expected: ALL PASS

**Step 8: Commit**

```bash
git add client/src/pages/contato/ client/src/App.tsx
git commit -m "feat: add /contato page with segmented form and planned date field"
```

---

## Resumo das Fases

| Fase | Tasks | Foco | Impacto |
|------|-------|------|---------|
| 1 | 1-2 | All-Inclusive Premium | Justifica ticket alto |
| 2 | 3-5 | Copy estratégico | Percepção de valor |
| 3 | 6-7 | CTAs contextuais | Conversão de curiosos → leads |
| 4 | 8 | Segmentação newsletter | Qualificação de leads |
| 5 | 9 | Página /contato | Captura direta com priorização |

**Total:** 9 tasks, ~5 commits, estimativa de execução: 1 sessão focada.

**Dependências entre tasks:** Nenhuma — todas as tasks são independentes e podem ser executadas em qualquer ordem ou em paralelo.
