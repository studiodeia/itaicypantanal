import "dotenv/config";

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { getPayload } from "payload";

import config from "../payload.config";

type SeedBlogPost = {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  tag?: string;
  primaryCategory?: string;
  categories?: string[];
  src?: string;
  author?: string;
  date?: string;
  readingTime?: string;
};

type SeedBlogDetail = SeedBlogPost & {
  heroImage?: string;
  content?: unknown[];
  relatedSlugs?: string[];
};

type SeedBird = {
  slug: string;
  commonName: string;
  scientificName: string;
  description?: string;
  category?: string;
  tag?: string;
  src?: string;
  author?: string;
  date?: string;
  taxonomicOrder?: string;
  family?: string;
  commonNameEN?: string;
};

type SeedBirdDetail = SeedBird & {
  heroImage?: string;
  conservationStatus?: string;
  size?: string;
  habitat?: string;
  overview?: string;
  diet?: string;
  behavior?: string;
  bestTime?: string;
  photographyTips?: string[];
  relatedSlugs?: string[];
};

type SeedData = {
  blog: {
    categories: string[];
    posts: SeedBlogPost[];
    details: SeedBlogDetail[];
    featuredSlug: string;
    recentSlugs: string[];
  };
  birdwatching: {
    categories: string[];
    species: SeedBird[];
    details: SeedBirdDetail[];
    featuredSlugs: string[];
  };
  shared?: Record<string, unknown>;
  pages: {
    routes: string[];
  };
};

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function resolveSeedPath(): Promise<string> {
  const candidates = [
    resolve(process.cwd(), "..", "docs", "payload-seed", "full-seed.json"),
    resolve(process.cwd(), "docs", "payload-seed", "full-seed.json"),
  ];

  for (const candidate of candidates) {
    try {
      await readFile(candidate, "utf8");
      return candidate;
    } catch {
      // try next candidate
    }
  }

  throw new Error("Nao foi possivel localizar docs/payload-seed/full-seed.json");
}

async function readSeed(): Promise<SeedData> {
  const seedPath = await resolveSeedPath();
  const raw = await readFile(seedPath, "utf8");
  return JSON.parse(raw) as SeedData;
}

async function upsertBySlug(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: string,
  slug: string,
  data: Record<string, unknown>,
) {
  const existing = await payload.find({
    collection,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data,
      depth: 0,
      overrideAccess: true,
    });
  }

  return payload.create({
    collection,
    data,
    depth: 0,
    overrideAccess: true,
  });
}

async function importBlog(
  payload: Awaited<ReturnType<typeof getPayload>>,
  seed: SeedData["blog"],
) {
  const blogCategoryIdByName = new Map<string, string | number>();

  for (const categoryName of seed.categories) {
    const category = await upsertBySlug(
      payload,
      "blog-categories",
      slugify(categoryName),
      {
        name: categoryName,
        slug: slugify(categoryName),
      },
    );
    blogCategoryIdByName.set(categoryName, category.id);
  }

  const detailsBySlug = new Map(seed.details.map((detail) => [detail.slug, detail]));
  const blogPostIdBySlug = new Map<string, string | number>();

  for (const post of seed.posts) {
    const detail = detailsBySlug.get(post.slug);
    const primaryCategoryId = post.primaryCategory
      ? blogCategoryIdByName.get(post.primaryCategory)
      : undefined;
    const categoryIds = (post.categories ?? [])
      .map((name) => blogCategoryIdByName.get(name))
      .filter((id): id is string | number => id !== undefined);

    const baseData: Record<string, unknown> = {
      title: post.title,
      slug: post.slug,
      subtitle: post.subtitle ?? "",
      description: post.description ?? "",
      tag: post.tag ?? "",
      src: post.src ?? "",
      author: post.author ?? "",
      date: post.date ?? "",
      readingTime: post.readingTime ?? "",
      heroImage: detail?.heroImage ?? "",
      contentBlocks: (detail?.content ?? []).map((block) => {
        const b = block as Record<string, unknown>;
        return { blockType: b.type, ...b, type: undefined };
      }),
      isFeatured: post.slug === seed.featuredSlug,
      isRecent: seed.recentSlugs.includes(post.slug),
    };
    if (primaryCategoryId !== undefined) {
      baseData.primaryCategory = primaryCategoryId;
    }
    if (categoryIds.length > 0) {
      baseData.categories = categoryIds;
    }

    const created = await upsertBySlug(payload, "blog-posts", post.slug, {
      ...baseData,
    });
    blogPostIdBySlug.set(post.slug, created.id);
  }

  for (const detail of seed.details) {
    const postId = blogPostIdBySlug.get(detail.slug);
    if (!postId) continue;

    const relatedPostIds = (detail.relatedSlugs ?? [])
      .map((slug) => blogPostIdBySlug.get(slug))
      .filter((id): id is string | number => id !== undefined);

    await payload.update({
      collection: "blog-posts",
      id: postId,
      data: {
        relatedPosts: relatedPostIds,
      },
      depth: 0,
      overrideAccess: true,
    });
  }
}

async function importBirdwatching(
  payload: Awaited<ReturnType<typeof getPayload>>,
  seed: SeedData["birdwatching"],
) {
  const birdCategoryIdByName = new Map<string, string | number>();

  for (const categoryName of seed.categories) {
    const category = await upsertBySlug(
      payload,
      "bird-categories",
      slugify(categoryName),
      {
        name: categoryName,
        slug: slugify(categoryName),
      },
    );
    birdCategoryIdByName.set(categoryName, category.id);
  }

  const detailsBySlug = new Map(seed.details.map((detail) => [detail.slug, detail]));
  const birdIdBySlug = new Map<string, string | number>();

  for (const bird of seed.species) {
    const detail = detailsBySlug.get(bird.slug);
    const categoryId = bird.category
      ? birdCategoryIdByName.get(bird.category)
      : undefined;
    const baseData: Record<string, unknown> = {
      commonName: bird.commonName,
      scientificName: bird.scientificName,
      slug: bird.slug,
      description: bird.description ?? "",
      tag: bird.tag ?? "",
      src: bird.src ?? "",
      author: bird.author ?? "",
      date: bird.date ?? "",
      taxonomicOrder: bird.taxonomicOrder ?? "",
      family: bird.family ?? "",
      commonNameEN: bird.commonNameEN ?? "",
      heroImage: detail?.heroImage ?? "",
      conservationStatus: detail?.conservationStatus ?? "",
      size: detail?.size ?? "",
      habitat: detail?.habitat ?? "",
      overview: detail?.overview ?? "",
      diet: detail?.diet ?? "",
      behavior: detail?.behavior ?? "",
      bestTime: detail?.bestTime ?? "",
      photographyTips: (detail?.photographyTips ?? []).map((tip) => ({ tip })),
      isFeatured: seed.featuredSlugs.includes(bird.slug),
    };
    if (categoryId !== undefined) {
      baseData.category = categoryId;
    }

    const created = await upsertBySlug(payload, "bird-species", bird.slug, {
      ...baseData,
    });
    birdIdBySlug.set(bird.slug, created.id);
  }

  for (const detail of seed.details) {
    const birdId = birdIdBySlug.get(detail.slug);
    if (!birdId) continue;

    const relatedSpeciesIds = (detail.relatedSlugs ?? [])
      .map((slug) => birdIdBySlug.get(slug))
      .filter((id): id is string | number => id !== undefined);

    await payload.update({
      collection: "bird-species",
      id: birdId,
      data: {
        relatedSpecies: relatedSpeciesIds,
      },
      depth: 0,
      overrideAccess: true,
    });
  }
}

async function importPages(
  payload: Awaited<ReturnType<typeof getPayload>>,
  routes: string[],
) {
  for (const route of routes) {
    await upsertBySlug(payload, "pages", route, {
      slug: route,
      title: route === "/" ? "Home" : route,
      sections: [],
    });
  }
}

/** Wraps string[] into {text: string}[] for Payload array fields */
function wrapStrings(arr: unknown): { text: string }[] {
  if (!Array.isArray(arr)) return [];
  return arr.map((item) => ({ text: typeof item === "string" ? item : String(item) }));
}

const routeToGlobalSlug: Record<string, string> = {
  "/": "home-content",
  "/acomodacoes": "acomodacoes-content",
  "/culinaria": "culinaria-content",
  "/pesca": "pesca-content",
  "/ecoturismo": "ecoturismo-content",
  "/observacao-de-aves": "birdwatching-content",
  "/contato": "contato-content",
  "/nosso-impacto": "nosso-impacto-content",
  "/politica-de-privacidade": "privacidade-content",
  "/404": "not-found-content",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildGlobalData(route: string, data: any): Record<string, unknown> | null {
  switch (route) {
    case "/":
      return {
        aboutUs: {
          ...data.aboutUs,
          body: wrapStrings(data.aboutUs?.body),
        },
        expeditions: data.expeditions,
        stats: data.stats,
        accommodation: data.accommodation,
        impact: data.impact,
        blog: data.blog,
      };
    case "/acomodacoes":
      return {
        hero: data.hero,
        manifesto: data.manifesto,
        highlights: data.highlights,
        rooms: data.rooms,
        culinary: data.culinary,
      };
    case "/culinaria":
      return {
        hero: data.hero,
        manifesto: data.manifesto,
        menu: {
          ...data.menu,
          body: wrapStrings(data.menu?.body),
        },
        highlights: data.highlights,
        services: data.services,
        experience: {
          ...data.experience,
          body: wrapStrings(data.experience?.body),
        },
        crossSell: data.crossSell,
      };
    case "/pesca":
    case "/ecoturismo":
      return {
        hero: data.hero,
        manifesto: data.manifesto,
        sobreNos: {
          ...data.sobreNos,
          body: wrapStrings(data.sobreNos?.body),
        },
        highlights: data.highlights,
        services: data.services,
      };
    case "/observacao-de-aves":
      return {
        hero: data.hero,
        manifesto: data.manifesto,
        sobreNos: {
          ...data.sobreNos,
          body: wrapStrings(data.sobreNos?.body),
        },
        highlights: data.highlights,
      };
    case "/contato":
      return {
        hero: data.hero,
        formTitle: data.formTitle,
        steps: {
          ...data.steps,
          placeholders: wrapStrings(data.steps?.placeholders),
        },
        channels: data.channels,
        mapCoords: data.mapCoords,
      };
    case "/nosso-impacto":
      return {
        hero: data.hero,
        manifesto: data.manifesto,
        rioVivo: data.rioVivo,
        biodiversidade: data.biodiversidade,
        comunidade: {
          ...data.comunidade,
          body: wrapStrings(data.comunidade?.body),
        },
        operacao: data.operacao,
        engagement: data.engagement,
      };
    case "/politica-de-privacidade":
      return {
        hero: data.hero,
        sections: (data.sections ?? []).map((s: { id: string; title: string; content: string[] }) => ({
          id: s.id,
          title: s.title,
          content: wrapStrings(s.content),
        })),
      };
    case "/404":
      return {
        hero: data.hero,
        buttonText: data.buttonText,
      };
    default:
      return null;
  }
}

async function importPageGlobals(
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  const candidates = [
    resolve(process.cwd(), "..", "docs", "payload-seed", "page-content.json"),
    resolve(process.cwd(), "docs", "payload-seed", "page-content.json"),
  ];

  let raw: string | undefined;
  for (const candidate of candidates) {
    try {
      raw = await readFile(candidate, "utf8");
      break;
    } catch {
      // try next candidate
    }
  }

  if (!raw) {
    console.log("page-content.json nao encontrado, pulando importacao de globals de pagina.");
    return;
  }

  const allPages = JSON.parse(raw) as Record<string, unknown>;

  for (const [route, pageData] of Object.entries(allPages)) {
    const globalSlug = routeToGlobalSlug[route];
    if (!globalSlug) {
      console.log(`Rota ${route} nao tem global correspondente, pulando.`);
      continue;
    }

    const data = buildGlobalData(route, pageData);
    if (!data) continue;

    await payload.updateGlobal({
      slug: globalSlug,
      data,
      depth: 0,
      overrideAccess: true,
    });

    console.log(`Global ${globalSlug} populado com sucesso.`);
  }
}

async function importSharedSections(
  payload: Awaited<ReturnType<typeof getPayload>>,
  shared: SeedData["shared"],
) {
  if (!shared || typeof shared !== "object") {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = shared as any;
  const updateData: Record<string, unknown> = {
  };

  // CTA
  if (s.immersionCta) {
    updateData.ctaHeading = s.immersionCta.heading ?? "";
    updateData.ctaDescription = s.immersionCta.description ?? "";
    updateData.ctaBackgroundImage = s.immersionCta.backgroundImage ?? "";
  }

  // FAQ
  if (s.faq) {
    updateData.faqLabel = s.faq.label ?? "FAQ";
    updateData.faqHeading = s.faq.heading ?? "";
    updateData.faqDescription = s.faq.description ?? "";
    updateData.faqItems = (s.faq.items ?? []).map(
      (item: { question?: string; answer?: string }) => ({
        question: item.question ?? "",
        answer: item.answer ?? "",
      }),
    );
  }

  // Testimonials
  if (s.testimonials) {
    updateData.testimonialsLabel = s.testimonials.label ?? "Depoimentos";
    updateData.testimonialsHeading = s.testimonials.heading ?? "";
    updateData.testimonialsDescription = s.testimonials.description ?? "";
    updateData.testimonialItems = (s.testimonials.items ?? []).map(
      (item: {
        quote?: string;
        author?: string;
        location?: string;
        rating?: number;
      }) => ({
        quote: item.quote ?? "",
        author: item.author ?? "",
        location: item.location ?? "",
        rating: item.rating ?? 5,
      }),
    );
  }

  // Footer (seed uses `href`, Payload schema uses `url`)
  if (s.footer) {
    const mapLinks = (links: { label?: string; href?: string; url?: string }[]) =>
      (links ?? []).map((link) => ({
        label: link.label ?? "",
        url: link.href ?? link.url ?? "",
      }));
    updateData.footerPousadaLinks = mapLinks(s.footer.pousadaLinks);
    updateData.footerExperienciasLinks = mapLinks(s.footer.experienciasLinks);
    updateData.footerLegalLinks = mapLinks(s.footer.legalLinks);
    updateData.footerCopyright = s.footer.copyright ?? "";
  }

  await payload.updateGlobal({
    slug: "site-settings",
    data: updateData,
    depth: 0,
    overrideAccess: true,
  });

  console.log("SiteSettings structured fields populated.");
}

async function main() {
  const seed = await readSeed();
  const payload = await getPayload({ config });

  await importBlog(payload, seed.blog);
  await importBirdwatching(payload, seed.birdwatching);
  await importPages(payload, seed.pages.routes);
  await importSharedSections(payload, seed.shared);
  await importPageGlobals(payload);

  console.log("Seed importado para o Payload com sucesso.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
