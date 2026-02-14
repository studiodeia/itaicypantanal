import { PageMeta } from "@/components/PageMeta";
import { BirdHeroSection } from "./birdwatching/sections/BirdHeroSection";
import { BirdManifestoSection } from "./birdwatching/sections/BirdManifestoSection";
import { BirdSobreNosSection } from "./birdwatching/sections/BirdSobreNosSection";
import { BirdHighlightsSection } from "./birdwatching/sections/BirdHighlightsSection";
import { BirdServicesSection } from "./birdwatching/sections/BirdServicesSection";
import { ImmersionTestimonialsSection } from "./sections/ImmersionTestimonialsSection";
import { ImmersionCallToActionSection } from "./sections/ImmersionCallToActionSection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";
import { useBirdCmsData } from "./birdwatching/cms";

export const BirdWatching = (): JSX.Element => {
  const birdData = useBirdCmsData();

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title="Observacao de Aves"
        description="Mais de 650 especies de aves no Pantanal. Tuiuiu, arara-azul, tucanos e muito mais. Guias especializados e roteiros exclusivos de birdwatching."
        canonicalPath="/observacao-de-aves"
        breadcrumbs={[
          { name: "Inicio", path: "/" },
          { name: "Observacao de Aves", path: "/observacao-de-aves" },
        ]}
      />
      <BirdHeroSection />
      <BirdManifestoSection />
      <BirdSobreNosSection />
      <BirdHighlightsSection />
      <BirdServicesSection birds={birdData.allBirds} />
      <ImmersionTestimonialsSection />
      <ImmersionCallToActionSection />
      <FrequentlyAskedQuestionsSection />
      <SiteFooterSection />
    </div>
  );
};
