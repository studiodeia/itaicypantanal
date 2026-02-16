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
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Duvidas sobre Observacao de Aves",
    description: "Respondemos as principais perguntas sobre birdwatching no Pantanal da Itaicy.",
    items: [
      {
        id: "bird-1",
        number: "01",
        question: "Quantas especies de aves e possivel avistar na Itaicy?",
        answer: "Nosso levantamento cientifico (survey Joao Andriola, maio 2024) catalogou 166 especies no entorno do lodge em apenas 5 dias de expedicao. O Pantanal abriga mais de 650 especies de aves, e a regiao de Miranda e um dos pontos de maior concentracao de avifauna do bioma.",
      },
      {
        id: "bird-2",
        number: "02",
        question: "Preciso ter experiencia em birdwatching para participar?",
        answer: "Nao. Nossas expedicoes sao adaptadas para todos os niveis, desde iniciantes curiosos ate birders experientes com listas de vida. Nossos guias especialistas ajudam na identificacao, explicam comportamentos e indicam os melhores angulos para fotografia. Fornecemos binoculos e guias de campo.",
      },
      {
        id: "bird-3",
        number: "03",
        question: "Qual a melhor epoca para observacao de aves no Pantanal?",
        answer: "A seca (maio a setembro) e ideal porque as aves se concentram proximo a fontes de agua, facilitando o avistamento. Porem, a epoca chuvosa (outubro a marco) atrai especies migratorias do hemisferio norte. Para araras-azuis e tuiuius, a seca e imbativel; para migratórias, visite entre outubro e dezembro.",
      },
      {
        id: "bird-4",
        number: "04",
        question: "Quais especies mais emblematicas posso avistar?",
        answer: "As especies mais iconicas incluem o Tuiuiu (ave-simbolo do Pantanal), Arara-Azul-Grande, Arara-Vermelha, Tucano-Toco, Gaviao-Real, Jabiru, Martin-Pescador-Grande e diversas especies de garças, socós e falcoes. Aves noturnas como a Coruja-Buraqueira e o Urutau tambem sao frequentes.",
      },
      {
        id: "bird-5",
        number: "05",
        question: "Que equipamento devo trazer para birdwatching?",
        answer: "Recomendamos: camera com teleobjetiva (300mm+), binoculos (8x42 ou 10x42), roupas em cores neutras (verde, marrom, bege), chapeu, protetor solar e repelente. Oferecemos binoculos de emprestimo e guias de campo para quem nao possui equipamento proprio. Nossos guias tambem auxiliam com dicas de fotografia.",
      },
    ],
  },
};
