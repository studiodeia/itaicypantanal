import type { Request, Response } from "express";
import { z } from "zod";
import { db, isDatabaseAvailable } from "./db";
import { leads } from "../shared/schema";

const subscribeNewsletterSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  interests: z.array(z.string().trim().min(1).max(80)).max(12).default([]),
  source: z.string().trim().min(1).max(64).optional(),
  locale: z.enum(["pt", "en", "es"]).optional(),
});

type BrevoSyncResult = {
  enabled: boolean;
  synced: boolean;
  listIds: number[];
  tags: string[];
  reason?: string;
};

function slugifyInterest(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function dedupe<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function parsePositiveInt(raw: string | undefined): number | null {
  if (!raw) return null;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return null;
  return parsed;
}

function parseInterestListMap(raw: string | undefined): Map<string, number> {
  if (!raw) return new Map();
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const entries = Object.entries(parsed)
      .map(([key, value]) => [slugifyInterest(key), Number.parseInt(String(value), 10)] as const)
      .filter(([, value]) => Number.isFinite(value) && value > 0);
    return new Map(entries);
  } catch {
    return new Map();
  }
}

async function syncLeadToBrevo(
  payload: {
    name: string;
    email: string;
    interests: string[];
    source: string;
  },
): Promise<BrevoSyncResult> {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const baseListId = parsePositiveInt(process.env.BREVO_NEWSLETTER_LIST_ID);
  const interestListMap = parseInterestListMap(process.env.BREVO_INTEREST_LIST_IDS_JSON);
  const tagPrefix = process.env.BREVO_INTEREST_TAG_PREFIX?.trim() || "interesse_";
  const interestTags = payload.interests.map((interest) => `${tagPrefix}${slugifyInterest(interest)}`);

  const listIds = dedupe(
    [
      baseListId,
      ...payload.interests.map((interest) => interestListMap.get(slugifyInterest(interest)) ?? null),
    ].filter((id): id is number => typeof id === "number" && id > 0),
  );

  if (!apiKey) {
    return {
      enabled: false,
      synced: false,
      listIds,
      tags: interestTags,
      reason: "BREVO_API_KEY is not configured.",
    };
  }

  const [firstName, ...lastNameParts] = payload.name.split(/\s+/);
  const lastName = lastNameParts.join(" ").trim();

  const attributes: Record<string, string> = {
    FIRSTNAME: firstName ?? "",
    LASTNAME: lastName,
    LEAD_SOURCE: payload.source,
  };

  const interestsAttribute = process.env.BREVO_NEWSLETTER_INTERESTS_ATTRIBUTE?.trim();
  if (interestsAttribute) {
    attributes[interestsAttribute] = payload.interests.join(", ");
  }

  const tagsAttribute = process.env.BREVO_NEWSLETTER_TAGS_ATTRIBUTE?.trim();
  if (tagsAttribute) {
    attributes[tagsAttribute] = interestTags.join(", ");
  }

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      email: payload.email,
      updateEnabled: true,
      listIds,
      attributes,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Brevo sync failed (${response.status}): ${errorText.slice(0, 400)}`,
    );
  }

  return {
    enabled: true,
    synced: true,
    listIds,
    tags: interestTags,
  };
}

export async function handleNewsletterSubscribeRequest(req: Request, res: Response) {
  const parsed = subscribeNewsletterSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Payload invalido para newsletter.",
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  const name = parsed.data.name.trim();
  const email = parsed.data.email.trim().toLowerCase();
  const interests = dedupe(
    parsed.data.interests
      .map((interest) => interest.trim())
      .filter((interest) => interest.length > 0),
  );
  const source = parsed.data.source ?? "footer-newsletter";

  if (isDatabaseAvailable() && db) {
    try {
      await db.insert(leads).values({
        name,
        email,
        sourceIntent: "newsletter",
        context: {
          source,
          locale: parsed.data.locale ?? "pt",
          interests,
          channel: "footer",
        },
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha ao salvar lead no banco.";
      res.status(500).json({ message });
      return;
    }
  }

  let brevo: BrevoSyncResult;
  try {
    brevo = await syncLeadToBrevo({
      name,
      email,
      interests,
      source,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Falha ao sincronizar lead com Brevo.";
    res.status(502).json({
      message: "Lead recebido, mas a sincronizacao com Brevo falhou.",
      detail: message,
    });
    return;
  }

  res.status(200).json({
    status: "ok",
    lead: {
      name,
      email,
      interests,
    },
    brevo,
  });
}

