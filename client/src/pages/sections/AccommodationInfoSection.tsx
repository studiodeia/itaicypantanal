import { motion } from "framer-motion";
import { goToCloudbedsBooking } from "@/lib/booking/cloudbeds";
import { GoldButton } from "@/components/pantanal/buttons/GoldButton";
import { OutlineButton } from "@/components/pantanal/buttons/OutlineButton";
import { fadeIn, fadeUp, stagger, viewport } from "@/lib/motion";
import type { HomePageContent } from "@shared/cms-page-content";

type Props = { content: HomePageContent["accommodation"] };

export const AccommodationInfoSection = ({ content }: Props): JSX.Element => {
  return (
    <section
      className="h-[868px] md:min-h-[600px] md:h-auto lg:h-[740px] items-start justify-end md:justify-center z-[6] bg-cover bg-center flex flex-col w-full"
      style={{
        backgroundImage: `linear-gradient(270deg, rgba(21,34,24,0) 0%, rgba(21,34,24,0.64) 100%), linear-gradient(0deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.32) 100%), url(${content.backgroundImage})`,
      }}
    >
      <div className="flex max-w-[1440px] mx-auto items-center gap-8 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="flex-1 flex flex-col items-start gap-6 md:gap-8 lg:gap-[32px]">
          <motion.p variants={fadeIn} className="w-fit font-lead-md font-[number:var(--lead-md-font-weight)] text-pantanal-light-primary text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]" data-testid="text-accommodations-label">
            {content.label}
          </motion.p>

          <motion.h2 variants={fadeUp} className="max-w-[582px] text-pantanal-light-primary font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)]" data-testid="text-accommodations-heading">
            {content.heading}
          </motion.h2>

          <motion.p variants={fadeUp} className="font-body-lg font-[number:var(--body-lg-font-weight)] text-pantanal-light-primary text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] [font-style:var(--body-lg-font-style)]">
            {content.body}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 lg:gap-[32px]">
            <GoldButton
              buttonSize="lg"
              data-testid="button-reservar-accommodations"
              onClick={() =>
                goToCloudbedsBooking({
                  utmContent: "accommodations_section_reservar",
                })
              }
            >
              {content.buttonReserve}
            </GoldButton>

            <OutlineButton data-testid="button-accommodations-details">
              {content.buttonDetails}
            </OutlineButton>
          </motion.div>
        </motion.div>

        <div className="hidden lg:block w-[630px] h-full rounded-lg" />
      </div>
    </section>
  );
};
