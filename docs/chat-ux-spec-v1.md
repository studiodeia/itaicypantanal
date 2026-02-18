# Chat UX Spec - Itaicy v1

Data: 2026-02-17
Escopo: widget web (desktop + mobile) com Vercel AI SDK, SSE e handoff humano.

## 1. Objetivo de UX

- Entregar atendimento digital rapido para hoteis/turismo com foco em conversao (reserva) e resolucao (duvidas).
- Preservar confianca: IA responde o que sabe, humano assume quando necessario.
- Manter visual minimalista, branco, elegante e claramente distinto do layout principal do site.

## 2. Heuristicas consolidadas (benchmark)

- Primeira interacao guiada com 2-3 quick actions + texto livre.
- Handoff humano explicito, sempre disponivel quando houver erro/baixa confianca.
- CTA comercial contextual apos disponibilidade/tarifa.
- Mensagens curtas, claras, sem persona humana ficticia.
- Mobile-first: chat deve ocupar viewport inteira quando aberto em telas pequenas.
- Proatividade leve: nudge discreto, sem pop-up intrusivo.

## 3. Arquitetura de estados

- Estado fechado:
- launcher visivel (pill branca)
- animacao discreta de halo/pulse
- nudge textual opcional apos atraso

- Estado aberto:
- cabecalho com "Atendimento digital"
- area de mensagens com streaming
- quick actions no primeiro contato
- area de input + disclaimer
- bloco de handoff quando recomendado

- Estado de erro:
- faixa de erro curta com acao "Ok"
- sugere contato humano automaticamente

- Estado de tool:
- barra superior com indicador de processamento por tool

## 4. Tokens de layout

- Launcher:
- altura: 56px
- largura: conteudo + padding (pill)
- offset desktop: 24px
- offset mobile: 12px

- Janela desktop:
- largura: 400px (max 420px)
- altura mensagens: min(62dvh, 520px)
- radius: 24px

- Janela mobile:
- modo fullscreen quando aberta
- largura: 100vw
- altura: 100dvh
- radius: 0

## 5. Motion e transicoes

- Abrir/fechar widget: 200ms, ease-out
- Hover/tap em botoes: 150ms
- Pulso do launcher: 5.2s, baixa opacidade
- Glow secundario launcher: 5.6s, baixa intensidade
- Indicator de tool: pulse discreto
- Todos os efeitos respeitam `prefers-reduced-motion`

## 6. Regras de copy

- Nome exibido: "Itaicy Atendimento Digital"
- Subtitulo: "Com apoio da equipe humana"
- Nao personificar (nao usar nome proprio humano para IA)
- Mensagem inicial:
- PT: "Este e o atendimento digital..."
- EN/ES equivalentes sem persona

## 7. Handoff e canais

Triggers recomendados:
- tool error
- fallback
- grounding_level = none
- pedido explicito do visitante

Card de handoff deve incluir:
- horario de atendimento
- SLA medio
- canais: WhatsApp, telefone, email (quando configurados)

## 8. Contrato de eventos no frontend

Consumidos do SSE:
- `token`: render incremental da resposta
- `tool_start`: ativa barra de processamento
- `tool_end`: atualiza sugestoes (booking/handoff)
- `done`: fecha ciclo, persiste session_id e avalia grounding
- `error`: exibe mensagem e eleva handoff

## 9. KPIs de UX para monitorar

- FRT (first response time percebido): alvo < 1s
- Tempo para primeira acao (quick action ou envio): alvo < 8s
- CTR de "Reservar agora"
- Taxa de handoff por sessao
- Taxa de erro visivel ao usuario

## 10. Criterios de aceite

- Widget abre/fecha com transicao suave em desktop e mobile.
- Em mobile, ocupa tela inteira sem quebrar safe-area.
- Quick actions aparecem apenas antes da primeira pergunta do usuario.
- Handoff aparece automaticamente em erro/fallback.
- Sem nome/personificacao de agente.
- CTA "Reservar agora" aparece apos ferramentas comerciais.
- Acessibilidade minima: labels, foco, contraste e reduced-motion.
