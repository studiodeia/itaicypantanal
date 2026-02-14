export interface BirdSpecies {
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

export interface BirdSpeciesDetail extends BirdSpecies {
  heroImage: string;
  conservationStatus: string;
  size: string;
  habitat: string;
  overview: string;
  diet: string;
  behavior: string;
  bestTime: string;
  photographyTips: string[];
  relatedSlugs: string[];
}

export const categories = [
  "Todas",
  "Papagaio",
  "Aquáticas",
  "Migratórias",
  "Noturno Perto",
] as const;

export type BirdCategory = (typeof categories)[number];

/** Maps display category → URL slug */
export const categorySlugMap: Record<string, string> = {
  Papagaio: "papagaio",
  Aquáticas: "aquaticas",
  Migratórias: "migratorias",
  "Noturno Perto": "noturno-perto",
};

/** Maps URL slug → display category */
export const slugToCategoryMap: Record<string, string> = Object.fromEntries(
  Object.entries(categorySlugMap).map(([k, v]) => [v, k]),
);

/** Returns the canonical URL for a bird species page */
export function getBirdUrl(bird: BirdSpecies): string {
  return `/observacao-de-aves/catalogo/${bird.slug}`;
}

/** 2 featured birds for the catalog hero area */
export const featuredBirds: BirdSpecies[] = [
  {
    slug: "arara-azul",
    commonName: "Arara-Azul",
    scientificName: "Anodorhynchus hyacinthinus",
    description:
      "A maior arara do mundo, símbolo do Pantanal. Suas plumagens azul-cobalto hipnotizam observadores.",
    category: "Papagaio",
    tag: "Fauna",
    src: "/images/bird-species-1",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
  },
  {
    slug: "tuiuiu",
    commonName: "Tuiuiú",
    scientificName: "Mycteria americana",
    description:
      "Símbolo do Pantanal, o tuiuiú é uma ave majestosa que se destaca por seu tamanho e plumagem branca, sendo um importante indicador da saúde do ecossistema.",
    category: "Aquáticas",
    tag: "Fauna",
    src: "/images/bird-species-4",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
  },
];

/** All birds for the grid catalog (9 entries for a full 3x3 page) */
export const allBirds: BirdSpecies[] = [
  {
    slug: "arara-azul",
    commonName: "Arara-Azul",
    scientificName: "Anodorhynchus hyacinthinus",
    description:
      "A maior arara do mundo, símbolo do Pantanal. Suas plumagens azul-cobalto hipnotizam observadores.",
    category: "Papagaio",
    tag: "Fauna",
    src: "/images/bird-species-1",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
  },
  {
    slug: "joao-pinto",
    commonName: "João-pinto",
    scientificName: "Icterus croconotus",
    description:
      "O Icterus croconotus, celebra a vida selvagem, a beleza e a importância da preservação do Pantanal.",
    category: "Noturno Perto",
    tag: "Fauna",
    src: "/images/bird-species-2",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
  },
  {
    slug: "anhinga",
    commonName: "Anhinga",
    scientificName: "Anhinga anhinga",
    description:
      "Conhecida como o 'peixe-espeto', essa ave possui um pescoço longo e é um exímio mergulhador, encontrada frequentemente em rios e lagoas do Pantanal.",
    category: "Aquáticas",
    tag: "Fauna",
    src: "/images/bird-species-3",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
  },
  {
    slug: "tuiuiu",
    commonName: "Tuiuiú",
    scientificName: "Mycteria americana",
    description:
      "Símbolo do Pantanal, o tuiuiú é uma ave majestosa que se destaca por seu tamanho e plumagem branca, sendo um importante indicador da saúde do ecossistema.",
    category: "Aquáticas",
    tag: "Fauna",
    src: "/images/bird-species-4",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
  },
  {
    slug: "arara-vermelha",
    commonName: "Arara-Vermelha",
    scientificName: "Ara chloropterus",
    description:
      "Ave de grande porte com plumagem vermelha vibrante. Conhecida por seu canto potente que ressoa nas florestas do Pantanal.",
    category: "Papagaio",
    tag: "Fauna",
    src: "/images/bird-species-1",
    author: "Lucas Vieira",
    date: "05 de Agosto, 2025",
  },
  {
    slug: "garca-branca-grande",
    commonName: "Garça-Branca-Grande",
    scientificName: "Ardea alba",
    description:
      "Com seu elegante porte e plumagem branca, a garça é comum nas lagoas e campos do Pantanal, caçando peixes com agilidade.",
    category: "Aquáticas",
    tag: "Fauna",
    src: "/images/bird-species-2",
    author: "Lucas Vieira",
    date: "01 de Agosto, 2025",
  },
  {
    slug: "colhereiro",
    commonName: "Colhereiro",
    scientificName: "Platalea ajaja",
    description:
      "Com sua plumagem rosada e bico em forma de colher, é uma das aves mais fotogênicas do Pantanal.",
    category: "Aquáticas",
    tag: "Fauna",
    src: "/images/bird-species-3",
    author: "Lucas Vieira",
    date: "28 de Julho, 2025",
  },
  {
    slug: "gaviao-real",
    commonName: "Gavião-Real",
    scientificName: "Harpia harpyja",
    description:
      "O maior e mais poderoso raptor das Américas, com garras maiores que as de um urso. Avistamento raro e emocionante.",
    category: "Migratórias",
    tag: "Fauna",
    src: "/images/bird-species-4",
    author: "Lucas Vieira",
    date: "25 de Julho, 2025",
  },
  {
    slug: "urutau",
    commonName: "Urutau",
    scientificName: "Nyctibius griseus",
    description:
      "Mestre da camuflagem noturna, o urutau se confunde com galhos secos durante o dia. Seu canto melancólico ecoa nas noites pantaneiras.",
    category: "Noturno Perto",
    tag: "Fauna",
    src: "/images/bird-species-1",
    author: "Lucas Vieira",
    date: "20 de Julho, 2025",
  },
];

// -- Species detail data (rich content for individual species pages) --

const tuiuiuDetail: BirdSpeciesDetail = {
  ...allBirds.find((b) => b.slug === "tuiuiu")!,
  heroImage: "/images/bird-species-4",
  conservationStatus: "Pouco Preocupante (LC)",
  size: "95-100 cm | Envergadura: 120-140 cm | Peso: 1,2-1,7 kg",
  habitat:
    "Áreas alagadas, margens de rios, lagoas e campos inundáveis do Pantanal. Prefere regiões com vegetação aberta e acesso a corpos d'água rasos para alimentação.",
  overview:
    "O **Tuiuiú** (Jabiru mycteria), também conhecido como Jabiru, é a ave-símbolo do Pantanal e a maior cegonha das Américas. Com sua imponente estatura que pode ultrapassar 1,40m de altura e envergadura de até 2,80m, é uma presença inconfundível nas paisagens pantaneiras.\n\nSeu nome popular vem do tupi-guarani e significa \"pescoço inchado\", referência à bolsa vermelha em sua garganta que infla durante a época de acasalamento. A plumagem é predominantemente branca, com cabeça e pescoço pretos e uma faixa vermelha na base do pescoço.\n\nÉ considerado um importante **indicador de saúde ambiental** do ecossistema pantaneiro. Sua presença abundante em uma região indica equilíbrio ecológico, pois depende de águas limpas e abundância de peixes para sobreviver.",
  diet: "Alimenta-se principalmente de peixes, anfíbios, répteis (incluindo pequenas cobras), moluscos e grandes insetos aquáticos. Utiliza seu bico largo e robusto para capturar presas em águas rasas, frequentemente caminhando lentamente por campos alagados. Durante a estação seca, quando as lagoas diminuem e concentram os peixes, o tuiuiú tem fartura de alimento.",
  behavior:
    "Espécie monogâmica que forma casais para a vida toda. Constrói enormes ninhos no topo de árvores altas, que podem atingir 2 metros de diâmetro e são reutilizados ano após ano. A época de reprodução coincide com a estação seca (julho a novembro), quando o casal cuida de 2 a 5 ovos. Os filhotes permanecem no ninho por cerca de 3 meses antes de realizar seus primeiros voos.",
  bestTime:
    "A melhor época para observar o tuiuiú no Pantanal é durante a estação seca, entre julho e outubro. Neste período, as águas recuam e os peixes se concentram em lagoas menores, atraindo grandes bandos de tuiuiús para se alimentar. Ao amanhecer e entardecer, é possível observá-los sobrevoando em grupos, criando um espetáculo visual inesquecível contra o pôr-do-sol pantaneiro.",
  photographyTips: [
    "Use lentes teleobjetivas (400mm+) para capturar detalhes da plumagem sem perturbar a ave.",
    "O melhor horário é ao amanhecer (5h30-7h), quando a luz dourada realça as cores e os tuiuiús saem para pescar.",
    "Posicione-se perto de lagoas que estejam secando — ali eles se concentram para pescar.",
    "Fotografe os ninhos de longe; tuiuiús são sensíveis à presença humana durante a nidificação.",
    "Aproveite o momento em que abrem as asas para secar ao sol — a envergadura cria imagens dramáticas.",
  ],
  relatedSlugs: ["arara-azul", "anhinga", "garca-branca-grande"],
};

const araraAzulDetail: BirdSpeciesDetail = {
  ...allBirds.find((b) => b.slug === "arara-azul")!,
  heroImage: "/images/bird-species-1",
  conservationStatus: "Vulnerável (VU)",
  size: "100 cm | Envergadura: 130-150 cm | Peso: 1,2-1,7 kg",
  habitat:
    "Matas ciliares, buritizais e palmeirais do Pantanal. Necessita de árvores grandes e ocas para nidificação, especialmente o manduvi (Sterculia apetala).",
  overview:
    "A **Arara-Azul-Grande** (Anodorhynchus hyacinthinus) é a maior espécie de arara do mundo e um dos símbolos mais emblemáticos do Pantanal. Com sua plumagem azul-cobalto intensa e o anel amarelo ao redor dos olhos, é uma das aves mais fotografadas do Brasil.\n\nApesar de sua beleza, a espécie enfrentou graves ameaças de extinção nas décadas de 1980 e 1990 devido ao tráfico de animais e à destruição de habitat. Graças a intensos programas de conservação — muitos dos quais apoiados por pousadas e reservas como a Itaicy — a população se estabilizou e hoje é estimada em cerca de **6.500 indivíduos** na natureza.\n\nNo Pantanal, a arara-azul é frequentemente avistada em bandos de 6 a 12 indivíduos, especialmente ao amanhecer, quando voam em formação sobre as copas das árvores.",
  diet: "A dieta da arara-azul é baseada em nozes de palmeiras, especialmente bocaiúva (Acrocomia aculeata) e acuri (Attalea phalerata). Seu bico poderoso é capaz de quebrar cascas extremamente duras que nenhuma outra ave consegue abrir. Também se alimenta de frutas e sementes de outras espécies vegetais do cerrado e pantanal.",
  behavior:
    "São aves altamente sociais e monogâmicas, formando casais que permanecem juntos por toda a vida. O casal nidifica em cavidades naturais de árvores grandes, com preferência pelo manduvi. A fêmea põe geralmente 2 ovos, mas na maioria das vezes apenas um filhote sobrevive. O período de incubação dura cerca de 30 dias, e o filhote permanece no ninho por até 3 meses.",
  bestTime:
    "A arara-azul pode ser observada durante todo o ano no Pantanal, mas os melhores avistamentos ocorrem entre junho e setembro (estação seca). Neste período, as aves se concentram em áreas com palmeiras frutificando. O melhor horário é ao amanhecer (5h30-7h), quando saem dos dormitórios em bandos ruidosos.",
  photographyTips: [
    "O anel amarelo ao redor dos olhos é o diferencial — capture-o com luz lateral suave.",
    "Fotografe ao amanhecer quando voam em bandos contra o céu claro.",
    "Em palmeirais de bocaiúva, espere — elas voltam regularmente para se alimentar.",
    "Use velocidade alta (1/2000s+) para congelar o voo e capturar a envergadura.",
    "Os ninhos no manduvi são fotogênicos, mas mantenha distância de pelo menos 30 metros.",
  ],
  relatedSlugs: ["tuiuiu", "arara-vermelha", "joao-pinto"],
};

const birdDetails: BirdSpeciesDetail[] = [tuiuiuDetail, araraAzulDetail];

export function getBirdBySlug(slug: string): BirdSpeciesDetail | undefined {
  return birdDetails.find((b) => b.slug === slug);
}

export function getRelatedBirds(currentSlug: string): BirdSpecies[] {
  const bird = birdDetails.find((b) => b.slug === currentSlug);
  if (bird) {
    return bird.relatedSlugs
      .map((s) => allBirds.find((b) => b.slug === s))
      .filter((b): b is BirdSpecies => b !== undefined)
      .slice(0, 3);
  }
  return allBirds
    .filter((b) => b.slug !== currentSlug)
    .slice(0, 3);
}
