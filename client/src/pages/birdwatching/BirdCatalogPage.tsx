import { PageMeta } from "@/components/PageMeta";
import { JsonLd, buildItemList } from "@/components/JsonLd";
import { getBirdUrl } from "./data";
import { CatalogHeroSection } from "./sections/CatalogHeroSection";
import { FeaturedBirdsSection } from "./sections/FeaturedBirdsSection";
import { AllBirdsSection } from "./sections/AllBirdsSection";
import { ImmersionCallToActionSection } from "../sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "../sections/SiteFooterSection";
import { useBirdCmsData } from "./cms";
import { useLanguage } from "@/i18n/context";
import { t } from "@/i18n/ui-strings";

export const BirdCatalogPage = (): JSX.Element => {
  const { lang } = useLanguage();
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
        title={t("pageMeta", "catalogoTitle", lang)}
        description={t("pageMeta", "catalogoDesc", lang)}
        canonicalPath="/observacao-de-aves/catalogo"
        breadcrumbs={[
          { name: t("pageMeta", "breadHome", lang), path: "/" },
          { name: t("pageMeta", "breadBirdwatching", lang), path: "/observacao-de-aves" },
          { name: t("pageMeta", "breadCatalogo", lang), path: "/observacao-de-aves/catalogo" },
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
