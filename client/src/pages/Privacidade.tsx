import { PrivacyHeroSection } from "./privacidade/sections/PrivacyHeroSection";
import { PrivacyContentSection } from "./privacidade/sections/PrivacyContentSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";

export const Privacidade = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <PrivacyHeroSection />
      <PrivacyContentSection />
      <SiteFooterSection />
    </div>
  );
};
