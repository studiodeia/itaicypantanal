import { PageMeta } from "@/components/PageMeta";
import { usePageCms } from "@/lib/cms/page-content";
import { nossoImpactoDefaults } from "./nosso-impacto-defaults";
import { ImpactHeroSection } from "./nosso-impacto/sections/ImpactHeroSection";
import { ImpactManifestoSection } from "./nosso-impacto/sections/ImpactManifestoSection";
import { RioVivoSection } from "./nosso-impacto/sections/RioVivoSection";
import { BiodiversidadeSection } from "./nosso-impacto/sections/BiodiversidadeSection";
import { ComunidadeSection } from "./nosso-impacto/sections/ComunidadeSection";
import { OperacaoConscienteSection } from "./nosso-impacto/sections/OperacaoConscienteSection";
import { ImpactEngagementSection } from "./nosso-impacto/sections/ImpactEngagementSection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { ImmersionCallToActionSection } from "./sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";

export const NossoImpacto = (): JSX.Element => {
  const cms = usePageCms("/nosso-impacto", nossoImpactoDefaults);

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title="Nosso Impacto"
        description="Conservacao ambiental, pesca sustentavel Cota Zero, protecao da biodiversidade e apoio a comunidades locais. Conheca o impacto positivo da Itaicy no Pantanal."
        canonicalPath="/nosso-impacto"
        breadcrumbs={[
          { name: "Inicio", path: "/" },
          { name: "Nosso Impacto", path: "/nosso-impacto" },
        ]}
      />
      <ImpactHeroSection content={cms.hero} />
      <ImpactManifestoSection content={cms.manifesto} />
      <RioVivoSection content={cms.rioVivo} />
      <BiodiversidadeSection content={cms.biodiversidade} />
      <ComunidadeSection content={cms.comunidade} />
      <OperacaoConscienteSection content={cms.operacao} />
      <ImpactEngagementSection content={cms.engagement} />
      <FrequentlyAskedQuestionsSection />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
