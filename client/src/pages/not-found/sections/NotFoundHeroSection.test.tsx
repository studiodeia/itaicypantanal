import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NotFoundHeroSection } from "./NotFoundHeroSection";

describe("NotFoundHeroSection", () => {
  it("renders the 404 label", () => {
    render(<NotFoundHeroSection />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders the heading", () => {
    render(<NotFoundHeroSection />);
    expect(
      screen.getByText("Parece que você saiu um pouco da trilha."),
    ).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<NotFoundHeroSection />);
    expect(
      screen.getByText(
        "Acontece até com os exploradores mais experientes. A página que você procurava não foi encontrada ou pode ter sido movida.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the back-to-home link", () => {
    render(<NotFoundHeroSection />);
    const link = screen.getByRole("link", { name: /voltar para o início/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders the scroll hint", () => {
    render(<NotFoundHeroSection />);
    expect(screen.getByText("Deslize para baixo")).toBeInTheDocument();
  });

  it("renders the background image", () => {
    render(<NotFoundHeroSection />);
    const bgImg = document.querySelector(
      'img[src="/images/404-hero-bg.webp"]',
    );
    expect(bgImg).toBeInTheDocument();
  });
});
