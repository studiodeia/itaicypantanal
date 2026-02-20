import { useParams } from "wouter";
import { PageMeta } from "@/components/PageMeta";
import { JsonLd, buildTaxon } from "@/components/JsonLd";
import {
  getBirdBySlugFromCms,
  getRelatedBirdsFromCms,
  useBirdCmsData,
} from "./cms";
import { SpeciesHeroSection } from "./sections/SpeciesHeroSection";
import { SpeciesContentSection } from "./sections/SpeciesContentSection";
import { SimilarSpeciesSection } from "./sections/SimilarSpeciesSection";
import { ImmersionCallToActionSection } from "../sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "../sections/SiteFooterSection";

export const BirdSpeciesPage = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const birdData = useBirdCmsData();
  const bird = slug ? getBirdBySlugFromCms(birdData, slug) : undefined;

  if (!bird) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#263a30] text-[#e3f7ec]">
        <h1 className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)]">
          Espécie não encontrada
        </h1>
        <a
          href="/observacao-de-aves/catalogo"
          className="mt-8 text-[#ac8042] underline"
        >
          Voltar ao catálogo
        </a>
      </div>
    );
  }

  const relatedBirds = getRelatedBirdsFromCms(birdData, bird.slug);

  const taxonSchema = buildTaxon({
    commonName: bird.commonName,
    scientificName: bird.scientificName,
    description: bird.overview || bird.description,
    conservationStatus: bird.conservationStatus,
    size: bird.size,
    habitat: bird.habitat,
    image: bird.heroImage || bird.src,
    slug: bird.slug,
  });

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        title={`${bird.commonName} (${bird.scientificName})`}
        description={bird.description}
        canonicalPath={`/observacao-de-aves/catalogo/${bird.slug}`}
        ogImage={bird.heroImage || bird.src}
        breadcrumbs={[
          { name: "Inicio", path: "/" },
          { name: "Observacao de Aves", path: "/observacao-de-aves" },
          { name: "Catalogo", path: "/observacao-de-aves/catalogo" },
          { name: bird.commonName, path: `/observacao-de-aves/catalogo/${bird.slug}` },
        ]}
      />
      <JsonLd data={taxonSchema} />
      <SpeciesHeroSection bird={bird} />
      <SpeciesContentSection bird={bird} />
      <SimilarSpeciesSection birds={relatedBirds} />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
