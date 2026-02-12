import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RioVivoSection } from "./RioVivoSection";

describe("RioVivoSection", () => {
  it("renders the section label", () => {
    render(<RioVivoSection />);
    expect(screen.getByText("O RIO VIVO")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    render(<RioVivoSection />);
    expect(
      screen.getByText("100% Cota Zero: O Compromisso com o Gigante."),
    ).toBeInTheDocument();
  });

  it("renders the 4 cycle steps", () => {
    render(<RioVivoSection />);
    expect(screen.getByText("Captura")).toBeInTheDocument();
    expect(screen.getByText("Foto")).toBeInTheDocument();
    expect(screen.getByText("Soltura")).toBeInTheDocument();
    expect(screen.getByText("Reprodução")).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(<RioVivoSection />);
    expect(screen.getByText(/pioneiros em entender/i)).toBeInTheDocument();
  });
});
