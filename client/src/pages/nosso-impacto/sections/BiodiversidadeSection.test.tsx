import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BiodiversidadeSection } from "./BiodiversidadeSection";

describe("BiodiversidadeSection", () => {
  it("renders the section label", () => {
    render(<BiodiversidadeSection />);
    expect(screen.getByText("BIODIVERSIDADE")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    render(<BiodiversidadeSection />);
    expect(
      screen.getByText("Santuário de Vida Selvagem"),
    ).toBeInTheDocument();
  });

  it("renders the 3 stat cards", () => {
    render(<BiodiversidadeSection />);
    expect(screen.getByTestId("bio-stat-0")).toBeInTheDocument();
    expect(screen.getByTestId("bio-stat-1")).toBeInTheDocument();
    expect(screen.getByTestId("bio-stat-2")).toBeInTheDocument();
  });

  it("renders stat labels", () => {
    render(<BiodiversidadeSection />);
    expect(screen.getByText("ESPÉCIES CATALOGADAS")).toBeInTheDocument();
    expect(screen.getByText("ESPÉCIES AMEAÇADAS PROTEGIDAS")).toBeInTheDocument();
    expect(screen.getByText("DE ÁREA PRESERVADA")).toBeInTheDocument();
  });

  it("renders CTA link to bird guide", () => {
    render(<BiodiversidadeSection />);
    const ctaLink = screen.getByText(/inventário de vida selvagem/i);
    expect(ctaLink.closest("a")).toHaveAttribute(
      "href",
      "/observacao-de-aves",
    );
  });
});
