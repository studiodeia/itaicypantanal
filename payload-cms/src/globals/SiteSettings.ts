import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Configuracoes do Site",
  admin: {
    group: "Conteudo do Site",
    description:
      "Configuracoes globais compartilhadas em todo o site: contato, rodape, FAQ, depoimentos e secoes da home.",
    preview: () => `${frontendOrigin}/`,
  },
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Geral",
          fields: [
            {
              name: "brandName",
              type: "text",
              label: "Nome da Marca",
              admin: { width: "50%" },
            },
            {
              name: "contactEmail",
              type: "email",
              label: "Email de Contato",
              admin: { width: "50%" },
            },
            {
              name: "contactPhone",
              type: "text",
              label: "Telefone",
              admin: { width: "50%" },
            },
            {
              name: "contactAddress",
              type: "textarea",
              label: "Endereco",
              admin: { width: "100%" },
            },
          ],
        },
        {
          label: "CTA de Reserva",
          fields: [
            {
              name: "ctaHeading",
              type: "text",
              label: "Titulo do CTA",
            },
            {
              name: "ctaDescription",
              type: "textarea",
              label: "Descricao do CTA",
            },
            {
              name: "ctaBackgroundImage",
              type: "text",
              label: "Imagem de Fundo (path)",
              admin: {
                description: "Caminho da imagem, ex: /images/cta-bg",
              },
            },
          ],
        },
        {
          label: "FAQ",
          fields: [
            {
              name: "faqLabel",
              type: "text",
              label: "Label da Secao",
              defaultValue: "FAQ",
              admin: { width: "30%" },
            },
            {
              name: "faqHeading",
              type: "text",
              label: "Titulo",
              admin: { width: "70%" },
            },
            {
              name: "faqDescription",
              type: "textarea",
              label: "Descricao",
            },
            {
              name: "faqItems",
              type: "array",
              label: "Perguntas e Respostas",
              labels: {
                singular: "Pergunta",
                plural: "Perguntas",
              },
              admin: {
                initCollapsed: false,
                description:
                  "Adicione perguntas frequentes. Arraste para reordenar.",
              },
              fields: [
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
          ],
        },
        {
          label: "Depoimentos",
          fields: [
            {
              name: "testimonialsLabel",
              type: "text",
              label: "Label da Secao",
              defaultValue: "Depoimentos",
              admin: { width: "30%" },
            },
            {
              name: "testimonialsHeading",
              type: "text",
              label: "Titulo",
              admin: { width: "70%" },
            },
            {
              name: "testimonialsDescription",
              type: "textarea",
              label: "Descricao",
            },
            {
              name: "testimonialItems",
              type: "array",
              label: "Depoimentos",
              labels: {
                singular: "Depoimento",
                plural: "Depoimentos",
              },
              fields: [
                {
                  name: "quote",
                  type: "textarea",
                  label: "Texto do Depoimento",
                  required: true,
                },
                {
                  name: "author",
                  type: "text",
                  label: "Autor",
                  required: true,
                  admin: { width: "50%" },
                },
                {
                  name: "location",
                  type: "text",
                  label: "Localidade",
                  admin: { width: "50%" },
                },
                {
                  name: "rating",
                  type: "number",
                  label: "Nota (1-5)",
                  min: 1,
                  max: 5,
                  defaultValue: 5,
                  admin: { width: "30%" },
                },
              ],
            },
          ],
        },
        {
          label: "Rodape",
          fields: [
            {
              name: "footerPousadaLinks",
              type: "array",
              label: "Links Pousada",
              labels: { singular: "Link", plural: "Links" },
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  admin: { width: "50%" },
                },
                {
                  name: "url",
                  type: "text",
                  required: true,
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "footerExperienciasLinks",
              type: "array",
              label: "Links Experiencias",
              labels: { singular: "Link", plural: "Links" },
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  admin: { width: "50%" },
                },
                {
                  name: "url",
                  type: "text",
                  required: true,
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "footerLegalLinks",
              type: "array",
              label: "Links Legais",
              labels: { singular: "Link", plural: "Links" },
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  admin: { width: "50%" },
                },
                {
                  name: "url",
                  type: "text",
                  required: true,
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "footerCopyright",
              type: "text",
              label: "Texto de Copyright",
            },
          ],
        },
        {
          label: "Home Hero",
          fields: [
            {
              name: "homeHeroHeading",
              type: "text",
              label: "Titulo Principal",
            },
            {
              name: "homeHeroSubtitle",
              type: "text",
              label: "Subtitulo",
            },
            {
              name: "homeHeroBookingHeading",
              type: "text",
              label: "Titulo do Card de Reserva",
            },
            {
              name: "homeHeroBookingDescription",
              type: "text",
              label: "Descricao do Card de Reserva",
            },
          ],
        },
        {
          label: "Home Manifesto",
          fields: [
            {
              name: "homeManifestoLabel",
              type: "text",
              label: "Label",
              admin: { width: "30%" },
            },
            {
              name: "homeManifestoDetailsButtonLabel",
              type: "text",
              label: "Texto do Botao",
              admin: { width: "70%" },
            },
            {
              name: "homeManifestoSegments",
              type: "array",
              label: "Segmentos do Manifesto",
              labels: { singular: "Segmento", plural: "Segmentos" },
              fields: [
                {
                  name: "type",
                  type: "select",
                  label: "Tipo",
                  options: [
                    { label: "Texto", value: "text" },
                    { label: "Destaque", value: "highlight" },
                    { label: "Separador", value: "divider" },
                  ],
                  required: true,
                  admin: { width: "30%" },
                },
                {
                  name: "content",
                  type: "text",
                  label: "Conteudo",
                  admin: {
                    width: "70%",
                    condition: (_data: Record<string, unknown>, siblingData: Record<string, unknown>) =>
                      siblingData?.type !== "divider",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "SEO Padroes Globais",
          description:
            "Valores padrao de SEO usados quando uma pagina nao tem metadados proprios.",
          fields: [
            {
              name: "defaultMetaTitle",
              type: "text",
              label: "Titulo padrao (meta title)",
              defaultValue: "Itaicy Pantanal Eco Lodge | Ecoturismo no Pantanal",
              admin: {
                description:
                  "Usado como fallback quando uma pagina nao tem metaTitle. Max 60 chars.",
              },
            },
            {
              name: "defaultMetaDescription",
              type: "textarea",
              label: "Descricao padrao (meta description)",
              defaultValue:
                "Descubra o Pantanal em sua forma mais autentica. Hospedagem premium, pesca esportiva, observacao de aves e experiencias de ecoturismo no coracao do Pantanal.",
              admin: {
                description:
                  "Usado como fallback quando uma pagina nao tem metaDescription. Ideal: 120-155 chars.",
              },
            },
            {
              name: "defaultOgImage",
              type: "text",
              label: "Imagem Open Graph padrao",
              defaultValue: "/images/og-default.webp",
              admin: {
                description:
                  "Imagem padrao para compartilhamento em redes sociais. Tamanho ideal: 1200x630px.",
              },
            },
            {
              name: "siteUrl",
              type: "text",
              label: "URL do site (producao)",
              admin: {
                description:
                  "URL base do site em producao. Ex: https://itaicypantanal.com.br. Usada para gerar canonical URLs e sitemap.",
              },
            },
            {
              name: "googleSiteVerification",
              type: "text",
              label: "Google Site Verification",
              admin: {
                description:
                  "Codigo de verificacao do Google Search Console. Sera injetado como meta tag.",
              },
            },
          ],
        },
        {
          label: "Conteudo das Paginas",
          description:
            "Conteudo editavel de todas as paginas do site. Cada chave corresponde a uma rota.",
          fields: [
            {
              name: "pageContent",
              type: "json",
              label: "Conteudo por Pagina (JSON)",
              admin: {
                description:
                  "JSON com chaves por rota (ex: '/', '/acomodacoes'). Cada rota contem os textos, imagens e dados de todas as secoes da pagina.",
              },
            },
          ],
        },
        {
          label: "JSON Legado",
          description:
            "Campo JSON legado para compatibilidade. Sera removido apos migracao completa.",
          fields: [
            {
              name: "sharedSections",
              type: "json",
              label: "Secoes Compartilhadas (Legado)",
              admin: {
                description:
                  "ATENCAO: Este campo sera descontinuado. Edite o conteudo nas abas acima.",
              },
            },
          ],
        },
      ],
    },
  ],
};
