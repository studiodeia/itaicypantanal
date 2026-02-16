import { tool } from "ai";
import { sql } from "drizzle-orm";
import { z } from "zod";
import { db, isDatabaseAvailable } from "../db";
import { getCmsContent } from "../cms-content";
import { faqs } from "../../shared/schema";
import type { AgentConfig } from "../../shared/agent-config";
import type { GroundingLevel, SourceRef } from "../../shared/chat-types";
import { generateQueryEmbedding, isEmbeddingAvailable } from "./embeddings";

type FaqCandidate = {
  id: string;
  sourceDocId: string;
  question: string;
  answer: string;
  category: string;
  lang: string;
  sourceType: "faq" | "cms";
  retrievalMethod: "semantic" | "keyword";
};

type RankedCandidate = FaqCandidate & { score: number };

type SemanticRow = {
  id: string;
  source_doc_id: string | null;
  question: string;
  answer: string;
  category: string;
  lang: string;
  distance: number | string | null;
};

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string): string[] {
  return normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 2);
}

function computeTokenOverlapScore(query: string, text: string): number {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return 0;

  const textTokens = tokenize(text);
  const matches = queryTokens.filter((queryToken) =>
    textTokens.some(
      (textToken) =>
        textToken === queryToken ||
        textToken.startsWith(queryToken) ||
        queryToken.startsWith(textToken),
    ),
  ).length;
  return matches / queryTokens.length;
}

function computeKeywordScore(query: string, candidate: FaqCandidate): number {
  const normalizedQuery = normalizeText(query);
  const haystack = normalizeText(`${candidate.question} ${candidate.answer}`);
  const questionScore = computeTokenOverlapScore(query, candidate.question);
  const answerScore = computeTokenOverlapScore(query, candidate.answer);
  const exactPhraseBoost = haystack.includes(normalizedQuery) ? 0.25 : 0;
  const categoryBoost = haystack.includes(candidate.category.toLowerCase()) ? 0.05 : 0;

  const score = questionScore * 0.55 + answerScore * 0.35 + exactPhraseBoost + categoryBoost;
  return Math.min(1, Number(score.toFixed(4)));
}

function determineGroundingLevel(
  confidenceScore: number,
  threshold: number,
  hasSources: boolean,
): GroundingLevel {
  if (!hasSources) return "none";
  if (confidenceScore >= threshold) return "full";
  if (confidenceScore >= threshold * 0.7) return "partial";
  return "none";
}

function toSourceRefs(rows: RankedCandidate[]): SourceRef[] {
  return rows.map((row) => ({
    source_id: row.sourceDocId,
    source_type: row.sourceType === "faq" ? "faq" : "cms",
    title: row.question,
    score: row.score,
  }));
}

function dedupeCandidates(candidates: FaqCandidate[]): FaqCandidate[] {
  const seen = new Set<string>();
  const output: FaqCandidate[] = [];

  for (const candidate of candidates) {
    const key = `${candidate.sourceDocId}:${candidate.lang}`;
    if (seen.has(key)) continue;
    seen.add(key);
    output.push(candidate);
  }

  return output;
}

async function searchFaqsBySemanticVector(
  query: string,
  lang: string,
  topK: number,
): Promise<RankedCandidate[]> {
  if (!isDatabaseAvailable() || !db || !isEmbeddingAvailable()) {
    return [];
  }

  const queryEmbedding = await generateQueryEmbedding(query);
  if (!queryEmbedding || queryEmbedding.length === 0) {
    return [];
  }

  const vectorLiteral = `[${queryEmbedding.map((value) => Number(value).toFixed(8)).join(",")}]`;

  try {
    const rawResult = (await db.execute(sql`
      SELECT
        id::text AS id,
        source_doc_id,
        question,
        answer,
        category,
        lang,
        (embedding <=> ${vectorLiteral}::vector) AS distance
      FROM faqs
      WHERE embedding IS NOT NULL
        AND (lang = ${lang} OR lang = 'pt')
      ORDER BY embedding <=> ${vectorLiteral}::vector
      LIMIT ${topK}
    `)) as unknown;

    const rows = Array.isArray(rawResult)
      ? (rawResult as SemanticRow[])
      : (((rawResult as { rows?: SemanticRow[] }).rows ?? []) as SemanticRow[]);

    return rows
      .map((row) => {
        const distance =
          typeof row.distance === "number"
            ? row.distance
            : Number.parseFloat(String(row.distance ?? "1"));
        const score = Number.isFinite(distance)
          ? Math.max(0, Math.min(1, Number((1 - distance).toFixed(4))))
          : 0;

        return {
          id: row.id,
          sourceDocId: row.source_doc_id ?? row.id,
          question: row.question,
          answer: row.answer,
          category: row.category,
          lang: row.lang,
          sourceType: "faq" as const,
          retrievalMethod: "semantic" as const,
          score,
        };
      })
      .filter((row) => row.score > 0);
  } catch {
    return [];
  }
}

async function loadFaqCandidates(lang: string): Promise<FaqCandidate[]> {
  if (isDatabaseAvailable() && db) {
    const rows = await db
      .select({
        id: faqs.id,
        sourceDocId: faqs.sourceDocId,
        question: faqs.question,
        answer: faqs.answer,
        category: faqs.category,
        lang: faqs.lang,
      })
      .from(faqs)
      .limit(500);

    const filtered = rows.filter((row) => row.lang === lang || row.lang === "pt");
    if (filtered.length > 0) {
      return filtered.map((row) => ({
        id: row.id,
        sourceDocId: row.sourceDocId ?? row.id,
        question: row.question,
        answer: row.answer,
        category: row.category,
        lang: row.lang,
        sourceType: "faq",
        retrievalMethod: "keyword",
      }));
    }
  }

  const { content } = await getCmsContent();
  const sharedFaq = (content.shared as Record<string, unknown> | undefined)?.faq as
    | Record<string, unknown>
    | undefined;
  const items = Array.isArray(sharedFaq?.items) ? sharedFaq.items : [];

  return items
    .map((item, index) => {
      const rec = item as Record<string, unknown>;
      const question = typeof rec.question === "string" ? rec.question : "";
      const answer = typeof rec.answer === "string" ? rec.answer : "";
      return {
        id: `cms-faq-${index + 1}`,
        sourceDocId: `cms-shared-faq-${index + 1}`,
        question,
        answer,
        category: "geral",
        lang: "pt",
        sourceType: "cms" as const,
        retrievalMethod: "keyword" as const,
      };
    })
    .filter((row) => row.question.length > 0 && row.answer.length > 0);
}

function buildConfigFallbackCandidates(config: AgentConfig): FaqCandidate[] {
  return [
    {
      id: "config-faq-reserva",
      sourceDocId: "config-faq-reserva",
      question: "Como faco uma reserva?",
      answer: `Voce pode iniciar sua reserva no motor oficial: ${config.bookingEngineUrl}`,
      category: "reserva",
      lang: "pt",
      sourceType: "cms",
      retrievalMethod: "keyword",
    },
    {
      id: "config-faq-contato",
      sourceDocId: "config-faq-contato",
      question: "Quais canais de contato estao disponiveis?",
      answer: `WhatsApp: ${config.handoff.whatsapp}. Telefone: ${config.handoff.emergencyPhone}. Email: ${config.handoff.email}.`,
      category: "contato",
      lang: "pt",
      sourceType: "cms",
      retrievalMethod: "keyword",
    },
    {
      id: "config-faq-horario",
      sourceDocId: "config-faq-horario",
      question: "Qual o horario de atendimento humano?",
      answer: `Nosso horario de atendimento e ${config.handoff.serviceHours}.`,
      category: "contato",
      lang: "pt",
      sourceType: "cms",
      retrievalMethod: "keyword",
    },
  ];
}

function rankByKeyword(
  query: string,
  candidates: FaqCandidate[],
  topK: number,
): RankedCandidate[] {
  return candidates
    .map((candidate) => ({
      ...candidate,
      score: computeKeywordScore(query, candidate),
    }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

export function createSearchFaqTool(config: AgentConfig) {
  return tool({
    description:
      "Busca respostas de FAQ/politicas no conhecimento oficial da Itaicy com ranking semantico (pgvector) e fallback keyword.",
    inputSchema: z.object({
      query: z.string().min(2),
      lang: z.enum(["pt", "en", "es"]).default("pt"),
      topK: z.number().int().min(1).max(5).default(3),
    }),
    execute: async ({ query, lang, topK }) => {
      const threshold = config.retrieval.faqConfidenceThreshold;

      const semanticRanked = await searchFaqsBySemanticVector(query, lang, topK);
      const keywordCandidates = dedupeCandidates([
        ...(await loadFaqCandidates(lang)),
        ...buildConfigFallbackCandidates(config),
      ]);
      const keywordRanked = rankByKeyword(query, keywordCandidates, topK);

      const ranked = semanticRanked.length > 0 ? semanticRanked : keywordRanked;
      const retrievalMethod = semanticRanked.length > 0 ? "semantic" : "keyword";

      const top = ranked[0];
      const confidenceScore = top?.score ?? 0;
      const minSourceScore = Math.max(0.2, threshold * 0.4);
      const groundedRows = ranked.filter((row) => row.score >= minSourceScore);
      const sourceRefs = toSourceRefs(groundedRows);
      const groundingLevel = determineGroundingLevel(
        confidenceScore,
        threshold,
        sourceRefs.length > 0,
      );
      const shouldHandoff = confidenceScore < threshold || sourceRefs.length === 0;

      return {
        query,
        threshold,
        retrievalMethod,
        confidenceScore,
        groundingLevel,
        shouldHandoff,
        sourceRefs,
        answer: top?.answer ?? null,
        results: ranked.map((row) => ({
          id: row.id,
          sourceDocId: row.sourceDocId,
          question: row.question,
          answer: row.answer,
          category: row.category,
          lang: row.lang,
          score: row.score,
          sourceType: row.sourceType,
          retrievalMethod: row.retrievalMethod,
        })),
      };
    },
  });
}
