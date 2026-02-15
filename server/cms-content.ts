import { loadCmsSeed } from "./cms-seed";
import { defaultSharedCmsSections } from "../shared/cms-shared-content";

type AnyDoc = Record<string, unknown>;

export type CmsContent = Awaited<ReturnType<typeof loadCmsSeed>>;

type CachedEntry = {
  expiresAt: number;
  source: "seed" | "payload";
  content: CmsContent;
};

let cache: CachedEntry | null = null;

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
    homeHero: {
      heading: str(settings.homeHeroHeading),
      subtitle: str(settings.homeHeroSubtitle),
      bookingHeading: str(settings.homeHeroBookingHeading),
      bookingDescription: str(settings.homeHeroBookingDescription),
    },
    homeManifesto: {
      label: str(settings.homeManifestoLabel),
      segments: Array.isArray(settings.homeManifestoSegments)
        ? settings.homeManifestoSegments.map((seg: AnyDoc) => ({
            type: str(seg.type),
            content: str(seg.content),
          }))
        : [],
      detailsButtonLabel: str(settings.homeManifestoDetailsButtonLabel),
    },
  };
}

async function fetchJsonWithTimeout(url: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REMOTE_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ${url}`);
    }
    return await response.json();
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
    }));

  const featuredBirdSlugs = birdSpecies
    .filter((bird) => bird.isFeatured)
    .slice(0, 2)
    .map((bird) => bird.slug);

  // Try new structured fields first, then legacy JSON, then defaults
  const structuredShared = buildSharedFromStructuredSettings(payloadSiteSettings);
  const legacyShared = payloadSiteSettings?.sharedSections;
  const shared =
    structuredShared ??
    (legacyShared &&
    typeof legacyShared === "object" &&
    !Array.isArray(legacyShared)
      ? (legacyShared as Record<string, unknown>)
      : defaultSharedCmsSections);

  // Page content from SiteSettings
  const pageContent =
    payloadSiteSettings?.pageContent &&
    typeof payloadSiteSettings.pageContent === "object" &&
    !Array.isArray(payloadSiteSettings.pageContent)
      ? (payloadSiteSettings.pageContent as Record<string, unknown>)
      : undefined;

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

async function loadFromPayloadRest(baseUrl: string): Promise<CmsContent> {
  const normalizedBase = baseUrl.replace(/\/+$/, "");

  const [blogCategoriesRes, blogPostsRes, birdCategoriesRes, birdSpeciesRes] =
    await Promise.all([
      fetchJsonWithTimeout(`${normalizedBase}/api/blog-categories?limit=200`),
      fetchJsonWithTimeout(`${normalizedBase}/api/blog-posts?limit=200&depth=1`),
      fetchJsonWithTimeout(`${normalizedBase}/api/bird-categories?limit=200`),
      fetchJsonWithTimeout(`${normalizedBase}/api/bird-species?limit=200&depth=1`),
    ]);

  let siteSettings: AnyDoc | null = null;
  try {
    const siteSettingsRes = await fetchJsonWithTimeout(
      `${normalizedBase}/api/globals/site-settings?depth=1`,
    );
    siteSettings = toRecord(siteSettingsRes);
  } catch {
    siteSettings = null;
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
  );
}

export async function getCmsContent(): Promise<{
  source: "seed" | "payload";
  content: CmsContent;
}> {
  const now = Date.now();
  if (cache && cache.expiresAt > now) {
    return { source: cache.source, content: cache.content };
  }

  const payloadBaseUrl = process.env.PAYLOAD_CMS_BASE_URL;
  if (payloadBaseUrl) {
    try {
      const payloadContent = await loadFromPayloadRest(payloadBaseUrl);
      cache = {
        expiresAt: now + CACHE_TTL_MS,
        source: "payload",
        content: payloadContent,
      };
      return { source: "payload", content: payloadContent };
    } catch {
      // Silent fallback to seed keeps site available if CMS is down.
    }
  }

  const seedContent = await loadCmsSeed();
  const normalizedSeedContent: CmsContent = seedContent.shared
    ? seedContent
    : {
        ...seedContent,
        shared: defaultSharedCmsSections,
      };
  cache = {
    expiresAt: now + CACHE_TTL_MS,
    source: "seed",
    content: normalizedSeedContent,
  };
  return { source: "seed", content: normalizedSeedContent };
}

export function clearCmsContentCache() {
  cache = null;
}
