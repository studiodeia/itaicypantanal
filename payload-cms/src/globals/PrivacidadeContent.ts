import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const PrivacidadeContent: GlobalConfig = {
  slug: "privacidade-content",
  label: "Politica de Privacidade",
  admin: {
    group: "Paginas",
    description: "Conteudo editavel da politica de privacidade.",
    preview: () => `${frontendOrigin}/politica-de-privacidade`,
  },
  access: { read: () => true, update: isAuthenticated },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Cabecalho",
          fields: [
            {
              name: "hero",
              type: "group",
              label: "Cabecalho",
              fields: [
                { name: "title", type: "text", label: "Titulo da Pagina" },
                {
                  name: "lastUpdated",
                  type: "text",
                  label: "Ultima Atualizacao (ex: 15 de Fevereiro, 2026)",
                },
              ],
            },
          ],
        },
        {
          label: "Secoes",
          description:
            "Secoes da politica de privacidade. Use **negrito** no inicio para criar itens de lista.",
          fields: [
            {
              name: "sections",
              type: "array",
              label: "Secoes",
              labels: { singular: "Secao", plural: "Secoes" },
              fields: [
                {
                  name: "id",
                  type: "text",
                  label: "ID (ancora, ex: dados-coletados)",
                  required: true,
                  admin: { width: "30%" },
                },
                {
                  name: "title",
                  type: "text",
                  label: "Titulo da Secao",
                  required: true,
                  admin: { width: "70%" },
                },
                {
                  name: "content",
                  type: "array",
                  label: "Paragrafos",
                  labels: {
                    singular: "Paragrafo",
                    plural: "Paragrafos",
                  },
                  admin: {
                    description:
                      "Cada item e um paragrafo. Comece com ** para criar itens de lista com negrito.",
                  },
                  fields: [
                    {
                      name: "text",
                      type: "textarea",
                      label: "Texto",
                      required: true,
                    },
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
