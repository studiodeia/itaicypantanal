import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";
import { manifestoFields } from "../fields/manifestoFields";
import { highlightsFields } from "../fields/highlightsFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const AcomodacoesContent: GlobalConfig = {
  slug: "acomodacoes-content",
  label: "Acomodacoes",
  admin: {
    group: "Paginas",
    description: "Conteudo editavel da pagina de acomodacoes.",
    preview: () => `${frontendOrigin}/acomodacoes`,
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
              fields: heroFields({ hasVideo: true }),
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
          label: "Quartos",
          description:
            "Tipos de acomodacao (Explorer, Adventure, Family).",
          fields: [
            {
              name: "rooms",
              type: "array",
              label: "Tipos de Quarto",
              labels: { singular: "Quarto", plural: "Quartos" },
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Nome do Quarto",
                  required: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Descricao",
                },
                { name: "image", type: "text", label: "Imagem (path)" },
                {
                  name: "ctaText",
                  type: "text",
                  label: "Texto do Botao",
                },
                {
                  name: "features",
                  type: "array",
                  label: "Caracteristicas",
                  labels: { singular: "Item", plural: "Itens" },
                  fields: [
                    {
                      name: "iconName",
                      type: "text",
                      label: "Icone",
                      admin: { width: "30%" },
                    },
                    {
                      name: "label",
                      type: "text",
                      label: "Texto",
                      admin: { width: "70%" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Culinaria",
          description:
            "Cross-sell da culinaria na pagina de acomodacoes.",
          fields: [
            {
              name: "culinary",
              type: "group",
              label: "Culinaria",
              fields: [
                { name: "label", type: "text", label: "Rotulo" },
                { name: "heading", type: "text", label: "Titulo" },
                {
                  name: "description",
                  type: "textarea",
                  label: "Descricao",
                },
                {
                  name: "images",
                  type: "array",
                  label: "Imagens",
                  labels: {
                    singular: "Imagem",
                    plural: "Imagens",
                  },
                  fields: [
                    {
                      name: "src",
                      type: "text",
                      label: "Caminho",
                      required: true,
                    },
                    { name: "alt", type: "text", label: "Alt Text" },
                    {
                      name: "tag",
                      type: "text",
                      label: "Tag (overlay)",
                    },
                  ],
                },
                {
                  name: "ctaText",
                  type: "text",
                  label: "Texto do Botao",
                },
                {
                  name: "ctaHref",
                  type: "text",
                  label: "Link do Botao",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
