import { openai } from "@ai-sdk/openai";
import { embed } from "ai";

const EMBEDDING_MODEL = "text-embedding-3-small";
const EMBEDDING_CACHE_TTL_MS = 10 * 60 * 1000;

type CachedEmbedding = {
  expiresAt: number;
  vector: number[];
};

const embeddingCache = new Map<string, CachedEmbedding>();

export function isEmbeddingAvailable(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

function normalizeEmbeddingInput(value: string): string {
  return value.trim().replace(/\s+/g, " ").slice(0, 4000);
}

export async function generateQueryEmbedding(
  value: string,
): Promise<number[] | null> {
  if (!isEmbeddingAvailable()) {
    return null;
  }

  const normalizedValue = normalizeEmbeddingInput(value);
  if (!normalizedValue) return null;

  const cached = embeddingCache.get(normalizedValue);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.vector;
  }

  try {
    const { embedding } = await embed({
      model: openai.embedding(EMBEDDING_MODEL),
      value: normalizedValue,
    });

    embeddingCache.set(normalizedValue, {
      expiresAt: Date.now() + EMBEDDING_CACHE_TTL_MS,
      vector: embedding,
    });

    return embedding;
  } catch {
    return null;
  }
}
