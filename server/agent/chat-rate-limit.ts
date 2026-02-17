import { createHash } from "node:crypto";
import type { Request } from "express";
import { and, desc, eq, gte } from "drizzle-orm";
import { db, isDatabaseAvailable } from "../db";
import { rateLimits } from "../../shared/schema";

type RateLimitCheckResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSec: number;
};

type MemoryRateEntry = {
  count: number;
  windowStartMs: number;
};

const ACTION_TYPE = "chat_request";
const memoryRateMap = new Map<string, MemoryRateEntry>();

function getWindowMs(): number {
  const raw = Number.parseInt(process.env.CHAT_RATE_LIMIT_WINDOW_MS ?? "60000", 10);
  if (!Number.isFinite(raw) || raw < 1000) return 60_000;
  return raw;
}

function getMaxRequests(): number {
  const raw = Number.parseInt(process.env.CHAT_RATE_LIMIT_MAX ?? "20", 10);
  if (!Number.isFinite(raw) || raw < 1) return 20;
  return raw;
}

function getClientIp(req: Request): string {
  const forwarded = req.header("x-forwarded-for");
  if (forwarded && forwarded.length > 0) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  if (typeof req.ip === "string" && req.ip.length > 0) return req.ip;
  if (typeof req.socket.remoteAddress === "string" && req.socket.remoteAddress.length > 0) {
    return req.socket.remoteAddress;
  }

  return "unknown";
}

function hashValue(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function memoryCheckAndConsume(
  key: string,
  nowMs: number,
  windowMs: number,
  maxRequests: number,
): RateLimitCheckResult {
  const current = memoryRateMap.get(key);
  if (!current || nowMs - current.windowStartMs >= windowMs) {
    memoryRateMap.set(key, { count: 1, windowStartMs: nowMs });
    return {
      allowed: true,
      limit: maxRequests,
      remaining: Math.max(0, maxRequests - 1),
      retryAfterSec: 0,
    };
  }

  if (current.count >= maxRequests) {
    const retryAfterMs = Math.max(0, windowMs - (nowMs - current.windowStartMs));
    return {
      allowed: false,
      limit: maxRequests,
      remaining: 0,
      retryAfterSec: Math.ceil(retryAfterMs / 1000),
    };
  }

  current.count += 1;
  memoryRateMap.set(key, current);
  return {
    allowed: true,
    limit: maxRequests,
    remaining: Math.max(0, maxRequests - current.count),
    retryAfterSec: 0,
  };
}

function maybeCleanupMemory(nowMs: number, windowMs: number) {
  if (memoryRateMap.size < 500) return;
  memoryRateMap.forEach((entry, key) => {
    if (nowMs - entry.windowStartMs >= windowMs * 2) {
      memoryRateMap.delete(key);
    }
  });
}

async function dbCheckAndConsume(
  ipHash: string,
  sessionId: string | null,
  now: Date,
  windowMs: number,
  maxRequests: number,
): Promise<RateLimitCheckResult> {
  if (!db || !isDatabaseAvailable()) {
    throw new Error("Database unavailable");
  }

  const lowerBound = new Date(now.getTime() - windowMs);
  const rows = await db
    .select({
      id: rateLimits.id,
      count: rateLimits.count,
      windowStart: rateLimits.windowStart,
    })
    .from(rateLimits)
    .where(
      and(
        eq(rateLimits.actionType, ACTION_TYPE),
        eq(rateLimits.ipHash, ipHash),
        gte(rateLimits.windowStart, lowerBound),
      ),
    )
    .orderBy(desc(rateLimits.windowStart))
    .limit(1);

  const record = rows[0];

  if (!record) {
    await db.insert(rateLimits).values({
      sessionId,
      ipHash,
      actionType: ACTION_TYPE,
      count: 1,
      windowStart: now,
    });

    return {
      allowed: true,
      limit: maxRequests,
      remaining: Math.max(0, maxRequests - 1),
      retryAfterSec: 0,
    };
  }

  if (record.count >= maxRequests) {
    const start = new Date(record.windowStart).getTime();
    const retryAfterMs = Math.max(0, windowMs - (now.getTime() - start));
    return {
      allowed: false,
      limit: maxRequests,
      remaining: 0,
      retryAfterSec: Math.ceil(retryAfterMs / 1000),
    };
  }

  const nextCount = record.count + 1;
  await db
    .update(rateLimits)
    .set({ count: nextCount })
    .where(eq(rateLimits.id, record.id));

  return {
    allowed: true,
    limit: maxRequests,
    remaining: Math.max(0, maxRequests - nextCount),
    retryAfterSec: 0,
  };
}

export async function enforceChatRateLimit(
  req: Request,
  sessionId: string | null,
): Promise<RateLimitCheckResult> {
  const now = new Date();
  const nowMs = now.getTime();
  const windowMs = getWindowMs();
  const maxRequests = getMaxRequests();

  const ip = getClientIp(req);
  const ipHash = hashValue(ip);

  try {
    return await dbCheckAndConsume(ipHash, sessionId, now, windowMs, maxRequests);
  } catch {
    const memoryKey = `${ipHash}:${sessionId ?? "anon"}`;
    maybeCleanupMemory(nowMs, windowMs);
    return memoryCheckAndConsume(memoryKey, nowMs, windowMs, maxRequests);
  }
}
