import type { Request, Response } from "express";
import { z } from "zod";
import { db, isDatabaseAvailable } from "../db";
import { leads } from "../../shared/schema";

const createLeadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional(),
  consentLgpd: z.boolean().default(false),
  sourceIntent: z.string().trim().max(32).optional(),
  context: z.record(z.unknown()).optional(),
});

export async function handleCreateLeadRequest(req: Request, res: Response) {
  const parsed = createLeadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid lead payload.",
      issues: parsed.error.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      })),
    });
    return;
  }

  if (!isDatabaseAvailable() || !db) {
    // Accept the lead even without DB — don't block the UX
    res.status(200).json({ status: "accepted", persisted: false });
    return;
  }

  try {
    await db.insert(leads).values({
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      phone: parsed.data.phone ?? null,
      consentLgpd: parsed.data.consentLgpd,
      consentTimestamp: parsed.data.consentLgpd ? new Date() : null,
      sourceIntent: parsed.data.sourceIntent ?? "chat",
      context: parsed.data.context ?? null,
    });

    res.status(201).json({ status: "ok", persisted: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save lead.";
    res.status(500).json({ message });
  }
}
