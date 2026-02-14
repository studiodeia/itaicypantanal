import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { resolve, relative } from "node:path";

type LinkEntry = {
  file: string;
  line: number;
  href: string;
  kind: "internal" | "external" | "hash" | "booking-expression" | "expression";
  ok: boolean;
  reason?: string;
};

function routePatternToRegex(route: string): RegExp {
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const withParams = escaped.replace(/:([A-Za-z0-9_]+)/g, "[^/]+");
  return new RegExp(`^${withParams}$`);
}

function normalizePath(href: string): string {
  const noHash = href.split("#")[0] || "/";
  return noHash.split("?")[0] || "/";
}

function getLineNumber(content: string, index: number): number {
  return content.slice(0, index).split("\n").length;
}

async function walkFiles(dir: string, out: string[] = []): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      await walkFiles(fullPath, out);
      continue;
    }
    if (entry.isFile() && (fullPath.endsWith(".ts") || fullPath.endsWith(".tsx"))) {
      out.push(fullPath);
    }
  }
  return out;
}

function extractAppRoutes(appContent: string): string[] {
  return [...appContent.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]);
}

function buildRouteMatchers(routes: string[]): RegExp[] {
  return routes.map(routePatternToRegex);
}

function classifyHref(
  href: string,
  routeMatchers: RegExp[],
): Pick<LinkEntry, "kind" | "ok" | "reason"> {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return { kind: "external", ok: true };
  }

  if (href.startsWith("#")) {
    return { kind: "hash", ok: true };
  }

  if (!href.startsWith("/")) {
    return { kind: "external", ok: true };
  }

  const path = normalizePath(href);
  const isKnownRoute = routeMatchers.some((matcher) => matcher.test(path));
  if (isKnownRoute) {
    return { kind: "internal", ok: true };
  }

  if (path === "/sitemap.xml" || path === "/robots.txt") {
    return { kind: "internal", ok: true };
  }

  return {
    kind: "internal",
    ok: false,
    reason: `rota nao encontrada para ${path}`,
  };
}

function collectLinksFromContent(
  file: string,
  content: string,
  routeMatchers: RegExp[],
): LinkEntry[] {
  const links: LinkEntry[] = [];

  const addStringHref = (href: string, index: number) => {
    const validation = classifyHref(href, routeMatchers);
    links.push({
      file,
      line: getLineNumber(content, index),
      href,
      ...validation,
    });
  };

  for (const match of content.matchAll(/href\s*=\s*"([^"]+)"/g)) {
    addStringHref(match[1], match.index ?? 0);
  }

  for (const match of content.matchAll(/href\s*=\s*'([^']+)'/g)) {
    addStringHref(match[1], match.index ?? 0);
  }

  for (const match of content.matchAll(/href\s*=\s*\{([^}]+)\}/g)) {
    const expression = match[1].trim();
    const line = getLineNumber(content, match.index ?? 0);

    if (expression.includes("buildCloudbedsBookingUrl(")) {
      links.push({
        file,
        line,
        href: `{${expression}}`,
        kind: "booking-expression",
        ok: true,
      });
      continue;
    }

    links.push({
      file,
      line,
      href: `{${expression}}`,
      kind: "expression",
      ok: true,
      reason: "analise manual necessaria para expressao dinamica",
    });
  }

  return links;
}

async function main() {
  const root = process.cwd();
  const appFile = resolve(root, "client", "src", "App.tsx");
  const appContent = await readFile(appFile, "utf8");

  const appRoutes = extractAppRoutes(appContent);
  const routeMatchers = buildRouteMatchers(appRoutes);

  const files = [
    ...(await walkFiles(resolve(root, "client", "src"))),
    ...(await walkFiles(resolve(root, "shared"))),
  ];

  const links: LinkEntry[] = [];
  for (const file of files) {
    const content = await readFile(file, "utf8");
    links.push(
      ...collectLinksFromContent(relative(root, file), content, routeMatchers),
    );
  }

  links.sort((a, b) => (a.file === b.file ? a.line - b.line : a.file.localeCompare(b.file)));

  const brokenLinks = links.filter((link) => !link.ok);
  const summary = {
    totalLinks: links.length,
    internalLinks: links.filter((link) => link.kind === "internal").length,
    externalLinks: links.filter((link) => link.kind === "external").length,
    hashLinks: links.filter((link) => link.kind === "hash").length,
    bookingExpressions: links.filter((link) => link.kind === "booking-expression").length,
    dynamicExpressions: links.filter((link) => link.kind === "expression").length,
    brokenInternalLinks: brokenLinks.length,
    appRoutes,
  };

  const outputDir = resolve(root, "docs", "links");
  await mkdir(outputDir, { recursive: true });

  await writeFile(
    resolve(outputDir, "link-map.json"),
    `${JSON.stringify({ summary, links, brokenLinks }, null, 2)}\n`,
    "utf8",
  );

  console.log(JSON.stringify(summary, null, 2));
  if (brokenLinks.length > 0) {
    console.log("Links internos com problemas:");
    for (const link of brokenLinks.slice(0, 20)) {
      console.log(`- ${link.file}:${link.line} -> ${link.href}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
