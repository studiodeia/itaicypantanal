import { useParams } from "wouter";
import { getArticleBySlug, getRelatedArticles } from "./data";
import { ArticleHeroSection } from "./sections/ArticleHeroSection";
import { ArticleContentSection } from "./sections/ArticleContentSection";
import { RelatedArticlesSection } from "./sections/RelatedArticlesSection";
import { ImmersionCallToActionSection } from "../sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "../sections/SiteFooterSection";

export const BlogArticlePage = (): JSX.Element => {
  const { slug } = useParams<{ categorySlug: string; slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#263a30] text-[#e3f7ec]">
        <h1 className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)]">
          Artigo não encontrado
        </h1>
        <a href="/blog" className="mt-8 text-[#ac8042] underline">
          Voltar ao blog
        </a>
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(article.slug);

  return (
    <div className="flex flex-col w-full">
      <ArticleHeroSection article={article} />
      <ArticleContentSection content={article.content} />
      <RelatedArticlesSection articles={relatedArticles} />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
