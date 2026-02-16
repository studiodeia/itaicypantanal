import type { AcomodacoesPageContent } from "@shared/cms-page-content";

export const acomodacoesDefaults: AcomodacoesPageContent = {
  hero: {
    label: "ACOMODAÇÕES",
    heading: "Refúgios de Conforto Essencial",
    subtitle: "O seu ponto de partida para a imersão no Pantanal.",
    scrollHint: "Deslize para baixo",
    videoMp4: "/Vídeo_Pronto_e_Suave.mp4",
    videoWebm: "/video-pronto-suave.webm",
    videoMp4Low: "/video-pronto-suave-low.mp4",
    videoWebmLow: "/video-pronto-suave-low.webm",
    videoPoster: "/images/acomodacoes/suite-explorer.webp",
  },
  manifesto: {
    segments: [
      { text: "Nossos apartamentos são projetados para o ", isHighlight: false },
      { text: "conforto essencial", isHighlight: true },
      { text: ", garantindo que você tenha o ", isHighlight: false },
      { text: "refúgio perfeito", isHighlight: true },
      { text: " após um dia de expedição.", isHighlight: false },
    ],
  },
  highlights: {
    heading: "O Essencial da Sua Estadia",
    items: [
      { iconName: "UtensilsCrossed", title: "Gastronomia Full-Board", description: "Café da manhã, almoço com ingredientes locais, lanche da tarde e jantar autoral — tudo incluso" },
      { iconName: "GlassWater", title: "Open Bar & Bebidas Premium", description: "Água, sucos naturais, café especial e refrigerantes disponíveis durante toda a estadia" },
      { iconName: "Compass", title: "Expedições Privativas Inclusas", description: "Passeio de barco e cavalgada guiada inclusos — explore a fauna e flora com especialistas" },
      { iconName: "Fence", title: "Varanda com Vista para o Pantanal", description: "Todas as suítes possuem varanda privativa para contemplação e observação de aves" },
      { iconName: "Snowflake", title: "Climatização Individual", description: "Ar-condicionado split em todas as suítes para conforto em qualquer estação" },
      { iconName: "Wifi", title: "Conectividade Essencial", description: "Wi-Fi via satélite nas áreas sociais — desconecte-se do mundo, conecte-se ao Pantanal" },
    ],
  },
  rooms: [
    {
      title: "Suíte Explorer",
      description: "O refúgio ideal para o viajante solo que busca imersão total. Privacidade, silêncio e conexão com a natureza no seu próprio ritmo.",
      image: "/images/acomodacoes/suite-explorer.webp",
      ctaText: "Verificar disponibilidade",
      features: [
        { iconName: "BedSingle", label: "Cama Individual Premium" },
        { iconName: "Bath", label: "Banheiro Privativo" },
        { iconName: "Fence", label: "Varanda Intimista" },
        { iconName: "User", label: "1 Pessoa" },
      ],
    },
    {
      title: "Suíte Adventure",
      description: "Projetada para casais que buscam uma experiência a dois no coração do Pantanal. Conforto, natureza e momentos inesquecíveis.",
      image: "/images/acomodacoes/suite-adventure.webp",
      ctaText: "Verificar disponibilidade",
      features: [
        { iconName: "BedDouble", label: "Cama de Casal Premium" },
        { iconName: "Bath", label: "Banheiro Privativo" },
        { iconName: "Fence", label: "Varanda Privativa" },
        { iconName: "Users", label: "2 Pessoas" },
      ],
    },
    {
      title: "Suíte Family",
      description: "A mais espaçosa das nossas suítes. Perfeita para famílias ou pequenos grupos, com cama de casal, solteiro e ampla área de convivência.",
      image: "/images/acomodacoes/suite-family.webp",
      ctaText: "Verificar disponibilidade",
      features: [
        { iconName: "BedDouble", label: "Cama Casal + Solteiro" },
        { iconName: "Bath", label: "Banheiro Privativo" },
        { iconName: "Fence", label: "Varanda Ampla" },
        { iconName: "Users", label: "3 Pessoas" },
      ],
    },
  ],
  culinary: {
    label: "CULINÁRIA",
    heading: "O Sabor Autêntico do Pantanal",
    description: "Nossa gastronomia é focada no essencial: ingredientes locais frescos e um preparo cuidadoso, resultando em uma comida autêntica e reconfortante após um dia de expedição.",
    images: [
      { src: "/images/acomodacoes/culinaria-1.webp", alt: "Prato regional do Pantanal", tag: "Café da manhã" },
      { src: "/images/acomodacoes/culinaria-2.webp", alt: "Almoço preparado com ingredientes locais", tag: "Almoço" },
      { src: "/images/acomodacoes/culinaria-3.webp", alt: "Jantar sofisticado na pousada", tag: "Jantar" },
      { src: "/images/acomodacoes/culinaria-4.webp", alt: "Lanche e petiscos regionais", tag: "Lanche" },
    ],
    ctaText: "Conheça nossa gastronomia",
    ctaHref: "/culinaria",
  },
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Duvidas sobre Acomodacoes e Hospedagem",
    description: "Tudo o que voce precisa saber sobre a estrutura, quartos e comodidades da Itaicy.",
    items: [
      {
        id: "acomod-1",
        number: "01",
        question: "Quais tipos de suite estao disponiveis?",
        answer: "Oferecemos tres categorias: Suite Explorer (individual, ideal para viajantes solo), Suite Adventure (casal, com cama queen) e Suite Family (familia, com cama casal + solteiro). Todas possuem ar-condicionado, banheiro privativo, varanda com vista para o Pantanal e amenities completos.",
      },
      {
        id: "acomod-2",
        number: "02",
        question: "O que esta incluso na diaria?",
        answer: "A diaria inclui hospedagem em suite privativa, pensao completa (cafe da manha, almoco, lanche e jantar), agua e sucos naturais, passeio de barco e cavalgada guiada, Wi-Fi nas areas sociais e acesso a todas as areas de convivencia da pousada. Atividades adicionais e bebidas premium podem ter custo extra.",
      },
      {
        id: "acomod-3",
        number: "03",
        question: "Qual a capacidade total da pousada?",
        answer: "A Itaicy possui 10 suites, com capacidade para ate 20 hospedes simultaneamente. Essa estrutura enxuta e intencional: garante exclusividade, atendimento personalizado e o minimo impacto ambiental no entorno do lodge.",
      },
      {
        id: "acomod-4",
        number: "04",
        question: "A pousada tem Wi-Fi e sinal de celular?",
        answer: "Sim. Oferecemos Wi-Fi via satelite nas areas sociais (restaurante, deck, recepcao). O sinal e suficiente para mensagens e e-mails, mas pode nao suportar streaming pesado. Sinal de celular (Vivo e Claro) funciona em areas abertas. Recomendamos usar a estadia para desconectar e curtir a natureza.",
      },
      {
        id: "acomod-5",
        number: "05",
        question: "Como chego ate a pousada?",
        answer: "A Itaicy fica em Miranda, MS, a aproximadamente 240 km de Campo Grande (3h de carro) e 80 km de Bonito (1h30). O aeroporto mais proximo e o de Campo Grande (CGR). Oferecemos transfer sob consulta. A estrada e asfaltada ate a entrada da propriedade.",
      },
    ],
  },
};
