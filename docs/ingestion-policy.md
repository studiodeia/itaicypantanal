# Politica de Ingestao do Agente

## Objetivo

Manter a base de FAQs do agente sincronizada com o CMS, com suporte a reindexacao full e incremental.

## Endpoint operacional

- `POST /api/agent/reindex/faqs`
- Header recomendado em producao: `x-agent-admin-key: <AGENT_ADMIN_KEY>`

### Reindex full

Request:

```json
{}
```

Comportamento:
- Reprocessa todas as FAQs do CMS compartilhado.
- Faz upsert por chave unica `source_doc_id + lang`.
- Remove entradas antigas de FAQ (`cms-shared-faq-*`) que nao existem mais no CMS.
- Gera embeddings quando `OPENAI_API_KEY` esta configurada.

### Reindex incremental

Request:

```json
{
  "source_doc_id": "cms-shared-faq-como-faco-uma-reserva"
}
```

Comportamento:
- Reprocessa apenas a FAQ indicada pelo `source_doc_id`.
- Mantem as demais entradas intactas.

## Estrategia recomendada

1. Rodar reindex full no deploy inicial do agente.
2. Rodar reindex incremental apos edicao de FAQ no CMS (manual ou automacao).
3. Rodar reindex full noturno (cron) para convergencia de consistencia.

## Hook automatico no Payload (ja implementado)

- Global afetado: `site-settings`
- Trigger: mudanca em `faqItems`
- Hook: `payload-cms/src/hooks/triggerAgentFaqReindex.ts`
- Acao: chama `POST /api/agent/reindex/faqs` (full) com timeout curto.

Variaveis de ambiente no CMS:
- `AGENT_REINDEX_URL` (default `http://127.0.0.1:5000/api/agent/reindex/faqs`)
- `AGENT_REINDEX_KEY` (enviar no header `x-agent-admin-key`)
- `AGENT_REINDEX_TIMEOUT_MS` (default `4000`)

## Observabilidade minima

- Registrar no `agent_logs`:
  - latencia da consulta
  - `confidence_score`
  - `grounding_level`
  - `source_refs`
- Monitorar:
  - taxa de fallback
  - taxa de handoff
  - percentual de respostas com grounding `none`
