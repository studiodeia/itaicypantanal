import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "@/lib/icons";
import { NavHeader } from "@/components/NavHeader";
import { Divider } from "@/components/Divider";
import { fadeIn, fadeUp, staggerSlow, viewport } from "@/lib/motion";

export const CatalogHeroSection = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuStateChange = useCallback((isOpen: boolean) => {
    setMenuOpen(isOpen);
  }, []);

  return (
    <section className="relative flex flex-col h-screen items-center justify-end w-full z-[11] overflow-hidden">
      {/* Background image */}
      <img
        src="/images/bird-hero-bg.webp"
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-[filter,transform] duration-300 ${
          menuOpen ? "blur-[8px] scale-105" : ""
        }`}
      />

      {/* Overlay gradients */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          menuOpen
            ? "z-[3] glass-overlay-hero"
            : "z-[1]"
        }`}
        style={
          !menuOpen
            ? {
                background:
                  "linear-gradient(0deg, rgba(21,34,24,0.5) 19.7%, rgba(21,34,24,0) 62.4%), linear-gradient(180deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0) 11.6%), linear-gradient(90deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.32) 100%)",
              }
            : undefined
        }
      />

      {/* Navigation */}
      <NavHeader onMenuStateChange={handleMenuStateChange} />

      {/* Hero content */}
      <motion.div
        className="relative z-[2] flex flex-col max-w-[1440px] items-start justify-end gap-8 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full flex-1"
        variants={staggerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div className="flex flex-col items-start gap-6 md:gap-8 w-full max-w-[738px]" variants={fadeUp}>
          {/* Label */}
          <motion.span className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#e3f7ec] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]" variants={fadeIn}>
            GUIA DE AVES
          </motion.span>

          {/* Title */}
          <motion.h1
            className="max-w-[600px] font-display-lg font-[number:var(--display-lg-font-weight)] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] text-[#e3f7ec] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            variants={fadeUp}
          >
            Espécies do Nosso Santuário
          </motion.h1>
        </motion.div>

        {/* Bottom bar */}
        <motion.div className="flex flex-col gap-6 md:gap-8 w-full" variants={fadeUp}>
          <Divider theme="dark" />
          <div className="flex items-start justify-between w-full">
            <motion.p className="max-w-[600px] font-body-md font-[number:var(--body-md-font-weight)] text-[#e3f7ec] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]" variants={fadeUp}>
              Explore o compêndio completo da avifauna registrada em nossa
              reserva. Mais de 166 espécies catalogadas em expedições de campo.
            </motion.p>

            <div className="hidden md:flex items-center gap-2 text-[#e3f7ec]">
              <span className="font-body-md font-[number:var(--body-md-font-weight)] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)] whitespace-nowrap">
                Deslize para baixo
              </span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};



