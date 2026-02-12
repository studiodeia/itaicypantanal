import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogArticlePage } from "./BlogArticlePage";

// Mock wouter's useParams to provide categorySlug + slug
vi.mock("wouter", () => ({
  useParams: () => ({
    categorySlug: "aventura",
    slug: "guia-observacao-166-especies-aves",
  }),
}));

describe("BlogArticlePage", () => {
  it("renders the article title from the featured article", () => {
    render(<BlogArticlePage />);
    expect(
      screen.getByText(
        "Guia de Observação: As 166 Espécies de Aves Vistas na Itaicy",
      ),
    ).toBeInTheDocument();
  });

  it("renders the article content section", () => {
    render(<BlogArticlePage />);
    // The featured article has content about bird species
    expect(
      screen.getByText(/santuários de vida selvagem/i),
    ).toBeInTheDocument();
  });

  it("renders the related articles section", () => {
    render(<BlogArticlePage />);
    expect(screen.getByText("Artigos relacionados")).toBeInTheDocument();
  });
});
