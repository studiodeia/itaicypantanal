import { PageMeta } from "@/components/PageMeta";
import {
  JsonLd,
  buildLodgingBusiness,
  buildWebSite,
  buildFAQPage,
  buildAggregateRating,
} from "@/components/JsonLd";
import { usePageCms } from "@/lib/cms/page-content";
import { useSharedCmsSections } from "@/lib/cms/shared-content";
import { useLanguage } from "@/i18n/context";
import { t } from "@/i18n/ui-strings";
import { homeDefaults } from "./home-defaults";
import { AccommodationInfoSection } from "./sections/AccommodationInfoSection";
import { AuthenticRestSection } from "./sections/AuthenticRestSection";
import { ExclusiveExpeditionsSection } from "./sections/ExclusiveExpeditionsSection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { ImmersionCallToActionSection } from "./sections/ImmersionCallToActionSection";
import { ImmersionTestimonialsSection } from "./sections/ImmersionTestimonialsSection";
import { NaturalRefugeDescriptionSection } from "./sections/NaturalRefugeDescriptionSection";
import { ParaQuemSection } from "./sections/ParaQuemSection";
import { PantanalBlogSection } from "./sections/PantanalBlogSection";
import { PantanalExperienceIntroSection } from "./sections/PantanalExperienceIntroSection";
import { PantanalHeroSection } from "./sections/PantanalHeroSection";
import { PantanalStatsSection } from "./sections/PantanalStatsSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";

export const Desktop = (): JSX.Element => {
  const cms = usePageCms("/", homeDefaults);
  const { testimonials } = useSharedCmsSections();
  const { lang } = useLanguage();

  const faqItems = cms.faq?.items ?? [];
  const faqSchema = faqItems.length > 0
    ? buildFAQPage(faqItems.map((i) => ({ question: i.question, answer: i.answer })))
    : null;

  const reviewSchema = testimonials.items.length > 0
    ? buildAggregateRating(
        testimonials.items.map((t) => ({
          author: t.author,
          rating: 5,
          text: t.quote,
        })),
      )
    : null;

  const schemas = [
    buildLodgingBusiness(),
    buildWebSite(),
    ...(faqSchema ? [faqSchema] : []),
    ...(reviewSchema ? [reviewSchema] : []),
  ];

  return (
    <div className="flex flex-col w-full bg-white">
      <PageMeta
        title={cms.seo?.metaTitle || t("pageMeta", "homeTitle", lang)}
        description={cms.seo?.metaDescription || t("pageMeta", "homeDesc", lang)}
        canonicalPath="/"
        ogImage={cms.seo?.ogImage || "/images/og-default.webp"}
        noIndex={cms.seo?.noIndex}
      />
      <JsonLd data={schemas} />
      <PantanalHeroSection />
      <PantanalExperienceIntroSection />
      <AuthenticRestSection content={cms.aboutUs} />
      <ExclusiveExpeditionsSection content={cms.expeditions} />
      <PantanalStatsSection content={cms.stats} />
      <AccommodationInfoSection content={cms.accommodation} />
      <ImmersionTestimonialsSection />
      <NaturalRefugeDescriptionSection content={cms.impact} />
      {cms.paraQuem && <ParaQuemSection content={cms.paraQuem} />}
      <FrequentlyAskedQuestionsSection content={cms.faq} />
      <PantanalBlogSection content={cms.blog} />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
