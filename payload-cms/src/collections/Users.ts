import type { CollectionConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "Usuário",
    plural: "Usuários",
  },
  admin: {
    group: "Administração",
    description: "Gerencie os acessos de quem pode editar o site no CMS.",
    useAsTitle: "email",
    defaultColumns: ["name", "email", "updatedAt"],
    listSearchableFields: ["name", "email"],
  },
  access: {
    read: isAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nome",
      admin: {
        description: "Nome exibido no painel administrativo.",
      },
    },
  ],
};
