import { BlogHeroSection } from "./blog/sections/BlogHeroSection";
import { BlogRecentSection } from "./blog/sections/BlogRecentSection";
import { BlogCategoriesSection } from "./blog/sections/BlogCategoriesSection";
import { ImmersionCallToActionSection } from "./sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";

export const Blog = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <BlogHeroSection />
      <BlogRecentSection />
      <BlogCategoriesSection />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
