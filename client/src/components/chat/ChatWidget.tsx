import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useChat } from "./useChat";
import { useLanguage } from "@/i18n/context";
import type { Lang } from "@/i18n/context";

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

type SegmentId = "planning" | "guest" | "exploring";

type ChatUiStrings = {
  headerTitle: string;
  headerSubtitle: string;
  headerClose: string;
  headerCloseAriaLabel: string;
  welcomeMessage: string;
  segmentQuestion: string;
  segmentPlanning: string;
  segmentPlanningDesc: string;
  segmentGuest: string;
  segmentGuestDesc: string;
  segmentExploring: string;
  segmentExploringDesc: string;
  segmentGuestPrompt: string;
  segmentExploringPrompt: string;
  leadNameLabel: string;
  leadNamePlaceholder: string;
  leadEmailLabel: string;
  leadEmailPlaceholder: string;
  leadWhatsappLabel: string;
  leadWhatsappPlaceholder: string;
  leadPrivacyText: string;
  leadSubmit: string;
  leadPreviewMessage: string;
  leadPreviewPill1: string;
  leadPreviewPill2: string;
  calendarTitle: string;
  calendarClose: string;
  calendarCheckin: string;
  calendarCheckout: string;
  calendarGuests: string;
  calendarGuestOption: (n: number) => string;
  calendarSubmit: string;
  calendarHelpText: string;
  handoffTitle: string;
  handoffServiceHoursFallback: string;
  handoffSlaLabel: (hours: number) => string;
  handoffCall: string;
  footerDisabledPlaceholder: string;
  footerDisabledSend: string;
  footerInputAriaLabel: string;
  footerInputPlaceholder: string;
  footerBook: string;
  footerSend: string;
  footerSending: string;
  fabAriaLabel: string;
  validationName: string;
  validationEmail: string;
  validationWhatsapp: string;
  calendarValidationDates: string;
  calendarValidationCheckout: string;
  calendarValidationGuests: string;
};

function getChatUiStrings(locale: Lang): ChatUiStrings {
  if (locale === "en") {
    return {
      headerTitle: "Itaicy Digital Service",
      headerSubtitle: "Response time: instant",
      headerClose: "Close",
      headerCloseAriaLabel: "Close digital service",
      welcomeMessage:
        "Hello! Welcome to Itaicy Pantanal Eco Lodge.\n\nTo get started, please fill in your basic details below.",
      segmentQuestion: "How can I help you today?",
      segmentPlanning: "I want to visit",
      segmentPlanningDesc: "Check availability, rates and experiences",
      segmentGuest: "I have a reservation",
      segmentGuestDesc: "Access details of an existing booking",
      segmentExploring: "Just exploring",
      segmentExploringDesc: "Learn about Pantanal and Itaicy",
      segmentGuestPrompt: "I already have a reservation and need help accessing it.",
      segmentExploringPrompt: "I'm just exploring and would like to learn more about Itaicy Pantanal Eco Lodge.",
      leadNameLabel: "Full name",
      leadNamePlaceholder: "What should we call you?",
      leadEmailLabel: "Email",
      leadEmailPlaceholder: "example@email.com",
      leadWhatsappLabel: "WhatsApp",
      leadWhatsappPlaceholder: "+55 (00) 00000-0000",
      leadPrivacyText: "Your data is protected and used only for service purposes.",
      leadSubmit: "Start chat",
      leadPreviewMessage: "Perfect! How can I help you today?",
      leadPreviewPill1: "Availability",
      leadPreviewPill2: "Talk to team",
      calendarTitle: "Select dates",
      calendarClose: "Close",
      calendarCheckin: "Check-in",
      calendarCheckout: "Check-out",
      calendarGuests: "Guests",
      calendarGuestOption: (n) => `${n} guest${n > 1 ? "s" : ""}`,
      calendarSubmit: "Check availability",
      calendarHelpText: "We will check real-time availability for your dates.",
      handoffTitle: "Human support available",
      handoffServiceHoursFallback: "Business hours",
      handoffSlaLabel: (h) => `Avg. SLA ${h}h`,
      handoffCall: "Call",
      footerDisabledPlaceholder: "Fill in your details to start...",
      footerDisabledSend: "Send",
      footerInputAriaLabel: "Your message",
      footerInputPlaceholder: "Type your question...",
      footerBook: "Book",
      footerSend: "Send",
      footerSending: "Sending...",
      fabAriaLabel: "Open digital service",
      validationName: "Please enter your full name to start the service.",
      validationEmail: "Please enter a valid email address.",
      validationWhatsapp: "Please enter a valid WhatsApp number with country code.",
      calendarValidationDates: "Please select check-in and check-out dates.",
      calendarValidationCheckout: "Check-out date must be after check-in.",
      calendarValidationGuests: "Please enter the number of guests.",
    };
  }

  if (locale === "es") {
    return {
      headerTitle: "Atención digital Itaicy",
      headerSubtitle: "Tiempo de respuesta: instantáneo",
      headerClose: "Cerrar",
      headerCloseAriaLabel: "Cerrar atención digital",
      welcomeMessage:
        "¡Hola! Bienvenido al Itaicy Pantanal Eco Lodge.\n\nPara comenzar, complete sus datos básicos a continuación.",
      segmentQuestion: "¿En qué puedo ayudarle hoy?",
      segmentPlanning: "Quiero hospedarme",
      segmentPlanningDesc: "Consultar disponibilidad, tarifas y experiencias",
      segmentGuest: "Tengo una reserva",
      segmentGuestDesc: "Acceder a detalles de una reserva existente",
      segmentExploring: "Solo estoy explorando",
      segmentExploringDesc: "Conocer el Pantanal e Itaicy",
      segmentGuestPrompt: "Ya tengo una reserva y necesito ayuda para acceder a ella.",
      segmentExploringPrompt: "Solo estoy explorando y me gustaría conocer más sobre Itaicy Pantanal Eco Lodge.",
      leadNameLabel: "Nombre completo",
      leadNamePlaceholder: "¿Cómo debemos llamarle?",
      leadEmailLabel: "Correo electrónico",
      leadEmailPlaceholder: "ejemplo@email.com",
      leadWhatsappLabel: "WhatsApp",
      leadWhatsappPlaceholder: "+55 (00) 00000-0000",
      leadPrivacyText: "Sus datos están protegidos y se usan únicamente para la atención.",
      leadSubmit: "Iniciar atención",
      leadPreviewMessage: "¡Perfecto! ¿En qué puedo ayudarle hoy?",
      leadPreviewPill1: "Disponibilidad",
      leadPreviewPill2: "Hablar con equipo",
      calendarTitle: "Seleccionar fechas",
      calendarClose: "Cerrar",
      calendarCheckin: "Check-in",
      calendarCheckout: "Check-out",
      calendarGuests: "Huéspedes",
      calendarGuestOption: (n) => `${n} huésped${n > 1 ? "es" : ""}`,
      calendarSubmit: "Ver disponibilidad",
      calendarHelpText: "Consultaremos disponibilidad en tiempo real para sus fechas.",
      handoffTitle: "Atención humana disponible",
      handoffServiceHoursFallback: "Horario comercial",
      handoffSlaLabel: (h) => `SLA promedio ${h}h`,
      handoffCall: "Llamar",
      footerDisabledPlaceholder: "Complete sus datos para comenzar...",
      footerDisabledSend: "Enviar",
      footerInputAriaLabel: "Su mensaje",
      footerInputPlaceholder: "Escriba su pregunta...",
      footerBook: "Reservar",
      footerSend: "Enviar",
      footerSending: "Enviando...",
      fabAriaLabel: "Abrir atención digital",
      validationName: "Ingrese su nombre completo para iniciar la atención.",
      validationEmail: "Ingrese un correo electrónico válido.",
      validationWhatsapp: "Ingrese un WhatsApp válido con código de área.",
      calendarValidationDates: "Seleccione las fechas de check-in y check-out.",
      calendarValidationCheckout: "La fecha de check-out debe ser posterior al check-in.",
      calendarValidationGuests: "Ingrese la cantidad de huéspedes.",
    };
  }

  return {
    headerTitle: "Atendimento digital Itaicy",
    headerSubtitle: "Tempo de resposta: instantâneo",
    headerClose: "Fechar",
    headerCloseAriaLabel: "Fechar atendimento digital",
    welcomeMessage:
      "Olá! 🌿 Bem-vindo ao Itaicy Pantanal Eco Lodge.\n\nPara começarmos, preencha seus dados abaixo.",
    segmentQuestion: "Como posso ajudar você hoje?",
    segmentPlanning: "Quero me hospedar",
    segmentPlanningDesc: "Verificar disponibilidade, tarifas e experiências",
    segmentGuest: "Já tenho reserva",
    segmentGuestDesc: "Acessar detalhes de uma reserva existente",
    segmentExploring: "Só estou pesquisando",
    segmentExploringDesc: "Conhecer o Pantanal e a Itaicy",
    segmentGuestPrompt: "Já tenho reserva e preciso de ajuda para acessá-la.",
    segmentExploringPrompt: "Estou pesquisando e gostaria de conhecer mais sobre o Itaicy Pantanal Eco Lodge.",
    leadNameLabel: "Nome completo",
    leadNamePlaceholder: "Como podemos te chamar?",
    leadEmailLabel: "E-mail",
    leadEmailPlaceholder: "exemplo@email.com",
    leadWhatsappLabel: "WhatsApp",
    leadWhatsappPlaceholder: "+55 (00) 00000-0000",
    leadPrivacyText: "Seus dados ficam protegidos e são usados somente para atendimento.",
    leadSubmit: "Iniciar atendimento",
    leadPreviewMessage: "Perfeito! Como posso ajudar hoje?",
    leadPreviewPill1: "Disponibilidade",
    leadPreviewPill2: "Falar com equipe",
    calendarTitle: "Selecionar datas",
    calendarClose: "Fechar",
    calendarCheckin: "Check-in",
    calendarCheckout: "Check-out",
    calendarGuests: "Hóspedes",
    calendarGuestOption: (n) => `${n} hóspede${n > 1 ? "s" : ""}`,
    calendarSubmit: "Ver disponibilidade",
    calendarHelpText: "Vamos consultar disponibilidade em tempo real para suas datas.",
    handoffTitle: "Atendimento humano disponível",
    handoffServiceHoursFallback: "Horário comercial",
    handoffSlaLabel: (h) => `SLA médio ${h}h`,
    handoffCall: "Ligar",
    footerDisabledPlaceholder: "Preencha seus dados para começar...",
    footerDisabledSend: "Enviar",
    footerInputAriaLabel: "Sua mensagem",
    footerInputPlaceholder: "Digite sua pergunta...",
    footerBook: "Reservar",
    footerSend: "Enviar",
    footerSending: "Enviando...",
    fabAriaLabel: "Abrir atendimento digital",
    validationName: "Informe seu nome completo para iniciar o atendimento.",
    validationEmail: "Informe um e-mail válido.",
    validationWhatsapp: "Informe um WhatsApp válido com DDD.",
    calendarValidationDates: "Selecione check-in e check-out.",
    calendarValidationCheckout: "A data de check-out deve ser depois do check-in.",
    calendarValidationGuests: "Informe a quantidade de hóspedes.",
  };
}

/** Three bouncing dots — shown in the assistant bubble while waiting for the first token */
function TypingIndicator() {
  return (
    <span className="inline-flex items-center gap-[3px] py-0.5" aria-label="Agente digitando">
      <span className="block h-[7px] w-[7px] rounded-full bg-[#c4a97c] animate-bounce [animation-delay:-0.3s]" />
      <span className="block h-[7px] w-[7px] rounded-full bg-[#c4a97c] animate-bounce [animation-delay:-0.15s]" />
      <span className="block h-[7px] w-[7px] rounded-full bg-[#c4a97c] animate-bounce" />
    </span>
  );
}

function ConciergeBellIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
      <defs>
        <linearGradient id="bellGoldFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9EEBD" />
          <stop offset="40%" stopColor="#E5CC72" />
          <stop offset="75%" stopColor="#C4A445" />
          <stop offset="100%" stopColor="#A68832" />
        </linearGradient>
        <radialGradient id="bellGlow" cx="50%" cy="38%" r="50%">
          <stop offset="0%" stopColor="#FFF8D6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#D4B355" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Soft inner glow behind the bell */}
      <circle cx="32" cy="34" r="18" fill="url(#bellGlow)" />
      {/* Bell knob */}
      <circle cx="32" cy="18.5" r="3.8" fill="url(#bellGoldFill)" />
      {/* Bell dome */}
      <path
        d="M16.5 37c0-8.6 6.9-15.8 15.5-15.8S47.5 28.4 47.5 37v1H16.5v-1z"
        fill="url(#bellGoldFill)"
      />
      {/* Bell stem */}
      <rect x="30" y="38" width="4" height="3.5" rx="0.6" fill="url(#bellGoldFill)" />
      {/* Bell base */}
      <rect x="16" y="42" width="32" height="4.5" rx="2.25" fill="url(#bellGoldFill)" />
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

function getOptionCards(locale: Lang): OptionCard[] {
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
        description: "Transferir para atención humana",
        action: "prompt",
        prompt: "Quiero hablar con el equipo.",
        badge: "EQUIPO",
      },
      {
        id: "experiences",
        title: "Experiencias",
        description: "Birdwatching, ecoturismo y más",
        action: "prompt",
        prompt: "¿Qué experiencias ofrece Itaicy?",
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
      title: "Experiências",
      description: "Birdwatching, ecoturismo e mais",
      action: "prompt",
      prompt: "Quais experiências a Itaicy oferece?",
      badge: "PLUS",
    },
  ];
}

function getAvailabilityPrompt(
  locale: Lang,
  form: CalendarFormState,
): string {
  if (locale === "en") {
    return `Check availability from ${form.checkIn} to ${form.checkOut} for ${form.guests} guest(s).`;
  }

  if (locale === "es") {
    return `Verificar disponibilidad del ${form.checkIn} al ${form.checkOut} para ${form.guests} huésped(es).`;
  }

  return `Verificar disponibilidade de ${form.checkIn} até ${form.checkOut} para ${form.guests} hóspede(s).`;
}

export function ChatWidget() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [leadReady, setLeadReady] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<SegmentId | null>(null);
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

  const ui = useMemo(() => getChatUiStrings(lang), [lang]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isStreaming, activeTool, isOpen, leadReady]);

  const hasUserMessages = useMemo(
    () => messages.some((message) => message.role === "user"),
    [messages],
  );

  const optionCards = useMemo(() => getOptionCards(lang), [lang]);
  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const whatsappUrl = toWhatsappUrl(config.handoffWhatsapp);
  const phoneUrl = toPhoneUrl(config.handoffPhone);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = inputValue.trim();
    if (!next || !leadReady) return;
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
      setCalendarError(ui.calendarValidationDates);
      return;
    }

    if (calendarForm.checkOut <= calendarForm.checkIn) {
      setCalendarError(ui.calendarValidationCheckout);
      return;
    }

    if (calendarForm.guests.trim().length === 0) {
      setCalendarError(ui.calendarValidationGuests);
      return;
    }

    setCalendarError(null);
    setShowCalendar(false);
    await sendMessage(getAvailabilityPrompt(lang, calendarForm));
  }

  async function handleSegmentSelect(segment: SegmentId) {
    setSelectedSegment(segment);

    if (segment === "guest") {
      await sendMessage(ui.segmentGuestPrompt);
    } else if (segment === "exploring") {
      await sendMessage(ui.segmentExploringPrompt);
    }
    // "planning" → just shows option cards, no auto-message
  }

  function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let validationError: string | null = null;
    if (leadForm.name.trim().length < 3) {
      validationError = ui.validationName;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadForm.email.trim())) {
      validationError = ui.validationEmail;
    } else if (leadForm.whatsapp.replace(/\D/g, "").length < 8) {
      validationError = ui.validationWhatsapp;
    }

    if (validationError) {
      setLeadError(validationError);
      return;
    }

    clearError();
    setLeadError(null);
    setSelectedSegment(null);
    setLeadReady(true);
    setShowCalendar(false);
  }

  return (
    <div className="pointer-events-none fixed bottom-3 right-3 z-[80] flex w-[calc(100vw-24px)] max-w-[420px] flex-col items-end gap-3 sm:bottom-6 sm:right-6 sm:w-[400px]">
      <section
        className={cn(
          "pointer-events-auto flex w-full max-h-[90dvh] flex-col overflow-hidden border border-[#e5e7eb] bg-white text-[#111827] shadow-[0_26px_70px_-28px_rgba(15,23,42,0.45)] transition-all duration-200 ease-out",
          "rounded-2xl",
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-[0.98] opacity-0",
          isOpen &&
            "max-sm:fixed max-sm:inset-0 max-sm:max-h-[100dvh] max-sm:h-[100dvh] max-sm:w-screen max-sm:max-w-none max-sm:rounded-none",
        )}
        aria-hidden={!isOpen}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-[#f1f5f9] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#111827]">
                {ui.headerTitle}
              </p>
              <p className="truncate text-[11px] text-[#6b7280]">{ui.headerSubtitle}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full border border-[#e5e7eb] px-3 py-1 text-[11px] font-medium text-[#4b5563] transition-colors hover:bg-[#f8fafc]"
            aria-label={ui.headerCloseAriaLabel}
          >
            {ui.headerClose}
          </button>
        </header>

        {activeTool ? (
          <div className="flex shrink-0 items-center gap-2 border-b border-[#f1f5f9] bg-[#f8fafc] px-5 py-2 text-xs text-[#64748b]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#a88755]" />
            <span>{activeTool}</span>
          </div>
        ) : null}

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto px-5 py-5"
        >
          {!leadReady ? (
            <div className="space-y-5">
              <article className="max-w-[90%] rounded-2xl rounded-tl-sm border border-[#f3f4f6] bg-[#f9fafb] px-4 py-3 text-sm leading-relaxed text-[#374151]">
                {ui.welcomeMessage.split("\n").map((line, i) =>
                  line === "" ? <br key={i} /> : <span key={i}>{line}</span>,
                )}
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
                      {ui.leadNameLabel}
                    </label>
                    <input
                      id="lead-name"
                      value={leadForm.name}
                      onChange={(event) =>
                        setLeadForm((current) => ({ ...current, name: event.target.value }))
                      }
                      className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm text-[#111827] outline-none transition focus:border-[#a88755] focus:bg-white"
                      placeholder={ui.leadNamePlaceholder}
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="lead-email"
                      className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]"
                    >
                      {ui.leadEmailLabel}
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      value={leadForm.email}
                      onChange={(event) =>
                        setLeadForm((current) => ({ ...current, email: event.target.value }))
                      }
                      className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm text-[#111827] outline-none transition focus:border-[#a88755] focus:bg-white"
                      placeholder={ui.leadEmailPlaceholder}
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="lead-whatsapp"
                      className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]"
                    >
                      {ui.leadWhatsappLabel}
                    </label>
                    <input
                      id="lead-whatsapp"
                      type="tel"
                      value={leadForm.whatsapp}
                      onChange={(event) =>
                        setLeadForm((current) => ({ ...current, whatsapp: event.target.value }))
                      }
                      className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm text-[#111827] outline-none transition focus:border-[#a88755] focus:bg-white"
                      placeholder={ui.leadWhatsappPlaceholder}
                    />
                  </div>
                </div>

                {leadError ? (
                  <p className="mt-3 text-xs text-[#b91c1c]">{leadError}</p>
                ) : (
                  <p className="mt-3 text-xs text-[#6b7280]">{ui.leadPrivacyText}</p>
                )}

                <button
                  type="submit"
                  className="mt-3 w-full rounded-lg bg-[#a88755] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8f7246]"
                >
                  {ui.leadSubmit}
                </button>
              </form>

              <div className="pointer-events-none opacity-45">
                <article className="max-w-[85%] rounded-2xl rounded-tl-sm border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#4b5563]">
                  {ui.leadPreviewMessage}
                </article>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#d1d5db] px-3 py-1.5 text-xs text-[#6b7280]">
                    {ui.leadPreviewPill1}
                  </span>
                  <span className="rounded-full border border-[#d1d5db] px-3 py-1.5 text-xs text-[#6b7280]">
                    {ui.leadPreviewPill2}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {!hasUserMessages ? (
                <>
                  {/* V2 Segmentation: shown first, before option cards */}
                  {selectedSegment === null ? (
                    <div className="space-y-2.5 pt-1">
                      <p className="text-xs font-semibold text-[#6b7280]">
                        {ui.segmentQuestion}
                      </p>
                      {(
                        [
                          { id: "planning", label: ui.segmentPlanning, desc: ui.segmentPlanningDesc, icon: "🌿" },
                          { id: "guest", label: ui.segmentGuest, desc: ui.segmentGuestDesc, icon: "🔑" },
                          { id: "exploring", label: ui.segmentExploring, desc: ui.segmentExploringDesc, icon: "🔍" },
                        ] as const
                      ).map((seg) => (
                        <button
                          key={seg.id}
                          type="button"
                          disabled={isStreaming}
                          onClick={() => void handleSegmentSelect(seg.id)}
                          className="flex w-full items-center gap-3 rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-left transition-all hover:border-[#d4c7a1] hover:bg-[#fdfcf9] disabled:opacity-60"
                        >
                          <span className="text-base">{seg.icon}</span>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[#1f2937]">{seg.label}</p>
                            <p className="text-[11px] leading-relaxed text-[#64748b]">
                              {seg.desc}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : selectedSegment === "planning" ? (
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
                        <p className="text-xs font-semibold text-[#1f2937]">{ui.calendarTitle}</p>
                        <button
                          type="button"
                          onClick={() => {
                            setShowCalendar(false);
                            setCalendarError(null);
                          }}
                          className="rounded-md border border-[#e5e7eb] px-2 py-1 text-[10px] font-medium text-[#6b7280] hover:bg-white"
                        >
                          {ui.calendarClose}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        <label className="space-y-1">
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">
                            {ui.calendarCheckin}
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
                            {ui.calendarCheckout}
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
                            {ui.calendarGuests}
                          </span>
                          <select
                            value={calendarForm.guests}
                            onChange={(event) =>
                              setCalendarForm((current) => ({ ...current, guests: event.target.value }))
                            }
                            className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-xs text-[#1f2937] outline-none focus:border-[#a88755]"
                          >
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                              <option key={n} value={String(n)}>
                                {ui.calendarGuestOption(n)}
                              </option>
                            ))}
                          </select>
                        </label>

                        <button
                          type="submit"
                          className="self-end rounded-lg bg-[#a88755] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#8f7246]"
                        >
                          {ui.calendarSubmit}
                        </button>
                      </div>

                      {calendarError ? (
                        <p className="mt-2 text-[11px] text-[#b91c1c]">{calendarError}</p>
                      ) : (
                        <p className="mt-2 text-[11px] text-[#6b7280]">{ui.calendarHelpText}</p>
                      )}
                    </form>
                  ) : null}
                </>
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
                      <TypingIndicator />
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
          <div className="shrink-0 border-t border-[#f1f5f9] bg-[#f8fafc] px-5 py-3">
            <p className="text-sm font-semibold text-[#374151]">{ui.handoffTitle}</p>
            <p className="pt-0.5 text-xs text-[#64748b]">
              {config.handoffServiceHours || ui.handoffServiceHoursFallback}
              {config.handoffSlaHours > 0 ? ` - ${ui.handoffSlaLabel(config.handoffSlaHours)}` : ""}
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
                  {ui.handoffCall}
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
          <div className="shrink-0 border-t border-[#fecaca] bg-[#fff1f2] px-5 py-2.5 text-xs text-[#991b1b]">
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

        <footer className="shrink-0 border-t border-[#f1f5f9] bg-[#f8fafc] px-5 pb-4 pt-3">
          {!leadReady ? (
            <div className="space-y-2.5 opacity-60">
              <input
                disabled
                placeholder={ui.footerDisabledPlaceholder}
                className="w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2.5 text-sm text-[#94a3b8] outline-none"
              />
              <div className="flex items-center justify-between">
                <p className="max-w-[70%] text-[11px] text-[#94a3b8]">{config.disclaimer}</p>
                <button
                  type="button"
                  disabled
                  className="rounded-lg bg-[#cbd5e1] px-3 py-2 text-xs font-semibold text-white"
                >
                  {ui.footerDisabledSend}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <label htmlFor="chat-input" className="sr-only">
                {ui.footerInputAriaLabel}
              </label>
              <input
                id="chat-input"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={ui.footerInputPlaceholder}
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
                      {ui.footerBook}
                    </a>
                  ) : null}
                  <button
                    type="submit"
                    disabled={inputValue.trim().length === 0}
                    className="rounded-lg bg-[#a88755] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#8f7246] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {ui.footerSend}
                  </button>
                </div>
              </div>
            </form>
          )}
        </footer>
      </section>

      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto group relative isolate h-16 w-16 rounded-full border border-[#d5b86b] bg-[radial-gradient(circle_at_30%_22%,#4c412d_0%,#2f281d_55%,#1f1a12_100%)] shadow-[0_22px_42px_-18px_rgba(15,23,42,0.55)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_30px_54px_-20px_rgba(15,23,42,0.62)]"
          aria-label={ui.fabAriaLabel}
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
