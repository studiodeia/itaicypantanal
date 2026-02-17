import { sql } from "drizzle-orm";
import { db, isDatabaseAvailable } from "../db";

type CountRow = { total: number | string | null };
type TotalsRow = {
  total: number | string | null;
  success: number | string | null;
  fallback: number | string | null;
  error: number | string | null;
  avg_latency_ms: number | string | null;
  p50_latency_ms: number | string | null;
  p95_latency_ms: number | string | null;
  tokens_in: number | string | null;
  tokens_out: number | string | null;
};

type ToolRow = {
  tool: string | null;
  total: number | string | null;
  avg_latency_ms: number | string | null;
  p95_latency_ms: number | string | null;
  fallback_rate: number | string | null;
  error_rate: number | string | null;
};

type QueryResult<T> = T[] | { rows?: T[] };

function toRows<T>(raw: QueryResult<T>): T[] {
  if (Array.isArray(raw)) return raw;
  return Array.isArray(raw.rows) ? raw.rows : [];
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
}

function clampWindowHours(value: number): number {
  if (!Number.isFinite(value)) return 24;
  if (value < 1) return 1;
  if (value > 24 * 30) return 24 * 30;
  return Math.trunc(value);
}

function rounded(value: number): number {
  return Number(value.toFixed(4));
}

export type AgentToolMetric = {
  tool: string;
  total: number;
  avgLatencyMs: number;
  p95LatencyMs: number;
  fallbackRate: number;
  errorRate: number;
};

export type AgentMetricsSnapshot = {
  windowHours: number;
  periodStart: string;
  periodEnd: string;
  totals: {
    interactions: number;
    success: number;
    fallback: number;
    error: number;
    handoffs: number;
    leads: number;
  };
  rates: {
    fallbackRate: number;
    errorRate: number;
    handoffRate: number;
  };
  latency: {
    avgMs: number;
    p50Ms: number;
    p95Ms: number;
  };
  tokens: {
    input: number;
    output: number;
    total: number;
  };
  tools: AgentToolMetric[];
};

export async function getAgentMetricsSnapshot(
  windowHoursInput: number,
): Promise<AgentMetricsSnapshot> {
  if (!isDatabaseAvailable() || !db) {
    throw new Error("Database is unavailable for agent metrics.");
  }

  const windowHours = clampWindowHours(windowHoursInput);
  const periodEnd = new Date();
  const periodStart = new Date(periodEnd.getTime() - windowHours * 60 * 60 * 1000);

  const totalsRaw = (await db.execute(sql`
    SELECT
      COUNT(*)::int AS total,
      SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END)::int AS success,
      SUM(CASE WHEN fallback_used = true OR status = 'fallback' THEN 1 ELSE 0 END)::int AS fallback,
      SUM(CASE WHEN status = 'error' THEN 1 ELSE 0 END)::int AS error,
      AVG(latency_ms)::double precision AS avg_latency_ms,
      percentile_cont(0.5) WITHIN GROUP (ORDER BY latency_ms) AS p50_latency_ms,
      percentile_cont(0.95) WITHIN GROUP (ORDER BY latency_ms) AS p95_latency_ms,
      COALESCE(SUM(tokens_in), 0)::int AS tokens_in,
      COALESCE(SUM(tokens_out), 0)::int AS tokens_out
    FROM agent_logs
    WHERE created_at >= ${periodStart}
  `)) as QueryResult<TotalsRow>;

  const handoffsRaw = (await db.execute(sql`
    SELECT COUNT(*)::int AS total
    FROM handoffs
    WHERE created_at >= ${periodStart}
  `)) as QueryResult<CountRow>;

  const leadsRaw = (await db.execute(sql`
    SELECT COUNT(*)::int AS total
    FROM leads
    WHERE created_at >= ${periodStart}
  `)) as QueryResult<CountRow>;

  const toolsRaw = (await db.execute(sql`
    SELECT
      tool_used AS tool,
      COUNT(*)::int AS total,
      AVG(latency_ms)::double precision AS avg_latency_ms,
      percentile_cont(0.95) WITHIN GROUP (ORDER BY latency_ms) AS p95_latency_ms,
      AVG(CASE WHEN fallback_used = true OR status = 'fallback' THEN 1 ELSE 0 END)::double precision AS fallback_rate,
      AVG(CASE WHEN status = 'error' THEN 1 ELSE 0 END)::double precision AS error_rate
    FROM agent_logs
    WHERE created_at >= ${periodStart}
      AND tool_used IS NOT NULL
    GROUP BY tool_used
    ORDER BY total DESC, tool_used ASC
  `)) as QueryResult<ToolRow>;

  const totals = toRows(totalsRaw)[0];
  const handoffs = toRows(handoffsRaw)[0];
  const leads = toRows(leadsRaw)[0];
  const toolRows = toRows(toolsRaw);

  const interactions = toNumber(totals?.total);
  const success = toNumber(totals?.success);
  const fallback = toNumber(totals?.fallback);
  const error = toNumber(totals?.error);
  const handoffCount = toNumber(handoffs?.total);
  const leadsCount = toNumber(leads?.total);

  const safeInteractions = interactions > 0 ? interactions : 1;

  return {
    windowHours,
    periodStart: periodStart.toISOString(),
    periodEnd: periodEnd.toISOString(),
    totals: {
      interactions,
      success,
      fallback,
      error,
      handoffs: handoffCount,
      leads: leadsCount,
    },
    rates: {
      fallbackRate: rounded(fallback / safeInteractions),
      errorRate: rounded(error / safeInteractions),
      handoffRate: rounded(handoffCount / safeInteractions),
    },
    latency: {
      avgMs: rounded(toNumber(totals?.avg_latency_ms)),
      p50Ms: rounded(toNumber(totals?.p50_latency_ms)),
      p95Ms: rounded(toNumber(totals?.p95_latency_ms)),
    },
    tokens: {
      input: toNumber(totals?.tokens_in),
      output: toNumber(totals?.tokens_out),
      total: toNumber(totals?.tokens_in) + toNumber(totals?.tokens_out),
    },
    tools: toolRows
      .map((row) => ({
        tool: row.tool ?? "unknown",
        total: toNumber(row.total),
        avgLatencyMs: rounded(toNumber(row.avg_latency_ms)),
        p95LatencyMs: rounded(toNumber(row.p95_latency_ms)),
        fallbackRate: rounded(toNumber(row.fallback_rate)),
        errorRate: rounded(toNumber(row.error_rate)),
      }))
      .filter((row) => row.total > 0),
  };
}
