import { PageMeta } from "@/components/PageMeta";
import { usePageCms } from "@/lib/cms/page-content";
import { useLanguage } from "@/i18n/context";
import { t } from "@/i18n/ui-strings";
import { nossoImpactoDefaults } from "./nosso-impacto-defaults";
import { ImpactHeroSection } from "./nosso-impacto/sections/ImpactHeroSection";
import { ImpactManifestoSection } from "./nosso-impacto/sections/ImpactManifestoSection";
import { RioVivoSection } from "./nosso-impacto/sections/RioVivoSection";
import { BiodiversidadeSection } from "./nosso-impacto/sections/BiodiversidadeSection";
import { ComunidadeSection } from "./nosso-impacto/sections/ComunidadeSection";
import { OperacaoConscienteSection } from "./nosso-impacto/sections/OperacaoConscienteSection";
import { ImpactEngagementSection } from "./nosso-impacto/sections/ImpactEngagementSection";
import { ImmersionCallToActionSection } from "./sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";

export const NossoImpacto = (): JSX.Element => {
  const cms = usePageCms("/nosso-impacto", nossoImpactoDefaults);
  const { lang } = useLanguage();

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title={t("pageMeta", "impactoTitle", lang)}
        description={t("pageMeta", "impactoDesc", lang)}
        canonicalPath="/nosso-impacto"
        breadcrumbs={[
          { name: t("pageMeta", "breadHome", lang), path: "/" },
          { name: t("pageMeta", "breadImpacto", lang), path: "/nosso-impacto" },
        ]}
      />
      <ImpactHeroSection content={cms.hero} />
      <ImpactManifestoSection content={cms.manifesto} />
      <RioVivoSection content={cms.rioVivo} />
      <BiodiversidadeSection content={cms.biodiversidade} />
      <ComunidadeSection content={cms.comunidade} />
      <OperacaoConscienteSection content={cms.operacao} />
      <ImpactEngagementSection content={cms.engagement} />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
