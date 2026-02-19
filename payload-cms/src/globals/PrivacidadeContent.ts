import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const PrivacidadeContent: GlobalConfig = {
  slug: "privacidade-content",
  label: "Política de Privacidade",
  admin: {
    group: "Páginas do Site",
    description: "Política de Privacidade: edite título, data de atualização e seções do documento.",
    preview: () => `${frontendOrigin}/politica-de-privacidade`,
  },
  access: { read: () => true, update: isAuthenticated },
  versions: { max: 5 },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Cabeçalho",
          fields: [
            {
              name: "hero",
              type: "group",
              label: "Cabeçalho",
              fields: [
                { name: "title", type: "text", label: "Título da Página", localized: true },
                { name: "lastUpdated", type: "text", label: "Última Atualização (ex: 15 de Fevereiro, 2026)", localized: true },
              ],
            },
          ],
        },
        {
          label: "Seções",
          description: "Seções da política de privacidade. Use **negrito** no início para criar itens de lista.",
          fields: [
            {
              name: "sections",
              type: "array",
              label: "Seções",
              labels: { singular: "Seção", plural: "Seções" },
              fields: [
                { name: "id", type: "text", label: "ID (âncora, ex: dados-coletados)", required: true, admin: { width: "30%" } },
                { name: "title", type: "text", label: "Título da Seção", required: true, localized: true, admin: { width: "70%" } },
                {
                  name: "content",
                  type: "array",
                  label: "Parágrafos",
                  labels: { singular: "Parágrafo", plural: "Parágrafos" },
                  admin: {
                    description: "Cada item é um parágrafo. Comece com ** para criar itens de lista com negrito.",
                  },
                  fields: [
                    { name: "text", type: "textarea", label: "Texto", required: true, localized: true },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
