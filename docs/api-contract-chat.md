# API Contract - Chat Agent (`POST /api/chat`)

## Request

```json
{
  "message": "Quero saber se tem vaga em julho",
  "session_id": "c53ce9a8-9a2f-4c6d-9d8a-88177c00f0ab",
  "guest_token": "jwt-opcional",
  "lang": "pt"
}
```

Campos:
- `message` (obrigatorio): texto do usuario.
- `session_id` (opcional): UUID da sessao; se ausente, backend cria.
- `guest_token` (opcional): JWT de hospede autenticado.
- `lang` (opcional): `pt | en | es`.

## Response (SSE)

Headers:
- `Content-Type: text/event-stream`
- `Cache-Control: no-cache`
- `Connection: keep-alive`

Eventos suportados:

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

## Regras de Confianca

- `confidence_score` e `source_refs` sao obrigatorios em `done` quando houver consulta de conhecimento.
- Se `confidence_score` ficar abaixo de `agent-config.faqConfidenceThreshold`, o backend deve priorizar handoff humano e evitar resposta definitiva.
- `grounding_level` deve ser:
  - `full`: resposta sustentada integralmente por fontes.
  - `partial`: resposta combina fonte + contexto gerado.
  - `none`: sem fonte confiavel (priorizar handoff).
