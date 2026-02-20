/**
 * Importa traduções (EN e ES) do Editorial Batch 1 para o Payload CMS.
 *
 * Uso:
 *   cd payload-cms
 *   npx tsx src/scripts/importEditorialBatch1Translations.ts
 *
 * Arquivos de dados:
 *   docs/payload-seed/editorial-batch-1-en.json
 *   docs/payload-seed/editorial-batch-1-es.json
 */
import "dotenv/config";

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { getPayload } from "payload";

import config from "../payload.config";

// ─── Types ────────────────────────────────────────────────────────────────────

type TranslationPost = {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  tag?: string;
  content?: unknown[];
};

type TranslationBatch = {
  locale: string;
  posts: TranslationPost[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function resolveTranslationPath(locale: string): Promise<string> {
  const candidates = [
    resolve(process.cwd(), "..", "docs", "payload-seed", `editorial-batch-1-${locale}.json`),
    resolve(process.cwd(), "docs", "payload-seed", `editorial-batch-1-${locale}.json`),
  ];

  for (const candidate of candidates) {
    try {
      await readFile(candidate, "utf8");
      return candidate;
    } catch {
      // try next
    }
  }

  throw new Error(`Arquivo editorial-batch-1-${locale}.json não encontrado. Verifique docs/payload-seed/`);
}

async function importLocale(
  payload: Awaited<ReturnType<typeof getPayload>>,
  batch: TranslationBatch,
) {
  const locale = batch.locale as "en" | "es";
  console.log(`\n🌐 Importando locale: ${locale.toUpperCase()}`);

  for (const post of batch.posts) {
    // Find the existing post by slug (slug is not localized)
    const existing = await payload.find({
      collection: "blog-posts",
      where: { slug: { equals: post.slug } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });

    if (existing.docs.length === 0) {
      console.log(`  ⚠ Artigo não encontrado: ${post.slug} — execute importEditorialBatch1.ts primeiro`);
      continue;
    }

    const docId = existing.docs[0].id;

    const contentBlocks = (post.content ?? []).map((block) => {
      const b = block as Record<string, unknown>;
      return { blockType: b.type, ...b, type: undefined };
    });

    await payload.update({
      collection: "blog-posts",
      id: docId,
      locale,
      data: {
        title: post.title,
        subtitle: post.subtitle ?? "",
        description: post.description ?? "",
        tag: post.tag ?? "",
        contentBlocks,
      },
      depth: 0,
      overrideAccess: true,
    });

    console.log(`  ✓ [${locale}] ${post.slug}`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const payload = await getPayload({ config });

  for (const locale of ["en", "es"]) {
    const filePath = await resolveTranslationPath(locale);
    const raw = await readFile(filePath, "utf8");
    const batch = JSON.parse(raw) as TranslationBatch;
    await importLocale(payload, batch);
  }

  console.log("\n✅ Traduções do Editorial Batch 1 importadas com sucesso!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
