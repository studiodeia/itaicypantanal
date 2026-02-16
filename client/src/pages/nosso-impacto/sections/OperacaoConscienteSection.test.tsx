import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OperacaoConscienteSection } from "./OperacaoConscienteSection";
import { nossoImpactoDefaults } from "../../nosso-impacto-defaults";

const content = nossoImpactoDefaults.operacao;

describe("OperacaoConscienteSection", () => {
  it("renders the section label", () => {
    render(<OperacaoConscienteSection content={content} />);
    expect(screen.getByText("OPERAÇÃO CONSCIENTE")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    render(<OperacaoConscienteSection content={content} />);
    expect(
      screen.getByText("Turismo que Regenera"),
    ).toBeInTheDocument();
  });

  it("renders the 3 practice cards", () => {
    render(<OperacaoConscienteSection content={content} />);
    expect(screen.getByTestId("practice-0")).toBeInTheDocument();
    expect(screen.getByTestId("practice-1")).toBeInTheDocument();
    expect(screen.getByTestId("practice-2")).toBeInTheDocument();
  });

  it("renders practice titles", () => {
    render(<OperacaoConscienteSection content={content} />);
    expect(screen.getByText("Gestão de Resíduos")).toBeInTheDocument();
    expect(screen.getByText("Zero Plástico Descartável")).toBeInTheDocument();
    expect(screen.getByText("Tratamento de Água")).toBeInTheDocument();
  });
});
