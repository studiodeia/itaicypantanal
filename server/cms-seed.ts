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
  cachedSeed = JSON.parse(raw) as CmsSeed;
  return cachedSeed;
}

export function clearCmsSeedCache() {
  cachedSeed = null;
}
