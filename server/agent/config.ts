import { anthropic, createAnthropic } from "@ai-sdk/anthropic";

export const AGENT_DEFAULT_MODEL = "claude-3-5-haiku-latest";

export const agentGenerationConfig = {
  temperature: 0.2,
  maxOutputTokens: 800,
} as const;

export function getAgentModel() {
  const modelId = process.env.AGENT_MODEL || AGENT_DEFAULT_MODEL;

  if (process.env.ANTHROPIC_API_KEY) {
    const provider = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    return provider(modelId);
  }

  return anthropic(modelId);
}
