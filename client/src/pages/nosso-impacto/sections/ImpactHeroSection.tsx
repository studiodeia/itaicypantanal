import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "@/lib/icons";
import { NavHeader } from "@/components/NavHeader";
import { fadeIn, fadeUp, staggerSlow, viewport } from "@/lib/motion";
import type { CmsHero } from "@shared/cms-page-content";

type Props = { content: CmsHero };

export const ImpactHeroSection = ({ content }: Props): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuStateChange = useCallback((isOpen: boolean) => {
    setMenuOpen(isOpen);
  }, []);

  return (
    <section className="relative flex flex-col h-screen items-center justify-end w-full z-[11] overflow-hidden">
      {/* Background image */}
      <img
        src={content.backgroundImage}
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
        variants={staggerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="relative z-[2] flex flex-col max-w-[1440px] items-start justify-end gap-8 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full flex-1"
      >
        {/* Top: Label + Title */}
        <div className="flex flex-col items-start gap-6 md:gap-8 w-full max-w-[738px] overflow-hidden">
          <motion.span variants={fadeIn} className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#d7a45d] text-[length:var(--lead-md-font-size)] tracking-[3.84px] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)] uppercase">
            {content.label}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] text-[#e3f7ec] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            {content.heading}
          </motion.h1>
        </div>

        {/* Bottom: border-top + description + scroll */}
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-start justify-between gap-6 w-full border-t border-[#f2fcf7] pt-8">
          <p className="max-w-[600px] font-body-md font-[number:var(--body-md-font-weight)] text-[#f2fcf7] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
            {content.description}
          </p>

          <div className="hidden md:flex items-center gap-2 text-[#e3f7ec] shrink-0">
            <span className="font-body-md font-[number:var(--body-md-font-weight)] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)] whitespace-nowrap">
              {content.scrollHint}
            </span>
            <ArrowDown className="w-6 h-6" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
