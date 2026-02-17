import { motion } from "framer-motion";
import { Link } from "wouter";
import { goToCloudbedsBooking } from "@/lib/booking/cloudbeds";
import { BackgroundImageSection } from "@/components/pantanal/layout/BackgroundImageSection";
import { LeadText } from "@/components/pantanal/typography/LeadText";
import { HeadingLarge } from "@/components/pantanal/typography/HeadingLarge";
import { BodyText } from "@/components/pantanal/typography/BodyText";
import { GoldButton } from "@/components/pantanal/buttons/GoldButton";
import { OutlineButton } from "@/components/pantanal/buttons/OutlineButton";
import { fadeIn, fadeUp, stagger, viewport } from "@/lib/motion";
import type { HomePageContent } from "@shared/cms-page-content";

type Props = { content: HomePageContent["accommodation"] };

export const AccommodationInfoSection = ({ content }: Props): JSX.Element => {
  return (
    <BackgroundImageSection backgroundImage={content.backgroundImage}>
      <div className="flex max-w-[1440px] mx-auto items-center gap-8 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex-1 flex flex-col items-start gap-6 md:gap-8 lg:gap-8"
        >
          <motion.div variants={fadeIn}>
            <LeadText data-testid="text-accommodations-label">
              {content.label}
            </LeadText>
          </motion.div>

          <motion.div variants={fadeUp}>
            <HeadingLarge className="max-w-[582px]" data-testid="text-accommodations-heading">
              {content.heading}
            </HeadingLarge>
          </motion.div>

          <motion.div variants={fadeUp}>
            <BodyText size="lg" variant="primary">
              {content.body}
            </BodyText>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 lg:gap-8">
            <GoldButton
              data-testid="button-reservar-accommodations"
              onClick={() =>
                goToCloudbedsBooking({
                  utmContent: "accommodations_section_reservar",
                })
              }
            >
              {content.buttonReserve}
            </GoldButton>

            <Link href="/acomodacoes">
              <OutlineButton data-testid="button-accommodations-details">
                {content.buttonDetails}
              </OutlineButton>
            </Link>
          </motion.div>
        </motion.div>

        <div className="hidden lg:block w-[630px] h-full" aria-hidden="true" />
      </div>
    </BackgroundImageSection>
  );
};
