import type { Field } from "payload";

export function sobreNosFields(): Field[] {
  return [
    {
      name: "label",
      type: "text",
      label: "Rótulo (ex: NOSSA FILOSOFIA)",
      localized: true,
      admin: { width: "50%" },
    },
    { name: "heading", type: "text", label: "Título", localized: true },
    {
      name: "body",
      type: "array",
      label: "Parágrafos",
      labels: { singular: "Parágrafo", plural: "Parágrafos" },
      fields: [
        { name: "text", type: "textarea", label: "Texto", required: true, localized: true },
      ],
    },
    {
      name: "image",
      type: "text",
      label: "Imagem (path)",
      admin: { description: "Ex: /images/pesca-about-1" },
    },
    {
      name: "features",
      type: "array",
      label: "Pilares / Diferenciais",
      labels: { singular: "Pilar", plural: "Pilares" },
      fields: [
        {
          name: "number",
          type: "text",
          label: "Número",
          localized: true,
          admin: { width: "20%" },
        },
        {
          name: "title",
          type: "text",
          label: "Título",
          localized: true,
          admin: { width: "80%" },
        },
        { name: "description", type: "textarea", label: "Descrição", localized: true },
      ],
    },
  ];
}
