import type { Field } from "payload";

export function heroFields(options?: { hasVideo?: boolean }): Field[] {
  const base: Field[] = [
    {
      name: "label",
      type: "text",
      label: "Rótulo (ex: PESCA ESPORTIVA)",
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
    { name: "subtitle", type: "textarea", label: "Subtítulo", localized: true },
    { name: "description", type: "textarea", label: "Descrição", localized: true },
    {
      name: "scrollHint",
      type: "text",
      label: "Texto de Scroll",
      defaultValue: "Deslize para baixo",
      localized: true,
      admin: { width: "50%" },
    },
    {
      name: "backgroundImage",
      type: "text",
      label: "Imagem de Fundo (path)",
      admin: { description: "Ex: /images/pesca-hero-bg.webp" },
    },
  ];

  if (options?.hasVideo) {
    base.push(
      { name: "videoMp4", type: "text", label: "Vídeo MP4 (path)" },
      { name: "videoWebm", type: "text", label: "Vídeo WebM (path)" },
      { name: "videoMp4Low", type: "text", label: "Vídeo MP4 Low (path)" },
      {
        name: "videoWebmLow",
        type: "text",
        label: "Vídeo WebM Low (path)",
      },
      { name: "videoPoster", type: "text", label: "Vídeo Poster (path)" },
    );
  }

  return base;
}
