import type { Field } from "payload";

export function faqFields(): Field[] {
  return [
    {
      name: "label",
      type: "text",
      label: "Rótulo (ex: PERGUNTAS FREQUENTES)",
      defaultValue: "PERGUNTAS FREQUENTES",
      localized: true,
      admin: { width: "50%" },
    },
    {
      name: "heading",
      type: "text",
      label: "Título Principal",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Descrição",
      localized: true,
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
          label: "ID único (ex: pesca-1)",
          required: true,
          admin: { width: "30%" },
        },
        {
          name: "number",
          type: "text",
          label: "Número (ex: 01)",
          required: true,
          admin: { width: "20%" },
        },
        {
          name: "question",
          type: "text",
          label: "Pergunta",
          required: true,
          localized: true,
        },
        {
          name: "answer",
          type: "textarea",
          label: "Resposta",
          required: true,
          localized: true,
        },
      ],
    },
  ];
}
