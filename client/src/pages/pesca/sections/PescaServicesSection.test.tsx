import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PescaServicesSection } from "./PescaServicesSection";
import { pescaDefaults } from "../../pesca-defaults";

const content = pescaDefaults.pt.services;

describe("PescaServicesSection", () => {
  it("renders the contextual CTA card", () => {
    render(<PescaServicesSection content={content} />);
    expect(
      screen.getByText(/pronto para pescar/i),
    ).toBeInTheDocument();
  });

  it("renders the CTA button with booking link", () => {
    render(<PescaServicesSection content={content} />);
    const link = screen.getByRole("link", {
      name: /reservar expedição/i,
    });
    expect(link).toBeInTheDocument();
  });
});
