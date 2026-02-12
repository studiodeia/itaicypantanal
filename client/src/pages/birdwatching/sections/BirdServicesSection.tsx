import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import { stagger, fadeIn, fadeUp, cardItem, viewport } from "@/lib/motion";
import { allBirds, getBirdUrl } from "../data";
import type { BirdSpecies } from "../data";

const birdSpecies = allBirds.slice(0, 4);

export const BirdServicesSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#263a30]">
      <div className="flex flex-col max-w-[1440px] gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Section Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-6 md:gap-8"
        >
          <motion.span variants={fadeIn} className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]">
            O SANTUÁRIO
          </motion.span>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-[100px] items-start lg:items-center">
            <motion.h2
              variants={fadeUp}
              className="lg:w-[664px] shrink-0 font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            >
              Conheça Nossas Espécies
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              Nossa reserva é um paraíso para observadores. Nossos guias já
              catalogaram 166 espécies em expedições de apenas 5 dias. Explore
              algumas das nossas estrelas abaixo.
            </motion.p>
          </div>
        </motion.div>

        {/* Bird cards — 2x2 grid */}
        <div className="flex flex-col gap-8 md:gap-6 lg:gap-[32px]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col md:flex-row gap-8 md:gap-6 lg:gap-[32px]"
          >
            {birdSpecies.slice(0, 2).map((bird, idx) => (
              <motion.div key={idx} variants={cardItem} className="w-full md:flex-1">
                <BirdCard bird={bird} index={idx} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col md:flex-row gap-8 md:gap-6 lg:gap-[32px]"
          >
            {birdSpecies.slice(2, 4).map((bird, idx) => (
              <motion.div key={idx + 2} variants={cardItem} className="w-full md:flex-1">
                <BirdCard bird={bird} index={idx + 2} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA contextual — conversão do birdwatcher */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 w-full p-6 md:p-8 lg:p-10 bg-[#344e41] rounded-lg"
        >
          <div className="flex flex-col gap-3 flex-1">
            <h3
              className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[#e3f7ec] text-[length:var(--heading-sm-font-size)] leading-[var(--heading-sm-line-height)] tracking-[var(--heading-sm-letter-spacing)] [font-style:var(--heading-sm-font-style)]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            >
              Quer fotografar essas espécies de perto?
            </h3>
            <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)] max-w-[600px]">
              Nossos guias especializados sabem onde estão os ninhos ativos e os
              melhores pontos de observação. Expedições fotográficas exclusivas
              com acesso a áreas restritas.
            </p>
          </div>
          <a
            href="/observacao-de-aves#reservar"
            className="flex items-center justify-center h-14 px-6 bg-[#ac8042] hover:bg-[#8f6a35] rounded-[6px] text-[#f2fcf7] font-['Lato',sans-serif] font-semibold text-base lg:text-lg whitespace-nowrap shrink-0 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]"
          >
            Agendar Expedição Fotográfica
          </a>
        </motion.div>

        {/* Bottom CTA */}
        <motion.a
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          href="/observacao-de-aves/catalogo"
          className="flex items-center justify-between w-full py-4 border-b border-[#f2fcf7] transition-all duration-300 group"
        >
          <span className="link-hover font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
            Ver guia de aves completo
          </span>
          <ChevronRight
            className="w-5 h-5 text-[#e3f7ec] transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={2}
          />
        </motion.a>
      </div>
    </section>
  );
};

interface BirdCardProps {
  bird: BirdSpecies;
  index: number;
}

const BirdCard = ({ bird, index }: BirdCardProps): JSX.Element => {
  return (
    <a href={getBirdUrl(bird)} className="relative flex flex-col justify-end w-full md:flex-1 h-[500px] md:h-[600px] lg:h-[910px] rounded-lg overflow-hidden group">
      {/* Background image */}
      <OptimizedImage
        src={bird.src}
        alt={bird.commonName}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(21,34,24,0.88) 32.8%, rgba(21,34,24,0) 75.5%)",
        }}
      />

      {/* Tag */}
      <div className="absolute top-6 left-6 bg-[rgba(10,19,12,0.4)] text-[#f2fcf7] px-3 py-1 rounded-full font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
        {bird.tag}
      </div>

      {/* Content */}
      <div className="relative flex flex-col gap-8 md:gap-10 p-5 md:p-6 lg:p-[32px]">
        {/* Text content */}
        <div className="flex flex-col gap-5">
          <span className="font-body-xs font-[number:var(--body-xs-font-weight)] text-[#a8cab9] text-[length:var(--body-xs-font-size)] leading-[var(--body-xs-line-height)] [font-style:var(--body-xs-font-style)]">
            {bird.scientificName}
          </span>
          <h3
            className="font-heading-md font-[number:var(--heading-md-font-weight)] text-[#e3f7ec] text-[length:var(--heading-md-font-size)] leading-[var(--heading-md-line-height)] tracking-[var(--heading-md-letter-spacing)] [font-style:var(--heading-md-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            {bird.commonName}
          </h3>
          <p className="max-w-[648px] font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
            {bird.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#446354] overflow-hidden">
              <img
                src="/images/bird-avatar.webp"
                alt={bird.author}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[#cfebdd] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)]">
                {bird.author}
              </span>
              <span className="font-body-xs font-[number:var(--body-xs-font-weight)] text-[#cfebdd] text-[length:var(--body-xs-font-size)] leading-[var(--body-xs-line-height)] [font-style:var(--body-xs-font-style)]">
                {bird.date}
              </span>
            </div>
          </div>

          <span className="flex items-center gap-1.5 px-4 py-2 rounded text-[#f2fcf7] transition-all duration-300 group-hover:-translate-y-0.5">
            <span className="font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)]">
              Saiba mais
            </span>
            <ChevronRight className="w-5 h-5" strokeWidth={2} />
          </span>
        </div>
      </div>
    </a>
  );
};
