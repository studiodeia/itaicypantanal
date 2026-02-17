# Painel RBAC (Admin e Usuario)

## Rotas de autenticacao

- `POST /api/panel/auth/login`
- `POST /api/panel/auth/logout`
- `GET /api/panel/auth/me`

## Rotas de painel

- `GET /api/panel/dashboard` (qualquer usuario autenticado)
- `GET /api/panel/admin/users` (somente `admin`)
- `POST /api/panel/admin/users` (somente `admin`)
- `PATCH /api/panel/admin/users/:id` (somente `admin`)
- `DELETE /api/panel/admin/users/:id` (somente `admin`, desativa usuario)
- `POST /api/panel/admin/users/:id/reset-password` (somente `admin`)

## Niveis de acesso

- `admin`: acesso completo ao dashboard administrativo e lista de usuarios.
- `manager`: acesso ao dashboard administrativo (sem lista de usuarios admin-only).
- `user`: acesso ao painel de usuario.

## Configuracao de contas

### Modo recomendado (com banco)

Quando `DATABASE_URL` estiver disponivel, o painel usa a tabela `panel_users` para login e gestao.

Migration:
- `migrations/0002_panel_users.sql`
- comando: `npm run db:push`

Formato de senha salvo:
- `scrypt:<salt>:<hash>` (gerado automaticamente nas rotas de criacao/alteracao)

### Modo fallback (sem banco)

Variavel opcional:
- `PANEL_ACCOUNTS_JSON`

Exemplo:

```json
[
  {
    "id": "admin-1",
    "username": "admin",
    "password": "sha256:240be518fabd2724ddb6f04eeb6fdfc2f2709e5a61f7f8a60329f43f6a2fdd5a",
    "role": "admin",
    "displayName": "Administrador"
  },
  {
    "id": "user-1",
    "username": "operador",
    "password": "senha-forte-aqui",
    "role": "user",
    "displayName": "Operador"
  }
]
```

Notas:
- `password` aceita texto puro ou `sha256:<hash>`.
- Em `development`, se nao houver banco e nem `PANEL_ACCOUNTS_JSON`, o sistema cria contas de demo:
  - `admin / admin123`
  - `user / user123`
- Sem banco, as rotas de criacao/edicao de usuarios retornam indisponivel.

## Token

- Assinatura HMAC SHA-256 (JWT-like)
- Header esperado no frontend:
  - `Authorization: Bearer <token>`
- Variaveis:
  - `PANEL_JWT_SECRET` (obrigatoria em producao)
  - `PANEL_TOKEN_TTL_SEC` (default `28800`, 8h)

## Frontend

- Login: `/painel/login`
- Painel usuario: `/painel`
- Painel admin: `/painel/admin`

O widget de chat e ocultado automaticamente em rotas do painel.

## Smoke test rapido

Para validar RBAC sem depender de banco (fallback por env):

- comando: `npm run panel:smoke`

Saidas esperadas:
- logins `admin`, `manager`, `user` retornam `200`
- `manager_admin_users_status=403`
- `create_user_status=503` quando banco nao estiver configurado
