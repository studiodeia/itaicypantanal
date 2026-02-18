import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "@/lib/icons";
import { NavHeader } from "@/components/NavHeader";
import type { BlogArticle } from "../data";
import { staggerSlow, fadeIn, fadeUp, viewport } from "@/lib/motion";

interface BlogHeroSectionProps {
  featuredArticle: BlogArticle;
}

export const BlogHeroSection = ({
  featuredArticle,
}: BlogHeroSectionProps): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuStateChange = useCallback((isOpen: boolean) => {
    setMenuOpen(isOpen);
  }, []);

  return (
    <section className="relative flex flex-col h-screen items-center justify-end w-full z-[11] overflow-hidden">
      {/* Background image */}
      <img
        src="/images/blog-hero-bg.webp"
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
                  "linear-gradient(0deg, rgba(21,34,24,0.5) 42.9%, rgba(21,34,24,0) 79.7%), linear-gradient(180deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0) 11.6%), linear-gradient(90deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.32) 100%)",
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
        {/* Top area: Title left + Author right */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between w-full gap-8">
          {/* Left: Tag + Title */}
          <div className="flex flex-col items-start gap-8 w-full lg:max-w-[1000px] overflow-hidden">
            {/* Tag + reading time */}
            <motion.div className="flex items-center gap-3" variants={fadeIn}>
              <span className="bg-[rgba(10,19,12,0.4)] text-[#f2fcf7] px-3 py-1 rounded-full font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
                {featuredArticle.tag}
              </span>
              <span className="font-body-md font-[number:var(--body-md-font-weight)] text-[#e3f7ec] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
                {featuredArticle.readingTime}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] text-[#e3f7ec] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
              variants={fadeUp}
            >
              {featuredArticle.title}
            </motion.h1>
          </div>

          {/* Right: Author info */}
          <motion.div className="flex items-center gap-4 shrink-0" variants={fadeUp}>
            <div className="w-14 h-14 rounded-full bg-[#446354] overflow-hidden shrink-0" />
            <div className="flex flex-col">
              <span className="font-body-md font-[number:var(--body-md-font-weight)] text-[#e3f7ec] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)] w-full lg:w-[245px] overflow-hidden text-ellipsis whitespace-nowrap">
                {featuredArticle.author}
              </span>
              <span className="font-body-md font-[number:var(--body-md-font-weight)] text-[#cfebdd] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
                {featuredArticle.date}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom: border-top + description + scroll */}
        <motion.div className="flex flex-col md:flex-row items-start justify-between gap-6 w-full border-t border-[#f2fcf7] pt-8" variants={fadeUp}>
          <p className="max-w-[600px] font-body-md font-[number:var(--body-md-font-weight)] text-[#e3f7ec] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
            {featuredArticle.description}
          </p>

          <div className="hidden md:flex items-center gap-2 text-[#e3f7ec] shrink-0">
            <span className="font-body-md font-[number:var(--body-md-font-weight)] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)] whitespace-nowrap">
              Mais artigos
            </span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

