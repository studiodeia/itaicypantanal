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

const en: NotFoundPageContent = {
  hero: {
    label: "404",
    heading: "It seems you strayed a little off the trail.",
    description:
      "It happens to even the most seasoned explorers. The page you were looking for wasn't found or may have been moved.",
    scrollHint: "Scroll down",
    backgroundImage: "/images/404-hero-bg.webp",
  },
  buttonText: "Back to home",
};

const es: NotFoundPageContent = {
  hero: {
    label: "404",
    heading: "Parece que te alejaste un poco del sendero.",
    description:
      "Les pasa hasta a los exploradores más experimentados. La página que buscabas no fue encontrada o puede haber sido movida.",
    scrollHint: "Desliza hacia abajo",
    backgroundImage: "/images/404-hero-bg.webp",
  },
  buttonText: "Volver al inicio",
};

export const notFoundDefaults: LocalizedDefaults<"/404"> = { pt, en, es };
