import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContactHeroSection } from "./ContactHeroSection";
import { contatoDefaults } from "../../contato-defaults";

const props = {
  content: contatoDefaults.pt.hero,
  formTitle: contatoDefaults.pt.formTitle,
  steps: contatoDefaults.pt.steps,
};

describe("ContactHeroSection", () => {
  it("renders the gold label", () => {
    render(<ContactHeroSection {...props} />);
    expect(screen.getByText("PREPARE SUA EXPEDIÇÃO")).toBeInTheDocument();
  });

  it("renders the hero title", () => {
    render(<ContactHeroSection {...props} />);
    expect(
      screen.getByText("Fale com Nossos Especialistas"),
    ).toBeInTheDocument();
  });

  it("renders the form card with step indicator", () => {
    render(<ContactHeroSection {...props} />);
    expect(screen.getByText("Entrar em contato")).toBeInTheDocument();
    expect(screen.getByText("1/3")).toBeInTheDocument();
  });

  it("renders the email input on step 1", () => {
    render(<ContactHeroSection {...props} />);
    expect(screen.getByTestId("input-contact-email")).toBeInTheDocument();
  });

  it("advances to step 2 when clicking Avançar", () => {
    render(<ContactHeroSection {...props} />);
    fireEvent.click(screen.getByTestId("button-avancar"));
    expect(screen.getByText("2/3")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nome completo")).toBeInTheDocument();
  });

  it("renders description text at bottom", () => {
    render(<ContactHeroSection {...props} />);
    expect(
      screen.getByText(/nossa equipe está à disposição/i),
    ).toBeInTheDocument();
  });
});
