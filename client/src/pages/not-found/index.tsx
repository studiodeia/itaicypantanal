import { NotFoundHeroSection } from "./sections/NotFoundHeroSection";
import { ExclusiveExpeditionsSection } from "@/pages/sections/ExclusiveExpeditionsSection";
import { PantanalBlogSection } from "@/pages/sections/PantanalBlogSection";
import { SiteFooterSection } from "@/pages/sections/SiteFooterSection";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <NotFoundHeroSection />
      <ExclusiveExpeditionsSection />
      <PantanalBlogSection />
      <SiteFooterSection />
    </div>
  );
}
