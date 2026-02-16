import { motion } from "framer-motion";
import { fadeUp, staggerSlow, viewport } from "@/lib/motion";
import type { CmsHero } from "@shared/cms-page-content";

type Props = { content: CmsHero };

export const RegiaoHeroSection = ({ content }: Props): JSX.Element => {
  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-[70vh] md:min-h-[80vh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.backgroundImage || "/images/regiao-hero-bg.webp"}
          alt="Pantanal Sul-Matogrossense"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#152218] via-[#152218]/60 to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        variants={staggerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="relative z-10 flex flex-col items-center text-center max-w-[900px] gap-6 px-5 md:px-8 lg:px-16 py-12 md:py-16"
      >
        <motion.span
          variants={fadeUp}
          className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#d7a45d] text-[length:var(--lead-md-font-size)] tracking-[3.84px] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)] uppercase"
        >
          {content.label}
        </motion.span>
        <motion.h1
          variants={fadeUp}
          className="font-heading-xl font-[number:var(--heading-xl-font-weight)] text-[#e3f7ec] text-[length:var(--heading-xl-font-size)] leading-[var(--heading-xl-line-height)] tracking-[var(--heading-xl-letter-spacing)] [font-style:var(--heading-xl-font-style)]"
        >
          {content.heading}
        </motion.h1>
        {content.subtitle && (
          <motion.p
            variants={fadeUp}
            className="font-body-lg font-[number:var(--body-lg-font-weight)] text-[#a8cab9] text-[length:var(--body-lg-font-size)] leading-[var(--body-lg-line-height)] tracking-[var(--body-lg-letter-spacing)] [font-style:var(--body-lg-font-style)] max-w-[720px]"
          >
            {content.subtitle}
          </motion.p>
        )}
      </motion.div>

      {/* Scroll hint */}
      {content.scrollHint && (
        <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2">
          <span className="font-functional-sm text-[#a8cab9] text-[length:var(--functional-sm-font-size)] tracking-widest uppercase">
            {content.scrollHint}
          </span>
          <div className="w-px h-8 bg-[#a8cab9]/40 animate-bounce" />
        </div>
      )}
    </section>
  );
};
