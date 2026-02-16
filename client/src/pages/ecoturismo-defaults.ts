import type { EcoturismoPageContent } from "@shared/cms-page-content";

export const ecoturismoDefaults: EcoturismoPageContent = {
  hero: {
    label: "ECOTURISMO",
    heading: "Imersão Autêntica na Natureza Selvagem do Pantanal",
    subtitle:
      "Passeios guiados que revelam a essência do bioma mais biodiverso do planeta. Cada experiência é uma conexão profunda com a vida selvagem.",
    scrollHint: "Deslize para baixo",
    backgroundImage: "/images/eco-hero-bg.webp",
  },
  manifesto: {
    segments: [
      { text: "Uma experiência que vai além do ", isHighlight: false },
      { text: "turismo convencional", isHighlight: true },
      {
        text: ". Cada passeio é uma imersão guiada no coração de um dos ",
        isHighlight: false,
      },
      { text: "ecossistemas mais ricos", isHighlight: true },
      { text: " do planeta.", isHighlight: false },
    ],
  },
  sobreNos: {
    label: "NOSSA FILOSOFIA",
    heading: "Conexão Autêntica com o Bioma",
    body: [
      "Às margens do Rio Cuiabá, oferecemos uma seleção de passeios que proporcionam uma imersão completa na natureza do Pantanal.",
      "Todos os passeios são acompanhados por guias especializados, garantindo segurança, conforto e uma experiência autêntica neste bioma singular.",
    ],
    image: "/images/eco-about-1",
    features: [
      {
        number: "01",
        title: "Guias Nativos",
        description:
          "Nossos piloteiros e guias nasceram no Pantanal. Eles conhecem cada trilha, cada som e cada comportamento animal da região.",
      },
      {
        number: "02",
        title: "Baixo Impacto",
        description:
          "Operamos com grupos reduzidos e protocolos rigorosos para minimizar nossa presença no habitat natural.",
      },
      {
        number: "03",
        title: "Experiência Imersiva",
        description:
          "Do nascer ao pôr do sol, cada momento é pensado para conectar você de forma autêntica com a vida selvagem do Pantanal.",
      },
    ],
  },
  highlights: {
    heading: "Por Que Explorar com a Itaicy",
    items: [
      {
        iconName: "Compass",
        title: "Roteiros Exclusivos",
        description:
          "Acesso a áreas restritas do Rio Cuiabá e seus afluentes, longe do turismo de massa.",
      },
      {
        iconName: "ShieldCheck",
        title: "Segurança Total",
        description:
          "Guias experientes e equipamentos de primeira linha em todas as expedições.",
      },
      {
        iconName: "Sunrise",
        title: "Experiências Únicas",
        description:
          "Do nascer ao pôr do sol, cada passeio revela uma face diferente do Pantanal.",
      },
    ],
  },
  services: {
    label: "AS EXPEDIÇÕES",
    heading: "Nossos Passeios",
    description:
      "Cada passeio é uma oportunidade de vivenciar o Pantanal de forma única. Nossos guias nativos garantem avistamentos memoráveis e segurança em cada expedição.",
    items: [
      {
        title: "Passeio de Barco ao Pôr do Sol",
        description:
          "Navegação pelos canais e corixos do Rio Cuiabá, com o espetáculo do pôr do sol refletido nas águas e a tradicional pesca de piranhas.",
        image: "/images/eco-activity-1",
      },
      {
        title: "Safári Noturno",
        description:
          "Aventure-se pelo rio à noite e observe jacarés, capivaras, ariranhas e corujas em seu habitat natural.",
        image: "/images/eco-activity-2",
      },
      {
        title: "Nascer do Sol Pantaneiro",
        description:
          "Saídas ao amanhecer para vivenciar o despertar da vida no Pantanal. Cores, sons e os primeiros movimentos dos animais.",
        image: "/images/eco-activity-3",
      },
      {
        title: "Trilhas Ecológicas",
        description:
          "Caminhadas pelos arredores da pousada, ideais para observação de aves, mamíferos e da exuberante flora nativa.",
        image: "/images/eco-activity-4",
      },
    ],
    buttonText: "Ver todos os passeios disponíveis",
    buttonHref: "#",
  },
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Duvidas sobre Ecoturismo no Pantanal",
    description: "Tudo o que voce precisa saber sobre nossas expedicoes e atividades de ecoturismo.",
    items: [
      {
        id: "eco-1",
        number: "01",
        question: "Quais atividades de ecoturismo estao incluidas no pacote?",
        answer: "Os pacotes incluem passeios de barco, safaris fotograficos, trilhas ecologicas guiadas, focagem noturna (safari noturno) e observacao do nascer e por do sol. Todas as atividades sao conduzidas por guias nativos especializados. A disponibilidade varia conforme a epoca do ano e condicoes climaticas.",
      },
      {
        id: "eco-2",
        number: "02",
        question: "E seguro fazer ecoturismo no Pantanal?",
        answer: "Sim. Todas as expedicoes sao acompanhadas por guias experientes que conhecem profundamente a regiao. Utilizamos embarcacoes equipadas com coletes salva-vidas, radio comunicacao e kit de primeiros socorros. Os roteiros seguem protocolos ambientais e operacionais rigorosos para garantir sua seguranca.",
      },
      {
        id: "eco-3",
        number: "03",
        question: "Quais animais e possivel avistar durante os passeios?",
        answer: "O Pantanal abriga mais de 4.700 especies. Durante as expedicoes, e comum avistar jacarés, capivaras, ariranhas, tucanos, tuiuius, araras-azuis, cervos-do-pantanal, onças-pintadas (com sorte), sucuris e centenas de especies de aves. A diversidade varia entre as estacoes seca e chuvosa.",
      },
      {
        id: "eco-4",
        number: "04",
        question: "Qual a melhor epoca para ecoturismo no Pantanal?",
        answer: "Cada epoca oferece experiencias unicas. A seca (maio a setembro) facilita o avistamento de animais nos rios e lagoas. A cheia (outubro a marco) revela paisagens dramaticas e a reproducao de diversas especies. Para fotografia de fauna, a seca e ideal; para paisagens, a transicao entre estacoes.",
      },
      {
        id: "eco-5",
        number: "05",
        question: "Preciso de preparo fisico para as atividades?",
        answer: "A maioria das atividades nao exige preparo fisico especial. Passeios de barco, safaris e focagem noturna sao acessiveis para todas as idades. Trilhas ecologicas tem nivel leve a moderado. Sempre informamos o grau de dificuldade antes de cada atividade para que voce escolha o que melhor se adapta ao seu perfil.",
      },
    ],
  },
};
