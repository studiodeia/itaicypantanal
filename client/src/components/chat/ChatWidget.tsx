import { FormEvent, useEffect, useRef, useState } from "react";
import { useChat } from "./useChat";

function toWhatsappUrl(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 8) return null;
  return `https://wa.me/${digits}`;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const {
    messages,
    isStreaming,
    error,
    activeTool,
    config,
    suggestedActions,
    sendMessage,
    clearError,
  } = useChat();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isStreaming, activeTool]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = inputValue.trim();
    if (!next || isStreaming) return;
    setInputValue("");
    await sendMessage(next);
  }

  const whatsappUrl = toWhatsappUrl(config.handoffWhatsapp);

  return (
    <div className="pointer-events-none fixed inset-x-3 bottom-3 z-[70] flex flex-col items-end gap-3 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[390px]">
      {isOpen ? (
        <section className="pointer-events-auto w-full overflow-hidden rounded-3xl border border-black/10 bg-white/95 shadow-[0_26px_90px_-28px_rgba(2,6,23,0.55)] backdrop-blur-xl">
          <header className="flex items-start justify-between border-b border-black/10 px-5 py-4">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold tracking-tight text-[#111827]">
                Atendimento Itaicy
              </p>
              <p className="truncate pt-0.5 text-xs text-[#6b7280]">
                Digital, com apoio da equipe humana
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-[#374151] transition hover:border-black/20 hover:bg-black/5"
              aria-label="Fechar atendimento digital"
            >
              Fechar
            </button>
          </header>

          {activeTool ? (
            <div className="border-b border-black/10 bg-[#f8fafc] px-5 py-2 text-xs text-[#4b5563]">
              {activeTool}
            </div>
          ) : null}

          <div
            ref={scrollRef}
            className="h-[min(66dvh,560px)] space-y-3 overflow-y-auto bg-[linear-gradient(180deg,#ffffff_0%,#f9fafb_100%)] px-4 py-4 sm:h-[500px]"
          >
            {messages.map((message) => (
              <article
                key={message.id}
                className={
                  message.role === "user"
                    ? "ml-auto max-w-[86%] rounded-2xl rounded-br-md bg-[#111827] px-3.5 py-2.5 text-sm text-white"
                    : "mr-auto max-w-[90%] rounded-2xl rounded-bl-md border border-black/10 bg-white px-3.5 py-2.5 text-sm text-[#111827]"
                }
              >
                {message.text || (isStreaming ? "..." : "")}
              </article>
            ))}
          </div>

          {error ? (
            <div className="border-y border-[#fecaca] bg-[#fff1f2] px-4 py-2.5 text-xs text-[#991b1b]">
              <div className="flex items-center justify-between gap-3">
                <span>{error}</span>
                <button
                  type="button"
                  onClick={clearError}
                  className="rounded-md border border-[#fca5a5] px-2 py-1 text-[11px] font-medium hover:bg-[#fee2e2]"
                >
                  Ok
                </button>
              </div>
            </div>
          ) : null}

          <footer className="bg-white px-4 pb-4 pt-3">
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <label htmlFor="chat-input" className="sr-only">
                Sua mensagem
              </label>
              <input
                id="chat-input"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Digite sua pergunta..."
                disabled={isStreaming}
                className="w-full rounded-2xl border border-black/15 bg-white px-4 py-2.5 text-sm text-[#111827] outline-none transition placeholder:text-[#9ca3af] focus:border-[#111827]"
              />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="max-w-[58%] text-[11px] leading-relaxed text-[#6b7280]">
                  {config.disclaimer}
                </p>
                <div className="flex items-center gap-2">
                  {suggestedActions.booking ? (
                    <a
                      href={config.bookingEngineUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-black/20 px-3 py-2 text-xs font-semibold text-[#111827] transition hover:bg-black/5"
                    >
                      Reservar agora
                    </a>
                  ) : null}
                  {suggestedActions.handoff && whatsappUrl ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-black/20 px-3 py-2 text-xs font-semibold text-[#111827] transition hover:bg-black/5"
                    >
                      Falar com equipe
                    </a>
                  ) : null}
                  <button
                    type="submit"
                    disabled={isStreaming || inputValue.trim().length === 0}
                    className="rounded-xl bg-[#111827] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isStreaming ? "Enviando..." : "Enviar"}
                  </button>
                </div>
              </div>
            </form>
          </footer>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="pointer-events-auto relative isolate rounded-full border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-[#111827] shadow-[0_16px_40px_-18px_rgba(2,6,23,0.45)] transition hover:shadow-[0_22px_50px_-20px_rgba(2,6,23,0.55)]"
        aria-label={isOpen ? "Fechar atendimento digital" : "Abrir atendimento digital"}
      >
        <span className="motion-reduce:animate-none absolute inset-0 -z-10 rounded-full border border-black/10 opacity-60 animate-[ping_3.8s_ease-out_infinite]" />
        <span className="motion-reduce:animate-none absolute -inset-1 -z-20 rounded-full bg-white/50 blur-xl animate-[pulse_4.5s_ease-in-out_infinite]" />
        {isOpen ? "Fechar atendimento" : "Falar com a equipe"}
      </button>
    </div>
  );
}

