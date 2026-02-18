import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SiteFooterSection } from "./SiteFooterSection";

describe("SiteFooterSection — newsletter segmentation", () => {
  it("renders interest tags", () => {
    render(<SiteFooterSection />);
    expect(screen.getByText("Quero Pescar")).toBeInTheDocument();
    expect(screen.getByText("Quero Natureza")).toBeInTheDocument();
    expect(screen.getByText("Viagem em Família")).toBeInTheDocument();
  });

  it("toggles tag selection on click", () => {
    render(<SiteFooterSection />);
    const tag = screen.getByText("Quero Pescar");
    fireEvent.click(tag);
    expect(tag.closest("button")).toHaveClass("bg-[#ac8042]");
  });
});
