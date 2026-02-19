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

/** Read initial language: URL prefix wins, then localStorage, then default PT. */
function getInitialLang(): Lang {
  // 1. URL prefix is the primary source of truth (for SEO and direct links)
  if (typeof window !== "undefined") {
    const urlLang = detectLangFromPath(window.location.pathname);
    if (urlLang !== "pt") return urlLang;
  }

  // 2. localStorage preference (for returning visitors who arrive at /)
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && VALID_LANGS.includes(stored)) return stored;
  } catch {
    // SSR or storage blocked
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
