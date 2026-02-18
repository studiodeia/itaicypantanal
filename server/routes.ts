import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getCmsAgentConfig, getCmsContent } from "./cms-content";
import { buildRobotsTxt, buildSitemapXml, buildLlmsTxt } from "./sitemap";
import { handleChatRequest } from "./agent/chat-route";
import { handleFaqReindexRequest } from "./agent/reindex-route";
import { handleAgentMetricsRequest } from "./agent/metrics-route";
import { handleCloudbedsStatusRequest } from "./agent/cloudbeds-status-route";
import { handleCloudbedsOAuthCallback } from "./agent/cloudbeds-oauth-callback-route";
import { handleCloudbedsOAuthStart } from "./agent/cloudbeds-oauth-start-route";
import { registerPanelRoutes } from "./panel/routes";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.get("/api/cms/health", async (_req, res) => {
    try {
      const { source } = await getCmsContent();
      res.json({ status: "ok", source });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error instanceof Error ? error.message : "Failed to load CMS seed",
      });
    }
  });

  app.get("/api/cms/source", async (_req, res) => {
    const { source } = await getCmsContent();
    res.json({ source });
  });

  app.get("/api/cms/blog", async (_req, res) => {
    try {
      const { content, source } = await getCmsContent();
      res.json({ ...content.blog, source });
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : "Failed to load blog content",
      });
    }
  });

  app.get("/api/cms/shared", async (_req, res) => {
    try {
      const { content, source } = await getCmsContent();
      res.json({ source, shared: content.shared ?? {} });
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : "Failed to load shared content",
      });
    }
  });

  app.get("/api/cms/agent-config", async (_req, res) => {
    try {
      const { config, source } = await getCmsAgentConfig();
      res.json({ source, config });
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : "Failed to load agent config",
      });
    }
  });

  app.get("/api/cms/blog/article/:slug", async (req, res) => {
    try {
      const { content, source } = await getCmsContent();
      const article = content.blog.details.find(
        (item) => item.slug === req.params.slug,
      );
      if (!article) {
        res.status(404).json({ message: "Article not found" });
        return;
      }
      res.json({ ...article, source });
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : "Failed to load article detail",
      });
    }
  });

  app.get("/api/cms/birdwatching", async (_req, res) => {
    try {
      const { content, source } = await getCmsContent();
      res.json({ ...content.birdwatching, source });
    } catch (error) {
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Failed to load birdwatching content",
      });
    }
  });

  app.get("/api/cms/page/:slug", async (req, res) => {
    try {
      const { content, source } = await getCmsContent();
      const slug = "/" + (req.params.slug === "home" ? "" : req.params.slug);
      const pageData = content.pageContent?.[slug] ?? null;
      if (!pageData) {
        res.status(404).json({ message: "Page content not found" });
        return;
      }
      res.json({ slug, content: pageData, source });
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : "Failed to load page content",
      });
    }
  });

  app.get("/api/cms/birdwatching/species/:slug", async (req, res) => {
    try {
      const { content, source } = await getCmsContent();
      const species = content.birdwatching.details.find(
        (item) => item.slug === req.params.slug,
      );
      if (!species) {
        res.status(404).json({ message: "Species not found" });
        return;
      }
      res.json({ ...species, source });
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : "Failed to load species detail",
      });
    }
  });

  app.get("/sitemap.xml", async (req, res) => {
    try {
      const xml = await buildSitemapXml(req);
      res.type("application/xml").send(xml);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : "Failed to build sitemap",
      });
    }
  });

  app.get("/robots.txt", (req, res) => {
    const robotsTxt = buildRobotsTxt(req);
    res.type("text/plain").send(robotsTxt);
  });

  app.get("/llms.txt", (req, res) => {
    const llmsTxt = buildLlmsTxt(req);
    res.type("text/plain").send(llmsTxt);
  });

  app.post("/api/chat", async (req, res) => {
    await handleChatRequest(req, res);
  });

  app.post("/api/agent/reindex/faqs", async (req, res) => {
    await handleFaqReindexRequest(req, res);
  });

  app.get("/api/agent/metrics", async (req, res) => {
    await handleAgentMetricsRequest(req, res);
  });

  app.get("/api/agent/cloudbeds/status", async (req, res) => {
    await handleCloudbedsStatusRequest(req, res);
  });

  app.get("/api/agent/cloudbeds/oauth/callback", async (req, res) => {
    await handleCloudbedsOAuthCallback(req, res);
  });

  app.get("/api/agent/cloudbeds/oauth/start", async (req, res) => {
    await handleCloudbedsOAuthStart(req, res);
  });

  registerPanelRoutes(app);

  const httpServer = createServer(app);

  return httpServer;
}
