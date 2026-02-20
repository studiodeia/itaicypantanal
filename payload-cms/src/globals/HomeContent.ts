import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { sobreNosFields } from "../fields/sobreNosFields";
import { faqFields } from "../fields/faqFields";
import { autoTranslateGlobalAfterChange } from "../hooks/autoTranslate";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const HomeContent: GlobalConfig = {
  slug: "home-content",
  label: "Home",
  admin: {
    group: "Páginas do Site",
    description: "Página inicial: edite os textos das seções Sobre Nós, Expedições, Estatísticas, Acomodações, Impacto e Blog.",
    preview: () => `${frontendOrigin}/`,
  },
  access: {
    read: () => true,
    update: isAuthenticated,
  },
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
          label: "Sobre Nós",
          description: "Seção 'Sobre Nós' com pilares e imagem.",
          fields: [
            {
              name: "aboutUs",
              type: "group",
              label: "Sobre Nós",
              fields: sobreNosFields(),
            },
          ],
        },
        {
          label: "Expedições",
          description: "Cards de expedições (Pesca, Birdwatching, Ecoturismo).",
          fields: [
            {
              name: "expeditions",
              type: "group",
              label: "Expedições",
              fields: [
                { name: "label", type: "text", label: "Rótulo", localized: true },
                { name: "heading", type: "text", label: "Título", localized: true },
                { name: "description", type: "textarea", label: "Descrição", localized: true },
                {
                  name: "items",
                  type: "array",
                  label: "Cards de Expedição",
                  labels: { singular: "Expedição", plural: "Expedições" },
                  fields: [
                    { name: "title", type: "text", label: "Título", required: true, localized: true },
                    { name: "description", type: "textarea", label: "Descrição", localized: true },
                    { name: "backgroundImage", type: "text", label: "Imagem de Fundo (path)" },
                    { name: "href", type: "text", label: "Link" },
                  ],
                },
                { name: "buttonText", type: "text", label: "Texto do Botão", localized: true },
              ],
            },
          ],
        },
        {
          label: "Estatísticas",
          description: "Contadores animados (hóspedes, aves, anos, avaliação).",
          fields: [
            {
              name: "stats",
              type: "group",
              label: "Estatísticas",
              fields: [
                {
                  name: "items",
                  type: "array",
                  label: "Contadores",
                  labels: { singular: "Contador", plural: "Contadores" },
                  fields: [
                    { name: "target", type: "number", label: "Valor Alvo", required: true },
                    { name: "suffix", type: "text", label: "Sufixo (ex: +, %)", localized: true, admin: { width: "30%" } },
                    { name: "label", type: "text", label: "Legenda", localized: true, admin: { width: "70%" } },
                    { name: "hasIcon", type: "checkbox", label: "Tem Ícone?", defaultValue: false },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Acomodações (CTA)",
          description: "Seção de acomodações com imagem de fundo e botões.",
          fields: [
            {
              name: "accommodation",
              type: "group",
              label: "Acomodações",
              fields: [
                { name: "label", type: "text", label: "Rótulo", localized: true },
                { name: "heading", type: "text", label: "Título", localized: true },
                { name: "body", type: "textarea", label: "Texto", localized: true },
                { name: "buttonReserve", type: "text", label: "Texto Botão Reservar", localized: true },
                { name: "buttonDetails", type: "text", label: "Texto Botão Detalhes", localized: true },
                { name: "backgroundImage", type: "text", label: "Imagem de Fundo (path)" },
              ],
            },
          ],
        },
        {
          label: "Nosso Impacto",
          description: "Seção de impacto com pilares e imagem.",
          fields: [
            {
              name: "impact",
              type: "group",
              label: "Impacto",
              fields: [
                { name: "label", type: "text", label: "Rótulo", localized: true },
                { name: "heading", type: "text", label: "Título", localized: true },
                {
                  name: "items",
                  type: "array",
                  label: "Pilares de Impacto",
                  labels: { singular: "Pilar", plural: "Pilares" },
                  fields: [
                    { name: "number", type: "text", label: "Número", localized: true, admin: { width: "20%" } },
                    { name: "title", type: "text", label: "Título", localized: true, admin: { width: "80%" } },
                    { name: "description", type: "textarea", label: "Descrição", localized: true },
                  ],
                },
                { name: "image", type: "text", label: "Imagem (path)" },
              ],
            },
          ],
        },
        {
          label: "Blog",
          description: "Seção do blog na home.",
          fields: [
            {
              name: "blog",
              type: "group",
              label: "Blog",
              fields: [
                { name: "label", type: "text", label: "Rótulo", localized: true },
                { name: "heading", type: "text", label: "Título", localized: true },
                { name: "description", type: "textarea", label: "Descrição", localized: true },
                { name: "buttonText", type: "text", label: "Texto do Botão", localized: true },
              ],
            },
          ],
        },
        {
          label: "FAQ",
          description: "Perguntas frequentes gerais sobre o Pantanal e a pousada.",
          fields: [
            { name: "faq", type: "group", label: "Perguntas Frequentes", fields: faqFields() },
          ],
        },
      ],
    },
  ],
};
