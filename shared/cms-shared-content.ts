import type { CmsAuthorProfile, CmsSeasonalEvent, CmsAggregateRating } from "./cms-page-content";

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
    pousadaHeading: string;
    experienciasHeading: string;
    contactHeading: string;
    newsletterLabel: string;
    newsletterInterests: string[];
    newsletterInputPlaceholder: string;
    newsletterButtonLabel: string;
    bottomDescription: string;
    copyright: string;
  };
  homeHero: {
    heading: string;
    headingAccent?: string;
    subtitle: string;
    bookingHeading: string;
    bookingDescription: string;
    bookingStep1Label: string;
    bookingDisclaimer: string;
    bookingDisclaimerPrefix: string;
    bookingDisclaimerHighlight: string;
  };
  homeManifesto: {
    label: string;
    segments: HomeManifestoSegment[];
    detailsButtonLabel: string;
  };
  authors?: CmsAuthorProfile[];
  seasonalEvents?: CmsSeasonalEvent[];
  aggregateRating?: CmsAggregateRating;
};

export const defaultSharedCmsSections: SharedCmsSections = {
  immersionCta: {
    heading: "Sua imersão no Pantanal selvagem começa aqui.",
    description:
      "Uma experiência autêntica de ecoturismo, observação de aves ou pesca esportiva espera por você. Selecione as datas da sua expedição e garanta seu lugar em nosso refúgio.",
    backgroundImage: "/images/culinaria-cta-bg.webp",
  },
  faq: {
    label: "PERGUNTAS FREQUENTES",
    heading: "Ainda possui alguma dúvida?",
    description:
      "Respondemos as principais dúvidas para que sua única preocupação seja aproveitar a imersão na natureza selvagem.",
    items: [
      {
        id: "item-1",
        number: "01",
        question: "A pousada é destinada apenas para pesca?",
        answer:
          "Não. A Itaicy oferece experiências de pesca esportiva, observação de aves, ecoturismo e imersões para famílias e casais.",
      },
      {
        id: "item-2",
        number: "02",
        question: "Como funciona o acesso às áreas preservadas?",
        answer:
          "Nossos roteiros seguem protocolos ambientais e operacionais próprios para garantir segurança e baixo impacto no bioma.",
      },
      {
        id: "item-3",
        number: "03",
        question: "As experiências são guiadas?",
        answer:
          "Sim. Todas as atividades são acompanhadas por equipe especializada e guias com conhecimento local.",
      },
      {
        id: "item-4",
        number: "04",
        question: "Existe opção para grupos e famílias?",
        answer:
          "Sim. Temos configurações de hospedagem e roteiro adaptadas para diferentes perfis de viajantes.",
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
    heading: "Relatos de quem viveu a real imersão",
    description:
      "O que nossos viajantes dizem sobre a experiência autêntica de se desconectar na natureza selvagem da Itaicy Ecoturismo.",
    items: [
      {
        title: "Experiência inesquecível",
        quote:
          '"Elegância essencial em harmonia com o bioma. Uma experiência autêntica e profundamente transformadora."',
        author: "Lucas Vieira, BRA",
      },
      {
        title: "Atendimento impecável",
        quote:
          '"Equipe preparada, estrutura excelente e roteiros com muito cuidado ambiental. Voltaremos com certeza."',
        author: "Fernanda A., BRA",
      },
      {
        title: "Conexão real com a natureza",
        quote:
          '"A observação de aves foi acima da expectativa. Organização, segurança e curadoria de alto nível."',
        author: "Rafael M., BRA",
      },
    ],
  },
  footer: {
    mobileNavLinks: [
      { label: "Pousada", href: "/" },
      { label: "Experiências", href: "/ecoturismo" },
      { label: "Fale conosco", href: "/contato" },
    ],
    pousadaLinks: [
      { label: "Home", href: "/" },
      { label: "Acomodações", href: "/acomodacoes" },
      { label: "Culinária", href: "/culinaria" },
      { label: "Nosso Impacto", href: "/nosso-impacto" },
      { label: "Blog", href: "/blog" },
    ],
    experienciasLinks: [
      { label: "Observação de Pássaros", href: "/observacao-de-aves" },
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
      { label: "Política de Privacidade", href: "/politica-de-privacidade" },
      { label: "Política de Cookies", href: "/politica-de-privacidade" },
      { label: "Sitemap", href: "/sitemap.xml" },
      { label: "Termos de Uso", href: "/politica-de-privacidade" },
    ],
    heading: "O Pantanal como você nunca sentiu.",
    pousadaHeading: "POUSADA",
    experienciasHeading: "EXPERIÊNCIAS",
    contactHeading: "FALE CONOSCO",
    newsletterLabel: "Diário de Campo Itaicy",
    newsletterInterests: ["Quero Pescar", "Quero Natureza", "Viagem em Família", "Descanso"],
    newsletterInputPlaceholder: "Seu e-mail",
    newsletterButtonLabel: "Enviar",
    bottomDescription:
      "Um refúgio genuíno e sofisticado no coração do Pantanal. Experiências autênticas para quem busca natureza, conforto e autenticidade.",
    copyright:
      "© 2026 Itaicy Pantanal Eco Lodge. Todos os direitos reservados.",
  },
  homeHero: {
    heading: "O Pantanal como",
    headingAccent: "você nunca sentiu.",
    subtitle:
      "Elegância essencial em harmonia com o bioma. Uma experiência de imersão autêntica, sem excessos e sem concessões.",
    bookingHeading: "Procure por uma data especial",
    bookingDescription:
      "Selecione o período da sua estadia para verificar a disponibilidade.",
    bookingStep1Label: "Passo 1:",
    bookingDisclaimer: "Garantimos o melhor preço para reservas diretas.",
    bookingDisclaimerPrefix: "Tarifas incluem sistema",
    bookingDisclaimerHighlight: "Premium All-Inclusive",
  },
  homeManifesto: {
    label: "MANIFESTO",
    segments: [
      {
        text: "Onde o luxo não é o que se vê, mas o que se sente. Conexão genuína com o ",
        color: "#e3f7ec",
      },
      { text: "Pantanal real", color: "#d6a35d" },
      { text: ". ", color: "#e3f7ec" },
      { text: "Uma ", color: "#e3f7ec" },
      { text: "imersão autêntica", color: "#d6a35d" },
      { text: ", no coração do bioma.", color: "#e3f7ec" },
    ],
    detailsButtonLabel: "Mais detalhes",
  },
};
