# Relatório de Deploy Vercel — Itaicy Pantanal Eco Lodge

**Data:** 2026-02-17
**Status atual:** Frontend (estático) OK | Serverless Function FALHA (500)

---

## Resumo Executivo

O deploy do site para Vercel tem **dois componentes**:
1. **Frontend SPA** (Vite/React) → **Funcionando** — assets estáticos servidos pelo CDN Vercel
2. **Serverless Function** (Express/Node.js) → **Falhando** — FUNCTION_INVOCATION_FAILED

O frontend carrega normalmente (`/`, `/assets/*`, `/images/*`), mas toda rota que precisa da função serverless (`/api/*`, `/sitemap.xml`, `/robots.txt`, rotas SPA com meta-injection) retorna erro 500.

---

## Abordagens Tentadas

### Abordagem 1: @vercel/node (ncc)

**Configuração:** `vercel.json` com `"functions": { "api/index.ts": {...} }`
**Como funciona:** Vercel usa `ncc` (baseado no webpack) para compilar o TypeScript e criar um bundle CJS.

| Teste | Resultado |
|-------|-----------|
| `api/hello.ts` — função mínima (só retorna JSON) | ✅ Funciona |
| `api/index.ts` + `import express` (sem imports do projeto) | ✅ Funciona |
| `api/index.ts` + `import "../shared/cms-shared-content"` | ❌ FUNCTION_INVOCATION_FAILED |
| `api/index.ts` + `import "../server/cms-content"` | ❌ FUNCTION_INVOCATION_FAILED |
| `api/index.ts` + `import "../server/routes"` (completo) | ❌ FUNCTION_INVOCATION_FAILED |

**Diagnóstico:** O ncc compila `api/index.ts` em CJS (`module.exports`), mas o `package.json` do projeto tem `"type": "module"`. Node.js trata qualquer `.js` no escopo desse `package.json` como ESM, fazendo o `module.exports` do ncc ser silenciosamente ignorado.

Quando o import é trivial (só express, que é npm puro), o ncc auto-contém tudo no bundle e funciona. Quando o import referencia arquivos do projeto (`../shared/`, `../server/`), o ncc segue a cadeia de imports e o TypeScript compiler encontra conflitos:
- `tsconfig.json` usa `moduleResolution: "bundler"` (não compatível com ncc)
- Path aliases `@shared/*` podem não ser resolvidos corretamente pelo ncc
- O `"type": "module"` faz o bundle CJS do ncc ser interpretado como ESM pelo Node.js

**Causa-raiz:** Incompatibilidade entre `"type": "module"` no `package.json` e a saída CJS do ncc.

---

### Abordagem 2: Build Output API v3 (esbuild manual)

**Configuração:** `scripts/vercel-build.sh` — esbuild empacota tudo em um bundle único, copia para `.vercel/output/functions/api/index.func/`

**Vantagem:** Controle total do bundle — formato, resolução de módulos, etc.

| Variação | Resultado |
|----------|-----------|
| CJS (`--format=cjs`, `index.js`) sem `package.json` local | ❌ `handler: undefined` (mesmo problema de `"type":"module"`) |
| CJS + `{"type":"commonjs"}` package.json no diretório da função | ❌ FUNCTION_INVOCATION_FAILED (mesmo com handler válido localmente) |
| ESM (`--format=esm`, `index.mjs`) | ❌ FUNCTION_INVOCATION_FAILED |
| Função mínima (5 linhas, sem imports) | ❌ FUNCTION_INVOCATION_FAILED |

**Diagnóstico:** A Build Output API v3 falha **mesmo com funções triviais**. Isso indica que o problema não é o código em si, mas algo na configuração do `.vc-config.json` ou na detecção do Build Output API pela Vercel.

**Possível causa:** A Vercel pode não estar reconhecendo o diretório `.vercel/output/` como Build Output API v3, ou o `config.json`/`.vc-config.json` tem algum campo incorreto para a versão do runtime disponível.

---

## Problemas Identificados

### 1. `"type": "module"` no `package.json` (CRÍTICO)

```json
{
  "type": "module"
}
```

Isso faz **todo `.js`** no projeto ser tratado como ESM pelo Node.js. O ncc do @vercel/node gera CJS, criando conflito fatal. Soluções possíveis:
- Adicionar `{"type":"commonjs"}` local na pasta da função
- Usar extensão `.cjs` para o bundle
- Remover `"type": "module"` do root (impacto: quebra o build ESM existente)

### 2. `moduleResolution: "bundler"` no `tsconfig.json`

```json
{
  "moduleResolution": "bundler"
}
```

Resolução "bundler" é para ferramentas como Vite/esbuild, não para ncc/webpack. ncc pode não resolver corretamente imports com esta configuração.

### 3. Cadeia de imports pesada

`server/routes.ts` importa toda a árvore do servidor:
- `server/db.ts` → `drizzle-orm/neon-serverless` (driver de banco)
- `server/agent/*` → `@ai-sdk/anthropic`, `@ai-sdk/openai`, `ai` (SDK de IA)
- `shared/schema.ts` → `drizzle-orm/pg-core`, `drizzle-zod`

Mesmo que o banco não tenha `DATABASE_URL` configurado, esses imports são resolvidos no build-time. O bundle final tem ~3MB.

### 4. Build Output API v3 inconsistente

A abordagem Build Output API v3 deveria funcionar com esbuild manual, mas FUNCTION_INVOCATION_FAILED aparece mesmo para funções mínimas, sugerindo um problema de configuração ou detecção do Vercel.

---

## Estado Atual dos Arquivos

| Arquivo | Estado | Observação |
|---------|--------|------------|
| `vercel.json` | @vercel/node config | `buildCommand`, `functions`, `rewrites` |
| `api/index.ts` | Versão diagnóstica | Só importa `../shared/cms-shared-content` |
| `api/package.json` | `{"type":"commonjs"}` | Tentativa de fix CJS (não testado ainda) |
| `scripts/vercel-build.sh` | BOA v3 script | CJS + export check |
| `tsconfig.json` | Atualizado | Adicionado `api/**/*` ao `include` |
| `.vercelignore` | Criado | Exclui build artifacts e dev files |

---

## Caminho Recomendado

### Opção A: esbuild pré-bundle + @vercel/node (RECOMENDADO)

1. No `buildCommand`, usar esbuild para compilar `api/index.ts` → `api/_compiled.cjs` (CJS, bundle completo)
2. Criar `api/index.js` como wrapper simples que importa e re-exporta do `_compiled.cjs`
3. Manter `"type": "module"` no root, mas o `.cjs` é sempre CJS independente

**Vantagem:** Controle total do bundle sem depender do ncc.

### Opção B: Build Output API v3 com debugging mais profundo

1. Investigar por que até funções mínimas falham com BOA v3
2. Verificar se o `--prebuilt` flag está sendo detectado corretamente
3. Testar com `runtime: "nodejs18.x"` ao invés de `nodejs20.x`

### Opção C: Deploy split (frontend Vercel + backend separado)

1. Vercel apenas para assets estáticos (sem serverless)
2. Backend em Cloud Run / Fly.io / Railway (Express completo)
3. Frontend faz fetch para URL do backend

**Vantagem:** Evita completamente as limitações do serverless.
**Desvantagem:** Dois deployments para gerenciar.

---

## Log de Deploys

| # | Abordagem | URL | Resultado |
|---|-----------|-----|-----------|
| 1 | @vercel/node completo | itaicypantanal-4t3ljkg3g | 500 (FUNCTION_INVOCATION_FAILED) |
| 2 | @vercel/node dynamic imports | itaicypantanal-k4m3836kx | registerRoutes: Cannot find module |
| 3 | @vercel/node static imports | itaicypantanal-dsz4n4inz | 500 (FUNCTION_INVOCATION_FAILED) |
| 4 | @vercel/node express-only | itaicypantanal-jgxwyojgj | ✅ `{"ok":true}` |
| 5 | @vercel/node + cms-content | itaicypantanal-qy185uhfl | 500 (FUNCTION_INVOCATION_FAILED) |
| 6 | @vercel/node + shared import | itaicypantanal-bo5jcuazj | 500 (FUNCTION_INVOCATION_FAILED) |
| 7 | @vercel/node + tsconfig fix | itaicypantanal-lp44u72wc | 500 (FUNCTION_INVOCATION_FAILED) |
| 8 | BOA v3 (ESM, preview) | itaicypantanal-7lmqgx26b | 401 (auth required, não testado) |

---

## Conclusão

O problema central é a incompatibilidade entre `"type": "module"` do projeto e o pipeline de compilação CJS do ncc/@vercel/node. Funções isoladas funcionam, mas qualquer import de código do projeto falha. A Build Output API v3 tem um problema separado (possivelmente configuração).

A **Opção A** (esbuild pré-bundle como `.cjs`) é o caminho mais provável de sucesso, pois:
- Controla o formato de saída
- Extensão `.cjs` garante CJS independente do `"type": "module"`
- Resolve path aliases via `--alias` do esbuild
- Já temos o script `vercel-build.sh` como base
