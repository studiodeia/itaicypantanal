import React from "react";

/**
 * Admin Logo — renders the same Itaicy logo used on the site.
 * Shown on the login page and at the top of the sidebar nav.
 *
 * Two SVG variants swap automatically via [data-theme] CSS:
 *  - logo-light.svg (dark fill) for light / cream backgrounds
 *  - logo.svg (light fill) for dark backgrounds
 */
export default function Logo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {/* Light theme logo (dark fill on cream bg) */}
      <img
        className="logo-light"
        src="/images/logo-light.svg"
        alt="Itaicy Pantanal Eco Lodge"
        width={160}
        height={49}
        style={{ display: "block" }}
      />
      {/* Dark theme logo (light fill on dark bg) */}
      <img
        className="logo-dark"
        src="/images/logo.svg"
        alt="Itaicy Pantanal Eco Lodge"
        width={160}
        height={49}
        style={{ display: "none" }}
      />
      <span
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: "11px",
          fontWeight: 400,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          opacity: 0.6,
        }}
      >
        Painel Administrativo
      </span>
    </div>
  );
}
