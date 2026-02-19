/**
 * Custom wouter location hook for multilingual URL routing.
 *
 * Reading:  delocalizes the browser URL to its PT canonical
 *           so all existing <Route path="/pesca"> patterns still match.
 * Writing:  localizes a PT path to the current language before pushing.
 *
 * The `hrefs` static property localizes <Link> href attributes
 * so crawlers see the correct per-language URL (e.g. /en/sport-fishing).
 */

import { useState, useEffect, useCallback } from "react";
import {
  detectLangFromPath,
  delocalizePath,
  localizePath,
  isPanelPath,
} from "./routes";

function getPathname(): string {
  return window.location.pathname;
}

/**
 * Custom wouter BaseLocationHook.
 * Returns [ptPath, navigate] where ptPath is always the PT canonical.
 */
function useLocalizedLocation(): [string, (to: string, ...args: any[]) => void] {
  const [rawPath, setRawPath] = useState(getPathname);

  useEffect(() => {
    const handler = () => setRawPath(getPathname());
    window.addEventListener("popstate", handler);
    // Also listen to our custom event dispatched by setLang
    window.addEventListener("localized-navigation", handler);
    return () => {
      window.removeEventListener("popstate", handler);
      window.removeEventListener("localized-navigation", handler);
    };
  }, []);

  // Delocalize for wouter route matching
  const ptPath = isPanelPath(rawPath) ? rawPath : delocalizePath(rawPath);

  const navigate = useCallback(
    (to: string, ...args: any[]) => {
      // Don't localize admin panel paths
      if (isPanelPath(to)) {
        const opts = args[0] as { replace?: boolean } | undefined;
        if (opts?.replace) {
          window.history.replaceState(null, "", to);
        } else {
          window.history.pushState(null, "", to);
        }
        setRawPath(to);
        return;
      }

      const currentLang = detectLangFromPath(window.location.pathname);
      const ptTo = delocalizePath(to);
      const localizedTo = localizePath(ptTo, currentLang);

      const opts = args[0] as { replace?: boolean } | undefined;
      if (opts?.replace) {
        window.history.replaceState(null, "", localizedTo);
      } else {
        window.history.pushState(null, "", localizedTo);
      }
      setRawPath(localizedTo);
    },
    [],
  );

  return [ptPath, navigate];
}

/**
 * Localize <Link> href attributes for SEO.
 * wouter calls `router.hrefs(href)` to compute the <a href="..."> attribute.
 * This makes crawlers see /en/sport-fishing instead of /pesca on EN pages.
 */
useLocalizedLocation.hrefs = (href: string): string => {
  if (isPanelPath(href)) return href;
  const currentLang = detectLangFromPath(window.location.pathname);
  const ptHref = delocalizePath(href);
  return localizePath(ptHref, currentLang);
};

export { useLocalizedLocation };
