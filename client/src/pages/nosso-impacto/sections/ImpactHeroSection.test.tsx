import { render, screen } from "@testing-library/react";
import { ImpactHeroSection } from "./ImpactHeroSection";
import { nossoImpactoDefaults } from "../../nosso-impacto-defaults";

const content = nossoImpactoDefaults.hero;

describe("ImpactHeroSection", () => {
  it("renders the gold label", () => {
    render(<ImpactHeroSection content={content} />);
    expect(screen.getByText("NOSSO LEGADO")).toBeInTheDocument();
  });

  it("renders the hero title", () => {
    render(<ImpactHeroSection content={content} />);
    expect(
      screen.getByText("O Pantanal de amanhã se constrói hoje."),
    ).toBeInTheDocument();
  });

  it("renders the hero description", () => {
    render(<ImpactHeroSection content={content} />);
    expect(
      screen.getByText(/não somos apenas observadores/i),
    ).toBeInTheDocument();
  });

  it("renders scroll indicator on desktop", () => {
    render(<ImpactHeroSection content={content} />);
    expect(screen.getByText("Deslize para baixo")).toBeInTheDocument();
  });
});
