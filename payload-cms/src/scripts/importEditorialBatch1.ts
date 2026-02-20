/**
 * Importa o Editorial Batch 1 (5 artigos prioritários do plano editorial 2026)
 * para o Payload CMS.
 *
 * Uso:
 *   cd payload-cms
 *   npx tsx src/scripts/importEditorialBatch1.ts
 *
 * Arquivo de dados: docs/payload-seed/editorial-batch-1.json
 */
import "dotenv/config";

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { getPayload } from "payload";

import config from "../payload.config";

// ─── Types ────────────────────────────────────────────────────────────────────

type BatchPost = {
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
  isFeatured?: boolean;
  isRecent?: boolean;
};

type BatchDetail = {
  slug: string;
  heroImage?: string;
  content?: unknown[];
  relatedSlugs?: string[];
};

type BatchData = {
  categories: string[];
  posts: BatchPost[];
  details: BatchDetail[];
  featuredSlug: string;
  recentSlugs: string[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function upsertBySlug(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: string,
  slug: string,
  data: Record<string, unknown>,
) {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    console.log(`  ↻ Atualizando ${collection}/${slug}`);
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data,
      depth: 0,
      overrideAccess: true,
    });
  }

  console.log(`  + Criando ${collection}/${slug}`);
  return payload.create({
    collection,
    data,
    depth: 0,
    overrideAccess: true,
  });
}

// ─── Seed resolution ──────────────────────────────────────────────────────────

async function resolveBatchPath(): Promise<string> {
  const candidates = [
    resolve(process.cwd(), "seed-data", "editorial-batch-1.json"),
    resolve(process.cwd(), "..", "docs", "payload-seed", "editorial-batch-1.json"),
    resolve(process.cwd(), "docs", "payload-seed", "editorial-batch-1.json"),
  ];

  for (const candidate of candidates) {
    try {
      await readFile(candidate, "utf8");
      return candidate;
    } catch {
      // try next
    }
  }

  throw new Error("Arquivo editorial-batch-1.json não encontrado. Verifique docs/payload-seed/");
}

// ─── Main import ──────────────────────────────────────────────────────────────

export async function runImportEditorialBatch1(payload: Awaited<ReturnType<typeof getPayload>>) {
  const batchPath = await resolveBatchPath();
  const raw = await readFile(batchPath, "utf8");
  const batch = JSON.parse(raw) as BatchData;

  // 1. Upsert blog categories
  console.log("\n📂 Categorias do blog:");
  const categoryIdByName = new Map<string, string | number>();

  for (const categoryName of batch.categories) {
    const cat = await upsertBySlug(payload, "blog-categories", slugify(categoryName), {
      name: categoryName,
      slug: slugify(categoryName),
    });
    categoryIdByName.set(categoryName, cat.id);
  }

  // 2. Build detail lookup
  const detailsBySlug = new Map(batch.details.map((d) => [d.slug, d]));
  const postIdBySlug = new Map<string, string | number>();

  // 3. Upsert blog posts
  console.log("\n📝 Artigos do blog:");
  for (const post of batch.posts) {
    const detail = detailsBySlug.get(post.slug);
    const primaryCategoryId = post.primaryCategory
      ? categoryIdByName.get(post.primaryCategory)
      : undefined;
    const categoryIds = (post.categories ?? [])
      .map((name) => categoryIdByName.get(name))
      .filter((id): id is string | number => id !== undefined);

    const data: Record<string, unknown> = {
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
      isFeatured: post.slug === batch.featuredSlug,
      isRecent: batch.recentSlugs.includes(post.slug),
    };

    if (primaryCategoryId !== undefined) data.primaryCategory = primaryCategoryId;
    if (categoryIds.length > 0) data.categories = categoryIds;

    const created = await upsertBySlug(payload, "blog-posts", post.slug, data);
    postIdBySlug.set(post.slug, created.id);
  }

  // 4. Wire related posts (second pass)
  console.log("\n🔗 Relacionamentos:");
  for (const detail of batch.details) {
    const postId = postIdBySlug.get(detail.slug);
    if (!postId || !detail.relatedSlugs?.length) continue;

    const relatedIds = detail.relatedSlugs
      .map((slug) => postIdBySlug.get(slug))
      .filter((id): id is string | number => id !== undefined);

    if (relatedIds.length === 0) continue;

    await payload.update({
      collection: "blog-posts",
      id: postId,
      data: { relatedPosts: relatedIds },
      depth: 0,
      overrideAccess: true,
    });
    console.log(`  ↔ ${detail.slug} → ${detail.relatedSlugs.join(", ")}`);
  }

  console.log("\n✅ Editorial Batch 1 importado com sucesso!");
  console.log(`   ${batch.posts.length} artigos | ${batch.categories.length} categorias`);
}

async function main() {
  const payload = await getPayload({ config });
  await runImportEditorialBatch1(payload);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
