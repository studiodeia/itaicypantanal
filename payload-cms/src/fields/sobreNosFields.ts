import type { Field } from "payload";

export function sobreNosFields(): Field[] {
  return [
    {
      name: "label",
      type: "text",
      label: "Rotulo (ex: NOSSA FILOSOFIA)",
      admin: { width: "50%" },
    },
    { name: "heading", type: "text", label: "Titulo" },
    {
      name: "body",
      type: "array",
      label: "Paragrafos",
      labels: { singular: "Paragrafo", plural: "Paragrafos" },
      fields: [
        { name: "text", type: "textarea", label: "Texto", required: true },
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
          label: "Numero",
          admin: { width: "20%" },
        },
        {
          name: "title",
          type: "text",
          label: "Titulo",
          admin: { width: "80%" },
        },
        { name: "description", type: "textarea", label: "Descricao" },
      ],
    },
  ];
}
