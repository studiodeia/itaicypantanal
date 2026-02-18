import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BiodiversidadeSection } from "./BiodiversidadeSection";
import { nossoImpactoDefaults } from "../../nosso-impacto-defaults";

const content = nossoImpactoDefaults.pt.biodiversidade;

describe("BiodiversidadeSection", () => {
  it("renders the section label", () => {
    render(<BiodiversidadeSection content={content} />);
    expect(screen.getByText("BIODIVERSIDADE")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    render(<BiodiversidadeSection content={content} />);
    expect(
      screen.getByText("Santuário de Vida Selvagem"),
    ).toBeInTheDocument();
  });

  it("renders the 3 stat cards", () => {
    render(<BiodiversidadeSection content={content} />);
    expect(screen.getByTestId("bio-stat-0")).toBeInTheDocument();
    expect(screen.getByTestId("bio-stat-1")).toBeInTheDocument();
    expect(screen.getByTestId("bio-stat-2")).toBeInTheDocument();
  });

  it("renders stat labels", () => {
    render(<BiodiversidadeSection content={content} />);
    expect(screen.getByText("ESPÉCIES CATALOGADAS")).toBeInTheDocument();
    expect(screen.getByText("ESPÉCIES AMEAÇADAS PROTEGIDAS")).toBeInTheDocument();
    expect(screen.getByText("DE ÁREA PRESERVADA")).toBeInTheDocument();
  });

  it("renders CTA link to bird guide", () => {
    render(<BiodiversidadeSection content={content} />);
    const ctaLink = screen.getByText(/inventário de vida selvagem/i);
    expect(ctaLink.closest("a")).toHaveAttribute(
      "href",
      "/observacao-de-aves",
    );
  });
});
