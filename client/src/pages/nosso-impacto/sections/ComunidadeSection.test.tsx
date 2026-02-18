import { render, screen } from "@testing-library/react";
import { ComunidadeSection } from "./ComunidadeSection";
import { nossoImpactoDefaults } from "../../nosso-impacto-defaults";

const content = nossoImpactoDefaults.comunidade;

describe("ComunidadeSection", () => {
  it("renders the section label", () => {
    render(<ComunidadeSection content={content} />);
    expect(screen.getByText("COMUNIDADE & RAÍZES")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    render(<ComunidadeSection content={content} />);
    expect(screen.getByText("Guardiões Nativos.")).toBeInTheDocument();
  });

  it("renders the description about local guides", () => {
    render(<ComunidadeSection content={content} />);
    expect(
      screen.getByText(/nasceram no ritmo das águas/i),
    ).toBeInTheDocument();
  });

  it("renders the community image", () => {
    render(<ComunidadeSection content={content} />);
    expect(screen.getByTestId("img-comunidade")).toBeInTheDocument();
  });
});
