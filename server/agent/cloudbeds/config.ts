type Env = NodeJS.ProcessEnv;

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim().toLowerCase();
  if (normalized === "true") return true;
  if (normalized === "false") return false;
  return fallback;
}

function parseNumber(
  value: string | undefined,
  fallback: number,
  min: number,
  max: number,
): number {
  if (typeof value !== "string") return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  if (parsed < min) return min;
  if (parsed > max) return max;
  return parsed;
}

function normalizeUrl(value: string | undefined): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\/+$/, "");
}

export type CloudbedsConfig = {
  enabled: boolean;
  apiBaseUrl: string;
  oauthTokenUrl: string;
  clientId: string;
  clientSecret: string;
  scope: string;
  staticAccessToken: string;
  initialRefreshToken: string;
  requestTimeoutMs: number;
  retryMaxAttempts: number;
  retryBaseDelayMs: number;
  cacheTtlMs: number;
  circuitFailureThreshold: number;
  circuitOpenMs: number;
};

export function loadCloudbedsConfig(env: Env = process.env): CloudbedsConfig {
  const apiBaseUrl = normalizeUrl(env.CLOUDBEDS_API_BASE_URL);
  const oauthTokenUrl = normalizeUrl(env.CLOUDBEDS_OAUTH_TOKEN_URL);
  const staticAccessToken = (env.CLOUDBEDS_ACCESS_TOKEN || "").trim();
  const clientId = (env.CLOUDBEDS_CLIENT_ID || "").trim();
  const clientSecret = (env.CLOUDBEDS_CLIENT_SECRET || "").trim();
  const initialRefreshToken = (env.CLOUDBEDS_REFRESH_TOKEN || "").trim();
  const scope = (env.CLOUDBEDS_SCOPE || "").trim();

  const hasStaticToken = staticAccessToken.length > 0;
  const hasRefreshToken = initialRefreshToken.length > 0;
  const hasOAuthCredentials =
    oauthTokenUrl.length > 0 && clientId.length > 0 && clientSecret.length > 0;

  const enabledByEnv = parseBoolean(env.CLOUDBEDS_ENABLED, false);
  const enabled =
    enabledByEnv &&
    apiBaseUrl.length > 0 &&
    (hasStaticToken || (hasOAuthCredentials && hasRefreshToken));

  return {
    enabled,
    apiBaseUrl,
    oauthTokenUrl,
    clientId,
    clientSecret,
    scope,
    staticAccessToken,
    initialRefreshToken,
    requestTimeoutMs: parseNumber(env.CLOUDBEDS_TIMEOUT_MS, 10_000, 1000, 60_000),
    retryMaxAttempts: parseNumber(env.CLOUDBEDS_RETRY_MAX_ATTEMPTS, 3, 1, 8),
    retryBaseDelayMs: parseNumber(env.CLOUDBEDS_RETRY_BASE_DELAY_MS, 300, 50, 5000),
    cacheTtlMs: parseNumber(env.CLOUDBEDS_CACHE_TTL_MS, 60_000, 0, 10 * 60_000),
    circuitFailureThreshold: parseNumber(
      env.CLOUDBEDS_CIRCUIT_FAILURE_THRESHOLD,
      5,
      1,
      100,
    ),
    circuitOpenMs: parseNumber(env.CLOUDBEDS_CIRCUIT_OPEN_MS, 60_000, 1000, 30 * 60_000),
  };
}
