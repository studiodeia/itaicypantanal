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
  return {
    "@type": "LodgingBusiness",
    name: SITE_NAME,
    description:
      "Eco lodge premium no coracao do Pantanal. Hospedagem, pesca esportiva, observacao de aves e experiencias de ecoturismo.",
    url: typeof window !== "undefined" ? window.location.origin : "",
    telephone: "+55 67 99999-0000",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Miranda",
      addressRegion: "MS",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -19.83,
      longitude: -56.68,
    },
    image: "/images/og-default.webp",
    priceRange: "$$$$",
    starRating: {
      "@type": "Rating",
      ratingValue: "5",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Pesca esportiva" },
      { "@type": "LocationFeatureSpecification", name: "Observacao de aves" },
      { "@type": "LocationFeatureSpecification", name: "Ecoturismo" },
      { "@type": "LocationFeatureSpecification", name: "Culinaria pantaneira" },
    ],
  };
}

export function buildWebSite() {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return {
    "@type": "WebSite",
    name: SITE_NAME,
    url: origin,
    inLanguage: "pt-BR",
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
    author: {
      "@type": "Person",
      name: article.author || SITE_NAME,
    },
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
