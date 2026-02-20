import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";

import { ensureOwnerUser } from "./auth/ensure-owner-user";
import { migrations } from "./migrations";
import { BirdCategories } from "./collections/BirdCategories";
import { BirdSpecies } from "./collections/BirdSpecies";
import { BlogCategories } from "./collections/BlogCategories";
import { BlogPosts } from "./collections/BlogPosts";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Users } from "./collections/Users";
import { AcomodacoesContent } from "./globals/AcomodacoesContent";
import { AgentConfig } from "./globals/AgentConfig";
import { BirdwatchingContent } from "./globals/BirdwatchingContent";
import { ContatoContent } from "./globals/ContatoContent";
import { CulinariaContent } from "./globals/CulinariaContent";
import { EcoturismoContent } from "./globals/EcoturismoContent";
import { HomeContent } from "./globals/HomeContent";
import { NossoImpactoContent } from "./globals/NossoImpactoContent";
import { NotFoundContent } from "./globals/NotFoundContent";
import { PescaContent } from "./globals/PescaContent";
import { PrivacidadeContent } from "./globals/PrivacidadeContent";
import { SiteSettings } from "./globals/SiteSettings";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";
const payloadPort = Number(process.env.PAYLOAD_PORT || 3001);
const payloadPublicServerUrl =
  process.env.PAYLOAD_PUBLIC_SERVER_URL || `http://127.0.0.1:${payloadPort}`;
const databaseUrl = process.env.DATABASE_URL || "file:./payload.db";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isPostgres =
  databaseUrl.startsWith("postgres://") || databaseUrl.startsWith("postgresql://");

const db = isPostgres
  ? postgresAdapter({
      pool: {
        connectionString: databaseUrl,
        ssl: { rejectUnauthorized: false },
      },
      push: process.env.NODE_ENV !== "production",
      schemaName: "cms",
      prodMigrations: migrations,
    })
  : sqliteAdapter({
        client: {
          url: databaseUrl,
        },
      });

const s3Enabled = Boolean(process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID);

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "change-this-secret",
  serverURL: payloadPublicServerUrl,
  sharp,
  db,
  plugins: [
    ...(s3Enabled
      ? [
          s3Storage({
            collections: { media: true },
            bucket: process.env.S3_BUCKET!,
            config: {
              endpoint: process.env.S3_ENDPOINT,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID!,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
              },
              region: process.env.S3_REGION || "us-east-1",
              forcePathStyle: true,
            },
          }),
        ]
      : []),
    seoPlugin({
      collections: ["blog-posts", "bird-species"],
      globals: [
        "home-content",
        "acomodacoes-content",
        "culinaria-content",
        "pesca-content",
        "ecoturismo-content",
        "birdwatching-content",
        "contato-content",
        "nosso-impacto-content",
        "privacidade-content",
        "not-found-content",
      ],
      uploadsCollection: "media",
      tabbedUI: true,
      generateTitle: ({ doc, globalConfig, collectionConfig }) => {
        const d = doc as Record<string, unknown>;
        const raw = (d.title || d.commonName || d.heading || "") as unknown;
        const title = typeof raw === "string" ? raw : "";
        return title ? `${title} | Itaicy Pantanal Eco Lodge` : "Itaicy Pantanal Eco Lodge";
      },
      generateDescription: ({ doc }) => {
        const d = doc as Record<string, unknown>;
        const raw = (d.description || d.subtitle || "") as unknown;
        const desc = typeof raw === "string" ? raw : "";
        return desc.slice(0, 155);
      },
      generateURL: ({ doc, globalConfig, collectionConfig }) => {
        const siteUrl = process.env.SITE_URL || "https://itaicypantanal.com.br";
        const d = doc as Record<string, unknown>;
        const globalSlug = globalConfig?.slug;
        const collectionSlug = collectionConfig?.slug;
        const slugMap: Record<string, string> = {
          "home-content": "/",
          "acomodacoes-content": "/acomodacoes",
          "culinaria-content": "/culinaria",
          "pesca-content": "/pesca",
          "ecoturismo-content": "/ecoturismo",
          "birdwatching-content": "/observacao-de-aves",
          "contato-content": "/contato",
          "nosso-impacto-content": "/nosso-impacto",
          "privacidade-content": "/politica-de-privacidade",
          "not-found-content": "/404",
        };
        if (globalSlug && slugMap[globalSlug]) return `${siteUrl}${slugMap[globalSlug]}`;
        if (collectionSlug === "blog-posts") {
          const slug = typeof d.slug === "string" && d.slug ? d.slug : null;
          return slug ? `${siteUrl}/blog/${slug}` : `${siteUrl}/blog`;
        }
        if (collectionSlug === "bird-species") {
          const slug = typeof d.slug === "string" && d.slug ? d.slug : null;
          return slug ? `${siteUrl}/observacao-de-aves/catalogo/${slug}` : `${siteUrl}/observacao-de-aves/catalogo`;
        }
        return siteUrl;
      },
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: "noIndex",
          type: "checkbox" as const,
          label: "Nao indexar (noindex)",
          defaultValue: false,
          admin: {
            description: "Marque para impedir que esta pagina apareca nos resultados de busca.",
          },
        },
      ],
    }),
  ],
  localization: {
    locales: [
      { label: "Português", code: "pt" },
      { label: "English",   code: "en" },
      { label: "Español",   code: "es" },
    ],
    defaultLocale: "pt",
    fallback: true,
  },
  collections: [
    Pages,
    Media,
    BlogPosts,
    BlogCategories,
    BirdSpecies,
    BirdCategories,
    Users,
  ],
  globals: [
    AgentConfig,
    SiteSettings,
    HomeContent,
    AcomodacoesContent,
    CulinariaContent,
    PescaContent,
    EcoturismoContent,
    BirdwatchingContent,
    ContatoContent,
    NossoImpactoContent,
    PrivacidadeContent,
    NotFoundContent,
  ],
  cors: [
    frontendOrigin,
    payloadPublicServerUrl,
    `http://localhost:${payloadPort}`,
    "https://cms-itaicypantanal.vercel.app",
    "https://cms.itaicypantanal.com.br",
  ].filter(Boolean),
  csrf: [
    frontendOrigin,
    payloadPublicServerUrl,
    `http://localhost:${payloadPort}`,
    "https://cms-itaicypantanal.vercel.app",
    "https://cms.itaicypantanal.com.br",
  ].filter(Boolean),
  onInit: async (payload) => {
    const ownerEmail = process.env.PAYLOAD_OWNER_EMAIL;
    const ownerPassword = process.env.PAYLOAD_OWNER_PASSWORD;
    const ownerName = process.env.PAYLOAD_OWNER_NAME;

    await ensureOwnerUser({
      payload,
      email: ownerEmail,
      password: ownerPassword,
      name: ownerName,
    });

    payload.logger.info(`Payload admin: ${payload.getAdminURL()}`);
  },
  admin: {
    user: Users.slug,
    autoRefresh: true,
    dateFormat: "dd/MM/yyyy HH:mm",
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
      url: ({ globalConfig }) => {
        const slugToPath: Record<string, string> = {
          "home-content": "/",
          "acomodacoes-content": "/acomodacoes",
          "culinaria-content": "/culinaria",
          "pesca-content": "/pesca",
          "ecoturismo-content": "/ecoturismo",
          "birdwatching-content": "/observacao-de-aves",
          "contato-content": "/contato",
          "nosso-impacto-content": "/nosso-impacto",
          "privacidade-content": "/politica-de-privacidade",
          "not-found-content": "/404-preview",
          "site-settings": "/",
        };
        const slug = globalConfig?.slug ?? "";
        const pagePath = slugToPath[slug] ?? "/";
        return `${frontendOrigin}${pagePath}`;
      },
      globals: [
        "home-content",
        "acomodacoes-content",
        "culinaria-content",
        "pesca-content",
        "ecoturismo-content",
        "birdwatching-content",
        "contato-content",
        "nosso-impacto-content",
        "privacidade-content",
        "not-found-content",
        "site-settings",
      ],
    },
    meta: {
      titleSuffix: " - Itaicy CMS",
      description:
        "Sistema de gestao de conteudo do Itaicy Pantanal Eco Lodge",
      icons: [
        {
          rel: "icon",
          type: "image/png",
          url: "/favicon.ico",
        },
      ],
    },
    components: {
      graphics: {
        Logo: "/components/admin/Logo",
        Icon: "/components/admin/Icon",
      },
      beforeDashboard: ["/components/admin/WelcomeBanner"],
    },
    importMap: {
      baseDir: dirname,
      importMapFile: path.resolve(dirname, "app/(payload)/admin/importMap.ts"),
    },
  },
});