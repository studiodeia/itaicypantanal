import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImpactManifestoSection } from "./ImpactManifestoSection";
import { nossoImpactoDefaults } from "../../nosso-impacto-defaults";

const content = nossoImpactoDefaults.manifesto;

describe("ImpactManifestoSection", () => {
  it("renders the manifesto text", () => {
    render(<ImpactManifestoSection content={content} />);
    expect(screen.getByTestId("text-impact-manifesto")).toBeInTheDocument();
  });

  it("renders gold highlight on 'guardiões'", () => {
    render(<ImpactManifestoSection content={content} />);
    const manifesto = screen.getByTestId("text-impact-manifesto");
    const goldSpans = manifesto.querySelectorAll("span.text-\\[\\#d7a45d\\]");
    expect(goldSpans.length).toBeGreaterThanOrEqual(1);
  });
});
