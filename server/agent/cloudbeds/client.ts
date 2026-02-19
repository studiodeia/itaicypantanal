import { CloudbedsAuthManager, CloudbedsAuthError } from "./auth";
import { buildCloudbedsCacheKey, CloudbedsResponseCache } from "./cache";
import { loadCloudbedsConfig, type CloudbedsConfig } from "./config";

type Primitive = string | number | boolean | null | undefined;

type CloudbedsQueryParams = Record<string, Primitive>;

export type CloudbedsRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  query?: CloudbedsQueryParams;
  headers?: Record<string, string>;
  body?: unknown;
  cacheTtlMs?: number;
  bypassCache?: boolean;
  skipAuth?: boolean;
  timeoutMs?: number;
};

type CircuitState = {
  consecutiveFailures: number;
  openUntilMs: number;
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetryStatus(status: number): boolean {
  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

function toSafeJson(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return "[unserializable]";
  }
}

function parseResponseBody(
  response: Response,
  text: string,
): unknown {
  if (response.status === 204 || text.trim().length === 0) return null;

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text) as unknown;
    } catch {
      return text;
    }
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function toUrl(base: string, path: string, query?: CloudbedsQueryParams): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${base}${normalizedPath}`);

  if (query) {
    Object.keys(query).forEach((key) => {
      const value = query[key];
      if (typeof value === "undefined" || value === null) return;
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
}

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown Cloudbeds error";
}

export class CloudbedsCircuitOpenError extends Error {
  constructor(public readonly retryAfterMs: number) {
    super("Cloudbeds circuit breaker is open.");
    this.name = "CloudbedsCircuitOpenError";
  }
}

export class CloudbedsApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body?: unknown,
    public readonly requestId?: string,
  ) {
    super(message);
    this.name = "CloudbedsApiError";
  }
}

export class CloudbedsClient {
  private readonly auth: CloudbedsAuthManager;
  private readonly cache: CloudbedsResponseCache;
  private readonly circuitState: CircuitState = {
    consecutiveFailures: 0,
    openUntilMs: 0,
  };

  constructor(private readonly config: CloudbedsConfig = loadCloudbedsConfig()) {
    this.auth = new CloudbedsAuthManager(config);
    this.cache = new CloudbedsResponseCache(config.cacheTtlMs);
  }

  isEnabled(): boolean {
    return this.config.enabled;
  }

  getConfig(): CloudbedsConfig {
    return this.config;
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCircuitStatus(): {
    isOpen: boolean;
    openUntilMs: number;
    consecutiveFailures: number;
  } {
    return {
      isOpen: Date.now() < this.circuitState.openUntilMs,
      openUntilMs: this.circuitState.openUntilMs,
      consecutiveFailures: this.circuitState.consecutiveFailures,
    };
  }

  async request<T = unknown>(
    path: string,
    options: CloudbedsRequestOptions = {},
  ): Promise<T> {
    this.ensureEnabled();

    const method = (options.method || "GET").toUpperCase() as CloudbedsRequestOptions["method"];
    const url = toUrl(this.config.apiBaseUrl, path, options.query);
    const cacheKey = buildCloudbedsCacheKey(method || "GET", url, options.body);
    const cacheable = method === "GET" && !options.bypassCache;

    if (cacheable) {
      const cached = this.cache.get<T>(cacheKey);
      if (cached !== null) return cached;
    }

    const responseData = await this.executeWithRetry<T>(url, {
      ...options,
      method,
    });

    if (cacheable) {
      this.cache.set(cacheKey, responseData, options.cacheTtlMs);
    }

    return responseData;
  }

  private ensureEnabled(): void {
    if (this.config.enabled) return;
    throw new Error(
      "Cloudbeds client is disabled. Set CLOUDBEDS_ENABLED=true and Cloudbeds credentials.",
    );
  }

  private assertCircuitClosed() {
    const now = Date.now();
    if (now >= this.circuitState.openUntilMs) return;
    throw new CloudbedsCircuitOpenError(this.circuitState.openUntilMs - now);
  }

  private markSuccess() {
    this.circuitState.consecutiveFailures = 0;
    this.circuitState.openUntilMs = 0;
  }

  private markFailure() {
    this.circuitState.consecutiveFailures += 1;
    if (this.circuitState.consecutiveFailures >= this.config.circuitFailureThreshold) {
      this.circuitState.openUntilMs = Date.now() + this.config.circuitOpenMs;
      this.circuitState.consecutiveFailures = 0;
    }
  }

  private async executeWithRetry<T>(
    url: string,
    options: CloudbedsRequestOptions & { method?: string },
  ): Promise<T> {
    let lastError: unknown = null;
    const attempts = Math.max(1, this.config.retryMaxAttempts);
    let attempt = 0;

    while (attempt < attempts) {
      this.assertCircuitClosed();

      try {
        const response = await this.executeHttpRequest(url, options, attempt > 0);
        this.markSuccess();
        return response as T;
      } catch (error) {
        lastError = error;

        const retryable = this.isRetryableError(error);
        if (!retryable || attempt >= attempts - 1) {
          this.markFailure();
          throw error;
        }

        const jitter = Math.floor(Math.random() * 120);
        const delayMs = this.config.retryBaseDelayMs * Math.pow(2, attempt) + jitter;
        await sleep(delayMs);
      }

      attempt += 1;
    }

    this.markFailure();
    throw lastError instanceof Error ? lastError : new Error("Cloudbeds request failed.");
  }

  private isRetryableError(error: unknown): boolean {
    if (error instanceof CloudbedsCircuitOpenError) return false;
    if (error instanceof CloudbedsApiError) {
      return shouldRetryStatus(error.status);
    }
    if (error instanceof CloudbedsAuthError) return false;
    return true;
  }

  private async executeHttpRequest(
    url: string,
    options: CloudbedsRequestOptions & { method?: string },
    retrying: boolean,
    useApiKeyHeader = false,
  ): Promise<unknown> {
    const method = (options.method || "GET").toUpperCase();
    const timeoutMs =
      typeof options.timeoutMs === "number" ? options.timeoutMs : this.config.requestTimeoutMs;

    const headers: Record<string, string> = { ...(options.headers || {}) };
    // Cloudbeds v1.x endpoints frequently expect form-url-encoded on POST.
    // For GETs we omit Content-Type to avoid confusing upstreams.
    if (method !== "GET" && typeof options.body !== "undefined") {
      headers["Content-Type"] = headers["Content-Type"] || "application/json";
    }

    let bearerToken = "";
    if (!options.skipAuth) {
      bearerToken = await this.auth.getAccessToken(retrying);
      const token = bearerToken.trim();
      const isApiKeyToken = token.startsWith("cbat_");

      if (isApiKeyToken) {
        // Cloudbeds docs accept API key as `Authorization: Bearer` OR `x-api-key`.
        // We send both to avoid subtle differences across endpoints/versions.
        headers["x-api-key"] = token;
        headers.Authorization = `Bearer ${token}`;
      } else if (useApiKeyHeader) {
        headers["x-api-key"] = token;
      } else {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: typeof options.body === "undefined" ? undefined : JSON.stringify(options.body),
        signal: controller.signal,
      });

      // Only retry 401 when we can actually refresh. Otherwise return the 401 as-is
      // so the caller can surface an "invalid token" message instead of a misleading
      // "missing refresh token" error.
      if (
        response.status === 401 &&
        !options.skipAuth &&
        !retrying &&
        bearerToken.trim().startsWith("cbat_") &&
        !useApiKeyHeader
      ) {
        // API key: retry once forcing x-api-key only (kept for compatibility).
        return this.executeHttpRequest(url, options, true, true);
      }

      if (
        response.status === 401 &&
        !options.skipAuth &&
        !retrying &&
        this.auth.hasRefreshTokenConfigured()
      ) {
        this.auth.invalidateAccessToken();
        return this.executeHttpRequest(url, options, true, useApiKeyHeader);
      }

      const rawText = await response.text();
      const parsedBody = parseResponseBody(response, rawText);

      if (!response.ok) {
        const requestId =
          response.headers.get("x-request-id") ||
          response.headers.get("x-kong-request-id") ||
          undefined;
        throw new CloudbedsApiError(
          `Cloudbeds API returned HTTP ${response.status}.`,
          response.status,
          parsedBody,
          requestId,
        );
      }

      return parsedBody;
    } catch (error) {
      if (error instanceof CloudbedsApiError) throw error;
      if (error instanceof CloudbedsAuthError) throw error;
      if (error instanceof CloudbedsCircuitOpenError) throw error;
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Cloudbeds request timed out.");
      }

      throw new Error(toErrorMessage(error));
    } finally {
      clearTimeout(timeout);
    }
  }
}

export const cloudbedsClient = new CloudbedsClient();

export function createCloudbedsClient(config?: CloudbedsConfig): CloudbedsClient {
  return new CloudbedsClient(config);
}

export function cloudbedsDebugSnapshot() {
  const config = cloudbedsClient.getConfig();
  const circuit = cloudbedsClient.getCircuitStatus();
  return {
    enabled: config.enabled,
    apiBaseUrl: config.apiBaseUrl,
    retryMaxAttempts: config.retryMaxAttempts,
    cacheTtlMs: config.cacheTtlMs,
    circuitFailureThreshold: config.circuitFailureThreshold,
    circuitOpenMs: config.circuitOpenMs,
    circuit,
    hasClientId: config.clientId.length > 0,
    hasClientSecret: config.clientSecret.length > 0,
    hasStaticToken: config.staticAccessToken.length > 0,
    hasRefreshToken: config.initialRefreshToken.length > 0,
  };
}

export function formatCloudbedsError(error: unknown): {
  code: "circuit_open" | "auth_error" | "api_error" | "unknown";
  message: string;
  status?: number;
  body?: string;
  requestId?: string;
} {
  if (error instanceof CloudbedsCircuitOpenError) {
    return {
      code: "circuit_open",
      message: `Cloudbeds circuit is open for ${error.retryAfterMs}ms.`,
    };
  }

  if (error instanceof CloudbedsAuthError) {
    return {
      code: "auth_error",
      message: error.message,
      status: error.status,
      body: error.responseBody,
    };
  }

  if (error instanceof CloudbedsApiError) {
    return {
      code: "api_error",
      message: error.message,
      status: error.status,
      body: toSafeJson(error.body),
      requestId: error.requestId,
    };
  }

  return {
    code: "unknown",
    message: toErrorMessage(error),
  };
}
