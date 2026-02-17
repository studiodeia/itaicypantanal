export type PanelRole = "admin" | "manager" | "user";

export type PanelUser = {
  id: string;
  username: string;
  displayName: string;
  role: PanelRole;
};

const PANEL_TOKEN_STORAGE_KEY = "itaicy_panel_token";

export function getPanelToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(PANEL_TOKEN_STORAGE_KEY);
}

export function setPanelToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PANEL_TOKEN_STORAGE_KEY, token);
}

export function clearPanelToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PANEL_TOKEN_STORAGE_KEY);
}

export async function panelFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getPanelToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });

  const text = await response.text();
  const payload = text.trim().length > 0 ? JSON.parse(text) : {};

  if (!response.ok) {
    const message =
      payload && typeof payload.message === "string"
        ? payload.message
        : `HTTP ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}

