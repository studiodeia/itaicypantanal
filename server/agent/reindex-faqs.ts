import { and, like, notInArray } from "drizzle-orm";
import { db, isDatabaseAvailable } from "../db";
import { getCmsContent } from "../cms-content";
import { faqs } from "../../shared/schema";
import { generateQueryEmbedding, isEmbeddingAvailable } from "./embeddings";

type CmsFaqItem = {
  sourceDocId: string;
  question: string;
  answer: string;
  category: string;
  lang: string;
};

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function resolveSourceDocId(item: Record<string, unknown>, index: number): string {
  if (typeof item.sourceDocId === "string" && item.sourceDocId.trim().length > 0) {
    return item.sourceDocId.trim();
  }
  if (typeof item.id === "string" && item.id.trim().length > 0) {
    return `cms-shared-faq-${item.id.trim()}`;
  }
  if (typeof item.question === "string" && item.question.trim().length > 0) {
    const slug = slugify(item.question).slice(0, 72);
    return `cms-shared-faq-${slug || index + 1}`;
  }
  return `cms-shared-faq-${index + 1}`;
}

function toCmsFaqItems(shared: Record<string, unknown> | undefined): CmsFaqItem[] {
  const faq = shared?.faq as Record<string, unknown> | undefined;
  const items = Array.isArray(faq?.items) ? faq.items : [];

  return items
    .map((item, index) => {
      const rec = item as Record<string, unknown>;
      const question = typeof rec.question === "string" ? rec.question.trim() : "";
      const answer = typeof rec.answer === "string" ? rec.answer.trim() : "";
      return {
        sourceDocId: resolveSourceDocId(rec, index),
        question,
        answer,
        category: "geral",
        lang: "pt",
      };
    })
    .filter((item) => item.question.length > 0 && item.answer.length > 0);
}

type ReindexFaqOptions = {
  sourceDocId?: string;
};

export async function reindexFaqsFromCms(): Promise<{
  mode: "full" | "incremental";
  sourceDocId?: string;
  total: number;
  upserted: number;
  embedded: number;
  embeddingEnabled: boolean;
}> {
  return reindexFaqsFromCmsWithOptions({});
}

export async function reindexFaqsFromCmsWithOptions(
  options: ReindexFaqOptions,
): Promise<{
  mode: "full" | "incremental";
  sourceDocId?: string;
  total: number;
  upserted: number;
  embedded: number;
  embeddingEnabled: boolean;
}> {
  if (!isDatabaseAvailable() || !db) {
    return {
      mode: options.sourceDocId ? "incremental" : "full",
      sourceDocId: options.sourceDocId,
      total: 0,
      upserted: 0,
      embedded: 0,
      embeddingEnabled: false,
    };
  }

  const { content } = await getCmsContent();
  const allItems = toCmsFaqItems(content.shared as Record<string, unknown> | undefined);
  const items = options.sourceDocId
    ? allItems.filter((item) => item.sourceDocId === options.sourceDocId)
    : allItems;
  const embeddingEnabled = isEmbeddingAvailable();

  let upserted = 0;
  let embedded = 0;

  if (!options.sourceDocId) {
    const sourceIds = items.map((item) => item.sourceDocId);
    if (sourceIds.length > 0) {
      await db
        .delete(faqs)
        .where(
          and(
            like(faqs.sourceDocId, "cms-shared-faq-%"),
            notInArray(faqs.sourceDocId, sourceIds),
          ),
        );
    }
  }

  for (const item of items) {
    const embedding = embeddingEnabled
      ? await generateQueryEmbedding(`${item.question}\n${item.answer}`)
      : null;

    if (embedding) embedded += 1;

    await db
      .insert(faqs)
      .values({
        question: item.question,
        answer: item.answer,
        category: item.category,
        lang: item.lang,
        sourceDocId: item.sourceDocId,
        embedding: embedding ? `[${embedding.join(",")}]` : null,
      })
      .onConflictDoUpdate({
        target: [faqs.sourceDocId, faqs.lang],
        set: {
          question: item.question,
          answer: item.answer,
          category: item.category,
          embedding: embedding ? `[${embedding.join(",")}]` : null,
          updatedAt: new Date(),
        },
      });

    upserted += 1;
  }

  return {
    mode: options.sourceDocId ? "incremental" : "full",
    sourceDocId: options.sourceDocId,
    total: items.length,
    upserted,
    embedded,
    embeddingEnabled,
  };
}
