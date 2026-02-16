import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";
import { manifestoFields } from "../fields/manifestoFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const NossoImpactoContent: GlobalConfig = {
  slug: "nosso-impacto-content",
  label: "Nosso Impacto",
  admin: {
    group: "Paginas",
    description: "Conteudo editavel da pagina Nosso Impacto (conservacao).",
    preview: () => `${frontendOrigin}/nosso-impacto`,
  },
  access: { read: () => true, update: isAuthenticated },
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
                { name: "heading", type: "text", label: "Titulo" },
                { name: "description", type: "textarea", label: "Descricao" },
                {
                  name: "steps",
                  type: "array",
                  label: "Ciclo Cota Zero",
                  labels: { singular: "Etapa", plural: "Etapas" },
                  fields: [
                    {
                      name: "iconName",
                      type: "text",
                      label: "Icone (ex: Fish, Camera, Waves, Heart)",
                      admin: { width: "30%" },
                    },
                    {
                      name: "title",
                      type: "text",
                      label: "Titulo",
                      admin: { width: "70%" },
                    },
                    { name: "description", type: "textarea", label: "Descricao" },
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
                { name: "heading", type: "text", label: "Titulo" },
                { name: "description", type: "textarea", label: "Descricao" },
                {
                  name: "counters",
                  type: "array",
                  label: "Contadores Animados",
                  labels: { singular: "Contador", plural: "Contadores" },
                  fields: [
                    { name: "target", type: "number", label: "Valor Alvo", required: true },
                    { name: "suffix", type: "text", label: "Sufixo (ex: +, %)", admin: { width: "30%" } },
                    { name: "label", type: "text", label: "Legenda", admin: { width: "70%" } },
                    { name: "hasIcon", type: "checkbox", label: "Tem Icone?", defaultValue: false },
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
                { name: "heading", type: "text", label: "Titulo" },
                { name: "description", type: "textarea", label: "Descricao" },
                {
                  name: "body",
                  type: "array",
                  label: "Paragrafos",
                  labels: { singular: "Paragrafo", plural: "Paragrafos" },
                  fields: [
                    { name: "text", type: "textarea", label: "Texto", required: true },
                  ],
                },
                { name: "image", type: "text", label: "Imagem (path)" },
              ],
            },
          ],
        },
        {
          label: "Operacao Consciente",
          fields: [
            {
              name: "operacao",
              type: "group",
              label: "Operacao Consciente",
              fields: [
                { name: "heading", type: "text", label: "Titulo" },
                { name: "description", type: "textarea", label: "Descricao" },
                {
                  name: "practices",
                  type: "array",
                  label: "Praticas Sustentaveis",
                  labels: { singular: "Pratica", plural: "Praticas" },
                  fields: [
                    { name: "iconName", type: "text", label: "Icone (ex: Recycle, GlassWater, Droplets)", admin: { width: "30%" } },
                    { name: "title", type: "text", label: "Titulo", admin: { width: "70%" } },
                    { name: "description", type: "textarea", label: "Descricao" },
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
                { name: "heading", type: "text", label: "Titulo" },
                { name: "description", type: "textarea", label: "Descricao" },
                { name: "buttonText", type: "text", label: "Texto do Botao" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
