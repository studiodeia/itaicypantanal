# Plano de Pesquisa e Importação: Catálogo de Aves Itaicy

> Revisado em 2026-02-14. Versão corrigida e validada contra a codebase real.

## Contexto

166 espécies registradas (levantamento João Andriola, mai/2024). **CSV ainda não existe no repositório** — precisa ser criado/fornecido. CMS (`BirdSpecies` collection) tem ~18 campos, import script (`importSeed.ts`) já funciona via `full-seed.json`. Apenas 9 espécies cadastradas atualmente.

**Ferramentas disponíveis:**
- Firecrawl: skill do Claude Code (interativo) + SDK `@mendable/firecrawl-js` (batch)
- Playwright MCP: fallback para páginas JS-pesadas (WikiAves)
- GBIF + Wikidata: APIs gratuitas, sem autenticação

---

## Bug Encontrado no Seed Atual

O `bird-species.json` tem o Tuiuiú com `scientificName: "Mycteria americana"` (Cabeça-Seca / Wood Stork). O correto é `Jabiru mycteria`. Exatamente o tipo de erro que a Camada 1 (GBIF) vai detectar e corrigir automaticamente.

---

## Arquitetura do Pipeline

```
CSV 3 colunas ──► CAMADA 1: APIs gratuitas (GBIF + Wikidata)
                       │ taxonomia validada, IUCN, tamanho, links
                       ▼
                  CAMADA 2: Firecrawl SDK (Wikipedia PT/EN)
                       │ texto de referência: habitat, dieta, comportamento
                       ▼
                  CAMADA 3: LLM editorial (Claude API)
                       │ textos finais no tom Itaicy, 166 espécies
                       ▼
                  CAMADA 4: Gerar full-seed.json → importSeed.ts
                       │ upsert via Payload Local API
                       ▼
                  166 páginas publicadas por tiers
```

---

## CAMADA 1: APIs Estruturadas (custo zero, ~2h dev)

### 1A. GBIF Species Match

**O que faz:** valida nome científico, retorna taxonomia completa (ordem, família, gênero), sinônimos, usageKey.

**Endpoint:** `GET https://api.gbif.org/v1/species/match?name={scientific_name}&kingdom=Animalia`

**Retorna por espécie:**
- `usageKey` (chave GBIF)
- `scientificName` (com autoridade)
- `canonicalName` (limpo)
- `order`, `family`, `genus`
- `status` (ACCEPTED / SYNONYM)
- `confidence` (0-100)
- `matchType` (EXACT / FUZZY / NONE)

**Rate limit:** sem limite formal para match, mas usar delay de 200ms entre chamadas (cortesia).

**Script:** 166 chamadas GET sequenciais. Output: JSON intermediário com taxonomia validada.

**Valor:** detecta erros como o Tuiuiú → "Mycteria americana" (errado, é Jabiru mycteria), identifica sinônimos, resolve ambiguidades. Também confirma se alguma espécie do CSV tem nome desatualizado pelo CBRO.

### 1B. Wikidata Structured Query

**O que faz:** extrai campos estruturados sem scraping (API pública, sem limite de créditos).

**Endpoint:** `GET https://www.wikidata.org/w/api.php?action=wbsearchentities&search={scientific_name}&language=en&type=item`

Depois, com o item ID: `GET https://www.wikidata.org/wiki/Special:EntityData/{QID}.json`

**Retorna por espécie (quando disponível):**
- Status IUCN (P141) — substitui a necessidade de IUCN API token
- Imagem Wikimedia Commons (P18) — URL direto para fallback
- Comprimento (P2043), massa (P2067)
- Link Wikipedia PT-BR (sitelink)
- Link Wikipedia EN (sitelink)

**Valor crítico:** o status IUCN via Wikidata é mantido por bots e reflete BirdLife/IUCN com boa acurácia para aves. Para as 4 espécies ameaçadas (Crax fasciolata VU, Pipile cujubi VU, Penelope ochrogaster VU, Amazona aestiva NT), faremos validação cruzada manual no site da BirdLife.

**Script:** 166 chamadas. Output: JSON com IUCN, medidas, URLs de imagem, links Wikipedia.

### 1C. Output da Camada 1

```json
{
  "scientificName": "Jabiru mycteria",
  "gbif": {
    "usageKey": 2481953,
    "canonicalName": "Jabiru mycteria",
    "order": "Ciconiiformes",
    "family": "Ciconiidae",
    "confidence": 99,
    "matchType": "EXACT",
    "status": "ACCEPTED"
  },
  "wikidata": {
    "qid": "Q208994",
    "iucnStatus": "LC",
    "lengthCm": 150,
    "massKg": 8,
    "wikimediaImage": "https://upload.wikimedia.org/wikipedia/commons/...",
    "wikipediaPT": "https://pt.wikipedia.org/wiki/Tuiuiú",
    "wikipediaEN": "https://en.wikipedia.org/wiki/Jabiru"
  }
}
```

**Cobertura estimada:** ~90% das 166 espécies terão match GBIF. ~70% terão dados Wikidata razoáveis. ~50% terão imagem Wikimedia usável.

---

## CAMADA 2: Firecrawl — Extração de Referência (213 créditos de 500)

### Abordagem: SDK para batch, skill para prototyping

Para o pipeline batch (213 páginas), usar `@mendable/firecrawl-js` SDK nos scripts Node.js. O Firecrawl MCP/skill do Claude Code serve para prototipar e testar scraping de 2-3 espécies antes de rodar o batch.

### Orçamento por Tier

| Tier | Espécies | Páginas/espécie | Créditos | Total |
|------|----------|-----------------|----------|-------|
| Tier 1 (ameaçadas + endêmicas + notáveis) | 16 | 3 (Wiki PT + EN + WikiAves) | 1 cada | 48 |
| Tier 2 (ícones turísticos) | 15 | 2 (Wiki PT + EN) | 1 cada | 30 |
| Tier 3 (demais) | 135 | 1 (Wiki PT) | 1 cada | 135 |
| **Total** | **166** | — | — | **213** |
| Buffer (retries, fallbacks) | — | — | — | **287** |

### Estratégia por Fonte

**Wikipedia PT-BR (166 páginas, 166 créditos)**

URL pattern: `https://pt.wikipedia.org/wiki/{article_title}`

O link vem direto do Wikidata (Camada 1). Para espécies sem artigo PT, usar o nome científico como fallback (`https://pt.wikipedia.org/wiki/{Genus_species}`).

Firecrawl `scrape` retorna markdown limpo. Extrair seções por heading:
- `## Descrição` ou `## Características` → alimenta visão geral + tamanho
- `## Habitat` ou `## Distribuição` → alimenta habitat
- `## Alimentação` ou `## Dieta` → alimenta alimentação
- `## Comportamento` ou `## Ecologia` → alimenta comportamento
- `## Reprodução` → contexto adicional

**Wikipedia EN (66 páginas: 16 Tier 1 + 15 Tier 2 + ~35 gap fill)**

Mesma lógica, para espécies onde PT é stub ou inexistente. O artigo EN é quase sempre mais completo para aves neotropicais.

**WikiAves — apenas referência factual (16 páginas, Tier 1)**

URL pattern: `https://www.wikiaves.com.br/wiki/{nome_popular}`

Extrair apenas dados factuais (medidas, distribuição, vocalizações), nunca texto para reprodução direta. WikiAves não permite reutilização de conteúdo sem autorização do autor.

**Fallback WikiAves → Playwright MCP:** WikiAves é JS-pesado. Se Firecrawl falhar (retornar HTML incompleto), usar Playwright MCP como fallback para as 16 espécies Tier 1.

### Script Firecrawl (SDK)

```typescript
import FirecrawlApp from "@mendable/firecrawl-js";

const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

async function scrapeSpeciesReference(species: SpeciesData) {
  const results: Record<string, string> = {};

  // Wikipedia PT-BR (todos os tiers)
  if (species.wikidata.wikipediaPT) {
    const ptResult = await app.scrapeUrl(species.wikidata.wikipediaPT, {
      formats: ["markdown"],
    });
    if (ptResult.success) results.wikiPT = ptResult.markdown ?? "";
  }

  // Wikipedia EN (Tier 1 + 2 + gap fill)
  if (species.tier <= 2 || !results.wikiPT) {
    if (species.wikidata.wikipediaEN) {
      const enResult = await app.scrapeUrl(species.wikidata.wikipediaEN, {
        formats: ["markdown"],
      });
      if (enResult.success) results.wikiEN = enResult.markdown ?? "";
    }
  }

  // WikiAves (Tier 1 only, referência factual)
  if (species.tier === 1) {
    const slug = species.commonNamePT
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/\s+/g, "-");
    try {
      const waResult = await app.scrapeUrl(
        `https://www.wikiaves.com.br/wiki/${slug}`,
        { formats: ["markdown"] }
      );
      if (waResult.success) results.wikiAves = waResult.markdown ?? "";
    } catch { /* fallback to Playwright if needed */ }
  }

  return results;
}
```

### Output da Camada 2

JSON com markdown bruto por fonte. NÃO é conteúdo final, é material de referência para a Camada 3.

---

## CAMADA 3: Geração Editorial via LLM (~20h com revisão)

### Lógica

Para cada espécie, o LLM recebe:
1. Dados estruturados da Camada 1 (taxonomia, IUCN, medidas)
2. Referência textual da Camada 2 (markdown das Wikipedias)
3. Dados do relatório João Andriola (quando a espécie é mencionada)
4. Template editorial fixo com regras de tom

### Prompt Template (esquemático)

```
Você é redator editorial do site Itaicy Pantanal Eco Lodge.

DADOS DA ESPÉCIE:
- Nome: {commonName} ({scientificName})
- Família: {family}, Ordem: {order}
- Status IUCN: {iucnStatus}
- Tamanho: {lengthCm} cm, Peso: {massKg} kg
- Registro local: relatório Andriola 2024, Pousada Itaicy

REFERÊNCIA (Wikipedia):
{wikiMarkdown — trecho relevante, max 2000 tokens}

GERAR em PT-BR, tom editorial (informativo, objetivo, sem exagero):

1. description: 1-2 frases, max 220 caracteres
2. overview: 120-200 palavras
3. habitat: 1-2 parágrafos
4. diet: 2-4 frases
5. behavior: 2-4 frases
6. bestTime: 2-4 frases (considere Pantanal: seca mai-out, chuva nov-abr)
7. photographyTips: 3-6 bullets acionáveis
8. size: formato "XX cm | Envergadura: XX cm | Peso: X,X kg"

REGRAS:
- Não afirmar "na Itaicy" sem evidência do relatório
- Não antropomorfizar
- Não usar "sempre" ou "nunca" sobre avistamentos
- Citar estação (seca/chuva) quando relevante para observação
- Para espécies ameaçadas, mencionar status sem alarmismo

Retorne em JSON.
```

### Volume e Custo

166 espécies × ~3000 tokens output = ~500K tokens. Via API Claude Sonnet: ~$1.50 total. Execução batch viável.

### Revisão Humana

- **Tier 1 (16 espécies):** revisão completa por editor, idealmente com input do João Andriola
- **Tier 2 (15 espécies):** revisão rápida de consistência
- **Tier 3 (135 espécies):** spot check (amostra de 20%)

---

## CAMADA 4: Import para Payload CMS

### Estratégia: gerar seed JSON → usar importSeed.ts existente

**NÃO criar um import script novo.** O `importSeed.ts` já faz upsert por slug, resolve categorias por nome, linka relatedSpecies por slug, e popula photographyTips como array de `{ tip }`. O output da Camada 3 deve gerar um JSON no formato `SeedBirdDetail` que o import script já consome.

### Formato de output (compatível com importSeed.ts)

```json
{
  "categories": [
    "Aquáticas", "Rapinas", "Psitacídeos", "Passeriformes",
    "Galiformes", "Columbiformes", "Caprimulgiformes",
    "Coraciiformes", "Piciformes", "Outros"
  ],
  "species": [
    {
      "slug": "tuiuiu",
      "commonName": "Tuiuiú",
      "scientificName": "Jabiru mycteria",
      "description": "Ave-símbolo do Pantanal...",
      "category": "Aquáticas",
      "tag": "Fauna",
      "src": "/images/birds/tuiuiu",
      "author": "João Andriola",
      "date": "Maio, 2024"
    }
  ],
  "details": [
    {
      "slug": "tuiuiu",
      "commonName": "Tuiuiú",
      "scientificName": "Jabiru mycteria",
      "description": "Ave-símbolo do Pantanal...",
      "category": "Aquáticas",
      "tag": "Fauna",
      "src": "/images/birds/tuiuiu",
      "author": "João Andriola",
      "date": "Maio, 2024",
      "heroImage": "/images/birds/tuiuiu-hero",
      "conservationStatus": "Pouco Preocupante (LC)",
      "size": "140 cm | Envergadura: 230-280 cm | Peso: 6-8 kg",
      "habitat": "...",
      "overview": "...",
      "diet": "...",
      "behavior": "...",
      "bestTime": "...",
      "photographyTips": ["Dica 1", "Dica 2"],
      "relatedSlugs": ["arara-azul", "garca-branca-grande"]
    }
  ],
  "featuredSlugs": ["tuiuiu", "arara-azul"]
}
```

### Import por tiers (phased)

O script `05-generate-seed.ts` gera o JSON acima. O import roda via:

```bash
cd payload-cms && npx tsx src/scripts/importSeed.ts
```

Para import parcial por tier, o script de geração aceita flag `--tier 1` para gerar apenas Tier 1, permitindo QA antes de importar os demais.

### Ajuste necessário no CMS: campos taxonômicos

O `BirdSpecies` collection precisa de 2 campos adicionais para dados da Camada 1:

| Campo | Tipo | Tab | Propósito |
|-------|------|-----|-----------|
| `taxonomicOrder` | text | Principal | Ordem taxonômica (ex: "Ciconiiformes") |
| `family` | text | Principal | Família (ex: "Ciconiidae") |

Esses campos são úteis para filtros avançados no futuro e para validação editorial. O `importSeed.ts` já faz spread de todos os campos — basta adicionar ao schema.

### Geração de Categorias e Tags

**Categorias (criar antes do import):**
- Aquáticas, Rapinas, Psitacídeos, Passeriformes, Galiformes, Columbiformes, Caprimulgiformes, Coraciiformes, Piciformes, Outros

**Tags (vocabulário controlado, ~30):**
- Por habitat: areas-alagadas, mata-ciliar, cerrado, campo-limpo, beira-rio
- Por comportamento: noturna, migratoria, bando, solitaria, vocal
- Por valor: iconica, ameacada, endemica, fotogenica, rara
- Por observação: facil-observacao, dificil-observacao, exige-barco

---

## Cronograma de Execução

### Fase 0: Preparação (2-3 dias)

| Tarefa | Quem | Entregável |
|--------|------|-----------|
| **Obter/criar CSV com 166 espécies** | Rafa → João | CSV: commonName, scientificName, (category?) |
| Inventário fotográfico do João | Rafa → João | Lista: quais das 166 ele tem foto |
| Licenciamento formal das fotos | Rafa → João | Contrato simples de uso |
| Adicionar campos `taxonomicOrder` e `family` ao CMS | Dev | Schema atualizado |
| Setup do pipeline (instalar @mendable/firecrawl-js) | Dev | Dependencies prontas |

### Fase 1: Coleta Automatizada (1-2 dias)

| Tarefa | Script | Tempo |
|--------|--------|-------|
| GBIF match (166 espécies) | `01-gbif-match.ts` | ~5 min |
| Wikidata structured (166 espécies) | `02-wikidata-enrich.ts` | ~10 min |
| Firecrawl scrape (213 páginas) | `03-firecrawl-scrape.ts` | ~30-60 min |
| Consolidar JSON intermediário | `04-consolidate.ts` | ~1 min |

### Fase 2: Geração Editorial (3-5 dias)

| Tarefa | Método | Tempo |
|--------|--------|-------|
| Gerar textos (166 espécies) | Claude API batch | ~2h execução |
| Revisão Tier 1 (16 espécies) | Editor humano | 8-12h |
| Revisão Tier 2 (15 espécies) | Editor humano | 4-6h |
| Spot check Tier 3 (amostra 20%) | Editor humano | 3-4h |

### Fase 3: Imagens (3-5 dias, paralelo à Fase 2)

| Tarefa | Método | Tempo |
|--------|--------|-------|
| Processar fotos do João (crop, resize, rename) | Script sharp/ImageMagick | 2-3h |
| Download Wikimedia fallbacks | Script (URL do Wikidata) | 1-2h |
| Verificar licenças e montar credits.csv | Manual | 4-6h |
| Placeholder para espécies sem foto | Gerar SVG/ilustração | 2-3h |

### Fase 4: Import e QA (2-3 dias)

| Tarefa | Método | Tempo |
|--------|--------|-------|
| Gerar seed JSON (bird-seed-166.json) | `05-generate-seed.ts` | ~1 min |
| Import Tier 1 (16 espécies) | `importSeed.ts` + QA individual | 4-6h |
| Import Tier 2 (15 espécies) | `importSeed.ts` + QA por lote | 3-4h |
| Import Tier 3 (135 espécies) | `importSeed.ts` batch | 2-3h |
| QA front-end (layout, filtros, mobile) | Manual | 4-6h |
| Corrigir gavião-real (no CMS mas não no CSV) | Manual | 15 min |

### Total estimado: 12-18 dias úteis

---

## Decisões Pendentes (Rafa)

1. **CSV das 166 espécies:** **BLOQUEANTE.** Não existe nenhum CSV no repositório. O João tem a lista? Em que formato? Precisamos no mínimo: nome popular (PT) + nome científico. Categoria é bônus.

2. **João Andriola — inventário fotográfico:** sem isso, não sabemos quantas das 166 precisam de fallback externo. Segundo item mais bloqueante.

3. **Gavião-real (Harpia harpyja):** está no CMS mas não no levantamento. Manter como "espécie do Pantanal" (genérica) ou remover? Recomendo marcar com tag `pantanal-geral` (não `andriola-166`).

4. **Tom editorial:** o guia GPT propõe textos longos. Na prática, para Tier 3, textos curtos (50-80 palavras por seção) são suficientes e honestos. Concordas?

5. **Timeline:** esse plano assume ~3 semanas. Há pressão para publicar antes?

---

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| CSV das 166 espécies não chega | Alta | Bloqueante | Cobrar do João; alternativa: extrair da BirdLife Pantanal checklist |
| João não tem fotos de muitas espécies | Alta | Alto | Wikimedia fallback + placeholder editorial |
| Wikidata não tem IUCN para espécies obscuras | Média | Médio | Validação manual das 4 ameaçadas; demais = LC (default para aves comuns) |
| Wikipedia PT stub para espécies raras | Alta | Médio | Fallback para EN; para Tier 3, texto mínimo é aceitável |
| Firecrawl bloqueia WikiAves (JS pesado) | Média | Baixo | Playwright MCP como fallback (afeta só 16 espécies Tier 1) |
| Textos LLM genéricos/incorretos | Média | Alto | Revisão humana obrigatória para Tier 1+2; spot check Tier 3 |
| Slug collision (nomes populares duplicados) | Baixa | Médio | slugify com fallback gênero (ex: "gaviao" + "-real" vs "-caboclo") |

---

## Estrutura de Arquivos do Pipeline

```
scripts/bird-enrichment/
├── 01-gbif-match.ts          # GBIF species match (166 chamadas)
├── 02-wikidata-enrich.ts     # Wikidata structured data (IUCN, imagens, links)
├── 03-firecrawl-scrape.ts    # Firecrawl SDK: Wikipedia PT/EN + WikiAves
├── 04-consolidate.ts         # Merge camadas 1+2 em JSON único
├── 05-llm-editorial.ts       # Claude API batch para textos editoriais
├── 06-generate-seed.ts       # Gera JSON no formato SeedData (compatível com importSeed.ts)
├── lib/
│   ├── types.ts              # Tipos compartilhados (SpeciesData, TierConfig, etc.)
│   ├── gbif.ts               # Client GBIF com retry + delay
│   ├── wikidata.ts           # Client Wikidata com parsing de properties
│   └── firecrawl.ts          # Wrapper Firecrawl SDK com rate limiting
├── data/
│   ├── species-source.csv    # CSV original (a ser fornecido pelo João)
│   ├── tier-config.json      # Classificação: slug → tier (1/2/3)
│   ├── gbif-results.json     # Output camada 1A
│   ├── wikidata-results.json # Output camada 1B
│   ├── firecrawl-raw/        # Output camada 2 (1 arquivo .md por espécie, evita JSON gigante)
│   │   ├── jabiru-mycteria-pt.md
│   │   ├── jabiru-mycteria-en.md
│   │   └── ...
│   ├── consolidated.json     # Merge camadas 1+2
│   ├── editorial.json        # Output camada 3 (textos finais)
│   └── enrichment-log.json   # Log de cobertura: quais campos preenchidos por espécie
├── images/
│   ├── local/                # Fotos do João (processadas)
│   ├── wikimedia/            # Fallbacks Wikimedia
│   └── credits.csv           # Autor, fonte, licença por imagem
└── templates/
    └── editorial-prompt.md   # Template do prompt LLM
```

### Mudança vs plano original

| Item | Plano original | Plano revisado | Motivo |
|------|---------------|----------------|--------|
| `06-import-payload.ts` | Script novo de import | **Removido** | `importSeed.ts` já faz isso |
| `07-resolve-relations.ts` | Script separado para relações | **Removido** | `importSeed.ts` já resolve em 2º passe |
| `06-generate-seed.ts` | Não existia | **Adicionado** | Gera JSON no formato que importSeed.ts consome |
| `lib/` | Não existia | **Adicionado** | Separa lógica de API clients dos scripts orquestradores |
| `firecrawl-raw/` | Um JSON gigante | **Diretório com .md** | Evita JSON de 10MB+, facilita inspeção manual |
| `tier-config.json` | Dentro de `templates/` | **Movido para `data/`** | É dado, não template |
| `enrichment-log.json` | Não existia | **Adicionado** | Rastreabilidade: quais campos foram auto-preenchidos vs vazios |
| `import-log.json` | Existia | **Removido** | O importSeed.ts já loga no console |

### Output final: `docs/payload-seed/bird-seed-166.json`

O script `06-generate-seed.ts` gera o seed na pasta canônica (`docs/payload-seed/`), no mesmo formato que `bird-species.json`. O `importSeed.ts` precisa de ajuste mínimo: aceitar path alternativo ou merge no `full-seed.json`.

---

## Dependências npm a instalar

```bash
cd scripts/bird-enrichment
npm init -y
npm install @mendable/firecrawl-js @anthropic-ai/sdk dotenv csv-parse
npm install -D typescript tsx @types/node
```

Scripts são executados via `npx tsx 01-gbif-match.ts` (sem build step).

---

## Nota sobre Firecrawl MCP vs SDK

- **Firecrawl skill (Claude Code):** usar para prototipar scraping de 2-3 espécies interativamente, testar se Wikipedia PT retorna bom markdown, verificar se WikiAves funciona.
- **Firecrawl SDK (`@mendable/firecrawl-js`):** usar nos scripts batch (03-firecrawl-scrape.ts) com rate limiting e retry automático.
- **Playwright MCP:** fallback se Firecrawl falhar em WikiAves (JS pesado). Pode ser invocado interativamente via Claude Code para as 16 espécies Tier 1 se o SDK falhar.

A chave API do Firecrawl (`FIRECRAWL_API_KEY`) precisa estar no `.env` do diretório `scripts/bird-enrichment/`.
