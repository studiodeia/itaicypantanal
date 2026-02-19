import { useEffect, useState } from "react";
import { useLanguage, type Lang } from "@/i18n/context";
import {
  allBirds,
  categories as localCategories,
  featuredBirds,
  getBirdBySlug,
  type BirdSpecies,
  type BirdSpeciesDetail,
} from "./data";

const LOCALE_MAP: Record<Lang, string> = { pt: "pt", en: "en", es: "es" };

export type BirdCmsData = {
  categories: string[];
  allBirds: BirdSpecies[];
  featuredBirds: BirdSpecies[];
  details: BirdSpeciesDetail[];
};

function buildFallbackBirdData(): BirdCmsData {
  const details = allBirds
    .map((bird) => getBirdBySlug(bird.slug))
    .filter((bird): bird is BirdSpeciesDetail => Boolean(bird));

  return {
    categories: [...localCategories],
    allBirds,
    featuredBirds,
    details,
  };
}

export const fallbackBirdData = buildFallbackBirdData();

export function getBirdUrl(bird: BirdSpecies): string {
  return `/observacao-de-aves/catalogo/${bird.slug}`;
}

function normalizeBirdPayload(payload: {
  categories?: string[];
  species?: BirdSpecies[];
  details?: BirdSpeciesDetail[];
  featuredSlugs?: string[];
}): BirdCmsData {
  const species = payload.species ?? fallbackBirdData.allBirds;
  const details = payload.details ?? fallbackBirdData.details;
  const categories = payload.categories ?? fallbackBirdData.categories.slice(1);
  const categoriesWithAll = categories.includes("Todas")
    ? categories
    : ["Todas", ...categories];

  const featuredFromPayload = (payload.featuredSlugs ?? [])
    .map((slug) => species.find((bird) => bird.slug === slug))
    .filter((bird): bird is BirdSpecies => Boolean(bird))
    .slice(0, 2);
  const featured = featuredFromPayload.length > 0
    ? featuredFromPayload
    : fallbackBirdData.featuredBirds;

  return {
    categories: categoriesWithAll,
    allBirds: species,
    featuredBirds: featured,
    details,
  };
}

export async function fetchBirdCmsData(locale = "pt"): Promise<BirdCmsData> {
  try {
    const response = await fetch(`/api/cms/birdwatching?locale=${locale}`);
    if (!response.ok) {
      return fallbackBirdData;
    }

    const payload = (await response.json()) as {
      categories?: string[];
      species?: BirdSpecies[];
      details?: BirdSpeciesDetail[];
      featuredSlugs?: string[];
    };
    return normalizeBirdPayload(payload);
  } catch {
    return fallbackBirdData;
  }
}

export function getBirdBySlugFromCms(
  data: BirdCmsData,
  slug: string,
): BirdSpeciesDetail | undefined {
  return data.details.find((bird) => bird.slug === slug);
}

export function getRelatedBirdsFromCms(
  data: BirdCmsData,
  currentSlug: string,
): BirdSpecies[] {
  const bird = data.details.find((item) => item.slug === currentSlug);
  if (bird) {
    return bird.relatedSlugs
      .map((slug) => data.allBirds.find((item) => item.slug === slug))
      .filter((item): item is BirdSpecies => Boolean(item))
      .slice(0, 3);
  }

  return data.allBirds.filter((item) => item.slug !== currentSlug).slice(0, 3);
}

export function useBirdCmsData(): BirdCmsData {
  const { lang } = useLanguage();
  const [data, setData] = useState<BirdCmsData>(fallbackBirdData);

  useEffect(() => {
    const locale = LOCALE_MAP[lang] ?? "pt";
    let mounted = true;
    fetchBirdCmsData(locale).then((nextData) => {
      if (mounted) {
        setData(nextData);
      }
    });
    return () => {
      mounted = false;
    };
  }, [lang]);

  return data;
}

