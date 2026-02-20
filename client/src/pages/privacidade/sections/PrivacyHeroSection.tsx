import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { NavHeader } from "@/components/NavHeader";
import { fadeUp, viewport } from "@/lib/motion";
import { useLanguage } from "@/i18n/context";
import { t } from "@/i18n/ui-strings";
import type { PrivacidadePageContent } from "@shared/cms-page-content";

type Props = { content: PrivacidadePageContent["hero"] };

export const PrivacyHeroSection = ({ content }: Props): JSX.Element => {
  const { lang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuStateChange = useCallback((isOpen: boolean) => {
    setMenuOpen(isOpen);
  }, []);

  return (
    <section className="relative flex flex-col h-[480px] md:h-[480px] lg:h-[592px] items-center justify-end w-full z-[11] overflow-hidden bg-pantanal-dark-secondary">
      {/* Menu overlay */}
      {menuOpen && (
        <div className="absolute inset-0 z-[3] glass-overlay-hero transition-all duration-300" />
      )}

      {/* Navigation */}
      <NavHeader onMenuStateChange={handleMenuStateChange} />

      {/* Hero content - pushed to bottom */}
      <div className="relative z-[2] flex flex-col max-w-[1440px] items-start justify-end gap-8 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full flex-1">
        <motion.h1
          className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] text-pantanal-light-primary tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]"
          style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {content.title}
        </motion.h1>

        <motion.p
          className="font-body-md font-[number:var(--body-md-font-weight)] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] text-pantanal-light-primary tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {t("privacy", "lastUpdated", lang)} {content.lastUpdated}
        </motion.p>
      </div>
    </section>
  );
};
