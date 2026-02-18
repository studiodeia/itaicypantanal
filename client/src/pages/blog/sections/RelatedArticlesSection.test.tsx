import { render, screen } from "@testing-library/react";
import { RelatedArticlesSection } from "./RelatedArticlesSection";
import type { BlogArticle } from "../data";

const mockArticles: BlogArticle[] = [
  {
    slug: "arara-azul-pantanal",
    title: "Arara-Azul",
    subtitle: "Anodorhynchus hyacinthinus",
    tag: "Fauna",
    primaryCategory: "Conservação",
    categories: ["Conservação"],
    src: "/images/blog-recent-1",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
    readingTime: "15 minutos de leitura",
  },
  {
    slug: "arara-vermelha-pantanal",
    title: "Arara-Vermelha",
    subtitle: "Ara chloropterus",
    tag: "Fauna",
    primaryCategory: "Conservação",
    categories: ["Conservação"],
    src: "/images/blog-recent-2",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
    readingTime: "12 minutos de leitura",
  },
  {
    slug: "ibis-preto-pantanal",
    title: "Íbis-Preto",
    subtitle: "Plegadis chihi",
    tag: "Fauna",
    primaryCategory: "Conservação",
    categories: ["Conservação"],
    src: "/images/blog-recent-3",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
    readingTime: "10 minutos de leitura",
  },
];

describe("RelatedArticlesSection", () => {
  it("renders the section heading", () => {
    render(<RelatedArticlesSection articles={mockArticles} />);
    expect(screen.getByText("Artigos relacionados")).toBeInTheDocument();
  });

  it("renders 3 article cards", () => {
    render(<RelatedArticlesSection articles={mockArticles} />);
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("renders each article title", () => {
    render(<RelatedArticlesSection articles={mockArticles} />);
    expect(screen.getByText("Arara-Azul")).toBeInTheDocument();
    expect(screen.getByText("Arara-Vermelha")).toBeInTheDocument();
    expect(screen.getByText("Íbis-Preto")).toBeInTheDocument();
  });

  it("renders navigation arrows", () => {
    render(<RelatedArticlesSection articles={mockArticles} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });
});
