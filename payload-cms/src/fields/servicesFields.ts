import type { Field } from "payload";

export function servicesFields(): Field[] {
  return [
    {
      name: "label",
      type: "text",
      label: "Rótulo (ex: O SANTUÁRIO)",
      localized: true,
      admin: { width: "50%" },
    },
    { name: "heading", type: "text", label: "Título", localized: true },
    { name: "description", type: "textarea", label: "Descrição", localized: true },
    {
      name: "items",
      type: "array",
      label: "Cards de Serviço",
      labels: { singular: "Card", plural: "Cards" },
      fields: [
        {
          name: "title",
          type: "text",
          label: "Título",
          required: true,
          localized: true,
        },
        { name: "description", type: "textarea", label: "Descrição", localized: true },
        { name: "image", type: "text", label: "Imagem (path)" },
        { name: "href", type: "text", label: "Link (opcional)" },
      ],
    },
    { name: "buttonText", type: "text", label: "Texto do Botão (opcional)", localized: true },
    { name: "buttonHref", type: "text", label: "Link do Botão (opcional)" },
  ];
}
