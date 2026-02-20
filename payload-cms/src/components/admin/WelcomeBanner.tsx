"use client";

import React, { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DashboardStats = {
  birdSpecies: number;
  blogPosts: number;
  mediaFiles: number;
  loaded: boolean;
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = {
  container: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "16px",
  },
  header: {
    background: "linear-gradient(135deg, #263a30 0%, #344e41 100%)",
    color: "#e3f7ec",
    padding: "28px 32px",
    borderRadius: "12px",
    position: "relative" as const,
    overflow: "hidden" as const,
  },
  headerInner: {
    position: "relative" as const,
    zIndex: 1,
  },
  headerTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "22px",
    fontWeight: 500,
    margin: "0 0 6px 0",
    color: "#f2fcf7",
  },
  headerSubtitle: {
    fontFamily: "'Lato', sans-serif",
    fontSize: "14px",
    margin: "0 0 20px 0",
    color: "#a8cab9",
    lineHeight: "1.5",
  },
  quickActions: {
    display: "flex" as const,
    gap: "10px",
    flexWrap: "wrap" as const,
  },
  btnPrimary: {
    display: "inline-flex" as const,
    alignItems: "center" as const,
    padding: "7px 14px",
    backgroundColor: "#ac8042",
    color: "#f2fcf7",
    borderRadius: "6px",
    fontSize: "13px",
    fontFamily: "'Lato', sans-serif",
    textDecoration: "none",
    border: "1px solid transparent",
    fontWeight: 500,
  },
  btnSecondary: {
    display: "inline-flex" as const,
    alignItems: "center" as const,
    padding: "7px 14px",
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#e3f7ec",
    borderRadius: "6px",
    fontSize: "13px",
    fontFamily: "'Lato', sans-serif",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.18)",
  },
  goldAccent: {
    position: "absolute" as const,
    top: 0,
    right: 0,
    width: "200px",
    height: "100%",
    background:
      "linear-gradient(135deg, transparent 50%, rgba(172,128,66,0.08) 100%)",
  },
  statsRow: {
    display: "grid" as const,
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
  },
  statCard: {
    background: "#fafafa",
    border: "1px solid #e8e8e8",
    borderRadius: "12px",
    padding: "16px 20px",
    textAlign: "center" as const,
  },
  statNumber: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "28px",
    fontWeight: 600,
    color: "#263a30",
    margin: "0",
    lineHeight: "1.2",
  },
  statLabel: {
    fontFamily: "'Lato', sans-serif",
    fontSize: "12px",
    color: "#8aad9c",
    margin: "4px 0 0 0",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  card: {
    background: "#fafafa",
    border: "1px solid #e8e8e8",
    borderRadius: "12px",
    padding: "20px 24px",
  },
  cardGold: {
    background: "linear-gradient(135deg, #fffaf4, #fff6ec)",
    border: "1px solid #e8d5b0",
    borderRadius: "12px",
    padding: "18px 24px",
  },
  sectionLabel: {
    fontFamily: "'Lato', sans-serif",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#8aad9c",
    margin: "0 0 12px 0",
  },
  sectionLabelGold: {
    fontFamily: "'Lato', sans-serif",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#ac8042",
    margin: "0 0 12px 0",
  },
  pillsGrid: {
    display: "flex" as const,
    flexWrap: "wrap" as const,
    gap: "8px",
  },
  pill: {
    display: "inline-flex" as const,
    alignItems: "center" as const,
    padding: "6px 12px",
    backgroundColor: "white",
    color: "#263a30",
    borderRadius: "6px",
    fontSize: "13px",
    fontFamily: "'Lato', sans-serif",
    textDecoration: "none",
    border: "1px solid #d4e8db",
    fontWeight: 400,
  },
  tipsList: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "8px",
  },
  tip: {
    fontFamily: "'Lato', sans-serif",
    fontSize: "13px",
    margin: "0",
    color: "#6b4c1e",
    lineHeight: "1.6",
  },
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PAGES = [
  { label: "Home", href: "/admin/globals/home-content" },
  { label: "Acomodacoes", href: "/admin/globals/acomodacoes-content" },
  { label: "Culinaria", href: "/admin/globals/culinaria-content" },
  { label: "Pesca Esportiva", href: "/admin/globals/pesca-content" },
  { label: "Ecoturismo", href: "/admin/globals/ecoturismo-content" },
  { label: "Observacao de Aves", href: "/admin/globals/birdwatching-content" },
  { label: "Contato", href: "/admin/globals/contato-content" },
  { label: "Nosso Impacto", href: "/admin/globals/nosso-impacto-content" },
  { label: "Privacidade", href: "/admin/globals/privacidade-content" },
  { label: "Pagina 404", href: "/admin/globals/not-found-content" },
];

const QUICK_ACTIONS = [
  { label: "Novo Artigo", href: "/admin/collections/blog-posts/create", primary: true },
  { label: "Nova Especie de Ave", href: "/admin/collections/bird-species/create", primary: false },
  { label: "Configuracoes do Site", href: "/admin/globals/site-settings", primary: false },
  { label: "Biblioteca de Midia", href: "/admin/collections/media", primary: false },
];

const TIPS = [
  "Traducao automatica: ao salvar conteudo em Portugues, os campos em Ingles e Espanhol sao preenchidos automaticamente por IA.",
  "Campos de imagem: insira o caminho sem extensao — ex: /images/lodge-exterior — os formatos AVIF e WebP sao carregados automaticamente pelo site.",
  "Apos salvar, o site reflete as mudancas em ate 30 segundos.",
  "Artigos em destaque: marque \"Exibir como destaque\" em apenas 1 artigo por vez para evitar conflito visual no blog.",
  "Historico de versoes: artigos do blog guardam ate 10 versoes; todas as paginas e configuracoes guardam ate 5.",
];

// ---------------------------------------------------------------------------
// Stats Hook
// ---------------------------------------------------------------------------

function useDashboardStats(): DashboardStats {
  const [stats, setStats] = useState<DashboardStats>({
    birdSpecies: 0,
    blogPosts: 0,
    mediaFiles: 0,
    loaded: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchCount(collection: string): Promise<number> {
      try {
        const res = await fetch(`/api/${collection}?limit=0`);
        if (!res.ok) return 0;
        const data = await res.json();
        return typeof data.totalDocs === "number" ? data.totalDocs : 0;
      } catch {
        return 0;
      }
    }

    Promise.all([
      fetchCount("bird-species"),
      fetchCount("blog-posts"),
      fetchCount("media"),
    ]).then(([birdSpecies, blogPosts, mediaFiles]) => {
      if (!cancelled) {
        setStats({ birdSpecies, blogPosts, mediaFiles, loaded: true });
      }
    });

    return () => { cancelled = true; };
  }, []);

  return stats;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function WelcomeBanner() {
  const stats = useDashboardStats();

  return (
    <div style={styles.container}>
      {/* Header com acoes rapidas */}
      <div style={styles.header}>
        <div style={styles.headerInner}>
          <h2 style={styles.headerTitle}>Painel Itaicy Pantanal</h2>
          <p style={styles.headerSubtitle}>
            Gerencie o conteudo do site. Traducoes para EN/ES sao geradas
            automaticamente ao salvar em Portugues.
          </p>
          <div style={styles.quickActions}>
            {QUICK_ACTIONS.map((action) => (
              <a
                key={action.href + action.label}
                href={action.href}
                style={action.primary ? styles.btnPrimary : styles.btnSecondary}
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
        <div style={styles.goldAccent} />
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <p style={styles.statNumber}>{stats.loaded ? stats.birdSpecies : "..."}</p>
          <p style={styles.statLabel}>Especies de Aves</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statNumber}>{stats.loaded ? stats.blogPosts : "..."}</p>
          <p style={styles.statLabel}>Artigos no Blog</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statNumber}>{stats.loaded ? stats.mediaFiles : "..."}</p>
          <p style={styles.statLabel}>Arquivos de Midia</p>
        </div>
      </div>

      {/* Acesso rapido as paginas */}
      <div style={styles.card}>
        <p style={styles.sectionLabel}>Editar paginas do site</p>
        <div style={styles.pillsGrid}>
          {PAGES.map((page) => (
            <a key={page.href} href={page.href} style={styles.pill}>
              {page.label}
            </a>
          ))}
        </div>
      </div>

      {/* Dicas */}
      <div style={styles.cardGold}>
        <p style={styles.sectionLabelGold}>Dicas rapidas</p>
        <div style={styles.tipsList}>
          {TIPS.map((tip, i) => (
            <p key={i} style={styles.tip}>
              {tip}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
