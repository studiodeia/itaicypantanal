import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImpactEngagementSection } from "./ImpactEngagementSection";

describe("ImpactEngagementSection", () => {
  it("renders the headline", () => {
    render(<ImpactEngagementSection />);
    expect(
      screen.getByText("Faça parte deste legado."),
    ).toBeInTheDocument();
  });

  it("renders the CTA button", () => {
    render(<ImpactEngagementSection />);
    const button = screen.getByRole("link", {
      name: /reservar minha experiência consciente/i,
    });
    expect(button).toBeInTheDocument();
  });
});
