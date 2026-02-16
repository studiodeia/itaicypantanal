// === Reusable field types ===
export type CmsFeature = {
  number: string;
  title: string;
  description: string;
};
export type CmsHighlight = {
  iconName: string;
  title: string;
  description: string;
};
export type CmsExpeditionCard = {
  title: string;
  description: string;
  backgroundImage: string;
  href?: string;
};
export type CmsStatItem = {
  target: number;
  suffix: string;
  label: string;
  hasIcon?: boolean;
};
export type CmsImpactItem = {
  number: string;
  title: string;
  description: string;
};
export type CmsRoomType = {
  title: string;
  description: string;
  image: string;
  ctaText: string;
  features: { iconName: string; label: string }[];
};
export type CmsCulinaryImage = { src: string; alt: string; tag: string };
export type CmsServiceCard = {
  title: string;
  description: string;
  image: string;
  href?: string;
};
export type CmsContactChannel = {
  iconName: string;
  title: string;
  info: string;
};
export type CmsCycleStep = {
  iconName: string;
  title: string;
  description: string;
};
export type CmsPracticeCard = {
  iconName: string;
  title: string;
  description: string;
};
export type CmsPrivacySection = {
  id: string;
  title: string;
  content: string[];
};
export type CmsFaqItem = {
  id: string;
  number: string;
  question: string;
  answer: string;
};
export type CmsFaq = {
  label: string;
  heading: string;
  description: string;
  items: CmsFaqItem[];
};

// === Hero (shared pattern across pages) ===
export type CmsHero = {
  label: string;
  heading: string;
  subtitle?: string;
  description?: string;
  scrollHint?: string;
  backgroundImage?: string;
  videoWebm?: string;
  videoMp4?: string;
  videoWebmLow?: string;
  videoMp4Low?: string;
  videoPoster?: string;
};

// === Manifesto (shared pattern) ===
export type CmsManifesto = {
  segments: { text: string; isHighlight: boolean }[];
};

// === About Us / Sobre Nós (shared pattern) ===
export type CmsSobreNos = {
  label?: string;
  heading: string;
  body: string[];
  image: string;
  features?: CmsFeature[];
};

// === Highlights (shared pattern — 6 cards) ===
export type CmsHighlights = {
  heading: string;
  items: CmsHighlight[];
};

// === Services (shared pattern) ===
export type CmsServices = {
  label?: string;
  heading?: string;
  description?: string;
  items: CmsServiceCard[];
  buttonText?: string;
  buttonHref?: string;
};

// === Per-page content types ===

export type CmsAudienceSegment = {
  iconName: string;
  title: string;
  description: string;
};

export type HomePageContent = {
  aboutUs: CmsSobreNos;
  expeditions: {
    label: string;
    heading: string;
    description: string;
    items: CmsExpeditionCard[];
    buttonText: string;
  };
  stats: { items: CmsStatItem[] };
  accommodation: {
    label: string;
    heading: string;
    body: string;
    buttonReserve: string;
    buttonDetails: string;
    backgroundImage: string;
  };
  impact: {
    label: string;
    heading: string;
    items: CmsImpactItem[];
    image: string;
  };
  paraQuem?: {
    label: string;
    heading: string;
    description: string;
    segments: CmsAudienceSegment[];
  };
  blog: {
    label: string;
    heading: string;
    description: string;
    buttonText: string;
  };
  faq?: CmsFaq;
};

export type AcomodacoesPageContent = {
  hero: CmsHero;
  manifesto: CmsManifesto;
  highlights: CmsHighlights;
  rooms: CmsRoomType[];
  culinary: {
    label: string;
    heading: string;
    description: string;
    images: CmsCulinaryImage[];
    ctaText: string;
    ctaHref: string;
  };
  faq?: CmsFaq;
};

export type CulinariaPageContent = {
  hero: CmsHero;
  manifesto: CmsManifesto;
  menu: CmsSobreNos;
  highlights: CmsHighlights;
  services: CmsServices;
  experience: { heading: string; body: string[]; image: string };
  crossSell: {
    heading: string;
    description: string;
    buttonText: string;
    buttonHref: string;
    image: string;
  };
  faq?: CmsFaq;
};

export type PescaPageContent = {
  hero: CmsHero;
  manifesto: CmsManifesto;
  sobreNos: CmsSobreNos;
  highlights: CmsHighlights;
  services: CmsServices;
  faq?: CmsFaq;
};

export type EcoturismoPageContent = {
  hero: CmsHero;
  manifesto: CmsManifesto;
  sobreNos: CmsSobreNos;
  highlights: CmsHighlights;
  services: CmsServices;
  faq?: CmsFaq;
};

export type BirdwatchingPageContent = {
  hero: CmsHero;
  manifesto: CmsManifesto;
  sobreNos: CmsSobreNos;
  highlights: CmsHighlights;
  faq?: CmsFaq;
};

export type ContatoPageContent = {
  hero: CmsHero;
  formTitle: string;
  steps: {
    placeholders: string[];
    buttonNext: string;
    buttonBack: string;
    buttonSubmit: string;
  };
  channels: { heading: string; items: CmsContactChannel[] };
  mapCoords: { lat: number; lng: number };
};

export type NossoImpactoPageContent = {
  hero: CmsHero;
  manifesto: CmsManifesto;
  rioVivo: {
    heading: string;
    description: string;
    steps: CmsCycleStep[];
  };
  biodiversidade: {
    heading: string;
    description: string;
    counters: CmsStatItem[];
  };
  comunidade: {
    heading: string;
    description: string;
    body: string[];
    image: string;
  };
  operacao: {
    heading: string;
    description: string;
    practices: CmsPracticeCard[];
  };
  engagement: {
    heading: string;
    description: string;
    buttonText: string;
  };
};

export type PrivacidadePageContent = {
  hero: { title: string; lastUpdated: string };
  sections: CmsPrivacySection[];
};

export type NotFoundPageContent = {
  hero: CmsHero;
  buttonText: string;
};

// === Regiao (region) page ===
export type CmsAccessRoute = {
  from: string;
  distance: string;
  duration: string;
  description: string;
};
export type CmsSeason = {
  period: string;
  temperature: string;
  rainfall: string;
  characteristics: string;
};
export type CmsNearbyPlace = {
  name: string;
  distance: string;
  description: string;
};
export type RegiaoPageContent = {
  hero: CmsHero;
  location: {
    label: string;
    heading: string;
    description: string;
    coordinates: string;
  };
  access: {
    label: string;
    heading: string;
    description: string;
    routes: CmsAccessRoute[];
  };
  climate: {
    label: string;
    heading: string;
    description: string;
    seasons: CmsSeason[];
  };
  nearby: {
    label: string;
    heading: string;
    description: string;
    places: CmsNearbyPlace[];
  };
  faq?: CmsFaq;
};

// === Map route → content type ===
export type PageContentMap = {
  "/": HomePageContent;
  "/acomodacoes": AcomodacoesPageContent;
  "/culinaria": CulinariaPageContent;
  "/pesca": PescaPageContent;
  "/ecoturismo": EcoturismoPageContent;
  "/observacao-de-aves": BirdwatchingPageContent;
  "/contato": ContatoPageContent;
  "/nosso-impacto": NossoImpactoPageContent;
  "/politica-de-privacidade": PrivacidadePageContent;
  "/regiao": RegiaoPageContent;
  "/404": NotFoundPageContent;
};
