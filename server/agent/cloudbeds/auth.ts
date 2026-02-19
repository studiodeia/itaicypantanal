import type { CloudbedsConfig } from "./config";

type TokenResponse = {
  access_token?: unknown;
  token_type?: unknown;
  expires_in?: unknown;
  refresh_token?: unknown;
};

type AuthState = {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  expiresAtMs: number;
};

export class CloudbedsAuthError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly responseBody?: string,
  ) {
    super(message);
    this.name = "CloudbedsAuthError";
  }
}

function normalizeTokenType(value: unknown): string {
  if (typeof value !== "string" || value.trim().length === 0) return "Bearer";
  return value;
}

function normalizeExpiresInSeconds(value: unknown): number {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return 3600;
  return parsed;
}

function parseTokenResponse(raw: unknown): {
  accessToken: string;
  tokenType: string;
  expiresInSeconds: number;
  refreshToken: string;
} {
  const rec = raw as TokenResponse;
  const accessToken = typeof rec.access_token === "string" ? rec.access_token.trim() : "";
  if (accessToken.length === 0) {
    throw new CloudbedsAuthError("Cloudbeds token response missing access_token.");
  }

  const refreshToken =
    typeof rec.refresh_token === "string" ? rec.refresh_token.trim() : "";

  return {
    accessToken,
    tokenType: normalizeTokenType(rec.token_type),
    expiresInSeconds: normalizeExpiresInSeconds(rec.expires_in),
    refreshToken,
  };
}

function toFormBody(values: Record<string, string>): string {
  const params = new URLSearchParams();
  Object.keys(values).forEach((key) => {
    const value = values[key];
    if (value.length > 0) params.set(key, value);
  });
  return params.toString();
}

export class CloudbedsAuthManager {
  private state: AuthState | null = null;
  private inFlightTokenPromise: Promise<string> | null = null;
  private readonly staticOnlyTokenMode: boolean;

  constructor(private readonly config: CloudbedsConfig) {
    const hasOAuthCredentials =
      config.oauthTokenUrl.length > 0 &&
      config.clientId.length > 0 &&
      config.clientSecret.length > 0;

    const staticToken = config.staticAccessToken.trim();
    const isApiKeyToken = staticToken.startsWith("cbat_");
    // API keys (cbat_) are long-lived and do not use OAuth refresh. Treat them as static-only
    // even if OAuth credentials are present in the environment.
    this.staticOnlyTokenMode = staticToken.length > 0 && (isApiKeyToken || !hasOAuthCredentials);

    if (this.staticOnlyTokenMode) {
      this.state = {
        accessToken: staticToken,
        tokenType: "Bearer",
        refreshToken: "",
        expiresAtMs: Number.MAX_SAFE_INTEGER,
      };
      return;
    }

    if (config.staticAccessToken.length > 0) {
      this.state = {
        accessToken: config.staticAccessToken,
        tokenType: "Bearer",
        refreshToken: config.initialRefreshToken,
        // Bootstrap token loaded from environment, renewed by refresh flow when available.
        expiresAtMs: Date.now() + 45 * 60 * 1000,
      };
      return;
    }

    if (config.initialRefreshToken.length > 0) {
      this.state = {
        accessToken: "",
        tokenType: "Bearer",
        refreshToken: config.initialRefreshToken,
        expiresAtMs: 0,
      };
    }
  }

  invalidateAccessToken(): void {
    if (!this.state) return;
    if (this.staticOnlyTokenMode) return;
    this.state.expiresAtMs = 0;
    this.state.accessToken = "";
  }

  hasRefreshTokenConfigured(): boolean {
    const token = this.state?.refreshToken || this.config.initialRefreshToken;
    return token.trim().length > 0;
  }

  async getAccessToken(forceRefresh = false): Promise<string> {
    if (!this.config.enabled) {
      throw new CloudbedsAuthError("Cloudbeds is disabled.");
    }

    if (this.staticOnlyTokenMode) {
      return this.config.staticAccessToken;
    }

    const now = Date.now();
    if (!forceRefresh && this.state && this.state.accessToken.length > 0 && this.state.expiresAtMs > now + 30_000) {
      return this.state.accessToken;
    }

    if (this.inFlightTokenPromise) {
      return this.inFlightTokenPromise;
    }

    const promise = this.refreshTokenInternal();
    this.inFlightTokenPromise = promise;

    try {
      return await promise;
    } finally {
      this.inFlightTokenPromise = null;
    }
  }

  private async refreshTokenInternal(): Promise<string> {
    const refreshToken = this.state?.refreshToken || this.config.initialRefreshToken;

    if (refreshToken.length === 0) {
      throw new CloudbedsAuthError(
        "Cloudbeds refresh token is missing. Complete OAuth authorization_code callback and set CLOUDBEDS_REFRESH_TOKEN or CLOUDBEDS_ACCESS_TOKEN.",
      );
    }

    const result = await this.requestToken({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
    });
    this.setState(result);
    return result.accessToken;
  }

  private async requestToken(formValues: Record<string, string>) {
    if (
      this.config.oauthTokenUrl.length === 0 ||
      this.config.clientId.length === 0 ||
      this.config.clientSecret.length === 0
    ) {
      throw new CloudbedsAuthError("Cloudbeds OAuth config is incomplete.");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.requestTimeoutMs);

    try {
      const response = await fetch(this.config.oauthTokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: toFormBody(formValues),
        signal: controller.signal,
      });

      const rawText = await response.text();
      const parsedJson =
        rawText.trim().length > 0 ? (JSON.parse(rawText) as unknown) : {};

      if (!response.ok) {
        throw new CloudbedsAuthError(
          `Cloudbeds token endpoint returned HTTP ${response.status}.`,
          response.status,
          rawText,
        );
      }

      return parseTokenResponse(parsedJson);
    } catch (error) {
      if (error instanceof CloudbedsAuthError) {
        throw error;
      }
      if (error instanceof Error && error.name === "AbortError") {
        throw new CloudbedsAuthError("Cloudbeds token request timed out.");
      }

      throw new CloudbedsAuthError(
        error instanceof Error ? error.message : "Cloudbeds token request failed.",
      );
    } finally {
      clearTimeout(timeout);
    }
  }

  private setState(next: {
    accessToken: string;
    tokenType: string;
    expiresInSeconds: number;
    refreshToken: string;
  }): void {
    const expiresAtMs = Date.now() + Math.max(30, next.expiresInSeconds - 30) * 1000;

    this.state = {
      accessToken: next.accessToken,
      tokenType: next.tokenType,
      refreshToken: next.refreshToken || this.state?.refreshToken || "",
      expiresAtMs,
    };
  }
}
