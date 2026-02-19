import type { ContatoPageContent } from "@shared/cms-page-content";
import type { LocalizedDefaults } from "@/lib/cms/page-content";

const pt: ContatoPageContent = {
  hero: {
    label: "PREPARE SUA EXPEDIÇÃO",
    heading: "Fale com Nossos Especialistas",
    description:
      "Nossa equipe está à disposição para ajudar com suas dúvidas, seja sobre nossas expedições de birdwatching, pacotes de pesca esportiva ou os detalhes da sua estadia de ecoturismo.",
    scrollHint: "Deslize para baixo",
    backgroundImage: "/images/culinaria-cta-bg.webp",
  },
  formTitle: "Entrar em contato",
  steps: {
    placeholders: [
      "E-mail",
      "Nome completo",
      "Telefone / WhatsApp",
      "Sua mensagem...",
    ],
    buttonNext: "Avançar",
    buttonBack: "Voltar",
    buttonSubmit: "Enviar",
  },
  channels: {
    heading: "Nossos Canais de Atendimento",
    items: [
      {
        iconName: "Phone",
        title: "Telefone & WhatsApp",
        info: "(65) 9 9640-2380",
      },
      {
        iconName: "Mail",
        title: "E-mail",
        info: "contato@pousadaitaicy.com.br",
      },
      {
        iconName: "MapPin",
        title: "Nosso Endereço",
        info: "Santo Antônio do Leverger, MT, 78180-000",
      },
    ],
  },
  mapCoords: { lat: -15.87, lng: -56.08 },
};

const en: ContatoPageContent = {
  hero: {
    label: "PLAN YOUR EXPEDITION",
    heading: "Talk to Our Specialists",
    description:
      "Our team is available to help with your questions, whether about our birdwatching expeditions, sport fishing packages, or the details of your ecotourism stay.",
    scrollHint: "Scroll down",
    backgroundImage: "/images/culinaria-cta-bg.webp",
  },
  formTitle: "Get in touch",
  steps: {
    placeholders: [
      "E-mail",
      "Full name",
      "Phone / WhatsApp",
      "Your message...",
    ],
    buttonNext: "Next",
    buttonBack: "Back",
    buttonSubmit: "Send",
  },
  channels: {
    heading: "Our Contact Channels",
    items: [
      {
        iconName: "Phone",
        title: "Phone & WhatsApp",
        info: "(65) 9 9640-2380",
      },
      {
        iconName: "Mail",
        title: "E-mail",
        info: "contato@pousadaitaicy.com.br",
      },
      {
        iconName: "MapPin",
        title: "Our Address",
        info: "Santo Antônio do Leverger, MT, 78180-000",
      },
    ],
  },
  mapCoords: { lat: -15.87, lng: -56.08 },
};

const es: ContatoPageContent = {
  hero: {
    label: "PREPARA TU EXPEDICIÓN",
    heading: "Habla con Nuestros Especialistas",
    description:
      "Nuestro equipo está disponible para ayudarte con tus dudas, ya sea sobre nuestras expediciones de birdwatching, paquetes de pesca deportiva o los detalles de tu estancia de ecoturismo.",
    scrollHint: "Desliza hacia abajo",
    backgroundImage: "/images/culinaria-cta-bg.webp",
  },
  formTitle: "Ponerse en contacto",
  steps: {
    placeholders: [
      "E-mail",
      "Nombre completo",
      "Teléfono / WhatsApp",
      "Tu mensaje...",
    ],
    buttonNext: "Siguiente",
    buttonBack: "Atrás",
    buttonSubmit: "Enviar",
  },
  channels: {
    heading: "Nuestros Canales de Atención",
    items: [
      {
        iconName: "Phone",
        title: "Teléfono & WhatsApp",
        info: "(65) 9 9640-2380",
      },
      {
        iconName: "Mail",
        title: "E-mail",
        info: "contato@pousadaitaicy.com.br",
      },
      {
        iconName: "MapPin",
        title: "Nuestra Dirección",
        info: "Santo Antônio do Leverger, MT, 78180-000",
      },
    ],
  },
  mapCoords: { lat: -15.87, lng: -56.08 },
};

export const contatoDefaults: LocalizedDefaults<"/contato"> = { pt, en, es };
