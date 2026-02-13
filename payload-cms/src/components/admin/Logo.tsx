import React from "react";

export default function Logo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "28px",
          fontWeight: 500,
          color: "#152218",
          letterSpacing: "0.02em",
          lineHeight: 1.2,
          textAlign: "center",
        }}
      >
        Itaicy Pantanal
      </div>
      <div
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: "13px",
          fontWeight: 400,
          color: "#446354",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Eco Lodge &bull; CMS
      </div>
    </div>
  );
}
