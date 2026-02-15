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
};
