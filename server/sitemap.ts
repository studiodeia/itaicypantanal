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
  "/regiao",
  "/politica-de-privacidade",
];

// Priority + changefreq per route pattern (for sitemap.xml)
const routePriority: Record<string, { priority: string; changefreq: string }> = {
  "/": { priority: "1.0", changefreq: "weekly" },
  "/acomodacoes": { priority: "0.9", changefreq: "monthly" },
  "/pesca": { priority: "0.9", changefreq: "monthly" },
  "/observacao-de-aves": { priority: "0.9", changefreq: "monthly" },
  "/ecoturismo": { priority: "0.9", changefreq: "monthly" },
  "/culinaria": { priority: "0.8", changefreq: "monthly" },
  "/contato": { priority: "0.8", changefreq: "monthly" },
  "/blog": { priority: "0.8", changefreq: "weekly" },
  "/observacao-de-aves/catalogo": { priority: "0.8", changefreq: "weekly" },
  "/nosso-impacto": { priority: "0.7", changefreq: "monthly" },
  "/regiao": { priority: "0.8", changefreq: "monthly" },
  "/politica-de-privacidade": { priority: "0.3", changefreq: "yearly" },
};

function getRouteMeta(path: string): { priority: string; changefreq: string } {
  if (routePriority[path]) return routePriority[path];
  if (path.startsWith("/blog/")) return { priority: "0.7", changefreq: "monthly" };
  if (path.startsWith("/observacao-de-aves/catalogo/")) return { priority: "0.6", changefreq: "monthly" };
  return { priority: "0.5", changefreq: "monthly" };
}

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

  const allPaths = buildAllPaths(content).sort();

  const entries = allPaths
    .map((path) => {
      const url = toAbsoluteUrl(baseUrl, path);
      const meta = getRouteMeta(path);
      return `<url><loc>${escapeXml(url)}</loc><lastmod>${now}</lastmod><changefreq>${meta.changefreq}</changefreq><priority>${meta.priority}</priority></url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;
}

// ─── robots.txt with explicit AI crawler permissions ────────────────

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "Bytespider",
];

const SEARCH_CRAWLERS = [
  "Googlebot",
  "Bingbot",
  "Slurp",
  "DuckDuckBot",
  "Baiduspider",
  "YandexBot",
];

export function buildRobotsTxt(req: Request): string {
  const baseUrl = getBaseSiteUrl(req);

  const lines = [
    "# Itaicy Pantanal Eco Lodge",
    "# Pesca esportiva cota zero | Birdwatching | Ecoturismo",
    "",
    "User-agent: *",
    "Allow: /",
    "Crawl-delay: 1",
    "",
    "# AI Search Crawlers — explicitly permitted",
    ...AI_CRAWLERS.map((bot) => `User-agent: ${bot}\nAllow: /`),
    "",
    "# Search Engine Crawlers",
    ...SEARCH_CRAWLERS.map((bot) => `User-agent: ${bot}\nAllow: /`),
    "",
    `Sitemap: ${baseUrl}/sitemap.xml`,
    "",
  ];

  return lines.join("\n");
}

// ─── llms.txt — structured content guidance for AI crawlers ─────────

export function buildLlmsTxt(req: Request): string {
  const baseUrl = getBaseSiteUrl(req);

  return `# Itaicy Pantanal Eco Lodge
> Eco lodge no Pantanal Sul-Matogrossense (Miranda, MS, Brasil). Especializado em pesca esportiva catch-and-release cota zero, observacao de aves (birdwatching) com 166 especies catalogadas, e safaris fotograficos de ecoturismo.

## Experiencias Principais
- [Pesca Esportiva](${baseUrl}/pesca): Pesca catch-and-release no Rio Negro com guias locais. Projeto Cota Zero — toda captura e devolvida viva ao rio.
- [Observacao de Aves](${baseUrl}/observacao-de-aves): 166 especies catalogadas (survey Joao Andriola, maio 2024). Tuiuiu, Arara-Azul, Jabiru e mais.
- [Catalogo de Aves](${baseUrl}/observacao-de-aves/catalogo): Guia completo com nome cientifico, familia, status de conservacao e dicas de fotografia.
- [Ecoturismo](${baseUrl}/ecoturismo): Safaris fotograficos, trilhas ecologicas, passeios de barco pelo Rio Negro.
- [Culinaria Pantaneira](${baseUrl}/culinaria): Gastronomia regional com ingredientes do Pantanal.

## A Regiao
- [Pantanal Sul-Matogrossense](${baseUrl}/regiao): Guia completo — localizacao, como chegar, melhor epoca, clima por estacao e destinos proximos (Bonito, Campo Grande, Estrada Parque).

## Hospedagem
- [Acomodacoes](${baseUrl}/acomodacoes): Quartos com ar-condicionado, Wi-Fi, vista para o rio. Capacidade: 10 quartos.

## Dados-Chave
- Localizacao: Miranda, Mato Grosso do Sul, Brasil (-19.83, -56.68)
- Bioma: Pantanal Sul-Matogrossense (UNESCO World Heritage)
- Especies de aves: 166 catalogadas no lodge e entorno
- Pesca: Catch-and-release exclusivo (Projeto Cota Zero)
- Distancia de Campo Grande: ~240km (3h de carro)
- Distancia de Bonito: ~80km (1h30 de carro)
- Melhor epoca: Seca (maio a setembro) para aves e pesca; cheia (outubro a marco) para paisagens

## Conservacao e Impacto
- [Nosso Impacto](${baseUrl}/nosso-impacto): 4 pilares — Rio Vivo (Cota Zero), Biodiversidade, Comunidade local, Operacao Consciente.

## Blog e Conteudo
- [Blog](${baseUrl}/blog): Artigos sobre pesca, aves, conservacao, gastronomia e roteiros no Pantanal.

## Contato
- [Contato](${baseUrl}/contato): Formulario, WhatsApp, telefone e mapa.
- Telefone: +55 67 99999-0000

## Dados Estruturados
- Sitemap: ${baseUrl}/sitemap.xml
- JSON API: ${baseUrl}/api/cms/blog, ${baseUrl}/api/cms/birdwatching
- Schema.org: JSON-LD em todas as paginas (LodgingBusiness, FAQPage, BlogPosting, AggregateRating, Taxon, TouristTrip, ItemList)
`;
}
