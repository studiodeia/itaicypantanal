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
        answer: "Na Itaicy, cada pacote de ecoturismo e planejado para oferecer uma vivencia completa do Pantanal, combinando atividades aquaticas, terrestres e contemplativas ao longo de toda a sua estadia nas margens do Rio Cuiaba. Os pacotes incluem passeios de barco pelo rio e seus corixos, safaris fotograficos com foco em aves como tuiuius e araras-azuis, trilhas ecologicas guiadas pela mata ciliar, focagem noturna para observar jacares e animais de habitos crepusculares, e sessoes de contemplacao ao nascer e por do sol pantaneiro. Todas as atividades sao conduzidas por guias nativos especializados que conhecem a regiao ha decadas e dominam tecnicas de rastreamento e identificacao de especies. A disponibilidade de cada passeio varia conforme a epoca do ano e as condicoes climaticas locais, garantindo que cada saida ocorra com seguranca e maximo aproveitamento das oportunidades de avistamento da fauna silvestre.",
      },
      {
        id: "eco-2",
        number: "02",
        question: "E seguro fazer ecoturismo no Pantanal?",
        answer: "A seguranca dos nossos hospedes e prioridade absoluta em cada expedicao que realizamos na Itaicy, e investimos continuamente em treinamento da equipe e atualizacao de equipamentos para manter esse padrao elevado durante todas as estacoes do ano. Sim, todas as expedicoes sao acompanhadas por guias experientes com mais de dez anos de vivencia no Pantanal, que conhecem profundamente os rios, trilhas e o comportamento da fauna local em diferentes epocas. Utilizamos embarcacoes com motores revisados periodicamente, coletes salva-vidas certificados, radio comunicacao via VHF e kit completo de primeiros socorros a bordo. Os roteiros seguem protocolos ambientais e operacionais rigorosos definidos em conjunto com orgaos de fiscalizacao regional. Alem disso, monitoramos diariamente o nivel do Rio Cuiaba e as condicoes meteorologicas para adaptar os horarios e trajetos de cada saida, garantindo sua seguranca sem comprometer a qualidade e a autenticidade da experiencia no bioma.",
      },
      {
        id: "eco-3",
        number: "03",
        question: "Quais animais e possivel avistar durante os passeios?",
        answer: "O Pantanal e reconhecido como um dos biomas mais ricos do planeta, abrigando mais de 4.700 especies catalogadas entre mamiferos, aves, repteis, peixes e plantas, o que torna cada saida a campo uma oportunidade unica e imprevisivel de contato direto com a vida selvagem em estado puro. Durante as expedicoes da Itaicy ao longo do Rio Cuiaba, e comum avistar jacares-do-pantanal tomando sol nas margens, capivaras em grandes grupos, ariranhas pescando nos corixos, tucanos, tuiuius, araras-azuis, cervos-do-pantanal e, com sorte, oncas-pintadas descansando a beira do rio ou atravessando os canais. Sucuris e diversas especies de corujas tambem aparecem com frequencia nos safaris noturnos. A diversidade varia entre as estacoes: na seca, os animais se concentram proximo aos rios, facilitando avistamentos; na cheia, aves migratorias como colhereiros e cabecas-secas, alem da reproducao de peixes, ampliam o espetaculo natural.",
      },
      {
        id: "eco-4",
        number: "04",
        question: "Qual a melhor epoca para ecoturismo no Pantanal?",
        answer: "O Pantanal se transforma de forma marcante ao longo do ano, e cada estacao oferece experiencias unicas que atraem viajantes com interesses distintos, desde fotografos de natureza ate observadores de aves e familias em busca de aventura e conexao com o bioma. A estacao seca, de maio a setembro, e a mais procurada: o nivel dos rios baixa consideravelmente, os animais se concentram nos poucos pontos de agua remanescentes e os avistamentos de jacares, capivaras, ariranhas e oncas-pintadas aumentam de forma significativa. A estacao chuvosa, de outubro a marco, revela paisagens dramaticas com campos inundados ate o horizonte, floracao intensa de piuvas e ipess e a reproducao de peixes e aves migratorias como o colhereiro e a cabeca-seca. Para fotografia de fauna, a seca e ideal. Para paisagens exuberantes e biodiversidade aquatica em plena atividade, a transicao entre estacoes oferece o cenario mais rico e surpreendente.",
      },
      {
        id: "eco-5",
        number: "05",
        question: "Preciso de preparo fisico para as atividades?",
        answer: "Nossos passeios foram cuidadosamente desenhados para proporcionar conforto e acessibilidade ao maior numero possivel de hospedes, desde criancas a partir de cinco anos acompanhadas por responsaveis ate viajantes da terceira idade, sem abrir mao da autenticidade e profundidade da experiencia no Pantanal. A maioria das atividades nao exige nenhum preparo fisico especial. Passeios de barco pelo Rio Cuiaba, safaris fotograficos e focagem noturna sao acessiveis para todas as idades e condicoes fisicas, pois o deslocamento e feito inteiramente em embarcacoes estaveis e confortaveis com assentos acolchoados. As trilhas ecologicas pela mata ciliar tem nivel leve a moderado, com percursos de ate tres quilometros em terreno predominantemente plano e sombreado. Sempre informamos o grau de dificuldade, a duracao estimada e as condicoes do trajeto antes de cada atividade, para que voce escolha com tranquilidade o roteiro que melhor se adapta ao seu perfil, ritmo e expectativas.",
      },
    ],
  },
};
