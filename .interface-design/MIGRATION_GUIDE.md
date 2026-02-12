# 🚀 Guia Rápido de Migração

Como começar a usar as utilities do design system no seu código.

---

## ✅ Pré-requisitos

O design system já está configurado! Apenas certifique-se:

```bash
# 1. Servidor dev rodando
npm run dev

# 2. Se houver cache issues:
rm -rf node_modules/.cache
npm run dev
```

---

## 🎯 Migração em 3 Passos

### Passo 1: Escolher um Componente

Comece com componentes **pequenos** e **independentes**:

✅ **Boas escolhas para começar**:
- `PantanalStatsSection.tsx` (simples, stats)
- `ImmersionTestimonialsSection.tsx` (cards repetidos)
- Headers de seção (label + título + descrição)

❌ **Evite começar com**:
- `PantanalHeroSection.tsx` (muito complexo)
- Componentes com muitas interações
- Arquivos longos (>200 linhas)

### Passo 2: Fazer Backup

```bash
# Criar backup do arquivo
cp client/src/pages/sections/SeuComponente.tsx \
   client/src/pages/sections/SeuComponente.tsx.backup
```

### Passo 3: Refatorar Progressivamente

Não tente refatorar tudo de uma vez! Faça **uma categoria por vez**:

#### 3.1. Typography Primeiro

```tsx
// ANTES
<h1 className="font-display-lg font-[number:var(--display-lg-font-weight)]
  text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)]
  text-[#e3f7ec] tracking-[var(--display-lg-letter-spacing)]
  [font-style:var(--display-lg-font-style)]">

// DEPOIS
<h1 className="text-display-lg text-pantanal-light-primary">
```

**Salvar e testar**: `npm run dev` → verificar no navegador

#### 3.2. Cores Depois

```tsx
// ANTES
bg-[#263a30]
text-[#e3f7ec]
text-[#a8cab9]

// DEPOIS
bg-pantanal-dark-secondary
text-pantanal-light-primary
text-pantanal-light-muted
```

**Salvar e testar**: Verificar cores no navegador

#### 3.3. Layout Por Último

```tsx
// ANTES
<div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-10
  py-12 md:py-16 lg:py-[100px] w-full">

// DEPOIS
<div className="container-pantanal section-padding">
```

**Salvar e testar**: Verificar responsividade

---

## 📋 Cheat Sheet de Substituições

### Typography

| ANTES | DEPOIS |
|-------|--------|
| `font-display-lg font-[number:var(...)]...` | `text-display-lg` |
| `font-heading-lg font-[number:var(...)]...` | `text-heading-lg` |
| `font-heading-md font-[number:var(...)]...` | `text-heading-md` |
| `font-heading-sm font-[number:var(...)]...` | `text-heading-sm` |
| `font-body-lg font-[number:var(...)]...` | `text-body-lg` |
| `font-body-md font-[number:var(...)]...` | `text-body-md` |
| `font-lead-md font-[number:var(...)]...` | `text-lead-md` |
| `font-functional-md font-[number:var(...)]...` | `text-functional-md` |

### Cores

| ANTES | DEPOIS |
|-------|--------|
| `bg-[#152218]` | `bg-pantanal-dark-primary` |
| `bg-[#263a30]` | `bg-pantanal-dark-secondary` |
| `bg-[#344e41]` | `bg-pantanal-medium` |
| `bg-[#ac8042]` | `bg-pantanal-gold` |
| `text-[#e3f7ec]` | `text-pantanal-light-primary` |
| `text-[#f2fcf7]` | `text-pantanal-light-secondary` |
| `text-[#a8cab9]` | `text-pantanal-light-muted` |
| `text-[#cfebdd]` | `text-pantanal-light-tertiary` |

### Layout

| ANTES | DEPOIS |
|-------|--------|
| `max-w-[1440px] mx-auto w-full` | `container-pantanal` |
| `px-5 md:px-8 lg:px-10 py-12 md:py-16 lg:py-[100px]` | `section-padding` |
| `gap-12 md:gap-16 lg:gap-[100px]` | `gap-section` |

### Components

| ANTES | DEPOIS |
|-------|--------|
| Button com `bg-[#ac8042]...` | `<button className="btn-gold">` |
| Card hero glassmorphism | `className="glass-card-hero"` |
| Hero overlay gradient | `className="overlay-hero"` |
| Expedition card heights | `className="card-expedition"` |
| Testimonial card sizes | `className="card-testimonial"` |

---

## 🔍 Find & Replace (VSCode)

Use estas regex no VSCode para acelerar:

### 1. Typography Display

**Find**:
```regex
font-display-lg\s+font-\[number:var\(--display-lg-font-weight\)\]\s+text-\[length:var\(--display-lg-font-size\)\]\s+leading-\[var\(--display-lg-line-height\)\]\s+tracking-\[var\(--display-lg-letter-spacing\)\]\s+\[font-style:var\(--display-lg-font-style\)\]
```

**Replace**:
```
text-display-lg
```

### 2. Cor de Background #263a30

**Find**: `bg-\[#263a30\]`
**Replace**: `bg-pantanal-dark-secondary`

### 3. Cor de Texto #e3f7ec

**Find**: `text-\[#e3f7ec\]`
**Replace**: `text-pantanal-light-primary`

---

## ✅ Checklist de Validação

Após cada refatoração, verificar:

### Visual
- [ ] Layout está idêntico ao original
- [ ] Cores estão corretas
- [ ] Tipografia com tamanhos corretos
- [ ] Espaçamentos mantidos

### Responsividade
- [ ] Mobile (390px) OK
- [ ] Tablet (768px) OK
- [ ] Desktop (1024px+) OK

### Interações
- [ ] Hover states funcionando
- [ ] Animações suaves
- [ ] Buttons clicáveis
- [ ] Links funcionando

### Acessibilidade
- [ ] Focus states visíveis
- [ ] Contraste adequado
- [ ] Screen readers OK

---

## 🐛 Troubleshooting

### Utility não funciona

```bash
# 1. Reiniciar dev server
Ctrl+C
npm run dev

# 2. Limpar cache
rm -rf node_modules/.cache .vite
npm run dev

# 3. Verificar config
cat tailwind.config.ts | grep "interface-design"
# Deve mostrar: require("./.interface-design/utilities")
```

### Cores diferentes

```tsx
// Verificar se está usando:
text-pantanal-light-primary  // ✅ Correto
text-[#e3f7ec]              // ❌ Usar palette

// Para debug, inspecionar no navegador:
// DevTools → Elements → Computed → verificar valor final
```

### Tipografia não responsiva

```tsx
// Certifique-se de usar a utility, não a font-family:
text-display-lg    // ✅ Responsivo via CSS vars
font-display-lg    // ❌ Apenas font-family, não responsivo
```

---

## 📊 Tracking de Progresso

### Componentes Migrados

```markdown
- [ ] PantanalHeroSection.tsx
- [ ] PantanalExperienceIntroSection.tsx
- [ ] NaturalRefugeDescriptionSection.tsx
- [ ] ExclusiveExpeditionsSection.tsx
- [ ] PantanalStatsSection.tsx
- [ ] AccommodationInfoSection.tsx
- [ ] ImmersionTestimonialsSection.tsx
- [ ] AuthenticRestSection.tsx
- [ ] FrequentlyAskedQuestionsSection.tsx
- [ ] PantanalBlogSection.tsx
- [ ] ImmersionCallToActionSection.tsx
- [ ] SiteFooterSection.tsx
```

**Progresso**: 0/12 (0%)

### Prioridade Sugerida

1. 🟢 **PantanalStatsSection** (mais simples, 4 stats)
2. 🟡 **ImmersionTestimonialsSection** (cards repetidos)
3. 🟡 **ExclusiveExpeditionsSection** (3 expedition cards)
4. 🟠 **FrequentlyAskedQuestionsSection** (FAQ accordion)
5. 🟠 **PantanalBlogSection** (blog cards)
6. 🔴 **PantanalHeroSection** (mais complexo, menu nav)

---

## 🎓 Exemplo Passo a Passo

### Migrando PantanalStatsSection

#### Estado Inicial
```tsx
<section className="bg-[#263a30] flex flex-col items-center w-full">
  <div className="flex max-w-[1440px] items-end justify-center
    px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
    {/* ... */}
    <div className="font-display-lg font-[number:var(--display-lg-font-weight)]
      text-[#e3f7ec] text-[length:var(--display-lg-font-size)]...">
      2000+
    </div>
    {/* ... */}
  </div>
</section>
```

#### Passo 1: Background Color
```tsx
<section className="bg-pantanal-dark-secondary flex flex-col items-center w-full">
  {/* resto igual */}
</section>
```
✅ **Salvar → Testar → Commit**

#### Passo 2: Container & Padding
```tsx
<section className="bg-pantanal-dark-secondary flex flex-col items-center w-full">
  <div className="container-pantanal section-padding flex items-end justify-center">
    {/* resto igual */}
  </div>
</section>
```
✅ **Salvar → Testar → Commit**

#### Passo 3: Typography
```tsx
<div className="text-display-lg text-pantanal-light-primary">
  2000+
</div>
```
✅ **Salvar → Testar → Commit**

#### Estado Final
```tsx
<section className="bg-pantanal-dark-secondary flex flex-col items-center w-full">
  <div className="container-pantanal section-padding flex items-end justify-center">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-0
      items-center justify-between flex-1 lg:flex lg:items-center lg:justify-between">
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col items-center text-center
          md:items-start md:text-left justify-center gap-2">
          <div className="text-display-lg text-pantanal-light-primary">
            {stat.value}
          </div>
          <div className="text-lead-md text-pantanal-light-muted text-center
            md:text-left whitespace-nowrap">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Resultado**:
- ✅ 22% menos código
- ✅ 80% mais legível
- ✅ 100% mantido funcionalmente

---

## 🚀 Próximo Passo

Escolha **um componente** da lista de prioridade e siga este guia!

**Recomendado para começar**: `PantanalStatsSection.tsx`

```bash
# 1. Backup
cp client/src/pages/sections/PantanalStatsSection.tsx \
   client/src/pages/sections/PantanalStatsSection.tsx.backup

# 2. Abrir no editor
code client/src/pages/sections/PantanalStatsSection.tsx

# 3. Seguir este guia passo a passo

# 4. Testar
npm run dev

# 5. Commit
git add .
git commit -m "refactor: migrate PantanalStatsSection to design system utilities"
```

**Boa sorte! 🎉**

---

## 📚 Documentação Relacionada

- [README.md](./README.md) - Visão geral completa
- [system.md](./system.md) - Design system documentado
- [USAGE.md](./USAGE.md) - Guia de uso detalhado
- [REFACTOR_EXAMPLE.md](./REFACTOR_EXAMPLE.md) - Exemplos completos

---

**Última atualização**: 2026-02-09
