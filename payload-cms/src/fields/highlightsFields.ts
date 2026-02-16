import type { Field } from "payload";

export function highlightsFields(): Field[] {
  return [
    { name: "heading", type: "text", label: "Titulo" },
    {
      name: "items",
      type: "array",
      label: "Destaques",
      labels: { singular: "Destaque", plural: "Destaques" },
      fields: [
        {
          name: "iconName",
          type: "text",
          label: "Icone (nome lucide-react)",
          admin: { width: "30%", description: "Ex: Fish, Star, Compass" },
        },
        {
          name: "title",
          type: "text",
          label: "Titulo",
          admin: { width: "70%" },
        },
        { name: "description", type: "textarea", label: "Descricao" },
      ],
    },
  ];
}
