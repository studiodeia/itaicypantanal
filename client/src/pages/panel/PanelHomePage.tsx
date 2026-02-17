import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  clearPanelToken,
  getPanelToken,
  panelFetch,
  type PanelUser,
} from "@/lib/panel-auth";

type DashboardPayload = {
  generatedAt: string;
  user: PanelUser;
  runtime?: Record<string, unknown>;
  cmsConfig?: {
    source: string;
    bookingEngineUrl: string;
    serviceHours: string;
    handoffEmail: string;
    handoffWhatsapp: string;
  } | null;
  cmsSource?: { source: string; generatedAt: string } | null;
  userArea?: { message: string };
};

export function PanelHomePage() {
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<PanelUser | null>(null);
  const [dashboard, setDashboard] = useState<DashboardPayload | null>(null);

  useEffect(() => {
    if (!getPanelToken()) {
      navigate("/painel/login");
      return;
    }

    async function load() {
      try {
        const me = await panelFetch<{ user: PanelUser }>("/api/panel/auth/me");
        const dash = await panelFetch<DashboardPayload>("/api/panel/dashboard");
        setUser(me.user);
        setDashboard(dash);
      } catch (caughtError) {
        const message =
          caughtError instanceof Error ? caughtError.message : "Falha ao carregar painel.";
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
      // ignore logout network failures
    } finally {
      clearPanelToken();
      navigate("/painel/login");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f5f7] px-4 py-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-black/10 bg-white p-6">
          <p className="text-sm text-[#6b7280]">Carregando painel...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#f4f5f7] px-4 py-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-red-200 bg-white p-6">
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
      <div className="mx-auto max-w-5xl space-y-4">
        <header className="rounded-3xl border border-black/10 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-[#111827]">Painel do usuario</h1>
              <p className="text-sm text-[#6b7280]">
                Logado como {user?.displayName} ({user?.role})
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(user?.role === "admin" || user?.role === "manager") && (
                <Link
                  href="/painel/admin"
                  className="rounded-lg border border-black/15 px-3 py-2 text-sm font-medium text-[#111827]"
                >
                  Area administrativa
                </Link>
              )}
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

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-black/10 bg-white p-4">
            <h2 className="text-sm font-semibold text-[#111827]">Atendimento digital</h2>
            <p className="pt-2 text-sm text-[#4b5563]">
              {dashboard?.userArea?.message ||
                "Acompanhe e priorize contatos com a equipe sempre que necessario."}
            </p>
          </article>

          <article className="rounded-2xl border border-black/10 bg-white p-4">
            <h2 className="text-sm font-semibold text-[#111827]">Canais oficiais</h2>
            <p className="pt-2 text-sm text-[#4b5563]">
              Email: {dashboard?.cmsConfig?.handoffEmail || "nao configurado"}
            </p>
            <p className="text-sm text-[#4b5563]">
              WhatsApp: {dashboard?.cmsConfig?.handoffWhatsapp || "nao configurado"}
            </p>
            <p className="text-sm text-[#4b5563]">
              Horario: {dashboard?.cmsConfig?.serviceHours || "nao configurado"}
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}

