import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useChat } from "./useChat";

type LeadFormState = {
  name: string;
  email: string;
  whatsapp: string;
};

type CalendarFormState = {
  checkIn: string;
  checkOut: string;
  guests: string;
};

type OptionCard = {
  id: string;
  title: string;
  description: string;
  action: "calendar" | "prompt";
  prompt?: string;
  badge: string;
};

function ConciergeBellIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-8 w-8">
      <defs>
        <linearGradient id="bellGoldFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4E7A1" />
          <stop offset="55%" stopColor="#D7BA65" />
          <stop offset="100%" stopColor="#B9913F" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#bellGoldFill)" strokeWidth="1.2" opacity="0.8" />
      <circle cx="32" cy="18" r="4.2" fill="url(#bellGoldFill)" />
      <path
        d="M17 36c0-8.4 6.7-15.3 15-15.3s15 6.9 15 15.3v1.3H17V36z"
        fill="url(#bellGoldFill)"
      />
      <rect x="18" y="42" width="28" height="4.4" rx="2.2" fill="url(#bellGoldFill)" />
      <rect x="30.4" y="37.6" width="3.2" height="3.8" fill="url(#bellGoldFill)" />
    </svg>
  );
}

function toWhatsappUrl(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 8) return null;
  return `https://wa.me/${digits}`;
}

function toPhoneUrl(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 8) return null;
  return `tel:+${digits}`;
}

function getOptionCards(locale: "pt" | "en" | "es"): OptionCard[] {
  if (locale === "en") {
    return [
      {
        id: "calendar",
        title: "Plan dates",
        description: "Select check-in and check-out",
        action: "calendar",
        badge: "DATE",
      },
      {
        id: "rates",
        title: "Room rates",
        description: "See current categories and rates",
        action: "prompt",
        prompt: "Show me room rates.",
        badge: "RATE",
      },
      {
        id: "team",
        title: "Talk to team",
        description: "Transfer to human support",
        action: "prompt",
        prompt: "I want to talk to the team.",
        badge: "TEAM",
      },
      {
        id: "experiences",
        title: "Experiences",
        description: "Birdwatching, ecotourism and more",
        action: "prompt",
        prompt: "Show me experiences available at Itaicy.",
        badge: "PLUS",
      },
    ];
  }

  if (locale === "es") {
    return [
      {
        id: "calendar",
        title: "Planear fechas",
        description: "Selecciona check-in y check-out",
        action: "calendar",
        badge: "FECHA",
      },
      {
        id: "rates",
        title: "Ver tarifas",
        description: "Consultar categorias y precios",
        action: "prompt",
        prompt: "Quiero ver las tarifas.",
        badge: "PRECIO",
      },
      {
        id: "team",
        title: "Hablar con equipo",
        description: "Transferir para atencion humana",
        action: "prompt",
        prompt: "Quiero hablar con el equipo.",
        badge: "EQUIPO",
      },
      {
        id: "experiences",
        title: "Experiencias",
        description: "Birdwatching, ecoturismo y mas",
        action: "prompt",
        prompt: "Que experiencias ofrece Itaicy?",
        badge: "PLUS",
      },
    ];
  }

  return [
    {
      id: "calendar",
      title: "Planejar datas",
      description: "Selecione check-in e check-out",
      action: "calendar",
      badge: "DATA",
    },
    {
      id: "rates",
      title: "Ver tarifas",
      description: "Consultar categorias e valores",
      action: "prompt",
      prompt: "Quero consultar as tarifas.",
      badge: "TARIFA",
    },
    {
      id: "team",
      title: "Falar com equipe",
      description: "Transferir para atendimento humano",
      action: "prompt",
      prompt: "Quero falar com a equipe humana.",
      badge: "EQUIPE",
    },
    {
      id: "experiences",
      title: "Experiencias",
      description: "Birdwatching, ecoturismo e mais",
      action: "prompt",
      prompt: "Quais experiencias a Itaicy oferece?",
      badge: "PLUS",
    },
  ];
}

function getAvailabilityPrompt(
  locale: "pt" | "en" | "es",
  form: CalendarFormState,
): string {
  if (locale === "en") {
    return `Check availability from ${form.checkIn} to ${form.checkOut} for ${form.guests} guest(s).`;
  }

  if (locale === "es") {
    return `Verificar disponibilidad del ${form.checkIn} al ${form.checkOut} para ${form.guests} huesped(es).`;
  }

  return `Verificar disponibilidade de ${form.checkIn} ate ${form.checkOut} para ${form.guests} hospede(s).`;
}

function validateLeadForm(form: LeadFormState): string | null {
  if (form.name.trim().length < 3) {
    return "Informe seu nome completo para iniciar o atendimento.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    return "Informe um e-mail valido.";
  }

  if (form.whatsapp.replace(/\D/g, "").length < 8) {
    return "Informe um WhatsApp valido com DDD.";
  }

  return null;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showNudge, setShowNudge] = useState(false);
  const [leadReady, setLeadReady] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarError, setCalendarError] = useState<string | null>(null);
  const [leadForm, setLeadForm] = useState<LeadFormState>({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [calendarForm, setCalendarForm] = useState<CalendarFormState>({
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

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
  }, [messages, isStreaming, activeTool, isOpen, leadReady]);

  useEffect(() => {
    if (isOpen) {
      setShowNudge(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setShowNudge(true);
    }, 6500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen]);

  const hasUserMessages = useMemo(
    () => messages.some((message) => message.role === "user"),
    [messages],
  );

  const optionCards = useMemo(() => getOptionCards(config.locale), [config.locale]);
  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const whatsappUrl = toWhatsappUrl(config.handoffWhatsapp);
  const phoneUrl = toPhoneUrl(config.handoffPhone);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = inputValue.trim();
    if (!next || isStreaming || !leadReady) return;
    setInputValue("");
    await sendMessage(next);
  }

  async function handleOptionCard(option: OptionCard) {
    if (isStreaming || !leadReady) return;

    if (option.action === "calendar") {
      setCalendarError(null);
      setShowCalendar((current) => !current);
      return;
    }

    if (option.prompt) {
      setShowCalendar(false);
      await sendMessage(option.prompt);
    }
  }

  async function handleCalendarSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isStreaming || !leadReady) return;

    if (!calendarForm.checkIn || !calendarForm.checkOut) {
      setCalendarError("Selecione check-in e check-out.");
      return;
    }

    if (calendarForm.checkOut <= calendarForm.checkIn) {
      setCalendarError("A data de check-out deve ser depois do check-in.");
      return;
    }

    if (calendarForm.guests.trim().length === 0) {
      setCalendarError("Informe a quantidade de hospedes.");
      return;
    }

    setCalendarError(null);
    setShowCalendar(false);
    await sendMessage(getAvailabilityPrompt(config.locale, calendarForm));
  }

  function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateLeadForm(leadForm);
    if (validation) {
      setLeadError(validation);
      return;
    }

    clearError();
    setLeadError(null);
    setLeadReady(true);
    setShowCalendar(false);
  }

  return (
    <div className="pointer-events-none fixed bottom-3 right-3 z-[80] flex w-[calc(100vw-24px)] max-w-[420px] flex-col items-end gap-3 sm:bottom-6 sm:right-6 sm:w-[400px]">
      <section
        className={cn(
          "pointer-events-auto w-full overflow-hidden border border-[#e5e7eb] bg-white text-[#111827] shadow-[0_26px_70px_-28px_rgba(15,23,42,0.45)] transition-all duration-200 ease-out",
          "rounded-2xl",
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-[0.98] opacity-0",
          isOpen &&
            "max-sm:fixed max-sm:inset-0 max-sm:h-[100dvh] max-sm:w-screen max-sm:max-w-none max-sm:rounded-none",
        )}
        aria-hidden={!isOpen}
      >
        <header className="flex items-center justify-between border-b border-[#f1f5f9] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#111827]">
                Atendimento digital Itaicy
              </p>
              <p className="truncate text-[11px] text-[#6b7280]">Tempo de resposta: instantaneo</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full border border-[#e5e7eb] px-3 py-1 text-[11px] font-medium text-[#4b5563] transition-colors hover:bg-[#f8fafc]"
            aria-label="Fechar atendimento digital"
          >
            Fechar
          </button>
        </header>

        {activeTool ? (
          <div className="flex items-center gap-2 border-b border-[#f1f5f9] bg-[#f8fafc] px-5 py-2 text-xs text-[#64748b]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#a88755]" />
            <span>{activeTool}</span>
          </div>
        ) : null}

        <div
          ref={scrollRef}
          className={cn(
            "overflow-y-auto px-5 py-5",
            leadReady ? "h-[min(62dvh,520px)] max-sm:h-[calc(100dvh-275px)]" : "h-[min(62dvh,520px)]",
          )}
        >
          {!leadReady ? (
            <div className="space-y-5">
              <article className="max-w-[90%] rounded-2xl rounded-tl-sm border border-[#f3f4f6] bg-[#f9fafb] px-4 py-3 text-sm leading-relaxed text-[#374151]">
                Ola! Bem-vindo ao Itaicy Pantanal Eco Lodge.
                <br />
                <br />
                Para iniciarmos com seguranca e podermos transferir seu atendimento quando necessario,
                preencha seus dados basicos abaixo.
              </article>

              <form
                onSubmit={handleLeadSubmit}
                className="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.32)]"
              >
                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <label
                      htmlFor="lead-name"
                      className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]"
                    >
                      Nome completo
                    </label>
                    <input
                      id="lead-name"
                      value={leadForm.name}
                      onChange={(event) =>
                        setLeadForm((current) => ({ ...current, name: event.target.value }))
                      }
                      className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm text-[#111827] outline-none transition focus:border-[#a88755] focus:bg-white"
                      placeholder="Como podemos te chamar?"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="lead-email"
                      className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]"
                    >
                      E-mail
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      value={leadForm.email}
                      onChange={(event) =>
                        setLeadForm((current) => ({ ...current, email: event.target.value }))
                      }
                      className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm text-[#111827] outline-none transition focus:border-[#a88755] focus:bg-white"
                      placeholder="exemplo@email.com"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="lead-whatsapp"
                      className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]"
                    >
                      WhatsApp
                    </label>
                    <input
                      id="lead-whatsapp"
                      type="tel"
                      value={leadForm.whatsapp}
                      onChange={(event) =>
                        setLeadForm((current) => ({ ...current, whatsapp: event.target.value }))
                      }
                      className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm text-[#111827] outline-none transition focus:border-[#a88755] focus:bg-white"
                      placeholder="+55 (00) 00000-0000"
                    />
                  </div>
                </div>

                {leadError ? (
                  <p className="mt-3 text-xs text-[#b91c1c]">{leadError}</p>
                ) : (
                  <p className="mt-3 text-xs text-[#6b7280]">
                    Seus dados ficam protegidos e sao usados somente para atendimento.
                  </p>
                )}

                <button
                  type="submit"
                  className="mt-3 w-full rounded-lg bg-[#a88755] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8f7246]"
                >
                  Iniciar atendimento
                </button>
              </form>

              <div className="pointer-events-none opacity-45">
                <article className="max-w-[85%] rounded-2xl rounded-tl-sm border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#4b5563]">
                  Perfeito! Como posso ajudar hoje?
                </article>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#d1d5db] px-3 py-1.5 text-xs text-[#6b7280]">
                    Disponibilidade
                  </span>
                  <span className="rounded-full border border-[#d1d5db] px-3 py-1.5 text-xs text-[#6b7280]">
                    Falar com equipe
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {!hasUserMessages ? (
                <>
                  <div className="pb-1">
                    <div className="scrollbar-hide -mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1">
                      {optionCards.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => void handleOptionCard(option)}
                          className={cn(
                            "min-w-[186px] shrink-0 snap-start rounded-xl border px-3 py-3 text-left transition-all",
                            option.action === "calendar" && showCalendar
                              ? "border-[#a88755] bg-[#fdf9f3]"
                              : "border-[#e5e7eb] bg-white hover:border-[#d4c7a1] hover:bg-[#fdfcf9]",
                          )}
                        >
                          <div className="mb-2 inline-flex rounded-full border border-[#e7d8b2] bg-[#f9f2e5] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#8f7246]">
                            {option.badge}
                          </div>
                          <p className="text-xs font-semibold text-[#1f2937]">{option.title}</p>
                          <p className="pt-1 text-[11px] leading-relaxed text-[#64748b]">
                            {option.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {showCalendar ? (
                    <form
                      onSubmit={handleCalendarSubmit}
                      className="rounded-xl border border-[#e5e7eb] bg-[#fcfcfd] p-3.5 shadow-[0_10px_26px_-20px_rgba(15,23,42,0.35)]"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-semibold text-[#1f2937]">Selecionar datas</p>
                        <button
                          type="button"
                          onClick={() => {
                            setShowCalendar(false);
                            setCalendarError(null);
                          }}
                          className="rounded-md border border-[#e5e7eb] px-2 py-1 text-[10px] font-medium text-[#6b7280] hover:bg-white"
                        >
                          Fechar
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        <label className="space-y-1">
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">
                            Check-in
                          </span>
                          <input
                            type="date"
                            min={todayIso}
                            value={calendarForm.checkIn}
                            onChange={(event) =>
                              setCalendarForm((current) => ({ ...current, checkIn: event.target.value }))
                            }
                            className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-xs text-[#1f2937] outline-none focus:border-[#a88755]"
                          />
                        </label>

                        <label className="space-y-1">
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">
                            Check-out
                          </span>
                          <input
                            type="date"
                            min={calendarForm.checkIn || todayIso}
                            value={calendarForm.checkOut}
                            onChange={(event) =>
                              setCalendarForm((current) => ({ ...current, checkOut: event.target.value }))
                            }
                            className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-xs text-[#1f2937] outline-none focus:border-[#a88755]"
                          />
                        </label>
                      </div>

                      <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-[1fr_auto]">
                        <label className="space-y-1">
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">
                            Hospedes
                          </span>
                          <select
                            value={calendarForm.guests}
                            onChange={(event) =>
                              setCalendarForm((current) => ({ ...current, guests: event.target.value }))
                            }
                            className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-xs text-[#1f2937] outline-none focus:border-[#a88755]"
                          >
                            <option value="1">1 hospede</option>
                            <option value="2">2 hospedes</option>
                            <option value="3">3 hospedes</option>
                            <option value="4">4 hospedes</option>
                            <option value="5">5 hospedes</option>
                            <option value="6">6 hospedes</option>
                          </select>
                        </label>

                        <button
                          type="submit"
                          className="self-end rounded-lg bg-[#a88755] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#8f7246]"
                        >
                          Ver disponibilidade
                        </button>
                      </div>

                      {calendarError ? (
                        <p className="mt-2 text-[11px] text-[#b91c1c]">{calendarError}</p>
                      ) : (
                        <p className="mt-2 text-[11px] text-[#6b7280]">
                          Vamos consultar disponibilidade em tempo real para suas datas.
                        </p>
                      )}
                    </form>
                  ) : null}
                </>
              ) : null}

              {messages.map((message) => {
                const isUser = message.role === "user";
                const isEmptyAssistant = !isUser && message.text.trim().length === 0;

                return (
                  <article
                    key={message.id}
                    className={cn(
                      "max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      isUser
                        ? "ml-auto rounded-br-md bg-[#0f172a] text-white"
                        : "mr-auto rounded-bl-md border border-[#e5e7eb] bg-white text-[#1f2937]",
                    )}
                  >
                    {isEmptyAssistant ? (
                      <span className="block h-2 w-24 animate-pulse rounded bg-zinc-200" />
                    ) : (
                      message.text
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {leadReady && (suggestedActions.handoff || error) && (whatsappUrl || phoneUrl || config.handoffEmail) ? (
          <div className="border-t border-[#f1f5f9] bg-[#f8fafc] px-5 py-3">
            <p className="text-sm font-semibold text-[#374151]">Atendimento humano disponivel</p>
            <p className="pt-0.5 text-xs text-[#64748b]">
              {config.handoffServiceHours || "Horario comercial"}
              {config.handoffSlaHours > 0 ? ` - SLA medio ${config.handoffSlaHours}h` : ""}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-[#d1d5db] bg-white px-3 py-1.5 text-xs font-semibold text-[#334155] transition hover:bg-[#f8fafc]"
                >
                  WhatsApp
                </a>
              ) : null}
              {phoneUrl ? (
                <a
                  href={phoneUrl}
                  className="rounded-lg border border-[#d1d5db] bg-white px-3 py-1.5 text-xs font-semibold text-[#334155] transition hover:bg-[#f8fafc]"
                >
                  Ligar
                </a>
              ) : null}
              {config.handoffEmail ? (
                <a
                  href={`mailto:${config.handoffEmail}`}
                  className="rounded-lg border border-[#d1d5db] bg-white px-3 py-1.5 text-xs font-semibold text-[#334155] transition hover:bg-[#f8fafc]"
                >
                  Email
                </a>
              ) : null}
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="border-t border-[#fecaca] bg-[#fff1f2] px-5 py-2.5 text-xs text-[#991b1b]">
            <div className="flex items-center justify-between gap-3">
              <span>{error}</span>
              <button
                type="button"
                onClick={clearError}
                className="rounded-md border border-[#fca5a5] px-2 py-1 text-[11px] font-medium transition hover:bg-[#fee2e2]"
              >
                Ok
              </button>
            </div>
          </div>
        ) : null}

        <footer className="border-t border-[#f1f5f9] bg-[#f8fafc] px-5 pb-4 pt-3">
          {!leadReady ? (
            <div className="space-y-2.5 opacity-60">
              <input
                disabled
                placeholder="Preencha seus dados para comecar..."
                className="w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2.5 text-sm text-[#94a3b8] outline-none"
              />
              <div className="flex items-center justify-between">
                <p className="max-w-[70%] text-[11px] text-[#94a3b8]">{config.disclaimer}</p>
                <button
                  type="button"
                  disabled
                  className="rounded-lg bg-[#cbd5e1] px-3 py-2 text-xs font-semibold text-white"
                >
                  Enviar
                </button>
              </div>
            </div>
          ) : (
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
                className="w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2.5 text-sm text-[#111827] outline-none transition placeholder:text-[#94a3b8] focus:border-[#a88755]"
              />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="max-w-[60%] text-[11px] leading-relaxed text-[#64748b]">
                  {config.disclaimer}
                </p>
                <div className="flex items-center gap-2">
                  {suggestedActions.booking ? (
                    <a
                      href={config.bookingEngineUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-[#d1d5db] bg-white px-3 py-2 text-xs font-semibold text-[#334155] transition hover:bg-[#f8fafc]"
                    >
                      Reservar
                    </a>
                  ) : null}
                  <button
                    type="submit"
                    disabled={isStreaming || inputValue.trim().length === 0}
                    className="rounded-lg bg-[#a88755] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#8f7246] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isStreaming ? "Enviando..." : "Enviar"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </footer>
      </section>

      {!isOpen && showNudge ? (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setShowNudge(false);
          }}
          className="pointer-events-auto rounded-full border border-[#e5e7eb] bg-white px-3 py-1.5 text-xs font-medium text-[#334155] shadow-[0_10px_26px_-14px_rgba(15,23,42,0.35)] transition hover:bg-[#f8fafc]"
        >
          Atendimento digital online
        </button>
      ) : null}

      {!isOpen ? (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setShowNudge(false);
          }}
          className="pointer-events-auto group relative isolate h-16 w-16 rounded-full border border-[#d5b86b] bg-[radial-gradient(circle_at_30%_22%,#4c412d_0%,#2f281d_55%,#1f1a12_100%)] shadow-[0_22px_42px_-18px_rgba(15,23,42,0.55)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_30px_54px_-20px_rgba(15,23,42,0.62)]"
          aria-label="Abrir atendimento digital"
        >
          <span className="motion-reduce:animate-none absolute -inset-2 -z-30 rounded-full bg-[#d6b768]/18 blur-xl animate-[pulse_4.8s_ease-in-out_infinite]" />
          <span className="motion-reduce:animate-none absolute -inset-1 -z-20 rounded-full border border-[#d6b768]/50 opacity-60 animate-[ping_6.2s_cubic-bezier(0.16,1,0.3,1)_infinite]" />
          <span className="absolute inset-[4px] rounded-full border border-[#e9d58f]/70" />
          <span
            className="motion-reduce:animate-none absolute -inset-1 -z-10 rounded-full border border-[#f5e7ad]/35 opacity-45 animate-[ping_7.4s_cubic-bezier(0.16,1,0.3,1)_infinite]"
            style={{ animationDelay: "1.3s" }}
          />
          <span className="relative z-10 flex h-full w-full items-center justify-center text-[#e7d589] drop-shadow-[0_0_10px_rgba(245,218,134,0.45)]">
            <ConciergeBellIcon />
          </span>
          <span className="absolute right-[11px] top-[10px] h-2 w-2 rounded-full bg-[#f4d58c] shadow-[0_0_10px_rgba(244,213,140,0.9)]" />
        </button>
      ) : null}
    </div>
  );
}
