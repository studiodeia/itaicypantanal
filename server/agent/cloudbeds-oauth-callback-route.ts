import fs from "node:fs/promises";
import path from "node:path";
import type { Request, Response } from "express";
import { z } from "zod";

const callbackQuerySchema = z.object({
  code: z.string().min(1).optional(),
  authorization_code: z.string().min(1).optional(),
  state: z.string().optional(),
  error: z.string().optional(),
  error_description: z.string().optional(),
}).passthrough();

type CallbackConfig = {
  tokenUrl: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  grantType: string;
};

function getBaseUrl(req: Request): string {
  const envBase = process.env.SITE_URL?.trim().replace(/\/+$/, "");
  if (envBase) return envBase;

  const proto = req.header("x-forwarded-proto") || req.protocol || "https";
  const host = req.header("x-forwarded-host") || req.header("host") || "localhost:5000";
  return `${proto}://${host}`;
}

function getCallbackConfig(req: Request): CallbackConfig {
  const baseUrl = getBaseUrl(req);

  return {
    tokenUrl:
      process.env.CLOUDBEDS_OAUTH_TOKEN_URL?.trim() ||
      "https://api.cloudbeds.com/api/v1.3/access_token",
    clientId: process.env.CLOUDBEDS_CLIENT_ID?.trim() || "",
    clientSecret: process.env.CLOUDBEDS_CLIENT_SECRET?.trim() || "",
    redirectUri:
      process.env.CLOUDBEDS_OAUTH_REDIRECT_URI?.trim() ||
      `${baseUrl}/api/agent/cloudbeds/oauth/callback`,
    grantType: process.env.CLOUDBEDS_OAUTH_CALLBACK_GRANT_TYPE?.trim() || "authorization_code",
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHtml(title: string, message: string, details?: string[]) {
  const detailList = (details || [])
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
      body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; background: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
      .card { max-width: 720px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; box-shadow: 0 10px 30px rgba(2,6,23,.06); }
      h1 { font-size: 20px; margin: 0 0 10px; }
      p { margin: 0 0 12px; color: #334155; }
      ul { margin: 0; padding-left: 20px; color: #475569; }
      code { background: #f1f5f9; padding: 2px 6px; border-radius: 6px; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(message)}</p>
      ${detailList ? `<ul>${detailList}</ul>` : ""}
    </div>
  </body>
</html>`;
}

function parseTokenPayload(raw: unknown): {
  accessToken: string;
  refreshToken: string;
  expiresIn: number | null;
  tokenType: string;
} {
  const rec = (raw || {}) as Record<string, unknown>;

  const accessToken =
    typeof rec.access_token === "string" ? rec.access_token.trim() : "";
  const refreshToken =
    typeof rec.refresh_token === "string" ? rec.refresh_token.trim() : "";
  const tokenType = typeof rec.token_type === "string" ? rec.token_type : "Bearer";
  const expiresInRaw = Number.parseInt(String(rec.expires_in ?? ""), 10);
  const expiresIn = Number.isFinite(expiresInRaw) ? expiresInRaw : null;

  if (accessToken.length === 0) {
    throw new Error("Cloudbeds response missing access_token.");
  }

  return {
    accessToken,
    refreshToken,
    expiresIn,
    tokenType,
  };
}

async function upsertEnvFile(values: Record<string, string>) {
  const envFilePath = path.resolve(process.cwd(), ".env");

  let content = "";
  try {
    content = await fs.readFile(envFilePath, "utf8");
  } catch {
    content = "";
  }

  const lines = content.length > 0 ? content.split(/\r?\n/) : [];
  const used = new Set<string>();

  const updatedLines = lines.map((line) => {
    const match = line.match(/^([A-Z0-9_]+)=/);
    if (!match) return line;

    const key = match[1];
    if (!(key in values)) return line;

    used.add(key);
    return `${key}=${values[key]}`;
  });

  Object.keys(values).forEach((key) => {
    if (used.has(key)) return;
    updatedLines.push(`${key}=${values[key]}`);
  });

  const normalized = `${updatedLines.filter((line) => line !== undefined).join("\n").trim()}\n`;
  await fs.writeFile(envFilePath, normalized, "utf8");
}

export async function handleCloudbedsOAuthCallback(req: Request, res: Response) {
  const parsed = callbackQuerySchema.safeParse(req.query || {});

  if (!parsed.success) {
    res.status(400).send(
      renderHtml(
        "Cloudbeds OAuth callback invalido",
        "Os parametros recebidos sao invalidos.",
      ),
    );
    return;
  }

  const query = parsed.data;

  if (query.error) {
    res.status(400).send(
      renderHtml(
        "Cloudbeds retornou erro",
        query.error_description || query.error,
        [
          "Revise permissao e URL de redirecionamento no Cloudbeds.",
          "Tente gerar novas credenciais se necessario.",
        ],
      ),
    );
    return;
  }

  const callbackCode = (query.code || query.authorization_code || "").trim();

  if (!callbackCode) {
    res.status(400).send(
      renderHtml(
        "Codigo OAuth ausente",
        "Cloudbeds nao retornou o parametro code.",
        [
          "Confirme a URL de callback cadastrada e tente novamente.",
          "Algumas configuracoes enviam authorization_code; este endpoint aceita ambos.",
        ],
      ),
    );
    return;
  }

  const config = getCallbackConfig(req);

  if (config.clientId.length === 0 || config.clientSecret.length === 0) {
    res.status(500).send(
      renderHtml(
        "Credenciais Cloudbeds ausentes",
        "Defina CLOUDBEDS_CLIENT_ID e CLOUDBEDS_CLIENT_SECRET no ambiente.",
      ),
    );
    return;
  }

  const form = new URLSearchParams();
  form.set("grant_type", config.grantType);
  form.set("code", callbackCode);
  form.set("client_id", config.clientId);
  form.set("client_secret", config.clientSecret);
  form.set("redirect_uri", config.redirectUri);

  try {
    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    const rawText = await response.text();
    let payload: unknown = {};
    if (rawText.trim().length > 0) {
      try {
        payload = JSON.parse(rawText);
      } catch {
        payload = { raw: rawText };
      }
    }

    if (!response.ok) {
      const payloadRecord =
        payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
      const payloadMessage = [
        typeof payloadRecord.error === "string" ? payloadRecord.error : "",
        typeof payloadRecord.error_description === "string"
          ? payloadRecord.error_description
          : "",
      ]
        .filter((item) => item.length > 0)
        .join(" - ");

      res.status(400).send(
        renderHtml(
          "Falha ao trocar codigo por token",
          `Cloudbeds retornou HTTP ${response.status}.`,
          [
            payloadMessage || "Cloudbeds nao retornou detalhes estruturados de erro.",
            "Valide o Client ID/Secret e a URL de callback.",
            "Confira se o tipo da credencial esta correto para OAuth.",
          ],
        ),
      );
      return;
    }

    const token = parseTokenPayload(payload);

    process.env.CLOUDBEDS_ACCESS_TOKEN = token.accessToken;
    process.env.CLOUDBEDS_ENABLED = "true";
    if (token.refreshToken.length > 0) {
      process.env.CLOUDBEDS_REFRESH_TOKEN = token.refreshToken;
    }

    const envValues: Record<string, string> = {
      CLOUDBEDS_ENABLED: "true",
      CLOUDBEDS_API_BASE_URL:
        process.env.CLOUDBEDS_API_BASE_URL?.trim() ||
        "https://api.cloudbeds.com/api/v1.3",
      CLOUDBEDS_OAUTH_TOKEN_URL: config.tokenUrl,
      CLOUDBEDS_CLIENT_ID: config.clientId,
      CLOUDBEDS_CLIENT_SECRET: config.clientSecret,
      CLOUDBEDS_OAUTH_REDIRECT_URI: config.redirectUri,
      CLOUDBEDS_OAUTH_CALLBACK_GRANT_TYPE: config.grantType,
      CLOUDBEDS_ACCESS_TOKEN: token.accessToken,
    };

    if (token.refreshToken.length > 0) {
      envValues.CLOUDBEDS_REFRESH_TOKEN = token.refreshToken;
    }

    let persistedToFile = false;
    let persistWarning = "";
    try {
      await upsertEnvFile(envValues);
      persistedToFile = true;
    } catch (error) {
      persistWarning =
        error instanceof Error
          ? error.message
          : "Nao foi possivel salvar .env neste ambiente.";
    }

    const successDetails = [
      "CLOUDBEDS_ENABLED=true",
      `redirect_uri=${config.redirectUri}`,
      `grant_type=${config.grantType}`,
      `CLOUDBEDS_ACCESS_TOKEN=${token.accessToken}`,
      token.refreshToken.length > 0
        ? `CLOUDBEDS_REFRESH_TOKEN=${token.refreshToken}`
        : "refresh_token nao retornado por este grant_type",
      token.expiresIn ? `expires_in=${token.expiresIn}s` : "expires_in nao informado",
      persistedToFile
        ? "persistencia local concluida"
        : `persistencia local ignorada: ${persistWarning}`,
      "Em Vercel/serverless, copie os valores CLOUDBEDS_ACCESS_TOKEN/CLOUDBEDS_REFRESH_TOKEN e salve em Environment Variables.",
    ];

    res.status(200).send(
      renderHtml(
        "Cloudbeds configurado com sucesso",
        persistedToFile
          ? "As credenciais e tokens foram processados e salvos no arquivo .env local."
          : "As credenciais e tokens foram processados. Neste ambiente nao foi possivel escrever no .env local.",
        successDetails,
      ),
    );
  } catch (error) {
    res.status(500).send(
      renderHtml(
        "Erro interno na configuracao Cloudbeds",
        error instanceof Error ? error.message : "Falha desconhecida.",
      ),
    );
  }
}

