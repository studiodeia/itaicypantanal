import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImpactHeroSection } from "./ImpactHeroSection";

describe("ImpactHeroSection", () => {
  it("renders the gold label", () => {
    render(<ImpactHeroSection />);
    expect(screen.getByText("NOSSO LEGADO")).toBeInTheDocument();
  });

  it("renders the hero title", () => {
    render(<ImpactHeroSection />);
    expect(
      screen.getByText("O Pantanal de amanhã se constrói hoje."),
    ).toBeInTheDocument();
  });

  it("renders the hero description", () => {
    render(<ImpactHeroSection />);
    expect(
      screen.getByText(/não somos apenas observadores/i),
    ).toBeInTheDocument();
  });

  it("renders scroll indicator on desktop", () => {
    render(<ImpactHeroSection />);
    expect(screen.getByText("Deslize para baixo")).toBeInTheDocument();
  });
});
