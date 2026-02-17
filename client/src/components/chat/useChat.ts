import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
};

type SuggestedActions = {
  booking: boolean;
  handoff: boolean;
};

type UseChatState = {
  messages: ChatMessage[];
  isStreaming: boolean;
  error: string | null;
  activeTool: string | null;
  sessionId: string | null;
  config: ChatConfig;
  suggestedActions: SuggestedActions;
  sendMessage: (message: string) => Promise<void>;
  clearError: () => void;
};

const defaultConfig: ChatConfig = {
  locale: "pt",
  greeting:
    "Ola. Este e o atendimento digital da Itaicy. Posso ajudar com disponibilidade, tarifas e informacoes da pousada.",
  disclaimer:
    "Atendimento digital sujeito a confirmacao da equipe para politicas e condicoes comerciais.",
  bookingEngineUrl: "https://bookings.cloudbeds.com",
  handoffWhatsapp: "",
};

const toolLabels: Record<string, string> = {
  searchFAQ: "Buscando informacoes...",
  checkAvailability: "Verificando disponibilidade...",
  getRates: "Consultando tarifas...",
  authenticateGuest: "Validando dados da reserva...",
  getReservation: "Buscando detalhes da reserva...",
  captureLead: "Registrando contato...",
  createHandoff: "Conectando com a equipe...",
};

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

function pickLocalizedText(
  copy: { pt: string; en: string; es: string },
  locale: AgentLocale,
): string {
  if (locale === "en") return copy.en;
  if (locale === "es") return copy.es;
  return copy.pt;
}

function detectLocale(message: string): AgentLocale {
  const normalized = message.toLowerCase();
  if (/\b(hola|quiero|disponibilidad|reserva|precio)\b/.test(normalized)) {
    return "es";
  }
  if (/\b(hello|booking|availability|rate|price|reservation)\b/.test(normalized)) {
    return "en";
  }
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
  const initializedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function loadConfig() {
      try {
        const response = await fetch("/api/cms/agent-config");
        if (!response.ok) return;
        const json = (await response.json()) as { config?: AgentConfig };
        const cmsConfig = json.config;
        if (!cmsConfig || cancelled) return;

        const locale: AgentLocale = "pt";
        setConfig((current) => ({
          ...current,
          locale,
          disclaimer: pickLocalizedText(cmsConfig.disclaimers.policyReference, locale),
          bookingEngineUrl: cmsConfig.bookingEngineUrl,
          handoffWhatsapp: cmsConfig.handoff.whatsapp,
        }));
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

  const clearError = useCallback(() => setError(null), []);

  const streamMessage = useCallback(
    async (message: string, assistantId: string): Promise<void> => {
      const locale = detectLocale(message);
      const payload = {
        message,
        request_id: randomRequestId(),
        session_id: sessionId ?? undefined,
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
                item.id === assistantId
                  ? { ...item, text: `${item.text}${event.text}` }
                  : item,
              ),
            );
            continue;
          }

          if (event.event === "tool_start") {
            setActiveTool(toolLabels[event.tool] ?? "Processando...");
            continue;
          }

          if (event.event === "tool_end") {
            setActiveTool(null);

            if (event.status === "error") {
              setError(
                normalizeErrorMessage(
                  event.error ?? "Falha ao consultar um servico do atendimento digital.",
                ),
              );
            }

            if (event.status === "success") {
              if (event.tool === "checkAvailability" || event.tool === "getRates") {
                setSuggestedActions((current) => ({ ...current, booking: true }));
              }
              if (event.tool === "createHandoff") {
                setSuggestedActions((current) => ({ ...current, handoff: true }));
              }
            }
            continue;
          }

          if (event.event === "done") {
            setSessionId(event.session_id);
            setActiveTool(null);
            continue;
          }

          if (event.event === "error") {
            setActiveTool(null);
            setError(normalizeErrorMessage(event.message));
          }
        }
      }
    },
    [sessionId],
  );

  const sendMessage = useCallback(
    async (rawMessage: string): Promise<void> => {
      const message = rawMessage.trim();
      if (!message || isStreaming) return;

      clearError();
      setActiveTool(null);
      setIsStreaming(true);
      setSuggestedActions({ booking: false, handoff: false });

      const userId = randomId();
      const assistantId = randomId();

      setMessages((current) => [
        ...current,
        { id: userId, role: "user", text: message },
        { id: assistantId, role: "assistant", text: "" },
      ]);

      try {
        await streamMessage(message, assistantId);

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
        setIsStreaming(false);
      }
    },
    [clearError, isStreaming, streamMessage],
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
      sendMessage,
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
      sendMessage,
      clearError,
    ],
  );
}
