import { useEffect, useState } from "react";
import type { PageContentMap } from "@shared/cms-page-content";
import { useLanguage, type Lang } from "@/i18n/context";

export type LocalizedDefaults<K extends keyof PageContentMap> = Record<Lang, PageContentMap[K]>;

const pageCache = new Map<string, unknown>();
const pagePromises = new Map<string, Promise<unknown>>();

const LOCALE_MAP: Record<Lang, string> = { pt: "pt", en: "en", es: "es" };

async function fetchPageContent<K extends keyof PageContentMap>(
  slug: K,
  locale: string,
): Promise<PageContentMap[K] | null> {
  const apiSlug = slug === "/" ? "home" : (slug as string).replace(/^\//, "");
  try {
    const res = await fetch(`/api/cms/page/${apiSlug}?locale=${locale}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.content as PageContentMap[K];
  } catch {
    return null;
  }
}

export function usePageCms<K extends keyof PageContentMap>(
  slug: K,
  defaults: LocalizedDefaults<K>,
): PageContentMap[K] {
  const { lang } = useLanguage();
  const localDefault = defaults[lang] ?? defaults.pt;
  const [content, setContent] = useState<PageContentMap[K]>(localDefault);

  useEffect(() => {
    if (import.meta.env.MODE === "test") return;

    const locale = LOCALE_MAP[lang] ?? "pt";
    const cacheKey = `${slug}:${locale}`;

    if (pageCache.has(cacheKey)) {
      setContent(pageCache.get(cacheKey) as PageContentMap[K]);
      return;
    }

    let mounted = true;
    let promise = pagePromises.get(cacheKey) as Promise<PageContentMap[K] | null> | undefined;
    if (!promise) {
      promise = fetchPageContent(slug, locale);
      pagePromises.set(cacheKey, promise);
    }

    promise.then((data) => {
      if (data && mounted) {
        pageCache.set(cacheKey, data);
        setContent(data);
      } else if (!data && mounted) {
        setContent(defaults[lang] ?? defaults.pt);
      }
    }).finally(() => {
      pagePromises.delete(cacheKey);
    });

    return () => { mounted = false; };
  }, [slug, lang]);

  return content;
}
