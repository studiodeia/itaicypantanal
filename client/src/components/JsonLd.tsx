import { Helmet } from "react-helmet-async";

interface JsonLdProps {
  /** One or more JSON-LD objects to inject */
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Injects JSON-LD structured data into <head>.
 *
 * Usage:
 *   <JsonLd data={lodgingBusinessSchema} />
 *   <JsonLd data={[faqSchema, reviewSchema]} />
 */
export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <Helmet>
      {items.map((item, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify({ "@context": "https://schema.org", ...item })}
        </script>
      ))}
    </Helmet>
  );
}

// ─── Pre-built schema generators ───────────────────────────────────

const SITE_NAME = "Itaicy Pantanal Eco Lodge";

export function buildLodgingBusiness() {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return {
    "@type": "LodgingBusiness",
    name: SITE_NAME,
    description:
      "Eco lodge no Pantanal Sul-Matogrossense em Miranda, MS. Pesca esportiva catch-and-release cota zero, observacao de 166 especies de aves catalogadas e safaris fotograficos de ecoturismo.",
    url: origin,
    telephone: "+55 67 99999-0000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Estrada Parque, s/n",
      addressLocality: "Miranda",
      addressRegion: "MS",
      postalCode: "79380-000",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -19.83,
      longitude: -56.68,
    },
    image: `${origin}/images/og-default.webp`,
    priceRange: "$$$$",
    starRating: {
      "@type": "Rating",
      ratingValue: "5",
    },
    checkinTime: "14:00",
    checkoutTime: "11:00",
    petsAllowed: false,
    smokingAllowed: false,
    numberOfRooms: 10,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Pesca esportiva catch-and-release (cota zero)", value: true },
      { "@type": "LocationFeatureSpecification", name: "Observacao de aves guiada (166 especies)", value: true },
      { "@type": "LocationFeatureSpecification", name: "Safaris fotograficos e ecoturismo", value: true },
      { "@type": "LocationFeatureSpecification", name: "Culinaria pantaneira regional", value: true },
      { "@type": "LocationFeatureSpecification", name: "Wi-Fi gratuito", value: true },
      { "@type": "LocationFeatureSpecification", name: "Ar-condicionado", value: true },
      { "@type": "LocationFeatureSpecification", name: "Passeios de barco no Rio Negro", value: true },
      { "@type": "LocationFeatureSpecification", name: "Trilhas ecologicas guiadas", value: true },
    ],
    knowsAbout: [
      "Pesca esportiva no Pantanal",
      "Observacao de aves (birdwatching) no Pantanal",
      "Ecoturismo sustentavel",
      "Conservacao da biodiversidade pantaneira",
      "Projeto Cota Zero - pesca sem extracao",
      "Fauna e flora do Pantanal Sul-Matogrossense",
    ],
    audience: {
      "@type": "PeopleAudience",
      audienceType: "Pescadores esportivos, observadores de aves, ecoturistas, fotografos de natureza, casais, familias",
    },
    containedInPlace: {
      "@type": "TouristDestination",
      name: "Pantanal Sul-Matogrossense",
      description: "Maior planicie alagavel do mundo, Patrimonio Natural da Humanidade (UNESCO). Abriga mais de 4.700 especies de plantas e animais.",
      geo: {
        "@type": "GeoCoordinates",
        latitude: -19.83,
        longitude: -56.68,
      },
    },
    paymentAccepted: "Cash, Credit Card, Debit Card, Pix",
    currenciesAccepted: "BRL",
  };
}

export function buildOrganization() {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return {
    "@type": "Organization",
    name: SITE_NAME,
    legalName: SITE_NAME,
    url: origin,
    logo: `${origin}/images/icons/logo.svg`,
    foundingDate: "2024",
    description:
      "Eco lodge no Pantanal Sul-Matogrossense especializado em pesca esportiva catch-and-release, observacao de aves e ecoturismo sustentavel.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Estrada Parque, s/n",
      addressLocality: "Miranda",
      addressRegion: "MS",
      postalCode: "79380-000",
      addressCountry: "BR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-67-99999-0000",
      contactType: "reservations",
      availableLanguage: ["Portuguese", "English"],
    },
    sameAs: [
      "https://www.instagram.com/itaicypantanal",
      "https://www.facebook.com/itaicypantanal",
      "https://www.tripadvisor.com.br/itaicypantanal",
    ],
  };
}

export function buildWebSite() {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return {
    "@type": "WebSite",
    name: SITE_NAME,
    url: origin,
    inLanguage: ["pt-BR", "en", "es"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${origin}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildFAQPage(
  items: { question: string; answer: string }[],
) {
  return {
    "@type": "FAQPage",
    datePublished: "2024-05-01",
    dateModified: "2026-02-16",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── Known author profiles for E-E-A-T signals ──────────────────────

interface AuthorProfile {
  name: string;
  jobTitle: string;
  affiliation: string;
  knowsAbout: string[];
  sameAs?: string[];
}

const authorProfiles: Record<string, AuthorProfile> = {
  "Lucas Vieira": {
    name: "Lucas José Fernandes Vieira",
    jobTitle: "Editor de Conteúdo e Guia Regional",
    affiliation: SITE_NAME,
    knowsAbout: [
      "Pesca esportiva no Pantanal",
      "Ecoturismo sustentável",
      "Fauna e flora do Pantanal Sul-Matogrossense",
      "Culinária pantaneira",
    ],
  },
  "Lucas José Fernandes Vieira": {
    name: "Lucas José Fernandes Vieira",
    jobTitle: "Editor de Conteúdo e Guia Regional",
    affiliation: SITE_NAME,
    knowsAbout: [
      "Pesca esportiva no Pantanal",
      "Ecoturismo sustentável",
      "Fauna e flora do Pantanal Sul-Matogrossense",
      "Culinária pantaneira",
    ],
  },
  "João Andriola": {
    name: "João Andriola",
    jobTitle: "Ornitólogo",
    affiliation: SITE_NAME,
    knowsAbout: [
      "Ornitologia neotropical",
      "Observação de aves no Pantanal",
      "Levantamento e catalogação de espécies",
      "Conservação da biodiversidade",
    ],
  },
};

function buildAuthorPerson(authorName: string, origin: string) {
  const profile = authorProfiles[authorName];
  if (profile) {
    return {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.jobTitle,
      worksFor: {
        "@type": "LodgingBusiness",
        name: profile.affiliation,
        url: origin,
      },
      knowsAbout: profile.knowsAbout,
      ...(profile.sameAs && profile.sameAs.length > 0 && { sameAs: profile.sameAs }),
    };
  }
  return { "@type": "Person", name: authorName || SITE_NAME };
}

export function buildBlogPosting(article: {
  title: string;
  description?: string;
  author?: string;
  date?: string;
  image?: string;
  url: string;
}) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return {
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    author: buildAuthorPerson(article.author || SITE_NAME, origin),
    datePublished: article.date,
    dateModified: article.date,
    image: article.image
      ? article.image.startsWith("http")
        ? article.image
        : `${origin}${article.image}`
      : undefined,
    url: `${origin}${article.url}`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: origin,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${origin}${article.url}`,
    },
  };
}

// ─── Known Wikidata QIDs for species sameAs links ───────────────────

const speciesWikidata: Record<string, { qid: string; wpPT?: string; wpEN?: string }> = {
  "Anodorhynchus hyacinthinus": { qid: "Q132576", wpPT: "https://pt.wikipedia.org/wiki/Arara-azul-grande", wpEN: "https://en.wikipedia.org/wiki/Hyacinth_macaw" },
  "Jabiru mycteria": { qid: "Q17970", wpPT: "https://pt.wikipedia.org/wiki/Jaburu", wpEN: "https://en.wikipedia.org/wiki/Jabiru" },
  "Mycteria americana": { qid: "Q990175", wpPT: "https://pt.wikipedia.org/wiki/Cabeça-seca", wpEN: "https://en.wikipedia.org/wiki/Wood_stork" },
  "Icterus croconotus": { qid: "Q1307046", wpPT: "https://pt.wikipedia.org/wiki/João-pinto", wpEN: "https://en.wikipedia.org/wiki/Orange-backed_troupial" },
  "Anhinga anhinga": { qid: "Q469940", wpPT: "https://pt.wikipedia.org/wiki/Biguatinga", wpEN: "https://en.wikipedia.org/wiki/Anhinga" },
  "Ara chloropterus": { qid: "Q520698", wpPT: "https://pt.wikipedia.org/wiki/Arara-vermelha-grande", wpEN: "https://en.wikipedia.org/wiki/Red-and-green_macaw" },
  "Ardea alba": { qid: "Q148873", wpPT: "https://pt.wikipedia.org/wiki/Garça-branca-grande", wpEN: "https://en.wikipedia.org/wiki/Great_egret" },
  "Platalea ajaja": { qid: "Q667466", wpPT: "https://pt.wikipedia.org/wiki/Colhereiro", wpEN: "https://en.wikipedia.org/wiki/Roseate_spoonbill" },
  "Harpia harpyja": { qid: "Q159810", wpPT: "https://pt.wikipedia.org/wiki/Gavião-real", wpEN: "https://en.wikipedia.org/wiki/Harpy_eagle" },
  "Nyctibius griseus": { qid: "Q622584", wpPT: "https://pt.wikipedia.org/wiki/Urutau", wpEN: "https://en.wikipedia.org/wiki/Common_potoo" },
};

export function buildTaxon(species: {
  commonName: string;
  scientificName: string;
  description?: string;
  conservationStatus?: string;
  size?: string;
  habitat?: string;
  image?: string;
  slug: string;
}) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const wikiLinks = speciesWikidata[species.scientificName];
  const sameAs: string[] = [];
  if (wikiLinks) {
    sameAs.push(`https://www.wikidata.org/wiki/${wikiLinks.qid}`);
    if (wikiLinks.wpPT) sameAs.push(wikiLinks.wpPT);
    if (wikiLinks.wpEN) sameAs.push(wikiLinks.wpEN);
  }

  return {
    "@type": "Taxon",
    name: species.scientificName,
    alternateName: species.commonName,
    taxonRank: "species",
    description: species.description,
    url: `${origin}/observacao-de-aves/catalogo/${species.slug}`,
    image: species.image
      ? species.image.startsWith("http")
        ? species.image
        : `${origin}${species.image}`
      : undefined,
    ...(sameAs.length > 0 && { sameAs }),
    ...(species.conservationStatus && {
      hasDefinedTerm: {
        "@type": "DefinedTerm",
        name: `IUCN ${species.conservationStatus}`,
        inDefinedTermSet: "IUCN Red List",
      },
    }),
    isPartOf: {
      "@type": "TouristDestination",
      name: "Pantanal Sul-Matogrossense",
    },
    contributor: {
      "@type": "Person",
      name: "João Andriola",
      jobTitle: "Ornitólogo",
      description: "Levantamento de campo com 166 espécies catalogadas, maio de 2024",
    },
  };
}

export function buildItemList(items: { name: string; url: string; position: number }[]) {
  return {
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  };
}

export function buildTourProduct(tour: {
  name: string;
  description: string;
  url: string;
  image?: string;
  provider?: string;
}) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return {
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.description,
    url: `${origin}${tour.url}`,
    datePublished: "2024-05-01",
    dateModified: "2026-02-16",
    image: tour.image
      ? tour.image.startsWith("http")
        ? tour.image
        : `${origin}${tour.image}`
      : undefined,
    touristType: [
      "Eco-tourists",
      "Nature lovers",
      "Wildlife photographers",
    ],
    provider: {
      "@type": "LodgingBusiness",
      name: tour.provider || SITE_NAME,
      url: origin,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "BRL",
      url: `${origin}${tour.url}`,
      seller: {
        "@type": "LodgingBusiness",
        name: SITE_NAME,
      },
    },
  };
}

// ─── Seasonal Event schemas for temporal query matching ──────────────

export function buildSeasonalEvents() {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  return [
    {
      "@type": "Event",
      name: "Temporada de Pesca Esportiva no Pantanal",
      description:
        "Temporada de pesca esportiva catch-and-release no Pantanal Sul-Matogrossense. Pintado, pacu, dourado e mais de 260 especies. Projeto Cota Zero — todo peixe devolvido vivo.",
      startDate: `${currentYear}-03-01`,
      endDate: `${currentYear}-10-31`,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: SITE_NAME,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Miranda",
          addressRegion: "MS",
          addressCountry: "BR",
        },
      },
      organizer: {
        "@type": "Organization",
        name: SITE_NAME,
        url: origin,
      },
      url: `${origin}/pesca`,
      image: `${origin}/images/home/expedition-pesca.webp`,
    },
    {
      "@type": "Event",
      name: "Alta Temporada de Observacao de Aves no Pantanal",
      description:
        "Melhor epoca para birdwatching no Pantanal. 166 especies catalogadas incluindo Tuiuiu (Jabiru mycteria) e Arara-Azul-Grande (Anodorhynchus hyacinthinus). Roteiros guiados ao amanhecer e entardecer.",
      startDate: `${currentYear}-07-01`,
      endDate: `${currentYear}-10-31`,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: SITE_NAME,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Miranda",
          addressRegion: "MS",
          addressCountry: "BR",
        },
      },
      organizer: {
        "@type": "Organization",
        name: SITE_NAME,
        url: origin,
      },
      url: `${origin}/observacao-de-aves`,
      image: `${origin}/images/home/expedition-birdwatching.webp`,
    },
    {
      "@type": "Event",
      name: "Temporada de Cheia — Safaris Fotograficos no Pantanal",
      description:
        "Epoca de cheia no Pantanal (outubro a marco). Paisagens espetaculares com campos alagados, fauna concentrada e oportunidades unicas de fotografia de natureza.",
      startDate: `${currentYear}-10-01`,
      endDate: `${nextYear}-03-31`,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: SITE_NAME,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Miranda",
          addressRegion: "MS",
          addressCountry: "BR",
        },
      },
      organizer: {
        "@type": "Organization",
        name: SITE_NAME,
        url: origin,
      },
      url: `${origin}/ecoturismo`,
      image: `${origin}/images/home/expedition-ecoturismo.webp`,
    },
  ];
}

export function buildAggregateRating(
  reviews: { author: string; rating: number; text: string }[],
) {
  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return {
    "@type": "LodgingBusiness",
    name: SITE_NAME,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: reviews.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
      reviewBody: r.text,
    })),
  };
}
