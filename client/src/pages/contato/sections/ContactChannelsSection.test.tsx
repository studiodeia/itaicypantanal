import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactChannelsSection } from "./ContactChannelsSection";

describe("ContactChannelsSection", () => {
  it("renders the section heading", () => {
    render(<ContactChannelsSection />);
    expect(
      screen.getByTestId("text-channels-heading"),
    ).toHaveTextContent("Nossos Canais de Atendimento");
  });

  it("renders three channel cards", () => {
    render(<ContactChannelsSection />);
    expect(screen.getByTestId("card-channel-0")).toBeInTheDocument();
    expect(screen.getByTestId("card-channel-1")).toBeInTheDocument();
    expect(screen.getByTestId("card-channel-2")).toBeInTheDocument();
  });

  it("renders correct contact info", () => {
    render(<ContactChannelsSection />);
    expect(screen.getByText("(65) 9 9640-2380")).toBeInTheDocument();
    expect(
      screen.getByText("contato@pousadaitaicy.com.br"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Santo Antônio do Leverger, MT, 78180-000"),
    ).toBeInTheDocument();
  });

  it("renders the map container", () => {
    render(<ContactChannelsSection />);
    expect(screen.getByTestId("map-container")).toBeInTheDocument();
  });
});
