import type { GlobalAfterChangeHook } from "payload";

type SiteSettingsFaqItem = {
  question?: string;
  answer?: string;
};

type SiteSettingsDoc = {
  faqItems?: SiteSettingsFaqItem[];
};

function normalizeFaqItems(doc: SiteSettingsDoc | null | undefined): Array<{
  question: string;
  answer: string;
}> {
  const items = Array.isArray(doc?.faqItems) ? doc.faqItems : [];
  return items
    .map((item) => ({
      question: typeof item.question === "string" ? item.question.trim() : "",
      answer: typeof item.answer === "string" ? item.answer.trim() : "",
    }))
    .filter((item) => item.question.length > 0 && item.answer.length > 0);
}

function hasFaqItemsChanged(
  nextDoc: SiteSettingsDoc | null | undefined,
  previousDoc: SiteSettingsDoc | null | undefined,
): boolean {
  const before = JSON.stringify(normalizeFaqItems(previousDoc));
  const after = JSON.stringify(normalizeFaqItems(nextDoc));
  return before !== after;
}

async function postFaqReindex() {
  const endpoint =
    process.env.AGENT_REINDEX_URL ||
    "http://127.0.0.1:5000/api/agent/reindex/faqs";
  const timeoutMs = Number(process.env.AGENT_REINDEX_TIMEOUT_MS || 4000);
  const adminKey = process.env.AGENT_REINDEX_KEY;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(adminKey ? { "x-agent-admin-key": adminKey } : {}),
      },
      body: JSON.stringify({}),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`reindex endpoint returned HTTP ${response.status}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}

export const triggerAgentFaqReindexAfterSiteSettingsChange: GlobalAfterChangeHook =
  async ({ doc, previousDoc, req }) => {
    const changed = hasFaqItemsChanged(
      doc as SiteSettingsDoc | null | undefined,
      previousDoc as SiteSettingsDoc | null | undefined,
    );

    if (!changed) {
      return doc;
    }

    try {
      await postFaqReindex();
      req.payload.logger.info(
        "[agent-reindex] SiteSettings FAQ changed; reindex requested.",
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "unknown reindex trigger error";
      req.payload.logger.warn(
        `[agent-reindex] Failed to trigger FAQ reindex: ${message}`,
      );
    }

    return doc;
  };
