import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { buildConfig } from "payload";

import { ensureOwnerUser } from "./auth/ensure-owner-user";
import { BirdCategories } from "./collections/BirdCategories";
import { BirdSpecies } from "./collections/BirdSpecies";
import { BlogCategories } from "./collections/BlogCategories";
import { BlogPosts } from "./collections/BlogPosts";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Users } from "./collections/Users";
import { SiteSettings } from "./globals/SiteSettings";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:5000";
const payloadPort = Number(process.env.PAYLOAD_PORT || 3001);
const payloadPublicServerUrl =
  process.env.PAYLOAD_PUBLIC_SERVER_URL || `http://127.0.0.1:${payloadPort}`;
const databaseUrl = process.env.DATABASE_URL || "file:./payload.db";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const db =
  databaseUrl.startsWith("postgres://") || databaseUrl.startsWith("postgresql://")
    ? postgresAdapter({
        pool: {
          connectionString: databaseUrl,
        },
      })
    : sqliteAdapter({
        client: {
          url: databaseUrl,
        },
      });

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "change-this-secret",
  serverURL: payloadPublicServerUrl,
  db,
  collections: [
    Pages,
    Media,
    BlogPosts,
    BlogCategories,
    BirdSpecies,
    BirdCategories,
    Users,
  ],
  globals: [SiteSettings],
  cors: [frontendOrigin, payloadPublicServerUrl],
  csrf: [frontendOrigin, payloadPublicServerUrl],
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
