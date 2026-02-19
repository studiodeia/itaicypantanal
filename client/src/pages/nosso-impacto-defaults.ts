import type { NossoImpactoPageContent } from "@shared/cms-page-content";
import type { LocalizedDefaults } from "@/lib/cms/page-content";

const pt: NossoImpactoPageContent = {
  hero: {
    label: "NOSSO LEGADO",
    heading: "O Pantanal de amanhã se constrói hoje.",
    description:
      "Não somos apenas observadores. Somos guardiões. Na Itaicy, cada estadia financia a proteção de 166 espécies de aves e garante que o Dourado continue reinando em nossos rios.",
    scrollHint: "Deslize para baixo",
    backgroundImage: "/images/bird-hero-bg.webp",
  },
  manifesto: {
    segments: [
      {
        text: "Cada hóspede que chega à Itaicy se torna parte de algo maior: ",
        isHighlight: false,
      },
      { text: "guardiões de um ecossistema", isHighlight: true },
      {
        text: " que sustenta milhares de espécies. Sua estadia não é apenas uma viagem — é um ato de ",
        isHighlight: false,
      },
      { text: "preservação", isHighlight: true },
      { text: ".", isHighlight: false },
    ],
  },
  rioVivo: {
    heading: "100% Cota Zero: O Compromisso com o Gigante.",
    description:
      "Fomos pioneiros em entender que um Dourado vivo vale mil vezes mais que um no prato. Nossa política estrita de devolução garante que os troféus cresçam, se reproduzam e desafiem gerações de pescadores.",
    steps: [
      { iconName: "Fish", title: "Captura", description: "" },
      { iconName: "Camera", title: "Foto", description: "" },
      { iconName: "Waves", title: "Soltura", description: "" },
      { iconName: "Heart", title: "Reprodução", description: "" },
    ],
  },
  biodiversidade: {
    heading: "Santuário de Vida Selvagem",
    description: "",
    counters: [
      { target: 166, suffix: "+", label: "ESPÉCIES CATALOGADAS" },
      { target: 4, suffix: "", label: "ESPÉCIES AMEAÇADAS PROTEGIDAS" },
      { target: 85, suffix: "%", label: "DE ÁREA PRESERVADA" },
    ],
  },
  comunidade: {
    heading: "Guardiões Nativos.",
    description: "",
    body: [
      "Nossos guias não aprenderam sobre o Pantanal em livros; eles nasceram no ritmo das águas. Valorizamos o saber ancestral, empregando e capacitando a comunidade local. Sua visita gera renda e dignidade para Santo Antônio do Leverger.",
    ],
    image: "/images/pesca-about-1.webp",
  },
  operacao: {
    heading: "Turismo que Regenera",
    description: "",
    practices: [
      {
        iconName: "Recycle",
        title: "Gestão de Resíduos",
        description:
          "Separação, compostagem e destinação responsável de 100% dos resíduos gerados na operação da pousada.",
      },
      {
        iconName: "GlassWater",
        title: "Zero Plástico Descartável",
        description:
          "Garrafas reutilizáveis em todas as embarcações e quartos. Eliminamos o plástico de uso único da operação.",
      },
      {
        iconName: "Droplets",
        title: "Tratamento de Água",
        description:
          "Sistema próprio de tratamento de efluentes que devolve água limpa ao ecossistema pantaneiro.",
      },
    ],
  },
  engagement: {
    heading: "Faça parte deste legado.",
    description: "",
    buttonText: "Reservar Minha Experiência Consciente",
  },
};

const en: NossoImpactoPageContent = {
  hero: {
    label: "OUR LEGACY",
    heading: "Tomorrow's Pantanal is built today.",
    description:
      "We are not merely observers. We are guardians. At Itaicy, every stay funds the protection of 166 bird species and ensures the Dourado keeps reigning in our rivers.",
    scrollHint: "Scroll down",
    backgroundImage: "/images/bird-hero-bg.webp",
  },
  manifesto: {
    segments: [
      {
        text: "Each guest who arrives at Itaicy becomes part of something greater: ",
        isHighlight: false,
      },
      { text: "guardians of an ecosystem", isHighlight: true },
      {
        text: " that sustains thousands of species. Your stay is not merely a trip — it is an act of ",
        isHighlight: false,
      },
      { text: "preservation", isHighlight: true },
      { text: ".", isHighlight: false },
    ],
  },
  rioVivo: {
    heading: "100% Catch-and-Release: Our Commitment to the Giant.",
    description:
      "We were pioneers in understanding that a living Dourado is worth a thousand times more than one on a plate. Our strict release policy ensures the trophies grow, reproduce, and challenge generations of anglers.",
    steps: [
      { iconName: "Fish", title: "Catch", description: "" },
      { iconName: "Camera", title: "Photo", description: "" },
      { iconName: "Waves", title: "Release", description: "" },
      { iconName: "Heart", title: "Breeding", description: "" },
    ],
  },
  biodiversidade: {
    heading: "Wildlife Sanctuary",
    description: "",
    counters: [
      { target: 166, suffix: "+", label: "CATALOGUED SPECIES" },
      { target: 4, suffix: "", label: "THREATENED SPECIES PROTECTED" },
      { target: 85, suffix: "%", label: "OF PRESERVED AREA" },
    ],
  },
  comunidade: {
    heading: "Native Guardians.",
    description: "",
    body: [
      "Our guides didn't learn about the Pantanal from books; they were born to the rhythm of its waters. We value ancestral knowledge, employing and empowering the local community. Your visit generates income and dignity for Santo Antônio do Leverger.",
    ],
    image: "/images/pesca-about-1.webp",
  },
  operacao: {
    heading: "Tourism that Regenerates",
    description: "",
    practices: [
      {
        iconName: "Recycle",
        title: "Waste Management",
        description:
          "Separation, composting, and responsible disposal of 100% of waste generated in the lodge operation.",
      },
      {
        iconName: "GlassWater",
        title: "Zero Single-Use Plastics",
        description:
          "Reusable bottles on all boats and in rooms. We have eliminated single-use plastic from operations.",
      },
      {
        iconName: "Droplets",
        title: "Water Treatment",
        description:
          "A proprietary effluent treatment system that returns clean water to the Pantanal ecosystem.",
      },
    ],
  },
  engagement: {
    heading: "Be part of this legacy.",
    description: "",
    buttonText: "Book My Conscious Experience",
  },
};

const es: NossoImpactoPageContent = {
  hero: {
    label: "NUESTRO LEGADO",
    heading: "El Pantanal de mañana se construye hoy.",
    description:
      "No somos simples observadores. Somos guardianes. En Itaicy, cada estadía financia la protección de 166 especies de aves y garantiza que el Dourado siga reinando en nuestros ríos.",
    scrollHint: "Desliza hacia abajo",
    backgroundImage: "/images/bird-hero-bg.webp",
  },
  manifesto: {
    segments: [
      {
        text: "Cada huésped que llega a Itaicy se convierte en parte de algo mayor: ",
        isHighlight: false,
      },
      { text: "guardianes de un ecosistema", isHighlight: true },
      {
        text: " que sostiene miles de especies. Tu estadía no es solo un viaje — es un acto de ",
        isHighlight: false,
      },
      { text: "preservación", isHighlight: true },
      { text: ".", isHighlight: false },
    ],
  },
  rioVivo: {
    heading: "100% Cuota Cero: El Compromiso con el Gigante.",
    description:
      "Fuimos pioneros en comprender que un Dourado vivo vale mil veces más que uno en el plato. Nuestra estricta política de devolución garantiza que los trofeos crezcan, se reproduzcan y desafíen a generaciones de pescadores.",
    steps: [
      { iconName: "Fish", title: "Captura", description: "" },
      { iconName: "Camera", title: "Foto", description: "" },
      { iconName: "Waves", title: "Suelta", description: "" },
      { iconName: "Heart", title: "Reproducción", description: "" },
    ],
  },
  biodiversidade: {
    heading: "Santuario de Vida Silvestre",
    description: "",
    counters: [
      { target: 166, suffix: "+", label: "ESPECIES CATALOGADAS" },
      { target: 4, suffix: "", label: "ESPECIES AMENAZADAS PROTEGIDAS" },
      { target: 85, suffix: "%", label: "DE ÁREA PRESERVADA" },
    ],
  },
  comunidade: {
    heading: "Guardianes Nativos.",
    description: "",
    body: [
      "Nuestros guías no aprendieron sobre el Pantanal en libros; nacieron al ritmo de sus aguas. Valoramos el saber ancestral, empleando y capacitando a la comunidad local. Tu visita genera ingresos y dignidad para Santo Antônio do Leverger.",
    ],
    image: "/images/pesca-about-1.webp",
  },
  operacao: {
    heading: "Turismo que Regenera",
    description: "",
    practices: [
      {
        iconName: "Recycle",
        title: "Gestión de Residuos",
        description:
          "Separación, compostaje y destino responsable del 100% de los residuos generados en la operación del lodge.",
      },
      {
        iconName: "GlassWater",
        title: "Cero Plástico Descartable",
        description:
          "Botellas reutilizables en todas las embarcaciones y habitaciones. Hemos eliminado el plástico de un solo uso de la operación.",
      },
      {
        iconName: "Droplets",
        title: "Tratamiento de Agua",
        description:
          "Sistema propio de tratamiento de efluentes que devuelve agua limpia al ecosistema pantanero.",
      },
    ],
  },
  engagement: {
    heading: "Sé parte de este legado.",
    description: "",
    buttonText: "Reservar Mi Experiencia Consciente",
  },
};

export const nossoImpactoDefaults: LocalizedDefaults<"/nosso-impacto"> = { pt, en, es };
