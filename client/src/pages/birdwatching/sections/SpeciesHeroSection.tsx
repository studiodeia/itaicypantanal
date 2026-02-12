import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { NavHeader } from "@/components/NavHeader";
import { OptimizedImage } from "@/components/OptimizedImage";
import { fadeIn, fadeUp, scaleIn, staggerSlow, viewport } from "@/lib/motion";
import type { BirdSpeciesDetail } from "../data";

interface SpeciesHeroSectionProps {
  bird: BirdSpeciesDetail;
}

export const SpeciesHeroSection = ({
  bird,
}: SpeciesHeroSectionProps): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuStateChange = useCallback((isOpen: boolean) => {
    setMenuOpen(isOpen);
  }, []);

  return (
    <section className="relative flex flex-col items-center w-full z-[11] overflow-hidden bg-[#263a30]">
      {/* Menu overlay */}
      {menuOpen && (
        <div className="absolute inset-0 z-[3] bg-[rgba(21,34,24,0.7)] backdrop-blur-[8px] transition-all duration-300" />
      )}

      {/* Navigation */}
      <NavHeader onMenuStateChange={handleMenuStateChange} />

      {/* Hero content */}
      <motion.div
        className="relative z-[2] flex flex-col max-w-[1440px] items-start gap-8 px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full"
        variants={staggerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {/* Breadcrumb */}
        <motion.a
          href="/observacao-de-aves/catalogo"
          className="flex items-center gap-2 text-[#a8cab9] transition-colors duration-200 hover:text-[#e3f7ec]"
          variants={fadeIn}
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2} />
          <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
            Aves
          </span>
        </motion.a>

        {/* Badge */}
        <motion.span className="bg-[rgba(10,19,12,0.4)] text-[#f2fcf7] px-3 py-1 rounded-full font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]" variants={fadeIn}>
          {bird.category}
        </motion.span>

        {/* Small title */}
        <motion.span className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]" variants={fadeIn}>
          AVES DO PANTANAL
        </motion.span>

        {/* Main title + description */}
        <motion.div className="flex flex-col gap-6 md:gap-8 max-w-[1000px]" variants={fadeUp}>
          <motion.h1
            className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] text-[#e3f7ec] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            variants={fadeUp}
          >
            {bird.commonName}
          </motion.h1>

          <motion.p className="max-w-[600px] font-body-md font-[number:var(--body-md-font-weight)] text-[#e3f7ec] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]" variants={fadeUp}>
            {bird.description}
          </motion.p>
        </motion.div>

        {/* Author info */}
        <motion.div className="flex flex-wrap items-center gap-4 lg:gap-8" variants={fadeUp}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#446354] overflow-hidden shrink-0">
              <img
                src="/images/bird-avatar.webp"
                alt={bird.author}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <span className="font-['Lato',sans-serif] font-bold text-[#e3f7ec] text-base lg:text-lg leading-6 lg:leading-7">
              {bird.author}
            </span>
          </div>
          <span className="font-body-md font-[number:var(--body-md-font-weight)] text-[#cfebdd] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)]">
            {bird.date}
          </span>
        </motion.div>

        {/* Hero image */}
        <motion.div className="w-full aspect-video rounded-lg overflow-hidden mt-4" variants={scaleIn}>
          <OptimizedImage
            src={bird.heroImage}
            alt={bird.commonName}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
