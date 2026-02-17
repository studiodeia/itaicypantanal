import { openai, createOpenAI } from "@ai-sdk/openai";
import type { VisitorIntent } from "./conversation-profile";

export const AGENT_DEFAULT_MODEL = "gpt-5-mini";

function parseNumber(
  value: string | undefined,
  fallback: number,
  min: number,
  max: number,
): number {
  if (typeof value !== "string") return fallback;
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) return fallback;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}

export function getAgentGenerationConfig(intent: VisitorIntent = "general") {
  const defaultMax = Math.trunc(
    parseNumber(process.env.AGENT_MAX_OUTPUT_TOKENS, 900, 128, 4096),
  );

  const commercialMax = Math.trunc(
    parseNumber(process.env.AGENT_MAX_OUTPUT_TOKENS_COMMERCIAL, 540, 128, 4096),
  );

  const policyMax = Math.trunc(
    parseNumber(process.env.AGENT_MAX_OUTPUT_TOKENS_POLICY, 620, 128, 4096),
  );

  const maxOutputTokens =
    intent === "availability" || intent === "rates"
      ? Math.min(defaultMax, commercialMax)
      : intent === "policy"
        ? Math.min(defaultMax, policyMax)
        : defaultMax;

  return {
    temperature: parseNumber(process.env.AGENT_TEMPERATURE, 0.35, 0, 1),
    maxOutputTokens,
  } as const;
}

export function getAgentFirstTokenDelayMs(intent: VisitorIntent = "general"): number {
  const fallback =
    intent === "availability" || intent === "rates"
      ? 280
      : intent === "policy"
        ? 240
        : 200;

  return Math.trunc(
    parseNumber(process.env.AGENT_FIRST_TOKEN_DELAY_MS, fallback, 0, 3000),
  );
}

export function getAgentModel() {
  const modelId = process.env.AGENT_MODEL || AGENT_DEFAULT_MODEL;

  if (process.env.OPENAI_API_KEY) {
    const provider = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    return provider(modelId);
  }

  return openai(modelId);
}
