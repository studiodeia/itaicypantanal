import { loadAgentConfigSeed, loadCmsSeed, loadCmsSeedLocale } from "./cms-seed";
import { defaultSharedCmsSections } from "../shared/cms-shared-content";
import type { AgentConfig } from "../shared/agent-config";
import { mapPayloadAgentConfigToAgentConfig } from "../shared/agent-config-payload";
import type { CmsSeo, CmsAuthorProfile, CmsSeasonalEvent, CmsAggregateRating } from "../shared/cms-page-content.js";

type AnyDoc = Record<string, unknown>;

export type CmsContent = Awaited<ReturnType<typeof loadCmsSeed>>;

type CachedEntry = {
  expiresAt: number;
  source: "seed" | "payload";
  content: CmsContent;
};
type AgentConfigCachedEntry = {
  expiresAt: number;
  source: "seed" | "payload";
  config: AgentConfig;
};

const VALID_LOCALES = new Set(["pt", "en", "es"]);
function normalizeLocale(locale?: string): string {
  if (locale && VALID_LOCALES.has(locale)) return locale;
  return "pt";
}

const cacheByLocale = new Map<string, CachedEntry>();
let agentConfigCache: AgentConfigCachedEntry | null = null;

const CACHE_TTL_MS = 30_000;
const REMOTE_TIMEOUT_MS = 4_000;

function slugifyCategory(category: string): string {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toRecord(value: unknown): AnyDoc | null {
  if (!value || typeof value !== "object") return null;
  return value as AnyDoc;
}

function toRelationSlug(
  relation: unknown,
  fallbackById: Map<string, string>,
): string | null {
  if (typeof relation === "string") {
    return fallbackById.get(relation) ?? relation;
  }

  const record = toRecord(relation);
  if (!record) return null;

  if (typeof record.slug === "string") return record.slug;
  if (typeof record.id === "string") return fallbackById.get(record.id) ?? null;
  return null;
}

const PAGE_GLOBAL_SLUGS = [
  { route: "/", slug: "home-content" },
  { route: "/acomodacoes", slug: "acomodacoes-content" },
  { route: "/culinaria", slug: "culinaria-content" },
  { route: "/pesca", slug: "pesca-content" },
  { route: "/ecoturismo", slug: "ecoturismo-content" },
  { route: "/observacao-de-aves", slug: "birdwatching-content" },
  { route: "/contato", slug: "contato-content" },
  { route: "/nosso-impacto", slug: "nosso-impacto-content" },
  { route: "/politica-de-privacidade", slug: "privacidade-content" },
  { route: "/404", slug: "not-found-content" },
] as const;

/** Unwraps Payload {text: string}[] arrays back to string[] for frontend */
function unwrapTextArray(arr: unknown): string[] {
  if (!Array.isArray(arr)) return [];
  return arr.map((item) => {
    if (typeof item === "string") return item;
    if (item && typeof item === "object" && "text" in item) return String((item as AnyDoc).text);
    return "";
  });
}

/** Strip top-level Payload meta fields from a global response */
function stripPayloadMeta(obj: AnyDoc): AnyDoc {
  const result: AnyDoc = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === "id" || key === "createdAt" || key === "updatedAt" || key === "globalType") continue;
    result[key] = value;
  }
  return result;
}

function extractSeoFromGlobal(raw: Record<string, unknown>): CmsSeo {
  const meta = (raw.meta || {}) as Record<string, unknown>;
  const image = meta.image as Record<string, unknown> | undefined;
  return {
    metaTitle: typeof meta.title === "string" && meta.title ? meta.title : undefined,
    metaDescription: typeof meta.description === "string" && meta.description ? meta.description : undefined,
    ogImage: image?.url
      ? String(image.url)
      : typeof meta.image === "string" && meta.image
      ? meta.image
      : undefined,
    noIndex: typeof meta.noIndex === "boolean" ? meta.noIndex : false,
    canonicalUrl: typeof meta.canonicalUrl === "string" && meta.canonicalUrl ? meta.canonicalUrl : undefined,
  };
}

/** Route-specific transformation from Payload global shape to frontend-expected shape */
function transformGlobalToPageContent(route: string, raw: AnyDoc): Record<string, unknown> {
  const data = stripPayloadMeta(raw);

  const seo = extractSeoFromGlobal(raw);

  switch (route) {
    case "/": {
      const aboutUs = toRecord(data.aboutUs);
      if (aboutUs) aboutUs.body = unwrapTextArray(aboutUs.body);
      return { ...data, aboutUs, seo };
    }
    case "/culinaria": {
      const menu = toRecord(data.menu);
      if (menu) menu.body = unwrapTextArray(menu.body);
      const experience = toRecord(data.experience);
      if (experience) experience.body = unwrapTextArray(experience.body);
      return { ...data, menu, experience, seo };
    }
    case "/pesca":
    case "/ecoturismo":
    case "/observacao-de-aves": {
      const sobreNos = toRecord(data.sobreNos);
      if (sobreNos) sobreNos.body = unwrapTextArray(sobreNos.body);
      return { ...data, sobreNos, seo };
    }
    case "/contato": {
      const steps = toRecord(data.steps);
      if (steps) steps.placeholders = unwrapTextArray(steps.placeholders);
      return { ...data, steps, seo };
    }
    case "/nosso-impacto": {
      const comunidade = toRecord(data.comunidade);
      if (comunidade) comunidade.body = unwrapTextArray(comunidade.body);
      return { ...data, comunidade, seo };
    }
    case "/politica-de-privacidade": {
      const sections = Array.isArray(data.sections)
        ? data.sections.map((s: AnyDoc) => ({
            ...s,
            content: unwrapTextArray(s.content),
          }))
        : data.sections;
      return { ...data, sections, seo };
    }
    default:
      return { ...data, seo };
  }
}

function buildSharedFromStructuredSettings(
  settings: AnyDoc | null,
): Record<string, unknown> | null {
  if (!settings) return null;

  // Check if new structured fields exist (migration complete)
  const hasFaqItems =
    Array.isArray(settings.faqItems) && settings.faqItems.length > 0;
  const hasTestimonials =
    Array.isArray(settings.testimonialItems) &&
    settings.testimonialItems.length > 0;

  if (!hasFaqItems && !hasTestimonials) {
    // Fallback to legacy JSON blob
    return null;
  }

  const str = (v: unknown) => (typeof v === "string" ? v : "");

  return {
    immersionCta: {
      heading: str(settings.ctaHeading),
      description: str(settings.ctaDescription),
      backgroundImage: str(settings.ctaBackgroundImage),
    },
    faq: {
      label: str(settings.faqLabel) || "FAQ",
      heading: str(settings.faqHeading),
      description: str(settings.faqDescription),
      items: Array.isArray(settings.faqItems)
        ? settings.faqItems.map((item: AnyDoc) => ({
            question: str(item.question),
            answer: str(item.answer),
          }))
        : [],
    },
    testimonials: {
      label: str(settings.testimonialsLabel) || "Depoimentos",
      heading: str(settings.testimonialsHeading),
      description: str(settings.testimonialsDescription),
      items: Array.isArray(settings.testimonialItems)
        ? settings.testimonialItems.map((item: AnyDoc) => ({
            quote: str(item.quote),
            author: str(item.author),
            location: str(item.location),
            rating: typeof item.rating === "number" ? item.rating : 5,
          }))
        : [],
    },
    footer: {
      pousadaLinks: Array.isArray(settings.footerPousadaLinks)
        ? settings.footerPousadaLinks.map((l: AnyDoc) => ({
            label: str(l.label),
            href: str(l.url),
          }))
        : [],
      experienciasLinks: Array.isArray(settings.footerExperienciasLinks)
        ? settings.footerExperienciasLinks.map((l: AnyDoc) => ({
            label: str(l.label),
            href: str(l.url),
          }))
        : [],
      legalLinks: Array.isArray(settings.footerLegalLinks)
        ? settings.footerLegalLinks.map((l: AnyDoc) => ({
            label: str(l.label),
            href: str(l.url),
          }))
        : [],
      copyright: str(settings.footerCopyright),
    },
    authors: Array.isArray(settings.authors)
      ? settings.authors.map((a: AnyDoc): CmsAuthorProfile => ({
          name: str(a.name),
          jobTitle: str(a.jobTitle) || undefined,
          knowsAbout: Array.isArray(a.knowsAbout)
            ? a.knowsAbout.map((k: AnyDoc) => str(k.topic)).filter(Boolean)
            : undefined,
          url: str(a.url) || undefined,
          image: str(a.image) || undefined,
        }))
      : [],
    seasonalEvents: Array.isArray(settings.seasonalEvents)
      ? settings.seasonalEvents.map((e: AnyDoc): CmsSeasonalEvent => ({
          name: str(e.name),
          description: str(e.description) || undefined,
          startDate: str(e.startDate) || undefined,
          endDate: str(e.endDate) || undefined,
          image: str(e.image) || undefined,
        }))
      : [],
    aggregateRating: (() => {
      const ar = settings.aggregateRating as AnyDoc | undefined;
      if (!ar || typeof ar.ratingValue !== "number") return undefined;
      return {
        ratingValue: ar.ratingValue,
        reviewCount: typeof ar.reviewCount === "number" ? ar.reviewCount : undefined,
        bestRating: typeof ar.bestRating === "number" ? ar.bestRating : 5,
      } satisfies CmsAggregateRating;
    })(),
  };
}

async function fetchJsonWithTimeout(url: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REMOTE_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "Accept-Encoding": "identity" },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ${url}`);
    }
    // Use .text() + JSON.parse for resilience: some CDNs return gzip
    // despite Accept-Encoding: identity, and response.json() can't
    // handle raw compressed bytes.
    const text = await response.text();
    return JSON.parse(text);
  } finally {
    clearTimeout(timeout);
  }
}

function buildFromPayloadData(
  payloadCategories: AnyDoc[],
  payloadPosts: AnyDoc[],
  payloadBirdCategories: AnyDoc[],
  payloadBirdSpecies: AnyDoc[],
  payloadSiteSettings: AnyDoc | null,
  pageContentFromGlobals?: Record<string, unknown>,
): CmsContent {
  const categoryById = new Map<string, string>();
  const blogCategories = payloadCategories.map((doc) => {
    const id = typeof doc.id === "string" ? doc.id : "";
    const name = typeof doc.name === "string" ? doc.name : "";
    const slug =
      typeof doc.slug === "string" && doc.slug.length > 0
        ? doc.slug
        : slugifyCategory(name);
    if (id) categoryById.set(id, name);
    return { id, name, slug };
  });

  const postSlugById = new Map<string, string>();
  for (const doc of payloadPosts) {
    if (typeof doc.id === "string" && typeof doc.slug === "string") {
      postSlugById.set(doc.id, doc.slug);
    }
  }

  const posts = payloadPosts.map((doc) => {
    const primaryCategoryRelation = doc.primaryCategory;
    const primaryCategory =
      typeof primaryCategoryRelation === "string"
        ? categoryById.get(primaryCategoryRelation) ?? ""
        : (toRecord(primaryCategoryRelation)?.name as string | undefined) ?? "";

    const categories = Array.isArray(doc.categories)
      ? doc.categories
          .map((relation) => {
            if (typeof relation === "string") {
              return categoryById.get(relation) ?? "";
            }
            const record = toRecord(relation);
            return typeof record?.name === "string" ? record.name : "";
          })
          .filter((name): name is string => Boolean(name))
      : [];

    return {
      slug: typeof doc.slug === "string" ? doc.slug : "",
      title: typeof doc.title === "string" ? doc.title : "",
      subtitle: typeof doc.subtitle === "string" ? doc.subtitle : "",
      description:
        typeof doc.description === "string" ? doc.description : undefined,
      tag: typeof doc.tag === "string" ? doc.tag : "",
      primaryCategory,
      categories,
      src: typeof doc.src === "string" ? doc.src : "",
      author: typeof doc.author === "string" ? doc.author : "",
      date: typeof doc.date === "string" ? doc.date : "",
      readingTime: typeof doc.readingTime === "string" ? doc.readingTime : "",
      heroImage: typeof doc.heroImage === "string" ? doc.heroImage : "",
      content: Array.isArray(doc.contentBlocks)
        ? doc.contentBlocks.map((block: AnyDoc) => {
            // Payload Blocks use blockType; legacy JSON uses type
            const blockType =
              typeof block.blockType === "string"
                ? block.blockType
                : typeof block.type === "string"
                  ? block.type
                  : "paragraph";

            if (blockType === "species") {
              return {
                type: "species",
                name: typeof block.name === "string" ? block.name : "",
                scientificName:
                  typeof block.scientificName === "string"
                    ? block.scientificName
                    : "",
                description:
                  typeof block.description === "string"
                    ? block.description
                    : "",
                image: typeof block.image === "string" ? block.image : "",
              };
            }

            if (blockType === "orderedList") {
              return {
                type: "orderedList",
                items: Array.isArray(block.items)
                  ? block.items.map((item: AnyDoc) => ({
                      bold: typeof item.bold === "string" ? item.bold : "",
                      text: typeof item.text === "string" ? item.text : "",
                    }))
                  : [],
              };
            }

            // paragraph and heading both just have text
            return {
              type: blockType,
              text: typeof block.text === "string" ? block.text : "",
            };
          })
        : [],
      relatedSlugs: Array.isArray(doc.relatedPosts)
        ? doc.relatedPosts
            .map((relation) => toRelationSlug(relation, postSlugById))
            .filter((slug): slug is string => Boolean(slug))
        : [],
      isFeatured: doc.isFeatured === true,
      isRecent: doc.isRecent === true,
    };
  });

  const details = posts
    .filter((post) => post.content.length > 0)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      subtitle: post.subtitle,
      description: post.description,
      tag: post.tag,
      primaryCategory: post.primaryCategory,
      categories: post.categories,
      src: post.src,
      author: post.author,
      date: post.date,
      readingTime: post.readingTime,
      heroImage: post.heroImage || post.src,
      content: post.content,
      relatedSlugs: post.relatedSlugs,
    }));

  const featuredDoc = posts.find((post) => post.isFeatured) ?? posts[0];
  const recentDocs = posts
    .filter((post) => post.isRecent)
    .slice(0, 3)
    .map((post) => post.slug);

  const birdCategoryById = new Map<string, string>();
  const birdCategories = payloadBirdCategories.map((doc) => {
    const id = typeof doc.id === "string" ? doc.id : "";
    const name = typeof doc.name === "string" ? doc.name : "";
    const slug =
      typeof doc.slug === "string" && doc.slug.length > 0
        ? doc.slug
        : slugifyCategory(name);
    if (id) birdCategoryById.set(id, name);
    return { id, name, slug };
  });

  const birdSlugById = new Map<string, string>();
  for (const doc of payloadBirdSpecies) {
    if (typeof doc.id === "string" && typeof doc.slug === "string") {
      birdSlugById.set(doc.id, doc.slug);
    }
  }

  const birdSpecies = payloadBirdSpecies.map((doc) => {
    const categoryRelation = doc.category;
    const category =
      typeof categoryRelation === "string"
        ? birdCategoryById.get(categoryRelation) ?? ""
        : (toRecord(categoryRelation)?.name as string | undefined) ?? "";

    return {
      slug: typeof doc.slug === "string" ? doc.slug : "",
      commonName: typeof doc.commonName === "string" ? doc.commonName : "",
      scientificName:
        typeof doc.scientificName === "string" ? doc.scientificName : "",
      description: typeof doc.description === "string" ? doc.description : "",
      category,
      tag: typeof doc.tag === "string" ? doc.tag : "",
      src: typeof doc.src === "string" ? doc.src : "",
      author: typeof doc.author === "string" ? doc.author : "",
      date: typeof doc.date === "string" ? doc.date : "",
      photoCredit: typeof doc.photoCredit === "string" ? doc.photoCredit : "",
      photoLicense: typeof doc.photoLicense === "string" ? doc.photoLicense : "",
      heroImage: typeof doc.heroImage === "string" ? doc.heroImage : "",
      conservationStatus:
        typeof doc.conservationStatus === "string"
          ? doc.conservationStatus
          : "",
      size: typeof doc.size === "string" ? doc.size : "",
      habitat: typeof doc.habitat === "string" ? doc.habitat : "",
      overview: typeof doc.overview === "string" ? doc.overview : "",
      diet: typeof doc.diet === "string" ? doc.diet : "",
      behavior: typeof doc.behavior === "string" ? doc.behavior : "",
      bestTime: typeof doc.bestTime === "string" ? doc.bestTime : "",
      photographyTips: Array.isArray(doc.photographyTips)
        ? doc.photographyTips
            .map((tip) => {
              if (typeof tip === "string") return tip;
              const rec = toRecord(tip);
              return rec && typeof rec.tip === "string" ? rec.tip : null;
            })
            .filter((tip): tip is string => tip !== null)
        : [],
      relatedSlugs: Array.isArray(doc.relatedSpecies)
        ? doc.relatedSpecies
            .map((relation) => toRelationSlug(relation, birdSlugById))
            .filter((slug): slug is string => Boolean(slug))
        : [],
      isFeatured: doc.isFeatured === true,
    };
  });

  const birdDetails = birdSpecies
    .filter((bird) => Boolean(bird.overview))
    .map((bird) => ({
      slug: bird.slug,
      commonName: bird.commonName,
      scientificName: bird.scientificName,
      description: bird.description,
      category: bird.category,
      tag: bird.tag,
      src: bird.src,
      author: bird.author,
      date: bird.date,
      heroImage: bird.heroImage || bird.src,
      conservationStatus: bird.conservationStatus,
      size: bird.size,
      habitat: bird.habitat,
      overview: bird.overview,
      diet: bird.diet,
      behavior: bird.behavior,
      bestTime: bird.bestTime,
      photographyTips: bird.photographyTips,
      relatedSlugs: bird.relatedSlugs,
      photoCredit: bird.photoCredit,
      photoLicense: bird.photoLicense,
    }));

  const featuredBirdSlugs = birdSpecies
    .filter((bird) => bird.isFeatured)
    .slice(0, 2)
    .map((bird) => bird.slug);

  // Try structured fields first, then defaults
  const shared =
    buildSharedFromStructuredSettings(payloadSiteSettings) ?? defaultSharedCmsSections;

  // Page content from individual globals (or undefined when loading from seed)
  const pageContent = pageContentFromGlobals;

  return {
    generatedAt: new Date().toISOString(),
    notes: {
      source:
        "Conteudo carregado do Payload via REST e normalizado para formato de seed.",
      strategy: "payload-first com fallback automatico para seed local.",
    },
    blog: {
      categories: blogCategories.map((category) => category.name).filter(Boolean),
      posts: posts.map((post) => ({
        slug: post.slug,
        title: post.title,
        subtitle: post.subtitle,
        description: post.description,
        tag: post.tag,
        primaryCategory: post.primaryCategory,
        categories: post.categories,
        src: post.src,
        author: post.author,
        date: post.date,
        readingTime: post.readingTime,
      })),
      details,
      featuredSlug: featuredDoc?.slug ?? "",
      recentSlugs: recentDocs,
    },
    birdwatching: {
      categories: birdCategories
        .map((category) => category.name)
        .filter(Boolean),
      species: birdSpecies.map((bird) => ({
        slug: bird.slug,
        commonName: bird.commonName,
        scientificName: bird.scientificName,
        description: bird.description,
        category: bird.category,
        tag: bird.tag,
        src: bird.src,
        author: bird.author,
        date: bird.date,
        photoCredit: bird.photoCredit,
        photoLicense: bird.photoLicense,
      })),
      details: birdDetails,
      featuredSlugs: featuredBirdSlugs,
    },
    shared,
    pageContent,
    pages: {
      routes: [
        "/",
        "/acomodacoes",
        "/culinaria",
        "/pesca",
        "/observacao-de-aves",
        "/observacao-de-aves/catalogo",
        "/observacao-de-aves/catalogo/:slug",
        "/ecoturismo",
        "/blog",
        "/blog/:categorySlug/:slug",
        "/contato",
        "/nosso-impacto",
        "/politica-de-privacidade",
      ],
    },
  };
}

async function loadFromPayloadRest(baseUrl: string, locale = "pt"): Promise<CmsContent> {
  const normalizedBase = baseUrl.replace(/\/+$/, "");
  const lq = `locale=${locale}`;

  const [blogCategoriesRes, blogPostsRes, birdCategoriesRes, birdSpeciesRes] =
    await Promise.all([
      fetchJsonWithTimeout(`${normalizedBase}/api/blog-categories?limit=200&${lq}`),
      fetchJsonWithTimeout(`${normalizedBase}/api/blog-posts?limit=200&depth=1&${lq}`),
      fetchJsonWithTimeout(`${normalizedBase}/api/bird-categories?limit=200&${lq}`),
      fetchJsonWithTimeout(`${normalizedBase}/api/bird-species?limit=200&depth=1&${lq}`),
    ]);

  let siteSettings: AnyDoc | null = null;
  try {
    const siteSettingsRes = await fetchJsonWithTimeout(
      `${normalizedBase}/api/globals/site-settings?depth=1&${lq}`,
    );
    siteSettings = toRecord(siteSettingsRes);
  } catch {
    siteSettings = null;
  }

  // Fetch all page globals in parallel
  const globalResults = await Promise.allSettled(
    PAGE_GLOBAL_SLUGS.map(({ slug }) =>
      fetchJsonWithTimeout(`${normalizedBase}/api/globals/${slug}?depth=0&${lq}`),
    ),
  );

  const pageContent: Record<string, unknown> = {};
  for (let i = 0; i < PAGE_GLOBAL_SLUGS.length; i++) {
    const result = globalResults[i];
    if (result.status !== "fulfilled") continue;
    const raw = toRecord(result.value);
    if (!raw) continue;
    const { route } = PAGE_GLOBAL_SLUGS[i];
    pageContent[route] = transformGlobalToPageContent(route, raw);
  }

  const blogCategoriesDocs = (
    toRecord(blogCategoriesRes)?.docs as unknown[] | undefined
  )?.filter((doc): doc is AnyDoc => Boolean(toRecord(doc))) ?? [];
  const blogPostsDocs = (
    toRecord(blogPostsRes)?.docs as unknown[] | undefined
  )?.filter((doc): doc is AnyDoc => Boolean(toRecord(doc))) ?? [];
  const birdCategoryDocs = (
    toRecord(birdCategoriesRes)?.docs as unknown[] | undefined
  )?.filter((doc): doc is AnyDoc => Boolean(toRecord(doc))) ?? [];
  const birdSpeciesDocs = (
    toRecord(birdSpeciesRes)?.docs as unknown[] | undefined
  )?.filter((doc): doc is AnyDoc => Boolean(toRecord(doc))) ?? [];

  return buildFromPayloadData(
    blogCategoriesDocs,
    blogPostsDocs,
    birdCategoryDocs,
    birdSpeciesDocs,
    siteSettings,
    Object.keys(pageContent).length > 0 ? pageContent : undefined,
  );
}

async function loadAgentConfigFromPayloadRest(baseUrl: string): Promise<AgentConfig> {
  const normalizedBase = baseUrl.replace(/\/+$/, "");
  const result = await fetchJsonWithTimeout(
    `${normalizedBase}/api/globals/agent-config?depth=0`,
  );
  const raw = toRecord(result);
  if (!raw) {
    throw new Error("Invalid agent-config payload response");
  }

  const data = stripPayloadMeta(raw);
  return mapPayloadAgentConfigToAgentConfig(data);
}

export async function getCmsAgentConfig(): Promise<{
  source: "seed" | "payload";
  config: AgentConfig;
}> {
  const now = Date.now();
  if (agentConfigCache && agentConfigCache.expiresAt > now) {
    return { source: agentConfigCache.source, config: agentConfigCache.config };
  }

  const payloadBaseUrl = process.env.PAYLOAD_CMS_BASE_URL;
  if (payloadBaseUrl) {
    try {
      const payloadConfig = await loadAgentConfigFromPayloadRest(payloadBaseUrl);
      agentConfigCache = {
        expiresAt: now + CACHE_TTL_MS,
        source: "payload",
        config: payloadConfig,
      };
      return { source: "payload", config: payloadConfig };
    } catch {
      // Silent fallback to seed keeps API available if CMS is down.
    }
  }

  const seedConfig = await loadAgentConfigSeed();
  agentConfigCache = {
    expiresAt: now + CACHE_TTL_MS,
    source: "seed",
    config: seedConfig,
  };

  return { source: "seed", config: seedConfig };
}

export async function getCmsContent(rawLocale?: string): Promise<{
  source: "seed" | "payload";
  content: CmsContent;
}> {
  const locale = normalizeLocale(rawLocale);
  const now = Date.now();
  const cached = cacheByLocale.get(locale);
  if (cached && cached.expiresAt > now) {
    return { source: cached.source, content: cached.content };
  }

  const payloadBaseUrl = process.env.PAYLOAD_CMS_BASE_URL;
  if (payloadBaseUrl) {
    try {
      const payloadContent = await loadFromPayloadRest(payloadBaseUrl, locale);
      cacheByLocale.set(locale, {
        expiresAt: now + CACHE_TTL_MS,
        source: "payload",
        content: payloadContent,
      });
      return { source: "payload", content: payloadContent };
    } catch {
      // Silent fallback to seed keeps site available if CMS is down.
    }
  }

  const seedContent = await loadCmsSeedLocale(locale);
  const normalizedSeedContent: CmsContent = seedContent.shared
    ? seedContent
    : {
        ...seedContent,
        shared: defaultSharedCmsSections,
      };
  cacheByLocale.set(locale, {
    expiresAt: now + CACHE_TTL_MS,
    source: "seed",
    content: normalizedSeedContent,
  });
  return { source: "seed", content: normalizedSeedContent };
}

export function clearCmsContentCache() {
  cacheByLocale.clear();
  agentConfigCache = null;
}
