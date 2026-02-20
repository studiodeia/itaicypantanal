import { PageMeta } from "@/components/PageMeta";
import { JsonLd, buildFAQPage, buildTourProduct } from "@/components/JsonLd";
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

  const faqSchema = cms.faq?.items.length
    ? buildFAQPage(cms.faq.items.map((i) => ({ question: i.question, answer: i.answer })))
    : null;

  const tourSchema = buildTourProduct({
    name: "Pesca Esportiva no Pantanal — Itaicy Eco Lodge",
    description:
      "Expedição de pesca esportiva catch-and-release no Pantanal Sul-Mato-Grossense. Pintado, pacu, dourado e mais de 260 espécies com guias locais experientes no Rio Negro.",
    url: "/pesca",
    image: cms.hero?.backgroundImage,
  });

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
      <JsonLd data={tourSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <PescaHeroSection content={cms.hero} />
      <PescaManifestoSection content={cms.manifesto} />
      <PescaSobreNosSection content={cms.sobreNos} />
      <PescaHighlightsSection content={cms.highlights} />
      <PescaServicesSection content={cms.services} />
      <ImmersionTestimonialsSection />
      <FrequentlyAskedQuestionsSection content={cms.faq} />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
