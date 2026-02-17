# API Contract - Chat Agent (`POST /api/chat`)

## Request

```json
{
  "message": "Quero saber se tem vaga em julho",
  "request_id": "5e6e59fe-2733-4b91-a8db-cf3658ff9abf",
  "session_id": "c53ce9a8-9a2f-4c6d-9d8a-88177c00f0ab",
  "guest_token": "jwt-opcional",
  "lang": "pt"
}
```

Campos:
- `message` (obrigatorio): texto do usuario.
- `request_id` (opcional): UUID de rastreio da chamada.
- `session_id` (opcional): UUID da sessao; se ausente, backend cria.
- `guest_token` (opcional): JWT de hospede autenticado.
- `lang` (opcional): `pt | en | es`.
- Request e `strict`: campos extras nao definidos sao rejeitados (400).
- Limite de payload: 20 KB por request.

## Response (SSE)

Headers:
- `Content-Type: text/event-stream`
- `Cache-Control: no-cache`
- `Connection: keep-alive`
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`

Eventos suportados:
- Ferramentas atualmente registradas no agente:
  - `searchFAQ`
  - `checkAvailability`
  - `getRates`

### `token`

```json
{ "event": "token", "text": "Trecho incremental..." }
```

### `tool_start`

```json
{
  "event": "tool_start",
  "tool": "searchFAQ",
  "input": { "query": "horario check-in" }
}
```

### `tool_end`

```json
{
  "event": "tool_end",
  "tool": "searchFAQ",
  "status": "success",
  "confidence_score": 0.81,
  "grounding_level": "full",
  "source_refs": [
    { "source_id": "faq-001", "source_type": "faq", "score": 0.81 }
  ]
}
```

### `done`

```json
{
  "event": "done",
  "session_id": "c53ce9a8-9a2f-4c6d-9d8a-88177c00f0ab",
  "confidence_score": 0.81,
  "grounding_level": "full",
  "source_refs": [
    { "source_id": "faq-001", "source_type": "faq", "score": 0.81 }
  ]
}
```

### `error`

```json
{
  "event": "error",
  "code": "upstream_unavailable",
  "message": "Cloudbeds indisponivel no momento",
  "retryable": true
}
```

## Error Codes

- `400`: request invalido.
- `429`: rate limit.
- `500`: erro interno.
- `503`: dependencia externa indisponivel.

## Runtime da LLM

- `AGENT_MODEL` (default: `claude-3-5-sonnet-latest`)
- `AGENT_TEMPERATURE` (default: `0.35`)
- `AGENT_MAX_OUTPUT_TOKENS` (default: `900`)
- `AGENT_MAX_OUTPUT_TOKENS_COMMERCIAL` (default: `540`) para intents de disponibilidade/tarifa
- `AGENT_MAX_OUTPUT_TOKENS_POLICY` (default: `620`) para intents de politica
- `AGENT_FIRST_TOKEN_DELAY_MS` (default: `220`) para um inicio de resposta mais natural

O backend classifica o intento da mensagem (`availability`, `rates`, `policy`, `reservation_help`, `general`) e ajusta:
- estilo de linguagem no system prompt por idioma/intento;
- limite de tokens por tipo de resposta;
- latencia inicial para dar ritmo mais humano.

## Reindex de FAQs (operacional)

### Endpoint

- `POST /api/agent/reindex/faqs`
- Header opcional em dev, obrigatorio em prod: `x-agent-admin-key`

### Body (full)

```json
{}
```

### Body (incremental)

```json
{
  "source_doc_id": "cms-shared-faq-como-faco-uma-reserva"
}
```

## Regras de Confianca

- `confidence_score` e `source_refs` sao obrigatorios em `done` quando houver consulta de conhecimento.
- Se `confidence_score` ficar abaixo de `agent-config.faqConfidenceThreshold`, o backend deve priorizar handoff humano e evitar resposta definitiva.
- `grounding_level` deve ser:
  - `full`: resposta sustentada integralmente por fontes.
  - `partial`: resposta combina fonte + contexto gerado.
  - `none`: sem fonte confiavel (priorizar handoff).
