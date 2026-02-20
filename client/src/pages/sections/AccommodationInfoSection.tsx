import { motion } from "framer-motion";
import { Link } from "wouter";
import { goToCloudbedsBooking } from "@/lib/booking/cloudbeds";
import { GoldButton } from "@/components/pantanal/buttons/GoldButton";
import { OutlineButton } from "@/components/pantanal/buttons/OutlineButton";
import { fadeIn, fadeUp, stagger, viewport } from "@/lib/motion";
import { useLanguage } from "@/i18n/context";
import type { HomePageContent } from "@shared/cms-page-content";

type Props = { content: HomePageContent["accommodation"] };

export const AccommodationInfoSection = ({ content }: Props): JSX.Element => {
  const { lang } = useLanguage();
  return (
    <section className="relative z-[6] flex flex-col items-center w-full min-h-[868px] md:min-h-[800px] lg:h-[1000px] overflow-hidden">
      {/* Background — full-bleed image, gradient darkens left for text readability */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${content.backgroundImage})`,
        }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(21,34,24,0.82) 0%, rgba(21,34,24,0.82) 45%, rgba(21,34,24,0.15) 75%, rgba(21,34,24,0) 100%)" }} />

      <div className="relative flex max-w-[1440px] mx-auto items-center gap-8 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full h-full">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="flex-1 flex flex-col items-start gap-6 md:gap-8 lg:gap-[32px]">
          <motion.p variants={fadeIn} className="w-fit font-lead-md font-[number:var(--lead-md-font-weight)] text-[#e3f7ec] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]" data-testid="text-accommodations-label">
            {content.label}
          </motion.p>

          <motion.h2 variants={fadeUp} className="max-w-[582px] text-[#e3f7ec] font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)]" data-testid="text-accommodations-heading">
            {content.heading}
          </motion.h2>

          <motion.p variants={fadeUp} className="font-body-lg font-[number:var(--body-lg-font-weight)] text-[#e3f7ec] text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] [font-style:var(--body-lg-font-style)]">
            {content.body}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 lg:gap-[32px]">
            <GoldButton
              className="h-auto lg:h-[56px] text-functional-lg px-5 md:px-6 lg:px-[24px] py-2.5 md:py-3 lg:py-[12px]"
              data-testid="button-reservar-accommodations"
              onClick={() =>
                goToCloudbedsBooking({
                  locale: lang,
                  utmContent: "accommodations_section_reservar",
                })
              }
            >
              {content.buttonReserve}
            </GoldButton>

            <OutlineButton
              className="h-auto lg:h-[56px] px-5 md:px-6 lg:px-[24px] py-2.5 md:py-3 lg:py-[12px]"
              data-testid="button-accommodations-details"
              asChild
            >
              <Link href="/acomodacoes">{content.buttonDetails}</Link>
            </OutlineButton>
          </motion.div>
        </motion.div>

        {/* Right image panel — visible only on desktop, rounded-[8px] as per Figma */}
        <div className="hidden lg:block w-[630px] shrink-0 self-stretch rounded-[8px] overflow-hidden">
          <img
            src={content.backgroundImage}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};
