# 🎨 Itaicy Pantanal - Design System Utilities

## 📚 Guia de Uso das Utilities Automáticas

Este guia mostra como usar as utilities geradas automaticamente baseadas nos padrões do projeto.

---

## 🔤 Typography Utilities

### Antes (verbose):
```tsx
<h1 className="font-display-lg
  font-[number:var(--display-lg-font-weight)]
  text-[length:var(--display-lg-font-size)]
  leading-[var(--display-lg-line-height)]
  tracking-[var(--display-lg-letter-spacing)]
  [font-style:var(--display-lg-font-style)]
  text-[#e3f7ec]"
>
  O Pantanal como você nunca sentiu
</h1>
```

### Depois (utility class):
```tsx
<h1 className="text-display-lg text-pantanal-light-primary">
  O Pantanal como você nunca sentiu
</h1>
```

### Classes Disponíveis:

| Classe | Uso | Tamanhos |
|--------|-----|----------|
| `.text-display-lg` | Títulos hero principais | Mobile: 32px, Tablet: 48px, Desktop: 64px |
| `.text-heading-lg` | Títulos de seção grandes | Mobile: 28px, Tablet: 40px, Desktop: 52px |
| `.text-heading-md` | Títulos de seção médios | Mobile: 24px, Tablet: 28px, Desktop: 32px |
| `.text-heading-sm` | Títulos de card/pequenos | Mobile: 20px, Tablet: 22px, Desktop: 24px |
| `.text-body-lg` | Parágrafos grandes | Mobile: 18px, Tablet: 20px, Desktop: 24px |
| `.text-body-md` | Parágrafos padrão | 18px em todos os tamanhos |
| `.text-body-sm` | Texto pequeno | Mobile: 14px, Desktop: 16px |
| `.text-body-xs` | Texto extra pequeno | Mobile: 12px, Desktop: 14px |
| `.text-functional-md` | Botões e links | 18px, peso 600 |
| `.text-lead-md` | Labels/tags uppercase | Mobile: 14px, Desktop: 16px (letter-spacing alto) |

---

## 🎨 Color Utilities

### Paleta Pantanal:

```tsx
// Backgrounds
<div className="bg-pantanal-dark-primary">    {/* #152218 */}
<div className="bg-pantanal-dark-secondary">  {/* #263a30 */}
<div className="bg-pantanal-medium">          {/* #344e41 */}

// Text Colors
<p className="text-pantanal-light-primary">   {/* #e3f7ec */}
<p className="text-pantanal-light-secondary"> {/* #f2fcf7 */}
<p className="text-pantanal-light-muted">     {/* #a8cab9 */}
<p className="text-pantanal-light-tertiary">  {/* #cfebdd */}

// Accent
<button className="bg-pantanal-gold">        {/* #ac8042 */}
<span className="text-pantanal-gold">

// Borders
<div className="border border-pantanal-border-light">    {/* #446354 */}
<div className="border border-pantanal-border-primary">  {/* #f2fcf7 */}
```

### Atalhos (via utilities.js):

```tsx
// Ainda mais curto:
<div className="bg-dark-primary">         {/* = bg-pantanal-dark-primary */}
<p className="text-primary-light">        {/* = text-pantanal-light-primary */}
<p className="text-muted-green">          {/* = text-pantanal-light-muted */}
<button className="bg-accent-gold">      {/* = bg-pantanal-gold */}
```

---

## 📦 Layout Components

### Container Padrão:

```tsx
// Antes:
<div className="max-w-[1440px] mx-auto w-full">

// Depois:
<div className="container-pantanal">
```

### Section Padding Responsivo:

```tsx
// Antes:
<section className="px-5 md:px-8 lg:px-10 py-12 md:py-16 lg:py-[100px]">

// Depois:
<section className="section-padding">
```

**Resultado**:
- Mobile: `px-5 py-12` (20px horizontal, 48px vertical)
- Tablet: `px-8 py-16` (32px horizontal, 64px vertical)
- Desktop: `px-10 py-[100px]` (40px horizontal, 100px vertical)

### Gap Responsivo de Seção:

```tsx
// Antes:
<div className="flex flex-col gap-12 md:gap-16 lg:gap-[100px]">

// Depois:
<div className="flex flex-col gap-section">
```

---

## 💎 Glassmorphism Components

### Hero Glass Card:

```tsx
// Antes:
<Card className="bg-[rgba(10,19,12,0.2)] rounded-lg backdrop-blur-[2.0px]
  backdrop-brightness-[110%]
  shadow-[inset_0_1px_0_rgba(255,255,255,0.40),...]
  border-0"
>

// Depois:
<Card className="glass-card-hero">
```

### Backdrop Glass (menu mobile):

```tsx
// Antes:
<div className="backdrop-blur-[16px] bg-[rgba(255,255,255,0.01)]">

// Depois:
<div className="glass-backdrop">
```

### Menu Item Glass:

```tsx
<div className="glass-menu-item">
```

---

## 🌅 Overlay Gradients

### Hero Overlay:

```tsx
// Antes:
<div className="bg-[linear-gradient(0deg,rgba(21,34,24,0.5)_0%,...)]" />

// Depois:
<div className="overlay-hero" />
```

### Card Bottom Gradient:

```tsx
<div className="overlay-card-bottom" />
```

### Menu Blur Overlay:

```tsx
<div className="overlay-menu" />
```

---

## 🔘 Button Components

### Gold CTA Button:

```tsx
// Antes:
<Button className="bg-[#ac8042] text-[#f2fcf7] rounded
  font-functional-md font-[number:var(--functional-md-font-weight)]..."
>
  Reservar
</Button>

// Depois:
<button className="btn-gold">
  Reservar
</button>
```

**Specs**: h-10 (40px), px-8, rounded-md, hover effect incluído

### Nav Button:

```tsx
<button className="btn-nav">
  Início
</button>
```

---

## 🃏 Card Components

### Expedition Card:

```tsx
// Antes:
<Card className="w-full h-[464px] md:h-[500px] lg:h-[740px]
  rounded-lg overflow-hidden border-0
  bg-[linear-gradient(...),url(...)] bg-center bg-cover"
>

// Depois:
<Card
  className="card-expedition w-full"
  style={{ backgroundImage: 'url(...)' }}
>
```

**Specs**:
- Mobile: 464px height
- Tablet: 500px height
- Desktop: 740px height

### Testimonial Card:

```tsx
<Card className="card-testimonial">
```

**Specs**:
- Mobile: 310px × 400px
- Tablet: 360px × 420px
- Desktop: 443px × 464px

### Blog Card:

```tsx
<Card className="card-blog">
```

**Specs**: 350px width, auto height

---

## ✨ Animation Utilities

### Smooth Transition:

```tsx
<div className="transition-smooth">
```

### Color Transitions:

```tsx
<button className="transition-colors-smooth">
```

### Hover Translate:

```tsx
<ChevronRightIcon className="hover-translate-x" />
```

---

## 📋 Exemplos de Refatoração

### Exemplo 1: Hero Title

**Antes** (22 linhas):
```tsx
<h1
  className="font-display-lg
    font-[number:var(--display-lg-font-weight)]
    text-[length:var(--display-lg-font-size)]
    leading-[var(--display-lg-line-height)]
    text-[#e3f7ec]
    tracking-[var(--display-lg-letter-spacing)]
    [font-style:var(--display-lg-font-style)]"
  style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
>
  O Pantanal como você nunca sentiu.
</h1>
```

**Depois** (3 linhas):
```tsx
<h1 className="text-display-lg text-pantanal-light-primary">
  O Pantanal como você nunca sentiu.
</h1>
```

### Exemplo 2: Section com Container

**Antes**:
```tsx
<section className="flex flex-col items-center bg-[#344e41] w-full">
  <div className="flex flex-col max-w-[1440px] items-center
    gap-12 md:gap-16 lg:gap-[100px]
    px-5 md:px-8 lg:px-10
    py-12 md:py-16 lg:py-[100px]
    w-full"
  >
    {/* conteúdo */}
  </div>
</section>
```

**Depois**:
```tsx
<section className="flex flex-col items-center bg-pantanal-medium w-full">
  <div className="container-pantanal section-padding flex flex-col items-center gap-section">
    {/* conteúdo */}
  </div>
</section>
```

### Exemplo 3: Header de Seção

**Antes**:
```tsx
<header className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[32px] w-full">
  <p className="font-lead-md font-[number:var(--lead-md-font-weight)]
    text-[#a8cab9] text-[length:var(--lead-md-font-size)]
    tracking-[var(--lead-md-letter-spacing)]
    leading-[var(--lead-md-line-height)]
    [font-style:var(--lead-md-font-style)]"
  >
    NOSSOS SERVIÇOS
  </p>

  <h2 className="font-heading-lg font-[number:var(--heading-lg-font-weight)]
    text-[#e3f7ec] text-[length:var(--heading-lg-font-size)]
    leading-[var(--heading-lg-line-height)]
    tracking-[var(--heading-lg-letter-spacing)]
    [font-style:var(--heading-lg-font-style)]"
  >
    Expedições Exclusivas
  </h2>
</header>
```

**Depois**:
```tsx
<header className="flex flex-col items-start gap-6 md:gap-8 lg:gap-8 w-full">
  <p className="text-lead-md text-pantanal-light-muted">
    NOSSOS SERVIÇOS
  </p>

  <h2 className="text-heading-lg text-pantanal-light-primary">
    Expedições Exclusivas
  </h2>
</header>
```

### Exemplo 4: Gold Button

**Antes**:
```tsx
<Button className="bg-[#ac8042] text-[#f2fcf7] rounded
  font-functional-md
  font-[number:var(--functional-md-font-weight)]
  text-[length:var(--functional-md-font-size)]
  tracking-[var(--functional-md-letter-spacing)]
  leading-[var(--functional-md-line-height)]
  [font-style:var(--functional-md-font-style)]"
>
  Reservar
</Button>
```

**Depois** (opção 1 - com componente Button):
```tsx
<Button className="btn-gold">
  Reservar
</Button>
```

**Depois** (opção 2 - elemento nativo):
```tsx
<button className="btn-gold">
  Reservar
</button>
```

---

## 🚀 Começando a Usar

### 1. Instalar dependências (já feito):

O plugin já está configurado em `tailwind.config.ts`.

### 2. Testar as utilities:

```bash
npm run dev
```

### 3. Refatorar componentes progressivamente:

Comece pelos componentes mais verbosos:
1. ✅ Typography (maior economia)
2. ✅ Section layouts
3. ✅ Buttons
4. ✅ Cards

---

## 📊 Benefícios

| Métrica | Antes | Depois | Redução |
|---------|-------|--------|---------|
| **Linhas de código** (heading) | ~8 linhas | 1 linha | **87.5%** ↓ |
| **Caracteres** (typography) | ~250 chars | ~40 chars | **84%** ↓ |
| **Legibilidade** | Baixa | Alta | ⬆️ |
| **Manutenção** | Difícil | Fácil | ⬆️ |
| **Consistência** | Manual | Automática | ⬆️ |

---

## 🔧 Próximos Passos

1. **Refatorar componentes existentes** usando as utilities
2. **Adicionar mais variants** conforme necessário
3. **Criar Storybook** para documentação visual
4. **Testes de regressão visual** para garantir consistência

---

## 📝 Notas

- Todas as utilities são responsivas por padrão
- As cores Pantanal podem ser usadas com modificadores Tailwind: `bg-pantanal-gold/50`, `text-pantanal-light-muted hover:text-pantanal-light-primary`
- Os componentes glass têm vendor prefixes para compatibilidade cross-browser
- Animações incluem fallbacks para prefers-reduced-motion

---

## 🐛 Troubleshooting

### Utility não funciona?

1. Verificar se o plugin está carregado no `tailwind.config.ts`
2. Recompilar o CSS: `npm run dev` (reiniciar o servidor)
3. Limpar cache: deletar `.cache` ou `node_modules/.cache`

### IntelliSense não reconhece?

Adicionar ao `settings.json` do VSCode:
```json
{
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

**Documentação gerada automaticamente** baseada nos padrões extraídos do código em 2026-02-09.
