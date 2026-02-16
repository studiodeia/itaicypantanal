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
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Duvidas sobre Pesca Esportiva",
    description: "Respondemos as principais perguntas sobre a operacao de pesca no Pantanal da Itaicy.",
    items: [
      {
        id: "pesca-1",
        number: "01",
        question: "Qual e a melhor epoca para pescar no Pantanal?",
        answer: "A temporada de pesca vai de marco a outubro. O periodo de seca (maio a setembro) e o mais indicado, pois os rios estao mais baixos e os peixes se concentram em pocoes, facilitando a pesca esportiva. O pico de atividade do Dourado ocorre entre maio e julho.",
      },
      {
        id: "pesca-2",
        number: "02",
        question: "O que significa pesca cota zero (pesque e solte)?",
        answer: "Cota zero significa que todo peixe capturado e devolvido vivo ao rio. Nao ha retirada de peixes. Essa pratica garante a conservacao das especies, a manutencao do equilibrio ecologico e a perpetuacao da pesca esportiva para futuras geracoes. Na Itaicy, o Projeto Cota Zero e rigorosamente cumprido.",
      },
      {
        id: "pesca-3",
        number: "03",
        question: "Quais especies posso pescar na Itaicy?",
        answer: "As principais especies sao: Dourado (o 'Rei do Rio'), Pintado, Pacu, Piraputanga, Cachara, Barbado e Tucunare. Nossos rios abrigam mais de 260 especies de peixes, com destaque para os grandes predadores esportivos.",
      },
      {
        id: "pesca-4",
        number: "04",
        question: "Preciso levar meu proprio equipamento de pesca?",
        answer: "Nao e obrigatorio. Oferecemos equipamento completo de alta performance (varas, carretilhas, iscas artificiais). Porem, se voce possui equipamento proprio e prefere usa-lo, e bem-vindo. Nossos guias podem orientar sobre o melhor setup para cada especie e condicao do rio.",
      },
      {
        id: "pesca-5",
        number: "05",
        question: "Os guias de pesca sao locais?",
        answer: "Sim. Nossos piloteiros e guias nasceram na regiao e possuem conhecimento profundo dos rios, dos habitos dos peixes e das melhores tecnicas. Eles dominam a leitura do rio e sabem exatamente onde os grandes exemplares se concentram em cada epoca do ano.",
      },
    ],
  },
};
