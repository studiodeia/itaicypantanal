import { anthropic, createAnthropic } from "@ai-sdk/anthropic";
import { openai, createOpenAI } from "@ai-sdk/openai";
import type { VisitorIntent } from "./conversation-profile";

export const AGENT_DEFAULT_MODEL_OPENAI = "gpt-5-mini";
export const AGENT_DEFAULT_MODEL_ANTHROPIC = "claude-3-5-sonnet-latest";

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

/**
 * Intents that are safe for a lighter, cheaper model (no tool-calling complexity).
 * When AGENT_MODEL_LITE is set, these intents use the lite model.
 */
const LITE_MODEL_INTENTS = new Set<string>(["general", "policy"]);

export function getAgentModel(intent: VisitorIntent = "general") {
  const liteModel = (process.env.AGENT_MODEL_LITE || "").trim();
  const requestedModel =
    liteModel && LITE_MODEL_INTENTS.has(intent)
      ? liteModel
      : (process.env.AGENT_MODEL || "").trim();
  const providerPreference = (process.env.AGENT_PROVIDER || "auto").trim().toLowerCase();
  const hasOpenAi = Boolean(process.env.OPENAI_API_KEY?.trim());
  const hasAnthropic = Boolean(process.env.ANTHROPIC_API_KEY?.trim());

  const preferAnthropicByModel = requestedModel.startsWith("claude");
  const preferOpenAiByModel =
    requestedModel.startsWith("gpt") || requestedModel.startsWith("o");

  if (providerPreference === "anthropic") {
    if (!hasAnthropic) {
      throw new Error("LLM provider anthropic selected but ANTHROPIC_API_KEY is missing.");
    }
    const provider = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    return provider(requestedModel || AGENT_DEFAULT_MODEL_ANTHROPIC);
  }

  if (providerPreference === "openai") {
    if (!hasOpenAi) {
      throw new Error("LLM provider openai selected but OPENAI_API_KEY is missing.");
    }
    const provider = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    return provider(requestedModel || AGENT_DEFAULT_MODEL_OPENAI);
  }

  // auto
  if (preferAnthropicByModel && hasAnthropic) {
    const provider = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    return provider(requestedModel);
  }

  if (preferOpenAiByModel && hasOpenAi) {
    const provider = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    return provider(requestedModel);
  }

  if (hasOpenAi) {
    const provider = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    return provider(requestedModel || AGENT_DEFAULT_MODEL_OPENAI);
  }

  if (hasAnthropic) {
    const provider = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    return provider(requestedModel || AGENT_DEFAULT_MODEL_ANTHROPIC);
  }

  throw new Error(
    "No LLM API key configured. Set OPENAI_API_KEY or ANTHROPIC_API_KEY.",
  );
}
