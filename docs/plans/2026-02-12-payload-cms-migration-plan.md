# Plano de Migracao para Payload CMS (sem perda de conteudo)

## Objetivo

Migrar o projeto para um modelo com Payload CMS apenas com o necessario, mantendo 100% do conteudo atual, sem reescrever layout e sem risco de perda durante a transicao.

## Diagnostico do projeto atual

- Stack atual: React + Vite (frontend), Express (backend), sem CMS ativo.
- Rotas principais em `client/src/App.tsx`.
- Conteudo hoje esta majoritariamente hardcoded em:
  - `client/src/pages/**/sections/*.tsx`
  - `client/src/pages/blog/data.ts`
  - `client/src/pages/birdwatching/data.ts`
- Backend atual (`server/routes.ts`) nao serve conteudo de paginas; apenas estrutura base.

## Principio de migracao (zero perda)

- Nao substituir conteudo atual de uma vez.
- Introduzir camada de leitura de conteudo com fallback:
  - primeiro tenta Payload
  - se falhar, usa conteudo estatico atual
- Migrar por pagina/bloco, com validacao visual e funcional a cada etapa.

## Escopo minimo de Payload (sem extras)

Usar somente:
- `Media` (assets de imagem)
- `Pages` (configuracao de secoes por slug)
- `BlogCategories`
- `BlogPosts`
- `BirdCategories`
- `BirdSpecies`
- `SiteSettings` (footer, contato, links globais)

Nao incluir nesta fase:
- plugin de busca
- versionamento avancado
- localization multi-idioma
- workflows editoriais complexos
- personalizacao administrativa nao essencial

## Modelo de conteudo proposto

### 1. Globals

- `siteSettings`
  - logo
  - contatos (telefone, email, endereco)
  - links de footer
  - redes sociais

### 2. Collections editoriais

- `blogCategories`
  - `name`
  - `slug`

- `blogPosts`
  - `title`
  - `slug`
  - `subtitle`
  - `description`
  - `heroImage` (relation media)
  - `primaryCategory` (relation blogCategories)
  - `categories` (hasMany relation)
  - `author`
  - `date`
  - `readingTime`
  - `contentBlocks` (array com tipos paragraph/heading/species/orderedList)
  - `relatedPosts` (hasMany self relation)

- `birdCategories`
  - `name`
  - `slug`

- `birdSpecies`
  - `commonName`
  - `scientificName`
  - `slug`
  - `description`
  - `category` (relation birdCategories)
  - `tag`
  - `cardImage` (relation media)
  - `heroImage` (relation media)
  - `author`
  - `date`
  - `conservationStatus`
  - `size`
  - `habitat`
  - `overview`
  - `diet`
  - `behavior`
  - `bestTime`
  - `photographyTips` (array text)
  - `relatedSpecies` (hasMany self relation)

### 3. Estrutura de paginas

- `pages`
  - `slug` (/, /acomodacoes, /culinaria, etc)
  - `title`
  - `sections` (blocks)

Blocks recomendados (minimo real):
- `heroSection`
- `manifestoSection`
- `highlightsSection` (itens repetiveis)
- `servicesSection` (cards repetiveis)
- `faqSection`
- `ctaSection`
- `testimonialSection`
- `footerSection` (ou ler de global)

## Sequencia de execucao recomendada

### Fase 1: Base sem risco (em paralelo com site atual)

1. Subir projeto Payload isolado (mesmo repo ou repo separado).
2. Definir collections/globals acima.
3. Criar script de import inicial a partir de:
   - `client/src/pages/blog/data.ts`
   - `client/src/pages/birdwatching/data.ts`
4. Popular `SiteSettings` com conteudo atual do footer.

Status (2026-02-12):
- concluido
- seed gerado em `docs/payload-seed/`
- auditoria de sections gerada em `docs/payload-seed/sections-manifest.json`

### Fase 2: Integracao somente leitura (com fallback)

1. Frontend passa a ler Blog e Bird via API do Payload.
2. Se API indisponivel, usa dados atuais locais.
3. Validar:
   - listagens
   - pagina de detalhe
   - relacionamentos (relacionados)
   - slugs/canonical URLs

Status (2026-02-12):
- iniciado e funcional no app atual
- backend agora faz `payload-first` com fallback para seed
- variavel de ambiente: `PAYLOAD_CMS_BASE_URL`
- blog e birdwatching conectados a camada CMS com fallback no frontend
- blocos compartilhados conectados ao CMS:
  - `SiteFooterSection`
  - `ImmersionCallToActionSection`
  - `FrequentlyAskedQuestionsSection`
  - `ImmersionTestimonialsSection`
  - `PantanalHeroSection`
  - `PantanalExperienceIntroSection`

### Fase 3: Migracao de paginas institucionais por blocos

1. Comecar por paginas com maior beneficio editorial:
   - Home
   - Acomodacoes
   - Pesca
2. Extrair textos/imagens de sections para `pages.sections`.
3. Componentes passam a receber props vindas do CMS.

### Fase 4: Cutover controlado

1. Ativar leitura CMS por flag de ambiente.
2. Revisao visual completa por rota.
3. Congelar hardcoded somente apos paridade.

## Matriz de risco e mitigacao

- Risco: perda de conteudo em migracao manual
  - Mitigacao: importador automatico + checklist por rota
- Risco: quebra visual ao trocar fonte de dados
  - Mitigacao: fallback local + rollout por pagina
- Risco: discrepancia de slugs/URLs
  - Mitigacao: manter slug atual como campo canonico

## Skills/agentes/plugins uteis para esta transformacao

- `MCP Integration`
  - util para conectar ferramentas externas durante migracao e automacoes de inventario.
- `Orchestrating Multi-Agent Systems`
  - util para dividir trabalho por frentes (modelagem, importacao, frontend).
- `Plugin Structure`
  - util apenas se quiser empacotar automacoes internas de migracao como plugin.
- `Command Development`
  - util para criar comandos repetiveis de import/check (ex.: `migrate-content`, `audit-content`).
- `Hook Development`
  - util para travas de seguranca (bloquear deploy sem checklist de paridade).

## Decisao tecnica para este repo

Para nao perder nada e evitar retrabalho:
- manter frontend atual intacto
- migrar primeiro os dominos com dados ja centralizados (`blog/data.ts` e `birdwatching/data.ts`)
- depois migrar sections hardcoded por blocos reutilizaveis em `pages`

Essa estrategia reduz risco e permite entregar valor editorial cedo, sem rebuild completo do site.
