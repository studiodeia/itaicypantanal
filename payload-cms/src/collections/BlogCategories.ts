import type { CollectionConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";

export const BlogCategories: CollectionConfig = {
  slug: "blog-categories",
  labels: {
    singular: "Categoria do Blog",
    plural: "Categorias do Blog",
  },
  admin: {
    group: "Blog",
    description: "Classifique os artigos para melhorar navegacao, filtros e SEO.",
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "updatedAt"],
    listSearchableFields: ["name", "slug"],
  },
  defaultSort: "name",
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nome da categoria",
      admin: {
        description: "Ex.: Aventura, Sustentabilidade, Gastronomia.",
      },
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      admin: {
        description: "URL amigavel da categoria. Use letras minusculas e hifens.",
      },
      required: true,
      unique: true,
      index: true,
    },
  ],
};
