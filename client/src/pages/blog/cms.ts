import { useEffect, useState } from "react";
import {
  allArticles,
  categories as localCategories,
  categorySlugMap,
  featuredArticle,
  getArticleBySlug,
  recentArticles,
  type BlogArticle,
  type BlogArticleDetail,
} from "./data";

export type BlogCmsData = {
  categories: string[];
  posts: BlogArticle[];
  details: BlogArticleDetail[];
  featuredArticle: BlogArticle;
  recentArticles: BlogArticle[];
  allArticles: BlogArticle[];
};

function buildFallbackBlogData(): BlogCmsData {
  const fallbackPosts = [featuredArticle, ...recentArticles, ...allArticles];
  const fallbackDetails = fallbackPosts
    .map((post) => getArticleBySlug(post.slug))
    .filter((post): post is BlogArticleDetail => Boolean(post));

  return {
    categories: [...localCategories],
    posts: fallbackPosts,
    details: fallbackDetails,
    featuredArticle,
    recentArticles,
    allArticles,
  };
}

export const fallbackBlogData = buildFallbackBlogData();

export function getBlogArticleUrl(article: BlogArticle): string {
  const categorySlug = categorySlugMap[article.primaryCategory] || "geral";
  return `/blog/${categorySlug}/${article.slug}`;
}

function normalizeBlogPayload(payload: {
  categories?: string[];
  posts?: BlogArticle[];
  details?: BlogArticleDetail[];
  featuredSlug?: string;
  recentSlugs?: string[];
}): BlogCmsData {
  const posts = payload.posts ?? fallbackBlogData.posts;
  const details = payload.details ?? fallbackBlogData.details;
  const categories = payload.categories ?? fallbackBlogData.categories.slice(1);
  const categoriesWithAll = categories.includes("Todas")
    ? categories
    : ["Todas", ...categories];

  const featuredArticleFromPayload = posts.find(
    (post) => post.slug === payload.featuredSlug,
  );
  const featured = featuredArticleFromPayload ?? fallbackBlogData.featuredArticle;

  const recentFromPayload = (payload.recentSlugs ?? [])
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post): post is BlogArticle => Boolean(post));
  const recent = recentFromPayload.length > 0
    ? recentFromPayload
    : fallbackBlogData.recentArticles;

  const recentSet = new Set(recent.map((post) => post.slug));
  const featuredSet = new Set([featured.slug]);
  const all = posts.filter(
    (post) => !recentSet.has(post.slug) && !featuredSet.has(post.slug),
  );

  return {
    categories: categoriesWithAll,
    posts,
    details,
    featuredArticle: featured,
    recentArticles: recent,
    allArticles: all,
  };
}

export async function fetchBlogCmsData(): Promise<BlogCmsData> {
  try {
    const response = await fetch("/api/cms/blog");
    if (!response.ok) {
      return fallbackBlogData;
    }
    const payload = (await response.json()) as {
      categories?: string[];
      posts?: BlogArticle[];
      details?: BlogArticleDetail[];
      featuredSlug?: string;
      recentSlugs?: string[];
    };
    return normalizeBlogPayload(payload);
  } catch {
    return fallbackBlogData;
  }
}

export function getBlogArticleBySlug(
  data: BlogCmsData,
  slug: string,
): BlogArticleDetail | undefined {
  return data.details.find((article) => article.slug === slug);
}

export function getBlogRelatedArticles(
  data: BlogCmsData,
  currentSlug: string,
): BlogArticle[] {
  const article = data.details.find((item) => item.slug === currentSlug);
  if (article) {
    return article.relatedSlugs
      .map((slug) => data.posts.find((item) => item.slug === slug))
      .filter((item): item is BlogArticle => Boolean(item))
      .slice(0, 3);
  }

  return data.posts.filter((item) => item.slug !== currentSlug).slice(0, 3);
}

export function useBlogCmsData(): BlogCmsData {
  const [data, setData] = useState<BlogCmsData>(fallbackBlogData);

  useEffect(() => {
    let mounted = true;
    fetchBlogCmsData().then((nextData) => {
      if (mounted) {
        setData(nextData);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return data;
}

