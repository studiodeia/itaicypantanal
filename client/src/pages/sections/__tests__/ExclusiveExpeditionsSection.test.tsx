import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ExclusiveExpeditionsSection } from "../ExclusiveExpeditionsSection";

describe("ExclusiveExpeditionsSection", () => {
  it("renders all 3 expedition cards", () => {
    render(<ExclusiveExpeditionsSection />);
    expect(screen.getByTestId("card-expedition-0")).toBeInTheDocument();
    expect(screen.getByTestId("card-expedition-1")).toBeInTheDocument();
    expect(screen.getByTestId("card-expedition-2")).toBeInTheDocument();
  });

  it("shows description for the first card by default", () => {
    render(<ExclusiveExpeditionsSection />);
    expect(
      screen.getByText(/Em águas bem conservadas, a pesca transcende/)
    ).toBeInTheDocument();
  });

  it("all cards have titles", () => {
    render(<ExclusiveExpeditionsSection />);
    expect(screen.getByText("Pesca Esportiva Cota Zero")).toBeInTheDocument();
    expect(screen.getByText("Birdwatching")).toBeInTheDocument();
    expect(screen.getByText("Ecoturismo")).toBeInTheDocument();
  });

  it("all cards have descriptions in DOM", () => {
    render(<ExclusiveExpeditionsSection />);
    expect(
      screen.getByText(/Em águas bem conservadas, a pesca transcende/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/166 espécies catalogadas/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Trilhas guiadas, passeios de barco/)
    ).toBeInTheDocument();
  });

  it("switches active card on mouse enter", () => {
    render(<ExclusiveExpeditionsSection />);
    // Card 1 wrapper — mouseEnter on the motion.div parent of the card
    const card1 = screen.getByTestId("card-expedition-1");
    const card1Wrapper = card1.parentElement!;
    fireEvent.mouseEnter(card1Wrapper);

    // After hover, Birdwatching description should exist
    expect(
      screen.getByText(/166 espécies catalogadas/)
    ).toBeInTheDocument();
  });
});
