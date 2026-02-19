import { useParams, Link } from "wouter";
import { PageMeta } from "@/components/PageMeta";
import { JsonLd, buildBlogPosting } from "@/components/JsonLd";
import { getBlogArticleBySlug, getBlogArticleUrl, getBlogRelatedArticles, useBlogCmsData } from "./cms";
import { ArticleHeroSection } from "./sections/ArticleHeroSection";
import { ArticleContentSection } from "./sections/ArticleContentSection";
import { RelatedArticlesSection } from "./sections/RelatedArticlesSection";
import { ImmersionCallToActionSection } from "../sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "../sections/SiteFooterSection";
import { useLanguage } from "@/i18n/context";
import { t } from "@/i18n/ui-strings";

export const BlogArticlePage = (): JSX.Element => {
  const { lang } = useLanguage();
  const { slug } = useParams<{ categorySlug: string; slug: string }>();
  const blogData = useBlogCmsData();
  const article = slug ? getBlogArticleBySlug(blogData, slug) : undefined;

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#263a30] text-[#e3f7ec]">
        <h1 className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)]">
          {t("blog", "articleNotFound", lang)}
        </h1>
        <Link href="/blog" className="mt-8 text-[#ac8042] underline">
          {t("blog", "backToBlog", lang)}
        </Link>
      </div>
    );
  }

  const relatedArticles = getBlogRelatedArticles(blogData, article.slug);
  const articleUrl = getBlogArticleUrl(article);

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title={article.title}
        description={article.description}
        canonicalPath={articleUrl}
        ogImage={article.heroImage || article.src}
        ogType="article"
        breadcrumbs={[
          { name: t("pageMeta", "breadHome", lang), path: "/" },
          { name: t("pageMeta", "breadBlog", lang), path: "/blog" },
          { name: article.title, path: articleUrl },
        ]}
      />
      <JsonLd
        data={buildBlogPosting({
          title: article.title,
          description: article.description,
          author: article.author,
          date: article.date,
          image: article.heroImage || article.src,
          url: articleUrl,
        })}
      />
      <ArticleHeroSection article={article} />
      <ArticleContentSection content={article.content} />
      <RelatedArticlesSection articles={relatedArticles} />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
