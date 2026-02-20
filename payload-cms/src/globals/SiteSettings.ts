import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/authenticated";
import { triggerAgentFaqReindexAfterSiteSettingsChange } from "../hooks/triggerAgentFaqReindex";
import { autoTranslateGlobalAfterChange } from "../hooks/autoTranslate";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Configurações do Site",
  admin: {
    group: "Configurações Globais",
    description:
      "Configurações globais: contato, CTA de reserva, FAQ, depoimentos, rodapé e SEO. Aplicadas em todo o site.",
    preview: () => `${frontendOrigin}/`,
  },
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  hooks: {
    afterChange: [triggerAgentFaqReindexAfterSiteSettingsChange, autoTranslateGlobalAfterChange],
  },
  versions: {
    max: 5,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Geral",
          fields: [
            { name: "brandName", type: "text", label: "Nome da Marca", admin: { width: "50%" } },
            { name: "contactEmail", type: "email", label: "Email de Contato", admin: { width: "50%" } },
            { name: "contactPhone", type: "text", label: "Telefone", admin: { width: "50%" } },
            { name: "contactAddress", type: "textarea", label: "Endereço", admin: { width: "100%" } },
          ],
        },
        {
          label: "CTA de Reserva",
          fields: [
            { name: "ctaHeading", type: "text", label: "Título do CTA", localized: true },
            { name: "ctaDescription", type: "textarea", label: "Descrição do CTA", localized: true },
            {
              name: "ctaBackgroundImage",
              type: "text",
              label: "Imagem de Fundo (path)",
              admin: { description: "Caminho da imagem, ex: /images/cta-bg" },
            },
          ],
        },
        {
          label: "FAQ",
          fields: [
            { name: "faqLabel", type: "text", label: "Label da Seção", defaultValue: "FAQ", localized: true, admin: { width: "30%" } },
            { name: "faqHeading", type: "text", label: "Título", localized: true, admin: { width: "70%" } },
            { name: "faqDescription", type: "textarea", label: "Descrição", localized: true },
            {
              name: "faqItems",
              type: "array",
              label: "Perguntas e Respostas",
              labels: { singular: "Pergunta", plural: "Perguntas" },
              admin: {
                initCollapsed: false,
                description: "Adicione perguntas frequentes. Arraste para reordenar.",
              },
              fields: [
                { name: "question", type: "text", label: "Pergunta", required: true, localized: true },
                { name: "answer", type: "textarea", label: "Resposta", required: true, localized: true },
              ],
            },
          ],
        },
        {
          label: "Depoimentos",
          fields: [
            { name: "testimonialsLabel", type: "text", label: "Label da Seção", defaultValue: "Depoimentos", localized: true, admin: { width: "30%" } },
            { name: "testimonialsHeading", type: "text", label: "Título", localized: true, admin: { width: "70%" } },
            { name: "testimonialsDescription", type: "textarea", label: "Descrição", localized: true },
            {
              name: "testimonialItems",
              type: "array",
              label: "Depoimentos",
              labels: { singular: "Depoimento", plural: "Depoimentos" },
              fields: [
                { name: "quote", type: "textarea", label: "Texto do Depoimento", required: true, localized: true },
                { name: "author", type: "text", label: "Autor", required: true, admin: { width: "50%" } },
                { name: "location", type: "text", label: "Localidade", localized: true, admin: { width: "50%" } },
                { name: "rating", type: "number", label: "Nota (1-5)", min: 1, max: 5, defaultValue: 5, admin: { width: "30%" } },
              ],
            },
          ],
        },
        {
          label: "Rodapé",
          fields: [
            {
              name: "footerPousadaLinks",
              type: "array",
              label: "Links Pousada",
              labels: { singular: "Link", plural: "Links" },
              fields: [
                { name: "label", type: "text", required: true, localized: true, admin: { width: "50%" } },
                { name: "url", type: "text", required: true, admin: { width: "50%" } },
              ],
            },
            {
              name: "footerExperienciasLinks",
              type: "array",
              label: "Links Experiências",
              labels: { singular: "Link", plural: "Links" },
              fields: [
                { name: "label", type: "text", required: true, localized: true, admin: { width: "50%" } },
                { name: "url", type: "text", required: true, admin: { width: "50%" } },
              ],
            },
            {
              name: "footerLegalLinks",
              type: "array",
              label: "Links Legais",
              labels: { singular: "Link", plural: "Links" },
              fields: [
                { name: "label", type: "text", required: true, localized: true, admin: { width: "50%" } },
                { name: "url", type: "text", required: true, admin: { width: "50%" } },
              ],
            },
            { name: "footerCopyright", type: "text", label: "Texto de Copyright", localized: true },
          ],
        },
        {
          label: "SEO Padrões Globais",
          description: "Valores padrão de SEO usados quando uma página não tem metadados próprios.",
          fields: [
            {
              name: "defaultMetaTitle",
              type: "text",
              label: "Título padrão (meta title)",
              localized: true,
              defaultValue: "Itaicy Pantanal Eco Lodge | Ecoturismo no Pantanal",
              admin: { description: "Usado como fallback quando uma página não tem metaTitle. Máx. 60 chars." },
            },
            {
              name: "defaultMetaDescription",
              type: "textarea",
              label: "Descrição padrão (meta description)",
              localized: true,
              defaultValue: "Descubra o Pantanal em sua forma mais autêntica. Hospedagem premium, pesca esportiva, observação de aves e experiências de ecoturismo no coração do Pantanal.",
              admin: { description: "Usado como fallback quando uma página não tem metaDescription. Ideal: 120-155 chars." },
            },
            {
              name: "defaultOgImage",
              type: "text",
              label: "Imagem Open Graph padrão",
              defaultValue: "/images/og-default.webp",
              admin: { description: "Imagem padrão para compartilhamento em redes sociais. Tamanho ideal: 1200x630px." },
            },
            {
              name: "siteUrl",
              type: "text",
              label: "URL do site (produção)",
              admin: { description: "URL base do site em produção. Ex: https://itaicypantanal.com.br. Usada para gerar canonical URLs e sitemap." },
            },
            {
              name: "googleSiteVerification",
              type: "text",
              label: "Google Site Verification",
              admin: { description: "Código de verificação do Google Search Console. Será injetado como meta tag." },
            },
          ],
        },
        {
          label: "GEO",
          description: "Perfis de autoridade, eventos sazonais e avaliações para E-E-A-T e AI search.",
          fields: [
            {
              name: "authors",
              type: "array",
              label: "Autores / Especialistas",
              labels: { singular: "Autor", plural: "Autores" },
              admin: {
                description: "Perfis dos autores e especialistas do site para sinais E-E-A-T.",
                initCollapsed: true,
              },
              fields: [
                { name: "name", type: "text", label: "Nome completo", required: true },
                { name: "jobTitle", type: "text", label: "Cargo / Especialidade", localized: true },
                {
                  name: "knowsAbout",
                  type: "array",
                  label: "Áreas de conhecimento",
                  labels: { singular: "Área", plural: "Áreas" },
                  fields: [{ name: "topic", type: "text", label: "Tópico", required: true }],
                },
                { name: "url", type: "text", label: "URL do perfil (LinkedIn, site)" },
                { name: "image", type: "text", label: "URL da foto do autor" },
              ],
            },
            {
              name: "seasonalEvents",
              type: "array",
              label: "Eventos Sazonais",
              labels: { singular: "Evento", plural: "Eventos" },
              admin: {
                description: "Eventos e temporadas para schema Event (AI search).",
                initCollapsed: true,
              },
              fields: [
                { name: "name", type: "text", label: "Nome do evento", required: true, localized: true },
                { name: "description", type: "textarea", label: "Descrição", localized: true },
                { name: "startDate", type: "text", label: "Início (MM-DD)", admin: { description: "Ex: 03-01 para 1 de Março" } },
                { name: "endDate", type: "text", label: "Fim (MM-DD)", admin: { description: "Ex: 10-31 para 31 de Outubro" } },
                { name: "image", type: "text", label: "Imagem (path)" },
              ],
            },
            {
              name: "aggregateRating",
              type: "group",
              label: "Avaliação Agregada",
              admin: {
                description: "Avaliação geral do lodge para schema AggregateRating.",
              },
              fields: [
                { name: "ratingValue", type: "number", label: "Nota média", admin: { description: "Ex: 4.8", width: "33%" } },
                { name: "reviewCount", type: "number", label: "Número de avaliações", admin: { width: "33%" } },
                { name: "bestRating", type: "number", label: "Nota máxima", defaultValue: 5, admin: { width: "33%" } },
              ],
            },
          ],
        },
      ],
    },
  ],
};
