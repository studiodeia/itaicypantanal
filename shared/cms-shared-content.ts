export type FooterLink = {
  label: string;
  href: string;
};

export type FooterContact = {
  icon: string;
  text: string;
};

export type FaqItem = {
  id: string;
  number: string;
  question: string;
  answer: string;
};

export type TestimonialItem = {
  title: string;
  quote: string;
  author: string;
};

export type HomeManifestoSegment = {
  text: string;
  color: string;
};

export type SharedCmsSections = {
  immersionCta: {
    heading: string;
    description: string;
    backgroundImage: string;
  };
  faq: {
    label: string;
    heading: string;
    description: string;
    items: FaqItem[];
  };
  testimonials: {
    label: string;
    heading: string;
    description: string;
    items: TestimonialItem[];
  };
  footer: {
    mobileNavLinks: FooterLink[];
    pousadaLinks: FooterLink[];
    experienciasLinks: FooterLink[];
    contactInfo: FooterContact[];
    legalLinks: FooterLink[];
    heading: string;
    newsletterLabel: string;
    newsletterInterests: string[];
    newsletterInputPlaceholder: string;
    newsletterButtonLabel: string;
    bottomDescription: string;
    copyright: string;
  };
  homeHero: {
    heading: string;
    subtitle: string;
    bookingHeading: string;
    bookingDescription: string;
  };
  homeManifesto: {
    label: string;
    segments: HomeManifestoSegment[];
    detailsButtonLabel: string;
  };
};

export const defaultSharedCmsSections: SharedCmsSections = {
  immersionCta: {
    heading: "Sua imersao no Pantanal selvagem comeca aqui.",
    description:
      "Uma experiencia autentica de ecoturismo, observacao de aves ou pesca esportiva espera por voce. Selecione as datas da sua expedicao e garanta seu lugar em nosso refugio.",
    backgroundImage: "/images/culinaria-cta-bg.webp",
  },
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Ainda possui alguma duvida?",
    description:
      "Respondemos as principais duvidas para que sua unica preocupacao seja aproveitar a imersao na natureza selvagem.",
    items: [
      {
        id: "item-1",
        number: "01",
        question: "A pousada e destinada apenas para pesca?",
        answer:
          "Nao. A Itaicy oferece experiencias de pesca esportiva, observacao de aves, ecoturismo e imersoes para familias e casais.",
      },
      {
        id: "item-2",
        number: "02",
        question: "Como funciona o acesso as areas exclusivas?",
        answer:
          "Nossos roteiros seguem protocolos ambientais e operacionais proprios para garantir seguranca e baixo impacto no bioma.",
      },
      {
        id: "item-3",
        number: "03",
        question: "As experiencias sao guiadas?",
        answer:
          "Sim. Todas as atividades sao acompanhadas por equipe especializada e guias com conhecimento local.",
      },
      {
        id: "item-4",
        number: "04",
        question: "Existe opcao para grupos e familias?",
        answer:
          "Sim. Temos configuracoes de hospedagem e roteiro adaptadas para diferentes perfis de viajantes.",
      },
      {
        id: "item-5",
        number: "05",
        question: "Posso personalizar meu roteiro?",
        answer:
          "Sim. Nossa equipe comercial pode ajustar o pacote de acordo com a disponibilidade e o objetivo da viagem.",
      },
    ],
  },
  testimonials: {
    label: "DEPOIMENTOS",
    heading: "Relatos de quem viveu a real imersao",
    description:
      "O que nossos viajantes dizem sobre a experiencia autentica de se desconectar na natureza selvagem da Itaicy Ecoturismo.",
    items: [
      {
        title: "Experiencia inesquecivel",
        quote:
          '"Elegancia essencial em harmonia com o bioma. Uma experiencia autentica e profundamente transformadora."',
        author: "Lucas Vieira, BRA",
      },
      {
        title: "Atendimento impecavel",
        quote:
          '"Equipe preparada, estrutura excelente e roteiros com muito cuidado ambiental. Voltaremos com certeza."',
        author: "Fernanda A., BRA",
      },
      {
        title: "Conexao real com a natureza",
        quote:
          '"A observacao de aves foi acima da expectativa. Organizacao, seguranca e curadoria de alto nivel."',
        author: "Rafael M., BRA",
      },
    ],
  },
  footer: {
    mobileNavLinks: [
      { label: "Pousada", href: "/" },
      { label: "Experiencias", href: "/ecoturismo" },
      { label: "Fale conosco", href: "/contato" },
    ],
    pousadaLinks: [
      { label: "Home", href: "/" },
      { label: "Acomodacoes", href: "/acomodacoes" },
      { label: "Culinaria", href: "/culinaria" },
      { label: "Nosso Impacto", href: "/nosso-impacto" },
      { label: "Blog", href: "/blog" },
    ],
    experienciasLinks: [
      { label: "Observacao de passaros", href: "/observacao-de-aves" },
      { label: "Pesca Esportiva", href: "/pesca" },
      { label: "Ecoturismo Imersivo", href: "/ecoturismo" },
    ],
    contactInfo: [
      { icon: "/images/icons/call.png", text: "+55 (67) 99999-9999" },
      { icon: "/images/icons/mail.png", text: "reservas@pousadaitaicy.com.br" },
      {
        icon: "/images/icons/location-on.png",
        text: "Pantanal Sul-Mato-Grossense, Mato Grosso do Sul, Brasil",
      },
    ],
    legalLinks: [
      { label: "Politica de Privacidade", href: "/politica-de-privacidade" },
      { label: "Politica de Cookies", href: "/politica-de-privacidade" },
      { label: "Sitemap", href: "/sitemap.xml" },
      { label: "Termos de Uso", href: "/politica-de-privacidade" },
    ],
    heading: "O Pantanal como voce nunca sentiu.",
    newsletterLabel: "Diario de Campo Itaicy",
    newsletterInterests: ["Quero Pescar", "Quero Natureza", "Viagem em Família"],
    newsletterInputPlaceholder: "Seu e-mail",
    newsletterButtonLabel: "Enviar",
    bottomDescription:
      "Um refugio genuino e sofisticado no coracao do Pantanal. Experiencias aut autenticas para quem busca natureza, conforto e exclusividade.",
    copyright:
      "© 2025 Itaicy Pantanal Eco Lodge. Todos os direitos reservados.",
  },
  homeHero: {
    heading: "O Pantanal como voce nunca sentiu.",
    subtitle:
      "Elegancia essencial em harmonia com o bioma. Uma experiencia de imersao autentica, sem excessos e sem concessoes.",
    bookingHeading: "Procure por uma data especial",
    bookingDescription:
      "Selecione o periodo ideal para sua viagem e descubra experiencias exclusivas no coracao do Pantanal.",
  },
  homeManifesto: {
    label: "MANIFESTO",
    segments: [
      {
        text: "Onde o luxo nao e o que se ve, mas o que se sente. Acesso exclusivo ao ",
        color: "#e3f7ec",
      },
      { text: "Pantanal real", color: "#d6a35d" },
      { text: ". ", color: "#e3f7ec" },
      { text: "Uma ", color: "#e3f7ec" },
      { text: "imersao autentica", color: "#d6a35d" },
      { text: ", longe de tudo.", color: "#e3f7ec" },
    ],
    detailsButtonLabel: "Mais detalhes",
  },
};
