import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { detectLangFromPath, delocalizePath, localizePath } from "./routes";

export type Lang = "pt" | "en" | "es";

const STORAGE_KEY = "itaicy_lang";
const VALID_LANGS: Lang[] = ["pt", "en", "es"];

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "pt",
  setLang: () => {},
});

/** Read initial language purely from the URL prefix.
 *  With distinct per-language URLs (Phase 2), the URL IS the language.
 *  No localStorage fallback — `/` is always PT, `/en/` is EN, `/es/` is ES. */
function getInitialLang(): Lang {
  if (typeof window !== "undefined") {
    return detectLangFromPath(window.location.pathname);
  }
  return "pt";
}

const HTML_LANG: Record<Lang, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  /**
   * Switch language: navigates to the equivalent localized URL.
   * E.g. on /en/sport-fishing → setLang("es") → /es/pesca-deportiva
   */
  const setLang = (newLang: Lang) => {
    if (newLang === lang) return;

    setLangState(newLang);

    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // storage blocked
    }

    document.documentElement.lang = HTML_LANG[newLang];

    // Compute new URL and navigate
    const currentPtPath = delocalizePath(window.location.pathname);
    const newPath = localizePath(currentPtPath, newLang);

    window.history.pushState(null, "", newPath);
    // Notify the custom location hook to re-read the URL
    window.dispatchEvent(new Event("localized-navigation"));
  };

  // Sync lang when user navigates via browser back/forward
  useEffect(() => {
    const syncLangFromUrl = () => {
      const urlLang = detectLangFromPath(window.location.pathname);
      setLangState((prev) => (prev !== urlLang ? urlLang : prev));
    };
    window.addEventListener("popstate", syncLangFromUrl);
    return () => window.removeEventListener("popstate", syncLangFromUrl);
  }, []);

  // Set html lang attribute on mount and lang change
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
