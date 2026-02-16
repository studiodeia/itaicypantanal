import type { CulinariaPageContent } from "@shared/cms-page-content";

export const culinariaDefaults: CulinariaPageContent = {
  hero: {
    label: "CULINÁRIA",
    heading: "Onde o Pantanal Vira Alimento",
    subtitle:
      "Ingredientes do rio e da terra, técnica internacional e alma pantaneira em cada prato.",
    scrollHint: "Deslize para baixo",
    backgroundImage: "/images/culinaria/hero-bg.webp",
  },
  manifesto: {
    segments: [
      { text: "A ", isHighlight: false },
      { text: "alma do Pantanal", isHighlight: true },
      {
        text: ", a técnica do mundo. Ingredientes locais colhidos no dia, ",
        isHighlight: false,
      },
      { text: "técnicas de alta gastronomia", isHighlight: true },
      {
        text: " e o tempo que cada prato merece — uma cozinha autoral que honra a terra e surpreende o paladar.",
        isHighlight: false,
      },
    ],
  },
  menu: {
    label: "NOSSO MENU",
    heading: "Galeria de experiências",
    body: [
      "Navegue pelas categorias e explore tudo o que espera por você. Conheça os peixes e carnes já inclusos na sua Pensão Completa. Descubra também os doces caseiros e nossa seleção especial de vinhos e drinks.",
    ],
    image: "",
    features: [
      { number: "01", title: "Carnes", description: "" },
      { number: "02", title: "Peixes", description: "" },
      { number: "03", title: "Massas", description: "" },
      { number: "04", title: "Doces", description: "" },
      { number: "05", title: "Bebidas", description: "" },
    ],
  },
  highlights: {
    heading: "Do Rio e da Horta à Sua Mesa",
    items: [
      {
        iconName: "Fish",
        title: "Peixes do Rio",
        description:
          "Destaque para o Dourado e outros peixes frescos, garantindo a rastreabilidade.",
      },
      {
        iconName: "Sprout",
        title: "Produtores Locais",
        description:
          "Uma breve menção ao apoio à comunidade e fazendas vizinhas.",
      },
      {
        iconName: "Flower2",
        title: "Horta da Casa",
        description:
          "(Se existir) Menção aos temperos e vegetais frescos colhidos no dia.",
      },
    ],
  },
  services: {
    label: "NOSSOS SERVIÇOS",
    heading: "O Ciclo da Sua Imersão Gastronômica",
    description:
      "Da alvorada ao anoitecer, sua experiência gastronômica está inclusa e conectada à sua expedição.",
    items: [
      {
        title: "Café da Manhã com Vista",
        description:
          "Desfrute do seu café observando o despertar do Pantanal.",
        image: "/images/culinaria-services-1",
      },
      {
        title: "Almoço no Refúgio",
        description: "",
        image: "/images/culinaria-services-2",
      },
      {
        title: "Jantar à Luz de Velas",
        description: "",
        image: "/images/culinaria-services-3",
      },
    ],
    buttonText: "Fazer uma reserva",
  },
  experience: {
    heading: "Sabor e Aconchego",
    body: [
      "O calor do fogo, o vinho, os sabores autênticos e o conforto de um refúgio no coração do Pantanal.",
    ],
    image: "/images/culinaria-experience-bg.webp",
  },
  crossSell: {
    heading: "O refúgio completo",
    description:
      "Agora que conheceu nossa cozinha, encontre a acomodação perfeita para sua imersão no Pantanal.",
    buttonText: "Conhecer acomodações",
    buttonHref: "/acomodacoes",
    image: "/images/culinaria-crosssell-2",
  },
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Duvidas sobre a Culinaria Pantaneira",
    description: "Tudo o que voce precisa saber sobre a gastronomia e as refeicoes na Itaicy.",
    items: [
      {
        id: "culinaria-1",
        number: "01",
        question: "As refeicoes estao inclusas na hospedagem?",
        answer: "Sim. Todas as refeicoes estao inclusas no regime de Pensao Completa: cafe da manha, almoco e jantar. Tambem oferecemos lanches e bebidas durante as atividades do dia. Dietas especiais (vegetariana, sem gluten, sem lactose) podem ser atendidas mediante aviso previo.",
      },
      {
        id: "culinaria-2",
        number: "02",
        question: "Quais pratos tipicos do Pantanal sao servidos?",
        answer: "Nosso cardapio inclui pratos icônicos como pacu assado na brasa, caldo de piranha, arroz carreteiro, farofa de banana, mojica de pintado, chipa e doces com frutas do cerrado. Cada prato e preparado com ingredientes frescos, muitos deles colhidos no dia de produtores locais da regiao de Miranda.",
      },
      {
        id: "culinaria-3",
        number: "03",
        question: "Voces servem bebidas alcoolicas?",
        answer: "Sim. Oferecemos uma selecao de vinhos, cervejas artesanais e drinks autorais inspirados em frutas e ingredientes do Pantanal. O consumo de bebidas alcoolicas premium pode ter custo adicional, dependendo do pacote contratado.",
      },
      {
        id: "culinaria-4",
        number: "04",
        question: "De onde vem os ingredientes usados na cozinha?",
        answer: "Priorizamos ingredientes locais e sazonais. Peixes vem do rio (apenas de fornecedores autorizados, nao da pesca esportiva), carnes de fazendas da regiao, e temperos e ervas da nossa propria horta. Essa rastreabilidade garante frescor, qualidade e apoio a economia da comunidade local.",
      },
      {
        id: "culinaria-5",
        number: "05",
        question: "A cozinha atende restricoes alimentares?",
        answer: "Sim. Nossa equipe de cozinha pode adaptar o cardapio para atender restricoes alimentares como vegetarianismo, veganismo, intolerancia a gluten, lactose ou alergias especificas. Basta nos informar no momento da reserva para que possamos preparar opcoes adequadas.",
      },
    ],
  },
};
