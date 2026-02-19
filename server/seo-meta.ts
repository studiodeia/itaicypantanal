/**
 * Server-side meta tag injection for AI crawlers and social sharing.
 *
 * AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do NOT execute JavaScript.
 * Without SSR, they only see the generic <title> and <meta> from index.html.
 * This module injects per-route title, description, OG tags, canonical URL,
 * and a <noscript> content block so crawlers see real page content.
 */

import { getCmsContent } from "./cms-content";

const SITE_NAME = "Itaicy Pantanal Eco Lodge";
const DEFAULT_OG_IMAGE = "/images/og-default.webp";

interface RouteMeta {
  title: string;
  description: string;
  ogImage?: string;
  /** Plain-text summary for <noscript> — helps AI crawlers index key content */
  noscriptSummary?: string;
  /** Per-route JSON-LD schemas (injected server-side for AI crawlers) */
  jsonLd?: Record<string, unknown>[];
}

/**
 * Static route metadata — mirrors what each page's <PageMeta> sets client-side.
 * For dynamic routes (blog articles, bird species), we fall back to defaults.
 */
const routeMetaMap: Record<string, RouteMeta> = {
  "/": {
    title:
      "Eco Lodge Premium no Pantanal | Pesca Esportiva, Birdwatching e Ecoturismo",
    description:
      "Eco lodge no Pantanal Sul-Matogrossense em Miranda, MS. Pesca esportiva cota zero, observacao de 166 especies de aves e safaris fotograficos. Reserve sua experiencia autentica.",
    noscriptSummary:
      "A Itaicy Pantanal Eco Lodge fica em Miranda, Mato Grosso do Sul, no coracao do Pantanal Sul-Matogrossense, Patrimonio Natural da Humanidade pela UNESCO. Oferecemos tres experiencias principais: pesca esportiva catch-and-release (Projeto Cota Zero), observacao de aves com 166 especies catalogadas pelo ornitologo Joao Andriola em maio de 2024, e safaris fotograficos de ecoturismo. Nossas acomodacoes sao climatizadas com vista para a natureza, e a culinaria regional inclui pacu assado, arroz carreteiro e ingredientes do Pantanal. Estamos a 240 km de Campo Grande (3h de carro) e 80 km de Bonito. A melhor epoca para visitar e a seca, de maio a setembro, ideal para pesca e avistamento de fauna.",
  },
  "/pesca": {
    title: "Pesca Esportiva no Pantanal — Como Pescar no Rio Negro",
    description:
      "Pesca esportiva no Pantanal com guias locais experientes. Pintado, pacu, dourado e mais de 260 especies em um dos melhores destinos de pesca do mundo.",
    ogImage: "/images/home/expedition-pesca.webp",
    noscriptSummary:
      "Onde pescar no Pantanal? A Itaicy Pantanal Eco Lodge oferece pesca esportiva catch-and-release no Rio Negro, no Pantanal Sul-Matogrossense. Nosso Projeto Cota Zero garante que todo peixe capturado e devolvido vivo ao rio, preservando o ecossistema. Quais peixes posso pescar? Os guias locais conhecem profundamente os rios e os habitos dos peixes, incluindo pintado, pacu, dourado, cachara e mais de 260 especies. Qual a melhor epoca para pesca no Pantanal? A temporada de pesca vai de marco a outubro, com pico de atividade entre maio e setembro durante a seca. Fornecemos equipamento profissional completo, barcos exclusivos e coletes salva-vidas. Pacotes de 3 a 7 noites com pensao completa.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: "Pesca Esportiva no Pantanal — Itaicy Eco Lodge",
        description:
          "Expedicoes de pesca esportiva catch-and-release no Rio Negro, Pantanal Sul-Matogrossense. Pintado, pacu, dourado e mais de 260 especies com guias locais experientes.",
        touristType: "Pescadores esportivos",
        provider: {
          "@type": "LodgingBusiness",
          name: "Itaicy Pantanal Eco Lodge",
          url: "https://itaicypantanal.com.br",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
        },
        datePublished: "2024-05-01",
        dateModified: "2026-02-16",
      },
    ],
  },
  "/observacao-de-aves": {
    title: "Observacao de Aves no Pantanal — Birdwatching com 166 Especies",
    description:
      "Mais de 650 especies de aves no Pantanal. Tuiuiu, arara-azul, tucanos e muito mais. Guias especializados e roteiros guiados de birdwatching.",
    ogImage: "/images/home/expedition-birdwatching.webp",
    noscriptSummary:
      "Quantas especies de aves tem no Pantanal? A regiao da Itaicy Pantanal Eco Lodge abriga 166 especies catalogadas pelo ornitologo Joao Andriola em expedicao de campo em maio de 2024. Quais aves posso ver? Entre as mais emblematicas estao o Tuiuiu (Jabiru mycteria), ave-simbolo do Pantanal, e a Arara-Azul-Grande (Anodorhynchus hyacinthinus), ameacada de extincao. Como funciona o birdwatching? Os roteiros sao guiados ao amanhecer e entardecer, quando a atividade das aves e mais intensa. Disponibilizamos binoculos, guias de campo e checklists personalizados. O Pantanal Sul-Matogrossense e considerado um dos melhores destinos de observacao de aves da America do Sul.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: "Observacao de Aves no Pantanal — Itaicy Eco Lodge",
        description:
          "166 especies catalogadas. Tuiuiu, arara-azul, tucanos e aves migratorias. Roteiros guiados ao amanhecer e entardecer com binoculos e checklists.",
        touristType: "Observadores de aves",
        provider: {
          "@type": "LodgingBusiness",
          name: "Itaicy Pantanal Eco Lodge",
          url: "https://itaicypantanal.com.br",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
        },
        datePublished: "2024-05-01",
        dateModified: "2026-02-16",
      },
    ],
  },
  "/observacao-de-aves/catalogo": {
    title: "Catalogo de Aves do Pantanal — 166 Especies com Fotos e Guia",
    description:
      "Guia completo de aves do Pantanal. Tuiuiu, arara-azul, tucanos, papagaios e dezenas de especies com fotos, habitats e dicas de observacao.",
    noscriptSummary:
      "Quais aves posso encontrar no Pantanal? Este catalogo inclui 166 especies catalogadas pelo ornitologo Joao Andriola na regiao da Itaicy, com nome popular, nome cientifico, familia taxonomica, habitat, dieta, comportamento e status de conservacao IUCN. Quais categorias de aves existem? As especies estao organizadas em aquaticas, papagaios, migratorias e noturnas. Especies destacadas incluem Tuiuiu (Jabiru mycteria), Arara-Azul-Grande (Anodorhynchus hyacinthinus), Colhereiro (Platalea ajaja) e Gaviao-Real (Harpia harpyja). Cada ficha inclui dicas de fotografia e melhor horario para observacao.",
  },
  "/ecoturismo": {
    title: "Ecoturismo no Pantanal — Trilhas, Safaris e Passeios de Barco",
    description:
      "Experiencias de ecoturismo sustentavel no Pantanal. Trilhas, safaris fotograficos, passeios de barco e imersao na maior planicie alagavel do mundo.",
    ogImage: "/images/home/expedition-ecoturismo.webp",
    noscriptSummary:
      "O que fazer no Pantanal alem da pesca? A Itaicy Pantanal Eco Lodge oferece experiencias de ecoturismo sustentavel na maior planicie alagavel do mundo. Quais atividades estao disponiveis? As opcoes incluem trilhas ecologicas guiadas, safaris fotograficos diurnos e noturnos, passeios de barco pelo Rio Negro e canoagem. Preciso de preparo fisico? Nivel de dificuldade adaptavel para todas as idades e condicoes fisicas. Todos os roteiros sao acompanhados por guias nativos certificados que conhecem profundamente o bioma Pantanal. O ecoturismo na Itaicy e projetado para minimizar o impacto ambiental e maximizar a conexao com a natureza.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: "Ecoturismo no Pantanal — Itaicy Eco Lodge",
        description:
          "Trilhas ecologicas, safaris fotograficos, passeios de barco e canoagem no Rio Negro. Guias nativos certificados e nivel de dificuldade adaptavel.",
        touristType: "Ecoturistas",
        provider: {
          "@type": "LodgingBusiness",
          name: "Itaicy Pantanal Eco Lodge",
          url: "https://itaicypantanal.com.br",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
        },
        datePublished: "2024-05-01",
        dateModified: "2026-02-16",
      },
    ],
  },
  "/culinaria": {
    title: "Culinaria Pantaneira — Pratos Tipicos e Gastronomia Regional",
    description:
      "Sabores autenticos do Pantanal preparados com ingredientes regionais. Gastronomia regional que conecta voce a cultura e a natureza.",
    noscriptSummary:
      "Quais sao os pratos tipicos do Pantanal? A culinaria da Itaicy Pantanal Eco Lodge inclui pacu assado na brasa, arroz carreteiro, sopa paraguaia, caldo de piranha e sobremesas com frutas nativas do cerrado. As refeicoes estao inclusas? Sim, a pensao completa esta inclusa nas diarias: cafe da manha, almoco e jantar. Atendem restricoes alimentares? Sim, atendemos dietas vegetarianas, celiacas e intolerancia a lactose com aviso previo. Os ingredientes sao regionais, valorizando a producao do Pantanal e do Cerrado. A experiencia gastronomica reflete a cultura pantaneira e ribeirinha da regiao de Miranda.",
  },
  "/acomodacoes": {
    title: "Acomodacoes no Pantanal — Suites Explorer, Adventure e Family",
    description:
      "Suites premium no coracao do Pantanal. Explorer para viajantes solo, Adventure para casais e Family para familias. Conforto, natureza e privacidade.",
    noscriptSummary:
      "Quais tipos de acomodacao a Itaicy oferece? A Itaicy Pantanal Eco Lodge possui 10 quartos em tres categorias: Suite Explorer para viajantes individuais, Suite Adventure para casais e lua de mel, e Suite Family para familias com ate 4 pessoas. O que esta incluso nos quartos? Todas as suites sao climatizadas, com Wi-Fi, frigobar e vista para a natureza. Qual o horario de check-in? Check-in as 14h, check-out as 11h. A estrutura inclui restaurante com culinaria pantaneira, varandas panoramicas e areas comuns confortaveis.",
  },
  "/blog": {
    title: "Blog",
    description:
      "Artigos sobre o Pantanal, fauna, flora, ecoturismo, pesca esportiva e observacao de aves. Dicas e guias para sua viagem ao Pantanal.",
    noscriptSummary:
      "Blog da Itaicy Pantanal Eco Lodge com artigos sobre pesca esportiva, observacao de aves, ecoturismo, fauna e flora do Pantanal, culinaria regional e guias de viagem. Conteudo atualizado regularmente com dicas praticas, roteiros sugeridos e informacoes sobre a biodiversidade do Pantanal Sul-Matogrossense.",
  },
  "/contato": {
    title: "Contato",
    description:
      "Entre em contato com o Itaicy Pantanal Eco Lodge. WhatsApp, email e telefone para reservas, duvidas e informacoes sobre sua viagem ao Pantanal.",
    noscriptSummary:
      "Entre em contato com a Itaicy Pantanal Eco Lodge para reservas e informacoes. Telefone: +55 67 99999-0000. Localizacao: Estrada Parque, s/n, Miranda, MS, CEP 79380-000. Aceitamos pagamentos por cartao de credito, debito, Pix e dinheiro.",
  },
  "/nosso-impacto": {
    title: "Nosso Impacto Ambiental — Conservacao e Sustentabilidade no Pantanal",
    description:
      "Conservacao ambiental, pesca sustentavel Cota Zero, protecao da biodiversidade e apoio a comunidades locais. Conheca o impacto positivo da Itaicy no Pantanal.",
    noscriptSummary:
      "O que e o Projeto Cota Zero? E o programa de pesca 100% catch-and-release da Itaicy onde todo peixe capturado e devolvido vivo ao Rio Negro. Como a Itaicy contribui para a conservacao? O impacto se organiza em quatro pilares: Rio Vivo (Projeto Cota Zero), Biodiversidade (166 especies de aves catalogadas pelo ornitologo Joao Andriola, monitoramento de fauna), Comunidade (emprego e capacitacao de guias nativos locais de Miranda) e Operacao Consciente (gestao de residuos, energia solar, captacao de agua da chuva). Somos comprometidos com o ecoturismo sustentavel e a preservacao do Pantanal como Patrimonio da Humanidade pela UNESCO.",
  },
  "/regiao": {
    title: "Pantanal Sul-Matogrossense — Como Chegar, Melhor Epoca e Clima",
    description:
      "Guia completo do Pantanal Sul-Matogrossense. Localizacao em Miranda (MS), como chegar de aviao ou carro, melhor epoca para visitar, clima por estacao e pontos turisticos proximos como Bonito.",
    noscriptSummary:
      "Como chegar ao Pantanal? Voo para Campo Grande (aeroporto CGR) com transfer terrestre de 3 horas pela BR-262 ate Miranda, MS. Qual a melhor epoca para visitar o Pantanal? A estacao seca (maio a setembro) e ideal para pesca esportiva e observacao de aves; a cheia (outubro a marco) proporciona paisagens espetaculares. Qual o clima no Pantanal? Tropical com seca (15-30°C) e cheia (25-40°C). A Itaicy Pantanal Eco Lodge fica no Pantanal Sul-Matogrossense, Patrimonio Natural da Humanidade pela UNESCO. O que visitar perto? Bonito (80 km, 1h30), Campo Grande (240 km, 3h) e Estrada Parque Pantanal.",
    jsonLd: (() => {
      const year = new Date().getFullYear();
      const nextYear = year + 1;
      const loc = {
        "@type": "Place",
        name: "Itaicy Pantanal Eco Lodge",
        address: { "@type": "PostalAddress", addressLocality: "Miranda", addressRegion: "MS", addressCountry: "BR" },
      };
      const org = { "@type": "Organization", name: "Itaicy Pantanal Eco Lodge", url: "https://itaicypantanal.com.br" };
      return [
        {
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Temporada de Pesca Esportiva no Pantanal",
          description: "Pesca esportiva catch-and-release no Rio Negro. Pintado, pacu, dourado e mais de 260 especies. Projeto Cota Zero.",
          startDate: `${year}-03-01`,
          endDate: `${year}-10-31`,
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: loc,
          organizer: org,
        },
        {
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Alta Temporada de Observacao de Aves no Pantanal",
          description: "Melhor epoca para birdwatching. 166 especies catalogadas incluindo Tuiuiu e Arara-Azul-Grande.",
          startDate: `${year}-07-01`,
          endDate: `${year}-10-31`,
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: loc,
          organizer: org,
        },
        {
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Temporada de Cheia — Safaris Fotograficos no Pantanal",
          description: "Paisagens espetaculares com campos alagados, fauna concentrada e fotografia de natureza.",
          startDate: `${year}-10-01`,
          endDate: `${nextYear}-03-31`,
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: loc,
          organizer: org,
        },
      ];
    })(),
  },
  "/politica-de-privacidade": {
    title: "Politica de Privacidade",
    description:
      "Politica de privacidade e protecao de dados do Itaicy Pantanal Eco Lodge conforme a LGPD. Saiba como coletamos, usamos e protegemos seus dados.",
  },
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Convert slug back to human-readable title */
function slugToTitle(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Resolve route metadata. Tries exact match first, then looks up dynamic
 * routes (blog articles, bird species) from CMS data for specific titles.
 */
async function getRouteMeta(path: string): Promise<RouteMeta | null> {
  // Exact match
  if (routeMetaMap[path]) return routeMetaMap[path];

  // Dynamic blog article: /blog/:category/:slug
  const blogMatch = path.match(/^\/blog\/[^/]+\/([^/]+)$/);
  if (blogMatch) {
    const articleSlug = blogMatch[1];
    try {
      const { content } = await getCmsContent();
      const article = content.blog.details.find((a) => a.slug === articleSlug);
      if (article) {
        const title = typeof article.title === "string" ? article.title : "";
        const desc = typeof article.description === "string" ? article.description : "";
        const heroImg = typeof article.heroImage === "string" ? article.heroImage : undefined;
        return {
          title: title || slugToTitle(articleSlug),
          description:
            desc ||
            `Artigo sobre ${slugToTitle(articleSlug)} no Pantanal — blog da Itaicy Pantanal Eco Lodge.`,
          ogImage: heroImg,
          noscriptSummary: desc || undefined,
        };
      }
    } catch {
      // Fall through to default
    }
    return {
      title: slugToTitle(articleSlug),
      description:
        `Artigo sobre ${slugToTitle(articleSlug)} — blog da Itaicy Pantanal Eco Lodge sobre o Pantanal, fauna, flora e ecoturismo.`,
    };
  }

  // Dynamic bird species: /observacao-de-aves/catalogo/:slug
  const birdMatch = path.match(/^\/observacao-de-aves\/catalogo\/([^/]+)$/);
  if (birdMatch) {
    const speciesSlug = birdMatch[1];
    try {
      const { content } = await getCmsContent();
      const species = content.birdwatching.details.find((s) => s.slug === speciesSlug);
      if (species) {
        const commonName = typeof species.commonName === "string" ? species.commonName : "";
        const sciName = typeof species.scientificName === "string" ? species.scientificName : "";
        const desc = typeof species.description === "string" ? species.description : "";
        const overview = typeof species.overview === "string" ? species.overview : "";
        const heroImg = typeof species.heroImage === "string" ? species.heroImage : undefined;
        const src = typeof species.src === "string" ? species.src : undefined;
        const displayName = commonName || slugToTitle(speciesSlug);
        return {
          title: `${displayName}${sciName ? ` (${sciName})` : ""}`,
          description:
            desc ||
            `Ficha completa de ${displayName} no Pantanal. Habitat, dieta, comportamento e dicas de observacao.`,
          ogImage: heroImg || src,
          noscriptSummary: overview || desc || undefined,
        };
      }
    } catch {
      // Fall through to default
    }
    return {
      title: `${slugToTitle(speciesSlug)} — Catalogo de Aves do Pantanal`,
      description:
        `Ficha completa de ${slugToTitle(speciesSlug)} no Pantanal Sul-Matogrossense. Nome cientifico, habitat, dieta e dicas de observacao.`,
    };
  }

  return null;
}

/**
 * Inject per-route meta tags into the HTML template.
 * Replaces the static <title> and <meta description> with route-specific values,
 * adds OG tags, canonical URL, and a <noscript> content block for AI crawlers.
 */
export async function injectRouteMeta(
  html: string,
  requestPath: string,
  baseUrl: string,
): Promise<string> {
  const meta = await getRouteMeta(requestPath);
  if (!meta) return html;

  const fullTitle = meta.title.includes(SITE_NAME)
    ? meta.title
    : `${meta.title} | ${SITE_NAME}`;

  const ogImageUrl = meta.ogImage
    ? `${baseUrl}${meta.ogImage}`
    : `${baseUrl}${DEFAULT_OG_IMAGE}`;

  const canonicalUrl = `${baseUrl}${requestPath === "/" ? "" : requestPath}`;

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(fullTitle)}</title>`,
  );

  // Replace <meta name="description">
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${escapeHtml(meta.description)}">`,
  );

  // Build additional meta tags to inject before </head>
  const extraTags = [
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}">`,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}">`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:image" content="${escapeHtml(ogImageUrl)}">`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}">`,
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    `<meta property="og:locale" content="pt_BR">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}">`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}">`,
    `<meta name="twitter:image" content="${escapeHtml(ogImageUrl)}">`,
  ];

  // Inject per-route JSON-LD schemas
  if (meta.jsonLd && meta.jsonLd.length > 0) {
    for (const schema of meta.jsonLd) {
      extraTags.push(
        `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
      );
    }
  }

  html = html.replace("</head>", `${extraTags.join("\n    ")}\n  </head>`);

  // Add <noscript> content block for AI crawlers that don't execute JS.
  // Placed inside <div id="root"> so it's replaced when React hydrates.
  if (meta.noscriptSummary) {
    const noscriptBlock = `<noscript><article><h1>${escapeHtml(fullTitle)}</h1><p>${escapeHtml(meta.description)}</p><p>${escapeHtml(meta.noscriptSummary)}</p></article></noscript>`;
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${noscriptBlock}</div>`,
    );
  }

  return html;
}
