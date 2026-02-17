import type { Express } from "express";
import { z } from "zod";
import { getCmsAgentConfig, getCmsContent } from "../cms-content";
import { cloudbedsDebugSnapshot } from "../agent/cloudbeds";
import { getAgentMetricsSnapshot } from "../agent/metrics";
import {
  createPanelUser,
  disablePanelUser,
  getPanelAccountsPublic,
  loginPanelUser,
  parsePanelCreateUserBody,
  parsePanelLoginBody,
  parsePanelUpdateUserBody,
  requirePanelUser,
  updatePanelUser,
} from "./auth";

const adminDashboardQuerySchema = z.object({
  metrics_window_hours: z.coerce.number().int().min(1).max(24 * 30).default(24),
});

function getSafeAgentRuntimeConfig() {
  return {
    model: process.env.AGENT_MODEL || "gpt-5-mini",
    temperature: Number.parseFloat(process.env.AGENT_TEMPERATURE || "0.35"),
    maxOutputTokens: Number.parseInt(process.env.AGENT_MAX_OUTPUT_TOKENS || "900", 10),
    maxOutputTokensCommercial: Number.parseInt(
      process.env.AGENT_MAX_OUTPUT_TOKENS_COMMERCIAL || "540",
      10,
    ),
    maxOutputTokensPolicy: Number.parseInt(
      process.env.AGENT_MAX_OUTPUT_TOKENS_POLICY || "620",
      10,
    ),
    firstTokenDelayMs: Number.parseInt(process.env.AGENT_FIRST_TOKEN_DELAY_MS || "220", 10),
  };
}

export function registerPanelRoutes(app: Express) {
  app.post("/api/panel/auth/login", async (req, res) => {
    const parsed = parsePanelLoginBody(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Payload de login invalido." });
      return;
    }

    const result = await loginPanelUser(parsed.data.username, parsed.data.password);
    if (!result) {
      res.status(401).json({ message: "Usuario ou senha invalidos." });
      return;
    }

    res.json({
      status: "ok",
      token: result.token,
      user: result.user,
      expiresAt: result.expiresAt,
    });
  });

  app.post("/api/panel/auth/logout", async (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/panel/auth/me", async (req, res) => {
    const user = requirePanelUser(req, res);
    if (!user) return;
    res.json({ user });
  });

  app.get("/api/panel/dashboard", async (req, res) => {
    const user = requirePanelUser(req, res);
    if (!user) return;

    const parsedQuery = adminDashboardQuerySchema.safeParse(req.query);
    if (!parsedQuery.success) {
      res.status(400).json({ message: "Query invalida para dashboard." });
      return;
    }

    const [cmsConfigResult, cmsSourceResult] = await Promise.allSettled([
      getCmsAgentConfig(),
      getCmsContent(),
    ]);

    const cmsConfig =
      cmsConfigResult.status === "fulfilled"
        ? {
            source: cmsConfigResult.value.source,
            assistantName: cmsConfigResult.value.config.assistantName,
            bookingEngineUrl: cmsConfigResult.value.config.bookingEngineUrl,
            serviceHours: cmsConfigResult.value.config.handoff.serviceHours,
            handoffEmail: cmsConfigResult.value.config.handoff.email,
            handoffWhatsapp: cmsConfigResult.value.config.handoff.whatsapp,
          }
        : null;

    const cmsSource =
      cmsSourceResult.status === "fulfilled"
        ? {
            source: cmsSourceResult.value.source,
            generatedAt: cmsSourceResult.value.content.generatedAt,
          }
        : null;

    const dashboard: Record<string, unknown> = {
      generatedAt: new Date().toISOString(),
      user,
      runtime: getSafeAgentRuntimeConfig(),
      cmsConfig,
      cmsSource,
    };

    if (user.role === "admin" || user.role === "manager") {
      const [metricsResult] = await Promise.allSettled([
        getAgentMetricsSnapshot(parsedQuery.data.metrics_window_hours),
      ]);

      dashboard.metrics =
        metricsResult.status === "fulfilled"
          ? metricsResult.value
          : {
              unavailable: true,
              message:
                metricsResult.reason instanceof Error
                  ? metricsResult.reason.message
                  : "Metrics unavailable.",
            };

      dashboard.cloudbeds = cloudbedsDebugSnapshot();
      dashboard.accountsSummary = {
        total: (await getPanelAccountsPublic()).length,
      };
    } else {
      dashboard.userArea = {
        message:
          "Painel do usuario com acesso a acompanhamento do atendimento digital e canais oficiais.",
      };
    }

    res.json(dashboard);
  });

  app.get("/api/panel/admin/users", async (req, res) => {
    const user = requirePanelUser(req, res, ["admin"]);
    if (!user) return;

    res.json({
      generatedAt: new Date().toISOString(),
      requestedBy: user.username,
      users: await getPanelAccountsPublic(),
    });
  });

  app.post("/api/panel/admin/users", async (req, res) => {
    const user = requirePanelUser(req, res, ["admin"]);
    if (!user) return;

    const parsed = parsePanelCreateUserBody(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Payload invalido para criar usuario." });
      return;
    }

    try {
      const created = await createPanelUser(parsed.data);
      res.status(201).json({
        status: "ok",
        createdBy: user.username,
        user: created,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao criar usuario.";
      const status = message.toLowerCase().includes("ja existe") ? 409 : 503;
      res.status(status).json({ message });
    }
  });

  app.patch("/api/panel/admin/users/:id", async (req, res) => {
    const user = requirePanelUser(req, res, ["admin"]);
    if (!user) return;

    const parsed = parsePanelUpdateUserBody(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Payload invalido para atualizar usuario." });
      return;
    }

    try {
      const updated = await updatePanelUser(req.params.id, parsed.data);
      res.json({
        status: "ok",
        updatedBy: user.username,
        user: updated,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao atualizar usuario.";
      const lower = message.toLowerCase();
      const status = lower.includes("nao encontrado") ? 404 : 503;
      res.status(status).json({ message });
    }
  });

  app.delete("/api/panel/admin/users/:id", async (req, res) => {
    const user = requirePanelUser(req, res, ["admin"]);
    if (!user) return;

    try {
      const updated = await disablePanelUser(req.params.id);
      res.json({
        status: "ok",
        disabledBy: user.username,
        user: updated,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao desativar usuario.";
      const lower = message.toLowerCase();
      const status = lower.includes("nao encontrado") ? 404 : 503;
      res.status(status).json({ message });
    }
  });

  app.post("/api/panel/admin/users/:id/reset-password", async (req, res) => {
    const user = requirePanelUser(req, res, ["admin"]);
    if (!user) return;

    const bodySchema = z.object({
      password: z.string().min(8).max(256),
    });

    const parsed = bodySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Payload invalido para redefinir senha." });
      return;
    }

    try {
      const updated = await updatePanelUser(req.params.id, { password: parsed.data.password });
      res.json({
        status: "ok",
        updatedBy: user.username,
        user: updated,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao redefinir senha.";
      const lower = message.toLowerCase();
      const status = lower.includes("nao encontrado") ? 404 : 503;
      res.status(status).json({ message });
    }
  });
}
