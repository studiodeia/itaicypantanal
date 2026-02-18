import type { NotFoundPageContent } from "@shared/cms-page-content";
import type { LocalizedDefaults } from "@/lib/cms/page-content";

const pt: NotFoundPageContent = {
  hero: {
    label: "404",
    heading: "Parece que você saiu um pouco da trilha.",
    description:
      "Acontece até com os exploradores mais experientes. A página que você procurava não foi encontrada ou pode ter sido movida.",
    scrollHint: "Deslize para baixo",
    backgroundImage: "/images/404-hero-bg.webp",
  },
  buttonText: "Voltar para o início",
};

export const notFoundDefaults: LocalizedDefaults<"/404"> = { pt, en: pt, es: pt };
