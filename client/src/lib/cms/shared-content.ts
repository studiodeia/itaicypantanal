import { useEffect, useState } from "react";
import {
  defaultSharedCmsSections,
  type SharedCmsSections,
} from "@shared/cms-shared-content";

type SharedCmsResponse = {
  source?: "seed" | "payload";
  shared?: SharedCmsSections;
};

let sharedSectionsCache: SharedCmsSections | null = null;
let sharedSectionsPromise: Promise<SharedCmsSections> | null = null;

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

export async function fetchSharedCmsSections(): Promise<SharedCmsSections> {
  try {
    const response = await fetch("/api/cms/shared");
    if (!response.ok) {
      return defaultSharedCmsSections;
    }

    const payload = (await response.json()) as SharedCmsResponse;
    if (isValidSharedSections(payload.shared)) {
      return payload.shared;
    }
    return defaultSharedCmsSections;
  } catch {
    return defaultSharedCmsSections;
  }
}

async function fetchSharedCmsSectionsCached(): Promise<SharedCmsSections> {
  if (sharedSectionsCache) {
    return sharedSectionsCache;
  }

  if (sharedSectionsPromise) {
    return sharedSectionsPromise;
  }

  sharedSectionsPromise = fetchSharedCmsSections()
    .then((sections) => {
      sharedSectionsCache = sections;
      return sections;
    })
    .finally(() => {
      sharedSectionsPromise = null;
    });

  return sharedSectionsPromise;
}

export function useSharedCmsSections(): SharedCmsSections {
  const [sections, setSections] = useState<SharedCmsSections>(
    defaultSharedCmsSections,
  );

  useEffect(() => {
    if (import.meta.env.MODE === "test") {
      return;
    }

    let mounted = true;
    fetchSharedCmsSectionsCached().then((next) => {
      if (mounted) {
        setSections((current) => (current === next ? current : next));
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return sections;
}
