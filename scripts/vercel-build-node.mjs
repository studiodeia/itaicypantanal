#!/usr/bin/env node
import { spawnSync } from "child_process";
import { mkdirSync, writeFileSync, copyFileSync, rmSync, readdirSync, statSync, existsSync } from "fs";
import { join, relative } from "path";
import { createRequire } from "module";

const FUNC_DIR = ".vercel/output/functions/api/index.func";

function run(cmd) {
  console.log("$", cmd);
  const r = spawnSync(cmd, [], { shell: true, encoding: "utf8", stdio: "inherit" });
  if (r.status !== 0) {
    throw new Error(`Command failed: ${cmd} (exit ${r.status})`);
  }
}

/** Recursively copy srcDir into destDir */
function copyDirSync(srcDir, destDir) {
  mkdirSync(destDir, { recursive: true });
  for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
    const src = join(srcDir, entry.name);
    const dest = join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(src, dest);
    } else {
      copyFileSync(src, dest);
    }
  }
}

try {
  console.log("==> Step 1: npm run build");
  run("npm run build");

  console.log("\n==> Step 2: esbuild vercel handler");
  mkdirSync(FUNC_DIR, { recursive: true });
  run(
    `npx esbuild server/vercel-handler.ts --platform=node --bundle --format=cjs --outfile=${FUNC_DIR}/index.js --alias:@shared=./shared --target=node20`
  );
  writeFileSync(`${FUNC_DIR}/package.json`, JSON.stringify({ type: "commonjs" }));

  console.log("\n==> Step 3: Static assets");
  mkdirSync(".vercel/output/static", { recursive: true });
  copyDirSync("dist/public", ".vercel/output/static");
  // Remove index.html from static so all HTML routes go through the function
  if (existsSync(".vercel/output/static/index.html")) {
    rmSync(".vercel/output/static/index.html");
    console.log("Removed index.html from static");
  }
  // Copy index.html template into function for meta injection
  copyFileSync("dist/public/index.html", `${FUNC_DIR}/_index.html`);
  // Copy seed data into function
  mkdirSync(`${FUNC_DIR}/docs/payload-seed`, { recursive: true });
  const seedFiles = readdirSync("docs/payload-seed").filter((f) => f.endsWith(".json"));
  seedFiles.forEach((f) => copyFileSync(`docs/payload-seed/${f}`, `${FUNC_DIR}/docs/payload-seed/${f}`));
  console.log("Copied seed files:", seedFiles.join(", "));

  console.log("\n==> Step 4: Function config");
  writeFileSync(
    `${FUNC_DIR}/.vc-config.json`,
    JSON.stringify(
      {
        runtime: "nodejs20.x",
        handler: "index.js",
        launcherType: "Nodejs",
        shouldAddHelpers: true,
        supportsResponseStreaming: true,
      },
      null,
      2
    )
  );

  console.log("\n==> Step 5: Output config (routing)");
  writeFileSync(
    ".vercel/output/config.json",
    JSON.stringify(
      {
        version: 3,
        routes: [
          {
            src: "/assets/(.*)",
            headers: { "Cache-Control": "public, max-age=31536000, immutable" },
            continue: true,
          },
          {
            src: "/images/(.*)",
            headers: { "Cache-Control": "public, max-age=604800" },
            continue: true,
          },
          { handle: "filesystem" },
          { src: "/(.*)", dest: "/api/index" },
        ],
      },
      null,
      2
    )
  );

  console.log("\n==> Export check");
  const require = createRequire(import.meta.url);
  const m = require(`${process.cwd()}/${FUNC_DIR}/index.js`);
  console.log(
    "default:",
    typeof m.default,
    "| module.exports:",
    typeof m,
    "| keys:",
    Object.keys(m).join(",")
  );

  console.log("\n==> BUILD COMPLETE");
  console.log("Function size:", Math.round(statSync(`${FUNC_DIR}/index.js`).size / 1024) + " KB");
  console.log("Static files:", readdirSync(".vercel/output/static").length);
} catch (e) {
  console.error("\nBUILD FAILED:", e.message);
  process.exit(1);
}
