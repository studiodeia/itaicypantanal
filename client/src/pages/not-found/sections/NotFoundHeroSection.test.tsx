import { render, screen } from "@testing-library/react";
import { NotFoundHeroSection } from "./NotFoundHeroSection";
import { notFoundDefaults } from "../../not-found-defaults";

const content = notFoundDefaults.hero;
const buttonText = notFoundDefaults.buttonText;

describe("NotFoundHeroSection", () => {
  it("renders the 404 label", () => {
    render(<NotFoundHeroSection content={content} buttonText={buttonText} />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders the heading", () => {
    render(<NotFoundHeroSection content={content} buttonText={buttonText} />);
    expect(
      screen.getByText("Parece que você saiu um pouco da trilha."),
    ).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<NotFoundHeroSection content={content} buttonText={buttonText} />);
    expect(
      screen.getByText(
        "Acontece até com os exploradores mais experientes. A página que você procurava não foi encontrada ou pode ter sido movida.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the back-to-home link", () => {
    render(<NotFoundHeroSection content={content} buttonText={buttonText} />);
    const link = screen.getByRole("link", { name: /voltar para o início/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders the scroll hint", () => {
    render(<NotFoundHeroSection content={content} buttonText={buttonText} />);
    expect(screen.getByText("Deslize para baixo")).toBeInTheDocument();
  });

  it("renders the background image", () => {
    render(<NotFoundHeroSection content={content} buttonText={buttonText} />);
    const bgImg = document.querySelector(
      'img[src="/images/404-hero-bg.webp"]',
    );
    expect(bgImg).toBeInTheDocument();
  });
});
