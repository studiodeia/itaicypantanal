import { CulinaryHeroSection } from "./culinaria/sections/CulinaryHeroSection";
import { CulinaryManifestoSection } from "./culinaria/sections/CulinaryManifestoSection";
import { CulinaryHighlightsSection } from "./culinaria/sections/CulinaryHighlightsSection";
import { CulinaryExperienceSection } from "./culinaria/sections/CulinaryExperienceSection";
import { CulinaryMenuSection } from "./culinaria/sections/CulinaryMenuSection";
import { CulinaryServicesSection } from "./culinaria/sections/CulinaryServicesSection";
import { ImmersionTestimonialsSection } from "./sections/ImmersionTestimonialsSection";
import { AccommodationsCrossSellSection } from "./culinaria/sections/AccommodationsCrossSellSection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { ImmersionCallToActionSection } from "./sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";

export const Culinaria = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <CulinaryHeroSection />
      <CulinaryManifestoSection />
      <CulinaryHighlightsSection />
      <CulinaryExperienceSection />
      <CulinaryMenuSection />
      <CulinaryServicesSection />
      <ImmersionTestimonialsSection />
      <AccommodationsCrossSellSection />
      <FrequentlyAskedQuestionsSection />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
