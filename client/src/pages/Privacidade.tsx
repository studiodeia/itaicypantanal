import { PageMeta } from "@/components/PageMeta";
import { usePageCms } from "@/lib/cms/page-content";
import { useLanguage } from "@/i18n/context";
import { t } from "@/i18n/ui-strings";
import { privacidadeDefaults } from "./privacidade-defaults";
import { PrivacyHeroSection } from "./privacidade/sections/PrivacyHeroSection";
import { PrivacyContentSection } from "./privacidade/sections/PrivacyContentSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";

export const Privacidade = (): JSX.Element => {
  const cms = usePageCms("/politica-de-privacidade", privacidadeDefaults);
  const { lang } = useLanguage();

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title={t("pageMeta", "privacidadeTitle", lang)}
        description={t("pageMeta", "privacidadeDesc", lang)}
        canonicalPath="/politica-de-privacidade"
        noIndex={true}
        breadcrumbs={[
          { name: t("pageMeta", "breadHome", lang), path: "/" },
          { name: t("pageMeta", "breadPrivacidade", lang), path: "/politica-de-privacidade" },
        ]}
      />
      <PrivacyHeroSection content={cms.hero} />
      <PrivacyContentSection content={cms.sections} />
      <SiteFooterSection />
    </div>
  );
};
