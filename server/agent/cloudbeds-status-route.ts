import type { Request, Response } from "express";
import { z } from "zod";
import { denyIfUnauthorized } from "./admin-auth";
import { cloudbedsClient, cloudbedsDebugSnapshot, formatCloudbedsError } from "./cloudbeds";

const statusQuerySchema = z.object({
  probe: z.coerce.boolean().default(false),
  probe_path: z.string().min(1).max(200).optional(),
});

export async function handleCloudbedsStatusRequest(req: Request, res: Response) {
  if (denyIfUnauthorized(req, res)) {
    return;
  }

  const parsed = statusQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({
      status: "error",
      message: "Invalid query params for Cloudbeds status endpoint.",
    });
    return;
  }

  const snapshot = cloudbedsDebugSnapshot();
  if (!parsed.data.probe) {
    res.json({
      status: "ok",
      cloudbeds: snapshot,
    });
    return;
  }

  // Default to a very cheap, broadly available endpoint in Cloudbeds PMS API.
  const probePath = parsed.data.probe_path || process.env.CLOUDBEDS_PROBE_PATH || "/getHotels";

  if (!cloudbedsClient.isEnabled()) {
    res.status(503).json({
      status: "error",
      message: "Cloudbeds client is disabled.",
      cloudbeds: snapshot,
    });
    return;
  }

  try {
    const startedAt = Date.now();
    const probeResult = await cloudbedsClient.request<unknown>(probePath, {
      method: "GET",
      bypassCache: true,
      cacheTtlMs: 0,
      timeoutMs: 8000,
    });

    res.json({
      status: "ok",
      latencyMs: Date.now() - startedAt,
      probePath,
      cloudbeds: snapshot,
      probeSummary:
        probeResult && typeof probeResult === "object"
          ? { keys: Object.keys(probeResult as Record<string, unknown>).slice(0, 10) }
          : { type: typeof probeResult },
    });
  } catch (error) {
    const formatted = formatCloudbedsError(error);
    res.status(503).json({
      status: "error",
      probePath,
      cloudbeds: snapshot,
      error: formatted,
    });
  }
}
