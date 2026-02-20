import { PageMeta } from "@/components/PageMeta";
import { JsonLd, buildFAQPage } from "@/components/JsonLd";
import { usePageCms } from "@/lib/cms/page-content";
import { regiaoDefaults } from "./regiao-defaults";
import { RegiaoHeroSection } from "./regiao/sections/RegiaoHeroSection";
import { LocationSection } from "./regiao/sections/LocationSection";
import { AccessSection } from "./regiao/sections/AccessSection";
import { ClimateSection } from "./regiao/sections/ClimateSection";
import { NearbySection } from "./regiao/sections/NearbySection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { ImmersionCallToActionSection } from "./sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";

export const Regiao = (): JSX.Element => {
  const cms = usePageCms("/regiao", regiaoDefaults);

  const faqSchema = cms.faq?.items.length
    ? buildFAQPage(
        cms.faq.items.map((i) => ({ question: i.question, answer: i.answer })),
      )
    : null;

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title="Pantanal Sul-Matogrossense — Regiao, Clima e Como Chegar"
        description="Guia completo do Pantanal Sul-Matogrossense. Localizacao em Miranda (MS), como chegar de aviao ou carro, melhor epoca para visitar, clima por estacao e pontos turisticos proximos como Bonito."
        canonicalPath="/regiao"
        breadcrumbs={[
          { name: "Inicio", path: "/" },
          { name: "A Regiao", path: "/regiao" },
        ]}
      />
      {faqSchema && <JsonLd data={faqSchema} />}
      <RegiaoHeroSection content={cms.hero} />
      <LocationSection content={cms.location} />
      <AccessSection content={cms.access} />
      <ClimateSection content={cms.climate} />
      <NearbySection content={cms.nearby} />
      <FrequentlyAskedQuestionsSection content={cms.faq} />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
