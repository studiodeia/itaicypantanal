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

export const contatoDefaults: LocalizedDefaults<"/contato"> = { pt, en: pt, es: pt };
