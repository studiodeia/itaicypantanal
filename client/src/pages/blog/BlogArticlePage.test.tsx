import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { BlogArticlePage } from "./BlogArticlePage";

// Mock wouter's useParams to provide categorySlug + slug
vi.mock("wouter", async (importOriginal) => {
  const actual = await importOriginal<typeof import("wouter")>();
  return {
    ...actual,
    useParams: () => ({
      categorySlug: "aventura",
      slug: "guia-observacao-166-especies-aves",
    }),
    useLocation: () => ["/blog/aventura/guia-observacao-166-especies-aves", () => {}],
  };
});

describe("BlogArticlePage", () => {
  it("renders the article title from the featured article", () => {
    render(<HelmetProvider><BlogArticlePage /></HelmetProvider>);
    expect(
      screen.getByText(
        "Guia de Observação: As 166 Espécies de Aves Vistas na Itaicy",
      ),
    ).toBeInTheDocument();
  });

  it("renders the article content section", () => {
    render(<HelmetProvider><BlogArticlePage /></HelmetProvider>);
    // The featured article has content about bird species
    expect(
      screen.getByText(/santuários de vida selvagem/i),
    ).toBeInTheDocument();
  });

  it("renders the related articles section", () => {
    render(<HelmetProvider><BlogArticlePage /></HelmetProvider>);
    expect(screen.getByText("Artigos relacionados")).toBeInTheDocument();
  });
});
