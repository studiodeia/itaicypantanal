"use client";

import React from "react";

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

const PAGES = [
  { label: "Home", href: "/admin/globals/home-content" },
  { label: "Acomodações", href: "/admin/globals/acomodacoes-content" },
  { label: "Culinária", href: "/admin/globals/culinaria-content" },
  { label: "Pesca Esportiva", href: "/admin/globals/pesca-content" },
  { label: "Ecoturismo", href: "/admin/globals/ecoturismo-content" },
  { label: "Observação de Aves", href: "/admin/globals/birdwatching-content" },
  { label: "Contato", href: "/admin/globals/contato-content" },
  { label: "Nosso Impacto", href: "/admin/globals/nosso-impacto-content" },
  { label: "Privacidade", href: "/admin/globals/privacidade-content" },
  { label: "Página 404", href: "/admin/globals/not-found-content" },
];

const QUICK_ACTIONS = [
  {
    label: "Novo Artigo",
    href: "/admin/collections/blog-posts/create",
    primary: true,
  },
  {
    label: "Nova Espécie de Ave",
    href: "/admin/collections/bird-species/create",
    primary: false,
  },
  {
    label: "Configurações do Site",
    href: "/admin/globals/site-settings",
    primary: false,
  },
  {
    label: "Agente de Chat",
    href: "/admin/globals/agent-config",
    primary: false,
  },
];

const TIPS = [
  "🌐 Para editar em Inglês ou Espanhol: use o seletor de idioma no topo da página ao abrir qualquer conteúdo.",
  "🖼️ Campos de imagem: insira o caminho sem extensão — ex: /images/lodge-exterior — os formatos AVIF e WebP são carregados automaticamente pelo site.",
  "💾 Após salvar, o site reflete as mudanças em até 30 segundos.",
  "📝 Artigos em destaque: marque \"Exibir como destaque\" em apenas 1 artigo por vez para evitar conflito visual no blog.",
  "↩️ Histórico de versões: artigos do blog guardam até 10 versões; todas as páginas e configurações guardam até 5 — acesse pelo botão 'Versões' ao editar.",
];

export default function WelcomeBanner() {
  return (
    <div style={styles.container}>
      {/* Header com ações rápidas */}
      <div style={styles.header}>
        <div style={styles.headerInner}>
          <h2 style={styles.headerTitle}>Painel Itaicy Pantanal</h2>
          <p style={styles.headerSubtitle}>
            Gerencie o conteúdo do site. Todas as alterações são refletidas em
            até 30 segundos após salvar.
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

      {/* Acesso rápido às páginas */}
      <div style={styles.card}>
        <p style={styles.sectionLabel}>Editar páginas do site</p>
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
        <p style={styles.sectionLabelGold}>Dicas rápidas</p>
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
