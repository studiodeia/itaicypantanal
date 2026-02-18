import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { NavHeader } from "@/components/NavHeader";
import type { BlogArticleDetail } from "../data";
import { staggerSlow, fadeIn, fadeUp, viewport } from "@/lib/motion";

interface ArticleHeroSectionProps {
  article: BlogArticleDetail;
}

export const ArticleHeroSection = ({
  article,
}: ArticleHeroSectionProps): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuStateChange = useCallback((isOpen: boolean) => {
    setMenuOpen(isOpen);
  }, []);

  return (
    <section className="relative flex flex-col h-[844px] md:h-[680px] lg:h-[1000px] items-center justify-end w-full z-[11] overflow-hidden">
      {/* Background image (heroImage) */}
      <img
        src={`${article.heroImage}.webp`}
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
        className="relative z-[2] flex flex-col max-w-[1440px] items-start justify-end gap-8 px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full flex-1"
        variants={staggerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {/* Tag + Title + Description */}
        <div className="flex flex-col gap-8 max-w-[1000px] overflow-hidden w-full">
          {/* Tag */}
          <motion.span className="bg-[rgba(10,19,12,0.4)] text-[#f2fcf7] px-3 py-1 rounded-full self-start font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]" variants={fadeIn}>
            {article.tag}
          </motion.span>

          {/* Title */}
          <motion.h1
            className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] text-[#e3f7ec] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            variants={fadeUp}
          >
            {article.title}
          </motion.h1>

          {/* Description */}
          {article.description && (
            <motion.p className="max-w-[600px] font-body-md font-[number:var(--body-md-font-weight)] text-[#e3f7ec] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]" variants={fadeUp}>
              {article.description}
            </motion.p>
          )}
        </div>

        {/* Author info row */}
        <motion.div className="flex flex-wrap items-center gap-4 lg:gap-8" variants={fadeUp}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#446354] overflow-hidden shrink-0" />
            <span className="font-body-md font-[number:var(--body-md-font-weight)] text-[#e3f7ec] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              {article.author}
            </span>
          </div>
          <span className="font-body-md font-[number:var(--body-md-font-weight)] text-[#cfebdd] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)]">
            {article.date}
          </span>
          <span className="font-body-md font-[number:var(--body-md-font-weight)] text-[#cfebdd] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)]">
            {article.readingTime}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};
