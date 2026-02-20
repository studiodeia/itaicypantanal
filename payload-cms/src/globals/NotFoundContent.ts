import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";
import { autoTranslateGlobalAfterChange } from "../hooks/autoTranslate";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const NotFoundContent: GlobalConfig = {
  slug: "not-found-content",
  label: "Página 404",
  admin: {
    group: "Páginas do Site",
    description: "Página 404: edite o conteúdo exibido quando uma URL não existe.",
    preview: () => `${frontendOrigin}/404-preview`,
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
          label: "Ação",
          fields: [
            { name: "buttonText", type: "text", label: "Texto do Botão (Voltar)", localized: true },
          ],
        },
      ],
    },
  ],
};
