import { PageMeta } from "@/components/PageMeta";
import { JsonLd, buildFAQPage, buildTourProduct } from "@/components/JsonLd";
import { usePageCms } from "@/lib/cms/page-content";
import { useLanguage } from "@/i18n/context";
import { t } from "@/i18n/ui-strings";
import { culinariaDefaults } from "./culinaria-defaults";
import { CulinaryHeroSection } from "./culinaria/sections/CulinaryHeroSection";
import { CulinaryManifestoSection } from "./culinaria/sections/CulinaryManifestoSection";
import { CulinaryHighlightsSection } from "./culinaria/sections/CulinaryHighlightsSection";
import { CulinaryExperienceSection } from "./culinaria/sections/CulinaryExperienceSection";
import { CulinaryMenuSection } from "./culinaria/sections/CulinaryMenuSection";
import { CulinaryServicesSection } from "./culinaria/sections/CulinaryServicesSection";
import { ImmersionTestimonialsSection } from "./sections/ImmersionTestimonialsSection";
import { AccommodationsCrossSellSection } from "./culinaria/sections/AccommodationsCrossSellSection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { ImmersionCallToActionSection } from "./sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";

export const Culinaria = (): JSX.Element => {
  const cms = usePageCms("/culinaria", culinariaDefaults);
  const { lang } = useLanguage();

  const faqSchema = cms.faq?.items.length
    ? buildFAQPage(cms.faq.items.map((i) => ({ question: i.question, answer: i.answer })))
    : null;

  const tourSchema = buildTourProduct({
    name: "Culinaria Pantaneira — Itaicy Eco Lodge",
    description:
      "Gastronomia autêntica do Pantanal com ingredientes regionais e pratos típicos. Experiência culinária imersiva com sabores do Mato Grosso do Sul.",
    url: "/culinaria",
    image: cms.hero?.backgroundImage,
  });

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title={cms.seo?.metaTitle || t("pageMeta", "culinariaTitle", lang)}
        description={cms.seo?.metaDescription || t("pageMeta", "culinariaDesc", lang)}
        canonicalPath="/culinaria"
        ogImage={cms.seo?.ogImage}
        noIndex={cms.seo?.noIndex}
        breadcrumbs={[
          { name: t("pageMeta", "breadHome", lang), path: "/" },
          { name: t("pageMeta", "breadCulinaria", lang), path: "/culinaria" },
        ]}
      />
      <JsonLd data={tourSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <CulinaryHeroSection content={cms.hero} />
      <CulinaryManifestoSection content={cms.manifesto} />
      <CulinaryHighlightsSection content={cms.highlights} />
      <CulinaryExperienceSection content={cms.experience} />
      <CulinaryMenuSection content={cms.menu} />
      <CulinaryServicesSection content={cms.services} />
      <ImmersionTestimonialsSection />
      <AccommodationsCrossSellSection content={cms.crossSell} />
      <FrequentlyAskedQuestionsSection content={cms.faq} />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
