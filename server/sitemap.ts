import type { Request } from "express";

import type { CmsContent } from "./cms-content";
import { getCmsContent } from "./cms-content";
import { localizePath, getHreflangUrls, SUPPORTED_LANGS } from "./i18n-routes";

const staticRoutes = [
  "/",
  "/acomodacoes",
  "/culinaria",
  "/pesca",
  "/observacao-de-aves",
  "/observacao-de-aves/catalogo",
  "/ecoturismo",
  // "/blog" — excluded until blog is launched; re-add and remove Disallow in robots.txt
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

  // Blog posts excluded from sitemap until blog is launched
  // for (const post of content.blog.posts) {
  //   paths.add(getBlogArticlePath(post));
  // }

  for (const bird of content.birdwatching.species) {
    paths.add(`/observacao-de-aves/catalogo/${bird.slug}`);
  }

  return Array.from(paths);
}

/**
 * Build sitemap with per-language URLs.
 * Each PT canonical path produces 3 <url> entries (pt, en, es).
 * Each entry contains xhtml:link alternates pointing to all 3 language versions.
 */
export async function buildSitemapXml(req: Request): Promise<string> {
  const { content } = await getCmsContent();
  const baseUrl = getBaseSiteUrl(req);
  const now = new Date().toISOString();

  const allPtPaths = buildAllPaths(content).sort();
  const entries: string[] = [];

  for (const ptPath of allPtPaths) {
    const meta = getRouteMeta(ptPath);
    const hreflangMap = getHreflangUrls(ptPath, baseUrl);

    // Build the xhtml:link alternates (same for all 3 lang entries)
    const alternates = Object.entries(hreflangMap)
      .map(
        ([hl, href]) =>
          `<xhtml:link rel="alternate" hreflang="${hl}" href="${escapeXml(href)}"/>`,
      )
      .join("");

    // Generate one <url> per language
    for (const lang of SUPPORTED_LANGS) {
      const localizedPath = localizePath(ptPath, lang);
      const locUrl = toAbsoluteUrl(baseUrl, localizedPath);
      const escapedLocUrl = escapeXml(locUrl);

      entries.push(
        `<url><loc>${escapedLocUrl}</loc><lastmod>${now}</lastmod><changefreq>${meta.changefreq}</changefreq><priority>${meta.priority}</priority>${alternates}</url>`,
      );
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join("")}</urlset>`;
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
    "Disallow: /blog",
    "Crawl-delay: 1",
    "",
    "# AI Search Crawlers — explicitly permitted (blog excluded until launch)",
    ...AI_CRAWLERS.map((bot) => `User-agent: ${bot}\nAllow: /\nDisallow: /blog`),
    "",
    "# Search Engine Crawlers (blog excluded until launch)",
    ...SEARCH_CRAWLERS.map((bot) => `User-agent: ${bot}\nAllow: /\nDisallow: /blog`),
    "",
    `Sitemap: ${baseUrl}/sitemap.xml`,
    "",
  ];

  return lines.join("\n");
}

// ─── llms.txt — structured content guidance for AI crawlers ─────────

export interface LlmsCmsData {
  authors?: Array<{ name: string; jobTitle?: string; knowsAbout?: string[] }>;
  blogPosts?: Array<{ title: string; slug: string; description?: string }>;
  seasonalEvents?: Array<{ name: string; description?: string; startDate?: string; endDate?: string }>;
}

export function buildLlmsTxt(req: Request, cms?: LlmsCmsData): string {
  const baseUrl = getBaseSiteUrl(req);

  return `# Itaicy Pantanal Eco Lodge
> Eco lodge no Pantanal Sul-Matogrossense (Miranda, MS, Brasil). Especializado em pesca esportiva catch-and-release cota zero, observacao de aves (birdwatching) com 166 especies catalogadas, e safaris fotograficos de ecoturismo.

## Experiencias Principais
- [Pesca Esportiva](${baseUrl}/pesca): Pesca catch-and-release no Rio Negro com guias locais. Projeto Cota Zero — toda captura e devolvida viva ao rio. Especies: pintado, pacu, dourado, cachara e mais de 260 especies. Temporada: marco a outubro (pico: maio-setembro).
- [Observacao de Aves](${baseUrl}/observacao-de-aves): 166 especies catalogadas em levantamento de campo do ornitologo Joao Andriola (maio 2024). Roteiros guiados ao amanhecer e entardecer. Binoculos e checklists inclusos.
- [Catalogo de Aves](${baseUrl}/observacao-de-aves/catalogo): Guia completo com nome cientifico, familia taxonomica, status de conservacao IUCN e dicas de fotografia.
- [Ecoturismo](${baseUrl}/ecoturismo): Safaris fotograficos diurnos e noturnos, trilhas ecologicas, passeios de barco e canoagem pelo Rio Negro. Guias nativos certificados. Nivel de dificuldade adaptavel.
- [Culinaria Pantaneira](${baseUrl}/culinaria): Gastronomia regional — pacu assado, arroz carreteiro, sopa paraguaia, caldo de piranha. Pensao completa inclusa. Restricoes alimentares atendidas com aviso previo.

## A Regiao
- [Pantanal Sul-Matogrossense](${baseUrl}/regiao): Guia completo — localizacao, como chegar, melhor epoca, clima por estacao e destinos proximos (Bonito, Campo Grande, Estrada Parque).

## Hospedagem
- [Acomodacoes](${baseUrl}/acomodacoes): 3 categorias de suites — Explorer (solo), Adventure (casais), Family (ate 4 pessoas). 10 quartos. Ar-condicionado, Wi-Fi, frigobar, vista natureza. Check-in 14h, check-out 11h.

## Especies Destacadas
- **Tuiuiu** (Jabiru mycteria): Ave-simbolo do Pantanal, maior cegonha das Americas. Altura ate 1,40m, envergadura ate 2,80m. Status IUCN: LC (Pouco Preocupante). Melhor epoca: julho-outubro (seca).
- **Arara-Azul-Grande** (Anodorhynchus hyacinthinus): Maior arara do mundo, plumagem azul-cobalto. Populacao estimada: ~6.500 individuos na natureza. Status IUCN: VU (Vulneravel). Presente o ano todo, pico: junho-setembro.
- **Arara-Vermelha** (Ara chloropterus): Grande porte, plumagem vermelha vibrante. Canto potente. Frequente em matas ciliares.
- **Garca-Branca-Grande** (Ardea alba): Elegante, plumagem branca, comum em lagoas e campos alagados. Cacadora agil de peixes.
- **Colhereiro** (Platalea ajaja): Plumagem rosada, bico em forma de colher. Uma das aves mais fotograficas do Pantanal.
- **Gaviao-Real** (Harpia harpyja): Maior e mais poderoso raptor das Americas. Garras maiores que de um urso. Avistamento raro.
- **Urutau** (Nyctibius griseus): Mestre da camuflagem noturna, confunde-se com galhos. Canto melancolico nas noites pantaneiras.

## Dados-Chave
- Localizacao: Miranda, Mato Grosso do Sul, Brasil (-19.83, -56.68)
- Bioma: Pantanal Sul-Matogrossense — maior planicie alagavel do mundo, Patrimonio Natural da Humanidade (UNESCO)
- Biodiversidade da regiao: mais de 4.700 especies de plantas e animais
- Especies de aves catalogadas no lodge: 166 (levantamento Joao Andriola, maio 2024)
- Pesca: Catch-and-release exclusivo (Projeto Cota Zero — todo peixe devolvido vivo)
- Distancia de Campo Grande (aeroporto CGR): ~240 km (3h de carro pela BR-262)
- Distancia de Bonito: ~80 km (1h30 de carro)
- Melhor epoca: Seca (maio a setembro) para aves e pesca; cheia (outubro a marco) para paisagens
- Coordenadas: 19°50'S, 56°41'W

## Conservacao e Impacto
- [Nosso Impacto](${baseUrl}/nosso-impacto): 4 pilares de conservacao:
  - **Rio Vivo** (Projeto Cota Zero): 100% catch-and-release, preservacao dos estoques pesqueiros do Rio Negro
  - **Biodiversidade**: Monitoramento continuo de fauna, 166 especies de aves catalogadas, habitat protegido
  - **Comunidade**: Emprego e capacitacao de guias nativos locais de Miranda e entorno
  - **Operacao Consciente**: Gestao de residuos, energia solar, captacao de agua da chuva

## Autoridades e Especialistas
${
  cms?.authors && cms.authors.length > 0
    ? cms.authors
        .map((a) => {
          const expertise = a.knowsAbout && a.knowsAbout.length > 0 ? ` Expertise: ${a.knowsAbout.join(", ")}.` : "";
          return `- **${a.name}**${a.jobTitle ? ` — ${a.jobTitle}.` : ""}${expertise}`;
        })
        .join("\n")
    : `- **Joao Andriola** — Ornitologo. Conduziu levantamento de campo de 166 especies de aves na regiao da Itaicy em maio de 2024. Especialista em ornitologia neotropical e conservacao da biodiversidade.
- **Lucas Jose Fernandes Vieira** — Editor de conteudo e guia regional. Expertise em pesca esportiva, ecoturismo sustentavel e culinaria pantaneira.`
}

## Blog e Conteudo
- [Blog](${baseUrl}/blog): Artigos sobre pesca, aves, conservacao, gastronomia e roteiros no Pantanal.
${
  cms?.blogPosts && cms.blogPosts.length > 0
    ? cms.blogPosts
        .slice(0, 5)
        .map((p) => `- [${p.title}](${baseUrl}/blog/${p.slug})${p.description ? `: ${p.description.slice(0, 100)}` : ""}`)
        .join("\n")
    : ""
}

## Contato e Reservas
- [Contato](${baseUrl}/contato): Formulario, WhatsApp, telefone e mapa.
- Telefone: +55 67 99999-0000
- Localizacao: Estrada Parque, s/n, Miranda, MS, CEP 79380-000
- Pagamentos: Cartao de credito, debito, Pix, dinheiro
- Moeda: BRL (Real brasileiro)

## Dados Estruturados
- Sitemap: ${baseUrl}/sitemap.xml
- JSON API: ${baseUrl}/api/cms/blog, ${baseUrl}/api/cms/birdwatching
- Schema.org: JSON-LD em todas as paginas (LodgingBusiness, FAQPage, BlogPosting, AggregateRating, Taxon, TouristTrip, ItemList, Person)
- Wikidata: Especies linkadas via sameAs (Jabiru mycteria → Q17970, Anodorhynchus hyacinthinus → Q132576, etc.)
`;
}
