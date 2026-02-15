import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

/** Slugify a string (Portuguese-aware) */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Delay for rate limiting */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Read JSON file */
export async function readJson<T>(path: string): Promise<T> {
  const raw = await readFile(path, "utf8");
  return JSON.parse(raw) as T;
}

/** Write JSON file (creates directory if needed) */
export async function writeJson(path: string, data: unknown): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(data, null, 2), "utf8");
}

/** Write text file */
export async function writeText(path: string, data: string): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, data, "utf8");
}

/** Progress logger */
export function logProgress(current: number, total: number, label: string): void {
  const pct = Math.round((current / total) * 100);
  process.stdout.write(`\r[${pct}%] ${current}/${total} ${label}`);
  if (current === total) process.stdout.write("\n");
}
