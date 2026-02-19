import { PageMeta } from "@/components/PageMeta";
import { JsonLd, buildFAQPage } from "@/components/JsonLd";
import { usePageCms } from "@/lib/cms/page-content";
import { resolveIcon } from "@/lib/icon-resolver";
import { useLanguage } from "@/i18n/context";
import { t } from "@/i18n/ui-strings";
import { acomodacoesDefaults } from "./acomodacoes-defaults";
import { AccommodationsHeroSection } from "./acomodacoes/sections/AccommodationsHeroSection";
import { ManifestoStatementSection } from "./acomodacoes/sections/ManifestoStatementSection";
import { AccommodationsHighlightsSection } from "./acomodacoes/sections/AccommodationsHighlightsSection";
import { ApartmentSection } from "./acomodacoes/sections/ApartmentSection";
import { CulinarySection } from "./acomodacoes/sections/CulinarySection";
import { ImmersionTestimonialsSection } from "./sections/ImmersionTestimonialsSection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { ImmersionCallToActionSection } from "./sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";

const imagePositions = ["left", "right", "left"] as const;

export const Acomodacoes = (): JSX.Element => {
  const cms = usePageCms("/acomodacoes", acomodacoesDefaults);
  const { lang } = useLanguage();

  const rooms = cms.rooms.map((room, i) => ({
    title: room.title,
    description: room.description,
    features: room.features.map((f) => ({
      icon: resolveIcon(f.iconName),
      label: f.label,
    })),
    image: room.image,
    ctaText: room.ctaText,
    imagePosition: imagePositions[i] ?? "left",
  }));

  const faqSchema = cms.faq?.items.length
    ? buildFAQPage(cms.faq.items.map((i) => ({ question: i.question, answer: i.answer })))
    : null;

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title={t("pageMeta", "acomodacoesTitle", lang)}
        description={t("pageMeta", "acomodacoesDesc", lang)}
        canonicalPath="/acomodacoes"
        breadcrumbs={[
          { name: t("pageMeta", "breadHome", lang), path: "/" },
          { name: t("pageMeta", "breadAcomodacoes", lang), path: "/acomodacoes" },
        ]}
      />
      {faqSchema && <JsonLd data={faqSchema} />}
      <AccommodationsHeroSection content={cms.hero} />
      <ManifestoStatementSection content={cms.manifesto} />
      <div
        style={{
          background: "linear-gradient(180deg, #344e41 0%, #263a30 100%)",
        }}
      >
        <AccommodationsHighlightsSection content={cms.highlights} />
        {rooms.map((room) => (
          <ApartmentSection
            key={room.title}
            title={room.title}
            description={room.description}
            features={room.features}
            image={room.image}
            ctaText={room.ctaText}
            imagePosition={room.imagePosition}
          />
        ))}
      </div>
      <ImmersionTestimonialsSection />
      <CulinarySection content={cms.culinary} />
      <FrequentlyAskedQuestionsSection content={cms.faq} />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
