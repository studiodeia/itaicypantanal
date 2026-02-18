import type { Request, Response, NextFunction } from "express";

const canonicalHost = (
  process.env.CANONICAL_HOST || "www.itaicypantanal.com.br"
).trim().toLowerCase();

const redirectFromHosts = new Set(
  (process.env.CANONICAL_REDIRECT_FROM || "itaicypantanal.com.br")
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean),
);

function normalizeHost(raw: string): string {
  return raw.toLowerCase().replace(/:\d+$/, "");
}

function resolveRequestHost(req: Request): string {
  const forwardedHost = req.header("x-forwarded-host");
  const host = (forwardedHost || req.header("host") || "").split(",")[0]?.trim();
  return normalizeHost(host || "");
}

function resolveProtocol(req: Request): "http" | "https" {
  const forwardedProto = req.header("x-forwarded-proto");
  const proto = (forwardedProto || req.protocol || "https")
    .split(",")[0]
    ?.trim()
    .toLowerCase();
  return proto === "http" ? "http" : "https";
}

export function canonicalHostRedirectMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const currentHost = resolveRequestHost(req);
  if (!currentHost || !redirectFromHosts.has(currentHost)) {
    next();
    return;
  }

  const protocol = resolveProtocol(req);
  const target = `${protocol}://${canonicalHost}${req.originalUrl || "/"}`;
  res.redirect(301, target);
}
