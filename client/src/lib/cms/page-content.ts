import { useEffect, useState } from "react";
import type { PageContentMap } from "@shared/cms-page-content";

const pageCache = new Map<string, unknown>();
const pagePromises = new Map<string, Promise<unknown>>();

async function fetchPageContent<K extends keyof PageContentMap>(
  slug: K,
): Promise<PageContentMap[K] | null> {
  const apiSlug = slug === "/" ? "home" : slug.replace(/^\//, "");
  try {
    const res = await fetch(`/api/cms/page/${apiSlug}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.content as PageContentMap[K];
  } catch {
    return null;
  }
}

export function usePageCms<K extends keyof PageContentMap>(
  slug: K,
  defaults: PageContentMap[K],
): PageContentMap[K] {
  const [content, setContent] = useState<PageContentMap[K]>(defaults);

  useEffect(() => {
    if (import.meta.env.MODE === "test") return;

    let mounted = true;

    // Check cache
    if (pageCache.has(slug)) {
      setContent(pageCache.get(slug) as PageContentMap[K]);
      return;
    }

    // Deduplicate in-flight requests
    let promise = pagePromises.get(slug) as Promise<PageContentMap[K] | null> | undefined;
    if (!promise) {
      promise = fetchPageContent(slug);
      pagePromises.set(slug, promise);
    }

    promise.then((data) => {
      if (data && mounted) {
        pageCache.set(slug, data);
        setContent(data);
      }
    }).finally(() => {
      pagePromises.delete(slug);
    });

    return () => { mounted = false; };
  }, [slug, defaults]);

  return content;
}
