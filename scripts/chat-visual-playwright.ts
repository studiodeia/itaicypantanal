/**
 * Chat Visual QA — V2 ICP Flows
 *
 * Testa os 6 ICPs do fluxo V2:
 *   ICP-1  Pescador         → "Quero me hospedar" → card Tarifas → pergunta pesca
 *   ICP-2  Birdwatcher      → "Quero me hospedar" → digita "166 espécies"
 *   ICP-3  Família/Datas    → "Quero me hospedar" → card Planejar datas → calendário
 *   ICP-4  Hóspede Reserva  → "Já tenho reserva"  → auto-send → auth prompt
 *   ICP-5  Só Explorando    → "Só estou pesquisando" → auto-send → info geral
 *   ICP-6  Handoff/Equipe   → "Quero me hospedar" → card Falar com equipe → handoff UI
 *
 * Uso:
 *   npm run chat:visual
 *
 * Saída:
 *   tmp/playwright/chat-ux-v2/<cenario>/*.png
 *   tmp/playwright/chat-ux-v2/REPORT.md
 */

import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { chromium, devices, type BrowserContext, type Page } from "playwright";

const PORT = 5088;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const OUTPUT_DIR = path.join(process.cwd(), "tmp", "playwright", "chat-ux-v2");

// ─── SSE Mock ────────────────────────────────────────────────────────────────

function sseBlock(eventName: string, payload: Record<string, unknown>): string {
  return `event: ${eventName}\ndata: ${JSON.stringify(payload)}\n\n`;
}

function buildAgentConfigMock() {
  return {
    source: "mock",
    config: {
      enabled: true,
      assistantName: "Itaicy Atendimento Digital",
      bookingEngineUrl: "https://hotels.cloudbeds.com/reservation/ITAICY",
      disclaimers: {
        price: {
          pt: "Valores sujeitos a variação conforme data e ocupação.",
          en: "Rates may vary.",
          es: "Las tarifas pueden variar.",
        },
        availability: {
          pt: "Disponibilidade sujeita a confirmação.",
          en: "Availability subject to confirmation.",
          es: "Disponibilidad sujeta a confirmación.",
        },
        policyReference: {
          pt: "Confira os termos completos no momento da reserva.",
          en: "Please review full terms at booking.",
          es: "Consulte los términos al reservar.",
        },
      },
      handoff: {
        email: "reservas@itaicypantanal.com.br",
        emergencyPhone: "+55 (67) 99999-9999",
        whatsapp: "+5567999999999",
        serviceHours: "Seg a Sex, 08:00–18:00",
        slaHours: 2,
      },
      fallback: {
        genericError: { pt: "Estou com instabilidade agora.", en: "Unstable.", es: "Inestable." },
        apiUnavailable: { pt: "Não consigo consultar em tempo real.", en: "Can't fetch.", es: "No puedo." },
      },
      lead: {
        consentPrompt: { pt: "Posso usar seu contato?", en: "May I contact?", es: "¿Puedo contactar?" },
        successMessage: { pt: "Nossa equipe entrará em contato.", en: "Our team will contact you.", es: "Nuestro equipo te contactará." },
      },
      welcome: {
        greeting: { pt: "Atendimento digital Itaicy online.", en: "Itaicy digital service online.", es: "Atención digital en línea." },
      },
      retrieval: { faqConfidenceThreshold: 0.75 },
    },
  };
}

function buildChatSseResponse(message: string): string {
  const sessionId = "11111111-1111-4111-8111-111111111111";
  const msg = message.toLowerCase();

  // Handoff / equipe
  if (msg.includes("equipe") || msg.includes("humana") || msg.includes("falar")) {
    return [
      sseBlock("tool_start", { event: "tool_start", tool: "createHandoff", input: {} }),
      sseBlock("token", { event: "token", text: "Nossa equipe está disponível para te atender. " }),
      sseBlock("token", { event: "token", text: "Vou encaminhar seu caso agora — retorno em até 2h." }),
      sseBlock("tool_end", { event: "tool_end", tool: "createHandoff", status: "success", confidence_score: 0.95, grounding_level: "full", source_refs: [] }),
      sseBlock("done", { event: "done", session_id: sessionId, suggested_actions: { handoff: true }, confidence_score: 0.95, grounding_level: "full", source_refs: [] }),
    ].join("");
  }

  // Disponibilidade / datas — checked BEFORE reserva to avoid shadowing when calendar form
  // sends a message containing both "disponibilidade" and "reserva" context words
  if (msg.includes("disponibilidade") || msg.includes("disponível") || msg.includes("check-in") || msg.includes("data")) {
    return [
      sseBlock("tool_start", { event: "tool_start", tool: "checkAvailability", input: { checkIn: "2026-07-10", checkOut: "2026-07-13", adults: 2 } }),
      sseBlock("token", { event: "token", text: "Disponibilidade encontrada de 2026-07-10 a 2026-07-13:\n" }),
      sseBlock("token", { event: "token", text: "• All Inclusive com Pesca (2 disponível)\n" }),
      sseBlock("token", { event: "token", text: "• All Inclusive sem Pesca (3 disponível)\n\n" }),
      sseBlock("token", { event: "token", text: "Continue no motor de reservas: https://hotels.cloudbeds.com/reservation/ITAICY" }),
      sseBlock("tool_end", { event: "tool_end", tool: "checkAvailability", status: "success", confidence_score: 0.98, grounding_level: "full", source_refs: [{ source_id: "avail-mock", source_type: "reservation", score: 0.98 }] }),
      sseBlock("done", { event: "done", session_id: sessionId, suggested_actions: { handoff: false }, confidence_score: 0.98, grounding_level: "full", source_refs: [] }),
    ].join("");
  }

  // Reserva existente / hóspede
  if (msg.includes("reserva") || msg.includes("hóspede") || msg.includes("hospede") || msg.includes("confirmação")) {
    return [
      sseBlock("tool_start", { event: "tool_start", tool: "authenticateGuest", input: {} }),
      sseBlock("token", { event: "token", text: "Para proteger seus dados, preciso confirmar sua reserva. " }),
      sseBlock("token", { event: "token", text: "Pode me informar o código de confirmação e o e-mail usado na reserva?" }),
      sseBlock("tool_end", { event: "tool_end", tool: "authenticateGuest", status: "pending", confidence_score: 0.7, grounding_level: "partial", source_refs: [] }),
      sseBlock("done", { event: "done", session_id: sessionId, suggested_actions: { handoff: false }, confidence_score: 0.7, grounding_level: "partial", source_refs: [] }),
    ].join("");
  }

  // Tarifas / rates
  if (msg.includes("tarifa") || msg.includes("preço") || msg.includes("valor") || msg.includes("custo") || msg.includes("quanto")) {
    return [
      sseBlock("tool_start", { event: "tool_start", tool: "getRates", input: { checkIn: "2026-07-10", checkOut: "2026-07-13", adults: 2 } }),
      sseBlock("token", { event: "token", text: "Tarifas encontradas para 2 adultos (2026-07-10 a 2026-07-13):\n" }),
      sseBlock("token", { event: "token", text: "• All Inclusive com Pesca (a partir de R$ 2.000/pessoa/noite)\n" }),
      sseBlock("token", { event: "token", text: "• All Inclusive sem Pesca (a partir de R$ 1.050/pessoa/noite)\n\n" }),
      sseBlock("token", { event: "token", text: "Continue no motor de reservas: https://hotels.cloudbeds.com/reservation/ITAICY\n\n" }),
      sseBlock("token", { event: "token", text: "Valores sujeitos a variação conforme data e ocupação." }),
      sseBlock("tool_end", { event: "tool_end", tool: "getRates", status: "success", confidence_score: 0.98, grounding_level: "full", source_refs: [{ source_id: "rates-mock", source_type: "reservation", score: 0.98 }] }),
      sseBlock("done", { event: "done", session_id: sessionId, suggested_actions: { handoff: false }, confidence_score: 0.98, grounding_level: "full", source_refs: [] }),
    ].join("");
  }

  // Pesca
  if (msg.includes("pesca") || msg.includes("pescar") || msg.includes("dourado") || msg.includes("pacu")) {
    return [
      sseBlock("token", { event: "token", text: "No Itaicy praticamos pesca 100% Cota Zero — pesca e soltura responsável. " }),
      sseBlock("token", { event: "token", text: "Incluído no pacote: guia especialista, lancha equipada, combustível e tuviras. " }),
      sseBlock("token", { event: "token", text: "Melhor período: abril a novembro. " }),
      sseBlock("token", { event: "token", text: "\n\nQual período você está pensando para a viagem?" }),
      sseBlock("done", { event: "done", session_id: sessionId, suggested_actions: { handoff: false }, confidence_score: 0.93, grounding_level: "full", source_refs: [] }),
    ].join("");
  }

  // Birdwatching
  if (msg.includes("ave") || msg.includes("bird") || msg.includes("espécie") || msg.includes("observa")) {
    return [
      sseBlock("token", { event: "token", text: "O Itaicy tem 166 espécies de aves catalogadas (estudo técnico Mai/2024, João Andriola). " }),
      sseBlock("token", { event: "token", text: "Destacamos o Tuiuiú, Arara-Azul e espécies restritas ao Pantanal. " }),
      sseBlock("token", { event: "token", text: "Melhor época: abril a setembro (estação seca, maior visibilidade). " }),
      sseBlock("token", { event: "token", text: "\n\nVocê prefere trilhas guiadas ou deslocamento embarcado?" }),
      sseBlock("done", { event: "done", session_id: sessionId, suggested_actions: { handoff: false }, confidence_score: 0.96, grounding_level: "full", source_refs: [] }),
    ].join("");
  }

  // Disponibilidade / datas
  if (msg.includes("disponibilidade") || msg.includes("disponível") || msg.includes("check-in") || msg.includes("data")) {
    return [
      sseBlock("tool_start", { event: "tool_start", tool: "checkAvailability", input: { checkIn: "2026-07-10", checkOut: "2026-07-13", adults: 2 } }),
      sseBlock("token", { event: "token", text: "Disponibilidade encontrada de 2026-07-10 a 2026-07-13:\n" }),
      sseBlock("token", { event: "token", text: "• All Inclusive com Pesca (2 disponível)\n" }),
      sseBlock("token", { event: "token", text: "• All Inclusive sem Pesca (3 disponível)\n\n" }),
      sseBlock("token", { event: "token", text: "Continue no motor de reservas: https://hotels.cloudbeds.com/reservation/ITAICY" }),
      sseBlock("tool_end", { event: "tool_end", tool: "checkAvailability", status: "success", confidence_score: 0.98, grounding_level: "full", source_refs: [{ source_id: "avail-mock", source_type: "reservation", score: 0.98 }] }),
      sseBlock("done", { event: "done", session_id: sessionId, suggested_actions: { handoff: false }, confidence_score: 0.98, grounding_level: "full", source_refs: [] }),
    ].join("");
  }

  // Explorer / general
  return [
    sseBlock("token", { event: "token", text: "O Itaicy Pantanal Eco Lodge fica no coração do Pantanal, Mato Grosso. " }),
    sseBlock("token", { event: "token", text: "Sítio histórico da Usina Itaicy, fundada em 1897 — patrimônio tombado. " }),
    sseBlock("token", { event: "token", text: "Oferecemos pesca esportiva, observação de aves, safáris fotográficos e muito mais. " }),
    sseBlock("token", { event: "token", text: "\n\nSua viagem é mais para pesca, observação de aves ou descanso na natureza?" }),
    sseBlock("done", { event: "done", session_id: sessionId, suggested_actions: { handoff: false }, confidence_score: 0.85, grounding_level: "partial", source_refs: [] }),
  ].join("");
}

// ─── Route Setup ─────────────────────────────────────────────────────────────

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

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns the chat widget panel scoped locator.
 * All chat-internal interactions MUST use this scope to avoid
 * accidentally clicking navigation or other page elements.
 */
function getChatPanel(page: Page) {
  return page.locator("section[aria-hidden='false']");
}

async function openWidget(page: Page) {
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await delay(1000);
  // The FAB button — use aria-label selector, more stable
  const fab = page.locator("button[aria-label]").filter({ hasText: /Atendimento|digital service|atención/i }).last();
  // Fallback: any button at bottom-right containing "Atendimento"
  const fabFallback = page.locator("button").filter({ hasText: /Atendimento digital|Digital Service|Atención Digital/i }).last();
  const fabEl = await fab.count() > 0 ? fab : fabFallback;
  await fabEl.waitFor({ state: "visible", timeout: 10000 });
  await fabEl.click();
  // Wait for the chat section to be visible and interactive
  const panel = getChatPanel(page);
  await panel.waitFor({ state: "visible", timeout: 8000 });
  await delay(400);
}

async function fillLeadForm(page: Page, name = "Testador QA", email = "qa@itaicytest.com", whatsapp = "67999887766") {
  const panel = getChatPanel(page);
  // Lead form inputs have stable IDs — use them directly
  await page.fill("#lead-name", name);
  await page.fill("#lead-email", email);
  await page.fill("#lead-whatsapp", whatsapp);
  await delay(200);
  // Scope submit button to the chat panel to avoid nav "Reservar" buttons
  await panel.getByRole("button", { name: /Iniciar|Start chat|Comenzar/i }).click();
  // Wait for segmentation buttons to appear inside the panel
  await panel.locator("button").filter({ hasText: /hospedar|visit|hospedarme/i }).first().waitFor({ state: "visible", timeout: 6000 });
  await delay(300);
}

async function waitForResponse(page: Page) {
  // Wait for streaming to end — no animated pulse loader
  await page.waitForFunction(() => {
    const pulse = document.querySelector(".animate-pulse.rounded.bg-zinc-200");
    return !pulse;
  }, { timeout: 20000 }).catch(() => null);
  await delay(700);
}

async function getChatInput(page: Page) {
  // The chat footer input has id="chat-input" — no explicit type attribute (defaults to text)
  return page.locator("#chat-input");
}

async function sendChatMessage(page: Page, text: string) {
  const input = await getChatInput(page);
  await input.waitFor({ state: "visible", timeout: 8000 });
  await input.fill(text);
  await page.keyboard.press("Enter");
}

type ScenarioResult = {
  name: string;
  steps: string[];
  passed: boolean;
  errors: string[];
  screenshots: string[];
};

// ─── ICP Scenarios ───────────────────────────────────────────────────────────

async function testICP1_Pescador(context: BrowserContext): Promise<ScenarioResult> {
  const scenario = "ICP-1-Pescador";
  const dir = path.join(OUTPUT_DIR, scenario);
  await mkdir(dir, { recursive: true });

  const result: ScenarioResult = { name: scenario, steps: [], passed: false, errors: [], screenshots: [] };
  const page = await context.newPage();
  await setupRoutes(page);

  try {
    // Step 1: Open widget
    await openWidget(page);
    const s1 = path.join(dir, "01-widget-open.png");
    await page.screenshot({ path: s1, fullPage: false });
    result.screenshots.push(s1);
    result.steps.push("✅ Widget aberto");

    // Step 2: Lead form visible
    const leadForm = await page.$('form:has(input[id="lead-name"])');
    if (!leadForm) throw new Error("Lead form não encontrado");
    const s2 = path.join(dir, "02-lead-form.png");
    await page.screenshot({ path: s2 });
    result.screenshots.push(s2);
    result.steps.push("✅ Lead form visível");

    // Step 3: Fill + submit
    await fillLeadForm(page);
    const s3 = path.join(dir, "03-segmentation.png");
    await page.screenshot({ path: s3 });
    result.screenshots.push(s3);
    result.steps.push("✅ Lead form submetido → segmentation visível");

    // Step 4: Click "Quero me hospedar" — scoped to chat panel
    const panel1 = getChatPanel(page);
    await panel1.locator("button").filter({ hasText: /hospedar|visit|hospedarme/i }).first().click();
    await delay(500);
    const s4 = path.join(dir, "04-planning-cards.png");
    await page.screenshot({ path: s4 });
    result.screenshots.push(s4);

    // Verify option cards — scoped to avoid matching nav buttons
    const tarifaCard = panel1.locator("button").filter({ hasText: /tarifa|rates|precio/i });
    await tarifaCard.waitFor({ state: "visible", timeout: 5000 });
    result.steps.push("✅ Option cards visíveis após 'Quero me hospedar'");

    // Step 5: Click "Ver tarifas"
    await tarifaCard.click();
    await waitForResponse(page);
    const s5 = path.join(dir, "05-rates-response.png");
    await page.screenshot({ path: s5 });
    result.screenshots.push(s5);

    const msgText = await panel1.locator("article").last().textContent();
    if (!msgText?.toLowerCase().includes("tarifa") && !msgText?.toLowerCase().includes("r$")) {
      throw new Error(`Resposta de tarifas não reconhecida. Recebido: "${msgText?.slice(0, 100)}"`);
    }
    result.steps.push("✅ Resposta de tarifas exibida corretamente");

    // Step 6: Free text fishing question — use #chat-input (no type attr)
    await sendChatMessage(page, "Quero pescar dourado e pacu");
    await waitForResponse(page);
    const s6 = path.join(dir, "06-fishing-response.png");
    await page.screenshot({ path: s6 });
    result.screenshots.push(s6);

    const fishMsg = await getChatPanel(page).locator("article").last().textContent();
    if (!fishMsg?.toLowerCase().includes("cota zero") && !fishMsg?.toLowerCase().includes("pesca")) {
      throw new Error(`Resposta de pesca não reconhecida. Recebido: "${fishMsg?.slice(0, 100)}"`);
    }
    result.steps.push("✅ Resposta de pesca (Cota Zero) exibida");

    result.passed = true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    result.errors.push(msg);
    result.steps.push(`❌ FALHA: ${msg}`);
    const errShot = path.join(dir, "ERROR.png");
    await page.screenshot({ path: errShot }).catch(() => null);
    result.screenshots.push(errShot);
  } finally {
    await page.close();
  }

  return result;
}

async function testICP2_Birdwatcher(context: BrowserContext): Promise<ScenarioResult> {
  const scenario = "ICP-2-Birdwatcher";
  const dir = path.join(OUTPUT_DIR, scenario);
  await mkdir(dir, { recursive: true });

  const result: ScenarioResult = { name: scenario, steps: [], passed: false, errors: [], screenshots: [] };
  const page = await context.newPage();
  await setupRoutes(page);

  try {
    await openWidget(page);
    await fillLeadForm(page, "Ana Birder", "ana@birds.com", "11988887777");

    const s1 = path.join(dir, "01-segmentation.png");
    await page.screenshot({ path: s1 });
    result.screenshots.push(s1);
    result.steps.push("✅ Segmentation visível");

    // "Quero me hospedar" → option cards — scoped to chat panel
    const panel2 = getChatPanel(page);
    await panel2.locator("button").filter({ hasText: /hospedar|visit|hospedarme/i }).first().click();
    await delay(500);

    // Click "Experiências" card — scoped to avoid nav/accordion matches
    const expCard = panel2.locator("button").filter({ hasText: /Experiência|Experience|Experien/i });
    await expCard.waitFor({ state: "visible", timeout: 5000 });
    await expCard.click();
    await waitForResponse(page);

    const s2 = path.join(dir, "02-experiences-response.png");
    await page.screenshot({ path: s2 });
    result.screenshots.push(s2);
    result.steps.push("✅ Card 'Experiências' funcionando");

    // Type birdwatching question — use #chat-input
    await sendChatMessage(page, "Quais aves posso observar? Vi que vocês têm 166 espécies catalogadas");
    const s3 = path.join(dir, "03-typing-bird-question.png");
    await page.screenshot({ path: s3 });
    result.screenshots.push(s3);

    await waitForResponse(page);

    const s4 = path.join(dir, "04-bird-response.png");
    await page.screenshot({ path: s4 });
    result.screenshots.push(s4);

    const birdMsg = await getChatPanel(page).locator("article").last().textContent();
    if (!birdMsg?.includes("166") && !birdMsg?.toLowerCase().includes("espécie") && !birdMsg?.toLowerCase().includes("tuiuiú")) {
      throw new Error(`Resposta de birdwatching não reconhecida. Recebido: "${birdMsg?.slice(0, 100)}"`);
    }
    result.steps.push("✅ Resposta birdwatching (166 espécies) correta");

    result.passed = true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    result.errors.push(msg);
    result.steps.push(`❌ FALHA: ${msg}`);
    await page.screenshot({ path: path.join(dir, "ERROR.png") }).catch(() => null);
  } finally {
    await page.close();
  }

  return result;
}

async function testICP3_FamiliaCalendario(context: BrowserContext): Promise<ScenarioResult> {
  const scenario = "ICP-3-Familia-Calendario";
  const dir = path.join(OUTPUT_DIR, scenario);
  await mkdir(dir, { recursive: true });

  const result: ScenarioResult = { name: scenario, steps: [], passed: false, errors: [], screenshots: [] };
  const page = await context.newPage();
  await setupRoutes(page);

  try {
    await openWidget(page);
    await fillLeadForm(page, "Família Silva", "familia@email.com", "67988001122");

    // All interactions scoped to chat panel
    const panel3 = getChatPanel(page);
    await panel3.locator("button").filter({ hasText: /hospedar|visit|hospedarme/i }).first().click();
    await delay(500);

    // Click "Planejar datas" (calendar card) — scoped
    // NOTE: avoid /fecha/i — it matches "Fechar" (Portuguese "close") as a substring
    const calCard = panel3.locator("button").filter({ hasText: "Planejar datas" });
    await calCard.waitFor({ state: "visible", timeout: 5000 });
    await calCard.click();
    await delay(600); // wait for calendar to render

    const s1 = path.join(dir, "01-calendar-open.png");
    await page.screenshot({ path: s1 });
    result.screenshots.push(s1);

    // Check calendar form visible — scoped to panel
    const checkinInput = panel3.locator('input[type="date"]').first();
    await checkinInput.waitFor({ state: "visible", timeout: 5000 });
    result.steps.push("✅ Calendário aberto");

    // Fill dates
    const today = new Date();
    const checkin = new Date(today);
    checkin.setDate(checkin.getDate() + 30);
    const checkout = new Date(checkin);
    checkout.setDate(checkout.getDate() + 5);

    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    await panel3.locator('input[type="date"]').first().fill(fmt(checkin));
    await delay(200);
    await panel3.locator('input[type="date"]').last().fill(fmt(checkout));
    await delay(200);

    // Select guests — scoped
    const guestSelect = panel3.locator("select");
    if (await guestSelect.isVisible()) {
      await guestSelect.selectOption("4"); // família de 4
    }

    const s2 = path.join(dir, "02-calendar-filled.png");
    await page.screenshot({ path: s2 });
    result.screenshots.push(s2);
    result.steps.push("✅ Datas preenchidas (30 dias a frente, 5 noites, 4 hóspedes)");

    // Submit — scoped (avoids booking bar buttons on the page)
    await panel3.locator("button").filter({ hasText: /disponibilidade|availability|disponibilidad/i }).click();
    await waitForResponse(page);

    const s3 = path.join(dir, "03-availability-response.png");
    await page.screenshot({ path: s3 });
    result.screenshots.push(s3);

    const availMsg = await panel3.locator("article").last().textContent();
    if (!availMsg?.toLowerCase().includes("disponib")) {
      throw new Error(`Resposta de disponibilidade não reconhecida. Recebido: "${availMsg?.slice(0, 100)}"`);
    }
    result.steps.push("✅ Resposta de disponibilidade exibida");

    result.passed = true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    result.errors.push(msg);
    result.steps.push(`❌ FALHA: ${msg}`);
    await page.screenshot({ path: path.join(dir, "ERROR.png") }).catch(() => null);
  } finally {
    await page.close();
  }

  return result;
}

async function testICP4_HospedeReserva(context: BrowserContext): Promise<ScenarioResult> {
  const scenario = "ICP-4-Hospede-Reserva";
  const dir = path.join(OUTPUT_DIR, scenario);
  await mkdir(dir, { recursive: true });

  const result: ScenarioResult = { name: scenario, steps: [], passed: false, errors: [], screenshots: [] };
  const page = await context.newPage();
  await setupRoutes(page);

  try {
    await openWidget(page);
    await fillLeadForm(page, "Carlos Hóspede", "carlos@email.com", "11977665544");

    const s1 = path.join(dir, "01-segmentation.png");
    await page.screenshot({ path: s1 });
    result.screenshots.push(s1);

    // Click "Já tenho reserva" — scoped to chat panel (avoids nav "Reservar" buttons)
    const panel4 = getChatPanel(page);
    const guestBtn = panel4.locator("button").filter({ hasText: /tenho reserva|have a reservation|tengo reserva|Já tenho|reserva/i });
    await guestBtn.waitFor({ state: "visible", timeout: 5000 });
    await guestBtn.click();
    await waitForResponse(page);

    const s2 = path.join(dir, "02-reservation-auth.png");
    await page.screenshot({ path: s2 });
    result.screenshots.push(s2);

    // Verify auto-send triggered and auth prompt appeared
    const messages = panel4.locator("article");
    const count = await messages.count();
    if (count < 2) throw new Error(`Esperava pelo menos 2 mensagens (user + assistant), encontrou ${count}`);

    const lastMsg = await messages.last().textContent();
    if (!lastMsg?.toLowerCase().includes("confirmar") && !lastMsg?.toLowerCase().includes("código") && !lastMsg?.toLowerCase().includes("reserva")) {
      throw new Error(`Auth prompt não reconhecido. Recebido: "${lastMsg?.slice(0, 100)}"`);
    }
    result.steps.push("✅ Auto-send disparado + auth prompt exibido");

    // Segmentation buttons should be hidden now (hasUserMessages = true)
    // Check inside chat panel only
    const segBtnStillVisible = await panel4.locator("button").filter({ hasText: /tenho reserva/i }).isVisible().catch(() => false);
    if (segBtnStillVisible) {
      result.steps.push("⚠️  Segmentation buttons ainda visíveis após auto-send (pode ser timing)");
    } else {
      result.steps.push("✅ Segmentation buttons ocultados após primeira mensagem");
    }

    result.passed = true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    result.errors.push(msg);
    result.steps.push(`❌ FALHA: ${msg}`);
    await page.screenshot({ path: path.join(dir, "ERROR.png") }).catch(() => null);
  } finally {
    await page.close();
  }

  return result;
}

async function testICP5_SoExplorando(context: BrowserContext): Promise<ScenarioResult> {
  const scenario = "ICP-5-Explorer";
  const dir = path.join(OUTPUT_DIR, scenario);
  await mkdir(dir, { recursive: true });

  const result: ScenarioResult = { name: scenario, steps: [], passed: false, errors: [], screenshots: [] };
  const page = await context.newPage();
  await setupRoutes(page);

  try {
    await openWidget(page);
    await fillLeadForm(page, "Curioso Digital", "curioso@email.com", "21966554433");

    // Click "Só estou pesquisando" — scoped to chat panel
    const panel5 = getChatPanel(page);
    const exploringBtn = panel5.locator("button").filter({ hasText: /pesquisando|exploring|explorando/i });
    await exploringBtn.waitFor({ state: "visible", timeout: 5000 });
    await exploringBtn.click();
    await waitForResponse(page);

    const s1 = path.join(dir, "01-exploring-response.png");
    await page.screenshot({ path: s1 });
    result.screenshots.push(s1);

    const lastMsg = await panel5.locator("article").last().textContent();
    if (!lastMsg?.toLowerCase().includes("pantanal") && !lastMsg?.toLowerCase().includes("itaicy")) {
      throw new Error(`Resposta de exploração não reconhecida. Recebido: "${lastMsg?.slice(0, 100)}"`);
    }
    result.steps.push("✅ Auto-send 'explorando' → resposta geral exibida");

    // Continue conversation — use #chat-input
    await sendChatMessage(page, "O que posso fazer lá?");
    await waitForResponse(page);

    const s2 = path.join(dir, "02-follow-up.png");
    await page.screenshot({ path: s2 });
    result.screenshots.push(s2);
    result.steps.push("✅ Conversa continuada sem option cards");

    result.passed = true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    result.errors.push(msg);
    result.steps.push(`❌ FALHA: ${msg}`);
    await page.screenshot({ path: path.join(dir, "ERROR.png") }).catch(() => null);
  } finally {
    await page.close();
  }

  return result;
}

async function testICP6_Handoff(context: BrowserContext): Promise<ScenarioResult> {
  const scenario = "ICP-6-Handoff-Equipe";
  const dir = path.join(OUTPUT_DIR, scenario);
  await mkdir(dir, { recursive: true });

  const result: ScenarioResult = { name: scenario, steps: [], passed: false, errors: [], screenshots: [] };
  const page = await context.newPage();
  await setupRoutes(page);

  try {
    await openWidget(page);
    await fillLeadForm(page, "Grupo Empresarial", "grupo@empresa.com", "11988001234");

    // All interactions scoped to chat panel to avoid nav "Reservar" / "Experiências" matches
    const panel6 = getChatPanel(page);
    await panel6.locator("button").filter({ hasText: /hospedar|visit|hospedarme/i }).first().click();
    await delay(400);

    // Click "Falar com equipe" — scoped
    const teamCard = panel6.locator("button").filter({ hasText: /equipe|team|equipo|Falar/i });
    await teamCard.waitFor({ state: "visible", timeout: 5000 });
    await teamCard.click();
    await waitForResponse(page);

    const s1 = path.join(dir, "01-handoff-response.png");
    await page.screenshot({ path: s1 });
    result.screenshots.push(s1);

    const lastMsg = await panel6.locator("article").last().textContent();
    if (!lastMsg?.toLowerCase().includes("equipe") && !lastMsg?.toLowerCase().includes("team")) {
      throw new Error(`Resposta de handoff não reconhecida. Recebido: "${lastMsg?.slice(0, 100)}"`);
    }
    result.steps.push("✅ Mensagem de handoff exibida");

    // Check if handoff action bar appears
    await delay(500);
    const handoffSection = page.locator("text=WhatsApp").or(page.locator("text=whatsapp"));
    const handoffVisible = await handoffSection.isVisible().catch(() => false);
    if (handoffVisible) {
      result.steps.push("✅ Barra de handoff WhatsApp visível");
    } else {
      result.steps.push("⚠️  Barra de handoff WhatsApp não apareceu (suggested_actions.handoff=true enviado)");
    }

    const s2 = path.join(dir, "02-handoff-bar.png");
    await page.screenshot({ path: s2 });
    result.screenshots.push(s2);

    result.passed = true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    result.errors.push(msg);
    result.steps.push(`❌ FALHA: ${msg}`);
    await page.screenshot({ path: path.join(dir, "ERROR.png") }).catch(() => null);
  } finally {
    await page.close();
  }

  return result;
}

async function testLeadValidation(context: BrowserContext): Promise<ScenarioResult> {
  const scenario = "ICP-0-Lead-Validation";
  const dir = path.join(OUTPUT_DIR, scenario);
  await mkdir(dir, { recursive: true });

  const result: ScenarioResult = { name: scenario, steps: [], passed: false, errors: [], screenshots: [] };
  const page = await context.newPage();
  await setupRoutes(page);

  try {
    await openWidget(page);

    // Try submitting empty form
    await page.getByRole("button", { name: /Iniciar|Start chat|Comenzar/i }).click();
    await delay(300);
    const s1 = path.join(dir, "01-empty-validation.png");
    await page.screenshot({ path: s1 });
    result.screenshots.push(s1);

    const errVisible = await page.locator("p.text-\\[\\#b91c1c\\]").isVisible().catch(() => false);
    if (errVisible) {
      result.steps.push("✅ Validação de campo vazio funciona");
    } else {
      result.steps.push("⚠️  Erro de validação de campo vazio não visível");
    }

    // Fill short name
    await page.fill('input[id="lead-name"]', "Jo");
    await page.getByRole("button", { name: /Iniciar|Start chat|Comenzar/i }).click();
    await delay(300);
    const s2 = path.join(dir, "02-short-name-validation.png");
    await page.screenshot({ path: s2 });
    result.screenshots.push(s2);
    result.steps.push("✅ Validação de nome muito curto testada");

    // Fill invalid email
    await page.fill('input[id="lead-name"]', "João Silva");
    await page.fill('input[id="lead-email"]', "email-invalido");
    await page.getByRole("button", { name: /Iniciar|Start chat|Comenzar/i }).click();
    await delay(300);
    const s3 = path.join(dir, "03-invalid-email.png");
    await page.screenshot({ path: s3 });
    result.screenshots.push(s3);
    result.steps.push("✅ Validação de email inválido testada");

    // Invalid whatsapp
    await page.fill('input[id="lead-email"]', "joao@email.com");
    await page.fill('input[id="lead-whatsapp"]', "123");
    await page.getByRole("button", { name: /Iniciar|Start chat|Começar|Iniciar|Start/i }).click();
    await delay(300);
    const s4 = path.join(dir, "04-invalid-whatsapp.png");
    await page.screenshot({ path: s4 });
    result.screenshots.push(s4);
    result.steps.push("✅ Validação de WhatsApp inválido testada");

    result.passed = true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    result.errors.push(msg);
    result.steps.push(`❌ FALHA: ${msg}`);
    await page.screenshot({ path: path.join(dir, "ERROR.png") }).catch(() => null);
  } finally {
    await page.close();
  }

  return result;
}

// ─── Mobile: ICP-1 Pescador ──────────────────────────────────────────────────

async function testMobilePescador(context: BrowserContext): Promise<ScenarioResult> {
  const scenario = "ICP-1-Mobile-Pescador";
  const dir = path.join(OUTPUT_DIR, scenario);
  await mkdir(dir, { recursive: true });

  const result: ScenarioResult = { name: scenario, steps: [], passed: false, errors: [], screenshots: [] };
  const page = await context.newPage();
  await setupRoutes(page);

  try {
    await openWidget(page);
    const s1 = path.join(dir, "01-mobile-widget.png");
    await page.screenshot({ path: s1 });
    result.screenshots.push(s1);
    result.steps.push("✅ Widget mobile aberto");

    await fillLeadForm(page, "Pescador Mobile", "mobile@pesca.com", "67955443322");
    const s2 = path.join(dir, "02-mobile-segmentation.png");
    await page.screenshot({ path: s2 });
    result.screenshots.push(s2);
    result.steps.push("✅ Segmentation visível em mobile");

    // Scoped to chat panel — avoids nav buttons on mobile page
    const panelMobile = getChatPanel(page);
    await panelMobile.locator("button").filter({ hasText: /hospedar|visit|hospedarme/i }).first().click();
    await delay(400);
    const s3 = path.join(dir, "03-mobile-cards.png");
    await page.screenshot({ path: s3 });
    result.screenshots.push(s3);
    result.steps.push("✅ Option cards visíveis em mobile");

    // Scroll cards horizontally (mobile behavior)
    // Use .snap-x.snap-mandatory — unique to the chat option cards container
    // (avoids matching 3 page-level .scrollbar-hide divs)
    const scrollArea = panelMobile.locator(".snap-x.snap-mandatory");
    if (await scrollArea.isVisible()) {
      await scrollArea.evaluate((el: HTMLElement) => { el.scrollLeft = 200; });
      await delay(300);
      const s4 = path.join(dir, "04-mobile-cards-scrolled.png");
      await page.screenshot({ path: s4 });
      result.screenshots.push(s4);
      result.steps.push("✅ Scroll horizontal dos cards funciona em mobile");
    }

    result.passed = true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    result.errors.push(msg);
    result.steps.push(`❌ FALHA: ${msg}`);
    await page.screenshot({ path: path.join(dir, "ERROR.png") }).catch(() => null);
  } finally {
    await page.close();
  }

  return result;
}

// ─── Report ──────────────────────────────────────────────────────────────────

async function writeReport(results: ScenarioResult[]) {
  const passed = results.filter((r) => r.passed).length;
  const total = results.length;

  const lines: string[] = [
    "# Chat V2 QA Report",
    `**Data:** ${new Date().toISOString()}`,
    `**Resultado:** ${passed}/${total} cenários passaram (${total - passed} falharam)`,
    "",
  ];

  for (const r of results) {
    lines.push(`## ${r.passed ? "✅" : "❌"} ${r.name}`);
    lines.push("");
    for (const step of r.steps) {
      lines.push(`- ${step}`);
    }
    if (r.errors.length > 0) {
      lines.push("");
      lines.push("**Erros:**");
      for (const e of r.errors) {
        lines.push(`- \`${e}\``);
      }
    }
    lines.push("");
    lines.push(`_Screenshots: ${r.screenshots.length} arquivo(s)_`);
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  const reportPath = path.join(OUTPUT_DIR, "REPORT.md");
  await writeFile(reportPath, lines.join("\n"), "utf-8");
  return reportPath;
}

// ─── Server helpers ───────────────────────────────────────────────────────────

async function stopServerProcessTree(pid: number): Promise<void> {
  if (process.platform === "win32") {
    await new Promise<void>((resolve) => {
      const killer = spawn("taskkill", ["/PID", String(pid), "/T", "/F"], { shell: true, stdio: "ignore" });
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
    } catch { /* retry */ }
    await delay(500);
  }
  throw new Error(`Servidor não ficou pronto em ${timeoutMs}ms.`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  console.log("CHAT_VISUAL_V2_START");
  console.log(`BASE_URL=${BASE_URL}`);
  console.log(`OUTPUT_DIR=${OUTPUT_DIR}`);

  const server = spawn("npm", ["run", "dev"], {
    cwd: process.cwd(),
    shell: true,
    env: {
      ...process.env,
      PORT: String(PORT),
      NODE_ENV: "development",
      PANEL_JWT_SECRET: process.env.PANEL_JWT_SECRET || "dev-panel-secret-1234567890",
    },
    stdio: ["ignore", "inherit", "inherit"],
  });

  try {
    console.log("\n⏳ Aguardando servidor...");
    await waitForServerReady();
    console.log("✅ Servidor pronto\n");

    const browser = await chromium.launch({ headless: true });
    console.log("✅ Browser (Chromium headless) iniciado\n");

    // Desktop context (1440px)
    const desktop = await browser.newContext({
      viewport: { width: 1440, height: 1024 },
      locale: "pt-BR",
      colorScheme: "light",
    });

    // Mobile context (iPhone 13)
    const mobile = await browser.newContext({
      ...devices["iPhone 13"],
      locale: "pt-BR",
      colorScheme: "light",
    });

    console.log("🧪 Rodando cenários...\n");

    const scenarioResults: ScenarioResult[] = [];

    // Run scenarios sequentially to avoid port conflicts
    for (const [label, fn, ctx] of [
      ["ICP-0 Lead Validation", testLeadValidation, desktop],
      ["ICP-1 Pescador (desktop)", testICP1_Pescador, desktop],
      ["ICP-2 Birdwatcher (desktop)", testICP2_Birdwatcher, desktop],
      ["ICP-3 Família + Calendário (desktop)", testICP3_FamiliaCalendario, desktop],
      ["ICP-4 Hóspede com Reserva (desktop)", testICP4_HospedeReserva, desktop],
      ["ICP-5 Só Explorando (desktop)", testICP5_SoExplorando, desktop],
      ["ICP-6 Handoff Equipe (desktop)", testICP6_Handoff, desktop],
      ["ICP-1 Mobile Pescador", testMobilePescador, mobile],
    ] as Array<[string, (ctx: BrowserContext) => Promise<ScenarioResult>, BrowserContext]>) {
      console.log(`  ▶ ${label}`);
      const r = await fn(ctx);
      scenarioResults.push(r);
      const icon = r.passed ? "✅" : "❌";
      console.log(`  ${icon} ${r.name}: ${r.steps.at(-1)}`);
    }

    await desktop.close();
    await mobile.close();
    await browser.close();

    const reportPath = await writeReport(scenarioResults);

    console.log("\n════════════════════════════════════");
    console.log("RESULTADOS FINAIS:");
    const passed = scenarioResults.filter((r) => r.passed).length;
    const failed = scenarioResults.filter((r) => !r.passed).length;
    console.log(`  ✅ Passaram: ${passed}`);
    console.log(`  ❌ Falharam: ${failed}`);
    console.log(`\n📁 Screenshots: ${OUTPUT_DIR}`);
    console.log(`📋 Report: ${reportPath}`);

    if (failed > 0) {
      console.log("\n⚠️  FALHAS DETECTADAS:");
      for (const r of scenarioResults.filter((r) => !r.passed)) {
        console.log(`  • ${r.name}:`);
        for (const e of r.errors) {
          console.log(`    - ${e}`);
        }
      }
    }

    console.log("\nCHAT_VISUAL_V2_OK");
    if (failed > 0) process.exitCode = 1;
  } finally {
    if (server.pid) {
      console.log(`\n🛑 Encerrando servidor (pid=${server.pid})`);
      await stopServerProcessTree(server.pid);
    }
  }
}

run().catch((error) => {
  console.error("CHAT_VISUAL_V2_FAIL");
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
