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
  return (
    <div className="flex flex-col w-full">
      <ImpactHeroSection />
      <ImpactManifestoSection />
      <RioVivoSection />
      <BiodiversidadeSection />
      <ComunidadeSection />
      <OperacaoConscienteSection />
      <ImpactEngagementSection />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
