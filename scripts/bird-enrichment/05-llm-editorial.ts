/**
 * 05-llm-editorial.ts — Generate editorial content for all species via Claude API.
 *
 * For each species, sends structured data + Wikipedia reference text to Claude,
 * receives back editorial content in the Itaicy voice.
 *
 * Input:  data/consolidated.json + data/wikipedia-raw/*.md
 * Output: data/editorial.json
 *
 * Requires: ANTHROPIC_API_KEY in .env
 */

import "dotenv/config";
import { resolve, dirname } from "node:path";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import type { EnrichedSpecies, EditorialContent } from "./lib/types.js";
import { readJson, writeJson, delay, logProgress } from "./lib/utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA = (f: string) => resolve(__dirname, "data", f);
const DELAY_MS = 500; // Between API calls

// Max tokens from Wikipedia text to include in prompt (avoid bloating context)
const MAX_WIKI_CHARS = 6000;

const client = new Anthropic();

interface ConsolidatedEntry extends EnrichedSpecies {
  photos: string[];
}

/** Read a Wikipedia text file, truncated to MAX_WIKI_CHARS */
async function readWikiText(relPath: string | undefined): Promise<string | null> {
  if (!relPath) return null;
  try {
    const fullPath = resolve(__dirname, "data", relPath);
    const text = await readFile(fullPath, "utf8");
    if (text.length > MAX_WIKI_CHARS) {
      return text.substring(0, MAX_WIKI_CHARS) + "\n[... texto truncado]";
    }
    return text;
  } catch {
    return null;
  }
}

/** Build the editorial prompt for a species */
function buildPrompt(
  species: ConsolidatedEntry,
  wikiPT: string | null,
  wikiEN: string | null,
): string {
  const s = species;
  const gbif = s.gbif;
  const wd = s.wikidata;

  let prompt = `Você é redator editorial do site Itaicy Pantanal Eco Lodge, uma pousada de ecoturismo no Pantanal de Mato Grosso, Brasil.

DADOS DA ESPÉCIE:
- Nome científico: ${s.scientificName}
- Nome popular (PT): ${s.commonNamePT}
- Nome em inglês: ${s.commonNameEN}
- Ordem: ${gbif?.order || s.csvOrder || "desconhecida"}
- Família: ${gbif?.family || s.csvFamily || "desconhecida"}
- Status IUCN: ${wd?.iucnStatus || "LC (presumido)"}
- Registro local: relatório João Andriola, mai/2024, Pousada Itaicy`;

  if (wd?.massG) {
    prompt += `\n- Massa: ${wd.massG >= 1000 ? (wd.massG / 1000).toFixed(1) + " kg" : wd.massG + " g"}`;
  }
  if (wd?.lengthCm) {
    prompt += `\n- Comprimento: ${wd.lengthCm} cm`;
  }
  if (s.report.isThreatened) {
    prompt += `\n- ESPÉCIE AMEAÇADA: ${s.report.iucnFromReport}`;
  }
  if (s.report.isPantanalRestricted) {
    prompt += `\n- Distribuição restrita ao Pantanal e entorno`;
  }
  if (s.report.isNotable) {
    prompt += `\n- Nota: ${s.report.notableReason}`;
  }
  if (s.photos.length > 0) {
    prompt += `\n- Possui ${s.photos.length} foto(s) própria(s) do levantamento local`;
  }

  if (wikiPT) {
    prompt += `\n\nREFERÊNCIA (Wikipedia PT-BR):\n${wikiPT}`;
  }
  if (wikiEN) {
    prompt += `\n\nREFERÊNCIA (Wikipedia EN):\n${wikiEN}`;
  }

  prompt += `

GERE em PT-BR, tom editorial (informativo, objetivo, sem exagero, sem antropomorfismo):

1. "descricaoCurta": 1-2 frases, max 220 caracteres. Resumo que aparece em cards do catálogo.
2. "visaoGeral": 120-200 palavras. Texto principal da página da espécie.
3. "habitat": 1-2 parágrafos curtos. Onde vive, tipo de ambiente.
4. "alimentacao": 2-4 frases. O que come e como se alimenta.
5. "comportamento": 2-4 frases. Comportamento social, reprodução, hábitos.
6. "melhorPeriodo": 2-4 frases. Quando é mais fácil observar no Pantanal (considere: seca mai-out, chuva nov-abr).
7. "dicasFotografia": 3-5 bullets acionáveis para fotógrafos de natureza.
8. "tamanho": 1 frase descritiva do tamanho (ex: "Mede cerca de 30 cm e pesa aproximadamente 250 g."). Se não houver dados exatos, estime com base na família/gênero.
9. "statusConservacao": 1-2 frases sobre o status de conservação.

REGRAS:
- NÃO afirmar "na Itaicy" — diga "no Pantanal" ou "na região"
- NÃO usar superlativos vazios ("magnífico", "espetacular")
- NÃO antropomorfizar ("o pássaro ama", "a ave escolhe")
- NÃO usar "sempre" ou "nunca" sobre avistamentos
- Cite estação (seca/chuva) quando relevante
- Para ameaçadas, mencione status sem alarmismo
- Textos devem ser factuais e baseados nas referências fornecidas
- Se algum dado não estiver nas referências, use conhecimento geral sobre a espécie mas mantenha-se conservador

Retorne APENAS um JSON válido, sem markdown, sem backticks, neste formato exato:
{
  "descricaoCurta": "...",
  "visaoGeral": "...",
  "habitat": "...",
  "alimentacao": "...",
  "comportamento": "...",
  "melhorPeriodo": "...",
  "dicasFotografia": ["...", "...", "..."],
  "tamanho": "...",
  "statusConservacao": "..."
}`;

  return prompt;
}

/** Parse Claude's JSON response, handling potential markdown wrapping */
function parseResponse(text: string): EditorialContent | null {
  // Strip markdown code fences if present
  let clean = text.trim();
  if (clean.startsWith("```")) {
    clean = clean.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  try {
    const parsed = JSON.parse(clean);
    return {
      description: parsed.descricaoCurta || "",
      overview: parsed.visaoGeral || "",
      habitat: parsed.habitat || "",
      diet: parsed.alimentacao || "",
      behavior: parsed.comportamento || "",
      bestTime: parsed.melhorPeriodo || "",
      photographyTips: parsed.dicasFotografia || [],
      size: parsed.tamanho || "",
      conservationStatus: parsed.statusConservacao || "",
    };
  } catch (e) {
    console.error("  JSON parse error:", (e as Error).message);
    console.error("  Response preview:", clean.substring(0, 200));
    return null;
  }
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ERROR: ANTHROPIC_API_KEY not set. Create a .env file with your API key.");
    process.exit(1);
  }

  const data = await readJson<ConsolidatedEntry[]>(DATA("consolidated.json"));
  console.log(`Loaded ${data.length} species\n`);

  // Check for existing editorial.json to support resuming
  let existing: Record<string, EditorialContent> = {};
  try {
    const prev = await readJson<Record<string, EditorialContent>>(DATA("editorial.json"));
    existing = prev;
    console.log(`Found existing editorial.json with ${Object.keys(existing).length} entries (will skip)`);
  } catch {
    // No existing file, start fresh
  }

  const results: Record<string, EditorialContent> = { ...existing };
  let generated = 0;
  let skipped = 0;
  let failed = 0;
  const toProcess = data.filter((s) => !existing[s.scientificName]);

  console.log(`Processing ${toProcess.length} species (${data.length - toProcess.length} already done)\n`);

  for (let i = 0; i < toProcess.length; i++) {
    const species = toProcess[i];

    // Load Wikipedia text
    const wikiPT = await readWikiText(species.firecrawlFiles.wikiPT);
    const wikiEN = await readWikiText(species.firecrawlFiles.wikiEN);

    const prompt = buildPrompt(species, wikiPT, wikiEN);

    try {
      const response = await client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      });

      const text = response.content[0].type === "text" ? response.content[0].text : "";
      const editorial = parseResponse(text);

      if (editorial) {
        results[species.scientificName] = editorial;
        generated++;
      } else {
        console.error(`\n  FAILED: ${species.scientificName} (bad JSON)`);
        failed++;
      }
    } catch (e) {
      console.error(`\n  API ERROR: ${species.scientificName}: ${(e as Error).message}`);
      failed++;

      // If rate limited, wait longer
      if ((e as Error).message.includes("rate")) {
        console.log("  Rate limited, waiting 10s...");
        await delay(10000);
      }
    }

    logProgress(i + 1, toProcess.length, "species generated");

    // Save progress every 10 species
    if ((i + 1) % 10 === 0) {
      await writeJson(DATA("editorial.json"), results);
    }

    if (i < toProcess.length - 1) await delay(DELAY_MS);
  }

  // Final save
  await writeJson(DATA("editorial.json"), results);

  const total = data.length;
  const done = Object.keys(results).length;

  console.log(`\n=== Editorial Generation Summary ===`);
  console.log(`  Generated: ${generated}`);
  console.log(`  Skipped (existing): ${skipped}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Total in editorial.json: ${done}/${total}`);

  if (failed > 0) {
    console.log(`\n  Re-run this script to retry failed species.`);
  }

  console.log(`\nOutput: ${DATA("editorial.json")}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
