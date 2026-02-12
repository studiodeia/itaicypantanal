import { BedSingle, BedDouble, Bath, Fence, User, Users } from "lucide-react";
import { AccommodationsHeroSection } from "./acomodacoes/sections/AccommodationsHeroSection";
import { ManifestoStatementSection } from "./acomodacoes/sections/ManifestoStatementSection";
import { AccommodationsHighlightsSection } from "./acomodacoes/sections/AccommodationsHighlightsSection";
import { ApartmentSection } from "./acomodacoes/sections/ApartmentSection";
import { CulinarySection } from "./acomodacoes/sections/CulinarySection";
import { ImmersionTestimonialsSection } from "./sections/ImmersionTestimonialsSection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { ImmersionCallToActionSection } from "./sections/ImmersionCallToActionSection";
import { SiteFooterSection } from "./sections/SiteFooterSection";

const apartamentoSingle = {
  title: "Suíte Explorer",
  description:
    "O refúgio ideal para o viajante solo que busca imersão total. Privacidade, silêncio e conexão com a natureza no seu próprio ritmo.",
  features: [
    { icon: BedSingle, label: "Cama Individual Premium" },
    { icon: Bath, label: "Banheiro Privativo" },
    { icon: Fence, label: "Varanda Intimista" },
    { icon: User, label: "1 Pessoa" },
  ],
  image: "/images/acomodacoes/suite-explorer.webp",
};

const apartamentoDuplo = {
  title: "Suíte Adventure",
  description:
    "Projetada para casais que buscam uma experiência a dois no coração do Pantanal. Conforto, natureza e momentos inesquecíveis.",
  features: [
    { icon: BedDouble, label: "Cama de Casal Premium" },
    { icon: Bath, label: "Banheiro Privativo" },
    { icon: Fence, label: "Varanda Privativa" },
    { icon: Users, label: "2 Pessoas" },
  ],
  image: "/images/acomodacoes/suite-adventure.webp",
};

const apartamentoTriplo = {
  title: "Suíte Family",
  description:
    "A mais espaçosa das nossas suítes. Perfeita para famílias ou pequenos grupos, com cama de casal, solteiro e ampla área de convivência.",
  features: [
    { icon: BedDouble, label: "Cama Casal + Solteiro" },
    { icon: Bath, label: "Banheiro Privativo" },
    { icon: Fence, label: "Varanda Ampla" },
    { icon: Users, label: "3 Pessoas" },
  ],
  image: "/images/acomodacoes/suite-family.webp",
};

export const Acomodacoes = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <AccommodationsHeroSection />
      <ManifestoStatementSection />
      <div
        style={{
          background: "linear-gradient(180deg, #344e41 0%, #263a30 100%)",
        }}
      >
        <AccommodationsHighlightsSection />
        <ApartmentSection {...apartamentoSingle} imagePosition="left" />
        <ApartmentSection {...apartamentoDuplo} imagePosition="right" />
        <ApartmentSection {...apartamentoTriplo} imagePosition="left" />
      </div>
      <ImmersionTestimonialsSection />
      <CulinarySection />
      <FrequentlyAskedQuestionsSection />
      <ImmersionCallToActionSection />
      <SiteFooterSection />
    </div>
  );
};
