import type { PescaPageContent } from "@shared/cms-page-content";

export const pescaDefaults: PescaPageContent = {
  hero: {
    label: "PESCA ESPORTIVA",
    heading: "Pesca Esportiva de Alta Performance em Zonas Exclusivas",
    subtitle:
      "Uma operação de pesca esportiva de alto nível. Navegue por rios de acesso exclusivo, onde a pressão de pesca é mínima e os gigantes do Pantanal ainda reinam.",
    scrollHint: "Deslize para baixo",
    backgroundImage: "/images/pesca-hero-bg.webp",
  },
  manifesto: {
    segments: [
      { text: "A experiência de quem ", isHighlight: false },
      { text: "desbravou a Amazônia", isHighlight: true },
      {
        text: ", agora no Pantanal. Operamos com respeito absoluto ao peixe e foco total na sua ",
        isHighlight: false,
      },
      { text: "performance esportiva", isHighlight: true },
      { text: ".", isHighlight: false },
    ],
  },
  sobreNos: {
    label: "NOSSA FILOSOFIA",
    heading: "Alta Performance e Preservação",
    body: [
      "Trazemos ao Pantanal a expertise técnica de nossas 13 operações na Amazônia. Nossa estrutura é desenhada para o pescador esportivo que busca desafio técnico e troféus, em um ambiente onde a pressão de pesca é controlada e os gigantes do rio são respeitados.",
    ],
    image: "/images/pesca-about-1",
    features: [
      {
        number: "01",
        title: "Cota Zero (Pesque e Solte)",
        description:
          "Praticamos rigorosamente a conservação. O peixe é um troféu vivo que retorna ao rio, garantindo o equilíbrio do ecossistema e o futuro do esporte.",
      },
      {
        number: "02",
        title: "Zonas de Acesso Restrito",
        description:
          "Navegue por rios e corixos dentro de áreas protegidas e exclusivas, longe da competição e do ruído do turismo convencional.",
      },
      {
        number: "03",
        title: "Piloteiros Nativos",
        description:
          "Nossos guias nasceram na região e dominam a leitura do rio. Eles conhecem os pontos de caça do Dourado e as técnicas para maximizar sua performance.",
      },
    ],
  },
  highlights: {
    heading: "Por que pescar na Itaicy?",
    items: [
      {
        iconName: "Star",
        title: "Expertise de 13 Operações",
        description:
          "Trazemos o know-how de nossa rede de 13 pousadas flutuantes na Amazônia para garantir uma logística impecável.",
      },
      {
        iconName: "Sailboat",
        title: "Acesso Exclusivo",
        description:
          "Navegue em zonas de pesca protegidas e exclusivas, garantindo rios menos batidos e mais ativos.",
      },
      {
        iconName: "Fish",
        title: "O Reino do Dourado",
        description:
          "Nossa localização estratégica é o habitat ideal para o 'Rei do Rio', proporcionando batalhas inesquecíveis.",
      },
    ],
  },
  services: {
    label: "O SANTUÁRIO",
    heading: "Os Gigantes do Nosso Rio",
    description:
      "O Dourado é o rei, mas não reina sozinho. Nossas águas abrigam uma variedade incrível de desafios esportivos. Conheça seus adversários.",
    items: [
      {
        title: "Zebra do Pantanal",
        description:
          "Um dos peixes mais icônicos da região, conhecido por suas listras distintivas e força em batalhas de pesca.",
        image: "/images/pesca-fish-1",
      },
      {
        title: "Tucunaré",
        description:
          "Famoso entre os pescadores esportivos, o tucunaré é conhecido por sua agressividade e habilidade de luta.",
        image: "/images/pesca-fish-2",
      },
      {
        title: "Pacu",
        description:
          "Um peixe de carne saborosa, o pacu é alvo de muitas pescarias e intrigante por sua velocidade na água.",
        image: "/images/pesca-fish-3",
      },
      {
        title: "Dourado",
        description:
          "Considerado o rei dos rios, o dourado é famoso por sua luta intensa e é um dos mais procurados na pesca esportiva.",
        image: "/images/pesca-fish-4",
      },
    ],
    buttonText: "Ver guia de espécies completo",
    buttonHref: "#",
  },
};
