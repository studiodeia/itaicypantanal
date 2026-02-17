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
- `CLOUDBEDS_API_BASE_URL`
- Uma das opcoes de auth:
  - Token estatico:
    - `CLOUDBEDS_ACCESS_TOKEN`
  - OAuth:
    - `CLOUDBEDS_OAUTH_TOKEN_URL`
    - `CLOUDBEDS_CLIENT_ID`
    - `CLOUDBEDS_CLIENT_SECRET`

Opcional:
- `CLOUDBEDS_REFRESH_TOKEN`
- `CLOUDBEDS_SCOPE`
- `CLOUDBEDS_TIMEOUT_MS` (default `10000`)
- `CLOUDBEDS_RETRY_MAX_ATTEMPTS` (default `3`)
- `CLOUDBEDS_RETRY_BASE_DELAY_MS` (default `300`)
- `CLOUDBEDS_CACHE_TTL_MS` (default `60000`)
- `CLOUDBEDS_CIRCUIT_FAILURE_THRESHOLD` (default `5`)
- `CLOUDBEDS_CIRCUIT_OPEN_MS` (default `60000`)

## Uso rapido

```ts
import { cloudbedsClient } from "../agent/cloudbeds";

const availability = await cloudbedsClient.request("/availability", {
  method: "GET",
  query: {
    checkIn: "2026-03-10",
    checkOut: "2026-03-12",
    adults: 2,
  },
});
```

## Observacoes

- Circuit breaker aberto gera erro `CloudbedsCircuitOpenError`.
- Em `401`, o cliente invalida token e tenta renovar uma vez automaticamente.
- Erros 429/5xx entram no fluxo de retry.
- Cache so se aplica a requests `GET` e pode ser bypassado por request.

## Endpoint de status (admin)

- `GET /api/agent/cloudbeds/status`
- Header: `x-agent-admin-key`
- Query opcional:
  - `probe=true` para executar chamada real de conectividade
  - `probe_path=/properties` para override de rota de probe
