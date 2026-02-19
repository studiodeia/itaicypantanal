import { describe, it, expect } from "vitest";
import {
  getArticleBySlug,
  getRelatedArticles,
  getArticleUrl,
  categorySlugMap,
  slugToCategoryMap,
} from "./data";

describe("getArticleBySlug", () => {
  it("returns the featured article detail for its slug", () => {
    const article = getArticleBySlug("guia-observacao-166-especies-aves");
    expect(article).toBeDefined();
    expect(article!.title).toBe(
      "Guia de Observação: As 166 Espécies de Aves Vistas na Itaicy",
    );
    expect(article!.heroImage).toBeDefined();
    expect(article!.content.length).toBeGreaterThan(0);
  });

  it("returns undefined for unknown slug", () => {
    const article = getArticleBySlug("non-existent-slug");
    expect(article).toBeUndefined();
  });
});

describe("getRelatedArticles", () => {
  it("returns 3 related articles excluding the current one", () => {
    const related = getRelatedArticles("guia-observacao-166-especies-aves");
    expect(related).toHaveLength(3);
    expect(
      related.every((a) => a.slug !== "guia-observacao-166-especies-aves"),
    ).toBe(true);
  });
});

describe("getArticleUrl", () => {
  it("builds URL with primary category slug", () => {
    const url = getArticleUrl({
      slug: "arara-azul-pantanal",
      primaryCategory: "Conservação",
      categories: ["Conservação", "Aventura"],
      title: "",
      subtitle: "",
      tag: "",
      src: "",
      author: "",
      date: "",
      readingTime: "",
    });
    expect(url).toBe("/blog/conservacao/arara-azul-pantanal");
  });

  it("falls back to 'geral' for unknown category", () => {
    const url = getArticleUrl({
      slug: "test",
      primaryCategory: "Unknown",
      categories: ["Unknown"],
      title: "",
      subtitle: "",
      tag: "",
      src: "",
      author: "",
      date: "",
      readingTime: "",
    });
    expect(url).toBe("/blog/geral/test");
  });
});

describe("categorySlugMap", () => {
  it("maps display names to URL slugs", () => {
    expect(categorySlugMap["Aventura"]).toBe("aventura");
    expect(categorySlugMap["Conservação"]).toBe("conservacao");
    expect(categorySlugMap["Roteiros Guiados"]).toBe("roteiros-guiados");
  });
});

describe("slugToCategoryMap", () => {
  it("maps URL slugs back to display names", () => {
    expect(slugToCategoryMap["aventura"]).toBe("Aventura");
    expect(slugToCategoryMap["conservacao"]).toBe("Conservação");
    expect(slugToCategoryMap["roteiros-guiados"]).toBe(
      "Roteiros Guiados",
    );
  });
});
