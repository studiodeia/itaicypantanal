import { FormEvent, useState } from "react";
import { useLocation } from "wouter";
import { panelFetch, setPanelToken, type PanelUser } from "@/lib/panel-auth";

type LoginResponse = {
  status: "ok";
  token: string;
  user: PanelUser;
  expiresAt: string;
};

export function PanelLoginPage() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await panelFetch<LoginResponse>("/api/panel/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      setPanelToken(response.token);
      if (response.user.role === "admin" || response.user.role === "manager") {
        navigate("/painel/admin");
      } else {
        navigate("/painel");
      }
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "Falha no login.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f5f7] px-4 py-8">
      <div className="mx-auto mt-[10vh] w-full max-w-md rounded-3xl border border-black/10 bg-white p-7 shadow-[0_20px_60px_-30px_rgba(2,6,23,0.4)]">
        <div className="flex flex-col items-center gap-5 pb-2">
          <img
            src="/images/icons/footer-logo.svg"
            alt="Itaicy Pantanal Eco Lodge"
            className="h-10 w-auto"
          />
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">
              Painel Itaicy
            </h1>
            <p className="pt-1 text-sm text-[#6b7280]">
              Acesso administrativo e operacional com niveis de permissao.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <label className="block text-sm font-medium text-[#374151]">
            Usuario
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black/35"
              required
            />
          </label>

          <label className="block text-sm font-medium text-[#374151]">
            Senha
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              autoComplete="current-password"
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-black/35"
              required
            />
          </label>

          {error ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#111827] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar no painel"}
          </button>
        </form>
      </div>
    </main>
  );
}

