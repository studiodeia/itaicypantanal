import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";
import { manifestoFields } from "../fields/manifestoFields";
import { highlightsFields } from "../fields/highlightsFields";
import { sobreNosFields } from "../fields/sobreNosFields";
import { servicesFields } from "../fields/servicesFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const EcoturismoContent: GlobalConfig = {
  slug: "ecoturismo-content",
  label: "Ecoturismo",
  admin: {
    group: "Paginas",
    description: "Conteudo editavel da pagina de ecoturismo.",
    preview: () => `${frontendOrigin}/ecoturismo`,
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
          label: "Sobre Nos",
          fields: [
            { name: "sobreNos", type: "group", label: "Sobre Nos", fields: sobreNosFields() },
          ],
        },
        {
          label: "Destaques",
          fields: [
            { name: "highlights", type: "group", label: "Destaques", fields: highlightsFields() },
          ],
        },
        {
          label: "Servicos",
          fields: [
            { name: "services", type: "group", label: "Servicos", fields: servicesFields() },
          ],
        },
      ],
    },
  ],
};
