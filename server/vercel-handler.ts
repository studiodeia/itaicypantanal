import "dotenv/config";
/**
 * Vercel Serverless Function entry point.
 *
 * Pre-bundled by esbuild during buildCommand (see scripts/vercel-build.sh).
 * Static assets are served from .vercel/output/static/ via Vercel CDN.
 * This function handles: API routes, sitemap, robots.txt, llms.txt,
 * and HTML pages with server-side meta injection for AI crawlers.
 */

import express from "express";
import type { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { registerRoutes } from "./routes";
import { injectRouteMeta } from "./seo-meta";
import { canonicalHostRedirectMiddleware } from "./canonical-host";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(canonicalHostRedirectMiddleware);

let initialized = false;
let indexHtml = "";

function findIndexHtml(): string {
  const bases: string[] = [];
  if (typeof __dirname !== "undefined") bases.push(__dirname);
  bases.push(process.cwd());

  for (const base of bases) {
    for (const suffix of ["_index.html", "dist/public/index.html"]) {
      const p = path.resolve(base, suffix);
      try {
        if (fs.existsSync(p)) {
          console.log("[vercel-fn] index.html found at:", p);
          return fs.readFileSync(p, "utf-8");
        }
      } catch { /* skip */ }
    }
  }
  console.warn("[vercel-fn] index.html NOT found, using fallback");
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Itaicy Pantanal Eco Lodge</title></head><body><div id="root"></div></body></html>';
}

async function ensureInit() {
  if (initialized) return;
  initialized = true;

  console.log("[vercel-fn] Initializing...");
  console.log("[vercel-fn] __dirname:", typeof __dirname !== "undefined" ? __dirname : "N/A");
  console.log("[vercel-fn] cwd:", process.cwd());

  try {
    await registerRoutes(app);
    console.log("[vercel-fn] Routes registered OK");
  } catch (err: any) {
    console.error("[vercel-fn] registerRoutes failed:", err?.message, err?.stack);
  }

  indexHtml = findIndexHtml();

  // SPA catch-all: inject per-route meta tags for AI crawlers
  app.use("*", async (req: Request, res: Response) => {
    if (path.extname(req.path)) {
      res.status(404).send("Not found");
      return;
    }
    try {
      const envBase = process.env.SITE_URL?.trim()?.replace(/\/+$/, "");
      const host = req.get("host") || "itaicypantanal.com.br";
      const baseUrl = envBase || `https://${host}`;
      const page = await injectRouteMeta(indexHtml, req.originalUrl.split("?")[0], baseUrl);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (err) {
      console.error("[vercel-fn] meta injection failed:", err);
      res.status(200).set({ "Content-Type": "text/html" }).end(indexHtml);
    }
  });
}

// Default export — Vercel Nodejs launcher calls require('./index.js') and invokes the default export
export default async function handler(req: Request, res: Response) {
  try {
    await ensureInit();
    app(req, res);
  } catch (err: any) {
    console.error("[vercel-fn] handler error:", err?.message, err?.stack);
    res.status(500).json({ error: err?.message || "Internal server error" });
  }
}
