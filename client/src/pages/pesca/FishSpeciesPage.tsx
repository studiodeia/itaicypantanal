import { useParams } from "wouter";
import { PageMeta } from "@/components/PageMeta";
import { JsonLd, buildTaxon } from "@/components/JsonLd";
import {
  getFishBySlugFromCms,
  getRelatedFishFromCms,
  useFishCmsData,
} from "./cms";
import { FishSpeciesHeroSection } from "./sections/FishSpeciesHeroSection";
import { FishSpeciesContentSection } from "./sections/FishSpeciesContentSection";
import { SimilarFishSection } from "./sections/SimilarFishSection";
import { ImmersionCallToActionSection } from "../sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "../sections/SiteFooterSection";

export const FishSpeciesPage = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const fishData = useFishCmsData();
  const fish = slug ? getFishBySlugFromCms(fishData, slug) : undefined;

  if (!fish) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#263a30] text-[#e3f7ec]">
        <h1 className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)]">
          Espécie não encontrada
        </h1>
        <a
          href="/pesca/catalogo"
          className="mt-8 text-[#ac8042] underline"
        >
          Voltar ao catálogo
        </a>
      </div>
    );
  }

  const relatedFish = getRelatedFishFromCms(fishData, fish.slug);

  const taxonSchema = buildTaxon({
    commonName: fish.commonName,
    scientificName: fish.scientificName,
    description: fish.overview || fish.description,
    conservationStatus: fish.conservationStatus,
    size: fish.size,
    habitat: fish.habitat,
    image: fish.heroImage || fish.src,
    slug: fish.slug,
  });

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title={`${fish.commonName} (${fish.scientificName})`}
        description={fish.description}
        canonicalPath={`/pesca/catalogo/${fish.slug}`}
        ogImage={fish.heroImage || fish.src}
        breadcrumbs={[
          { name: "Inicio", path: "/" },
          { name: "Pesca Esportiva", path: "/pesca" },
          { name: "Catalogo", path: "/pesca/catalogo" },
          { name: fish.commonName, path: `/pesca/catalogo/${fish.slug}` },
        ]}
      />
      <JsonLd data={taxonSchema} />
      <FishSpeciesHeroSection fish={fish} />
      <FishSpeciesContentSection fish={fish} />
      <SimilarFishSection fish={relatedFish} />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
