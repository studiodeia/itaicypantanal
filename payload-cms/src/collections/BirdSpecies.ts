import type { CollectionConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { autoTranslateCollectionAfterChange } from "../hooks/autoTranslate";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

function getDocString(doc: unknown, key: string): string {
  if (!doc || typeof doc !== "object") return "";
  const value = (doc as Record<string, unknown>)[key];
  return typeof value === "string" ? value : "";
}

export const BirdSpecies: CollectionConfig = {
  slug: "bird-species",
  labels: {
    singular: "Espécie de ave",
    plural: "Espécies de aves",
  },
  admin: {
    group: "Observação de Aves",
    description:
      "Catálogo de espécies: 166 espécies do Pantanal com taxonomia, descrição e dicas de fotografia.",
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
  hooks: {
    afterChange: [autoTranslateCollectionAfterChange],
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
                  localized: true,
                  admin: {
                    width: "45%",
                  },
                },
                {
                  name: "scientificName",
                  type: "text",
                  label: "Nome científico",
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
                    description: "URL da espécie. Use letras minúsculas, números e hifens. Ex: arara-azul",
                  },
                },
              ],
            },
            {
              name: "description",
              type: "textarea",
              label: "Descrição curta",
              required: false,
              localized: true,
            },
            {
              type: "row",
              fields: [
                {
                  name: "taxonomicOrder",
                  type: "text",
                  label: "Ordem taxonômica",
                  required: false,
                  admin: {
                    width: "33%",
                    description: "Ex: Psittaciformes, Passeriformes",
                  },
                },
                {
                  name: "family",
                  type: "text",
                  label: "Família",
                  required: false,
                  admin: {
                    width: "33%",
                    description: "Ex: Psittacidae, Thraupidae",
                  },
                },
                {
                  name: "commonNameEN",
                  type: "text",
                  label: "Nome em inglês",
                  required: false,
                  admin: {
                    width: "34%",
                  },
                },
              ],
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
                  localized: true,
                  admin: {
                    width: "50%",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Mídia e metadados",
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
                    description: "Caminho sem extensão. Ex: /images/arara-azul — os formatos AVIF e WebP são carregados automaticamente.",
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
                  label: "Status de conservação",
                  required: false,
                  localized: true,
                  admin: {
                    width: "25%",
                    description:
                      "Status IUCN. Ex: 'Vulnerável (VU)', 'Pouco Preocupante (LC)'",
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
              label: "Exibir como espécie em destaque",
              defaultValue: false,
              admin: {
                description:
                  "Marque para exibir na seção de aves em destaque.",
              },
            },
          ],
        },
        {
          label: "Conteúdo detalhado",
          fields: [
            {
              name: "habitat",
              type: "textarea",
              label: "Habitat",
              required: false,
              localized: true,
            },
            {
              name: "overview",
              type: "textarea",
              label: "Visão geral",
              required: false,
              localized: true,
            },
            {
              name: "diet",
              type: "textarea",
              label: "Alimentação",
              required: false,
              localized: true,
            },
            {
              name: "behavior",
              type: "textarea",
              label: "Comportamento",
              required: false,
              localized: true,
            },
            {
              name: "bestTime",
              type: "textarea",
              label: "Melhor período de observação",
              required: false,
              localized: true,
            },
            {
              name: "photographyTips",
              type: "array",
              label: "Dicas de fotografia",
              required: false,
              admin: {
                initCollapsed: true,
                description:
                  "Dicas práticas para fotografar esta espécie no Pantanal.",
              },
              fields: [
                {
                  name: "tip",
                  type: "text",
                  label: "Dica",
                  required: true,
                  localized: true,
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
              label: "Espécies relacionadas",
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
