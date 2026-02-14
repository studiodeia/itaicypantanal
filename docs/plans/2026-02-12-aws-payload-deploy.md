# Deploy AWS do Payload CMS

## Objetivo

Publicar o `payload-cms` em AWS para demonstracao ao dono do projeto com:

- CMS funcional em URL publica
- banco persistente (RDS Postgres)
- integracao do app principal via `PAYLOAD_CMS_BASE_URL`

## Arquitetura recomendada (producao)

1. `Amazon ECR` para imagem Docker do `payload-cms`.
2. `Amazon ECS Fargate` (ou App Runner) para executar o container.
3. `Amazon RDS PostgreSQL` para persistencia do Payload.
4. `AWS Secrets Manager` para `PAYLOAD_SECRET` e `DATABASE_URL`.
5. `ALB` + HTTPS com ACM.

## Variaveis obrigatorias no container

- `PAYLOAD_SECRET`
- `DATABASE_URL` (RDS Postgres)
- `PAYLOAD_PUBLIC_SERVER_URL` (URL publica do CMS)
- `FRONTEND_ORIGIN` (URL do frontend)
- `PAYLOAD_PORT` (ex.: `3001`)

## Build local da imagem

No diretorio `payload-cms`:

```bash
docker build -t itaicy-payload-cms:latest .
```

## Pipeline de deploy (resumo)

1. Criar repositorio ECR.
2. Push da imagem para ECR.
3. Criar servico ECS Fargate com essa imagem.
   - template inicial: `payload-cms/aws/ecs-task-definition.json`
4. Conectar servico ao ALB e healthcheck `/health`.
5. Configurar SG/NACL para permitir acesso do ECS ao RDS.
6. Rodar seed inicial:
   - `npm run cms:payload:seed` (via task temporaria ou job one-off)

## Cutover do app principal

No app principal, definir:

```bash
PAYLOAD_CMS_BASE_URL=https://SEU-DOMINIO-CMS
```

Com isso o backend passa para modo payload-first automaticamente, mantendo fallback seed se o CMS ficar indisponivel.

## Checklist de demonstracao

1. Abrir admin do Payload e editar:
   - categorias/posts do blog
   - especies de aves
   - `site-settings.sharedSections` (footer/faq/cta/depoimentos/home)
2. Recarregar frontend e validar alteracoes refletidas sem deploy de codigo.
3. Conferir endpoint do app principal:
   - `/api/cms/source` deve retornar `payload`.
