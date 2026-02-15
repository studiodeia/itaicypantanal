import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

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

export async function loadCmsSeed(): Promise<CmsSeed> {
  if (cachedSeed) {
    return cachedSeed;
  }

  const seedPath = resolve(process.cwd(), "docs", "payload-seed", "full-seed.json");
  const raw = await readFile(seedPath, "utf8");
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
  return cachedSeed;
}

export function clearCmsSeedCache() {
  cachedSeed = null;
}
