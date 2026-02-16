import { PageMeta } from "@/components/PageMeta";
import { usePageCms } from "@/lib/cms/page-content";
import { pescaDefaults } from "./pesca-defaults";
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
  const cms = usePageCms("/pesca", pescaDefaults);

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
      <PescaHeroSection content={cms.hero} />
      <PescaManifestoSection content={cms.manifesto} />
      <PescaSobreNosSection content={cms.sobreNos} />
      <PescaHighlightsSection content={cms.highlights} />
      <PescaServicesSection content={cms.services} />
      <ImmersionTestimonialsSection />
      <ImmersionCallToActionSection />
      <FrequentlyAskedQuestionsSection />
      <SiteFooterSection />
    </div>
  );
};
