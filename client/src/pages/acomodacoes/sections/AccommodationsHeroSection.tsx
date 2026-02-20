import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "@/lib/icons";
import { NavHeader } from "@/components/NavHeader";
import { ProgressiveVideo } from "@/components/ProgressiveVideo";
import { Divider } from "@/components/Divider";
import { fadeIn, fadeUp, staggerSlow, viewport } from "@/lib/motion";
import { useLanguage } from "@/i18n/context";
import { t } from "@/i18n/ui-strings";
import type { CmsHero } from "@shared/cms-page-content";

type Props = { content: CmsHero };

export const AccommodationsHeroSection = ({ content }: Props): JSX.Element => {
  const { lang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuStateChange = useCallback((isOpen: boolean) => {
    setMenuOpen(isOpen);
  }, []);

  return (
    <section className="relative flex flex-col h-[844px] md:h-[680px] lg:h-[920px] items-center justify-end w-full z-[11] overflow-hidden">
      <ProgressiveVideo
        src={content.videoMp4 ?? "/Vídeo_Pronto_e_Suave.mp4"}
        lowSrc={content.videoMp4Low ?? "/video-pronto-suave-low.mp4"}
        webmSrc={content.videoWebm ?? "/video-pronto-suave.webm"}
        lowWebmSrc={content.videoWebmLow ?? "/video-pronto-suave-low.webm"}
        poster={content.videoPoster ?? "/images/acomodacoes/suite-explorer.webp"}
        startDelayMs={800}
        preferLowOnSlowConnection
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-[filter,transform] duration-300 ${
          menuOpen ? "blur-[8px] scale-105" : ""
        }`}
        data-testid="video-accommodations-hero-background"
      />

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
                  "linear-gradient(0deg, rgba(21,34,24,0.6) 0%, rgba(21,34,24,0.2) 40%, rgba(21,34,24,0) 60%), linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 30%), linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%)",
              }
            : undefined
        }
      />

      <NavHeader onMenuStateChange={handleMenuStateChange} />

      <motion.div
        className="relative z-[2] flex flex-col max-w-[1440px] items-start justify-end gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full flex-1"
        variants={staggerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <div className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[100px] w-full">
          <motion.span
            className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]"
            data-testid="text-accommodations-label"
            variants={fadeIn}
          >
            {content.label}
          </motion.span>

          <motion.h1
            className="max-w-[600px] font-display-lg font-[number:var(--display-lg-font-weight)] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] text-[#e3f7ec] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            data-testid="text-accommodations-hero-heading"
            variants={fadeUp}
          >
            {content.heading}
          </motion.h1>
        </div>

        <motion.div className="flex flex-col gap-6 md:gap-8 w-full" variants={fadeUp}>
          <Divider theme="dark" />
          <div className="flex items-start justify-between w-full">
            <p
              className="max-w-[400px] font-body-md font-[number:var(--body-md-font-weight)] text-[#e3f7ec] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]"
              data-testid="text-accommodations-subtitle"
            >
              {content.subtitle}
            </p>

            <div className="hidden md:flex items-center gap-2 text-[#a8cab9]">
              <span className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)] whitespace-nowrap">
                {content.scrollHint ?? t("common", "scrollDown", lang)}
              </span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
