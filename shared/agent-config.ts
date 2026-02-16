export type AgentLocale = "pt" | "en" | "es";

export type LocalizedCopy = {
  pt: string;
  en: string;
  es: string;
};

export type AgentDisclaimers = {
  price: LocalizedCopy;
  availability: LocalizedCopy;
  policyReference: LocalizedCopy;
};

export type AgentHandoffConfig = {
  email: string;
  emergencyPhone: string;
  whatsapp: string;
  serviceHours: string;
  slaHours: number;
};

export type AgentFallbackCopy = {
  genericError: LocalizedCopy;
  apiUnavailable: LocalizedCopy;
};

export type AgentLeadCopy = {
  consentPrompt: LocalizedCopy;
  successMessage: LocalizedCopy;
};

export type AgentWelcomeCopy = {
  greeting: LocalizedCopy;
};

export type AgentRetrievalConfig = {
  faqConfidenceThreshold: number;
};

export type AgentConfig = {
  enabled: boolean;
  assistantName: string;
  bookingEngineUrl: string;
  disclaimers: AgentDisclaimers;
  handoff: AgentHandoffConfig;
  fallback: AgentFallbackCopy;
  lead: AgentLeadCopy;
  welcome: AgentWelcomeCopy;
  retrieval: AgentRetrievalConfig;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function toStringValue(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function toBooleanValue(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function toNumberValue(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function toLocalizedCopy(
  value: unknown,
  fallback: LocalizedCopy,
): LocalizedCopy {
  const record = isRecord(value) ? value : {};
  return {
    pt: toStringValue(record.pt, fallback.pt),
    en: toStringValue(record.en, fallback.en),
    es: toStringValue(record.es, fallback.es),
  };
}

export const defaultAgentConfig: AgentConfig = {
  enabled: true,
  assistantName: "Assistente Itaicy",
  bookingEngineUrl: "https://hotels.cloudbeds.com/reservation/ITAICY",
  disclaimers: {
    price: {
      pt: "Valores a partir de, sujeitos a variação conforme datas, ocupação e disponibilidade. Confirmação final no motor de reservas.",
      en: "Rates are starting prices and may vary by dates, occupancy, and availability. Final confirmation is provided in the official booking engine.",
      es: "Las tarifas son referenciales y pueden variar según fechas, ocupación y disponibilidad. La confirmación final se realiza en el motor oficial de reservas.",
    },
    availability: {
      pt: "Disponibilidade sujeita a confirmação no momento da reserva.",
      en: "Availability is subject to confirmation at the time of booking.",
      es: "La disponibilidad está sujeta a confirmación al momento de la reserva.",
    },
    policyReference: {
      pt: "Confira os termos completos no momento da reserva.",
      en: "Please review full terms at the time of booking.",
      es: "Consulte los términos completos al momento de la reserva.",
    },
  },
  handoff: {
    email: "itaicy-digital@studiodeia.com.br",
    emergencyPhone: "+55 (67) 99999-9999",
    whatsapp: "+55 (67) 99999-9999",
    serviceHours: "Segunda a sexta, 08:00-18:00 (BRT)",
    slaHours: 24,
  },
  fallback: {
    genericError: {
      pt: "Estou com instabilidade agora. Posso te conectar com nossa equipe para continuar o atendimento.",
      en: "I am experiencing instability right now. I can connect you with our team to continue the assistance.",
      es: "Estoy con inestabilidad en este momento. Puedo conectarte con nuestro equipo para continuar la atención.",
    },
    apiUnavailable: {
      pt: "No momento não consigo consultar este dado em tempo real. Posso encaminhar seu atendimento para nossa equipe.",
      en: "I cannot retrieve this information in real time at the moment. I can forward your request to our team.",
      es: "En este momento no puedo consultar este dato en tiempo real. Puedo derivar tu atención a nuestro equipo.",
    },
  },
  lead: {
    consentPrompt: {
      pt: "Você concorda que usemos seu contato para enviar informações sobre a Itaicy?",
      en: "Do you agree that we may use your contact details to send information about Itaicy?",
      es: "¿Estás de acuerdo en que usemos tu contacto para enviar información sobre Itaicy?",
    },
    successMessage: {
      pt: "Perfeito! Nossa equipe entrará em contato em breve.",
      en: "Great! Our team will contact you shortly.",
      es: "¡Perfecto! Nuestro equipo te contactará en breve.",
    },
  },
  welcome: {
    greeting: {
      pt: "Olá! Sou o assistente virtual do Itaicy Pantanal Eco Lodge. Posso ajudar com hospedagem, experiências, disponibilidade e reservas.",
      en: "Hello! I am Itaicy Pantanal Eco Lodge virtual assistant. I can help with accommodation, experiences, availability, and bookings.",
      es: "¡Hola! Soy el asistente virtual de Itaicy Pantanal Eco Lodge. Puedo ayudarte con alojamiento, experiencias, disponibilidad y reservas.",
    },
  },
  retrieval: {
    faqConfidenceThreshold: 0.75,
  },
};

export function normalizeAgentConfig(
  value: unknown,
  fallback: AgentConfig = defaultAgentConfig,
): AgentConfig {
  const record = isRecord(value) ? value : {};
  const disclaimers = isRecord(record.disclaimers) ? record.disclaimers : {};
  const handoff = isRecord(record.handoff) ? record.handoff : {};
  const fallbackCopy = isRecord(record.fallback) ? record.fallback : {};
  const lead = isRecord(record.lead) ? record.lead : {};
  const welcome = isRecord(record.welcome) ? record.welcome : {};

  return {
    enabled: toBooleanValue(record.enabled, fallback.enabled),
    assistantName: toStringValue(record.assistantName, fallback.assistantName),
    bookingEngineUrl: toStringValue(
      record.bookingEngineUrl,
      fallback.bookingEngineUrl,
    ),
    disclaimers: {
      price: toLocalizedCopy(disclaimers.price, fallback.disclaimers.price),
      availability: toLocalizedCopy(
        disclaimers.availability,
        fallback.disclaimers.availability,
      ),
      policyReference: toLocalizedCopy(
        disclaimers.policyReference,
        fallback.disclaimers.policyReference,
      ),
    },
    handoff: {
      email: toStringValue(handoff.email, fallback.handoff.email),
      emergencyPhone: toStringValue(
        handoff.emergencyPhone,
        fallback.handoff.emergencyPhone,
      ),
      whatsapp: toStringValue(handoff.whatsapp, fallback.handoff.whatsapp),
      serviceHours: toStringValue(
        handoff.serviceHours,
        fallback.handoff.serviceHours,
      ),
      slaHours: toNumberValue(handoff.slaHours, fallback.handoff.slaHours),
    },
    fallback: {
      genericError: toLocalizedCopy(
        fallbackCopy.genericError,
        fallback.fallback.genericError,
      ),
      apiUnavailable: toLocalizedCopy(
        fallbackCopy.apiUnavailable,
        fallback.fallback.apiUnavailable,
      ),
    },
    lead: {
      consentPrompt: toLocalizedCopy(
        lead.consentPrompt,
        fallback.lead.consentPrompt,
      ),
      successMessage: toLocalizedCopy(
        lead.successMessage,
        fallback.lead.successMessage,
      ),
    },
    welcome: {
      greeting: toLocalizedCopy(welcome.greeting, fallback.welcome.greeting),
    },
    retrieval: {
      faqConfidenceThreshold: clamp(
        toNumberValue(
          record.faqConfidenceThreshold,
          fallback.retrieval.faqConfidenceThreshold,
        ),
        0,
        1,
      ),
    },
  };
}
