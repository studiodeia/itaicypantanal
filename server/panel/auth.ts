import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { and, asc, eq } from "drizzle-orm";
import type { Request, Response } from "express";
import { z } from "zod";
import { panelUsers } from "../../shared/schema";
import { db, isDatabaseAvailable } from "../db";

export const panelRoleSchema = z.enum(["admin", "manager", "user"]);
export type PanelRole = z.infer<typeof panelRoleSchema>;

const panelAccountSchema = z.object({
  id: z.string().min(1).max(64).optional(),
  username: z.string().trim().min(3).max(64),
  password: z.string().min(1).max(256),
  role: panelRoleSchema.default("user"),
  displayName: z.string().trim().min(1).max(120).optional(),
  enabled: z.boolean().default(true),
});

type PanelAccount = z.infer<typeof panelAccountSchema>;

export type PanelSessionUser = {
  id: string;
  username: string;
  displayName: string;
  role: PanelRole;
};

type PanelTokenPayload = PanelSessionUser & {
  iat: number;
  exp: number;
};

const loginBodySchema = z.object({
  username: z.string().trim().min(3).max(64),
  password: z.string().min(1).max(256),
});

const createPanelUserSchema = z
  .object({
    username: z.string().trim().min(3).max(64),
    password: z.string().min(8).max(256),
    role: panelRoleSchema.default("user"),
    displayName: z.string().trim().min(1).max(120),
    enabled: z.boolean().default(true),
  })
  .strict();

const updatePanelUserSchema = z
  .object({
    username: z.string().trim().min(3).max(64).optional(),
    password: z.string().min(8).max(256).optional(),
    role: panelRoleSchema.optional(),
    displayName: z.string().trim().min(1).max(120).optional(),
    enabled: z.boolean().optional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, {
    message: "Nenhum campo para atualizar.",
  });

function normalizeUsername(value: string): string {
  return value.trim().toLowerCase();
}

function base64UrlEncode(raw: string): string {
  return Buffer.from(raw, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(raw: string): string {
  const padded = raw + "=".repeat((4 - (raw.length % 4 || 4)) % 4);
  const b64 = padded.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(b64, "base64").toString("utf8");
}

function safeEquals(a: string, b: string): boolean {
  const aHash = createHash("sha256").update(a).digest();
  const bHash = createHash("sha256").update(b).digest();
  return timingSafeEqual(aHash, bHash);
}

function parseAccountsFromEnv(): PanelAccount[] {
  const raw = process.env.PANEL_ACCOUNTS_JSON;

  if (!raw || raw.trim().length === 0) {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          id: "panel-admin",
          username: "admin",
          password: "admin123",
          role: "admin",
          displayName: "Administrador",
          enabled: true,
        },
        {
          id: "panel-user",
          username: "user",
          password: "user123",
          role: "user",
          displayName: "Usuario",
          enabled: true,
        },
      ];
    }
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    const arr = Array.isArray(parsed) ? parsed : [];
    return arr
      .map((entry, index) => {
        const validated = panelAccountSchema.parse(entry);
        return {
          ...validated,
          id: validated.id || `panel-account-${index + 1}`,
          username: normalizeUsername(validated.username),
          displayName: validated.displayName || validated.username,
        };
      })
      .filter((item) => item.enabled !== false);
  } catch {
    return [];
  }
}

function getPanelJwtSecret(): string {
  const envSecret = process.env.PANEL_JWT_SECRET;
  if (envSecret && envSecret.trim().length >= 16) return envSecret.trim();
  if (process.env.NODE_ENV === "development") return "dev-panel-secret-change-me";
  return "";
}

function getPanelTokenTtlSec(): number {
  const raw = Number.parseInt(process.env.PANEL_TOKEN_TTL_SEC || "28800", 10);
  if (!Number.isFinite(raw)) return 28_800;
  if (raw < 600) return 600;
  if (raw > 7 * 24 * 3600) return 7 * 24 * 3600;
  return raw;
}

function signToken(payload: PanelTokenPayload): string {
  const secret = getPanelJwtSecret();
  if (!secret) throw new Error("PANEL_JWT_SECRET is not configured.");

  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

function verifyToken(token: string): PanelSessionUser | null {
  const secret = getPanelJwtSecret();
  if (!secret) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [header, payload, signature] = parts;
  const expected = createHmac("sha256", secret)
    .update(`${header}.${payload}`)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  if (!safeEquals(signature, expected)) return null;

  try {
    const decoded = JSON.parse(base64UrlDecode(payload)) as PanelTokenPayload;
    const now = Math.floor(Date.now() / 1000);
    if (!decoded || typeof decoded.exp !== "number" || decoded.exp <= now) return null;
    if (!panelRoleSchema.safeParse(decoded.role).success) return null;
    return {
      id: decoded.id,
      username: decoded.username,
      displayName: decoded.displayName,
      role: decoded.role,
    };
  } catch {
    return null;
  }
}

function hashPanelPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const digest = scryptSync(password, salt, 32).toString("hex");
  return `scrypt:${salt}:${digest}`;
}

function isPasswordMatch(inputPassword: string, storedPassword: string): boolean {
  const normalizedStored = storedPassword.trim();

  if (normalizedStored.startsWith("scrypt:")) {
    const parts = normalizedStored.split(":");
    if (parts.length !== 3) return false;
    const [, salt, expectedHash] = parts;
    const inputHash = scryptSync(inputPassword, salt, 32).toString("hex");
    return safeEquals(inputHash, expectedHash);
  }

  if (normalizedStored.startsWith("sha256:")) {
    const expectedHash = normalizedStored.slice("sha256:".length);
    const inputHash = createHash("sha256").update(inputPassword).digest("hex");
    return safeEquals(inputHash, expectedHash);
  }

  return safeEquals(inputPassword, normalizedStored);
}

function getBearerToken(req: Request): string | null {
  const header = req.header("authorization");
  if (!header) return null;
  const [scheme, token] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;
  return token.trim();
}

function toSessionUser(account: {
  id: string;
  username: string;
  displayName: string;
  role: PanelRole;
}): PanelSessionUser {
  return {
    id: account.id,
    username: account.username,
    displayName: account.displayName,
    role: account.role,
  };
}

function isDbAvailable(): boolean {
  return isDatabaseAvailable() && db !== null;
}

async function listDbPanelUsers(includeDisabled = true) {
  if (!db || !isDbAvailable()) return [];

  const query = db
    .select({
      id: panelUsers.id,
      username: panelUsers.username,
      passwordHash: panelUsers.passwordHash,
      role: panelUsers.role,
      displayName: panelUsers.displayName,
      enabled: panelUsers.enabled,
    })
    .from(panelUsers)
    .orderBy(asc(panelUsers.username));

  const rows = includeDisabled ? await query : await query.where(eq(panelUsers.enabled, true));

  return rows.filter((row) => panelRoleSchema.safeParse(row.role).success) as Array<{
    id: string;
    username: string;
    passwordHash: string;
    role: PanelRole;
    displayName: string;
    enabled: boolean;
  }>;
}

async function findDbPanelUserByUsername(username: string) {
  if (!db || !isDbAvailable()) return null;

  const rows = await db
    .select({
      id: panelUsers.id,
      username: panelUsers.username,
      passwordHash: panelUsers.passwordHash,
      role: panelUsers.role,
      displayName: panelUsers.displayName,
      enabled: panelUsers.enabled,
    })
    .from(panelUsers)
    .where(
      and(eq(panelUsers.username, normalizeUsername(username)), eq(panelUsers.enabled, true)),
    )
    .limit(1);

  const row = rows[0];
  if (!row) return null;
  if (!panelRoleSchema.safeParse(row.role).success) return null;

  return {
    id: row.id,
    username: row.username,
    passwordHash: row.passwordHash,
    role: row.role as PanelRole,
    displayName: row.displayName,
    enabled: row.enabled,
  };
}

export async function getPanelAccountsPublic(): Promise<
  Array<{
    id: string;
    username: string;
    displayName: string;
    role: PanelRole;
    enabled: boolean;
  }>
> {
  const dbUsers = await listDbPanelUsers(true);

  if (dbUsers.length > 0) {
    return dbUsers.map((item) => ({
      id: item.id,
      username: item.username,
      displayName: item.displayName,
      role: item.role,
      enabled: item.enabled,
    }));
  }

  return parseAccountsFromEnv().map((account, index) => ({
    id: account.id || `panel-account-${index + 1}`,
    username: normalizeUsername(account.username),
    displayName: account.displayName || account.username,
    role: account.role,
    enabled: account.enabled !== false,
  }));
}

export function parsePanelLoginBody(body: unknown) {
  return loginBodySchema.safeParse(body);
}

export function parsePanelCreateUserBody(body: unknown) {
  return createPanelUserSchema.safeParse(body);
}

export function parsePanelUpdateUserBody(body: unknown) {
  return updatePanelUserSchema.safeParse(body);
}

export async function loginPanelUser(
  usernameInput: string,
  passwordInput: string,
): Promise<{ token: string; user: PanelSessionUser; expiresAt: string } | null> {
  const normalizedUsername = normalizeUsername(usernameInput);

  let dbAccount: Awaited<ReturnType<typeof findDbPanelUserByUsername>> = null;
  try {
    dbAccount = await findDbPanelUserByUsername(normalizedUsername);
  } catch (err) {
    console.error("[panel-auth] DB lookup failed, falling back to env accounts:", (err as Error).message);
  }
  if (dbAccount && isPasswordMatch(passwordInput, dbAccount.passwordHash)) {
    const nowSec = Math.floor(Date.now() / 1000);
    const ttl = getPanelTokenTtlSec();
    const payload: PanelTokenPayload = {
      ...toSessionUser({
        id: dbAccount.id,
        username: dbAccount.username,
        displayName: dbAccount.displayName,
        role: dbAccount.role,
      }),
      iat: nowSec,
      exp: nowSec + ttl,
    };

    return {
      token: signToken(payload),
      user: toSessionUser(payload),
      expiresAt: new Date(payload.exp * 1000).toISOString(),
    };
  }

  const accounts = parseAccountsFromEnv();
  const account = accounts.find(
    (item) => normalizeUsername(item.username) === normalizedUsername && item.enabled !== false,
  );
  if (!account) return null;
  if (!isPasswordMatch(passwordInput, account.password)) return null;

  const nowSec = Math.floor(Date.now() / 1000);
  const ttl = getPanelTokenTtlSec();
  const payload: PanelTokenPayload = {
    id: account.id || `panel-${normalizeUsername(account.username)}`,
    username: normalizeUsername(account.username),
    displayName: account.displayName || account.username,
    role: account.role,
    iat: nowSec,
    exp: nowSec + ttl,
  };

  return {
    token: signToken(payload),
    user: toSessionUser(payload),
    expiresAt: new Date(payload.exp * 1000).toISOString(),
  };
}

export async function createPanelUser(input: {
  username: string;
  password: string;
  role: PanelRole;
  displayName: string;
  enabled?: boolean;
}) {
  if (!db || !isDbAvailable()) {
    throw new Error("Database is unavailable for user management.");
  }

  const normalizedUsername = normalizeUsername(input.username);

  const existing = await db
    .select({ id: panelUsers.id })
    .from(panelUsers)
    .where(eq(panelUsers.username, normalizedUsername))
    .limit(1);

  if (existing.length > 0) {
    throw new Error("Ja existe um usuario com este username.");
  }

  const [created] = await db
    .insert(panelUsers)
    .values({
      username: normalizedUsername,
      passwordHash: hashPanelPassword(input.password),
      role: input.role,
      displayName: input.displayName,
      enabled: input.enabled ?? true,
      updatedAt: new Date(),
    })
    .returning({
      id: panelUsers.id,
      username: panelUsers.username,
      displayName: panelUsers.displayName,
      role: panelUsers.role,
      enabled: panelUsers.enabled,
    });

  return {
    id: created.id,
    username: created.username,
    displayName: created.displayName,
    role: created.role as PanelRole,
    enabled: created.enabled,
  };
}

export async function updatePanelUser(
  userId: string,
  input: {
    username?: string;
    password?: string;
    role?: PanelRole;
    displayName?: string;
    enabled?: boolean;
  },
) {
  if (!db || !isDbAvailable()) {
    throw new Error("Database is unavailable for user management.");
  }

  const patch: Partial<typeof panelUsers.$inferInsert> = {
    updatedAt: new Date(),
  };

  if (input.username !== undefined) {
    patch.username = normalizeUsername(input.username);
  }
  if (input.password !== undefined) {
    patch.passwordHash = hashPanelPassword(input.password);
  }
  if (input.role !== undefined) {
    patch.role = input.role;
  }
  if (input.displayName !== undefined) {
    patch.displayName = input.displayName;
  }
  if (input.enabled !== undefined) {
    patch.enabled = input.enabled;
  }

  const [updated] = await db
    .update(panelUsers)
    .set(patch)
    .where(eq(panelUsers.id, userId))
    .returning({
      id: panelUsers.id,
      username: panelUsers.username,
      displayName: panelUsers.displayName,
      role: panelUsers.role,
      enabled: panelUsers.enabled,
    });

  if (!updated) {
    throw new Error("Usuario nao encontrado.");
  }

  return {
    id: updated.id,
    username: updated.username,
    displayName: updated.displayName,
    role: updated.role as PanelRole,
    enabled: updated.enabled,
  };
}

export async function disablePanelUser(userId: string) {
  return updatePanelUser(userId, { enabled: false });
}

export function getPanelUserFromRequest(req: Request): PanelSessionUser | null {
  const token = getBearerToken(req);
  if (!token) return null;
  return verifyToken(token);
}

export function requirePanelUser(
  req: Request,
  res: Response,
  allowedRoles?: PanelRole[],
): PanelSessionUser | null {
  const user = getPanelUserFromRequest(req);
  if (!user) {
    res.status(401).json({ message: "Nao autenticado." });
    return null;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    res.status(403).json({ message: "Acesso negado para este perfil." });
    return null;
  }

  return user;
}
