# Payload CMS

Este servico roda o Payload nativo com:

- painel admin (`/admin`)
- autenticacao local por cookie/JWT (`/api/users/login`, `/api/users/logout`, `/api/users/me`)
- CRUD REST completo (`/api/*`)
- GraphQL (`/api/graphql`)

## Modelo de conteudo

- Collections:
  - `users` (auth)
  - `media`
  - `blog-categories`
  - `blog-posts`
  - `bird-categories`
  - `bird-species`
  - `pages`
- Global:
  - `site-settings`

Leitura publica continua aberta para abastecer o site.
Criacao/edicao/exclusao exigem usuario autenticado.

## Rodar local

1. Instale dependencias:

```bash
npm --prefix payload-cms install
```

2. Crie `payload-cms/.env` a partir de `payload-cms/.env.example`.

3. Suba o CMS:

```bash
npm --prefix payload-cms run dev
```

4. Abra:
- Admin: `http://127.0.0.1:3001/admin`
- Health: `http://127.0.0.1:3001/health`

## Usuario dono (owner)

Defina no `.env`:

- `PAYLOAD_OWNER_EMAIL`
- `PAYLOAD_OWNER_PASSWORD`
- `PAYLOAD_OWNER_NAME` (opcional)

O owner e garantido no `onInit` e tambem pode ser forçado manualmente:

```bash
npm --prefix payload-cms run owner:ensure
```

## Carga inicial de conteudo

Importe o seed extraido do site atual:

```bash
npm --prefix payload-cms run seed
```

## Integracao com o app principal

No app principal, defina:

```bash
PAYLOAD_CMS_BASE_URL=http://127.0.0.1:3001
```

Assim o backend principal passa a ler do Payload via REST.

## AWS

- `Dockerfile` e `.dockerignore` incluidos
- `aws/ecs-task-definition.json`
- `docs/plans/2026-02-12-aws-payload-deploy.md`
