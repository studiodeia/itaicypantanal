import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, relative } from "node:path";

type SectionAudit = {
  file: string;
  area: "shared" | "page-specific";
  exports: string[];
  dataArrays: string[];
  imageRefs: number;
  stringLiterals: number;
};

async function walk(dir: string, files: string[] = []): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, files);
      continue;
    }
    if (
      entry.isFile() &&
      fullPath.endsWith(".tsx") &&
      fullPath.includes(`${resolve("client", "src", "pages")}\\`) &&
      fullPath.includes("\\sections\\")
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

function auditFile(content: string, filePath: string): SectionAudit {
  const exports = [...content.matchAll(/export const\s+([A-Za-z0-9_]+)/g)].map(
    (m) => m[1],
  );
  const dataArrays = [
    ...content.matchAll(/const\s+([A-Za-z0-9_]+)\s*=\s*\[/g),
  ].map((m) => m[1]);
  const imageRefs = (content.match(/\/images\//g) || []).length;
  const stringLiterals = (content.match(/"[^"\n]{3,}"/g) || []).length;

  return {
    file: filePath,
    area: filePath.includes(`client\\src\\pages\\sections\\`)
      ? "shared"
      : "page-specific",
    exports,
    dataArrays,
    imageRefs,
    stringLiterals,
  };
}

async function main() {
  const root = process.cwd();
  const pagesDir = resolve(root, "client", "src", "pages");
  const outputDir = resolve(root, "docs", "payload-seed");
  const outputPath = resolve(outputDir, "sections-manifest.json");

  const files = await walk(pagesDir);
  const audits: SectionAudit[] = [];

  for (const file of files) {
    const content = await readFile(file, "utf8");
    audits.push(auditFile(content, relative(root, file)));
  }

  const summary = {
    totalSections: audits.length,
    sharedSections: audits.filter((f) => f.area === "shared").length,
    pageSpecificSections: audits.filter((f) => f.area === "page-specific")
      .length,
    withDataArrays: audits.filter((f) => f.dataArrays.length > 0).length,
    withImageRefs: audits.filter((f) => f.imageRefs > 0).length,
  };

  await mkdir(outputDir, { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify({ summary, sections: audits }, null, 2)}\n`,
    "utf8",
  );

  console.log(JSON.stringify(summary, null, 2));
  console.log(`Manifesto salvo em ${relative(root, outputPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

