import { PageMeta } from "@/components/PageMeta";
import { usePageCms } from "@/lib/cms/page-content";
import { useLanguage } from "@/i18n/context";
import { t } from "@/i18n/ui-strings";
import { contatoDefaults } from "../contato-defaults";
import { ContactHeroSection } from "./sections/ContactHeroSection";
import { ContactChannelsSection } from "./sections/ContactChannelsSection";
import { SiteFooterSection } from "@/pages/sections/SiteFooterSection";

export const Contato = (): JSX.Element => {
  const cms = usePageCms("/contato", contatoDefaults);
  const { lang } = useLanguage();

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title={cms.seo?.metaTitle || t("pageMeta", "contatoTitle", lang)}
        description={cms.seo?.metaDescription || t("pageMeta", "contatoDesc", lang)}
        canonicalPath="/contato"
        ogImage={cms.seo?.ogImage}
        noIndex={cms.seo?.noIndex}
        breadcrumbs={[
          { name: t("pageMeta", "breadHome", lang), path: "/" },
          { name: t("pageMeta", "breadContato", lang), path: "/contato" },
        ]}
      />
      <ContactHeroSection content={cms.hero} formTitle={cms.formTitle} steps={cms.steps} />
      <ContactChannelsSection content={cms.channels} />
      <SiteFooterSection />
    </div>
  );
};
