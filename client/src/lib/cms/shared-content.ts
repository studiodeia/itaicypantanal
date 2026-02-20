import { useEffect, useState } from "react";
import {
  defaultSharedCmsSections,
  type SharedCmsSections,
} from "@shared/cms-shared-content";
import { useLanguage, type Lang } from "@/i18n/context";
import { sharedDefaults } from "./shared-defaults";

type SharedCmsResponse = {
  source?: "seed" | "payload";
  shared?: SharedCmsSections;
};

const sharedCache = new Map<string, SharedCmsSections>();
const sharedPromises = new Map<string, Promise<SharedCmsSections>>();

const LOCALE_MAP: Record<Lang, string> = { pt: "pt", en: "en", es: "es" };

/** Fill empty-string fields in CMS data with values from the locale fallback. */
function mergeWithFallback(
  cms: SharedCmsSections,
  fallback: SharedCmsSections,
): SharedCmsSections {
  const footer = cms.footer;
  const fb = fallback.footer;
  return {
    ...cms,
    footer: {
      ...footer,
      pousadaHeading: footer.pousadaHeading || fb.pousadaHeading,
      experienciasHeading: footer.experienciasHeading || fb.experienciasHeading,
      contactHeading: footer.contactHeading || fb.contactHeading,
    },
  };
}

function isValidSharedSections(value: unknown): value is SharedCmsSections {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return Boolean(
    record.immersionCta &&
      record.faq &&
      record.testimonials &&
      record.footer &&
      record.homeHero &&
      record.homeManifesto,
  );
}

export async function fetchSharedCmsSections(locale = "pt"): Promise<SharedCmsSections> {
  const localeFallback = sharedDefaults[locale as Lang] ?? defaultSharedCmsSections;
  try {
    const response = await fetch(`/api/cms/shared?locale=${locale}`);
    if (!response.ok) {
      return localeFallback;
    }

    const payload = (await response.json()) as SharedCmsResponse;
    if (isValidSharedSections(payload.shared)) {
      return mergeWithFallback(payload.shared, localeFallback);
    }
    return localeFallback;
  } catch {
    return localeFallback;
  }
}

function fetchSharedCmsSectionsCached(locale: string): Promise<SharedCmsSections> {
  const cached = sharedCache.get(locale);
  if (cached) return Promise.resolve(cached);

  const existing = sharedPromises.get(locale);
  if (existing) return existing;

  const promise = fetchSharedCmsSections(locale)
    .then((sections) => {
      sharedCache.set(locale, sections);
      return sections;
    })
    .finally(() => {
      sharedPromises.delete(locale);
    });

  sharedPromises.set(locale, promise);
  return promise;
}

export function useSharedCmsSections(): SharedCmsSections {
  const { lang } = useLanguage();
  const [sections, setSections] = useState<SharedCmsSections>(
    sharedDefaults[lang],
  );

  useEffect(() => {
    if (import.meta.env.MODE === "test") {
      return;
    }

    const locale = LOCALE_MAP[lang] ?? "pt";
    let mounted = true;
    fetchSharedCmsSectionsCached(locale).then((next) => {
      if (mounted) {
        setSections((current) => (current === next ? current : next));
      }
    });
    return () => {
      mounted = false;
    };
  }, [lang]);

  return sections;
}
