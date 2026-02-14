import { PageMeta } from "@/components/PageMeta";
import {
  JsonLd,
  buildLodgingBusiness,
  buildWebSite,
} from "@/components/JsonLd";
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
      <AuthenticRestSection />
      <ExclusiveExpeditionsSection />
      <PantanalStatsSection />
      <AccommodationInfoSection />
      <ImmersionTestimonialsSection />
      <NaturalRefugeDescriptionSection />
      <FrequentlyAskedQuestionsSection />
      <PantanalBlogSection />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
