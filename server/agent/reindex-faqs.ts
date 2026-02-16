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

function toCmsFaqItems(shared: Record<string, unknown> | undefined): CmsFaqItem[] {
  const faq = shared?.faq as Record<string, unknown> | undefined;
  const items = Array.isArray(faq?.items) ? faq.items : [];

  return items
    .map((item, index) => {
      const rec = item as Record<string, unknown>;
      const question = typeof rec.question === "string" ? rec.question.trim() : "";
      const answer = typeof rec.answer === "string" ? rec.answer.trim() : "";
      return {
        sourceDocId: `cms-shared-faq-${index + 1}`,
        question,
        answer,
        category: "geral",
        lang: "pt",
      };
    })
    .filter((item) => item.question.length > 0 && item.answer.length > 0);
}

export async function reindexFaqsFromCms(): Promise<{
  total: number;
  upserted: number;
  embedded: number;
  embeddingEnabled: boolean;
}> {
  if (!isDatabaseAvailable() || !db) {
    return {
      total: 0,
      upserted: 0,
      embedded: 0,
      embeddingEnabled: false,
    };
  }

  const { content } = await getCmsContent();
  const items = toCmsFaqItems(content.shared as Record<string, unknown> | undefined);
  const embeddingEnabled = isEmbeddingAvailable();

  let upserted = 0;
  let embedded = 0;

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
    total: items.length,
    upserted,
    embedded,
    embeddingEnabled,
  };
}
