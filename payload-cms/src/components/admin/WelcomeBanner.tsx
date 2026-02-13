"use client";

import React from "react";

export default function WelcomeBanner() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #263a30 0%, #344e41 100%)",
        color: "#e3f7ec",
        padding: "32px",
        borderRadius: "12px",
        marginBottom: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "24px",
            fontWeight: 500,
            margin: "0 0 8px 0",
            color: "#f2fcf7",
          }}
        >
          Painel Itaicy Pantanal
        </h2>
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "15px",
            fontWeight: 400,
            margin: "0 0 16px 0",
            color: "#a8cab9",
            maxWidth: "600px",
          }}
        >
          Gerencie o conteudo do site: artigos do blog, catalogo de aves,
          depoimentos, perguntas frequentes e configuracoes gerais.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a
            href="/admin/collections/blog-posts"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              backgroundColor: "#ac8042",
              color: "#f2fcf7",
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "'Lato', sans-serif",
              textDecoration: "none",
              transition: "background-color 0.2s",
            }}
          >
            Blog Posts
          </a>
          <a
            href="/admin/collections/bird-species"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#e3f7ec",
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "'Lato', sans-serif",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            Catalogo de Aves
          </a>
          <a
            href="/admin/globals/site-settings"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#e3f7ec",
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "'Lato', sans-serif",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            Configuracoes
          </a>
        </div>
      </div>
      {/* Decorative gold accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "200px",
          height: "100%",
          background:
            "linear-gradient(135deg, transparent 50%, rgba(172,128,66,0.08) 100%)",
        }}
      />
    </div>
  );
}
