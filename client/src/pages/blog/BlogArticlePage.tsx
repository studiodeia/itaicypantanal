import { useParams, Link } from "wouter";
import { PageMeta } from "@/components/PageMeta";
import { JsonLd, buildBlogPosting } from "@/components/JsonLd";
import { getBlogArticleBySlug, getBlogArticleUrl, getBlogRelatedArticles, useBlogCmsData } from "./cms";
import { ArticleHeroSection } from "./sections/ArticleHeroSection";
import { ArticleContentSection } from "./sections/ArticleContentSection";
import { RelatedArticlesSection } from "./sections/RelatedArticlesSection";
import { ImmersionCallToActionSection } from "../sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "../sections/SiteFooterSection";

export const BlogArticlePage = (): JSX.Element => {
  const { slug } = useParams<{ categorySlug: string; slug: string }>();
  const blogData = useBlogCmsData();
  const article = slug ? getBlogArticleBySlug(blogData, slug) : undefined;

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#263a30] text-[#e3f7ec]">
        <h1 className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)]">
          Artigo não encontrado
        </h1>
        <Link href="/blog" className="mt-8 text-[#ac8042] underline">
          Voltar ao blog
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
          { name: "Inicio", path: "/" },
          { name: "Blog", path: "/blog" },
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
