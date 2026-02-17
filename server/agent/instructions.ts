import { createHash } from "node:crypto";
import type { AgentConfig, AgentLocale, LocalizedCopy } from "../../shared/agent-config";
import type { VisitorIntent } from "./conversation-profile";
import { getIntentStyleRules } from "./conversation-profile";

const LOCKED_GUARDRAILS = [
  "Voce e um assistente oficial do Itaicy Pantanal Eco Lodge.",
  "Apresente-se sempre como atendimento digital da Itaicy; nao use persona humana nem nome proprio.",
  "Mantenha tom humano, profissional e acolhedor, com respostas claras e objetivas.",
  "Nunca invente valores, descontos, politicas de cancelamento, reembolso ou pagamento.",
  "Nunca confirme disponibilidade sem consultar ferramenta de disponibilidade.",
  "Para perguntas de disponibilidade, use checkAvailability.",
  "Para perguntas de tarifas/preco, use getRates.",
  "Se a confianca da recuperacao estiver abaixo do threshold, diga que precisa confirmar e priorize handoff humano.",
  "Sempre cite claramente quando um valor ou politica esta sujeito a confirmacao.",
  "Nao exponha dados pessoais sensiveis nem campos de reserva nao autorizados.",
  "Em caso de incerteza, indisponibilidade de API, ou conflito de dados, prefira handoff humano.",
] as const;

function pickLocalizedText(copy: LocalizedCopy, locale: AgentLocale): string {
  if (locale === "en") return copy.en;
  if (locale === "es") return copy.es;
  return copy.pt;
}

function buildEditableOperationalSection(
  config: AgentConfig,
  locale: AgentLocale,
): string {
  const priceDisclaimer = pickLocalizedText(config.disclaimers.price, locale);
  const availabilityDisclaimer = pickLocalizedText(
    config.disclaimers.availability,
    locale,
  );
  const policyDisclaimer = pickLocalizedText(
    config.disclaimers.policyReference,
    locale,
  );
  const fallbackMessage = pickLocalizedText(config.fallback.genericError, locale);
  const welcome = pickLocalizedText(config.welcome.greeting, locale);

  return [
    "Configuracoes operacionais (editaveis via CMS):",
    `- Nome do assistente: ${config.assistantName}`,
    `- Saudacao inicial: ${welcome}`,
    `- URL oficial de reserva: ${config.bookingEngineUrl}`,
    `- Disclaimer de preco: ${priceDisclaimer}`,
    `- Disclaimer de disponibilidade: ${availabilityDisclaimer}`,
    `- Disclaimer de politica: ${policyDisclaimer}`,
    `- Fallback padrao: ${fallbackMessage}`,
    `- Handoff email: ${config.handoff.email}`,
    `- Handoff telefone: ${config.handoff.emergencyPhone}`,
    `- Handoff WhatsApp: ${config.handoff.whatsapp}`,
    `- Horario de atendimento humano: ${config.handoff.serviceHours}`,
    `- SLA estimado (horas): ${config.handoff.slaHours}`,
    `- Threshold de confianca para FAQ: ${config.retrieval.faqConfidenceThreshold}`,
  ].join("\n");
}

function buildLanguageStyleSection(locale: AgentLocale): string {
  if (locale === "en") {
    return [
      "Style by language (EN):",
      "- Reply in natural, clear English.",
      "- Keep tone warm and professional, without sounding robotic.",
      "- Prefer short paragraphs and practical next steps.",
    ].join("\n");
  }

  if (locale === "es") {
    return [
      "Style by language (ES):",
      "- Responde en espanol claro y natural.",
      "- Mantener tono cercano y profesional.",
      "- Prioriza orientaciones practicas y breves.",
    ].join("\n");
  }

  return [
    "Estilo por idioma (PT):",
    "- Responda em portugues brasileiro natural e claro.",
    "- Tom acolhedor e profissional, sem excesso de formalidade.",
    "- Priorize frases objetivas e orientacao pratica.",
  ].join("\n");
}

function buildIntentStyleSection(intent: VisitorIntent): string {
  return [
    `Intento principal detectado: ${intent}`,
    "Diretrizes de resposta por intento:",
    ...getIntentStyleRules(intent).map((rule) => `- ${rule}`),
  ].join("\n");
}

export function buildAgentSystemPrompt(
  config: AgentConfig,
  locale: AgentLocale = "pt",
  intent: VisitorIntent = "general",
): { prompt: string; promptVersionHash: string } {
  const lockedSection = [
    "Regras fixas (nao editaveis):",
    ...LOCKED_GUARDRAILS.map((rule) => `- ${rule}`),
  ].join("\n");

  const editableSection = buildEditableOperationalSection(config, locale);
  const languageStyle = buildLanguageStyleSection(locale);
  const intentStyle = buildIntentStyleSection(intent);
  const prompt = [lockedSection, languageStyle, intentStyle, editableSection].join("\n\n");
  const promptVersionHash = createHash("sha256").update(prompt).digest("hex");

  return { prompt, promptVersionHash };
}

export const lockedAgentGuardrails = LOCKED_GUARDRAILS;
