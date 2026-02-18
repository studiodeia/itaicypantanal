import type { AcomodacoesPageContent } from "@shared/cms-page-content";
import type { LocalizedDefaults } from "@/lib/cms/page-content";

const pt: AcomodacoesPageContent = {
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
        answer: "A Itaicy foi planejada para atender diferentes perfis de hospede, desde o viajante solo ate familias que buscam uma experiencia imersiva no Pantanal. Oferecemos tres categorias de suite, cada uma com personalidade propria. A Suite Explorer e individual, pensada para quem viaja sozinho e quer privacidade e silencio para se reconectar com a natureza. A Suite Adventure foi desenhada para casais, com cama queen e varanda privativa ideal para momentos a dois. Ja a Suite Family e a mais ampla, com cama de casal e solteiro, acomodando ate tres pessoas com espaco de convivencia generoso. Todas as suites compartilham o mesmo padrao de conforto: ar-condicionado split individual, banheiro privativo com amenities completos, roupas de cama premium e varanda com vista direta para a paisagem do Pantanal, permitindo a observacao de aves logo ao amanhecer.",
      },
      {
        id: "acomod-2",
        number: "02",
        question: "O que esta incluso na diaria?",
        answer: "A proposta da Itaicy e oferecer uma estadia completa, onde o hospede nao precise se preocupar com custos adicionais ao longo do dia. A diaria inclui hospedagem em suite privativa com climatizacao individual, pensao completa com quatro refeicoes diarias — cafe da manha regional, almoco com ingredientes frescos do Pantanal, lanche da tarde e jantar autoral preparado pela nossa cozinha. Alem da alimentacao, estao inclusos agua filtrada, sucos naturais e cafe especial servidos ao longo do dia. No aspecto de experiencias, cada diaria contempla passeio de barco pelo rio Miranda e cavalgada guiada pelas trilhas da propriedade, ambos conduzidos por guias locais experientes. O hospede tambem tem acesso livre ao Wi-Fi via satelite nas areas sociais e a todos os espacos de convivencia do lodge, incluindo deck, restaurante e areas de descanso. Bebidas alcoolicas e atividades extras sob consulta.",
      },
      {
        id: "acomod-3",
        number: "03",
        question: "Qual a capacidade total da pousada?",
        answer: "A Itaicy foi concebida como um lodge de baixa densidade, priorizando a experiencia individual de cada hospede e o respeito ao ecossistema local. Contamos com 10 suites distribuidas em tres categorias — Explorer, Adventure e Family — que juntas acomodam ate 20 pessoas simultaneamente. Esse numero reduzido de hospedes e uma escolha deliberada, nao uma limitacao. Com grupos pequenos, cada passeio de barco, cavalgada e safari fotografico se torna mais intimo e produtivo, aumentando as chances de avistamento da fauna. O atendimento personalizado e outro beneficio direto: a equipe conhece cada hospede pelo nome e pode adaptar roteiros conforme preferencias individuais. Do ponto de vista ambiental, a capacidade controlada reduz a pressao sobre as trilhas, margens do rio e habitats sensiveis, mantendo o equilibrio essencial entre turismo responsavel e conservacao que define a identidade da Itaicy.",
      },
      {
        id: "acomod-4",
        number: "04",
        question: "A pousada tem Wi-Fi e sinal de celular?",
        answer: "Por estar localizada em uma regiao remota do Pantanal sul-mato-grossense, a conectividade na Itaicy e diferente do ambiente urbano, e isso faz parte da experiencia. Oferecemos Wi-Fi via satelite disponivel nas areas sociais do lodge — restaurante, deck panoramico e recepcao. A conexao e estavel o suficiente para enviar mensagens de texto, checar e-mails e compartilhar fotos nas redes sociais. No entanto, atividades de alto consumo de banda como videochamadas longas ou streaming de video podem apresentar instabilidade. Em relacao ao sinal de celular, as operadoras Vivo e Claro funcionam em pontos abertos da propriedade, especialmente proximo ao rio e nas areas elevadas. Muitos hospedes relatam que a desconexao parcial se torna um dos pontos altos da estadia, permitindo uma presenca real no ambiente e maior apreciacao dos sons, cores e ritmos do Pantanal ao redor.",
      },
      {
        id: "acomod-5",
        number: "05",
        question: "Como chego ate a pousada?",
        answer: "A Itaicy esta localizada no municipio de Miranda, no Mato Grosso do Sul, uma regiao estrategica que conecta o Pantanal a outros destinos turisticos do estado. A distancia ate Campo Grande, capital do estado, e de aproximadamente 240 km, percorridos em cerca de tres horas pela rodovia BR-262, inteiramente asfaltada. Para quem vem de Bonito, sao apenas 80 km, ou cerca de uma hora e meia de viagem. O aeroporto mais proximo e o Aeroporto Internacional de Campo Grande (CGR), que recebe voos diretos de Sao Paulo, Brasilia e outras capitais. A partir do aeroporto, oferecemos servico de transfer rodoviario sob consulta previa, com horarios coordenados aos voos. A estrada de acesso e pavimentada ate a entrada da propriedade, o que torna a chegada confortavel em qualquer epoca do ano, inclusive durante o periodo de chuvas.",
      },
    ],
  },
};

export const acomodacoesDefaults: LocalizedDefaults<"/acomodacoes"> = { pt, en: pt, es: pt };
