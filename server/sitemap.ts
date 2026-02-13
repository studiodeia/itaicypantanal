import type { Request } from "express";

import type { CmsContent } from "./cms-content";
import { getCmsContent } from "./cms-content";

const staticRoutes = [
  "/",
  "/acomodacoes",
  "/culinaria",
  "/pesca",
  "/observacao-de-aves",
  "/observacao-de-aves/catalogo",
  "/ecoturismo",
  "/blog",
  "/contato",
  "/nosso-impacto",
  "/politica-de-privacidade",
];

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getBlogArticlePath(
  article: CmsContent["blog"]["posts"][number],
): string {
  const primaryCategory =
    typeof article.primaryCategory === "string" ? article.primaryCategory : "";
  const categories = Array.isArray(article.categories)
    ? article.categories.filter((item): item is string => typeof item === "string")
    : [];
  const categoryName = primaryCategory || categories[0] || "geral";
  const categorySlug = slugify(categoryName);
  return `/blog/${categorySlug}/${article.slug}`;
}

function getBaseSiteUrl(req: Request): string {
  const envBase = process.env.SITE_URL?.trim();
  if (envBase) {
    return envBase.replace(/\/+$/, "");
  }

  const host = req.get("host") || "127.0.0.1:5000";
  const protocol = req.protocol || "http";
  return `${protocol}://${host}`.replace(/\/+$/, "");
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toAbsoluteUrl(baseUrl: string, path: string): string {
  if (!path.startsWith("/")) {
    return `${baseUrl}/${path}`;
  }
  return `${baseUrl}${path}`;
}

function buildAllPaths(content: CmsContent): string[] {
  const seedRoutes = Array.isArray(content.pages?.routes)
    ? content.pages.routes.filter(
        (route): route is string =>
          typeof route === "string" && route.startsWith("/") && !route.includes(":"),
      )
    : [];
  const paths = new Set<string>([...staticRoutes, ...seedRoutes]);

  for (const post of content.blog.posts) {
    paths.add(getBlogArticlePath(post));
  }

  for (const bird of content.birdwatching.species) {
    paths.add(`/observacao-de-aves/catalogo/${bird.slug}`);
  }

  return Array.from(paths);
}

export async function buildSitemapXml(req: Request): Promise<string> {
  const { content } = await getCmsContent();
  const baseUrl = getBaseSiteUrl(req);
  const now = new Date().toISOString();

  const urls = buildAllPaths(content)
    .map((path) => toAbsoluteUrl(baseUrl, path))
    .sort();

  const entries = urls
    .map(
      (url) =>
        `<url><loc>${escapeXml(url)}</loc><lastmod>${now}</lastmod></url>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;
}

export function buildRobotsTxt(req: Request): string {
  const baseUrl = getBaseSiteUrl(req);
  return `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`;
}
