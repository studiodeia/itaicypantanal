import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";
import { manifestoFields } from "../fields/manifestoFields";
import { autoTranslateGlobalAfterChange } from "../hooks/autoTranslate";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const NossoImpactoContent: GlobalConfig = {
  slug: "nosso-impacto-content",
  label: "Nosso Impacto",
  admin: {
    group: "Páginas do Site",
    description: "Página Nosso Impacto: edite hero, manifesto, Rio Vivo, biodiversidade, comunidade, práticas sustentáveis e CTA.",
    preview: () => `${frontendOrigin}/nosso-impacto`,
  },
  access: { read: () => true, update: isAuthenticated },
  versions: { max: 5 },
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
            { name: "hero", type: "group", label: "Hero", fields: heroFields() },
          ],
        },
        {
          label: "Manifesto",
          fields: [
            { name: "manifesto", type: "group", label: "Manifesto", fields: manifestoFields() },
          ],
        },
        {
          label: "Rio Vivo (Cota Zero)",
          fields: [
            {
              name: "rioVivo",
              type: "group",
              label: "Rio Vivo",
              fields: [
                { name: "heading", type: "text", label: "Título", localized: true },
                { name: "description", type: "textarea", label: "Descrição", localized: true },
                {
                  name: "steps",
                  type: "array",
                  label: "Ciclo Cota Zero",
                  labels: { singular: "Etapa", plural: "Etapas" },
                  fields: [
                    { name: "iconName", type: "text", label: "Ícone (ex: Fish, Camera, Waves, Heart)", admin: { width: "30%" } },
                    { name: "title", type: "text", label: "Título", localized: true, admin: { width: "70%" } },
                    { name: "description", type: "textarea", label: "Descrição", localized: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Biodiversidade",
          fields: [
            {
              name: "biodiversidade",
              type: "group",
              label: "Biodiversidade",
              fields: [
                { name: "heading", type: "text", label: "Título", localized: true },
                { name: "description", type: "textarea", label: "Descrição", localized: true },
                {
                  name: "counters",
                  type: "array",
                  label: "Contadores Animados",
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
          label: "Comunidade",
          fields: [
            {
              name: "comunidade",
              type: "group",
              label: "Comunidade",
              fields: [
                { name: "heading", type: "text", label: "Título", localized: true },
                { name: "description", type: "textarea", label: "Descrição", localized: true },
                {
                  name: "body",
                  type: "array",
                  label: "Parágrafos",
                  labels: { singular: "Parágrafo", plural: "Parágrafos" },
                  fields: [
                    { name: "text", type: "textarea", label: "Texto", required: true, localized: true },
                  ],
                },
                { name: "image", type: "text", label: "Imagem (path)" },
              ],
            },
          ],
        },
        {
          label: "Operação Consciente",
          fields: [
            {
              name: "operacao",
              type: "group",
              label: "Operação Consciente",
              fields: [
                { name: "heading", type: "text", label: "Título", localized: true },
                { name: "description", type: "textarea", label: "Descrição", localized: true },
                {
                  name: "practices",
                  type: "array",
                  label: "Práticas Sustentáveis",
                  labels: { singular: "Prática", plural: "Práticas" },
                  fields: [
                    { name: "iconName", type: "text", label: "Ícone (ex: Recycle, GlassWater, Droplets)", admin: { width: "30%" } },
                    { name: "title", type: "text", label: "Título", localized: true, admin: { width: "70%" } },
                    { name: "description", type: "textarea", label: "Descrição", localized: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Engajamento (CTA)",
          fields: [
            {
              name: "engagement",
              type: "group",
              label: "Engajamento",
              fields: [
                { name: "heading", type: "text", label: "Título", localized: true },
                { name: "description", type: "textarea", label: "Descrição", localized: true },
                { name: "buttonText", type: "text", label: "Texto do Botão", localized: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
