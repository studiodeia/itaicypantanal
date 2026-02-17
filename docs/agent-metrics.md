# Agent Metrics Runbook

## Endpoint

- `GET /api/agent/metrics`
- Header obrigatorio fora de dev: `x-agent-admin-key: <AGENT_ADMIN_KEY>`
- Query opcional: `window_hours` (1-720, default `24`)

### Exemplo

```bash
curl -s "http://127.0.0.1:5000/api/agent/metrics?window_hours=24" \
  -H "x-agent-admin-key: $AGENT_ADMIN_KEY"
```

### Shape de resposta

```json
{
  "status": "ok",
  "metrics": {
    "windowHours": 24,
    "periodStart": "2026-02-16T00:00:00.000Z",
    "periodEnd": "2026-02-17T00:00:00.000Z",
    "totals": {
      "interactions": 128,
      "success": 102,
      "fallback": 19,
      "error": 7,
      "handoffs": 16,
      "leads": 11
    },
    "rates": {
      "fallbackRate": 0.1484,
      "errorRate": 0.0547,
      "handoffRate": 0.125
    },
    "latency": {
      "avgMs": 1320.4,
      "p50Ms": 910.2,
      "p95Ms": 4420.8
    },
    "tokens": {
      "input": 98540,
      "output": 144220,
      "total": 242760
    },
    "tools": [
      {
        "tool": "searchFAQ",
        "total": 94,
        "avgLatencyMs": 870.2,
        "p95LatencyMs": 2330.1,
        "fallbackRate": 0.1064,
        "errorRate": 0.0319
      }
    ]
  }
}
```

## SLAs sugeridos

- p95 de latencia por tool: `< 10s`
- taxa de erro total: `< 5%`
- taxa de fallback: `< 25%`
- handoff rate: calibrar por fase; iniciar com alvo `< 35%`

## Alertas operacionais (sugestao)

1. Erro alto:
   - Condicao: `errorRate > 0.05` por 15 minutos.
2. Latencia alta:
   - Condicao: `p95Ms > 10000` por 15 minutos.
3. Fallback alto:
   - Condicao: `fallbackRate > 0.30` por 30 minutos.
4. Cloudbeds indisponivel (quando tools estiverem ativas):
   - Condicao: erros consecutivos em `checkAvailability` ou `getRates` por 5 minutos.

## Queries SQL uteis

```sql
-- Latencia media e p95 por tool (24h)
SELECT
  tool_used,
  AVG(latency_ms) AS avg_latency_ms,
  percentile_cont(0.95) WITHIN GROUP (ORDER BY latency_ms) AS p95_latency_ms
FROM agent_logs
WHERE created_at >= now() - interval '24 hours'
  AND tool_used IS NOT NULL
GROUP BY tool_used
ORDER BY p95_latency_ms DESC;
```

```sql
-- Taxa de fallback e erro (24h)
SELECT
  COUNT(*) AS total,
  AVG(CASE WHEN fallback_used OR status = 'fallback' THEN 1 ELSE 0 END) AS fallback_rate,
  AVG(CASE WHEN status = 'error' THEN 1 ELSE 0 END) AS error_rate
FROM agent_logs
WHERE created_at >= now() - interval '24 hours';
```

```sql
-- Custo aproximado de tokens por dia
SELECT
  date_trunc('day', created_at) AS day,
  SUM(tokens_in) AS tokens_in,
  SUM(tokens_out) AS tokens_out,
  SUM(COALESCE(tokens_in, 0) + COALESCE(tokens_out, 0)) AS tokens_total
FROM agent_logs
GROUP BY 1
ORDER BY 1 DESC;
```
