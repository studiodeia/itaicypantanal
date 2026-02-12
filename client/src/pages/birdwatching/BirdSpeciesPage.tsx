import { useParams } from "wouter";
import { getBirdBySlug, getRelatedBirds } from "./data";
import { SpeciesHeroSection } from "./sections/SpeciesHeroSection";
import { SpeciesContentSection } from "./sections/SpeciesContentSection";
import { SimilarSpeciesSection } from "./sections/SimilarSpeciesSection";
import { ImmersionCallToActionSection } from "../sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "../sections/SiteFooterSection";

export const BirdSpeciesPage = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const bird = slug ? getBirdBySlug(slug) : undefined;

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

  const relatedBirds = getRelatedBirds(bird.slug);

  return (
    <div className="flex flex-col w-full">
      <SpeciesHeroSection bird={bird} />
      <SpeciesContentSection bird={bird} />
      <SimilarSpeciesSection birds={relatedBirds} />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
