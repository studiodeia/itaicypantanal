# Cloudbeds Client (AG-30)

## Objetivo

Cliente HTTP reutilizavel para Cloudbeds com:
- OAuth token + refresh automatico
- retry com backoff exponencial
- cache curto para GET
- circuit breaker para indisponibilidade prolongada

## Arquivos

- `server/agent/cloudbeds/config.ts`
- `server/agent/cloudbeds/auth.ts`
- `server/agent/cloudbeds/cache.ts`
- `server/agent/cloudbeds/client.ts`
- `server/agent/cloudbeds/index.ts`

## Variaveis de ambiente

Obrigatorias para habilitar:
- `CLOUDBEDS_ENABLED=true`
- `CLOUDBEDS_API_BASE_URL` (recomendado: `https://hotels.cloudbeds.com/api/v1.2`)
- Uma das opcoes de auth (ordem recomendada):
  - **API Key (preferido para PMS read-only no MVP):**
    - `CLOUDBEDS_API_KEY` (formato `cbat_...`)
  - Token estatico (OAuth access_token ja obtido):
    - `CLOUDBEDS_ACCESS_TOKEN`
  - OAuth completo (quando voce precisar de refresh_token):
    - `CLOUDBEDS_OAUTH_TOKEN_URL` (recomendado: `https://hotels.cloudbeds.com/api/v1.2/access_token`)
    - `CLOUDBEDS_CLIENT_ID`
    - `CLOUDBEDS_CLIENT_SECRET`
    - `CLOUDBEDS_OAUTH_REDIRECT_URI`

Opcional:
- `CLOUDBEDS_REFRESH_TOKEN`
- `CLOUDBEDS_SCOPE`
- `CLOUDBEDS_OAUTH_AUTHORIZE_URL` (default `https://api.cloudbeds.com/api/v1.3/oauth`)
- `CLOUDBEDS_OAUTH_CALLBACK_GRANT_TYPE` (default `authorization_code`)
- `CLOUDBEDS_TIMEOUT_MS` (default `10000`)
- `CLOUDBEDS_RETRY_MAX_ATTEMPTS` (default `3`)
- `CLOUDBEDS_RETRY_BASE_DELAY_MS` (default `300`)
- `CLOUDBEDS_CACHE_TTL_MS` (default `60000`)
- `CLOUDBEDS_CIRCUIT_FAILURE_THRESHOLD` (default `5`)
- `CLOUDBEDS_CIRCUIT_OPEN_MS` (default `60000`)
- `CLOUDBEDS_AVAILABILITY_PATH` (default `/getAvailableRoomTypes`)
- `CLOUDBEDS_RATES_PATH` (default `/getRatePlans`)
- `CLOUDBEDS_PROPERTY_IDS` (opcional, para multi-propriedade)
- `CLOUDBEDS_DEFAULT_ROOMS` (default `1`)

## Uso rapido

```ts
import { cloudbedsClient } from "../agent/cloudbeds";

const availability = await cloudbedsClient.request("/getAvailableRoomTypes", {
  method: "GET",
  query: {
    startDate: "2026-03-10",
    endDate: "2026-03-12",
    rooms: 1,
    adults: 2,
    children: 0,
  },
});
```

## Observacoes

- Circuit breaker aberto gera erro `CloudbedsCircuitOpenError`.
- Em `401`, o cliente invalida token e tenta renovar uma vez automaticamente.
- Erros 429/5xx entram no fluxo de retry.
- Cache so se aplica a requests `GET` e pode ser bypassado por request.
- **API Keys (`cbat_...`) sao tratadas como long-lived** (sem refresh).
- Para chamadas OAuth em runtime, e necessario `CLOUDBEDS_REFRESH_TOKEN` (ou `CLOUDBEDS_ACCESS_TOKEN` estatico). Cloudbeds nao usa grant `client_credentials` para este fluxo PMS.

## Endpoint de status (admin)

- `GET /api/agent/cloudbeds/status`
- Header: `x-agent-admin-key`
- Query opcional:
  - `probe=true` para executar chamada real de conectividade
  - `probe_path=/getHotels` para override de rota de probe (default: `/getHotels`)

## OAuth callback

- `GET /api/agent/cloudbeds/oauth/callback`
- URL recomendada de producao:
  - `https://www.itaicypantanal.com.br/api/agent/cloudbeds/oauth/callback`
- Ao receber `code`, o endpoint troca por token no Cloudbeds e persiste credenciais/tokens no `.env` local.
- Em ambiente serverless (Vercel), o endpoint tambem exibe `CLOUDBEDS_ACCESS_TOKEN` e `CLOUDBEDS_REFRESH_TOKEN` para copia manual em Environment Variables.

## OAuth start (helper)

- `GET /api/agent/cloudbeds/oauth/start`
- Uso recomendado:
  - `https://www.itaicypantanal.com.br/api/agent/cloudbeds/oauth/start`
- Com `redirect=false`, retorna JSON com `authorize_url` para copia:
  - `/api/agent/cloudbeds/oauth/start?redirect=false`
