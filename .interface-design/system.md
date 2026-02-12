# Itaicy Pantanal Design System

## Direction

**Estilo**: Elegante, Natural, Imersivo
**Tom**: Sofisticado e autêntico, conectado à natureza do Pantanal
**Princípios**:
- Elegância essencial em harmonia com o bioma
- Experiência imersiva e autêntica
- Sem excessos, sem concessões
- Design responsivo mobile-first (390px, 768px, 1024px+)

---

## Quick Start (Cheat Sheet para Novas Páginas)

```tsx
import {
  // Typography
  DisplayLarge, HeadingLarge, HeadingMedium, HeadingSmall,
  BodyText, LeadText, FunctionalText,
  // Layout
  Container, SectionContainer, SectionHeader,
  BackgroundImageSection, HorizontalScroll,
  // Buttons
  GoldButton, OutlineButton,
  // Cards
  ExpeditionCard, TestimonialCard, BlogCard, NumberedFeatureItem,
} from "@/components/pantanal";

// Seção dark padrão
<SectionContainer background="secondary">
  <Container>
    <SectionHeader layout="split" label="LABEL" title="Título" description="Desc" />
    <BodyText size="md" variant="muted">Texto</BodyText>
    <GoldButton>CTA</GoldButton>
  </Container>
</SectionContainer>

// Seção light (cream)
<SectionContainer background="cream">
  <Container>
    <SectionHeader theme="light" label="LABEL" title="Título" />
    <HeadingSmall theme="light">Subtítulo</HeadingSmall>
    <BodyText theme="light" variant="secondary">Texto escuro</BodyText>
  </Container>
</SectionContainer>

// Seção com imagem de fundo
<BackgroundImageSection backgroundImage="/figmaAssets/img.png">
  <Container>
    <HeadingLarge>Título sobre imagem</HeadingLarge>
    <GoldButton buttonSize="lg">Reservar</GoldButton>
    <OutlineButton>Mais detalhes</OutlineButton>
  </Container>
</BackgroundImageSection>
```

---

## Hierarquia de Composição

```
SectionContainer (background + padding)
  └── Container (max-w-1440 + centering)
       ├── SectionHeader (label + title + desc)
       └── Content (flex/grid com componentes)
```

---

## Spacing

**Sistema de Grid**: 4px base
**Escala de Espaçamento**:
- xs: 4px (gap-1)
- sm: 8px (gap-2)
- md: 12px (gap-3)
- lg: 16px (gap-4)
- xl: 20px (gap-5, px-5)
- 2xl: 24px (gap-6)
- 3xl: 32px (gap-8)
- 4xl: 40px (gap-10)
- 5xl: 48px (gap-12, py-12)
- 6xl: 64px (gap-16, py-16, px-16)
- 7xl: 100px (gap-[100px], py-[100px])

**Padding Padrão por Breakpoint** (`.section-padding`):
- Mobile: px-5 py-12 (20px / 48px)
- Tablet (md): px-8 py-16 (32px / 64px)
- Desktop (lg): px-16 py-[100px] (64px / 100px)

**Vertical Gaps por Breakpoint** (`.gap-section`):
- Mobile: gap-12 (48px)
- Tablet (md): gap-16 (64px)
- Desktop (lg): gap-[100px] (100px)

---

## Typography

**Famílias de Fonte**:
- Display/Headings: "Playfair Display", serif
- Body/Functional: "Lato", sans-serif

**Uso**: Sempre use as utility classes — NUNCA repita CSS variables inline.

| Token | Classe | Componente | Mobile | Tablet | Desktop | Peso |
|---|---|---|---|---|---|---|
| display-lg | `.text-display-lg` | `<DisplayLarge>` | 32/36 | 48/56 | 64/72 | 500 |
| heading-lg | `.text-heading-lg` | `<HeadingLarge>` | 28/36 | 40/48 | 52/64 | 500 |
| heading-md | `.text-heading-md` | `<HeadingMedium>` | 24/32 | 28/40 | 32/48 | 500 |
| heading-sm | `.text-heading-sm` | `<HeadingSmall>` | 20/32 | 22/30 | 24/32 | 500 |
| body-lg | `.text-body-lg` | `<BodyText size="lg">` | 18/26 | 20/28 | 24/32 | 400 |
| body-md | `.text-body-md` | `<BodyText size="md">` | 18/28 | 18/28 | 18/28 | 400 |
| body-sm | `.text-body-sm` | `<BodyText size="sm">` | 14/20 | 14/20 | 16/24 | 400 |
| body-xs | `.text-body-xs` | `<BodyText size="xs">` | 12/18 | 13/18 | 14/20 | 400 |
| functional-md | `.text-functional-md` | `<FunctionalText>` | 18/28 | 18/28 | 18/28 | 400 |
| functional-lg | `.text-functional-lg` | `<FunctionalText size="lg">` | 24/32 | 24/32 | 24/32 | 400 |
| functional-sm | `.text-functional-sm` | `<FunctionalText size="sm">` | 16/24 | 16/24 | 16/24 | 400 |
| lead-md | `.text-lead-md` | `<LeadText>` | 14/20 | 14/20 | 16/24 | 600 |

---

## Colors

### Tema Dark (padrão — maioria das seções)

**Backgrounds**:
| Token Tailwind | Hex | Uso |
|---|---|---|
| `bg-pantanal-dark-primary` | `#152218` | Background mais escuro (hero, footer) |
| `bg-pantanal-dark-secondary` | `#263a30` | Background principal de seções |
| `bg-pantanal-medium` | `#344e41` | Background secundário de seções |
| `bg-pantanal-dark-overlay` | `rgba(10,19,12,0.2)` | Glass cards |
| `bg-pantanal-dark-overlayHeavy` | `rgba(10,19,12,0.4)` | Overlay pesado |

**Texto (on dark)**:
| Token Tailwind | Hex | Uso |
|---|---|---|
| `text-pantanal-light-primary` | `#e3f7ec` | Títulos, texto principal |
| `text-pantanal-light-secondary` | `#f2fcf7` | CTAs, texto de alto contraste |
| `text-pantanal-light-muted` | `#a8cab9` | Corpo de texto, labels |
| `text-pantanal-light-tertiary` | `#cfebdd` | Texto secundário, metadata |
| `text-pantanal-light-highlight` | `#d7a45d` | Destaques dourados |
| `text-pantanal-light-quarternary` | `#6c927f` | Números, items sutis |

**Accent**:
| Token Tailwind | Hex | Uso |
|---|---|---|
| `bg-pantanal-gold` | `#ac8042` | Botões CTA, badges |
| `bg-pantanal-gold-hover` | `#8f6a35` | Hover dos botões gold |

**Borders**:
| Token Tailwind | Hex | Uso |
|---|---|---|
| `border-pantanal-border-light` | `#446354` | Dividers internos |
| `border-pantanal-border-primary` | `#f2fcf7` | Borders de alto contraste |
| `border-pantanal-border-muted` | `#a8cab9` | Feature lists, separadores |

### Tema Light (seção cream — NaturalRefuge)

**Background**:
| Token Tailwind | Hex | Uso |
|---|---|---|
| `bg-pantanal-cream` | `#fcf4ed` | Background da seção light |

**Texto (on cream)**:
| Token Tailwind | Hex | Uso |
|---|---|---|
| `text-pantanal-darkText-primary` | `#263a30` | Títulos |
| `text-pantanal-darkText-secondary` | `#446354` | Corpo de texto |
| `text-pantanal-darkText-muted` | `#8aad9c` | Labels, números |
| `text-pantanal-light-numberMuted` | `#8aad9c` | Números em feature lists |

### Cores Semânticas (shadcn/ui)
```css
--background: 0 0% 100%
--foreground: 222.2 47.4% 11.2%
--primary: 222.2 47.4% 11.2%
--primary-foreground: 210 40% 98%
--muted: 210 40% 96.1%
--muted-foreground: 215.4 16.3% 46.9%
--border: 214.3 31.8% 91.4%
--accent: 210 40% 96.1%
--destructive: 0 100% 50%
--ring: 215 20.2% 65.1%
```

---

## Depth

**Sistema**: Hybrid (Borders + Subtle Shadows)

**Regras**:
1. **Permitido**:
   - Ring shadows: `0 0 0 1px` (para focus states)
   - Subtle shadows para elevação: `shadow-sm`, `shadow`
   - Backdrop blur para glassmorphism
   - Borders para separação

2. **Não Permitido**:
   - Layered shadows pesadas
   - Drop shadows dramáticas
   - Multiple shadow layers

**Glassmorphism Pattern**:
```
Utility: glass-card-hero
= backdrop-blur-[2.0px] backdrop-brightness-[110%] bg-pantanal-dark-overlay
+ inset box-shadow pattern
```

**Card Elevation**:
- Card padrão: `rounded-xl border bg-card shadow`
- Card transparente: `border-0 bg-transparent`
- Card dark: `bg-pantanal-dark-secondary border-none`

---

## Components

### Typography Components
Todos aceitam `theme?: "dark" | "light"` e `as?` para polymorphic rendering.

| Componente | Tag Default | Uso |
|---|---|---|
| `<DisplayLarge>` | h1 | Hero titles |
| `<HeadingLarge>` | h2 | Section titles |
| `<HeadingMedium>` | h3 | Card titles, subtítulos |
| `<HeadingSmall>` | h4 | Feature titles, items |
| `<BodyText>` | p | Parágrafos (size: lg/md/sm/xs, variant: primary/secondary/muted/tertiary/highlight/quarternary) |
| `<LeadText>` | p | Labels uppercase com letter-spacing |
| `<FunctionalText>` | span | Texto de botões, labels funcionais (size: sm/md/lg) |

### Layout Components

| Componente | Uso |
|---|---|
| `<SectionContainer>` | Wrapper de seção (background: primary/secondary/medium/cream/image, padded) |
| `<Container>` | Max-width 1440px + centering |
| `<SectionHeader>` | Label + Título + Descrição (layout: stacked/split, theme: dark/light) |
| `<BackgroundImageSection>` | Seção com imagem de fundo + overlay gradient |
| `<HorizontalScroll>` | Container com scroll horizontal + scrollbar-hide |

### Button Components

| Componente | Uso |
|---|---|
| `<GoldButton>` | CTA principal gold (#ac8042). buttonSize: "default" ou "lg" |
| `<OutlineButton>` | Botão outline com borda clara. Hover: inversao total (bg branco + texto escuro) |

### Interaction States

Todos os elementos interativos seguem este padrao:
- **Hover**: `translateY(-2px)` lift + mudanca visual (cor ou underline)
- **Active**: `translateY(0)` + opacidade sutil (0.9)
- **Focus-visible**: Ring dourado para botoes gold; ring claro para outline
- **Transition**: `all 0.3s ease` para botoes; `0.2s ease` para links e nav

### Shared Components

| Componente | Arquivo | Uso |
|---|---|---|
| `<LanguageSwitcher>` | `components/LanguageSwitcher.tsx` | Modal full-screen para selecao de idioma (PT/EN/ES). Radix Dialog + backdrop blur. |
| `<BookingDatePicker>` | `components/BookingDatePicker.tsx` | Date range picker com integracao Cloudbeds. react-day-picker + Radix Popover. variant: "hero" ou "cta" |
| `<Divider>` | `components/Divider.tsx` | Linha separadora. theme: "dark" (#f2fcf7) ou "light" (#344E41) |

### New Utilities

| Utility | Descricao |
|---|---|
| `.link-hover` | Underline animado via ::after (width 0->100%, 0.3s ease). Para links de texto. |
| `.text-serif-italic` | Playfair Display italic para enfase em headings |
| `.shadow-pantanal` | Sombra verde: `0 20px 40px -10px rgba(21,34,24,0.3)` |
| `.shadow-pantanal-sm` | Sombra verde menor: `0 4px 12px -2px rgba(21,34,24,0.2)` |

### Card Components

| Componente | Uso |
|---|---|
| `<ExpeditionCard>` | Card com imagem de fundo, título, descrição, CTA |
| `<TestimonialCard>` | Card dark com título, quote, autor, estrelas |
| `<BlogCard>` | Card de blog com imagem, badge, título, autor, data |
| `<NumberedFeatureItem>` | Item numerado (01, 02, 03) com título e descrição (theme: dark/light) |

---

## Patterns

### Section Layout Padrão
```tsx
<SectionContainer background="secondary">
  <div className="flex flex-col max-w-[1440px] items-center gap-section section-padding w-full">
    <SectionHeader layout="split" label="..." title="..." description="..." />
    {/* content */}
  </div>
</SectionContainer>
```

### Numbered Feature List
```tsx
<div className="flex flex-col gap-0 lg:gap-[32px] w-full">
  {features.map((f, i) => (
    <NumberedFeatureItem
      key={f.number}
      number={f.number}
      title={f.title}
      description={f.description}
      showBorder={i > 0}
      theme="dark" // ou "light" para cream section
    />
  ))}
</div>
```

### Blog Grid / Scroll
```tsx
<HorizontalScroll className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:gap-[32px] w-full">
  {posts.map(post => <BlogCard key={post.id} {...post} />)}
</HorizontalScroll>
```

### Background Overlays
```
// Hero overlay (vertical gradient)
overlay-hero utility

// Card image overlay (bottom gradient)
overlay-card-bottom utility

// Lateral gradient (Accommodations)
linear-gradient(270deg, rgba(21,34,24,0) 0%, rgba(21,34,24,0.64) 100%)
```

### Navigation Menu
```tsx
// Desktop nav item
className="h-auto px-3 py-2.5 rounded-lg transition-colors duration-200"

// Mobile menu overlay
className="fixed inset-0 z-50 backdrop-blur-[16px] bg-[rgba(255,255,255,0.01)]"
```

---

## Border Radius

| Token | Valor | Uso |
|---|---|---|
| `rounded-sm` | 4px | Detalhes pequenos |
| `rounded-md` | 6px | Botões |
| `rounded-lg` | 8px | Cards, inputs |
| `rounded-xl` | 12px | Cards grandes |
| `rounded-[999px]` | pill | Badges |

---

## Heights Específicos

**Seções**:
- Hero: h-[844px] md:h-[680px] lg:h-[740px]
- Expedition cards: h-[464px] md:h-[500px] lg:h-[740px]
- Accommodation section: min-h-[600px] lg:min-h-[740px]
- CTA section: h-[844px] md:min-h-[800px] lg:h-[1000px]
- Blog cards: altura automática

**Componentes**:
- Button default: h-9 (36px) / h-10 (40px)
- Button lg: h-auto lg:h-[56px]
- Input/date picker: h-12 md:h-14 (48px-56px)
- Testimonial cards: w-[310px] h-[400px] / md:360x420 / lg:443x464

---

## Responsividade

**Breakpoints**:
- Mobile: base (390px design spec)
- Tablet: md (768px)
- Desktop: lg (1024px)

**Estratégia**: Mobile-first

**Padrões Comuns**:
```tsx
flex-col md:flex-row                    // Stacking
grid grid-cols-2 md:grid-cols-4         // Grid responsivo
gap-4 md:gap-6 lg:gap-[100px]          // Gaps responsivos
px-5 md:px-8 lg:px-16                  // Padding (section-padding)
w-full lg:w-[664px]                    // Largura com cap
```

---

## Animações

**Permitidas**:
- Transitions: `transition-colors duration-200`, `transition-all duration-300`
- Hover transforms: `group-hover:translate-x-1`
- Rotate: `transition-transform duration-200 rotate-180`
- Custom keyframes: fade-in, fade-up, shimmer, marquee

**Classes**:
```css
.animate-fade-in    /* opacity 0->1 + translateY(-10->0) */
.animate-fade-up    /* opacity 0->1 + translateY(20->0) */
.animate-shimmer
.animate-spin
.scrollbar-hide
```

---

## Accessibility

**Focus States**:
- `focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring`

**Screen Reader**:
- `aria-hidden="true"` para elementos decorativos
- `data-testid` para testes

**Contraste**:
- Tema dark: #e3f7ec, #f2fcf7 sobre #152218, #263a30, #344e41
- Tema light: #263a30, #446354 sobre #fcf4ed
