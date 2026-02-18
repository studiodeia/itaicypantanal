/**
 * Translation script — generate EN/ES for all page defaults
 *
 * Usage (from project root):
 *   ANTHROPIC_API_KEY=xxx npx tsx scripts/translate-defaults.ts
 *   (or if .env has the key, dotenv loads it automatically)
 *
 * Output: client/src/i18n/translations/<page>.json
 */
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a professional translator for Itaicy Pantanal Eco Lodge, a luxury eco-lodge in the Brazilian Pantanal (Miranda, Mato Grosso do Sul).
You translate website content from Brazilian Portuguese to English and Spanish.

Rules:
- Keep translations natural and evocative for eco-tourism marketing
- Keep all proper nouns: "Itaicy", "Pantanal", "Rio Negro", "Tuiuiú", "Arara-Azul", "Miranda", "Campo Grande", "Bonito", "Serra de Maracaju"
- Keep species names: "pintado", "pacu", "dourado"
- Keep certification references: "IBAMA", "UNESCO", "LATAM", "Gol", "Azul"
- Keep numbers, icon names, image paths, and FAQ ids EXACTLY as-is
- "cota zero" → "catch-and-release" (en) / "cuota cero" (es)
- "pensão completa" → "full board" (en) / "pensión completa" (es)
- Return ONLY valid JSON, no markdown fences, no explanation
- Translate all string values recursively; keep numbers, booleans, and null as-is`;

async function translateObject(obj: unknown, targetLang: "en" | "es"): Promise<unknown> {
  const langName = targetLang === "en" ? "English" : "Spanish";
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    system: SYSTEM_PROMPT,
    messages: [{
      role: "user",
      content: `Translate this JSON from Brazilian Portuguese to ${langName}. Return ONLY the translated JSON:\n\n${JSON.stringify(obj, null, 2)}`,
    }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text.trim() : "";
  // Strip possible markdown fences
  const cleaned = text.replace(/^```json?\n?/, "").replace(/\n?```$/, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    // Try extracting JSON from response
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) throw new Error(`No valid JSON in response for ${targetLang}: ${text.slice(0, 200)}`);
    return JSON.parse(match[0]);
  }
}

interface DefaultsEntry {
  name: string;
  file: string;
  exportName: string;
}

const DEFAULTS: DefaultsEntry[] = [
  { name: "home", file: "client/src/pages/home-defaults.ts", exportName: "homeDefaults" },
  { name: "acomodacoes", file: "client/src/pages/acomodacoes-defaults.ts", exportName: "acomodacoesDefaults" },
  { name: "birdwatching", file: "client/src/pages/birdwatching-defaults.ts", exportName: "birdwatchingDefaults" },
  { name: "pesca", file: "client/src/pages/pesca-defaults.ts", exportName: "pescaDefaults" },
  { name: "culinaria", file: "client/src/pages/culinaria-defaults.ts", exportName: "culinariaDefaults" },
  { name: "ecoturismo", file: "client/src/pages/ecoturismo-defaults.ts", exportName: "ecoturismoDefaults" },
  { name: "contato", file: "client/src/pages/contato-defaults.ts", exportName: "contatoDefaults" },
  { name: "nosso-impacto", file: "client/src/pages/nosso-impacto-defaults.ts", exportName: "nossoImpactoDefaults" },
  { name: "privacidade", file: "client/src/pages/privacidade-defaults.ts", exportName: "privacidadeDefaults" },
  { name: "regiao", file: "client/src/pages/regiao-defaults.ts", exportName: "regiaoDefaults" },
  { name: "not-found", file: "client/src/pages/not-found-defaults.ts", exportName: "notFoundDefaults" },
];

async function main() {
  const outDir = path.join(ROOT, "client/src/i18n/translations");
  fs.mkdirSync(outDir, { recursive: true });

  // Check which pages to process (skip if JSON already exists, unless --force)
  const force = process.argv.includes("--force");
  const only = process.argv.find(a => a.startsWith("--only="))?.split("=")[1];

  for (const entry of DEFAULTS) {
    if (only && entry.name !== only) continue;

    const outFile = path.join(outDir, `${entry.name}.json`);
    if (!force && fs.existsSync(outFile)) {
      console.log(`  SKIP  ${entry.name}.json (exists — use --force to overwrite)`);
      continue;
    }

    console.log(`\nTranslating ${entry.name}...`);
    const filePath = path.join(ROOT, entry.file);

    // Dynamic import of the TS defaults file via tsx (pathToFileURL fixes Windows paths)
    const mod = await import(pathToFileURL(filePath).href) as Record<string, unknown>;
    const ptContent = mod[entry.exportName];
    if (!ptContent) {
      console.error(`  ERROR: Could not find export "${entry.exportName}" in ${entry.file}`);
      continue;
    }

    const [enContent, esContent] = await Promise.all([
      translateObject(ptContent, "en"),
      translateObject(ptContent, "es"),
    ]);

    const output = { pt: ptContent, en: enContent, es: esContent };
    fs.writeFileSync(outFile, JSON.stringify(output, null, 2), "utf-8");
    console.log(`  ✓ ${entry.name}.json written`);
  }

  console.log("\nAll translations complete! Files in client/src/i18n/translations/");
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
