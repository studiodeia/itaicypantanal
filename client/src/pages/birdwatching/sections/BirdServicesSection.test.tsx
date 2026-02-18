import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BirdServicesSection } from "./BirdServicesSection";

describe("BirdServicesSection", () => {
  it("renders the contextual CTA card", () => {
    render(<BirdServicesSection />);
    expect(
      screen.getByText(/quer fotografar/i),
    ).toBeInTheDocument();
  });

  it("renders the CTA button with booking link", () => {
    render(<BirdServicesSection />);
    const link = screen.getByRole("link", {
      name: /agendar expedição fotográfica/i,
    });
    expect(link).toBeInTheDocument();
  });
});
