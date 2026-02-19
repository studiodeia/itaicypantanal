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
  label: "Culinária",
  admin: {
    group: "Páginas do Site",
    description: "Página de Culinária: edite hero, menu pantaneiro, destaques, serviços e FAQ.",
    preview: () => `${frontendOrigin}/culinaria`,
  },
  access: { read: () => true, update: isAuthenticated },
  versions: { max: 5 },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [{ name: "hero", type: "group", label: "Hero", fields: heroFields() }],
        },
        {
          label: "Manifesto",
          fields: [{ name: "manifesto", type: "group", label: "Manifesto", fields: manifestoFields() }],
        },
        {
          label: "Menu",
          description: "Seção do menu com categorias e imagens.",
          fields: [{ name: "menu", type: "group", label: "Menu", fields: sobreNosFields() }],
        },
        {
          label: "Destaques",
          fields: [{ name: "highlights", type: "group", label: "Destaques", fields: highlightsFields() }],
        },
        {
          label: "Serviços",
          fields: [{ name: "services", type: "group", label: "Serviços", fields: servicesFields() }],
        },
        {
          label: "Experiência",
          fields: [
            {
              name: "experience",
              type: "group",
              label: "Experiência",
              fields: [
                { name: "heading", type: "text", label: "Título", localized: true },
                {
                  name: "body",
                  type: "array",
                  label: "Parágrafos",
                  labels: { singular: "Parágrafo", plural: "Parágrafos" },
                  fields: [
                    { name: "text", type: "textarea", label: "Texto", required: true, localized: true },
                  ],
                },
                { name: "image", type: "text", label: "Imagem de Fundo (path)" },
              ],
            },
          ],
        },
        {
          label: "Cross-Sell",
          description: "CTA para página de acomodações.",
          fields: [
            {
              name: "crossSell",
              type: "group",
              label: "Cross-Sell",
              fields: [
                { name: "heading", type: "text", label: "Título", localized: true },
                { name: "description", type: "textarea", label: "Descrição", localized: true },
                { name: "buttonText", type: "text", label: "Texto do Botão", localized: true },
                { name: "buttonHref", type: "text", label: "Link do Botão" },
                { name: "image", type: "text", label: "Imagem (path)" },
              ],
            },
          ],
        },
        {
          label: "FAQ",
          description: "Perguntas frequentes sobre culinária pantaneira.",
          fields: [
            { name: "faq", type: "group", label: "Perguntas Frequentes", fields: faqFields() },
          ],
        },
      ],
    },
  ],
};
