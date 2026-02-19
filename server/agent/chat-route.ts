import type { Request, Response } from "express";
import { ToolLoopAgent, stepCountIs } from "ai";
import { randomUUID } from "node:crypto";

// Conversation turn shape compatible with AI SDK CoreMessage
type CoreMessage = { role: "user" | "assistant"; content: string };
import {
  chatRequestSchema,
  type ChatSseEvent,
  type ConversationMessage,
  type GroundingLevel,
  type SourceRef,
} from "../../shared/chat-types";
import { getCmsAgentConfig } from "../cms-content";
import {
  getAgentFirstTokenDelayMs,
  getAgentGenerationConfig,
  getAgentModel,
} from "./config";
import { buildAgentSystemPrompt, type ConversationSlots } from "./instructions";
import { createSearchFaqTool } from "./search-faq";
import { writeAgentLog } from "./logging";
import { redactPii } from "./redact";
import { enforceChatRateLimit } from "./chat-rate-limit";
import { createCheckAvailabilityTool } from "./check-availability";
import { createGetRatesTool } from "./get-rates";
import { createGetReservationTool } from "./get-reservation";
import {
  detectVisitorIntent,
  detectVisitorProfile,
  detectVisitorStage,
  type VisitorProfile,
} from "./conversation-profile";

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

/**
 * Infer session locale from conversation history.
 * Requires ≥2 user messages to lock; returns null if inconclusive.
 */
function detectLocaleFromHistory(
  history: ConversationMessage[],
): "pt" | "en" | "es" | null {
  const userMessages = history.filter((m) => m.role === "user");
  if (userMessages.length < 2) return null;
  const counts: Record<"pt" | "en" | "es", number> = { pt: 0, en: 0, es: 0 };
  for (const m of userMessages) {
    counts[detectLocale(m.content)] += 1;
  }
  const maxCount = Math.max(counts.pt, counts.en, counts.es);
  if (counts.es === maxCount && counts.es > 0) return "es";
  if (counts.en === maxCount && counts.en > 0) return "en";
  return "pt";
}

/** Returns today's date in the America/Sao_Paulo timezone. */
function todayInSaoPaulo(): Date {
  const saoPauloStr = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Sao_Paulo",
  });
  const [y, m, d] = saoPauloStr.split("-").map(Number);
  return new Date(y!, m! - 1, d!);
}

function sseWrite(res: Response, event: ChatSseEvent) {
  res.write(`event: ${event.event}\n`);
  res.write(`data: ${JSON.stringify(event)}\n\n`);
}

function parseDateToken(raw: string): string | null {
  // ISO: 2026-03-15
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  // BR/PT: 15/03/2026 or 15-03-2026
  const brMatch = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (brMatch) {
    const [, d, m, y] = brMatch;
    const padded = `${y}-${m!.padStart(2, "0")}-${d!.padStart(2, "0")}`;
    if (/^\d{4}-\d{2}-\d{2}$/.test(padded)) return padded;
  }
  return null;
}

function extractIsoDateRange(message: string): { checkIn: string; checkOut: string } | null {
  const tokens =
    message.match(/\b\d{4}-\d{2}-\d{2}\b|\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}\b/g) ?? [];
  const parsed = tokens.map(parseDateToken).filter((d): d is string => d !== null);
  if (parsed.length < 2) return null;
  const checkIn = parsed[0]!;
  const checkOut = parsed[1]!;
  if (checkOut <= checkIn) return null;
  return { checkIn, checkOut };
}

const DOW_PT: Record<string, number> = {
  domingo: 0,
  segunda: 1,
  terca: 2,
  quarta: 3,
  quinta: 4,
  sexta: 5,
  sabado: 6,
};
const DAY_NAMES = Object.keys(DOW_PT).join("|");

function nextWeekday(from: Date, dow: number): Date {
  let diff = dow - from.getDay();
  if (diff <= 0) diff += 7;
  const d = new Date(from);
  d.setDate(from.getDate() + diff);
  return d;
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function resolveRelativeDateRange(
  text: string,
  today: Date,
): { checkIn: string; checkOut: string } | null {
  const norm = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  // fim de semana → sexta a segunda
  if (/\bfim\s*de\s*semana\b|\bfds\b/.test(norm)) {
    const fri = nextWeekday(today, 5);
    const mon = new Date(fri);
    mon.setDate(fri.getDate() + 3);
    return { checkIn: isoDate(fri), checkOut: isoDate(mon) };
  }

  // "amanha" / "proximo sabado" as single check-in — not enough alone
  // Find all weekday mentions in order
  const dayRegex = new RegExp(`\\b(${DAY_NAMES})(?:-feira)?\\b`, "gi");
  const hits = Array.from(norm.matchAll(dayRegex)).map((m) => m[1]!.toLowerCase());

  if (hits.length >= 2) {
    const d1 = DOW_PT[hits[0]!];
    const d2 = DOW_PT[hits[1]!];
    if (d1 !== undefined && d2 !== undefined) {
      const ci = nextWeekday(today, d1);
      const co = nextWeekday(ci, d2);
      if (co > ci) return { checkIn: isoDate(ci), checkOut: isoDate(co) };
    }
  }

  return null;
}

function extractDatesWithContext(
  message: string,
  history: ConversationMessage[],
  today: Date,
): { checkIn: string; checkOut: string } | null {
  // 1. Explicit ISO/BR dates in current message
  const explicit = extractIsoDateRange(message);
  if (explicit) return explicit;

  // 2. Relative weekday/weekend in current message
  const relative = resolveRelativeDateRange(message, today);
  if (relative) return relative;

  // 3. Try combining last few history messages with current message
  const recentContext = history
    .slice(-4)
    .map((m) => m.content)
    .concat(message)
    .join(" ");

  const explicitCtx = extractIsoDateRange(recentContext);
  if (explicitCtx) return explicitCtx;

  const relativeCtx = resolveRelativeDateRange(recentContext, today);
  if (relativeCtx) return relativeCtx;

  return null;
}

function detectProfileFromContext(
  message: string,
  history: ConversationMessage[],
): VisitorProfile {
  const fromMessage = detectVisitorProfile(message);
  if (fromMessage !== "unknown") return fromMessage;

  // Try recent history context combined with current message
  const recentText = history
    .slice(-4)
    .map((m) => m.content)
    .concat(message)
    .join(" ");
  return detectVisitorProfile(recentText);
}

function detectIntentWithHistory(
  message: string,
  history: ConversationMessage[],
): ReturnType<typeof detectVisitorIntent> {
  const direct = detectVisitorIntent(message);
  if (direct !== "general") return direct;

  // Only inherit availability intent if the LAST assistant message was explicitly
  // asking the user for check-in/checkout dates (not a generic greeting).
  // We intentionally do NOT inherit "rates" here — the initial greeting mentions
  // "tarifas" in passing, which would incorrectly trigger the rates fast-path.
  const lastAssistant = [...history].reverse().find((m) => m.role === "assistant");
  if (lastAssistant) {
    const lower = lastAssistant.content
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    const wasAskingForDates =
      lower.includes("data de chegada") ||
      lower.includes("data de entrada") ||
      lower.includes("datas da sua estadia") ||
      lower.includes("datas da estadia") ||
      lower.includes("qual seria a data");
    if (wasAskingForDates) {
      return "availability";
    }
  }

  return direct;
}

function extractOccupancy(message: string): { adults: number; children: number } {
  let adults = 2;
  let children = 0;

  const adultMatch = message.match(/\b(\d{1,2})\s*(adultos?|hospedes?)\b/i);
  if (adultMatch?.[1]) {
    const parsed = Number.parseInt(adultMatch[1], 10);
    if (Number.isFinite(parsed) && parsed > 0 && parsed <= 10) adults = parsed;
  }

  const childMatch = message.match(/\b(\d{1,2})\s*(criancas?|crianças)\b/i);
  if (childMatch?.[1]) {
    const parsed = Number.parseInt(childMatch[1], 10);
    if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 10) children = parsed;
  }

  return { adults, children };
}

function chunkText(text: string, maxLen = 32): string[] {
  const parts: string[] = [];
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return parts;

  const words = normalized.split(" ");
  let buf = "";
  for (const word of words) {
    if (!buf) {
      buf = word;
      continue;
    }
    if ((buf + " " + word).length <= maxLen) {
      buf = buf + " " + word;
      continue;
    }
    parts.push(buf);
    buf = word;
  }
  if (buf) parts.push(buf);
  return parts;
}

async function streamText(res: Response, text: string, firstDelayMs: number) {
  const chunks = chunkText(text, 34);
  if (chunks.length === 0) return;
  await wait(firstDelayMs);
  for (let index = 0; index < chunks.length; index += 1) {
    const chunk = chunks[index];
    const suffix = index === chunks.length - 1 ? "" : " ";
    sseWrite(res, { event: "token", text: `${chunk}${suffix}` });
    await wait(18);
  }
}

function mapErrorCode(error: unknown): {
  code: "bad_request" | "rate_limited" | "upstream_unavailable" | "internal";
  message: string;
  retryable: boolean;
} {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const lower = message.toLowerCase();

  if (
    lower.includes("api key is missing") ||
    lower.includes("no llm api key configured") ||
    lower.includes("llm provider")
  ) {
    return {
      code: "upstream_unavailable",
      message:
        "Atendimento digital temporariamente indisponivel por configuracao do provedor de IA.",
      retryable: false,
    };
  }

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
  const { message, messages: historyMessages, session_id, lang } = parsed.data;
  const history: ConversationMessage[] = historyMessages ?? [];
  const sessionId = session_id ?? randomUUID();
  const historyLocale = detectLocaleFromHistory(history);
  const locale = lang ?? historyLocale ?? detectLocale(message);
  const intent = detectIntentWithHistory(message, history);
  const today = todayInSaoPaulo();

  const profile = detectProfileFromContext(message, history);
  const stage = detectVisitorStage(message, history.length);

  // Compute conversation slots (dates + occupancy from context) for prompt injection
  const dateRange = extractDatesWithContext(message, history, today);
  const { adults: slotAdults, children: slotChildren } = extractOccupancy(
    history.map((m) => m.content).concat(message).join(" "),
  );
  const conversationSlots: ConversationSlots = {
    checkIn: dateRange?.checkIn ?? null,
    checkOut: dateRange?.checkOut ?? null,
    nights: dateRange
      ? Math.max(0, Math.round(
          (Date.parse(dateRange.checkOut) - Date.parse(dateRange.checkIn)) / 86400000,
        ))
      : null,
    adults: slotAdults,
    children: slotChildren,
  };

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
      inputSummary: redactPii(message.slice(0, 400)) ?? "",
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
    const { prompt, promptVersionHash } = buildAgentSystemPrompt(
      config,
      locale,
      intent,
      profile,
      stage,
      conversationSlots,
    );
    const generationConfig = getAgentGenerationConfig(intent);
    const searchFAQ = createSearchFaqTool(config);
    const checkAvailability = createCheckAvailabilityTool(config);
    const getRates = createGetRatesTool(config);
    const getReservation = createGetReservationTool(config);

    // Fast-path V8: negotiation/sensitive commercial requests → immediate escalation
    // Also escalate grupo profile immediately (group pricing always needs human review).
    // Never let LLM handle these — no discounts, no promises, no negotiation.
    if (intent === "negotiation" || profile === "grupo") {
      const escalateMsg =
        profile === "grupo"
          ? "Que ótimo! Para reservas em grupo, nossa equipe pode preparar uma proposta personalizada. Posso encaminhar sua mensagem com os detalhes?"
          : "Entendo! Para condições especiais, nossa equipe pode avaliar diretamente. Posso encaminhar sua mensagem?";

      await streamText(res, escalateMsg, firstTokenDelayMs);

      sseWrite(res, {
        event: "tool_end",
        tool: "createHandoff",
        status: "fallback",
        output_summary: escalateMsg,
      });

      sseWrite(res, {
        event: "done",
        session_id: sessionId,
        confidence_score: 1,
        grounding_level: "full",
        source_refs: [],
      });

      await writeAgentLog({
        sessionId,
        intent,
        toolUsed: "createHandoff",
        promptVersionHash,
        inputSummary: redactPii(message.slice(0, 400)) ?? "",
        outputSummary: escalateMsg,
        latencyMs: Date.now() - startedAt,
        fallbackUsed: true,
        status: "fallback",
        groundingLevel: "full",
        sourceRefs: [],
      });
      return;
    }

    // Deterministic fast-path for availability/rates. This avoids the model choosing
    // to hand off even when Cloudbeds is healthy and dates are explicit.
    // Reuse slots computed above — no need to re-extract.
    if (intent === "availability" || intent === "rates") {
      const { checkIn: fastCheckIn, checkOut: fastCheckOut } = conversationSlots;
      const dateRange = fastCheckIn && fastCheckOut ? { checkIn: fastCheckIn, checkOut: fastCheckOut } : null;
      const adults = slotAdults;
      const children = slotChildren;

      if (!dateRange) {
        const ask =
          intent === "availability"
            ? "Qual seria a data de chegada? Pode enviar como preferir — 15/03, essa sexta, fim de semana..."
            : "Qual seria a data de chegada? Pode enviar como quiser — 15/03, essa sexta, fim de semana...";

        await streamText(res, ask, firstTokenDelayMs);
        sseWrite(res, {
          event: "done",
          session_id: sessionId,
          confidence_score: 0.7,
          grounding_level: "none",
          source_refs: [],
        });

        await writeAgentLog({
          sessionId,
          intent,
          toolUsed: null,
          promptVersionHash,
          inputSummary: redactPii(message.slice(0, 400)) ?? "",
          outputSummary: ask.slice(0, 500),
          latencyMs: Date.now() - startedAt,
          fallbackUsed: false,
          status: "success",
          groundingLevel: "none",
          sourceRefs: [],
        });
        return;
      }

      const toolName = intent === "availability" ? "checkAvailability" : "getRates";
      lastTool = toolName;
      sseWrite(res, {
        event: "tool_start",
        tool: toolName,
        input: { ...dateRange, adults, children, lang: locale },
      });

      const checkAvailabilityExecute = (checkAvailability as unknown as { execute?: Function })
        .execute;
      const getRatesExecute = (getRates as unknown as { execute?: Function }).execute;

      if (intent === "availability" && typeof checkAvailabilityExecute !== "function") {
        throw new Error("checkAvailability tool is missing execute()");
      }
      if (intent === "rates" && typeof getRatesExecute !== "function") {
        throw new Error("getRates tool is missing execute()");
      }

      // AI SDK tool.execute signature can include a second "context" argument.
      let toolOutput: unknown;
      if (intent === "availability") {
        toolOutput = await checkAvailabilityExecute!(
          {
            checkIn: dateRange.checkIn,
            checkOut: dateRange.checkOut,
            adults,
            children,
            lang: locale,
          },
          {},
        );
      } else {
        toolOutput = await getRatesExecute!(
          {
            checkIn: dateRange.checkIn,
            checkOut: dateRange.checkOut,
            adults,
            children,
            currency: "BRL",
            lang: locale,
          },
          {},
        );
      }

      const outputRec =
        toolOutput && typeof toolOutput === "object"
          ? (toolOutput as Record<string, unknown>)
          : {};

      const answer = typeof outputRec.answer === "string" ? outputRec.answer : "";
      const toolConfidence =
        typeof outputRec.confidenceScore === "number" ? outputRec.confidenceScore : undefined;
      const toolGrounding =
        outputRec.groundingLevel === "full" ||
        outputRec.groundingLevel === "partial" ||
        outputRec.groundingLevel === "none"
          ? (outputRec.groundingLevel as GroundingLevel)
          : "none";
      const refs = Array.isArray(outputRec.sourceRefs)
        ? (outputRec.sourceRefs as SourceRef[])
        : [];

      if (toolConfidence !== undefined) confidenceScore = toolConfidence;
      groundingLevel = toolGrounding;
      sourceRefs = refs;
      fallbackUsed = outputRec.shouldHandoff === true;

      const noAnswerFallback: Record<string, string> = {
        en: "I could not complete this query right now. I can connect you with our team.",
        es: "No pude completar esta consulta ahora. Puedo conectarte con nuestro equipo.",
        pt: "Nao consegui concluir essa consulta agora. Posso te conectar com nossa equipe.",
      };
      await streamText(
        res,
        answer || noAnswerFallback[locale] || noAnswerFallback.pt!,
        firstTokenDelayMs,
      );

      sseWrite(res, {
        event: "tool_end",
        tool: toolName,
        status: fallbackUsed ? "fallback" : "success",
        confidence_score: toolConfidence,
        grounding_level: toolGrounding,
        source_refs: refs,
        output_summary: answer ? answer.slice(0, 300) : undefined,
      });

      sseWrite(res, {
        event: "done",
        session_id: sessionId,
        confidence_score: toolConfidence,
        grounding_level: toolGrounding,
        source_refs: refs,
      });

      await writeAgentLog({
        sessionId,
        intent,
        toolUsed: toolName,
        promptVersionHash,
        inputSummary: redactPii(message.slice(0, 400)) ?? "",
        outputSummary: redactPii(answer.slice(0, 500)),
        latencyMs: Date.now() - startedAt,
        fallbackUsed,
        status: fallbackUsed ? "fallback" : "success",
        confidenceScore: toolConfidence ?? null,
        groundingLevel: toolGrounding,
        sourceRefs: refs,
      });
      return;
    }

    const agent = new ToolLoopAgent({
      model: getAgentModel(intent),
      instructions: prompt,
      tools: {
        searchFAQ,
        checkAvailability,
        getRates,
        getReservation,
      },
      ...generationConfig,
      stopWhen: stepCountIs(6),
    });

    // Build messages array: prior conversation turns + current message
    const coreMessages: CoreMessage[] = [
      ...history
        .filter((m) => m.content.trim().length > 0)
        .slice(-12)
        .map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      { role: "user" as const, content: message },
    ];

    const streamResult = await agent.stream(
      coreMessages.length > 1
        ? { messages: coreMessages }
        : { prompt: message },
    );

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
      generatedText = config.fallback.genericError[locale] ?? config.fallback.genericError.pt;
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
      inputSummary: redactPii(message.slice(0, 400)) ?? "",
      outputSummary: redactPii(generatedText.slice(0, 1000)),
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
      inputSummary: redactPii(message.slice(0, 400)) ?? "",
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
