import { PageMeta } from "@/components/PageMeta";
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
      <PageMeta
        title="Pesca Esportiva"
        description="Pesca esportiva no Pantanal com guias locais experientes. Pintado, pacu, dourado e mais de 260 especies em um dos melhores destinos de pesca do mundo."
        canonicalPath="/pesca"
        breadcrumbs={[
          { name: "Inicio", path: "/" },
          { name: "Pesca Esportiva", path: "/pesca" },
        ]}
      />
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
