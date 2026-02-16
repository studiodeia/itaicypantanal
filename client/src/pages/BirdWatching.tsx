import { PageMeta } from "@/components/PageMeta";
import { JsonLd, buildFAQPage, buildTourProduct } from "@/components/JsonLd";
import { usePageCms } from "@/lib/cms/page-content";
import { birdwatchingDefaults } from "./birdwatching-defaults";
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
  const cms = usePageCms("/observacao-de-aves", birdwatchingDefaults);

  const faqSchema = cms.faq?.items.length
    ? buildFAQPage(cms.faq.items.map((i) => ({ question: i.question, answer: i.answer })))
    : null;

  const tourSchema = buildTourProduct({
    name: "Observacao de Aves no Pantanal — Itaicy Eco Lodge",
    description:
      "Birdwatching guiado no Pantanal com 166 especies catalogadas. Tuiuiu, arara-azul, tucanos, gavioes e muito mais com guias especializados e roteiros exclusivos.",
    url: "/observacao-de-aves",
    image: cms.hero?.backgroundImage,
  });

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
      <JsonLd data={tourSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <BirdHeroSection content={cms.hero} />
      <BirdManifestoSection content={cms.manifesto} />
      <BirdSobreNosSection content={cms.sobreNos} />
      <BirdHighlightsSection content={cms.highlights} />
      <BirdServicesSection birds={birdData.allBirds} />
      <ImmersionTestimonialsSection />
      <ImmersionCallToActionSection />
      <FrequentlyAskedQuestionsSection content={cms.faq} />
      <SiteFooterSection />
    </div>
  );
};
