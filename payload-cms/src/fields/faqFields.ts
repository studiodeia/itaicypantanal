import type { Field } from "payload";

export function faqFields(): Field[] {
  return [
    {
      name: "label",
      type: "text",
      label: "Rotulo (ex: PERGUNTAS FREQUENTES)",
      defaultValue: "PERGUNTAS FREQUENTES",
      admin: { width: "50%" },
    },
    {
      name: "heading",
      type: "text",
      label: "Titulo Principal",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Descricao",
    },
    {
      name: "items",
      type: "array",
      label: "Perguntas",
      labels: { singular: "Pergunta", plural: "Perguntas" },
      fields: [
        {
          name: "id",
          type: "text",
          label: "ID unico (ex: pesca-1)",
          required: true,
          admin: { width: "30%" },
        },
        {
          name: "number",
          type: "text",
          label: "Numero (ex: 01)",
          required: true,
          admin: { width: "20%" },
        },
        {
          name: "question",
          type: "text",
          label: "Pergunta",
          required: true,
        },
        {
          name: "answer",
          type: "textarea",
          label: "Resposta",
          required: true,
        },
      ],
    },
  ];
}
