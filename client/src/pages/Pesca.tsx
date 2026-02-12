import { PescaHeroSection } from "./pesca/sections/PescaHeroSection";
import { PescaManifestoSection } from "./pesca/sections/PescaManifestoSection";
import { PescaSobreNosSection } from "./pesca/sections/PescaSobreNosSection";
import { PescaHighlightsSection } from "./pesca/sections/PescaHighlightsSection";
import { PescaServicesSection } from "./pesca/sections/PescaServicesSection";
import { ImmersionTestimonialsSection } from "./sections/ImmersionTestimonialsSection";
import { ImmersionCallToActionSection } from "./sections/ImmersionCallToActionSection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";

export const Pesca = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <PescaHeroSection />
      <PescaManifestoSection />
      <PescaSobreNosSection />
      <PescaHighlightsSection />
      <PescaServicesSection />
      <ImmersionTestimonialsSection />
      <ImmersionCallToActionSection />
      <FrequentlyAskedQuestionsSection />
      <SiteFooterSection />
    </div>
  );
};
