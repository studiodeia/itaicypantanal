import express from "express";
import { AddressInfo } from "node:net";
import { registerRoutes } from "../server/routes";

function safeJsonParse(text: string): any {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function request(baseUrl: string, path: string, init: RequestInit = {}) {
  const response = await fetch(`${baseUrl}${path}`, init);
  const text = await response.text();
  return {
    status: response.status,
    ok: response.ok,
    body: safeJsonParse(text),
    text,
  };
}

async function run() {
  process.env.NODE_ENV = "development";
  process.env.PANEL_JWT_SECRET = "dev-panel-secret-1234567890";
  process.env.PANEL_ACCOUNTS_JSON = JSON.stringify([
    {
      id: "admin-local",
      username: "admin",
      password: "admin123",
      role: "admin",
      displayName: "Admin Local",
      enabled: true,
    },
    {
      id: "manager-local",
      username: "gestor",
      password: "gestor123",
      role: "manager",
      displayName: "Gestor Local",
      enabled: true,
    },
    {
      id: "user-local",
      username: "operador",
      password: "operador123",
      role: "user",
      displayName: "Operador Local",
      enabled: true,
    },
  ]);

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const server = await registerRoutes(app);

  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve());
  });

  const port = (server.address() as AddressInfo).port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const adminLogin = await request(baseUrl, "/api/panel/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password: "admin123" }),
    });

    const managerLogin = await request(baseUrl, "/api/panel/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "gestor", password: "gestor123" }),
    });

    const userLogin = await request(baseUrl, "/api/panel/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "operador", password: "operador123" }),
    });

    if (!adminLogin.ok || !managerLogin.ok || !userLogin.ok) {
      throw new Error("Falha no login de um ou mais perfis.");
    }

    const adminToken = adminLogin.body?.token as string;
    const managerToken = managerLogin.body?.token as string;
    const userToken = userLogin.body?.token as string;

    const adminDashboard = await request(baseUrl, "/api/panel/dashboard?metrics_window_hours=24", {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const userDashboard = await request(baseUrl, "/api/panel/dashboard", {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    const adminUsers = await request(baseUrl, "/api/panel/admin/users", {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const managerUsers = await request(baseUrl, "/api/panel/admin/users", {
      headers: { Authorization: `Bearer ${managerToken}` },
    });

    const createUser = await request(baseUrl, "/api/panel/admin/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${adminToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "novo",
        displayName: "Novo Usuario",
        password: "novasenha123",
        role: "user",
      }),
    });

    console.log("PANEL_SMOKE_OK");
    console.log(`admin_login_status=${adminLogin.status}`);
    console.log(`manager_login_status=${managerLogin.status}`);
    console.log(`user_login_status=${userLogin.status}`);
    console.log(`admin_role=${adminDashboard.body?.user?.role ?? "n/a"}`);
    console.log(`user_role=${userDashboard.body?.user?.role ?? "n/a"}`);
    console.log(`admin_users_status=${adminUsers.status}`);
    console.log(`admin_users_count=${adminUsers.body?.users?.length ?? 0}`);
    console.log(`manager_admin_users_status=${managerUsers.status}`);
    console.log(`create_user_status=${createUser.status}`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

run().catch((error) => {
  console.error("PANEL_SMOKE_FAIL");
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
