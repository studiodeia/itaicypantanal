import {
  defaultAgentConfig,
  normalizeAgentConfig,
  type AgentConfig,
} from "./agent-config";

export const payloadAgentConfigMappedFields = [
  "enabled",
  "assistantName",
  "bookingEngineUrl",
  "faqConfidenceThreshold",
  "priceDisclaimer",
  "availabilityDisclaimer",
  "policyDisclaimer",
  "handoff",
  "genericErrorFallback",
  "apiUnavailableFallback",
  "leadConsentPrompt",
  "leadSuccessMessage",
  "welcomeGreeting",
] as const;

export const payloadAgentConfigIgnoredFields = [
  "id",
  "createdAt",
  "updatedAt",
  "globalType",
] as const;

export function mapPayloadAgentConfigToAgentConfig(
  raw: Record<string, unknown>,
): AgentConfig {
  return normalizeAgentConfig(
    {
      enabled: raw.enabled,
      assistantName: raw.assistantName,
      bookingEngineUrl: raw.bookingEngineUrl,
      faqConfidenceThreshold: raw.faqConfidenceThreshold,
      disclaimers: {
        price: raw.priceDisclaimer,
        availability: raw.availabilityDisclaimer,
        policyReference: raw.policyDisclaimer,
      },
      handoff: raw.handoff,
      fallback: {
        genericError: raw.genericErrorFallback,
        apiUnavailable: raw.apiUnavailableFallback,
      },
      lead: {
        consentPrompt: raw.leadConsentPrompt,
        successMessage: raw.leadSuccessMessage,
      },
      welcome: {
        greeting: raw.welcomeGreeting,
      },
    },
    defaultAgentConfig,
  );
}
