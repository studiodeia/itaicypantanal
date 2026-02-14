import type { CollectionConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { seoFields } from "../fields/seo";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

function getDocProperty(doc: unknown, key: string): unknown {
  if (!doc || typeof doc !== "object") return undefined;
  return (doc as Record<string, unknown>)[key];
}

function getPrimaryCategorySlug(value: unknown): string {
  if (value && typeof value === "object" && "slug" in value) {
    const slug = (value as { slug?: unknown }).slug;
    if (typeof slug === "string" && slug.length > 0) {
      return slug;
    }
  }

  return "";
}

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  labels: {
    singular: "Artigo",
    plural: "Artigos",
  },
  admin: {
    group: "Blog",
    description:
      "Gerencie os artigos do blog com categorias, destaque e conteudo estruturado.",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "primaryCategory", "isFeatured", "updatedAt"],
    listSearchableFields: ["title", "slug", "author", "tag"],
    preview: ({ doc }) => {
      const slugValue = getDocProperty(doc, "slug");
      const slug = typeof slugValue === "string" ? slugValue : "";
      const categorySlug = getPrimaryCategorySlug(
        getDocProperty(doc, "primaryCategory"),
      );

      if (slug && categorySlug) {
        return `${frontendOrigin}/blog/${categorySlug}/${slug}`;
      }

      if (slug) {
        return `${frontendOrigin}/blog`;
      }

      return `${frontendOrigin}/blog`;
    },
  },
  defaultSort: "-updatedAt",
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Principal",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Titulo",
                  required: true,
                  admin: {
                    width: "70%",
                    description:
                      "Titulo principal do artigo. Aparece no card e na pagina.",
                  },
                },
                {
                  name: "slug",
                  type: "text",
                  label: "Slug",
                  required: true,
                  unique: true,
                  index: true,
                  admin: {
                    width: "30%",
                    description:
                      "URL amigavel do artigo (somente minusculas e hifens).",
                  },
                },
              ],
            },
            {
              name: "subtitle",
              type: "text",
              label: "Subtitulo",
              required: false,
            },
            {
              name: "description",
              type: "textarea",
              label: "Descricao",
              required: false,
            },
            {
              type: "row",
              fields: [
                {
                  name: "tag",
                  type: "text",
                  label: "Tag",
                  required: false,
                  admin: {
                    width: "30%",
                  },
                },
                {
                  name: "primaryCategory",
                  type: "relationship",
                  label: "Categoria principal",
                  relationTo: "blog-categories",
                  required: false,
                  admin: {
                    width: "35%",
                  },
                },
                {
                  name: "categories",
                  type: "relationship",
                  label: "Categorias relacionadas",
                  relationTo: "blog-categories",
                  hasMany: true,
                  required: false,
                  admin: {
                    width: "35%",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Midia e metadados",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "src",
                  type: "text",
                  label: "Origem / src",
                  required: false,
                  admin: {
                    width: "40%",
                  },
                },
                {
                  name: "heroImage",
                  type: "text",
                  label: "Imagem de capa",
                  required: false,
                  admin: {
                    width: "60%",
                    description:
                      "Caminho da imagem principal usada no hero do artigo.",
                  },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "author",
                  type: "text",
                  label: "Autor",
                  required: false,
                  admin: {
                    width: "40%",
                  },
                },
                {
                  name: "date",
                  type: "text",
                  label: "Data exibida",
                  required: false,
                  admin: {
                    width: "30%",
                  },
                },
                {
                  name: "readingTime",
                  type: "text",
                  label: "Tempo de leitura",
                  required: false,
                  admin: {
                    width: "30%",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Conteudo",
          fields: [
            {
              name: "contentBlocks",
              type: "blocks",
              label: "Blocos de Conteudo",
              labels: {
                singular: "Bloco",
                plural: "Blocos",
              },
              blocks: [
                {
                  slug: "paragraph",
                  labels: { singular: "Paragrafo", plural: "Paragrafos" },
                  fields: [
                    {
                      name: "text",
                      type: "textarea",
                      label: "Texto",
                      required: true,
                      admin: {
                        description:
                          "Use **texto** para negrito (compativel com markdown).",
                      },
                    },
                  ],
                },
                {
                  slug: "heading",
                  labels: { singular: "Titulo", plural: "Titulos" },
                  fields: [
                    {
                      name: "text",
                      type: "text",
                      label: "Texto do Titulo",
                      required: true,
                    },
                  ],
                },
                {
                  slug: "species",
                  labels: { singular: "Especie", plural: "Especies" },
                  fields: [
                    {
                      name: "name",
                      type: "text",
                      label: "Nome Popular",
                      required: true,
                      admin: { width: "50%" },
                    },
                    {
                      name: "scientificName",
                      type: "text",
                      label: "Nome Cientifico",
                      required: true,
                      admin: { width: "50%" },
                    },
                    {
                      name: "description",
                      type: "textarea",
                      label: "Descricao",
                      required: true,
                    },
                    {
                      name: "image",
                      type: "text",
                      label: "Imagem (path)",
                      admin: {
                        description:
                          "Caminho da imagem, ex: /images/bird-species-1",
                      },
                    },
                  ],
                },
                {
                  slug: "orderedList",
                  labels: {
                    singular: "Lista Ordenada",
                    plural: "Listas Ordenadas",
                  },
                  fields: [
                    {
                      name: "items",
                      type: "array",
                      label: "Itens",
                      labels: { singular: "Item", plural: "Itens" },
                      fields: [
                        {
                          name: "bold",
                          type: "text",
                          label: "Texto em Negrito",
                          required: true,
                          admin: { width: "40%" },
                        },
                        {
                          name: "text",
                          type: "text",
                          label: "Texto do Item",
                          required: true,
                          admin: { width: "60%" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        seoFields({
          titleField: "title",
          descriptionField: "description",
          imageField: "heroImage",
          slugPrefix: "/blog",
        }),
        {
          label: "Relacionamentos e destaque",
          fields: [
            {
              name: "relatedPosts",
              type: "relationship",
              label: "Artigos relacionados",
              relationTo: "blog-posts",
              hasMany: true,
              required: false,
            },
            {
              type: "row",
              fields: [
                {
                  name: "isFeatured",
                  type: "checkbox",
                  label: "Exibir como destaque",
                  defaultValue: false,
                  admin: {
                    width: "50%",
                    description:
                      "Marque para exibir como artigo principal na pagina do blog.",
                  },
                },
                {
                  name: "isRecent",
                  type: "checkbox",
                  label: "Exibir em recentes",
                  defaultValue: false,
                  admin: {
                    width: "50%",
                    description:
                      "Marque para exibir na secao 'Mais Recentes' do blog.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
