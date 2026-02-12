import { BirdHeroSection } from "./birdwatching/sections/BirdHeroSection";
import { BirdManifestoSection } from "./birdwatching/sections/BirdManifestoSection";
import { BirdSobreNosSection } from "./birdwatching/sections/BirdSobreNosSection";
import { BirdHighlightsSection } from "./birdwatching/sections/BirdHighlightsSection";
import { BirdServicesSection } from "./birdwatching/sections/BirdServicesSection";
import { ImmersionTestimonialsSection } from "./sections/ImmersionTestimonialsSection";
import { ImmersionCallToActionSection } from "./sections/ImmersionCallToActionSection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";

export const BirdWatching = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <BirdHeroSection />
      <BirdManifestoSection />
      <BirdSobreNosSection />
      <BirdHighlightsSection />
      <BirdServicesSection />
      <ImmersionTestimonialsSection />
      <ImmersionCallToActionSection />
      <FrequentlyAskedQuestionsSection />
      <SiteFooterSection />
    </div>
  );
};
