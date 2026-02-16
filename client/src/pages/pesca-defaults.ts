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
        answer: "O Pantanal possui uma sazonalidade bem definida que influencia diretamente a qualidade da pesca esportiva ao longo de todo o ano. A temporada oficial de pesca vai de marco a outubro, e o periodo de seca, entre maio e setembro, e amplamente reconhecido como o mais produtivo. Durante esses meses, o nivel dos rios baixa consideravelmente, e os peixes se concentram em pocoes e confluencias, tornando as capturas mais frequentes e as batalhas mais intensas. O pico de atividade do Dourado, nosso principal trofeu, ocorre entre maio e julho, quando a agua atinge temperaturas ideais e os cardumes se agrupam em pontos estrategicos de caca. Para o Pintado e o Cachara, o melhor periodo se estende ate agosto e setembro, quando esses predadores noturnos se tornam mais ativos nas aguas rasas. Nossos guias ajustam as estrategias conforme a fase da temporada para maximizar sua experiencia.",
      },
      {
        id: "pesca-2",
        number: "02",
        question: "O que significa pesca cota zero (pesque e solte)?",
        answer: "A politica de cota zero e um pilar central da pesca esportiva responsavel e representa o compromisso da Itaicy com a conservacao do ecossistema pantaneiro. Cota zero significa que todo peixe capturado durante a pescaria e cuidadosamente manuseado e devolvido vivo ao rio. Nao ha retirada de peixes em nenhuma circunstancia. Essa pratica garante a manutencao saudavel das populacoes de Dourado, Pintado, Pacu e demais especies, preservando o equilibrio ecologico das aguas e assegurando a perpetuacao da pesca esportiva para futuras geracoes de pescadores. Nossos guias sao treinados em tecnicas de manuseio que minimizam o estresse no peixe, incluindo uso de anzois sem farpa, alicates de soltura rapida e tempo controlado fora da agua para registros fotograficos. Na Itaicy, o Projeto Cota Zero e rigorosamente cumprido e fiscalizado, reafirmando que o verdadeiro trofeu e a experiencia da batalha e o respeito ao rio.",
      },
      {
        id: "pesca-3",
        number: "03",
        question: "Quais especies posso pescar na Itaicy?",
        answer: "Os rios que cercam a Itaicy estao entre os mais biodiversos do Pantanal, oferecendo ao pescador esportivo uma variedade impressionante de adversarios aquaticos. As principais especies alvo sao o Dourado, conhecido como o 'Rei do Rio' por sua forca explosiva e saltos acrobaticos, o Pintado e o Cachara, grandes predadores de fundo que podem ultrapassar 20 quilos, o Pacu, famoso pela resistencia e arranques potentes, a Piraputanga, agil e desafiadora com iscas artificiais, o Barbado, que proporciona brigas longas em aguas profundas, e o Tucunare, agressivo e combativo nas lagoas marginais. No total, nossos rios abrigam mais de 260 especies catalogadas de peixes, criando um ecossistema rico e equilibrado. Nossos guias adaptam as tecnicas e equipamentos conforme a especie desejada, garantindo que cada saida de pesca ofereca um desafio esportivo unico e memoravel para pescadores de todos os niveis.",
      },
      {
        id: "pesca-4",
        number: "04",
        question: "Preciso levar meu proprio equipamento de pesca?",
        answer: "Sabemos que cada pescador tem suas preferencias pessoais de equipamento, e nossa operacao e flexivel para atender tanto quem viaja leve quanto quem traz seu proprio arsenal. Nao e obrigatorio trazer equipamento. Oferecemos um arsenal completo de alta performance que inclui varas de acao media e pesada, carretilhas de perfil baixo, linhas multifilamento e uma selecao variada de iscas artificiais como plugs de superficie, jerkbaits e colheres, todas escolhidas especificamente para as especies da regiao. Porem, se voce possui equipamento proprio e prefere utiliza-lo, e totalmente bem-vindo a traze-lo. Muitos pescadores experientes preferem suas varas e carretilhas ja ajustadas ao seu estilo de arremesso. Nossos guias podem orientar sobre o melhor setup para cada especie alvo e condicao do rio, recomendando ajustes de drag, tipo de linha e iscas ideais conforme o nivel da agua e o comportamento dos peixes naquele periodo.",
      },
      {
        id: "pesca-5",
        number: "05",
        question: "Os guias de pesca sao locais?",
        answer: "A qualidade dos guias de pesca e um dos fatores que mais influenciam o sucesso de uma expedicao esportiva, e na Itaicy esse e um diferencial inegociavel. Sim, todos os nossos piloteiros e guias nasceram e cresceram na regiao pantaneira. Eles possuem um conhecimento profundo e transmitido por geracoes sobre os rios, os habitos alimentares e reprodutivos dos peixes e as melhores tecnicas para cada situacao. Dominam a leitura do rio com precisao, identificando correntezas, estruturas submersas e pontos de emboscada onde os grandes exemplares de Dourado, Pintado e Cachara se concentram em cada epoca do ano. Alem da expertise tecnica, nossos guias conhecem os ciclos sazonais de cheia e seca, ajustando rotas e estrategias diariamente. Essa combinacao de vivencia local e dedicacao ao esporte garante que voce esteja sempre no lugar certo, na hora certa, com a tecnica adequada.",
      },
    ],
  },
};
