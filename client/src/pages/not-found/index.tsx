import { PageMeta } from "@/components/PageMeta";
import { usePageCms } from "@/lib/cms/page-content";
import { useLanguage } from "@/i18n/context";
import { t } from "@/i18n/ui-strings";
import { notFoundDefaults } from "../not-found-defaults";
import { NotFoundHeroSection } from "./sections/NotFoundHeroSection";
import { ExclusiveExpeditionsSection } from "@/pages/sections/ExclusiveExpeditionsSection";
import { PantanalBlogSection } from "@/pages/sections/PantanalBlogSection";
import { SiteFooterSection } from "@/pages/sections/SiteFooterSection";

export default function NotFound() {
  const cms = usePageCms("/404", notFoundDefaults);
  const { lang } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen w-full">
      <PageMeta
        title={t("pageMeta", "notFoundTitle", lang)}
        noIndex={true}
      />
      <NotFoundHeroSection content={cms.hero} buttonText={cms.buttonText} />
      <ExclusiveExpeditionsSection />
      <PantanalBlogSection />
      <SiteFooterSection />
    </div>
  );
}
