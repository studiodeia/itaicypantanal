import { z } from "zod";

export const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(4000),
  session_id: z.string().uuid().optional(),
  guest_token: z.string().min(10).optional(),
  lang: z.enum(["pt", "en", "es"]).optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

export const groundingLevelSchema = z.enum(["full", "partial", "none"]);
export type GroundingLevel = z.infer<typeof groundingLevelSchema>;

export const sourceRefSchema = z.object({
  source_id: z.string().min(1),
  source_type: z.enum(["faq", "policy", "cms", "reservation", "unknown"]),
  title: z.string().optional(),
  score: z.number().min(0).max(1).optional(),
});
export type SourceRef = z.infer<typeof sourceRefSchema>;

export const chatTokenEventSchema = z.object({
  event: z.literal("token"),
  text: z.string(),
});

export const chatToolStartEventSchema = z.object({
  event: z.literal("tool_start"),
  tool: z.string().min(1),
  input: z.record(z.string(), z.unknown()).optional(),
});

export const chatToolEndEventSchema = z.object({
  event: z.literal("tool_end"),
  tool: z.string().min(1),
  status: z.enum(["success", "error", "fallback"]),
  confidence_score: z.number().min(0).max(1).optional(),
  source_refs: z.array(sourceRefSchema).optional(),
  grounding_level: groundingLevelSchema.optional(),
  output_summary: z.string().optional(),
  error: z.string().optional(),
});

export const chatDoneEventSchema = z.object({
  event: z.literal("done"),
  session_id: z.string().uuid(),
  confidence_score: z.number().min(0).max(1).optional(),
  source_refs: z.array(sourceRefSchema).default([]),
  grounding_level: groundingLevelSchema.default("none"),
});

export const chatErrorEventSchema = z.object({
  event: z.literal("error"),
  code: z.enum(["bad_request", "rate_limited", "upstream_unavailable", "internal"]),
  message: z.string(),
  retryable: z.boolean().default(false),
});

export const chatSseEventSchema = z.discriminatedUnion("event", [
  chatTokenEventSchema,
  chatToolStartEventSchema,
  chatToolEndEventSchema,
  chatDoneEventSchema,
  chatErrorEventSchema,
]);

export type ChatSseEvent = z.infer<typeof chatSseEventSchema>;
