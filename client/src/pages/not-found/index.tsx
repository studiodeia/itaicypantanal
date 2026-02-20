import { PageMeta } from "@/components/PageMeta";
import { usePageCms } from "@/lib/cms/page-content";
import { notFoundDefaults } from "../not-found-defaults";
import { NotFoundHeroSection } from "./sections/NotFoundHeroSection";
import { ExclusiveExpeditionsSection } from "@/pages/sections/ExclusiveExpeditionsSection";
import { PantanalBlogSection } from "@/pages/sections/PantanalBlogSection";
import { BLOG_ENABLED } from "@/lib/features";
import { SiteFooterSection } from "@/pages/sections/SiteFooterSection";

export default function NotFound() {
  const cms = usePageCms("/404", notFoundDefaults);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <PageMeta
        title="Pagina nao encontrada"
        noIndex={true}
      />
      <NotFoundHeroSection content={cms.hero} buttonText={cms.buttonText} />
      <ExclusiveExpeditionsSection />
      {/* BLOG: guarded by BLOG_ENABLED feature flag (see client/src/lib/features.ts) */}
      {BLOG_ENABLED && <PantanalBlogSection />}
      <SiteFooterSection />
    </div>
  );
}
