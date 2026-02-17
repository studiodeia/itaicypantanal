import type { Request, Response } from "express";
import { z } from "zod";
import { denyIfUnauthorized } from "./admin-auth";
import { getAgentMetricsSnapshot } from "./metrics";

const metricsQuerySchema = z.object({
  window_hours: z.coerce.number().int().min(1).max(24 * 30).default(24),
});

export async function handleAgentMetricsRequest(req: Request, res: Response) {
  if (denyIfUnauthorized(req, res)) {
    return;
  }

  const parsed = metricsQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({
      status: "error",
      message: "Invalid query params for agent metrics endpoint.",
    });
    return;
  }

  try {
    const snapshot = await getAgentMetricsSnapshot(parsed.data.window_hours);
    res.json({
      status: "ok",
      metrics: snapshot,
    });
  } catch (error) {
    res.status(503).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to load agent metrics",
    });
  }
}
