import type { Request, Response } from "express";
import { reindexFaqsFromCms } from "./reindex-faqs";

function isAuthorized(req: Request): boolean {
  const configuredKey = process.env.AGENT_ADMIN_KEY;

  if (!configuredKey) {
    return process.env.NODE_ENV === "development";
  }

  const provided = req.header("x-agent-admin-key");
  return provided === configuredKey;
}

export async function handleFaqReindexRequest(req: Request, res: Response) {
  if (!isAuthorized(req)) {
    res.status(401).json({
      message: "Unauthorized reindex request.",
    });
    return;
  }

  try {
    const result = await reindexFaqsFromCms();
    res.json({
      status: "ok",
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to reindex FAQs",
    });
  }
}
