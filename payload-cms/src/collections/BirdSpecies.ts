import type { CollectionConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

function getDocString(doc: unknown, key: string): string {
  if (!doc || typeof doc !== "object") return "";
  const value = (doc as Record<string, unknown>)[key];
  return typeof value === "string" ? value : "";
}

export const BirdSpecies: CollectionConfig = {
  slug: "bird-species",
  labels: {
    singular: "Especie de ave",
    plural: "Especies de aves",
  },
  admin: {
    group: "Birdwatching",
    description:
      "Catalogo de especies para paginas de observacao de aves e conteudo editorial.",
    useAsTitle: "commonName",
    defaultColumns: ["commonName", "scientificName", "slug", "isFeatured", "updatedAt"],
    listSearchableFields: ["commonName", "scientificName", "slug", "tag"],
    preview: ({ doc }) => {
      const slug = getDocString(doc, "slug");
      if (!slug) return `${frontendOrigin}/observacao-de-aves/catalogo`;
      return `${frontendOrigin}/observacao-de-aves/catalogo/${slug}`;
    },
  },
  defaultSort: "commonName",
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
          label: "Principal",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "commonName",
                  type: "text",
                  label: "Nome comum",
                  required: true,
                  admin: {
                    width: "45%",
                  },
                },
                {
                  name: "scientificName",
                  type: "text",
                  label: "Nome cientifico",
                  required: true,
                  admin: {
                    width: "35%",
                  },
                },
                {
                  name: "slug",
                  type: "text",
                  label: "Slug",
                  required: true,
                  unique: true,
                  index: true,
                  admin: {
                    width: "20%",
                  },
                },
              ],
            },
            {
              name: "description",
              type: "textarea",
              label: "Descricao curta",
              required: false,
            },
            {
              type: "row",
              fields: [
                {
                  name: "category",
                  type: "relationship",
                  label: "Categoria",
                  relationTo: "bird-categories",
                  required: false,
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "tag",
                  type: "text",
                  label: "Tag",
                  required: false,
                  admin: {
                    width: "50%",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Midia e metadados",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "src",
                  type: "text",
                  label: "Origem / src",
                  required: false,
                  admin: {
                    width: "40%",
                  },
                },
                {
                  name: "heroImage",
                  type: "text",
                  label: "Imagem principal",
                  required: false,
                  admin: {
                    width: "60%",
                  },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "author",
                  type: "text",
                  label: "Autor",
                  required: false,
                  admin: {
                    width: "30%",
                  },
                },
                {
                  name: "date",
                  type: "text",
                  label: "Data exibida",
                  required: false,
                  admin: {
                    width: "25%",
                  },
                },
                {
                  name: "conservationStatus",
                  type: "text",
                  label: "Status de conservacao",
                  required: false,
                  admin: {
                    width: "25%",
                    description:
                      "Status IUCN. Ex: 'Vulneravel (VU)', 'Pouco Preocupante (LC)'",
                  },
                },
                {
                  name: "size",
                  type: "text",
                  label: "Tamanho",
                  required: false,
                  admin: {
                    width: "20%",
                  },
                },
              ],
            },
            {
              name: "isFeatured",
              type: "checkbox",
              label: "Exibir como especie em destaque",
              defaultValue: false,
              admin: {
                description:
                  "Marque para exibir na secao de aves em destaque.",
              },
            },
          ],
        },
        {
          label: "Conteudo detalhado",
          fields: [
            {
              name: "habitat",
              type: "textarea",
              label: "Habitat",
              required: false,
            },
            {
              name: "overview",
              type: "textarea",
              label: "Visao geral",
              required: false,
            },
            {
              name: "diet",
              type: "textarea",
              label: "Alimentacao",
              required: false,
            },
            {
              name: "behavior",
              type: "textarea",
              label: "Comportamento",
              required: false,
            },
            {
              name: "bestTime",
              type: "textarea",
              label: "Melhor periodo de observacao",
              required: false,
            },
            {
              name: "photographyTips",
              type: "array",
              label: "Dicas de fotografia",
              required: false,
              admin: {
                initCollapsed: true,
                description:
                  "Dicas praticas para fotografar esta especie no Pantanal.",
              },
              fields: [
                {
                  name: "tip",
                  type: "text",
                  label: "Dica",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "Relacionamentos",
          fields: [
            {
              name: "relatedSpecies",
              type: "relationship",
              label: "Especies relacionadas",
              relationTo: "bird-species",
              hasMany: true,
              required: false,
            },
          ],
        },
      ],
    },
  ],
};
