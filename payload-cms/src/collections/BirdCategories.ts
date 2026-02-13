import type { CollectionConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";

export const BirdCategories: CollectionConfig = {
  slug: "bird-categories",
  labels: {
    singular: "Categoria de Aves",
    plural: "Categorias de Aves",
  },
  admin: {
    group: "Birdwatching",
    description: "Organize as especies por grupos para facilitar busca e filtragem.",
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
        description: "Ex.: Rapinantes, Aves aquaticas, Psitacideos.",
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
