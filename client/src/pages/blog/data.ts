export interface BlogArticle {
  slug: string;
  title: string;
  subtitle: string;
  description?: string;
  tag: string;
  primaryCategory: string;
  categories: string[];
  src: string;
  author: string;
  date: string;
  readingTime: string;
}

export type ArticleContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | {
      type: "species";
      name: string;
      scientificName: string;
      description: string;
      image: string;
    }
  | {
      type: "orderedList";
      items: Array<{ bold: string; text: string }>;
    };

export interface BlogArticleDetail extends BlogArticle {
  heroImage: string;
  content: ArticleContentBlock[];
  relatedSlugs: string[];
}

export const categories = [
  "Todas",
  "Aventura",
  "Gastronomia",
  "Conservação",
  "Sustentabilidade",
  "Roteiros Guiados",
  "Eventos e Workshops",
] as const;

export type BlogCategory = (typeof categories)[number];

/** Maps display category name → URL slug */
export const categorySlugMap: Record<string, string> = {
  Aventura: "aventura",
  Gastronomia: "gastronomia",
  Conservação: "conservacao",
  Sustentabilidade: "sustentabilidade",
  "Roteiros Guiados": "roteiros-guiados",
  "Eventos e Workshops": "eventos-e-workshops",
};

/** Maps URL slug → display category name */
export const slugToCategoryMap: Record<string, string> = Object.fromEntries(
  Object.entries(categorySlugMap).map(([k, v]) => [v, k]),
);

/** Returns the canonical URL for an article: /blog/:categorySlug/:articleSlug */
export function getArticleUrl(article: BlogArticle): string {
  const catSlug = categorySlugMap[article.primaryCategory] || "geral";
  return `/blog/${catSlug}/${article.slug}`;
}

export const featuredArticle: BlogArticle = {
  slug: "guia-observacao-166-especies-aves",
  title: "Guia de Observação: As 166 Espécies de Aves Vistas na Itaicy",
  subtitle: "Aventura",
  description:
    "Em uma expedição de apenas 5 dias, catalogamos 166 espécies de aves em nossa reserva. Neste guia, apresentamos a lista completa para você.",
  tag: "Aventura",
  primaryCategory: "Aventura",
  categories: ["Aventura", "Conservação"],
  src: "/images/blog-hero-bg",
  author: "Lucas José Fernandes Vieira",
  date: "09 de Agosto, 2025",
  readingTime: "10 minutos de leitura",
};

export const recentArticles: BlogArticle[] = [
  {
    slug: "arara-azul-pantanal",
    title: "Arara-Azul",
    subtitle: "Anodorhynchus hyacinthinus",
    description:
      "A maior arara do mundo, símbolo do Pantanal. Suas plumagens azul-cobalto hipnotizam observadores.",
    tag: "Fauna",
    primaryCategory: "Conservação",
    categories: ["Conservação", "Aventura"],
    src: "/images/blog-recent-1",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
    readingTime: "15 minutos de leitura",
  },
  {
    slug: "arara-vermelha-pantanal",
    title: "Arara-Vermelha",
    subtitle: "Ara chloropterus",
    description:
      "Ave de grande porte, possui plumagem vermelha e é conhecida por seu canto potente que ressoa nas florestas do Pantanal.",
    tag: "Fauna",
    primaryCategory: "Conservação",
    categories: ["Conservação"],
    src: "/images/blog-recent-2",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
    readingTime: "12 minutos de leitura",
  },
  {
    slug: "ibis-preto-pantanal",
    title: "Íbis-Preto",
    subtitle: "Plegadis chihi",
    description:
      "Ave aquática que se destaca pelo seu longo bico curvo e plumagem iridescente, comum em áreas alagadas.",
    tag: "Fauna",
    primaryCategory: "Conservação",
    categories: ["Conservação"],
    src: "/images/blog-recent-3",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
    readingTime: "10 minutos de leitura",
  },
];

export const allArticles: BlogArticle[] = [
  {
    slug: "guia-100-especies-mamiferos",
    title: "Guia Prático: As 100 Espécies de Mamíferos do Pantanal",
    subtitle: "20 minutos de leitura",
    tag: "Fauna",
    primaryCategory: "Conservação",
    categories: ["Conservação", "Aventura"],
    src: "/images/blog-article-1",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
    readingTime: "20 minutos de leitura",
  },
  {
    slug: "biodiversidade-plantas-nativas",
    title: "Explorando a Biodiversidade: 50 Plantas Nativas do Brasil",
    subtitle: "30 minutos de leitura",
    tag: "Conservação",
    primaryCategory: "Conservação",
    categories: ["Conservação", "Sustentabilidade"],
    src: "/images/blog-article-2",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
    readingTime: "30 minutos de leitura",
  },
  {
    slug: "rios-lagos-vida-aquatica",
    title: "Rios e Lagos: A Vida Aquática do Brasil",
    subtitle: "25 minutos de leitura",
    tag: "Aventura",
    primaryCategory: "Aventura",
    categories: ["Aventura"],
    src: "/images/blog-article-3",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
    readingTime: "25 minutos de leitura",
  },
  {
    slug: "receitas-pantaneiras-sabores",
    title: "Receitas Pantaneiras: Os Sabores Autênticos da Terra",
    subtitle: "15 minutos de leitura",
    tag: "Gastronomia",
    primaryCategory: "Gastronomia",
    categories: ["Gastronomia"],
    src: "/images/blog-article-4",
    author: "Lucas Vieira",
    date: "15 de Julho, 2025",
    readingTime: "15 minutos de leitura",
  },
  {
    slug: "turismo-sustentavel-pantanal",
    title: "Turismo Sustentável: Como Preservar o Pantanal",
    subtitle: "20 minutos de leitura",
    tag: "Sustentabilidade",
    primaryCategory: "Sustentabilidade",
    categories: ["Sustentabilidade", "Conservação"],
    src: "/images/blog-article-5",
    author: "Lucas Vieira",
    date: "10 de Julho, 2025",
    readingTime: "20 minutos de leitura",
  },
  {
    slug: "trilha-rio-cuiaba-roteiro",
    title: "Trilha do Rio Cuiabá: Roteiro Completo de 3 Dias",
    subtitle: "25 minutos de leitura",
    tag: "Roteiros Guiados",
    primaryCategory: "Roteiros Guiados",
    categories: ["Roteiros Guiados", "Aventura"],
    src: "/images/blog-article-6",
    author: "Lucas Vieira",
    date: "05 de Julho, 2025",
    readingTime: "25 minutos de leitura",
  },
  {
    slug: "workshop-fotografia-natureza",
    title: "Workshop de Fotografia: Capturando a Essência do Pantanal",
    subtitle: "10 minutos de leitura",
    tag: "Eventos e Workshops",
    primaryCategory: "Eventos e Workshops",
    categories: ["Eventos e Workshops"],
    src: "/images/blog-article-7",
    author: "Lucas Vieira",
    date: "01 de Julho, 2025",
    readingTime: "10 minutos de leitura",
  },
  {
    slug: "conservacao-araras-projeto",
    title: "Conservação das Araras: Um Projeto de Sucesso no Pantanal",
    subtitle: "20 minutos de leitura",
    tag: "Conservação",
    primaryCategory: "Conservação",
    categories: ["Conservação"],
    src: "/images/blog-article-8",
    author: "Lucas Vieira",
    date: "25 de Junho, 2025",
    readingTime: "20 minutos de leitura",
  },
  {
    slug: "pesca-esportiva-guia-iniciantes",
    title: "Pesca Esportiva: Guia Completo para Iniciantes",
    subtitle: "30 minutos de leitura",
    tag: "Aventura",
    primaryCategory: "Aventura",
    categories: ["Aventura"],
    src: "/images/blog-article-9",
    author: "Lucas Vieira",
    date: "20 de Junho, 2025",
    readingTime: "30 minutos de leitura",
  },
];

// -- Article detail data (rich content for individual article pages) --

const featuredArticleDetail: BlogArticleDetail = {
  ...featuredArticle,
  heroImage: "/images/article-hero",
  relatedSlugs: [
    "arara-azul-pantanal",
    "arara-vermelha-pantanal",
    "ibis-preto-pantanal",
  ],
  content: [
    {
      type: "paragraph",
      text: "O Pantanal é, por si só, um dos maiores e mais ricos santuários de vida selvagem do planeta. Mas o que acontece quando você tem acesso a uma porção desse paraíso que é protegida, remota e praticamente intocada pelo turismo de massa?\n\nA resposta é um espetáculo de biodiversidade que supera expectativas. Em uma expedição técnica de apenas 5 dias realizada em nossa reserva, especialistas e guias locais catalogaram um total impressionante de **166 espécies de aves**.\n\nEste guia não é apenas uma lista de verificação; é a prova viva da riqueza do nosso ecossistema e um convite aberto para você explorar esse paraíso conosco.",
    },
    {
      type: "heading",
      text: "Por que a Itaicy é um Santuário para Observadores?",
    },
    {
      type: "paragraph",
      text: "O segredo por trás desse número extraordinário não é o acaso, mas a localização privilegiada.\n\nA Itaicy Ecoturismo está situada em uma área preservada do Pantanal, onde o ecossistema se mantém equilibrado, silencioso e livre da pressão do turismo convencional.\n\nAqui, as aves se comportam com naturalidade, e nossos hóspedes encontram uma experiência de observação autêntica, silenciosa e profundamente imersiva.",
    },
    {
      type: "heading",
      text: "Destaques da Nossa Avifauna: As Estrelas do Pantanal",
    },
    {
      type: "paragraph",
      text: "Embora cada uma das 166 espécies seja um espetáculo, algumas são os verdadeiros símbolos da região e avistamentos frequentes em nossas expedições.",
    },
    {
      type: "species",
      name: "A Arara-Azul-Grande",
      scientificName: "(Anodorhynchus hyacinthinus)",
      description:
        "O ícone do Pantanal. Nossas áreas preservadas de matas e palmeirais são o lar e local de alimentação perfeito para a maior arara do mundo. O som distinto e a cor vibrante dessas aves voando em bandos ao amanhecer é uma memória inesquecível.",
      image: "/images/article-arara-azul",
    },
    {
      type: "species",
      name: "O Tuiuiú",
      scientificName: "(Jabiru mycteria)",
      description:
        "Conhecido como o símbolo do Pantanal, o Tuiuiú é uma cegonha imponente que pode ser visto nas áreas alagadas. Seu bico longo e reto é adaptado para pescar, e sua presença majestosa é um espetáculo durante a época de reprodução.",
      image: "/images/article-tuiuiu",
    },
    {
      type: "species",
      name: "A Garça-Branca-Grande",
      scientificName: "(Ardea alba)",
      description:
        "Com seu elegante porte e plumagem branca, a Garça-Branca-Grande é comum nas lagoas e campos do Pantanal. Além de ser um belo exemplo da fauna local, é um predador eficaz, caçando peixes e pequenos animais com agilidade.",
      image: "/images/article-garca-branca",
    },
    {
      type: "heading",
      text: "Explore o Guia Completo: O Compêndio da Itaicy",
    },
    {
      type: "paragraph",
      text: 'As estrelas acima são apenas o começo. Nossa lista completa inclui dezenas de espécies de aves de rapina, tucanos, pica-paus, aves aquáticas e migratórias.\n\nComo entendemos que esse material é crucial tanto para entusiastas quanto para o ranqueamento de nosso site, preparamos duas ferramentas essenciais:',
    },
    {
      type: "orderedList",
      items: [
        {
          bold: "O Compêndio Digital Interativo",
          text: ' Como sugerido em nosso planejamento, criamos uma seção inteira em nosso site que funciona como um "blog" de espécies. Lá, você pode buscar por nome, ver fotos de cada ave, ler descrições e aprender sobre seus hábitos—um verdadeiro guia de campo digital.',
        },
        {
          bold: "O Relatório Oficial (PDF para Download)",
          text: ' Para quem prefere um material de campo, transformamos o relatório técnico original em um PDF bonito e diagramado, perfeito para baixar antes da sua viagem. Ele serve como a "isca" perfeita para atrair observadores sérios e como seu checklist pessoal durante a expedição.',
        },
      ],
    },
    {
      type: "heading",
      text: "Sua Aventura Começa Aqui",
    },
    {
      type: "paragraph",
      text: "Ver esta lista é inspirador, mas observar essas aves ao vivo é transformador. Na Itaicy, sua expedição de Observação de pássaros é completa.\n\nNossos guias locais são especialistas—eles não apenas conhecem os nomes, mas também os cantos, os hábitos e os locais exatos onde as aves mais raras costumam estar. Seja em um passeio de barco silencioso ao amanhecer, em uma caminhada por trilhas preservadas ou em nossos passeios a cavalo, nosso objetivo é colocar você no lugar certo, na hora certa.\n\nPrepare seus binóculos e sua câmera. O santuário está esperando por você.",
    },
  ],
};

const articleDetails: BlogArticleDetail[] = [featuredArticleDetail];

export function getArticleBySlug(
  slug: string,
): BlogArticleDetail | undefined {
  return articleDetails.find((a) => a.slug === slug);
}

export function getRelatedArticles(currentSlug: string): BlogArticle[] {
  const article = articleDetails.find((a) => a.slug === currentSlug);
  if (article) {
    return article.relatedSlugs
      .map(
        (s) =>
          recentArticles.find((a) => a.slug === s) ||
          allArticles.find((a) => a.slug === s),
      )
      .filter((a): a is BlogArticle => a !== undefined)
      .slice(0, 3);
  }
  // Fallback: return first 3 articles that aren't the current
  return [...recentArticles, ...allArticles]
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 3);
}
