import { PageMeta } from "@/components/PageMeta";
import { JsonLd, buildFAQPage } from "@/components/JsonLd";
import { usePageCms } from "@/lib/cms/page-content";
import { useLanguage } from "@/i18n/context";
import { t } from "@/i18n/ui-strings";
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
  const { lang } = useLanguage();

  const faqSchema = cms.faq?.items.length
    ? buildFAQPage(
        cms.faq.items.map((i) => ({ question: i.question, answer: i.answer })),
      )
    : null;

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title={t("pageMeta", "regiaoTitle", lang)}
        description={t("pageMeta", "regiaoDesc", lang)}
        canonicalPath="/regiao"
        breadcrumbs={[
          { name: t("pageMeta", "breadHome", lang), path: "/" },
          { name: t("pageMeta", "breadRegiao", lang), path: "/regiao" },
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
