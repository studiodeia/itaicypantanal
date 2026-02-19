import type { Field, GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";

function localizedTextField(
  name: string,
  label: string,
  required = true,
): Field {
  return {
    name,
    type: "group",
    label,
    fields: [
      {
        name: "pt",
        type: "textarea",
        label: "Português",
        required,
        admin: { width: "33%" },
      },
      {
        name: "en",
        type: "textarea",
        label: "English",
        required,
        admin: { width: "33%" },
      },
      {
        name: "es",
        type: "textarea",
        label: "Español",
        required,
        admin: { width: "33%" },
      },
    ],
  };
}

export const AgentConfig: GlobalConfig = {
  slug: "agent-config",
  label: "Configurações do Agente IA",
  admin: {
    group: "Agente de Chat",
    description:
      "⚠️ Alterações aqui afetam o chat ao vivo imediatamente. Configure: nome do assistente, avisos legais (preço, disponibilidade, políticas), contatos para escalonamento humano e mensagens de erro. Use 'Versões' para desfazer mudanças indesejadas.",
  },
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  versions: { max: 5 },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Geral",
          fields: [
            {
              name: "enabled",
              type: "checkbox",
              label: "Ativar agente",
              defaultValue: true,
            },
            {
              name: "assistantName",
              type: "text",
              label: "Nome do Assistente",
              required: true,
              defaultValue: "Assistente Itaicy",
            },
            {
              name: "bookingEngineUrl",
              type: "text",
              label: "URL do Motor de Reservas",
              required: true,
              defaultValue: "https://hotels.cloudbeds.com/reservation/ITAICY",
            },
            {
              name: "faqConfidenceThreshold",
              type: "number",
              label: "Sensibilidade do FAQ",
              required: true,
              defaultValue: 0.75,
              min: 0,
              max: 1,
              admin: {
                step: 0.01,
                description:
                  "Valor entre 0 e 1. Quanto maior, mais exigente o agente é antes de responder com base no FAQ. Recomendado: 0.75. Não altere sem orientação técnica.",
              },
            },
          ],
        },
        {
          label: "Avisos Legais",
          fields: [
            localizedTextField("priceDisclaimer", "Disclaimer de Preço"),
            localizedTextField(
              "availabilityDisclaimer",
              "Disclaimer de Disponibilidade",
            ),
            localizedTextField("policyDisclaimer", "Disclaimer de Políticas"),
          ],
        },
        {
          label: "Contato Humano",
          fields: [
            {
              name: "handoff",
              type: "group",
              label: "Escalonamento Humano",
              fields: [
                {
                  name: "email",
                  type: "email",
                  label: "Email",
                  required: true,
                  defaultValue: "itaicy-digital@studiodeia.com.br",
                  admin: { width: "50%" },
                },
                {
                  name: "emergencyPhone",
                  type: "text",
                  label: "Telefone",
                  required: true,
                  defaultValue: "+55 (67) 99999-9999",
                  admin: { width: "50%" },
                },
                {
                  name: "whatsapp",
                  type: "text",
                  label: "WhatsApp",
                  required: true,
                  defaultValue: "+55 (67) 99999-9999",
                  admin: { width: "50%" },
                },
                {
                  name: "serviceHours",
                  type: "text",
                  label: "Horário de Atendimento",
                  required: true,
                  defaultValue: "Segunda a sexta, 08:00-18:00 (BRT)",
                  admin: { width: "50%" },
                },
                {
                  name: "slaHours",
                  type: "number",
                  label: "SLA (horas)",
                  required: true,
                  defaultValue: 24,
                  min: 1,
                  admin: { width: "25%" },
                },
              ],
            },
          ],
        },
        {
          label: "Mensagens de Erro",
          fields: [
            localizedTextField("genericErrorFallback", "Mensagem padrão de erro"),
            localizedTextField(
              "apiUnavailableFallback",
              "Mensagem quando sistema offline",
            ),
          ],
        },
        {
          label: "Captação de Contatos",
          fields: [
            localizedTextField("leadConsentPrompt", "Pergunta de Consentimento"),
            localizedTextField("leadSuccessMessage", "Mensagem de Sucesso"),
          ],
        },
        {
          label: "Saudação Inicial",
          fields: [localizedTextField("welcomeGreeting", "Mensagem Inicial")],
        },
      ],
    },
  ],
};
