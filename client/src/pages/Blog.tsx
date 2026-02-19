import { PageMeta } from "@/components/PageMeta";
import { useLanguage } from "@/i18n/context";
import { t } from "@/i18n/ui-strings";
import { BlogHeroSection } from "./blog/sections/BlogHeroSection";
import { BlogRecentSection } from "./blog/sections/BlogRecentSection";
import { BlogCategoriesSection } from "./blog/sections/BlogCategoriesSection";
import { ImmersionCallToActionSection } from "./sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";
import { useBlogCmsData } from "./blog/cms";

export const Blog = (): JSX.Element => {
  const blogContent = useBlogCmsData();
  const { lang } = useLanguage();

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title={t("pageMeta", "blogTitle", lang)}
        description={t("pageMeta", "blogDesc", lang)}
        canonicalPath="/blog"
        breadcrumbs={[
          { name: t("pageMeta", "breadHome", lang), path: "/" },
          { name: t("pageMeta", "breadBlog", lang), path: "/blog" },
        ]}
      />
      <BlogHeroSection featuredArticle={blogContent.featuredArticle} />
      <BlogRecentSection recentArticles={blogContent.recentArticles} />
      <BlogCategoriesSection
        allArticles={blogContent.allArticles}
        categories={blogContent.categories}
      />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
