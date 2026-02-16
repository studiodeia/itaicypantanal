import type { BirdwatchingPageContent } from "@shared/cms-page-content";

export const birdwatchingDefaults: BirdwatchingPageContent = {
  hero: {
    label: "OBSERVAÇÃO DE AVES",
    heading: "Observação de Espécies Raras em Habitat Intocado",
    subtitle:
      "Uma experiência de observação única. Registre nossa avifauna em um dos santuários de aves mais ricos de todo o planeta.",
    scrollHint: "Deslize para baixo",
    backgroundImage: "/images/bird-hero-bg.webp",
  },
  manifesto: {
    segments: [
      { text: "Uma ", isHighlight: false },
      { text: "imersão contemplativa", isHighlight: true },
      {
        text: " que vai além do convencional. Guiamos com respeito em nosso santuário de ",
        isHighlight: false,
      },
      { text: "acesso exclusivo", isHighlight: true },
      { text: ".", isHighlight: false },
    ],
  },
  sobreNos: {
    label: "NOSSA FILOSOFIA",
    heading: "Observação Consciente e Imersiva",
    body: [
      "No coração do Pantanal, praticamos a observação de aves com respeito absoluto ao habitat natural.",
      "Cada expedição é planejada para minimizar o impacto ambiental, enquanto maximiza suas oportunidades de avistamento.",
    ],
    image: "/images/bird-about-1",
    features: [
      {
        number: "01",
        title: "Guias Experts",
        description:
          "Nossos guias possuem mais de 15 anos de experiência e conhecem intimamente os comportamentos e rotas de cada espécie.",
      },
      {
        number: "02",
        title: "Acesso Exclusivo",
        description:
          "Possuímos autorização do IBAMA para operar em áreas protegidas, longe do turismo convencional.",
      },
      {
        number: "03",
        title: "Imersão Contemplativa",
        description:
          "Oferecemos uma experiência que vai além do turismo, focada em uma imersão científica e verdadeiramente contemplativa.",
      },
    ],
  },
  highlights: {
    heading: "Por Que Escolher Nossa Expedição",
    items: [
      {
        iconName: "Bird",
        title: "166+ Espécies avistadas",
        description: "Registradas em apenas 5 dias de expedição",
      },
      {
        iconName: "ShieldCheck",
        title: "Acesso Exclusivo IBAMA",
        description: "Áreas protegidas com biodiversidade única",
      },
      {
        iconName: "Users",
        title: "Guias Especializados",
        description: "Ornitólogos certificados e fotógrafos experientes",
      },
    ],
  },
};
