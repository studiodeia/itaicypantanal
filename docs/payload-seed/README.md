# Seed inicial para Payload CMS

Este diretorio contem a exportacao do conteudo atual do site para apoiar a migracao sem perda.

## Arquivos

- `full-seed.json`: pacote completo (blog + aves + rotas).
- `blog-posts.json`: dados de categorias, posts e detalhes do blog.
- `bird-species.json`: dados de categorias, especies e detalhes do catalogo.
- `shared-content.json`: conteudo dos blocos compartilhados (footer, FAQ, CTA, depoimentos e home).
- `routes.json`: mapa de rotas atuais para orientar a collection `pages`.
- `sections-manifest.json`: inventario das sections hardcoded para backlog de migracao.

## Como regenerar

No projeto `itaicypantanal`, execute:

```bash
npm run cms:seed:check
npm run cms:seed:write
npm run cms:audit:sections
```

## Uso recomendado na migracao

1. Criar collections no Payload:
   - `blogCategories`, `blogPosts`
   - `birdCategories`, `birdSpecies`
   - `pages`, `media`, `siteSettings`
2. Importar primeiro `blog-posts.json` e `bird-species.json`.
3. Validar slugs e relacionamentos (`relatedSlugs`) antes de conectar o frontend.
4. Integrar frontend por fallback (Payload -> local), evitando downtime.

## Opcional: importar direto no scaffold Payload

No diretorio `payload-cms/`:

```bash
npm install
npm run dev
npm run seed
```

Depois, no app principal, configurar `PAYLOAD_CMS_BASE_URL` para ativar leitura payload-first com fallback.
