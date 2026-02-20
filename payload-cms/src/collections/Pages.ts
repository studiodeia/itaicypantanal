import type { CollectionConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

function getDocString(doc: unknown, key: string): string {
  if (!doc || typeof doc !== "object") return "";
  const value = (doc as Record<string, unknown>)[key];
  return typeof value === "string" ? value : "";
}

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: "Pagina",
    plural: "Paginas",
  },
  admin: {
    hidden: true,
    group: "Sistema",
    description:
      "Coleção de páginas em desenvolvimento. Não utilizada na produção atual.",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    listSearchableFields: ["title", "slug"],
    preview: ({ doc }) => {
      const currentSlug = getDocString(doc, "slug").trim();
      const normalizedSlug = currentSlug.startsWith("/")
        ? currentSlug
        : `/${currentSlug}`;
      return `${frontendOrigin}${normalizedSlug || "/"}`;
    },
  },
  defaultSort: "slug",
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Identificacao",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Titulo interno",
                  required: false,
                  admin: {
                    width: "60%",
                    description:
                      "Nome para identificar a pagina no CMS (nao aparece no site).",
                  },
                },
                {
                  name: "slug",
                  type: "text",
                  label: "Rota / slug",
                  required: true,
                  unique: true,
                  index: true,
                  admin: {
                    width: "40%",
                    description:
                      "Use a rota completa, ex.: /, /blog, /observacao-de-aves.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
