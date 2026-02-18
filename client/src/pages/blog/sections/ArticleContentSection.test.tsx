import { render, screen } from "@testing-library/react";
import { ArticleContentSection } from "./ArticleContentSection";
import type { ArticleContentBlock } from "../data";

const mockContent: ArticleContentBlock[] = [
  { type: "paragraph", text: "First paragraph of the article." },
  { type: "heading", text: "Section Heading" },
  { type: "paragraph", text: "Second paragraph after heading." },
  {
    type: "species",
    name: "A Arara-Azul-Grande",
    scientificName: "(Anodorhynchus hyacinthinus)",
    description: "The largest macaw in the world.",
    image: "/images/arara-azul",
  },
  {
    type: "orderedList",
    items: [
      { bold: "O Compêndio Digital Interativo", text: " Uma seção do nosso site." },
      { bold: "O Relatório Oficial", text: " Para download em PDF." },
    ],
  },
];

describe("ArticleContentSection", () => {
  it("renders paragraph text", () => {
    render(<ArticleContentSection content={mockContent} />);
    expect(
      screen.getByText("First paragraph of the article."),
    ).toBeInTheDocument();
  });

  it("renders section headings", () => {
    render(<ArticleContentSection content={mockContent} />);
    expect(screen.getByText("Section Heading")).toBeInTheDocument();
  });

  it("renders species name and scientific name", () => {
    render(<ArticleContentSection content={mockContent} />);
    expect(screen.getByText("A Arara-Azul-Grande")).toBeInTheDocument();
    expect(
      screen.getByText("(Anodorhynchus hyacinthinus)"),
    ).toBeInTheDocument();
  });

  it("renders species description", () => {
    render(<ArticleContentSection content={mockContent} />);
    expect(
      screen.getByText("The largest macaw in the world."),
    ).toBeInTheDocument();
  });

  it("renders species image", () => {
    render(<ArticleContentSection content={mockContent} />);
    const img = screen.getByRole("img", { name: "A Arara-Azul-Grande" });
    expect(img).toBeInTheDocument();
  });

  it("renders ordered list items with bold text", () => {
    render(<ArticleContentSection content={mockContent} />);
    expect(
      screen.getByText("O Compêndio Digital Interativo"),
    ).toBeInTheDocument();
    expect(screen.getByText("O Relatório Oficial")).toBeInTheDocument();
  });

  it("renders the article footer with logo", () => {
    render(<ArticleContentSection content={mockContent} />);
    const logo = screen.getByAltText("Itaicy");
    expect(logo).toBeInTheDocument();
  });
});
