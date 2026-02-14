import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "@/lib/icons";
import { NavHeader } from "@/components/NavHeader";
import { fadeIn, fadeUp, staggerSlow, viewport } from "@/lib/motion";

export const NotFoundHeroSection = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuStateChange = useCallback((isOpen: boolean) => {
    setMenuOpen(isOpen);
  }, []);

  return (
    <section className="relative flex flex-col h-[844px] md:h-[680px] lg:h-[1080px] items-center justify-end w-full z-[11] overflow-hidden">
      {/* Background image */}
      <img
        src="/images/404-hero-bg.webp"
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
      <div className="relative z-[2] flex flex-col max-w-[1440px] items-start justify-end gap-8 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full flex-1">
        {/* Top: Title left + Button right */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between w-full gap-8">
          {/* Left: Label + Title */}
          <motion.div
            className="flex flex-col items-start gap-8 w-full lg:max-w-[738px] overflow-hidden"
            variants={staggerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <motion.span
              className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#e3f7ec] text-[length:var(--lead-md-font-size)] tracking-[3.84px] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)] uppercase"
              variants={fadeIn}
            >
              404
            </motion.span>

            <motion.h1
              className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] text-[#e3f7ec] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)] max-w-[600px]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
              variants={fadeUp}
            >
              Parece que você saiu um pouco da trilha.
            </motion.h1>
          </motion.div>

          {/* Right: Button */}
          <motion.a
            href="/"
            className="flex items-center justify-center h-14 px-6 border border-[#f2fcf7] rounded-[6px] text-[#f2fcf7] font-['Lato',sans-serif] font-semibold text-base lg:text-[24px] lg:leading-[32px] whitespace-nowrap shrink-0 transition-all duration-300 hover:bg-[#f2fcf7] hover:text-[#152218] hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Voltar para o início
          </motion.a>
        </div>

        {/* Bottom: border-top + description + scroll */}
        <motion.div
          className="flex flex-col md:flex-row items-start justify-between gap-6 w-full border-t border-[#f2fcf7] pt-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <p className="max-w-[600px] font-body-md font-[number:var(--body-md-font-weight)] text-[#e3f7ec] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
            Acontece até com os exploradores mais experientes. A página que você
            procurava não foi encontrada ou pode ter sido movida.
          </p>

          <div className="hidden md:flex items-center gap-2 text-[#e3f7ec] shrink-0">
            <span className="font-body-md font-[number:var(--body-md-font-weight)] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)] whitespace-nowrap">
              Deslize para baixo
            </span>
            <ArrowDown className="w-6 h-6" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

