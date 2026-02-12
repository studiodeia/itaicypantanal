import { ContactHeroSection } from "./sections/ContactHeroSection";
import { ContactChannelsSection } from "./sections/ContactChannelsSection";
import { SiteFooterSection } from "@/pages/sections/SiteFooterSection";

export const Contato = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <ContactHeroSection />
      <ContactChannelsSection />
      <SiteFooterSection />
    </div>
  );
};
