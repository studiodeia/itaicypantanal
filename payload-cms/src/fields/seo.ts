import type { Tab } from "payload";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

/**
 * Reusable SEO fields tab for any Payload collection.
 *
 * Adds: metaTitle, metaDescription, ogImage, canonicalUrl, noIndex.
 *
 * Each field has admin.description explaining auto-fill behavior so editors
 * know they only need to override when the default isn't ideal.
 */
export function seoFields(options?: {
  /** Field name that provides the default title (e.g. "title", "commonName") */
  titleField?: string;
  /** Field name that provides the default description */
  descriptionField?: string;
  /** Field name that provides the default OG image */
  imageField?: string;
  /** Prefix for building the canonical URL from slug */
  slugPrefix?: string;
}): Tab {
  const {
    titleField = "title",
    descriptionField = "description",
    imageField = "heroImage",
    slugPrefix = "",
  } = options ?? {};

  return {
    label: "SEO",
    fields: [
      {
        name: "metaTitle",
        type: "text",
        label: "Titulo SEO (meta title)",
        admin: {
          description: `Deixe vazio para usar automaticamente: "{${titleField}} | Itaicy Pantanal Eco Lodge". Maximo recomendado: 60 caracteres.`,
        },
      },
      {
        name: "metaDescription",
        type: "textarea",
        label: "Descricao SEO (meta description)",
        admin: {
          description: `Deixe vazio para usar automaticamente os primeiros 155 caracteres do campo "${descriptionField}". Ideal: 120-155 caracteres.`,
        },
      },
      {
        type: "row",
        fields: [
          {
            name: "ogImage",
            type: "text",
            label: "Imagem Open Graph",
            admin: {
              width: "70%",
              description: `Deixe vazio para usar automaticamente o campo "${imageField}". Tamanho ideal: 1200x630px.`,
            },
          },
          {
            name: "noIndex",
            type: "checkbox",
            label: "Nao indexar (noindex)",
            defaultValue: false,
            admin: {
              width: "30%",
              description:
                "Marque para impedir que esta pagina apareca nos resultados de busca.",
            },
          },
        ],
      },
      {
        name: "canonicalUrl",
        type: "text",
        label: "URL canonica",
        admin: {
          description: `Deixe vazio para usar automaticamente: "${frontendOrigin}${slugPrefix}/{slug}". Preencha apenas se a URL canonica for diferente.`,
        },
      },
    ],
  };
}
