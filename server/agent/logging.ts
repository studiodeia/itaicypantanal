import { db, isDatabaseAvailable } from "../db";
import { agentLogs } from "../../shared/schema";
import type { GroundingLevel, SourceRef } from "../../shared/chat-types";

type AgentLogInsert = {
  sessionId: string;
  intent?: string | null;
  toolUsed?: string | null;
  promptVersionHash?: string | null;
  inputSummary?: string | null;
  outputSummary?: string | null;
  latencyMs?: number | null;
  confidenceScore?: number | null;
  groundingLevel?: GroundingLevel;
  sourceRefs?: SourceRef[];
  fallbackUsed?: boolean;
  status?: string;
  tokensIn?: number | null;
  tokensOut?: number | null;
};

export async function writeAgentLog(entry: AgentLogInsert): Promise<void> {
  if (!isDatabaseAvailable() || !db) return;

  try {
    await db.insert(agentLogs).values({
      sessionId: entry.sessionId,
      intent: entry.intent ?? null,
      toolUsed: entry.toolUsed ?? null,
      promptVersionHash: entry.promptVersionHash ?? null,
      inputSummary: entry.inputSummary ?? null,
      outputSummary: entry.outputSummary ?? null,
      latencyMs: entry.latencyMs ?? null,
      confidenceScore: entry.confidenceScore ?? null,
      groundingLevel: entry.groundingLevel ?? "none",
      sourceRefs: entry.sourceRefs ?? [],
      fallbackUsed: entry.fallbackUsed ?? false,
      status: entry.status ?? "success",
      tokensIn: entry.tokensIn ?? null,
      tokensOut: entry.tokensOut ?? null,
    });
  } catch (err) {
    console.error("[agent-log] Failed to write log:", (err as Error).message);
  }
}
