import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import type { AgentConfig, AgentLocale } from "@shared/agent-config";
import type { ChatSseEvent } from "@shared/chat-types";

export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

type ChatConfig = {
  locale: AgentLocale;
  greeting: string;
  disclaimer: string;
  bookingEngineUrl: string;
  handoffWhatsapp: string;
  handoffEmail: string;
  handoffPhone: string;
  handoffServiceHours: string;
  handoffSlaHours: number;
};

type SuggestedActions = {
  booking: boolean;
  handoff: boolean;
};

export type QuickReply = { label: string; value: string };
export type QuickRepliesState = { prompt: string; options: QuickReply[] } | null;

type UseChatState = {
  messages: ChatMessage[];
  isStreaming: boolean;
  error: string | null;
  activeTool: string | null;
  sessionId: string | null;
  config: ChatConfig;
  suggestedActions: SuggestedActions;
  quickReplies: QuickRepliesState;
  sendMessage: (message: string) => Promise<void>;
  clearQuickReplies: () => void;
  clearError: () => void;
};

// Internal queue item — user bubble is shown immediately, assistant pending
type QueuedMessage = {
  text: string;
  userId: string;
};

function getStaticGreeting(locale: AgentLocale): string {
  if (locale === "en") {
    return "Hi! I'm the Itaicy Pantanal Eco Lodge assistant. I can help with dates, rates, experiences or connect you with our team. How can I help?";
  }
  if (locale === "es") {
    return "¡Hola! Soy el asistente de Itaicy Pantanal Eco Lodge. Puedo ayudarle con fechas, tarifas, experiencias o conectarle con nuestro equipo. ¿En qué puedo ayudar?";
  }
  return "Oi! Sou o assistente da Itaicy Pantanal Eco Lodge. Posso ajudar com datas, tarifas, experiências ou conectar você com nossa equipe. Como posso ajudar?";
}

const defaultConfig: ChatConfig = {
  locale: "pt",
  greeting: getStaticGreeting("pt"),
  disclaimer:
    "Atendimento digital sujeito a confirmacao da equipe para politicas e condicoes comerciais.",
  bookingEngineUrl: "https://bookings.cloudbeds.com",
  handoffWhatsapp: "",
  handoffEmail: "",
  handoffPhone: "",
  handoffServiceHours: "",
  handoffSlaHours: 24,
};

const toolLabelsMap: Record<string, Record<AgentLocale, string>> = {
  searchFAQ: { pt: "Buscando informações...", en: "Searching info...", es: "Buscando información..." },
  checkAvailability: { pt: "Verificando disponibilidade...", en: "Checking availability...", es: "Verificando disponibilidad..." },
  getRates: { pt: "Consultando tarifas...", en: "Checking rates...", es: "Consultando tarifas..." },
  authenticateGuest: { pt: "Validando dados da reserva...", en: "Validating booking data...", es: "Validando datos de reserva..." },
  getReservation: { pt: "Buscando detalhes da reserva...", en: "Looking up reservation...", es: "Buscando detalles de reserva..." },
  captureLead: { pt: "Registrando contato...", en: "Saving contact...", es: "Registrando contacto..." },
  createHandoff: { pt: "Conectando com a equipe...", en: "Connecting with our team...", es: "Conectando con el equipo..." },
};

function getToolLabel(tool: string, locale: AgentLocale): string {
  const labels = toolLabelsMap[tool];
  if (!labels) return locale === "en" ? "Processing..." : locale === "es" ? "Procesando..." : "Processando...";
  return labels[locale] ?? labels.pt;
}

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function randomRequestId(): string {
  const webCrypto = globalThis.crypto;

  if (webCrypto && typeof webCrypto.randomUUID === "function") {
    return webCrypto.randomUUID();
  }

  if (webCrypto && typeof webCrypto.getRandomValues === "function") {
    const bytes = new Uint8Array(16);
    webCrypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    let hex = "";
    for (let index = 0; index < bytes.length; index += 1) {
      hex += bytes[index].toString(16).padStart(2, "0");
    }
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  return "00000000-0000-4000-8000-000000000000";
}

function pickLocalizedText(copy: { pt: string; en: string; es: string }, locale: AgentLocale): string {
  if (locale === "en") return copy.en;
  if (locale === "es") return copy.es;
  return copy.pt;
}

function detectLocale(message: string): AgentLocale {
  const normalized = message.toLowerCase();
  // ES-only keywords (avoid "reserva" — also used in PT)
  if (/\b(hola|tengo|quiero|disponibilidad|precio|precios|habitacion|habitaciones|llegada|salida|gracias|buenas)\b/.test(normalized)) {
    return "es";
  }
  if (/\b(hello|hi there|booking|availability|available|rate|rates|price|prices|reservation|check.in|check.out|thank you|thanks)\b/.test(normalized)) {
    return "en";
  }
  return "pt";
}

/** Reads site language from localStorage (set by LanguageSwitcher), falls back to navigator. */
function detectPreferredLocale(): AgentLocale {
  try {
    const stored = localStorage.getItem("itaicy_lang");
    if (stored === "pt" || stored === "en" || stored === "es") return stored;
  } catch {
    // localStorage unavailable
  }
  if (typeof navigator === "undefined") return "pt";
  const lang = (navigator.language || "").toLowerCase();
  if (lang.startsWith("es")) return "es";
  if (lang.startsWith("en")) return "en";
  return "pt";
}

function parseSseBlock(block: string): ChatSseEvent | null {
  const lines = block
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length === 0) return null;

  let data = "";
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.startsWith("data:")) {
      data += line.slice(5).trim();
    }
  }

  if (!data) return null;

  try {
    return JSON.parse(data) as ChatSseEvent;
  } catch {
    return null;
  }
}

function normalizeErrorMessage(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("no output generated")) {
    return "Nao consegui concluir a resposta agora. Tente reformular sua pergunta.";
  }
  return message;
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const json = (await response.json()) as { message?: string; code?: string };
    if (typeof json.message === "string" && json.message.trim().length > 0) {
      return normalizeErrorMessage(json.message);
    }
  } catch {
    // ignore parse failure
  }

  if (response.status === 429) {
    return "Muitas mensagens em pouco tempo. Aguarde alguns segundos e tente novamente.";
  }

  return "Nao foi possivel iniciar o atendimento digital agora.";
}

export function useChat(): UseChatState {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [config, setConfig] = useState<ChatConfig>(defaultConfig);
  const [suggestedActions, setSuggestedActions] = useState<SuggestedActions>({
    booking: false,
    handoff: false,
  });
  const [quickReplies, setQuickReplies] = useState<QuickRepliesState>(null);
  const initializedRef = useRef(false);

  // Always-current refs — avoid stale closures in callbacks and queue drain
  const messagesRef = useRef<ChatMessage[]>([]);
  const sessionIdRef = useRef<string | null>(null);
  const isStreamingRef = useRef(false);
  // Session-level locale lock: once a non-PT locale is confirmed, keep it for the session
  const localeLockRef = useRef<AgentLocale | null>(null);
  // Queue: messages sent while agent is responding; user bubble already shown
  const pendingQueueRef = useRef<QueuedMessage[]>([]);

  useEffect(() => { messagesRef.current = messages; }, [messages]);
  useEffect(() => { sessionIdRef.current = sessionId; }, [sessionId]);

  useEffect(() => {
    let cancelled = false;

    async function loadConfig() {
      try {
        const response = await fetch("/api/cms/agent-config");
        if (!response.ok) return;
        const json = (await response.json()) as { config?: AgentConfig };
        const cmsConfig = json.config;
        if (!cmsConfig || cancelled) return;

        const locale = detectPreferredLocale();

        setConfig((current) => ({
          ...current,
          locale,
          greeting: getStaticGreeting(locale),
          disclaimer: pickLocalizedText(cmsConfig.disclaimers.policyReference, locale),
          bookingEngineUrl: cmsConfig.bookingEngineUrl,
          handoffWhatsapp: cmsConfig.handoff.whatsapp,
          handoffEmail: cmsConfig.handoff.email,
          handoffPhone: cmsConfig.handoff.emergencyPhone,
          handoffServiceHours: cmsConfig.handoff.serviceHours,
          handoffSlaHours: cmsConfig.handoff.slaHours,
        }));

        setMessages((current) => {
          const hasUserMessage = current.some((item) => item.role === "user");
          if (hasUserMessage) return current;
          if (current.length === 1 && current[0]?.role === "assistant") {
            return [{ ...current[0], text: getStaticGreeting(locale) }];
          }
          return current;
        });
      } catch {
        // keep default config
      }
    }

    void loadConfig();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    setMessages([{ id: randomId(), role: "assistant", text: defaultConfig.greeting }]);
  }, []);

  // Track session end on page unload (fire-and-forget beacon)
  useEffect(() => {
    function handleUnload() {
      const msgCount = messagesRef.current.filter((m) => m.role === "user").length;
      if (msgCount > 0) {
        track("session_ended", { messages: msgCount, sessionId: sessionIdRef.current ?? "none" });
      }
    }
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  const clearError = useCallback(() => setError(null), []);
  const clearQuickReplies = useCallback(() => setQuickReplies(null), []);

  // streamMessage uses sessionIdRef to avoid stale closure — no deps needed
  const streamMessage = useCallback(
    async (message: string, assistantId: string, historySnapshot: ChatMessage[]): Promise<void> => {
      // Locale resolution: locked session > history detection > current message > site preference
      const messageLang = detectLocale(message);
      const historyLang =
        historySnapshot
          .filter((m) => m.role === "user")
          .slice(-4)
          .map((m) => detectLocale(m.text))
          .find((l) => l !== "pt") ?? null;
      const locale: AgentLocale =
        localeLockRef.current ??
        historyLang ??
        (messageLang !== "pt" ? messageLang : detectPreferredLocale());
      // Lock once a non-PT locale is confirmed for the session
      if (!localeLockRef.current && locale !== "pt") {
        localeLockRef.current = locale;
      }

      const historyMessages = historySnapshot
        .filter((m) => m.role !== "system" && m.text.trim().length > 0 && m.id !== assistantId)
        .slice(-12)
        .map((m) => ({ role: m.role as "user" | "assistant", content: m.text }));

      const payload = {
        message,
        ...(historyMessages.length > 0 ? { messages: historyMessages } : {}),
        request_id: randomRequestId(),
        session_id: sessionIdRef.current ?? undefined,
        lang: locale,
      };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok || !response.body) {
        throw new Error(await readErrorMessage(response));
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        while (true) {
          const boundaryIndex = buffer.indexOf("\n\n");
          if (boundaryIndex < 0) break;
          const rawBlock = buffer.slice(0, boundaryIndex);
          buffer = buffer.slice(boundaryIndex + 2);

          const event = parseSseBlock(rawBlock.replace(/\r/g, ""));
          if (!event) continue;

          if (event.event === "token") {
            setMessages((current) =>
              current.map((item) =>
                item.id === assistantId ? { ...item, text: `${item.text}${event.text}` } : item,
              ),
            );
            continue;
          }

          if (event.event === "tool_start") {
            setActiveTool(getToolLabel(event.tool, locale));
            track("intent_detected", { tool: event.tool });
            continue;
          }

          if (event.event === "tool_end") {
            setActiveTool(null);

            if (event.status === "error") {
              setSuggestedActions((current) => ({ ...current, handoff: true }));
              setError(
                normalizeErrorMessage(
                  event.error ?? "Falha ao consultar um servico do atendimento digital.",
                ),
              );
            }

            if (event.status === "success") {
              if (event.tool === "checkAvailability") {
                setSuggestedActions((current) => ({ ...current, booking: true }));
                track("availability_shown");
                track("cta_booking_shown");
              }
              if (event.tool === "getRates") {
                setSuggestedActions((current) => ({ ...current, booking: true }));
                track("rates_shown");
                track("cta_booking_shown");
              }
              if (event.tool === "createHandoff") {
                setSuggestedActions((current) => ({ ...current, handoff: true }));
                track("handoff_requested");
              }
              if (event.tool === "getReservation") {
                track("reservation_viewed");
              }
            }

            if (event.status === "fallback") {
              setSuggestedActions((current) => ({ ...current, handoff: true }));
              if (event.tool === "checkAvailability") {
                track("no_availability");
              }
              track("handoff_requested");
            }
            continue;
          }

          if (event.event === "done") {
            setSessionId(event.session_id);
            setActiveTool(null);
            if (event.grounding_level === "none") {
              setSuggestedActions((current) => ({ ...current, handoff: true }));
            }
            continue;
          }

          if (event.event === "quick_replies") {
            setQuickReplies({
              prompt: event.prompt,
              options: event.options as QuickReply[],
            });
            continue;
          }

          if (event.event === "error") {
            setActiveTool(null);
            setSuggestedActions((current) => ({ ...current, handoff: true }));
            setError(normalizeErrorMessage(event.message));
          }
        }
      }
    },
    [], // stable: reads sessionId via sessionIdRef
  );

  /**
   * Core execution: streams one message.
   * The user bubble must already be in the messages list (added by sendMessage).
   * Creates the assistant placeholder, streams, then drains the queue.
   */
  const executeMessage = useCallback(
    async (queued: QueuedMessage): Promise<void> => {
      const { text: message } = queued;
      // Snapshot BEFORE adding the assistant bubble so history is correct
      const historySnapshot = messagesRef.current;

      clearError();
      setActiveTool(null);
      setQuickReplies(null);
      isStreamingRef.current = true;
      setIsStreaming(true);
      setSuggestedActions({ booking: false, handoff: false });

      const assistantId = randomId();

      setMessages((current) => [
        ...current,
        { id: assistantId, role: "assistant", text: "" },
      ]);

      try {
        await streamMessage(message, assistantId, historySnapshot);

        setMessages((current) =>
          current.map((item) =>
            item.id === assistantId && item.text.trim().length === 0
              ? {
                  ...item,
                  text: "Nao consegui gerar uma resposta completa agora. Posso encaminhar para a equipe.",
                }
              : item,
          ),
        );
      } catch (caughtError) {
        const fallback =
          caughtError instanceof Error
            ? normalizeErrorMessage(caughtError.message)
            : "Erro inesperado no atendimento digital.";

        setSuggestedActions((current) => ({ ...current, handoff: true }));
        setError(fallback);
        setMessages((current) =>
          current.map((item) =>
            item.id === assistantId
              ? {
                  ...item,
                  text: "Nao consegui concluir agora. Tente novamente em alguns segundos.",
                }
              : item,
          ),
        );
      } finally {
        setActiveTool(null);
        isStreamingRef.current = false;
        setIsStreaming(false);

        // Drain queue — natural 80ms pause before next message
        const next = pendingQueueRef.current.shift();
        if (next) {
          setTimeout(() => void executeMessage(next), 80);
        }
      }
    },
    [clearError, streamMessage],
  );

  /**
   * Public API: add a message to the conversation.
   * - Shows user bubble immediately (no waiting for agent)
   * - If agent is streaming: queues the message for processing after current response
   * - If idle: sends immediately
   */
  const sendMessage = useCallback(
    async (rawMessage: string): Promise<void> => {
      const message = rawMessage.trim();
      if (!message) return;

      const userId = randomId();

      // Always render the user bubble right away
      setMessages((current) => [
        ...current,
        { id: userId, role: "user", text: message },
      ]);

      // Track first user message as chat_started
      const currentMessages = messagesRef.current;
      const hasUserMessage = currentMessages.some((m) => m.role === "user");
      if (!hasUserMessage) {
        track("chat_started");
      }

      if (isStreamingRef.current) {
        // Queue for processing after current stream finishes
        pendingQueueRef.current.push({ text: message, userId });
        return;
      }

      await executeMessage({ text: message, userId });
    },
    [executeMessage],
  );

  return useMemo(
    () => ({
      messages,
      isStreaming,
      error,
      activeTool,
      sessionId,
      config,
      suggestedActions,
      quickReplies,
      sendMessage,
      clearQuickReplies,
      clearError,
    }),
    [
      messages,
      isStreaming,
      error,
      activeTool,
      sessionId,
      config,
      suggestedActions,
      quickReplies,
      sendMessage,
      clearQuickReplies,
      clearError,
    ],
  );
}
