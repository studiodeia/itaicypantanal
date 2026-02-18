import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleHeroSection } from "./ArticleHeroSection";
import type { BlogArticleDetail } from "../data";

const mockArticle: BlogArticleDetail = {
  slug: "test-article",
  title: "Test Article Title",
  subtitle: "Test Subtitle",
  description: "Test description for the article.",
  tag: "Aventura",
  primaryCategory: "Aventura",
  categories: ["Aventura"],
  src: "/images/blog-hero-bg",
  author: "Lucas José Fernandes Vieira",
  date: "09 de Agosto, 2025",
  readingTime: "10 minutos de leitura",
  heroImage: "/images/article-hero",
  content: [],
  relatedSlugs: [],
};

describe("ArticleHeroSection", () => {
  it("renders the article title", () => {
    render(<ArticleHeroSection article={mockArticle} />);
    expect(screen.getByText("Test Article Title")).toBeInTheDocument();
  });

  it("renders the category tag", () => {
    render(<ArticleHeroSection article={mockArticle} />);
    expect(screen.getByText("Aventura")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<ArticleHeroSection article={mockArticle} />);
    expect(
      screen.getByText("Test description for the article."),
    ).toBeInTheDocument();
  });

  it("renders the author name", () => {
    render(<ArticleHeroSection article={mockArticle} />);
    expect(
      screen.getByText("Lucas José Fernandes Vieira"),
    ).toBeInTheDocument();
  });

  it("renders the date", () => {
    render(<ArticleHeroSection article={mockArticle} />);
    expect(screen.getByText("09 de Agosto, 2025")).toBeInTheDocument();
  });

  it("renders the reading time", () => {
    render(<ArticleHeroSection article={mockArticle} />);
    expect(screen.getByText("10 minutos de leitura")).toBeInTheDocument();
  });

  it("renders the hero image as background", () => {
    render(<ArticleHeroSection article={mockArticle} />);
    // Hero image is decorative background (alt=""), queried by test ID
    const bgImg = document.querySelector(
      'img[src="/images/article-hero.webp"]',
    );
    expect(bgImg).toBeInTheDocument();
  });
});
