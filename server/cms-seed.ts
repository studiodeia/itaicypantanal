import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  defaultAgentConfig,
  normalizeAgentConfig,
  type AgentConfig,
} from "../shared/agent-config";

type CmsSeed = {
  generatedAt?: string;
  notes?: {
    source?: string;
    strategy?: string;
  };
  blog: {
    categories: string[];
    posts: Array<{ slug: string; [key: string]: unknown }>;
    details: Array<{ slug: string; [key: string]: unknown }>;
    featuredSlug: string;
    recentSlugs: string[];
  };
  birdwatching: {
    categories: string[];
    species: Array<{ slug: string; [key: string]: unknown }>;
    details: Array<{ slug: string; [key: string]: unknown }>;
    featuredSlugs: string[];
  };
  shared?: Record<string, unknown>;
  pageContent?: Record<string, unknown>;
  pages: {
    routes: string[];
  };
};

let cachedSeed: CmsSeed | null = null;
let cachedSeedExpiresAt = 0;
let cachedAgentConfigSeed: AgentConfig | null = null;

// In development: re-read the seed file every 10 seconds so changes to
// full-seed.json are picked up without restarting the server.
const SEED_TTL_MS = process.env.NODE_ENV === "production" ? Infinity : 10_000;

/** Strip BOM, U+FFFD and other non-JSON leading bytes from a string */
function stripLeadingNonJson(text: string): string {
  let i = 0;
  while (i < text.length && text.charCodeAt(i) !== 0x7b /* { */ && text.charCodeAt(i) !== 0x5b /* [ */) {
    i++;
    if (i > 20) break; // safety: only check first 20 chars
  }
  return i > 0 && i <= 20 ? text.slice(i) : text;
}

export async function loadCmsSeed(): Promise<CmsSeed> {
  if (cachedSeed && Date.now() < cachedSeedExpiresAt) {
    return cachedSeed;
  }

  const seedPath = resolve(process.cwd(), "docs", "payload-seed", "full-seed.json");
  let raw = await readFile(seedPath, "utf8");
  raw = stripLeadingNonJson(raw);
  const seed = JSON.parse(raw) as CmsSeed;

  // Load page-content.json if not already embedded in full-seed
  if (!seed.pageContent) {
    try {
      const pageContentPath = resolve(process.cwd(), "docs", "payload-seed", "page-content.json");
      const pageContentRaw = await readFile(pageContentPath, "utf8");
      seed.pageContent = JSON.parse(pageContentRaw) as Record<string, unknown>;
    } catch {
      // page-content.json not found — sections will use hardcoded defaults
    }
  }

  cachedSeed = seed;
  cachedSeedExpiresAt = Date.now() + SEED_TTL_MS;
  return cachedSeed;
}

export async function loadAgentConfigSeed(): Promise<AgentConfig> {
  if (cachedAgentConfigSeed) {
    return cachedAgentConfigSeed;
  }

  const seedPath = resolve(
    process.cwd(),
    "docs",
    "payload-seed",
    "agent-config.json",
  );

  try {
    const raw = await readFile(seedPath, "utf8");
    cachedAgentConfigSeed = normalizeAgentConfig(JSON.parse(raw));
  } catch {
    cachedAgentConfigSeed = defaultAgentConfig;
  }

  return cachedAgentConfigSeed;
}

export function clearCmsSeedCache() {
  cachedSeed = null;
  cachedSeedExpiresAt = 0;
  cachedAgentConfigSeed = null;
}
