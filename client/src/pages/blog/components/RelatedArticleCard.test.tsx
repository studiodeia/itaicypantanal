import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RelatedArticleCard } from "./RelatedArticleCard";
import type { BlogArticle } from "../data";

const mockArticle: BlogArticle = {
  slug: "arara-azul-pantanal",
  title: "Arara-Azul",
  subtitle: "Anodorhynchus hyacinthinus",
  tag: "Fauna",
  primaryCategory: "Conservação",
  categories: ["Conservação", "Aventura"],
  src: "/images/blog-recent-1",
  author: "Lucas Vieira",
  date: "09 de Agosto, 2025",
  readingTime: "15 minutos de leitura",
};

describe("RelatedArticleCard", () => {
  it("renders the article title", () => {
    render(<RelatedArticleCard article={mockArticle} />);
    expect(screen.getByText("Arara-Azul")).toBeInTheDocument();
  });

  it("renders the category tag", () => {
    render(<RelatedArticleCard article={mockArticle} />);
    expect(screen.getByText("Fauna")).toBeInTheDocument();
  });

  it("renders reading time", () => {
    render(<RelatedArticleCard article={mockArticle} />);
    expect(screen.getByText("15 minutos de leitura")).toBeInTheDocument();
  });

  it("renders the author name", () => {
    render(<RelatedArticleCard article={mockArticle} />);
    expect(screen.getByText("Lucas Vieira")).toBeInTheDocument();
  });

  it("renders the date", () => {
    render(<RelatedArticleCard article={mockArticle} />);
    expect(screen.getByText("09 de Agosto, 2025")).toBeInTheDocument();
  });

  it("links to the article page", () => {
    render(<RelatedArticleCard article={mockArticle} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/blog/conservacao/arara-azul-pantanal");
  });

  it("renders an image with the article title as alt text", () => {
    render(<RelatedArticleCard article={mockArticle} />);
    const img = screen.getByRole("img", { name: "Arara-Azul" });
    expect(img).toBeInTheDocument();
  });
});
