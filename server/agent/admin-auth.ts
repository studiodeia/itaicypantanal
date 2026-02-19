import type { Request, Response } from "express";

export function isAgentAdminAuthorized(req: Request): boolean {
  const configuredKey = process.env.AGENT_ADMIN_KEY?.trim();

  if (!configuredKey) {
    return process.env.NODE_ENV === "development";
  }

  const provided = req.header("x-agent-admin-key")?.trim();
  return Boolean(provided) && provided === configuredKey;
}

export function denyIfUnauthorized(req: Request, res: Response): boolean {
  if (isAgentAdminAuthorized(req)) return false;

  res.status(401).json({
    message: "Unauthorized agent admin request.",
  });
  return true;
}
