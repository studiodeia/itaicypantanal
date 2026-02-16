import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { heroFields } from "../fields/heroFields";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const NotFoundContent: GlobalConfig = {
  slug: "not-found-content",
  label: "Pagina 404",
  admin: {
    group: "Paginas",
    description: "Conteudo da pagina de erro 404.",
    preview: () => `${frontendOrigin}/404-preview`,
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
          label: "Acao",
          fields: [
            {
              name: "buttonText",
              type: "text",
              label: "Texto do Botao (Voltar)",
            },
          ],
        },
      ],
    },
  ],
};
