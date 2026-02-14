import { PageMeta } from "@/components/PageMeta";
import { ContactHeroSection } from "./sections/ContactHeroSection";
import { ContactChannelsSection } from "./sections/ContactChannelsSection";
import { SiteFooterSection } from "@/pages/sections/SiteFooterSection";

export const Contato = (): JSX.Element => {
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
      <ContactHeroSection />
      <ContactChannelsSection />
      <SiteFooterSection />
    </div>
  );
};
