type CacheEntry = {
  expiresAtMs: number;
  value: unknown;
};

function cloneValue<T>(value: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value)) as T;
}

export class CloudbedsResponseCache {
  private readonly entries = new Map<string, CacheEntry>();

  constructor(private readonly defaultTtlMs: number) {}

  get<T>(key: string): T | null {
    const entry = this.entries.get(key);
    if (!entry) return null;

    if (entry.expiresAtMs <= Date.now()) {
      this.entries.delete(key);
      return null;
    }

    return cloneValue(entry.value as T);
  }

  set<T>(key: string, value: T, ttlMs?: number): void {
    const ttl = typeof ttlMs === "number" ? ttlMs : this.defaultTtlMs;
    if (ttl <= 0) return;

    this.entries.set(key, {
      value: cloneValue(value),
      expiresAtMs: Date.now() + ttl,
    });
  }

  delete(key: string): void {
    this.entries.delete(key);
  }

  clear(): void {
    this.entries.clear();
  }

  cleanup(): void {
    const now = Date.now();
    this.entries.forEach((entry, key) => {
      if (entry.expiresAtMs <= now) {
        this.entries.delete(key);
      }
    });
  }
}

export function buildCloudbedsCacheKey(
  method: string,
  url: string,
  body?: unknown,
): string {
  const normalizedMethod = method.toUpperCase();
  if (normalizedMethod === "GET") {
    return `${normalizedMethod}:${url}`;
  }

  const serialized = typeof body === "undefined" ? "" : JSON.stringify(body);
  return `${normalizedMethod}:${url}:${serialized}`;
}

