import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SiteFooterSection } from "./SiteFooterSection";

describe("SiteFooterSection - newsletter segmentation", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders interest tags including Descanso", () => {
    render(<SiteFooterSection />);
    expect(screen.getByText("Quero Pescar")).toBeInTheDocument();
    expect(screen.getByText("Quero Natureza")).toBeInTheDocument();
    expect(screen.getByText(/Viagem em Fam/i)).toBeInTheDocument();
    expect(screen.getByText("Descanso")).toBeInTheDocument();
  });

  it("toggles tag selection on click", () => {
    render(<SiteFooterSection />);
    const tag = screen.getByText("Quero Pescar");
    fireEvent.click(tag);
    expect(tag.closest("button")).toHaveClass("bg-[#ac8042]");
  });

  it("submits name, email and selected interests", async () => {
    const fetchMock = vi.fn(async () => ({
      ok: true,
      json: async () => ({ status: "ok" }),
    }));
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    render(<SiteFooterSection />);

    fireEvent.change(screen.getByTestId("input-name-newsletter"), {
      target: { value: "Lead Teste" },
    });
    fireEvent.change(screen.getByTestId("input-email-newsletter"), {
      target: { value: "lead.teste@example.com" },
    });
    fireEvent.click(screen.getByText("Descanso"));
    fireEvent.click(screen.getByTestId("button-newsletter-submit"));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/newsletter/subscribe",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.any(String),
        }),
      );
    });

    const firstCall = fetchMock.mock.calls[0] as unknown as [string, { body?: string }];
    const payload = JSON.parse(firstCall[1]?.body ?? "{}");

    expect(payload.name).toBe("Lead Teste");
    expect(payload.email).toBe("lead.teste@example.com");
    expect(payload.interests).toEqual(["Descanso"]);
  });
});
