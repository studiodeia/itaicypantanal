import { PageMeta } from "@/components/PageMeta";
import { JsonLd, buildItemList } from "@/components/JsonLd";
import { getFishUrl } from "./cms";
import { FishCatalogHeroSection } from "./sections/FishCatalogHeroSection";
import { FeaturedFishSection } from "./sections/FeaturedFishSection";
import { AllFishSection } from "./sections/AllFishSection";
import { ImmersionCallToActionSection } from "../sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "../sections/SiteFooterSection";
import { useFishCmsData } from "./cms";

export const FishCatalogPage = (): JSX.Element => {
  const fishData = useFishCmsData();
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const itemListSchema = buildItemList(
    fishData.allFish.map((fish, i) => ({
      name: `${fish.commonName} (${fish.scientificName})`,
      url: `${origin}${getFishUrl(fish)}`,
      position: i + 1,
    })),
  );

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title="Catalogo de Peixes do Pantanal"
        description="Guia completo das especies de peixes do Rio Cuiaba no Pantanal. Dourado, Pintado, Piraputanga, Pacu e outras especies com perfis completos, habitos e dicas de pesca esportiva."
        canonicalPath="/pesca/catalogo"
        breadcrumbs={[
          { name: "Inicio", path: "/" },
          { name: "Pesca Esportiva", path: "/pesca" },
          { name: "Catalogo", path: "/pesca/catalogo" },
        ]}
      />
      <JsonLd data={itemListSchema} />
      <FishCatalogHeroSection />
      <FeaturedFishSection featuredFish={fishData.featuredFish} />
      <AllFishSection
        allFish={fishData.allFish}
        categories={fishData.categories}
      />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
