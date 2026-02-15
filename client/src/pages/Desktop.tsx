import { PageMeta } from "@/components/PageMeta";
import {
  JsonLd,
  buildLodgingBusiness,
  buildWebSite,
} from "@/components/JsonLd";
import { usePageCms } from "@/lib/cms/page-content";
import { homeDefaults } from "./home-defaults";
import { AccommodationInfoSection } from "./sections/AccommodationInfoSection";
import { AuthenticRestSection } from "./sections/AuthenticRestSection";
import { ExclusiveExpeditionsSection } from "./sections/ExclusiveExpeditionsSection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { ImmersionCallToActionSection } from "./sections/ImmersionCallToActionSection";
import { ImmersionTestimonialsSection } from "./sections/ImmersionTestimonialsSection";
import { NaturalRefugeDescriptionSection } from "./sections/NaturalRefugeDescriptionSection";
import { PantanalBlogSection } from "./sections/PantanalBlogSection";
import { PantanalExperienceIntroSection } from "./sections/PantanalExperienceIntroSection";
import { PantanalHeroSection } from "./sections/PantanalHeroSection";
import { PantanalStatsSection } from "./sections/PantanalStatsSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";

export const Desktop = (): JSX.Element => {
  const cms = usePageCms("/", homeDefaults);

  return (
    <div className="flex flex-col w-full bg-white">
      <PageMeta
        title="Eco Lodge Premium no Pantanal"
        description="Descubra o Pantanal em sua forma mais autentica. Hospedagem premium, pesca esportiva, observacao de aves e experiencias de ecoturismo no coracao do Pantanal."
        canonicalPath="/"
        ogImage="/images/og-default.webp"
      />
      <JsonLd data={[buildLodgingBusiness(), buildWebSite()]} />
      <PantanalHeroSection />
      <PantanalExperienceIntroSection />
      <AuthenticRestSection content={cms.aboutUs} />
      <ExclusiveExpeditionsSection content={cms.expeditions} />
      <PantanalStatsSection content={cms.stats} />
      <AccommodationInfoSection content={cms.accommodation} />
      <ImmersionTestimonialsSection />
      <NaturalRefugeDescriptionSection content={cms.impact} />
      <FrequentlyAskedQuestionsSection />
      <PantanalBlogSection content={cms.blog} />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
