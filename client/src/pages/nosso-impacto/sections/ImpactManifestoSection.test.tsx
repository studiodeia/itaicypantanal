import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImpactManifestoSection } from "./ImpactManifestoSection";

describe("ImpactManifestoSection", () => {
  it("renders the manifesto text", () => {
    render(<ImpactManifestoSection />);
    expect(screen.getByTestId("text-impact-manifesto")).toBeInTheDocument();
  });

  it("renders gold highlight on 'guardiões'", () => {
    render(<ImpactManifestoSection />);
    const manifesto = screen.getByTestId("text-impact-manifesto");
    const goldSpans = manifesto.querySelectorAll("span.text-\\[\\#d7a45d\\]");
    expect(goldSpans.length).toBeGreaterThanOrEqual(1);
  });
});
