import { useParams } from "wouter";
import { PageMeta } from "@/components/PageMeta";
import { BlogHeroSection } from "./blog/sections/BlogHeroSection";
import { BlogRecentSection } from "./blog/sections/BlogRecentSection";
import { BlogCategoriesSection } from "./blog/sections/BlogCategoriesSection";
import { ImmersionCallToActionSection } from "./sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";
import { useBlogCmsData } from "./blog/cms";
import { slugToCategoryMap } from "./blog/data";

export const Blog = (): JSX.Element => {
  const params = useParams<{ categorySlug?: string }>();
  const blogContent = useBlogCmsData();
  const initialCategory = params.categorySlug
    ? (slugToCategoryMap[params.categorySlug] ?? "Todas")
    : "Todas";

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title="Blog"
        description="Artigos sobre o Pantanal, fauna, flora, ecoturismo, pesca esportiva e observacao de aves. Dicas e guias para sua viagem ao Pantanal."
        canonicalPath="/blog"
        breadcrumbs={[
          { name: "Inicio", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <BlogHeroSection featuredArticle={blogContent.featuredArticle} />
      <BlogRecentSection recentArticles={blogContent.recentArticles} />
      <BlogCategoriesSection
        allArticles={blogContent.allArticles}
        categories={blogContent.categories}
        initialCategory={initialCategory}
      />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
