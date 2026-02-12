import { CatalogHeroSection } from "./sections/CatalogHeroSection";
import { FeaturedBirdsSection } from "./sections/FeaturedBirdsSection";
import { AllBirdsSection } from "./sections/AllBirdsSection";
import { ImmersionCallToActionSection } from "../sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "../sections/SiteFooterSection";

export const BirdCatalogPage = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <CatalogHeroSection />
      <FeaturedBirdsSection />
      <AllBirdsSection />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
