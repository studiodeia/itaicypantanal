import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";
import { manifestoFields } from "../fields/manifestoFields";
import { highlightsFields } from "../fields/highlightsFields";
import { faqFields } from "../fields/faqFields";
import { autoTranslateGlobalAfterChange } from "../hooks/autoTranslate";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const AcomodacoesContent: GlobalConfig = {
  slug: "acomodacoes-content",
  label: "Acomodações",
  admin: {
    group: "Páginas do Site",
    description: "Página de Acomodações: edite hero, manifesto, destaques, tipos de quarto e FAQ.",
    preview: () => `${frontendOrigin}/acomodacoes`,
  },
  access: { read: () => true, update: isAuthenticated },
  versions: {
    max: 5,
  },
  hooks: {
    afterChange: [autoTranslateGlobalAfterChange],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "hero", type: "group", label: "Hero", fields: heroFields({ hasVideo: true }) },
          ],
        },
        {
          label: "Manifesto",
          fields: [
            { name: "manifesto", type: "group", label: "Manifesto", fields: manifestoFields() },
          ],
        },
        {
          label: "Destaques",
          fields: [
            { name: "highlights", type: "group", label: "Destaques", fields: highlightsFields() },
          ],
        },
        {
          label: "Quartos",
          description: "Tipos de acomodação (Explorer, Adventure, Family).",
          fields: [
            {
              name: "rooms",
              type: "array",
              label: "Tipos de Quarto",
              labels: { singular: "Quarto", plural: "Quartos" },
              fields: [
                { name: "title", type: "text", label: "Nome do Quarto", required: true, localized: true },
                { name: "description", type: "textarea", label: "Descrição", localized: true },
                { name: "image", type: "text", label: "Imagem (path)" },
                { name: "ctaText", type: "text", label: "Texto do Botão", localized: true },
                {
                  name: "features",
                  type: "array",
                  label: "Características",
                  labels: { singular: "Item", plural: "Itens" },
                  fields: [
                    { name: "iconName", type: "text", label: "Ícone", admin: { width: "30%" } },
                    { name: "label", type: "text", label: "Texto", localized: true, admin: { width: "70%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Culinária",
          description: "Cross-sell da culinária na página de acomodações.",
          fields: [
            {
              name: "culinary",
              type: "group",
              label: "Culinária",
              fields: [
                { name: "label", type: "text", label: "Rótulo", localized: true },
                { name: "heading", type: "text", label: "Título", localized: true },
                { name: "description", type: "textarea", label: "Descrição", localized: true },
                {
                  name: "images",
                  type: "array",
                  label: "Imagens",
                  labels: { singular: "Imagem", plural: "Imagens" },
                  fields: [
                    { name: "src", type: "text", label: "Caminho", required: true },
                    { name: "alt", type: "text", label: "Alt Text", localized: true },
                    { name: "tag", type: "text", label: "Tag (overlay)", localized: true },
                  ],
                },
                { name: "ctaText", type: "text", label: "Texto do Botão", localized: true },
                { name: "ctaHref", type: "text", label: "Link do Botão" },
              ],
            },
          ],
        },
        {
          label: "FAQ",
          description: "Perguntas frequentes sobre acomodações.",
          fields: [
            { name: "faq", type: "group", label: "Perguntas Frequentes", fields: faqFields() },
          ],
        },
      ],
    },
  ],
};
