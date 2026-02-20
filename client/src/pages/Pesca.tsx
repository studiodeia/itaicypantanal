import { PageMeta } from "@/components/PageMeta";
import { JsonLd, buildFAQPage, buildTourProduct } from "@/components/JsonLd";
import { usePageCms } from "@/lib/cms/page-content";
import { useLanguage } from "@/i18n/context";
import { t } from "@/i18n/ui-strings";
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
  const { lang } = useLanguage();

  const faqSchema = cms.faq?.items.length
    ? buildFAQPage(cms.faq.items.map((i) => ({ question: i.question, answer: i.answer })))
    : null;

  const tourSchema = buildTourProduct({
    name: "Pesca Esportiva no Pantanal — Itaicy Eco Lodge",
    description:
      "Expedicao de pesca esportiva catch-and-release no Pantanal Sul-Matogrossense. Pintado, pacu, dourado e mais de 260 especies com guias locais experientes no Rio Negro.",
    url: "/pesca",
    image: cms.hero?.backgroundImage,
  });

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title={cms.seo?.metaTitle || t("pageMeta", "pescaTitle", lang)}
        description={cms.seo?.metaDescription || t("pageMeta", "pescaDesc", lang)}
        canonicalPath="/pesca"
        ogImage={cms.seo?.ogImage}
        noIndex={cms.seo?.noIndex}
        breadcrumbs={[
          { name: t("pageMeta", "breadHome", lang), path: "/" },
          { name: t("pageMeta", "breadPesca", lang), path: "/pesca" },
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
      <ImmersionCallToActionSection />
      <FrequentlyAskedQuestionsSection content={cms.faq} />
      <SiteFooterSection />
    </div>
  );
};
