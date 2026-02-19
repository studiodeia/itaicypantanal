/**
 * seedMultilingual.ts — Seeds EN and ES translations into Payload CMS globals.
 * Usage:  cd payload-cms && npx tsx src/scripts/seedMultilingual.ts
 */
import "dotenv/config";
import { getPayload } from "payload";
import config from "../payload.config";

// Page defaults (import type deps stripped by tsx)
import { homeDefaults } from "../../../client/src/pages/home-defaults";
import { acomodacoesDefaults } from "../../../client/src/pages/acomodacoes-defaults";
import { culinariaDefaults } from "../../../client/src/pages/culinaria-defaults";
import { pescaDefaults } from "../../../client/src/pages/pesca-defaults";
import { ecoturismoDefaults } from "../../../client/src/pages/ecoturismo-defaults";
import { birdwatchingDefaults } from "../../../client/src/pages/birdwatching-defaults";
import { contatoDefaults } from "../../../client/src/pages/contato-defaults";
import { nossoImpactoDefaults } from "../../../client/src/pages/nosso-impacto-defaults";
import { privacidadeDefaults } from "../../../client/src/pages/privacidade-defaults";
import { notFoundDefaults } from "../../../client/src/pages/not-found-defaults";

// Shared EN/ES inlined (shared-defaults.ts has @shared/ alias tsx cant resolve)
import { enShared, esShared } from "./sharedTranslations";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = Record<string, any>;

function wrapStrings(arr: unknown): { text: string }[] {
  if (!Array.isArray(arr)) return [];
  return arr.map((item) => ({ text: typeof item === "string" ? item : String(item) }));
}

/**
 * Transforms frontend defaults into Payload global shape.
 * Uses spread-first approach: all fields pass through, only fields
 * that need wrapping (string[] → {text}[]) are overridden.
 * This prevents data loss when new sections are added to globals.
 */
function buildGlobalData(route: string, data: AnyData): AnyData | null {
  switch (route) {
    case "/":
      return {
        ...data,
        aboutUs: { ...data.aboutUs, body: wrapStrings(data.aboutUs?.body) },
      };
    case "/culinaria":
      return {
        ...data,
        menu: data.menu ? { ...data.menu, body: wrapStrings(data.menu.body) } : data.menu,
        experience: data.experience ? { ...data.experience, body: wrapStrings(data.experience.body) } : data.experience,
      };
    case "/pesca":
    case "/ecoturismo":
    case "/observacao-de-aves":
      return {
        ...data,
        sobreNos: data.sobreNos ? { ...data.sobreNos, body: wrapStrings(data.sobreNos.body) } : data.sobreNos,
      };
    case "/contato":
      return {
        ...data,
        steps: data.steps ? { ...data.steps, placeholders: wrapStrings(data.steps.placeholders) } : data.steps,
      };
    case "/nosso-impacto":
      return {
        ...data,
        comunidade: data.comunidade ? { ...data.comunidade, body: wrapStrings(data.comunidade.body) } : data.comunidade,
      };
    case "/politica-de-privacidade":
      return {
        ...data,
        sections: (data.sections ?? []).map((s: AnyData) => ({
          ...s, content: wrapStrings(s.content),
        })),
      };
    case "/acomodacoes":
    case "/404":
      return { ...data };
    default:
      return null;
  }
}

function buildSiteSettingsData(shared: typeof enShared): AnyData {
  const mapLinks = (links: { label: string; url: string }[]) =>
    links.map((l) => ({ label: l.label, url: l.url }));
  return {
    ctaHeading: shared.immersionCta.heading,
    ctaDescription: shared.immersionCta.description,
    faqLabel: shared.faq.label,
    faqHeading: shared.faq.heading,
    faqDescription: shared.faq.description,
    faqItems: shared.faq.items.map((i) => ({ question: i.question, answer: i.answer })),
    testimonialsLabel: shared.testimonials.label,
    testimonialsHeading: shared.testimonials.heading,
    testimonialsDescription: shared.testimonials.description,
    testimonialItems: shared.testimonials.items.map((i) => ({ quote: i.quote, author: i.author, location: i.location })),
    footerPousadaLinks: mapLinks(shared.footer.pousadaLinks),
    footerExperienciasLinks: mapLinks(shared.footer.experienciasLinks),
    footerLegalLinks: mapLinks(shared.footer.legalLinks),
    footerCopyright: shared.footer.copyright,
  };
}

const PAGE_GLOBALS: { route: string; slug: string; defaults: { en: AnyData; es: AnyData } }[] = [
  { route: "/", slug: "home-content", defaults: { en: homeDefaults.en as AnyData, es: homeDefaults.es as AnyData } },
  { route: "/acomodacoes", slug: "acomodacoes-content", defaults: { en: acomodacoesDefaults.en as AnyData, es: acomodacoesDefaults.es as AnyData } },
  { route: "/culinaria", slug: "culinaria-content", defaults: { en: culinariaDefaults.en as AnyData, es: culinariaDefaults.es as AnyData } },
  { route: "/pesca", slug: "pesca-content", defaults: { en: pescaDefaults.en as AnyData, es: pescaDefaults.es as AnyData } },
  { route: "/ecoturismo", slug: "ecoturismo-content", defaults: { en: ecoturismoDefaults.en as AnyData, es: ecoturismoDefaults.es as AnyData } },
  { route: "/observacao-de-aves", slug: "birdwatching-content", defaults: { en: birdwatchingDefaults.en as AnyData, es: birdwatchingDefaults.es as AnyData } },
  { route: "/contato", slug: "contato-content", defaults: { en: contatoDefaults.en as AnyData, es: contatoDefaults.es as AnyData } },
  { route: "/nosso-impacto", slug: "nosso-impacto-content", defaults: { en: nossoImpactoDefaults.en as AnyData, es: nossoImpactoDefaults.es as AnyData } },
  { route: "/politica-de-privacidade", slug: "privacidade-content", defaults: { en: privacidadeDefaults.en as AnyData, es: privacidadeDefaults.es as AnyData } },
  { route: "/404", slug: "not-found-content", defaults: { en: notFoundDefaults.en as AnyData, es: notFoundDefaults.es as AnyData } },
];

async function main() {
  console.log("Initializing Payload...");
  const payload = await getPayload({ config });

  for (const { route, slug, defaults } of PAGE_GLOBALS) {
    for (const locale of ["en", "es"] as const) {
      const rawData = defaults[locale];
      const data = buildGlobalData(route, rawData);
      if (!data) { console.log(`  [SKIP] ${slug} / ${locale}`); continue; }
      await payload.updateGlobal({ slug, data, locale, depth: 0, overrideAccess: true });
      console.log(`  [OK] ${slug} / ${locale}`);
    }
  }

  for (const locale of ["en", "es"] as const) {
    const shared = locale === "en" ? enShared : esShared;
    const data = buildSiteSettingsData(shared);
    await payload.updateGlobal({ slug: "site-settings", data, locale, depth: 0, overrideAccess: true });
    console.log(`  [OK] site-settings / ${locale}`);
  }

  console.log("\nMultilingual seed completed!");
}

main().catch((err) => { console.error("Seed failed:", err); process.exitCode = 1; });
