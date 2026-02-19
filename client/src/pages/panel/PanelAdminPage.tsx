import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  clearPanelToken,
  getPanelToken,
  panelFetch,
  type PanelRole,
  type PanelUser,
} from "@/lib/panel-auth";

type AdminUser = {
  id: string;
  username: string;
  displayName: string;
  role: PanelRole;
  enabled: boolean;
};

type AdminUsersPayload = {
  users: AdminUser[];
};

type DashboardPayload = {
  generatedAt: string;
  user: PanelUser;
  metrics?: {
    totals?: {
      interactions?: number;
      success?: number;
      fallback?: number;
      error?: number;
    };
    rates?: {
      fallbackRate?: number;
      errorRate?: number;
    };
    unavailable?: boolean;
    message?: string;
  };
  cloudbeds?: {
    enabled: boolean;
    circuit: { isOpen: boolean; consecutiveFailures: number };
  };
};

type CreateUserPayload = {
  status: "ok";
  user: AdminUser;
};

type UpdateUserPayload = {
  status: "ok";
  user: AdminUser;
};

const roleOptions: Array<{ value: PanelRole; label: string }> = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "user", label: "Usuario" },
];

export function PanelAdminPage() {
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<PanelUser | null>(null);
  const [dashboard, setDashboard] = useState<DashboardPayload | null>(null);
  const [usersPayload, setUsersPayload] = useState<AdminUsersPayload | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    displayName: "",
    password: "",
    role: "user" as PanelRole,
  });

  const isAdmin = user?.role === "admin";

  async function loadAdminUsers() {
    if (!isAdmin) return;
    const users = await panelFetch<AdminUsersPayload>("/api/panel/admin/users");
    setUsersPayload(users);
  }

  useEffect(() => {
    if (!getPanelToken()) {
      navigate("/painel/login");
      return;
    }

    async function load() {
      try {
        const me = await panelFetch<{ user: PanelUser }>("/api/panel/auth/me");
        if (me.user.role !== "admin" && me.user.role !== "manager") {
          navigate("/painel");
          return;
        }

        const dash = await panelFetch<DashboardPayload>(
          "/api/panel/dashboard?metrics_window_hours=24",
        );

        setUser(me.user);
        setDashboard(dash);

        if (me.user.role === "admin") {
          const users = await panelFetch<AdminUsersPayload>("/api/panel/admin/users");
          setUsersPayload(users);
        }
      } catch (caughtError) {
        const message =
          caughtError instanceof Error
            ? caughtError.message
            : "Falha ao carregar painel administrativo.";
        if (message.toLowerCase().includes("nao autenticado")) {
          clearPanelToken();
          navigate("/painel/login");
          return;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [navigate]);

  async function logout() {
    try {
      await panelFetch("/api/panel/auth/logout", { method: "POST" });
    } catch {
      // noop
    } finally {
      clearPanelToken();
      navigate("/painel/login");
    }
  }

  async function handleCreateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isAdmin || formLoading) return;

    setFormLoading(true);
    setSaveMessage(null);
    setError(null);

    try {
      const payload = await panelFetch<CreateUserPayload>("/api/panel/admin/users", {
        method: "POST",
        body: JSON.stringify(newUser),
      });

      setUsersPayload((current) => ({
        users: [payload.user, ...(current?.users ?? [])],
      }));
      setNewUser({ username: "", displayName: "", password: "", role: "user" });
      setSaveMessage("Usuario criado com sucesso.");
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "Falha ao criar usuario.";
      setError(message);
    } finally {
      setFormLoading(false);
    }
  }

  async function handleToggleEnabled(target: AdminUser) {
    if (!isAdmin) return;

    setSaveMessage(null);
    setError(null);

    try {
      const payload = await panelFetch<UpdateUserPayload>(
        `/api/panel/admin/users/${target.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ enabled: !target.enabled }),
        },
      );

      setUsersPayload((current) => ({
        users:
          current?.users.map((item) => (item.id === target.id ? payload.user : item)) ?? [],
      }));
      setSaveMessage("Status do usuario atualizado.");
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "Falha ao atualizar usuario.";
      setError(message);
    }
  }

  async function handleRoleChange(target: AdminUser, role: PanelRole) {
    if (!isAdmin || target.role === role) return;

    setSaveMessage(null);
    setError(null);

    try {
      const payload = await panelFetch<UpdateUserPayload>(
        `/api/panel/admin/users/${target.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ role }),
        },
      );

      setUsersPayload((current) => ({
        users:
          current?.users.map((item) => (item.id === target.id ? payload.user : item)) ?? [],
      }));
      setSaveMessage("Perfil atualizado.");
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "Falha ao alterar nivel.";
      setError(message);
    }
  }

  async function handleResetPassword(target: AdminUser) {
    if (!isAdmin) return;

    const nextPassword = window.prompt(`Nova senha para ${target.username} (min. 8 caracteres):`);
    if (!nextPassword) return;

    setSaveMessage(null);
    setError(null);

    try {
      await panelFetch<UpdateUserPayload>(`/api/panel/admin/users/${target.id}/reset-password`, {
        method: "POST",
        body: JSON.stringify({ password: nextPassword }),
      });
      setSaveMessage("Senha redefinida com sucesso.");
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "Falha ao redefinir senha.";
      setError(message);
    }
  }

  const totals = useMemo(() => dashboard?.metrics?.totals, [dashboard]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f5f7] px-4 py-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-black/10 bg-white p-6">
          <p className="text-sm text-[#6b7280]">Carregando area administrativa...</p>
        </div>
      </main>
    );
  }

  if (error && !dashboard) {
    return (
      <main className="min-h-screen bg-[#f4f5f7] px-4 py-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-red-200 bg-white p-6">
          <p className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => navigate("/painel/login")}
            className="mt-4 rounded-lg border border-black/15 px-3 py-2 text-sm"
          >
            Voltar ao login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f5f7] px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-4">
        <header className="rounded-3xl border border-black/10 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <img
                src="/images/icons/footer-logo.svg"
                alt="Itaicy"
                className="h-8 w-auto"
              />
              <div>
                <h1 className="text-xl font-semibold text-[#111827]">Painel administrativo</h1>
                <p className="text-sm text-[#6b7280]">
                  {user?.displayName} ({user?.role})
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/painel"
                className="rounded-lg border border-black/15 px-3 py-2 text-sm font-medium text-[#111827]"
              >
                Area do usuario
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg bg-[#111827] px-3 py-2 text-sm font-medium text-white"
              >
                Sair
              </button>
            </div>
          </div>
        </header>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {saveMessage ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
            {saveMessage}
          </div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-black/10 bg-white p-4">
            <h2 className="text-sm font-semibold text-[#111827]">Interacoes (24h)</h2>
            <p className="pt-2 text-2xl font-semibold text-[#111827]">
              {totals?.interactions ?? "-"}
            </p>
            <p className="text-xs text-[#6b7280]">
              fallback: {totals?.fallback ?? 0} | erro: {totals?.error ?? 0}
            </p>
          </article>

          <article className="rounded-2xl border border-black/10 bg-white p-4">
            <h2 className="text-sm font-semibold text-[#111827]">Taxas</h2>
            <p className="pt-2 text-sm text-[#4b5563]">
              fallback: {dashboard?.metrics?.rates?.fallbackRate ?? "-"}
            </p>
            <p className="text-sm text-[#4b5563]">erro: {dashboard?.metrics?.rates?.errorRate ?? "-"}</p>
          </article>

          <article className="rounded-2xl border border-black/10 bg-white p-4">
            <h2 className="text-sm font-semibold text-[#111827]">Cloudbeds</h2>
            <p className="pt-2 text-sm text-[#4b5563]">
              ativo: {dashboard?.cloudbeds?.enabled ? "sim" : "nao"}
            </p>
            <p className="text-sm text-[#4b5563]">
              circuito aberto: {dashboard?.cloudbeds?.circuit?.isOpen ? "sim" : "nao"}
            </p>
          </article>
        </section>

        {isAdmin ? (
          <section className="space-y-4 rounded-2xl border border-black/10 bg-white p-4">
            <h2 className="text-sm font-semibold text-[#111827]">Gestao de usuarios</h2>

            <form onSubmit={handleCreateUser} className="grid gap-2 md:grid-cols-5">
              <input
                value={newUser.username}
                onChange={(event) =>
                  setNewUser((current) => ({
                    ...current,
                    username: event.target.value,
                  }))
                }
                placeholder="username"
                className="rounded-lg border border-black/15 px-3 py-2 text-sm"
                required
              />
              <input
                value={newUser.displayName}
                onChange={(event) =>
                  setNewUser((current) => ({
                    ...current,
                    displayName: event.target.value,
                  }))
                }
                placeholder="nome de exibicao"
                className="rounded-lg border border-black/15 px-3 py-2 text-sm"
                required
              />
              <input
                value={newUser.password}
                onChange={(event) =>
                  setNewUser((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                type="password"
                placeholder="senha (min 8)"
                className="rounded-lg border border-black/15 px-3 py-2 text-sm"
                required
                minLength={8}
              />
              <select
                value={newUser.role}
                onChange={(event) =>
                  setNewUser((current) => ({
                    ...current,
                    role: event.target.value as PanelRole,
                  }))
                }
                className="rounded-lg border border-black/15 px-3 py-2 text-sm"
              >
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={formLoading}
                className="rounded-lg bg-[#111827] px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
              >
                {formLoading ? "Salvando..." : "Criar usuario"}
              </button>
            </form>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-black/10 text-left text-[#6b7280]">
                    <th className="px-2 py-2">Usuario</th>
                    <th className="px-2 py-2">Nome</th>
                    <th className="px-2 py-2">Nivel</th>
                    <th className="px-2 py-2">Status</th>
                    <th className="px-2 py-2">Acoes</th>
                  </tr>
                </thead>
                <tbody>
                  {(usersPayload?.users ?? []).map((item) => (
                    <tr key={item.id} className="border-b border-black/5">
                      <td className="px-2 py-2 font-medium">{item.username}</td>
                      <td className="px-2 py-2">{item.displayName}</td>
                      <td className="px-2 py-2">
                        <select
                          value={item.role}
                          onChange={(event) =>
                            handleRoleChange(item, event.target.value as PanelRole)
                          }
                          className="rounded-md border border-black/15 px-2 py-1 text-xs"
                        >
                          {roleOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-2 py-2">
                        <span
                          className={
                            item.enabled
                              ? "rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700"
                              : "rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600"
                          }
                        >
                          {item.enabled ? "ativo" : "inativo"}
                        </span>
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex flex-wrap gap-1">
                          <button
                            type="button"
                            onClick={() => void handleToggleEnabled(item)}
                            className="rounded-md border border-black/15 px-2 py-1 text-xs"
                          >
                            {item.enabled ? "Desativar" : "Ativar"}
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleResetPassword(item)}
                            className="rounded-md border border-black/15 px-2 py-1 text-xs"
                          >
                            Redefinir senha
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => void loadAdminUsers()}
                className="rounded-lg border border-black/15 px-3 py-2 text-xs font-medium text-[#111827]"
              >
                Atualizar lista
              </button>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
