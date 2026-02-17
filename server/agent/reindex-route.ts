import type { Request, Response } from "express";
import { z } from "zod";
import { reindexFaqsFromCmsWithOptions } from "./reindex-faqs";
import { denyIfUnauthorized } from "./admin-auth";

export async function handleFaqReindexRequest(req: Request, res: Response) {
  if (denyIfUnauthorized(req, res)) {
    return;
  }

  try {
    const requestSchema = z.object({
      source_doc_id: z.string().min(1).optional(),
    });
    const parsed = requestSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        status: "error",
        message: "Invalid payload for FAQ reindex endpoint.",
      });
      return;
    }

    const result = await reindexFaqsFromCmsWithOptions({
      sourceDocId: parsed.data.source_doc_id,
    });

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
