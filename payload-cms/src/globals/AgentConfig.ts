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
        label: "Portugues",
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
        label: "Espanol",
        required,
        admin: { width: "33%" },
      },
    ],
  };
}

export const AgentConfig: GlobalConfig = {
  slug: "agent-config",
  label: "Configuracoes do Agente IA",
  admin: {
    group: "Agente IA",
    description:
      "Configuracoes operacionais editaveis do agente: disclaimers, handoff, fallback e saudacao.",
  },
  access: {
    read: () => true,
    update: isAuthenticated,
  },
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
              label: "Threshold de Confianca para FAQ (0-1)",
              required: true,
              defaultValue: 0.75,
              min: 0,
              max: 1,
              admin: {
                step: 0.01,
                description:
                  "Abaixo deste valor o agente deve evitar resposta definitiva e priorizar handoff humano.",
              },
            },
          ],
        },
        {
          label: "Disclaimers",
          fields: [
            localizedTextField("priceDisclaimer", "Disclaimer de Preco"),
            localizedTextField(
              "availabilityDisclaimer",
              "Disclaimer de Disponibilidade",
            ),
            localizedTextField("policyDisclaimer", "Disclaimer de Politicas"),
          ],
        },
        {
          label: "Handoff",
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
                  label: "Horario de Atendimento",
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
          label: "Fallback",
          fields: [
            localizedTextField("genericErrorFallback", "Fallback Generico"),
            localizedTextField(
              "apiUnavailableFallback",
              "Fallback API Indisponivel",
            ),
          ],
        },
        {
          label: "Leads",
          fields: [
            localizedTextField("leadConsentPrompt", "Pergunta de Consentimento"),
            localizedTextField("leadSuccessMessage", "Mensagem de Sucesso"),
          ],
        },
        {
          label: "Saudacao",
          fields: [localizedTextField("welcomeGreeting", "Mensagem Inicial")],
        },
      ],
    },
  ],
};
