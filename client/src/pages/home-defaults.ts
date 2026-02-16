import type { HomePageContent } from "@shared/cms-page-content";

export const homeDefaults: HomePageContent = {
  aboutUs: {
    label: "SOBRE NÓS",
    heading: "Bem-vindo ao Nosso Refúgio Natural",
    body: [
      "Localizada no coração de uma das regiões mais biodiversas do mundo, nossa pousada oferece uma experiência única de conexão com a natureza.",
      "Com mais de 15 anos de experiência em ecoturismo, nos dedicamos a proporcionar momentos inesquecíveis enquanto preservamos e protegemos nosso ambiente natural.",
    ],
    image: "/images/home/about-us.webp",
    features: [
      {
        number: "01",
        title: "Sustentabilidade",
        description: "Práticas eco-friendly em todas as nossas operações",
      },
      {
        number: "02",
        title: "Excelência",
        description: "Guias especializados e equipamentos de primeira linha",
      },
      {
        number: "03",
        title: "Hospitalidade",
        description: "Atendimento personalizado para cada hóspede",
      },
    ],
  },
  expeditions: {
    label: "NOSSOS SERVIÇOS",
    heading: "Expedições Exclusivas no Coração do Pantanal",
    description:
      "Nossas atividades são desenhadas para uma conexão profunda com o ecossistema. Escolha a sua expedição.",
    items: [
      {
        title: "Pesca Esportiva Cota Zero",
        description:
          "Em águas privativas, a pesca transcende, uma imersão tática com guias que leem o rio.",
        backgroundImage: "/images/home/expedition-pesca.webp",
      },
      {
        title: "Birdwatching",
        description:
          "166 espécies catalogadas em nosso santuário. Guias ornitólogos conduzem expedições imersivas ao amanhecer.",
        backgroundImage: "/images/home/expedition-birdwatching.webp",
      },
      {
        title: "Ecoturismo",
        description:
          "Trilhas guiadas, passeios de barco e safáris fotográficos no coração do Pantanal intocado.",
        backgroundImage: "/images/home/expedition-ecoturismo.webp",
      },
    ],
    buttonText: "Quero conhecer",
  },
  stats: {
    items: [
      { target: 2000, suffix: "+", label: "HÓSPEDES SATISFEITOS" },
      { target: 166, suffix: "+", label: "AVES AVISTADAS" },
      { target: 15, suffix: "+", label: "ANOS DE EXPERIÊNCIA" },
      { target: 4.9, suffix: "", label: "AVALIAÇÃO MÉDIA", hasIcon: true },
    ],
  },
  accommodation: {
    label: "ACOMODAÇÕES",
    heading: "Descanso autêntico no coração selvagem",
    body: "Nossas acomodações são projetadas para o descanso e a imersão. Confortáveis, climatizadas e com vista para a natureza intocada, elas são o ponto de partida perfeito para sua aventura no Pantanal.",
    buttonReserve: "Reservar",
    buttonDetails: "Mais detalhes",
    backgroundImage: "/images/home/accommodations-bg.webp",
  },
  impact: {
    label: "NOSSO IMPACTO",
    heading: "Compromisso com a Natureza, Impacto na Comunidade",
    items: [
      {
        number: "01",
        title: "Biodiversidade Exclusiva",
        description:
          "Acesso a áreas protegidas onde 166 espécies de aves foram catalogadas.",
      },
      {
        number: "02",
        title: "Apoio Comunitário",
        description:
          "Parte de nossa receita é revertida diretamente para as comunidades indígenas locais.",
      },
      {
        number: "03",
        title: "Preservação Oficial",
        description:
          "Somos os únicos com autorização do IBAMA para operar em milhões de hectares protegidos.",
      },
    ],
    image: "/images/home/impact.webp",
  },
  blog: {
    label: "BLOG",
    heading: "Diário do Pantanal",
    description:
      "O que nossos viajantes dizem sobre a experiência autêntica de se desconectar na natureza selvagem da Itaicy Ecoturismo.",
    buttonText: "Ver todos",
  },
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Duvidas sobre o Pantanal e a Itaicy",
    description: "Respondemos as principais perguntas sobre a regiao, a pousada e as experiencias que oferecemos.",
    items: [
      {
        id: "home-1",
        number: "01",
        question: "A pousada e destinada apenas para pesca?",
        answer: "Nao. A Itaicy oferece tres experiencias principais: pesca esportiva cota zero (catch-and-release), observacao de aves (birdwatching com 166 especies catalogadas) e ecoturismo (trilhas, safaris fotograficos, passeios de barco). Tambem e ideal para casais, familias e fotografos de natureza que buscam imersao no Pantanal.",
      },
      {
        id: "home-2",
        number: "02",
        question: "Onde fica a Itaicy Pantanal Eco Lodge?",
        answer: "Estamos localizados em Miranda, Mato Grosso do Sul, no coracao do Pantanal Sul-Matogrossense (Patrimonio Natural da Humanidade - UNESCO). Ficamos a 240 km de Campo Grande (3h de carro) e 80 km de Bonito (1h30). O acesso e por estrada asfaltada ate a entrada da propriedade.",
      },
      {
        id: "home-3",
        number: "03",
        question: "Qual a melhor epoca para visitar o Pantanal?",
        answer: "Cada estacao oferece experiencias unicas. A seca (maio a setembro) e ideal para pesca esportiva e avistamento de fauna concentrada. A cheia (outubro a marco) revela paisagens dramaticas e aves migratorias. Para birdwatching, a seca e imbativel; para paisagens e fotografia, a transicao entre estacoes.",
      },
      {
        id: "home-4",
        number: "04",
        question: "As experiencias sao guiadas?",
        answer: "Sim. Todas as atividades sao acompanhadas por guias nativos especializados que nasceram na regiao e conhecem profundamente o bioma, os rios, os habitos da fauna e as melhores tecnicas para cada experiencia. Nossos guias sao certificados e seguem protocolos ambientais rigorosos.",
      },
      {
        id: "home-5",
        number: "05",
        question: "Posso personalizar meu roteiro?",
        answer: "Sim. Nossa equipe pode ajustar o pacote de acordo com seus interesses (pesca, aves, fotografia, contemplacao), a epoca do ano e a duracao da estadia. Oferecemos roteiros de 3 a 7 noites, com combinacoes de atividades adaptadas ao seu perfil e objetivos de viagem.",
      },
    ],
  },
};
