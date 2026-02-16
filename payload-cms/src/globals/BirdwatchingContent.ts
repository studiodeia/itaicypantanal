import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";
import { manifestoFields } from "../fields/manifestoFields";
import { highlightsFields } from "../fields/highlightsFields";
import { sobreNosFields } from "../fields/sobreNosFields";
import { faqFields } from "../fields/faqFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const BirdwatchingContent: GlobalConfig = {
  slug: "birdwatching-content",
  label: "Observacao de Aves",
  admin: {
    group: "Paginas",
    description: "Conteudo editavel da pagina de observacao de aves.",
    preview: () => `${frontendOrigin}/observacao-de-aves`,
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
          label: "FAQ",
          description: "Perguntas frequentes sobre observacao de aves.",
          fields: [
            { name: "faq", type: "group", label: "Perguntas Frequentes", fields: faqFields() },
          ],
        },
      ],
    },
  ],
};
