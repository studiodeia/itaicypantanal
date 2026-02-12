import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComunidadeSection } from "./ComunidadeSection";

describe("ComunidadeSection", () => {
  it("renders the section label", () => {
    render(<ComunidadeSection />);
    expect(screen.getByText("COMUNIDADE & RAÍZES")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    render(<ComunidadeSection />);
    expect(screen.getByText("Guardiões Nativos.")).toBeInTheDocument();
  });

  it("renders the description about local guides", () => {
    render(<ComunidadeSection />);
    expect(
      screen.getByText(/nasceram no ritmo das águas/i),
    ).toBeInTheDocument();
  });

  it("renders the community image", () => {
    render(<ComunidadeSection />);
    expect(screen.getByTestId("img-comunidade")).toBeInTheDocument();
  });
});
