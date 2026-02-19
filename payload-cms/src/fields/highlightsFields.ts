import type { Field } from "payload";

export function highlightsFields(): Field[] {
  return [
    { name: "heading", type: "text", label: "Título", localized: true },
    {
      name: "items",
      type: "array",
      label: "Destaques",
      labels: { singular: "Destaque", plural: "Destaques" },
      fields: [
        {
          name: "iconName",
          type: "text",
          label: "Ícone (nome lucide-react)",
          admin: { width: "30%", description: "Ex: Fish, Star, Compass" },
        },
        {
          name: "title",
          type: "text",
          label: "Título",
          localized: true,
          admin: { width: "70%" },
        },
        { name: "description", type: "textarea", label: "Descrição", localized: true },
      ],
    },
  ];
}
