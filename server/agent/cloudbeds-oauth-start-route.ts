import { randomUUID } from "node:crypto";
import type { Request, Response } from "express";

function getBaseUrl(req: Request): string {
  const envBase = process.env.SITE_URL?.trim().replace(/\/+$/, "");
  if (envBase) return envBase;

  const proto = req.header("x-forwarded-proto") || req.protocol || "https";
  const host = req.header("x-forwarded-host") || req.header("host") || "localhost:5000";
  return `${proto}://${host}`;
}

export async function handleCloudbedsOAuthStart(req: Request, res: Response) {
  const clientId = process.env.CLOUDBEDS_CLIENT_ID?.trim() || "";
  if (!clientId) {
    res.status(500).json({
      message: "CLOUDBEDS_CLIENT_ID is missing.",
    });
    return;
  }

  const baseUrl = getBaseUrl(req);
  const redirectUri =
    process.env.CLOUDBEDS_OAUTH_REDIRECT_URI?.trim() ||
    `${baseUrl}/api/agent/cloudbeds/oauth/callback`;
  const authorizeUrlBase =
    process.env.CLOUDBEDS_OAUTH_AUTHORIZE_URL?.trim() ||
    "https://api.cloudbeds.com/api/v1.3/oauth";

  const state =
    typeof req.query.state === "string" && req.query.state.trim().length > 0
      ? req.query.state.trim()
      : randomUUID();

  const authorizeUrl = new URL(authorizeUrlBase);
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("state", state);
  const scope = process.env.CLOUDBEDS_SCOPE?.trim();
  if (scope) {
    authorizeUrl.searchParams.set("scope", scope);
  }

  const shouldRedirect =
    typeof req.query.redirect === "string"
      ? req.query.redirect !== "false"
      : true;

  if (shouldRedirect) {
    res.redirect(302, authorizeUrl.toString());
    return;
  }

  res.json({
    authorize_url: authorizeUrl.toString(),
    redirect_uri: redirectUri,
    state,
  });
}
