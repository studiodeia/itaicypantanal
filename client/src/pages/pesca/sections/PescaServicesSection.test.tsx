import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PescaServicesSection } from "./PescaServicesSection";

describe("PescaServicesSection", () => {
  it("renders the contextual CTA card", () => {
    render(<PescaServicesSection />);
    expect(
      screen.getByText(/pronto para pescar/i),
    ).toBeInTheDocument();
  });

  it("renders the CTA button with booking link", () => {
    render(<PescaServicesSection />);
    const link = screen.getByRole("link", {
      name: /reservar expedição/i,
    });
    expect(link).toBeInTheDocument();
  });
});
