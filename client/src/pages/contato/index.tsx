import { PageMeta } from "@/components/PageMeta";
import { usePageCms } from "@/lib/cms/page-content";
import { contatoDefaults } from "../contato-defaults";
import { ContactHeroSection } from "./sections/ContactHeroSection";
import { ContactChannelsSection } from "./sections/ContactChannelsSection";
import { SiteFooterSection } from "@/pages/sections/SiteFooterSection";

export const Contato = (): JSX.Element => {
  const cms = usePageCms("/contato", contatoDefaults);

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title="Contato"
        description="Entre em contato com o Itaicy Pantanal Eco Lodge. WhatsApp, email e telefone para reservas, duvidas e informacoes sobre sua viagem ao Pantanal."
        canonicalPath="/contato"
        breadcrumbs={[
          { name: "Inicio", path: "/" },
          { name: "Contato", path: "/contato" },
        ]}
      />
      <ContactHeroSection content={cms.hero} formTitle={cms.formTitle} steps={cms.steps} />
      <ContactChannelsSection content={cms.channels} />
      <SiteFooterSection />
    </div>
  );
};
