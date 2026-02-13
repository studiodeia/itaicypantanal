import type { CollectionConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Midia",
    plural: "Biblioteca de Midia",
  },
  admin: {
    group: "Biblioteca",
    description: "Central de imagens e arquivos visuais usados no site.",
    defaultColumns: ["alt", "filename", "mimeType", "updatedAt"],
  },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Texto alternativo (acessibilidade)",
      admin: {
        description:
          "Descreva a imagem para leitores de tela e para melhorar SEO.",
      },
      required: false,
    },
  ],
};
