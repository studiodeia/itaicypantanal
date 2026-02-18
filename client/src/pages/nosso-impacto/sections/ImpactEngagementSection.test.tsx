import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImpactEngagementSection } from "./ImpactEngagementSection";
import { nossoImpactoDefaults } from "../../nosso-impacto-defaults";

const content = nossoImpactoDefaults.pt.engagement;

describe("ImpactEngagementSection", () => {
  it("renders the headline", () => {
    render(<ImpactEngagementSection content={content} />);
    expect(
      screen.getByText("Faça parte deste legado."),
    ).toBeInTheDocument();
  });

  it("renders the CTA button", () => {
    render(<ImpactEngagementSection content={content} />);
    const button = screen.getByRole("link", {
      name: /reservar minha experiência consciente/i,
    });
    expect(button).toBeInTheDocument();
  });
});
