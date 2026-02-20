import { PageMeta } from "@/components/PageMeta";
import { JsonLd, buildFAQPage, buildTourProduct } from "@/components/JsonLd";
import { usePageCms } from "@/lib/cms/page-content";
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
        title="Culinária Pantaneira"
        description="Sabores autênticos do Pantanal preparados com ingredientes regionais. Gastronomia regional que conecta você à cultura e à natureza."
        canonicalPath="/culinaria"
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Culinária", path: "/culinaria" },
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
