import type { Request, Response } from "express";
import { ToolLoopAgent, stepCountIs } from "ai";
import { randomUUID } from "node:crypto";
import {
  chatRequestSchema,
  type ChatSseEvent,
  type GroundingLevel,
  type SourceRef,
} from "../../shared/chat-types";
import { getCmsAgentConfig } from "../cms-content";
import {
  getAgentFirstTokenDelayMs,
  getAgentGenerationConfig,
  getAgentModel,
} from "./config";
import { buildAgentSystemPrompt } from "./instructions";
import { createSearchFaqTool } from "./search-faq";
import { writeAgentLog } from "./logging";
import { enforceChatRateLimit } from "./chat-rate-limit";
import { createCheckAvailabilityTool } from "./check-availability";
import { createGetRatesTool } from "./get-rates";
import { detectVisitorIntent } from "./conversation-profile";

function detectLocale(message: string): "pt" | "en" | "es" {
  const normalized = message.toLowerCase();
  if (/\b(hola|quiero|disponibilidad|reserva|precio)\b/.test(normalized)) {
    return "es";
  }
  if (/\b(hello|booking|availability|rate|price|reservation)\b/.test(normalized)) {
    return "en";
  }
  return "pt";
}

function sseWrite(res: Response, event: ChatSseEvent) {
  res.write(`event: ${event.event}\n`);
  res.write(`data: ${JSON.stringify(event)}\n\n`);
}

function mapErrorCode(error: unknown): {
  code: "bad_request" | "rate_limited" | "upstream_unavailable" | "internal";
  message: string;
  retryable: boolean;
} {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const lower = message.toLowerCase();

  if (lower.includes("no output generated")) {
    return {
      code: "internal",
      message: "Nao consegui concluir essa resposta agora. Tente reformular a pergunta.",
      retryable: true,
    };
  }

  if (lower.includes("429") || lower.includes("rate limit")) {
    return { code: "rate_limited", message, retryable: true };
  }
  if (
    lower.includes("timeout") ||
    lower.includes("network") ||
    lower.includes("upstream") ||
    lower.includes("unavailable")
  ) {
    return { code: "upstream_unavailable", message, retryable: true };
  }

  return { code: "internal", message, retryable: false };
}

async function wait(ms: number): Promise<void> {
  if (ms <= 0) return;
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function handleChatRequest(req: Request, res: Response) {
  const payloadSize = Buffer.byteLength(JSON.stringify(req.body ?? {}), "utf8");
  if (payloadSize > 20_000) {
    const event: ChatSseEvent = {
      event: "error",
      code: "bad_request",
      message: "Payload excede o limite permitido para /api/chat.",
      retryable: false,
    };
    res.status(400).json(event);
    return;
  }

  const parsed = chatRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    const event: ChatSseEvent = {
      event: "error",
      code: "bad_request",
      message: "Payload invalido para /api/chat.",
      retryable: false,
    };
    res.status(400).json(event);
    return;
  }

  const startedAt = Date.now();
  const { message, session_id, lang } = parsed.data;
  const sessionId = session_id ?? randomUUID();
  const locale = lang ?? detectLocale(message);
  const intent = detectVisitorIntent(message);

  const rateLimit = await enforceChatRateLimit(req, sessionId);
  if (!rateLimit.allowed) {
    res.setHeader("Retry-After", String(rateLimit.retryAfterSec));
    const event: ChatSseEvent = {
      event: "error",
      code: "rate_limited",
      message: "Limite de mensagens atingido. Tente novamente em instantes.",
      retryable: true,
    };

    await writeAgentLog({
      sessionId,
      intent,
      toolUsed: null,
      inputSummary: message.slice(0, 400),
      outputSummary: null,
      latencyMs: Date.now() - startedAt,
      fallbackUsed: true,
      status: "rate_limited",
      groundingLevel: "none",
      sourceRefs: [],
    });

    res.status(429).json(event);
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-RateLimit-Limit", String(rateLimit.limit));
  res.setHeader("X-RateLimit-Remaining", String(rateLimit.remaining));
  res.flushHeaders();

  let generatedText = "";
  let lastTool: string | null = null;
  let confidenceScore: number | undefined;
  let groundingLevel: GroundingLevel = "none";
  let sourceRefs: SourceRef[] = [];
  let fallbackUsed = false;
  const firstTokenDelayMs = getAgentFirstTokenDelayMs(intent);

  try {
    const { config } = await getCmsAgentConfig();
    const { prompt, promptVersionHash } = buildAgentSystemPrompt(config, locale, intent);
    const generationConfig = getAgentGenerationConfig(intent);
    const searchFAQ = createSearchFaqTool(config);
    const checkAvailability = createCheckAvailabilityTool(config);
    const getRates = createGetRatesTool(config);

    const agent = new ToolLoopAgent({
      model: getAgentModel(),
      instructions: prompt,
      tools: {
        searchFAQ,
        checkAvailability,
        getRates,
      },
      ...generationConfig,
      stopWhen: stepCountIs(6),
    });

    const streamResult = await agent.stream({
      prompt: message,
    });

    for await (const part of streamResult.fullStream) {
      switch (part.type) {
        case "text-delta": {
          if (generatedText.length === 0) {
            await wait(firstTokenDelayMs);
          }
          generatedText += part.text;
          sseWrite(res, {
            event: "token",
            text: part.text,
          });
          break;
        }
        case "tool-call": {
          lastTool = part.toolName;
          sseWrite(res, {
            event: "tool_start",
            tool: part.toolName,
            input:
              part.input && typeof part.input === "object"
                ? (part.input as Record<string, unknown>)
                : undefined,
          });
          break;
        }
        case "tool-result": {
          const output =
            part.output && typeof part.output === "object"
              ? (part.output as Record<string, unknown>)
              : {};

          const toolConfidence =
            typeof output.confidenceScore === "number" ? output.confidenceScore : undefined;
          const toolGrounding =
            output.groundingLevel === "full" ||
            output.groundingLevel === "partial" ||
            output.groundingLevel === "none"
              ? (output.groundingLevel as GroundingLevel)
              : undefined;
          const refs = Array.isArray(output.sourceRefs)
            ? (output.sourceRefs as SourceRef[])
            : undefined;

          if (toolConfidence !== undefined) confidenceScore = toolConfidence;
          if (toolGrounding) groundingLevel = toolGrounding;
          if (refs) sourceRefs = refs;
          if (output.shouldHandoff === true) fallbackUsed = true;

          sseWrite(res, {
            event: "tool_end",
            tool: part.toolName,
            status: "success",
            confidence_score: toolConfidence,
            grounding_level: toolGrounding,
            source_refs: refs,
            output_summary:
              typeof output.answer === "string" ? output.answer.slice(0, 300) : undefined,
          });
          break;
        }
        case "tool-error": {
          fallbackUsed = true;
          sseWrite(res, {
            event: "tool_end",
            tool: part.toolName,
            status: "error",
            error: String(part.error),
          });
          break;
        }
        case "error": {
          fallbackUsed = true;
          const mapped = mapErrorCode(part.error);
          sseWrite(res, {
            event: "error",
            code: mapped.code,
            message: mapped.message,
            retryable: mapped.retryable,
          });
          break;
        }
        default:
          break;
      }
    }

    if (generatedText.trim().length === 0) {
      fallbackUsed = true;
      generatedText = `${config.fallback.genericError.pt} Se preferir, posso direcionar para nossa equipe.`;
      sseWrite(res, {
        event: "token",
        text: generatedText,
      });
    }

    const usage = await streamResult.totalUsage;
    const latencyMs = Date.now() - startedAt;

    await writeAgentLog({
      sessionId,
      intent,
      toolUsed: lastTool,
      promptVersionHash,
      inputSummary: message.slice(0, 400),
      outputSummary: generatedText.slice(0, 1000),
      latencyMs,
      confidenceScore: confidenceScore ?? null,
      groundingLevel,
      sourceRefs,
      fallbackUsed,
      status: fallbackUsed ? "fallback" : "success",
      tokensIn: usage.inputTokens ?? null,
      tokensOut: usage.outputTokens ?? null,
    });

    sseWrite(res, {
      event: "done",
      session_id: sessionId,
      confidence_score: confidenceScore,
      source_refs: sourceRefs,
      grounding_level: groundingLevel,
    });
  } catch (error) {
    const mapped = mapErrorCode(error);
    sseWrite(res, {
      event: "error",
      code: mapped.code,
      message: mapped.message,
      retryable: mapped.retryable,
    });

    await writeAgentLog({
      sessionId,
      intent,
      inputSummary: message.slice(0, 400),
      outputSummary: null,
      latencyMs: Date.now() - startedAt,
      groundingLevel: "none",
      sourceRefs: [],
      fallbackUsed: true,
      status: "error",
    });
  } finally {
    res.end();
  }
}
