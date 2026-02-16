import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const ContatoContent: GlobalConfig = {
  slug: "contato-content",
  label: "Contato",
  admin: {
    group: "Paginas",
    description: "Conteudo editavel da pagina de contato.",
    preview: () => `${frontendOrigin}/contato`,
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
          label: "Formulario",
          fields: [
            {
              name: "formTitle",
              type: "text",
              label: "Titulo do Formulario",
            },
            {
              name: "steps",
              type: "group",
              label: "Etapas do Formulario",
              fields: [
                {
                  name: "placeholders",
                  type: "array",
                  label: "Placeholders dos Campos",
                  labels: { singular: "Campo", plural: "Campos" },
                  fields: [
                    {
                      name: "text",
                      type: "text",
                      label: "Placeholder",
                      required: true,
                    },
                  ],
                },
                {
                  name: "buttonNext",
                  type: "text",
                  label: "Botao Avancar",
                },
                {
                  name: "buttonBack",
                  type: "text",
                  label: "Botao Voltar",
                },
                {
                  name: "buttonSubmit",
                  type: "text",
                  label: "Botao Enviar",
                },
              ],
            },
          ],
        },
        {
          label: "Canais de Atendimento",
          fields: [
            {
              name: "channels",
              type: "group",
              label: "Canais",
              fields: [
                { name: "heading", type: "text", label: "Titulo" },
                {
                  name: "items",
                  type: "array",
                  label: "Canais de Contato",
                  labels: { singular: "Canal", plural: "Canais" },
                  fields: [
                    {
                      name: "iconName",
                      type: "text",
                      label: "Icone (ex: Phone, Mail, MapPin)",
                      admin: { width: "30%" },
                    },
                    {
                      name: "title",
                      type: "text",
                      label: "Titulo",
                      admin: { width: "70%" },
                    },
                    {
                      name: "info",
                      type: "text",
                      label: "Informacao (telefone, email, endereco)",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Mapa",
          fields: [
            {
              name: "mapCoords",
              type: "group",
              label: "Coordenadas do Mapa",
              fields: [
                {
                  name: "lat",
                  type: "number",
                  label: "Latitude",
                  admin: { width: "50%" },
                },
                {
                  name: "lng",
                  type: "number",
                  label: "Longitude",
                  admin: { width: "50%" },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
