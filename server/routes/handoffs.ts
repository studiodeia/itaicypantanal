import type { Request, Response } from "express";
import { z } from "zod";
import { db, isDatabaseAvailable } from "../db";
import { handoffs } from "../../shared/schema";

const createHandoffSchema = z.object({
  sessionId: z.string().trim().min(1).max(64),
  intent: z.string().trim().max(32).default("general"),
  urgency: z.enum(["low", "normal", "high"]).default("normal"),
  contextSummary: z.string().trim().max(2000).default(""),
  guestAuthenticated: z.boolean().default(false),
  channel: z.enum(["whatsapp", "phone", "email"]),
});

export async function handleCreateHandoffRequest(req: Request, res: Response) {
  const parsed = createHandoffSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid handoff payload.",
      issues: parsed.error.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      })),
    });
    return;
  }

  if (!isDatabaseAvailable() || !db) {
    res.status(200).json({ status: "accepted", persisted: false });
    return;
  }

  try {
    await db.insert(handoffs).values({
      sessionId: parsed.data.sessionId,
      intent: parsed.data.intent,
      urgency: parsed.data.urgency,
      contextSummary: parsed.data.contextSummary,
      guestAuthenticated: parsed.data.guestAuthenticated,
      channel: parsed.data.channel,
    });

    res.status(201).json({ status: "ok", persisted: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save handoff.";
    res.status(500).json({ message });
  }
}
