export interface FishSpecies {
  slug: string;
  commonName: string;
  scientificName: string;
  description: string;
  category: string;
  tag: string;
  src: string;
  author: string;
  date: string;
}

export interface FishSpeciesDetail extends FishSpecies {
  heroImage: string;
  conservationStatus: string;
  size: string;
  habitat: string;
  overview: string;
  diet: string;
  behavior: string;
  bestTime: string;
  fishingTips: string[];
  relatedSlugs: string[];
}

export const categories = [
  "Todas",
  "Predadores",
  "Médio Porte",
  "Esportivo",
] as const;

export type FishCategory = (typeof categories)[number];

/** Maps display category → URL slug */
export const categorySlugMap: Record<string, string> = {
  Predadores: "predadores",
  "Médio Porte": "medio-porte",
  Esportivo: "esportivo",
};

/** Maps URL slug → display category */
export const slugToCategoryMap: Record<string, string> = Object.fromEntries(
  Object.entries(categorySlugMap).map(([k, v]) => [v, k]),
);

/** Returns the canonical URL for a fish species page */
export function getFishUrl(fish: FishSpecies): string {
  return `/pesca/catalogo/${fish.slug}`;
}

/** 2 featured fish for the catalog hero area */
export const featuredFish: FishSpecies[] = [
  {
    slug: "dourado",
    commonName: "Dourado",
    scientificName: "Salminus brasiliensis",
    description:
      "Considerado o rei dos rios, o dourado é famoso por sua luta intensa, saltos acrobáticos e é o troféu mais procurado na pesca esportiva pantaneira.",
    category: "Esportivo",
    tag: "Fauna",
    src: "/images/pesca-fish-4",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
  },
  {
    slug: "pintado",
    commonName: "Pintado",
    scientificName: "Pseudoplatystoma corruscans",
    description:
      "O maior predador dos rios pantaneiros. O pintado (surubim) pode ultrapassar 20 quilos e é famoso por sua resistência e batalhas memoráveis nas profundezas do Rio Cuiabá.",
    category: "Predadores",
    tag: "Fauna",
    src: "/images/pesca-fish-1",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
  },
];

/** All fish for the grid catalog */
export const allFish: FishSpecies[] = [
  {
    slug: "dourado",
    commonName: "Dourado",
    scientificName: "Salminus brasiliensis",
    description:
      "Considerado o rei dos rios, o dourado é famoso por sua luta intensa, saltos acrobáticos e é o troféu mais procurado na pesca esportiva pantaneira.",
    category: "Esportivo",
    tag: "Fauna",
    src: "/images/pesca-fish-4",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
  },
  {
    slug: "pintado",
    commonName: "Pintado",
    scientificName: "Pseudoplatystoma corruscans",
    description:
      "O maior predador dos rios pantaneiros. O pintado (surubim) pode ultrapassar 20 quilos e é famoso por sua resistência e batalhas memoráveis nas profundezas do Rio Cuiabá.",
    category: "Predadores",
    tag: "Fauna",
    src: "/images/pesca-fish-1",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
  },
  {
    slug: "piraputanga",
    commonName: "Piraputanga",
    scientificName: "Brycon hilarii",
    description:
      "Endêmica do Rio Cuiabá, a piraputanga é ágil, agresiva e desafiadora com iscas artificiais. Um troféu menor em tamanho, mas imbatível em adrenalina.",
    category: "Esportivo",
    tag: "Fauna",
    src: "/images/pesca-fish-2",
    author: "Lucas Vieira",
    date: "05 de Agosto, 2025",
  },
  {
    slug: "pacu",
    commonName: "Pacu",
    scientificName: "Colossoma macropomum",
    description:
      "Um peixe de enorme resistência, o pacu surpreende pela força e velocidade nos arranques — um clássico da pesca esportiva pantaneira.",
    category: "Médio Porte",
    tag: "Fauna",
    src: "/images/pesca-fish-3",
    author: "Lucas Vieira",
    date: "01 de Agosto, 2025",
  },
];

// -- Species detail data (rich content for individual species pages) --

const douradoDetail: FishSpeciesDetail = {
  ...allFish.find((f) => f.slug === "dourado")!,
  heroImage: "/images/pesca-fish-4",
  conservationStatus: "Vulnerável (VU)",
  size: "60-90 cm | Peso médio: 5-10 kg | Máximo registrado: 30 kg",
  habitat:
    "Rios de correnteza rápida, corredeiras e remansos do Rio Cuiabá e afluentes. Prefere águas claras e bem oxigenadas com fundo rochoso ou arenoso.",
  overview:
    "O **Dourado** (Salminus brasiliensis) é considerado o maior e mais nobre peixe de escama da América do Sul. Seu nome popular deriva da cor dourada intensa de suas escamas, que brilham ao sol durante os saltos acrobáticos — um espetáculo inesquecível para qualquer pescador esportivo.\n\nConhecido como o 'Rei do Rio', o dourado combina velocidade, força e inteligência em batalhas que podem durar mais de uma hora. É famoso por suas corridas rasas e saltos fora d'água, uma estratégia para se livrar do anzol que o torna o peixe mais desafiador da pesca esportiva sul-americana.\n\nNa Itaicy, o dourado é o principal troféu das expedições de pesca. Toda captura é fotografada e devolvida viva ao rio — o compromisso inegociável com o **Projeto Cota Zero** que praticamos desde 2010.",
  diet: "Predador voraz, o dourado alimenta-se principalmente de peixes de menor porte como o lambari, a sardinha e a piraputanga. Utiliza estratégias sofisticadas de caça em cardume, cercando presas nas margens e em locais de correnteza. Suas presas são engolidas inteiras graças à grande abertura bucal.",
  behavior:
    "O dourado é uma espécie altamente migradora que percorre centenas de quilômetros nos rios durante o ciclo reprodutivo. A desova ocorre nas cabeceiras dos rios, geralmente entre outubro e dezembro, coincidindo com o início das chuvas. Fora da época reprodutiva, formam cardumes de caça que atacam em coordenação, tornando-se mais acessíveis à pesca esportiva durante a estação seca.",
  bestTime:
    "O melhor período para pescar o dourado no Pantanal é de junho a agosto, durante a estação seca. Com o nível dos rios baixando, os cardumes se concentram em remansos, corredeiras e pontos de caça conhecidos pelos guias locais. O horário mais produtivo é o início da manhã (5h30-8h) e o final da tarde (16h-18h), quando a temperatura da água é ideal para a atividade intensa dos predadores.",
  fishingTips: [
    "Use iscas artificiais de superfície (poppers e stick baits) nas manhãs calmas — o ataque do dourado é explosivo e visível.",
    "Anzóis sem farpa são obrigatórios para o pesque e solte responsável. Tenha sempre um alicate de soltura à mão.",
    "O dourado costuma saltar 3 a 5 vezes logo após a fisgada — mantenha a linha tensa durante os saltos.",
    "Em corredeiras, posicione o barco de forma que a isca entre naturalmente na corrente onde os dourados esperam as presas.",
    "Use linha de 30-40 lbs para ter margem de segurança sem comprometer a sensibilidade do combate.",
  ],
  relatedSlugs: ["pintado", "piraputanga", "pacu"],
};

const pintadoDetail: FishSpeciesDetail = {
  ...allFish.find((f) => f.slug === "pintado")!,
  heroImage: "/images/pesca-fish-1",
  conservationStatus: "Pouco Preocupante (LC)",
  size: "70-120 cm | Peso médio: 8-20 kg | Máximo registrado: 50 kg",
  habitat:
    "Fundos argilosos e rochosos de grandes rios, preferindo poções profundos e áreas de confluência. É um peixe bentônico que passa a maior parte do tempo próximo ao fundo.",
  overview:
    "O **Pintado** (Pseudoplatystoma corruscans), também conhecido como Surubim-do-Pantanal ou Cachara, é o maior predador dos rios pantaneiros e um dos peixes mais imponentes da América do Sul. Seu padrão de manchas irregulares em fundo cinza-prateado é inconfundível e inspirou seu nome popular.\n\nPode atingir mais de 1,2 metro de comprimento e pesar até 50 quilos nos exemplares mais velhos, tornando-o um adversário formidável mesmo para pescadores experientes. Sua resistência é lendária — batalhas de 30 a 60 minutos são comuns com exemplares acima de 15 quilos.\n\nNa Itaicy, o pintado é pescado exclusivamente na modalidade pesque e solte, respeitando os ciclos naturais da espécie e garantindo que as gerações futuras possam desfrutar desta experiência única.",
  diet: "Predador noturno por excelência, o pintado alimenta-se de peixes, caranguejos, camarões e ocasionalmente pequenos répteis. Durante o dia permanece escondido em tocas e estruturas submersas; ao anoitecer, parte em expedições de caça pelos remansos e fundos dos rios.",
  behavior:
    "Espécie sedentária que estabelece território em poções profundos e estruturas submersas. Diferente do dourado, o pintado raramente salta — suas batalhas acontecem nas profundezas, com corridas potentes e resistência prolongada. A época de reprodução ocorre durante as cheias (novembro-fevereiro), quando sobe os rios em busca de locais adequados para desovar.",
  bestTime:
    "O pintado é pescado durante todo o ano na Itaicy, mas os melhores resultados ocorrem entre julho e setembro. Durante a seca, os poções onde o pintado se concentra ficam bem definidos, facilitando a localização. A pesca noturna ou ao entardecer é particularmente produtiva, quando a espécie abandona os abrigos para caçar.",
  fishingTips: [
    "Pesca de fundo com molinete de fibra carbono e linha de 50-80 lbs. O pintado é forte e joga para dentro das estruturas.",
    "Iscas vivas (lambari ou piraputanga pequena) são as mais eficazes, mas polvos artificiais e jigs pesados também funcionam.",
    "Localize estruturas submersas (pedras, troncos, bancos de areia) — o pintado usa esses pontos como território de caça.",
    "Ao fisgar, segure firme e impeça que o peixe entre em estruturas submersas nos primeiros segundos.",
    "Use anzóis de garatéia tripla 2/0 ou 4/0 para iscas vivas — o pintado morde com força e pode soltar anzóis simples.",
  ],
  relatedSlugs: ["dourado", "pacu", "piraputanga"],
};

const fishDetails: FishSpeciesDetail[] = [douradoDetail, pintadoDetail];

export function getFishBySlug(slug: string): FishSpeciesDetail | undefined {
  return fishDetails.find((f) => f.slug === slug);
}

export function getRelatedFish(currentSlug: string): FishSpecies[] {
  const fish = fishDetails.find((f) => f.slug === currentSlug);
  if (fish) {
    return fish.relatedSlugs
      .map((s) => allFish.find((f) => f.slug === s))
      .filter((f): f is FishSpecies => f !== undefined)
      .slice(0, 3);
  }
  return allFish
    .filter((f) => f.slug !== currentSlug)
    .slice(0, 3);
}
