import { PageMeta } from "@/components/PageMeta";
import { JsonLd, buildItemList } from "@/components/JsonLd";
import { getBirdUrl } from "./data";
import { CatalogHeroSection } from "./sections/CatalogHeroSection";
import { FeaturedBirdsSection } from "./sections/FeaturedBirdsSection";
import { AllBirdsSection } from "./sections/AllBirdsSection";
import { ImmersionCallToActionSection } from "../sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "../sections/SiteFooterSection";
import { useBirdCmsData } from "./cms";

export const BirdCatalogPage = (): JSX.Element => {
  const birdData = useBirdCmsData();
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const itemListSchema = buildItemList(
    birdData.allBirds.map((bird, i) => ({
      name: `${bird.commonName} (${bird.scientificName})`,
      url: `${origin}${getBirdUrl(bird)}`,
      position: i + 1,
    })),
  );

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title="Catalogo de Aves do Pantanal"
        description="Guia completo de aves do Pantanal. Tuiuiu, arara-azul, tucanos, papagaios e dezenas de especies com fotos, habitats e dicas de observacao."
        canonicalPath="/observacao-de-aves/catalogo"
        breadcrumbs={[
          { name: "Inicio", path: "/" },
          { name: "Observacao de Aves", path: "/observacao-de-aves" },
          { name: "Catalogo", path: "/observacao-de-aves/catalogo" },
        ]}
      />
      <JsonLd data={itemListSchema} />
      <CatalogHeroSection />
      <FeaturedBirdsSection featuredBirds={birdData.featuredBirds} />
      <AllBirdsSection
        allBirds={birdData.allBirds}
        categories={birdData.categories}
      />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
