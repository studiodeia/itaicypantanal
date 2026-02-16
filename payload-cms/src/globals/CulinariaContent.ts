import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";
import { manifestoFields } from "../fields/manifestoFields";
import { highlightsFields } from "../fields/highlightsFields";
import { sobreNosFields } from "../fields/sobreNosFields";
import { servicesFields } from "../fields/servicesFields";
import { faqFields } from "../fields/faqFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const CulinariaContent: GlobalConfig = {
  slug: "culinaria-content",
  label: "Culinaria",
  admin: {
    group: "Paginas",
    description: "Conteudo editavel da pagina de culinaria.",
    preview: () => `${frontendOrigin}/culinaria`,
  },
  access: { read: () => true, update: isAuthenticated },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "hero",
              type: "group",
              label: "Hero",
              fields: heroFields(),
            },
          ],
        },
        {
          label: "Manifesto",
          fields: [
            {
              name: "manifesto",
              type: "group",
              label: "Manifesto",
              fields: manifestoFields(),
            },
          ],
        },
        {
          label: "Menu",
          description: "Secao do menu com categorias e imagens.",
          fields: [
            {
              name: "menu",
              type: "group",
              label: "Menu",
              fields: sobreNosFields(),
            },
          ],
        },
        {
          label: "Destaques",
          fields: [
            {
              name: "highlights",
              type: "group",
              label: "Destaques",
              fields: highlightsFields(),
            },
          ],
        },
        {
          label: "Servicos",
          fields: [
            {
              name: "services",
              type: "group",
              label: "Servicos",
              fields: servicesFields(),
            },
          ],
        },
        {
          label: "Experiencia",
          fields: [
            {
              name: "experience",
              type: "group",
              label: "Experiencia",
              fields: [
                { name: "heading", type: "text", label: "Titulo" },
                {
                  name: "body",
                  type: "array",
                  label: "Paragrafos",
                  labels: {
                    singular: "Paragrafo",
                    plural: "Paragrafos",
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
                {
                  name: "image",
                  type: "text",
                  label: "Imagem de Fundo (path)",
                },
              ],
            },
          ],
        },
        {
          label: "Cross-Sell",
          description: "CTA para pagina de acomodacoes.",
          fields: [
            {
              name: "crossSell",
              type: "group",
              label: "Cross-Sell",
              fields: [
                { name: "heading", type: "text", label: "Titulo" },
                {
                  name: "description",
                  type: "textarea",
                  label: "Descricao",
                },
                {
                  name: "buttonText",
                  type: "text",
                  label: "Texto do Botao",
                },
                {
                  name: "buttonHref",
                  type: "text",
                  label: "Link do Botao",
                },
                { name: "image", type: "text", label: "Imagem (path)" },
              ],
            },
          ],
        },
        {
          label: "FAQ",
          description: "Perguntas frequentes sobre culinaria pantaneira.",
          fields: [
            { name: "faq", type: "group", label: "Perguntas Frequentes", fields: faqFields() },
          ],
        },
      ],
    },
  ],
};
