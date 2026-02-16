import type { Field } from "payload";

export function manifestoFields(): Field[] {
  return [
    {
      name: "segments",
      type: "array",
      label: "Segmentos do Manifesto",
      labels: { singular: "Segmento", plural: "Segmentos" },
      admin: {
        description:
          "Cada segmento e um trecho de texto. Marque 'Destaque' para texto dourado.",
        initCollapsed: false,
      },
      fields: [
        { name: "text", type: "text", label: "Texto", required: true },
        {
          name: "isHighlight",
          type: "checkbox",
          label: "Destaque (texto dourado)",
          defaultValue: false,
        },
      ],
    },
  ];
}
