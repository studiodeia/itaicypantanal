import { PageMeta } from "@/components/PageMeta";
import { PrivacyHeroSection } from "./privacidade/sections/PrivacyHeroSection";
import { PrivacyContentSection } from "./privacidade/sections/PrivacyContentSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";

export const Privacidade = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title="Politica de Privacidade"
        description="Politica de privacidade e protecao de dados do Itaicy Pantanal Eco Lodge conforme a LGPD. Saiba como coletamos, usamos e protegemos seus dados."
        canonicalPath="/politica-de-privacidade"
        noIndex={true}
        breadcrumbs={[
          { name: "Inicio", path: "/" },
          { name: "Politica de Privacidade", path: "/politica-de-privacidade" },
        ]}
      />
      <PrivacyHeroSection />
      <PrivacyContentSection />
      <SiteFooterSection />
    </div>
  );
};
