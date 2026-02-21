import { useEffect, useState } from "react";
import { useLanguage, type Lang } from "@/i18n/context";
import {
  allFish,
  categories as localCategories,
  featuredFish,
  getFishBySlug,
  type FishSpecies,
  type FishSpeciesDetail,
} from "./data";

const LOCALE_MAP: Record<Lang, string> = { pt: "pt", en: "en", es: "es" };

export type FishCmsData = {
  categories: string[];
  allFish: FishSpecies[];
  featuredFish: FishSpecies[];
  details: FishSpeciesDetail[];
};

function buildFallbackFishData(): FishCmsData {
  const details = allFish
    .map((fish) => getFishBySlug(fish.slug))
    .filter((fish): fish is FishSpeciesDetail => Boolean(fish));

  return {
    categories: [...localCategories],
    allFish,
    featuredFish,
    details,
  };
}

export const fallbackFishData = buildFallbackFishData();

export function getFishUrl(fish: FishSpecies): string {
  return `/pesca/catalogo/${fish.slug}`;
}

export function getFishBySlugFromCms(
  data: FishCmsData,
  slug: string,
): FishSpeciesDetail | undefined {
  return data.details.find((fish) => fish.slug === slug);
}

export function getRelatedFishFromCms(
  data: FishCmsData,
  currentSlug: string,
): FishSpecies[] {
  const fish = data.details.find((item) => item.slug === currentSlug);
  if (fish) {
    return fish.relatedSlugs
      .map((slug) => data.allFish.find((item) => item.slug === slug))
      .filter((item): item is FishSpecies => Boolean(item))
      .slice(0, 3);
  }
  return data.allFish.filter((item) => item.slug !== currentSlug).slice(0, 3);
}

export function useFishCmsData(): FishCmsData {
  const { lang } = useLanguage();
  const [data, setData] = useState<FishCmsData>(fallbackFishData);

  useEffect(() => {
    const locale = LOCALE_MAP[lang] ?? "pt";
    // When a /api/cms/pesca endpoint is added, fetch here similar to birdwatching.
    // For now, use local fallback data.
    void locale;
    setData(fallbackFishData);
  }, [lang]);

  return data;
}
