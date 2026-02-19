import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const ContatoContent: GlobalConfig = {
  slug: "contato-content",
  label: "Contato",
  admin: {
    group: "Páginas do Site",
    description: "Página de Contato: edite hero, formulário, canais de atendimento e coordenadas do mapa.",
    preview: () => `${frontendOrigin}/contato`,
  },
  access: { read: () => true, update: isAuthenticated },
  versions: { max: 5 },
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
          label: "Formulário",
          fields: [
            { name: "formTitle", type: "text", label: "Título do Formulário", localized: true },
            {
              name: "steps",
              type: "group",
              label: "Etapas do Formulário",
              fields: [
                {
                  name: "placeholders",
                  type: "array",
                  label: "Placeholders dos Campos",
                  labels: { singular: "Campo", plural: "Campos" },
                  fields: [
                    { name: "text", type: "text", label: "Placeholder", required: true, localized: true },
                  ],
                },
                { name: "buttonNext", type: "text", label: "Botão Avançar", localized: true },
                { name: "buttonBack", type: "text", label: "Botão Voltar", localized: true },
                { name: "buttonSubmit", type: "text", label: "Botão Enviar", localized: true },
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
                { name: "heading", type: "text", label: "Título", localized: true },
                {
                  name: "items",
                  type: "array",
                  label: "Canais de Contato",
                  labels: { singular: "Canal", plural: "Canais" },
                  fields: [
                    { name: "iconName", type: "text", label: "Ícone (ex: Phone, Mail, MapPin)", admin: { width: "30%" } },
                    { name: "title", type: "text", label: "Título", localized: true, admin: { width: "70%" } },
                    { name: "info", type: "text", label: "Informação (telefone, email, endereço)", localized: true },
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
                { name: "lat", type: "number", label: "Latitude", admin: { width: "50%" } },
                { name: "lng", type: "number", label: "Longitude", admin: { width: "50%" } },
              ],
            },
          ],
        },
      ],
    },
  ],
};
