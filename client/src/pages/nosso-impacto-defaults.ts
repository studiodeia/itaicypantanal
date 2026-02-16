import type { NossoImpactoPageContent } from "@shared/cms-page-content";

export const nossoImpactoDefaults: NossoImpactoPageContent = {
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
