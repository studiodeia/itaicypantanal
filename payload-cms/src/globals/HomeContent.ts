import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { sobreNosFields } from "../fields/sobreNosFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const HomeContent: GlobalConfig = {
  slug: "home-content",
  label: "Home",
  admin: {
    group: "Paginas",
    description: "Conteudo editavel da pagina inicial.",
    preview: () => `${frontendOrigin}/`,
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
          label: "Sobre Nos",
          description: "Secao 'Sobre Nos' com pilares e imagem.",
          fields: [
            {
              name: "aboutUs",
              type: "group",
              label: "Sobre Nos",
              fields: sobreNosFields(),
            },
          ],
        },
        {
          label: "Expedicoes",
          description: "Cards de expedicoes (Pesca, Birdwatching, Ecoturismo).",
          fields: [
            {
              name: "expeditions",
              type: "group",
              label: "Expedicoes",
              fields: [
                { name: "label", type: "text", label: "Rotulo" },
                { name: "heading", type: "text", label: "Titulo" },
                {
                  name: "description",
                  type: "textarea",
                  label: "Descricao",
                },
                {
                  name: "items",
                  type: "array",
                  label: "Cards de Expedicao",
                  labels: {
                    singular: "Expedicao",
                    plural: "Expedicoes",
                  },
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      label: "Titulo",
                      required: true,
                    },
                    {
                      name: "description",
                      type: "textarea",
                      label: "Descricao",
                    },
                    {
                      name: "backgroundImage",
                      type: "text",
                      label: "Imagem de Fundo (path)",
                    },
                    { name: "href", type: "text", label: "Link" },
                  ],
                },
                {
                  name: "buttonText",
                  type: "text",
                  label: "Texto do Botao",
                },
              ],
            },
          ],
        },
        {
          label: "Estatisticas",
          description:
            "Contadores animados (hospedes, aves, anos, avaliacao).",
          fields: [
            {
              name: "stats",
              type: "group",
              label: "Estatisticas",
              fields: [
                {
                  name: "items",
                  type: "array",
                  label: "Contadores",
                  labels: {
                    singular: "Contador",
                    plural: "Contadores",
                  },
                  fields: [
                    {
                      name: "target",
                      type: "number",
                      label: "Valor Alvo",
                      required: true,
                    },
                    {
                      name: "suffix",
                      type: "text",
                      label: "Sufixo (ex: +, %)",
                      admin: { width: "30%" },
                    },
                    {
                      name: "label",
                      type: "text",
                      label: "Legenda",
                      admin: { width: "70%" },
                    },
                    {
                      name: "hasIcon",
                      type: "checkbox",
                      label: "Tem Icone?",
                      defaultValue: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Acomodacoes (CTA)",
          description:
            "Secao de acomodacoes com imagem de fundo e botoes.",
          fields: [
            {
              name: "accommodation",
              type: "group",
              label: "Acomodacoes",
              fields: [
                { name: "label", type: "text", label: "Rotulo" },
                { name: "heading", type: "text", label: "Titulo" },
                { name: "body", type: "textarea", label: "Texto" },
                {
                  name: "buttonReserve",
                  type: "text",
                  label: "Texto Botao Reservar",
                },
                {
                  name: "buttonDetails",
                  type: "text",
                  label: "Texto Botao Detalhes",
                },
                {
                  name: "backgroundImage",
                  type: "text",
                  label: "Imagem de Fundo (path)",
                },
              ],
            },
          ],
        },
        {
          label: "Nosso Impacto",
          description: "Secao de impacto com pilares e imagem.",
          fields: [
            {
              name: "impact",
              type: "group",
              label: "Impacto",
              fields: [
                { name: "label", type: "text", label: "Rotulo" },
                { name: "heading", type: "text", label: "Titulo" },
                {
                  name: "items",
                  type: "array",
                  label: "Pilares de Impacto",
                  labels: { singular: "Pilar", plural: "Pilares" },
                  fields: [
                    {
                      name: "number",
                      type: "text",
                      label: "Numero",
                      admin: { width: "20%" },
                    },
                    {
                      name: "title",
                      type: "text",
                      label: "Titulo",
                      admin: { width: "80%" },
                    },
                    {
                      name: "description",
                      type: "textarea",
                      label: "Descricao",
                    },
                  ],
                },
                { name: "image", type: "text", label: "Imagem (path)" },
              ],
            },
          ],
        },
        {
          label: "Blog",
          description: "Secao do blog na home.",
          fields: [
            {
              name: "blog",
              type: "group",
              label: "Blog",
              fields: [
                { name: "label", type: "text", label: "Rotulo" },
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
              ],
            },
          ],
        },
      ],
    },
  ],
};
