import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { chromium, devices, type BrowserContext, type Page } from "playwright";

const PORT = 5088;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const OUTPUT_DIR = path.join(process.cwd(), "tmp", "playwright", "chat-ux");

function buildAgentConfigMock() {
  return {
    source: "mock",
    config: {
      enabled: true,
      assistantName: "Itaicy Atendimento Digital",
      bookingEngineUrl: "https://hotels.cloudbeds.com/reservation/ITAICY",
      disclaimers: {
        price: {
          pt: "Valores sujeitos a variacao conforme data e ocupacao.",
          en: "Rates may vary by date and occupancy.",
          es: "Las tarifas pueden variar segun fechas y ocupacion.",
        },
        availability: {
          pt: "Disponibilidade sujeita a confirmacao.",
          en: "Availability is subject to confirmation.",
          es: "Disponibilidad sujeta a confirmacion.",
        },
        policyReference: {
          pt: "Confira os termos completos no momento da reserva.",
          en: "Please review full terms at booking.",
          es: "Consulte los terminos completos al reservar.",
        },
      },
      handoff: {
        email: "reservas@itaicypantanal.com.br",
        emergencyPhone: "+55 (67) 99999-9999",
        whatsapp: "+55 (67) 99999-9999",
        serviceHours: "Seg a Sex, 08:00-18:00",
        slaHours: 2,
      },
      fallback: {
        genericError: {
          pt: "Estou com instabilidade agora.",
          en: "I am unstable right now.",
          es: "Estoy inestable ahora.",
        },
        apiUnavailable: {
          pt: "Nao consigo consultar este dado em tempo real.",
          en: "I cannot fetch this in real time.",
          es: "No puedo consultar esto en tiempo real.",
        },
      },
      lead: {
        consentPrompt: {
          pt: "Posso usar seu contato para retornar?",
          en: "May I use your contact to follow up?",
          es: "Puedo usar tu contacto para responder?",
        },
        successMessage: {
          pt: "Nossa equipe entrara em contato.",
          en: "Our team will contact you.",
          es: "Nuestro equipo te contactara.",
        },
      },
      welcome: {
        greeting: {
          pt: "Atendimento digital Itaicy online.",
          en: "Itaicy digital service online.",
          es: "Atencion digital Itaicy en linea.",
        },
      },
      retrieval: {
        faqConfidenceThreshold: 0.75,
      },
    },
  };
}

function sseBlock(eventName: string, payload: Record<string, unknown>): string {
  return `event: ${eventName}\ndata: ${JSON.stringify(payload)}\n\n`;
}

function buildChatSseResponse(message: string): string {
  const sessionId = "11111111-1111-4111-8111-111111111111";
  const normalized = message.toLowerCase();

  if (normalized.includes("equipe") || normalized.includes("humana")) {
    return [
      sseBlock("tool_start", { event: "tool_start", tool: "createHandoff", input: {} }),
      sseBlock("token", {
        event: "token",
        text: "Acionei nossa equipe de atendimento humano para continuar seu caso.",
      }),
      sseBlock("tool_end", {
        event: "tool_end",
        tool: "createHandoff",
        status: "success",
        confidence_score: 0.88,
        grounding_level: "partial",
        source_refs: [
          {
            source_id: "handoff-ticket-001",
            source_type: "unknown",
            score: 0.88,
          },
        ],
      }),
      sseBlock("done", {
        event: "done",
        session_id: sessionId,
        confidence_score: 0.88,
        grounding_level: "partial",
        source_refs: [],
      }),
    ].join("");
  }

  return [
    sseBlock("tool_start", {
      event: "tool_start",
      tool: "checkAvailability",
      input: { checkIn: "2026-07-10", checkOut: "2026-07-12", adults: 2 },
    }),
    sseBlock("token", {
      event: "token",
      text: "Temos disponibilidade para as datas consultadas. ",
    }),
    sseBlock("token", {
      event: "token",
      text: "Posso te direcionar para concluir a reserva agora.",
    }),
    sseBlock("tool_end", {
      event: "tool_end",
      tool: "checkAvailability",
      status: "fallback",
      confidence_score: 0.91,
      grounding_level: "none",
      source_refs: [
        {
          source_id: "availability-api",
          source_type: "reservation",
          score: 0.91,
        },
      ],
    }),
    sseBlock("done", {
      event: "done",
      session_id: sessionId,
      confidence_score: 0.91,
      grounding_level: "none",
      source_refs: [],
    }),
  ].join("");
}

async function stopServerProcessTree(pid: number): Promise<void> {
  if (process.platform === "win32") {
    await new Promise<void>((resolve) => {
      const killer = spawn("taskkill", ["/PID", String(pid), "/T", "/F"], {
        shell: true,
        stdio: "ignore",
      });
      killer.on("exit", () => resolve());
      killer.on("error", () => resolve());
    });
    return;
  }

  process.kill(pid, "SIGTERM");
}

async function waitForServerReady(timeoutMs = 60000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(`${BASE_URL}/api/cms/health`);
      if (response.ok) return;
    } catch {
      // retry
    }
    await delay(500);
  }
  throw new Error(`Servidor nao ficou pronto em ${timeoutMs}ms.`);
}

async function setupRoutes(page: Page) {
  await page.route("**/api/cms/agent-config", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(buildAgentConfigMock()),
    });
  });

  await page.route("**/api/chat", async (route) => {
    const payloadRaw = route.request().postData() || "{}";
    let message = "";
    try {
      const parsed = JSON.parse(payloadRaw) as { message?: string };
      message = parsed.message || "";
    } catch {
      message = "";
    }

    await route.fulfill({
      status: 200,
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
      body: buildChatSseResponse(message),
    });
  });
}

async function captureDesktopFlow(context: BrowserContext) {
  const page = await context.newPage();
  await setupRoutes(page);

  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);

  await page.screenshot({
    path: path.join(OUTPUT_DIR, "desktop-01-launcher.png"),
  });

  await page.getByRole("button", { name: /Atendimento digital/i }).click();
  await page.waitForTimeout(450);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "desktop-02-open.png"),
  });

  await page.getByRole("button", { name: /Ver disponibilidade/i }).click();
  await page.waitForTimeout(900);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "desktop-03-availability.png"),
  });

  await page.close();
}

async function captureMobileFlow(context: BrowserContext) {
  const page = await context.newPage();
  await setupRoutes(page);

  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);

  await page.screenshot({
    path: path.join(OUTPUT_DIR, "mobile-01-launcher.png"),
  });

  await page.getByRole("button", { name: /Atendimento digital/i }).click();
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "mobile-02-open.png"),
  });
  await page.getByRole("button", { name: /Ver disponibilidade/i }).click();
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: path.join(OUTPUT_DIR, "mobile-03-flow.png"),
  });

  await page.close();
}

async function run() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  console.log("CHAT_VISUAL_START");
  console.log(`BASE_URL=${BASE_URL}`);

  const server = spawn("npm", ["run", "dev"], {
    cwd: process.cwd(),
    shell: true,
    env: {
      ...process.env,
      PORT: String(PORT),
      NODE_ENV: "development",
      PANEL_JWT_SECRET:
        process.env.PANEL_JWT_SECRET || "dev-panel-secret-1234567890",
    },
    stdio: ["ignore", "inherit", "inherit"],
  });

  try {
    console.log("WAIT_SERVER");
    await waitForServerReady();
    console.log("SERVER_READY");

    const browser = await chromium.launch({ headless: true });
    console.log("BROWSER_READY");

    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 1024 },
      locale: "pt-BR",
      colorScheme: "light",
    });

    await captureDesktopFlow(desktopContext);
    console.log("DESKTOP_CAPTURED");
    await desktopContext.close();

    const mobileContext = await browser.newContext({
      ...devices["iPhone 13"],
      locale: "pt-BR",
      colorScheme: "light",
    });

    await captureMobileFlow(mobileContext);
    console.log("MOBILE_CAPTURED");
    await mobileContext.close();

    await browser.close();

    console.log("CHAT_VISUAL_OK");
    console.log(`output_dir=${OUTPUT_DIR}`);
  } finally {
    if (server.pid) {
      console.log(`STOP_SERVER pid=${server.pid}`);
      await stopServerProcessTree(server.pid);
    }
  }
}

run().catch((error) => {
  console.error("CHAT_VISUAL_FAIL");
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
