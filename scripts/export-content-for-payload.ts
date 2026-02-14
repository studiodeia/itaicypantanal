import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import {
  allArticles,
  categories as blogCategories,
  featuredArticle,
  getArticleBySlug,
  recentArticles,
  type BlogArticle,
  type BlogArticleDetail,
} from "../client/src/pages/blog/data";
import {
  allBirds,
  categories as birdCategories,
  featuredBirds,
  getBirdBySlug,
  type BirdSpecies,
  type BirdSpeciesDetail,
} from "../client/src/pages/birdwatching/data";
import { defaultSharedCmsSections } from "../shared/cms-shared-content";

type ExportMode = "dry-run" | "write";

function uniqueBySlug<T extends { slug: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

function collectArticleDetails(articles: BlogArticle[]): BlogArticleDetail[] {
  return articles
    .map((article) => getArticleBySlug(article.slug))
    .filter((article): article is BlogArticleDetail => Boolean(article));
}

function collectBirdDetails(species: BirdSpecies[]): BirdSpeciesDetail[] {
  return species
    .map((bird) => getBirdBySlug(bird.slug))
    .filter((bird): bird is BirdSpeciesDetail => Boolean(bird));
}

function validateRelations(
  articles: BlogArticle[],
  articleDetails: BlogArticleDetail[],
  birds: BirdSpecies[],
  birdDetails: BirdSpeciesDetail[],
): string[] {
  const errors: string[] = [];

  const articleSlugs = new Set(articles.map((a) => a.slug));
  const birdSlugs = new Set(birds.map((b) => b.slug));

  for (const detail of articleDetails) {
    for (const relatedSlug of detail.relatedSlugs) {
      if (!articleSlugs.has(relatedSlug)) {
        errors.push(
          `[blog] related slug "${relatedSlug}" ausente para "${detail.slug}"`,
        );
      }
    }
  }

  for (const detail of birdDetails) {
    for (const relatedSlug of detail.relatedSlugs) {
      if (!birdSlugs.has(relatedSlug)) {
        errors.push(
          `[birds] related slug "${relatedSlug}" ausente para "${detail.slug}"`,
        );
      }
    }
  }

  return errors;
}

function buildPayloadSeed() {
  const normalizedBlogCategories = blogCategories.filter(
    (name) => name !== "Todas",
  );
  const normalizedBirdCategories = birdCategories.filter(
    (name) => name !== "Todas",
  );

  const allBlogPosts = uniqueBySlug([
    featuredArticle,
    ...recentArticles,
    ...allArticles,
  ]);
  const allSpecies = uniqueBySlug([...allBirds]);
  const articleDetails = collectArticleDetails(allBlogPosts);
  const speciesDetails = collectBirdDetails(allSpecies);

  const relationErrors = validateRelations(
    allBlogPosts,
    articleDetails,
    allSpecies,
    speciesDetails,
  );
  if (relationErrors.length > 0) {
    throw new Error(
      `Falha de validacao de relacoes:\n- ${relationErrors.join("\n- ")}`,
    );
  }

  return {
    generatedAt: new Date().toISOString(),
    notes: {
      source:
        "Conteudo exportado do frontend atual para seed inicial do Payload CMS.",
      strategy:
        "Manter dados atuais como fallback; usar este seed para popular o CMS com paridade.",
    },
    blog: {
      categories: normalizedBlogCategories,
      posts: allBlogPosts,
      details: articleDetails,
      featuredSlug: featuredArticle.slug,
      recentSlugs: recentArticles.map((a) => a.slug),
    },
    birdwatching: {
      categories: normalizedBirdCategories,
      species: allSpecies,
      details: speciesDetails,
      featuredSlugs: featuredBirds.map((b) => b.slug),
    },
    shared: defaultSharedCmsSections,
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

async function writeSeed(seed: ReturnType<typeof buildPayloadSeed>) {
  const outputDir = resolve(process.cwd(), "docs", "payload-seed");
  await mkdir(outputDir, { recursive: true });

  await writeFile(
    resolve(outputDir, "full-seed.json"),
    `${JSON.stringify(seed, null, 2)}\n`,
    "utf8",
  );
  await writeFile(
    resolve(outputDir, "blog-posts.json"),
    `${JSON.stringify(seed.blog, null, 2)}\n`,
    "utf8",
  );
  await writeFile(
    resolve(outputDir, "bird-species.json"),
    `${JSON.stringify(seed.birdwatching, null, 2)}\n`,
    "utf8",
  );
  await writeFile(
    resolve(outputDir, "shared-content.json"),
    `${JSON.stringify(seed.shared, null, 2)}\n`,
    "utf8",
  );
  await writeFile(
    resolve(outputDir, "routes.json"),
    `${JSON.stringify(seed.pages, null, 2)}\n`,
    "utf8",
  );
}

async function main() {
  const mode: ExportMode = process.argv.includes("--write")
    ? "write"
    : "dry-run";

  const seed = buildPayloadSeed();

  if (mode === "write") {
    await writeSeed(seed);
    console.log("Seed gerado em docs/payload-seed/");
    return;
  }

  console.log(
    JSON.stringify(
      {
        mode,
        summary: {
          blogCategories: seed.blog.categories.length,
          blogPosts: seed.blog.posts.length,
          blogDetails: seed.blog.details.length,
          birdCategories: seed.birdwatching.categories.length,
          birdSpecies: seed.birdwatching.species.length,
          birdDetails: seed.birdwatching.details.length,
          sharedSections: Object.keys(seed.shared).length,
          routes: seed.pages.routes.length,
        },
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
