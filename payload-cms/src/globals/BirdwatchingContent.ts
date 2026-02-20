import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";
import { manifestoFields } from "../fields/manifestoFields";
import { highlightsFields } from "../fields/highlightsFields";
import { sobreNosFields } from "../fields/sobreNosFields";
import { faqFields } from "../fields/faqFields";
import { autoTranslateGlobalAfterChange } from "../hooks/autoTranslate";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const BirdwatchingContent: GlobalConfig = {
  slug: "birdwatching-content",
  label: "Observação de Aves",
  admin: {
    group: "Páginas do Site",
    description: "Página de Observação de Aves: edite hero, manifesto, sobre nós, destaques e FAQ.",
    preview: () => `${frontendOrigin}/observacao-de-aves`,
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
          label: "Sobre Nós",
          fields: [
            { name: "sobreNos", type: "group", label: "Sobre Nós", fields: sobreNosFields() },
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
          description: "Perguntas frequentes sobre observação de aves.",
          fields: [
            { name: "faq", type: "group", label: "Perguntas Frequentes", fields: faqFields() },
          ],
        },
      ],
    },
  ],
};
