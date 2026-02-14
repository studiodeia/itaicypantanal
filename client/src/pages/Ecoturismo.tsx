import { PageMeta } from "@/components/PageMeta";
import { EcoHeroSection } from "./ecoturismo/sections/EcoHeroSection";
import { EcoManifestoSection } from "./ecoturismo/sections/EcoManifestoSection";
import { EcoSobreNosSection } from "./ecoturismo/sections/EcoSobreNosSection";
import { EcoHighlightsSection } from "./ecoturismo/sections/EcoHighlightsSection";
import { EcoServicesSection } from "./ecoturismo/sections/EcoServicesSection";
import { ImmersionTestimonialsSection } from "./sections/ImmersionTestimonialsSection";
import { ImmersionCallToActionSection } from "./sections/ImmersionCallToActionSection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";

export const Ecoturismo = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title="Ecoturismo"
        description="Experiencias de ecoturismo sustentavel no Pantanal. Trilhas, safaris fotograficos, passeios de barco e imersao na maior planicie alagavel do mundo."
        canonicalPath="/ecoturismo"
        breadcrumbs={[
          { name: "Inicio", path: "/" },
          { name: "Ecoturismo", path: "/ecoturismo" },
        ]}
      />
      <EcoHeroSection />
      <EcoManifestoSection />
      <EcoSobreNosSection />
      <EcoHighlightsSection />
      <EcoServicesSection />
      <ImmersionTestimonialsSection />
      <ImmersionCallToActionSection />
      <FrequentlyAskedQuestionsSection />
      <SiteFooterSection />
    </div>
  );
};
