import type { Field } from "payload";

export function heroFields(options?: { hasVideo?: boolean }): Field[] {
  const base: Field[] = [
    {
      name: "label",
      type: "text",
      label: "Rotulo (ex: PESCA ESPORTIVA)",
      admin: { width: "50%" },
    },
    {
      name: "heading",
      type: "text",
      label: "Titulo Principal",
      required: true,
    },
    { name: "subtitle", type: "textarea", label: "Subtitulo" },
    { name: "description", type: "textarea", label: "Descricao" },
    {
      name: "scrollHint",
      type: "text",
      label: "Texto de Scroll",
      defaultValue: "Deslize para baixo",
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
      { name: "videoMp4", type: "text", label: "Video MP4 (path)" },
      { name: "videoWebm", type: "text", label: "Video WebM (path)" },
      { name: "videoMp4Low", type: "text", label: "Video MP4 Low (path)" },
      {
        name: "videoWebmLow",
        type: "text",
        label: "Video WebM Low (path)",
      },
      { name: "videoPoster", type: "text", label: "Video Poster (path)" },
    );
  }

  return base;
}
