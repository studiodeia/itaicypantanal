import type { Field } from "payload";

export function servicesFields(): Field[] {
  return [
    {
      name: "label",
      type: "text",
      label: "Rotulo (ex: O SANTUARIO)",
      admin: { width: "50%" },
    },
    { name: "heading", type: "text", label: "Titulo" },
    { name: "description", type: "textarea", label: "Descricao" },
    {
      name: "items",
      type: "array",
      label: "Cards de Servico",
      labels: { singular: "Card", plural: "Cards" },
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titulo",
          required: true,
        },
        { name: "description", type: "textarea", label: "Descricao" },
        { name: "image", type: "text", label: "Imagem (path)" },
        { name: "href", type: "text", label: "Link (opcional)" },
      ],
    },
    { name: "buttonText", type: "text", label: "Texto do Botao (opcional)" },
    { name: "buttonHref", type: "text", label: "Link do Botao (opcional)" },
  ];
}
