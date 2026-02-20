import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      return stored && VALID_LANGS.includes(stored) ? stored : "pt";
    } catch {
      return "pt";
    }
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
    document.documentElement.lang = l === "pt" ? "pt-BR" : l === "es" ? "es" : "en";
  };

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang === "es" ? "es" : "en";
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
