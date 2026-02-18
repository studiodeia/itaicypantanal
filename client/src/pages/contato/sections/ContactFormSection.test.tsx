import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactFormSection } from "./ContactFormSection";

describe("ContactFormSection", () => {
  it("renders name field", () => {
    render(<ContactFormSection />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
  });

  it("renders email field", () => {
    render(<ContactFormSection />);
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
  });

  it("renders interest select", () => {
    render(<ContactFormSection />);
    expect(screen.getByLabelText(/interesse/i)).toBeInTheDocument();
  });

  it("renders optional planned date field", () => {
    render(<ContactFormSection />);
    expect(screen.getByLabelText(/data prevista/i)).toBeInTheDocument();
  });

  it("renders message field", () => {
    render(<ContactFormSection />);
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactFormSection />);
    expect(
      screen.getByRole("button", { name: /enviar mensagem/i }),
    ).toBeInTheDocument();
  });
});
