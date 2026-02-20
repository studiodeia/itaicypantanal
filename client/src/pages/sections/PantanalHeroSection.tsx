import { Card, CardContent } from "@/components/ui/card";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { NavHeader } from "@/components/NavHeader";
import { BookingDatePicker } from "@/components/BookingDatePicker";
import { ProgressiveVideo } from "@/components/ProgressiveVideo";
import { useSharedCmsSections } from "@/lib/cms/shared-content";
import { fadeUp, scaleIn, staggerSlow, viewport } from "@/lib/motion";

export const PantanalHeroSection = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { homeHero } = useSharedCmsSections();

  const handleMenuStateChange = useCallback((isOpen: boolean) => {
    setMenuOpen(isOpen);
  }, []);

  return (
    <section className="relative flex flex-col h-[844px] md:h-[680px] lg:h-[740px] items-center justify-end w-full z-[11] overflow-hidden">
      <ProgressiveVideo
        src="/hero-background.mp4"
        lowSrc="/hero-background.mp4"
        poster="/images/home/about-us.webp"
        startDelayMs={1000}
        preferLowOnSlowConnection
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-[filter,transform] duration-300 ${
          menuOpen ? "blur-[8px] scale-105" : ""
        }`}
        data-testid="video-hero-background"
      />

      <div
        className={`absolute inset-0 transition-all duration-300 ${
          menuOpen
            ? "z-[3] glass-overlay-hero"
            : "z-[1] bg-[linear-gradient(0deg,rgba(21,34,24,0.5)_0%,rgba(21,34,24,0)_100%),linear-gradient(180deg,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0)_100%),linear-gradient(0deg,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0.32)_100%)]"
        }`}
      />

      <NavHeader onMenuStateChange={handleMenuStateChange} />

      <div className="relative z-[2] flex flex-col lg:flex-row max-w-[1440px] items-end justify-end gap-[48px] lg:gap-[100px] px-5 md:px-8 lg:px-16 py-[48px] md:py-12 lg:py-[80px] w-full flex-1">
        <motion.div
          variants={staggerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-start justify-end gap-5 lg:gap-0 lg:min-h-[260px] lg:justify-between flex-1"
        >
          <motion.h1
            variants={fadeUp}
            className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] text-[#e3f7ec] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)] max-w-[592px] lg:max-w-none"
            data-testid="text-hero-heading"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            {homeHero.heading}
            {homeHero.headingAccent && (
              <span
                className="block text-[#d7a45d]"
              >
                {homeHero.headingAccent}
              </span>
            )}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-body-lg font-[400] text-[length:var(--body-lg-font-size)] leading-[var(--body-lg-line-height)] text-[#f2fcf7] tracking-[var(--body-lg-letter-spacing)] [font-style:var(--body-lg-font-style)] max-w-[592px]"
            data-testid="text-hero-subtitle"
          >
            {homeHero.subtitle}
          </motion.p>
        </motion.div>

        <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewport}>
          <Card
            className="w-full lg:w-[512px] bg-[rgba(10,19,12,0.65)] rounded-[12px] backdrop-blur-[2.0px] backdrop-brightness-[110%] [-webkit-backdrop-filter:blur(2.0px)_brightness(110%)] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] border-0"
            data-testid="card-booking"
          >
            <CardContent className="flex flex-col items-start gap-6 p-6 md:p-8">
              <div className="flex flex-col items-start gap-3 w-full">
                <h2
                  className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[#e3f7ec] text-[length:var(--heading-sm-font-size)] tracking-[var(--heading-sm-letter-spacing)] leading-[var(--heading-sm-line-height)] [font-style:var(--heading-sm-font-style)]"
                  data-testid="text-booking-heading"
                  style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
                >
                  {homeHero.bookingHeading}
                </h2>

                {/* Gold underline accent */}
                <div className="w-8 h-[2px] bg-[#ac8042]" />

                <p
                  className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]"
                  data-testid="text-booking-description"
                >
                  <span className="font-bold text-[#d7a45d]">{homeHero.bookingStep1Label}</span>{" "}
                  {homeHero.bookingDescription}
                </p>
              </div>

              <BookingDatePicker variant="hero" />

              {/* Disclaimer */}
              <p className="w-full text-center text-xs leading-4 text-[#9ca3af] [font-family:'Lato',sans-serif] font-normal">
                {homeHero.bookingDisclaimer}<br />
                {homeHero.bookingDisclaimerPrefix}{" "}
                <span className="font-bold">{homeHero.bookingDisclaimerHighlight}</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
