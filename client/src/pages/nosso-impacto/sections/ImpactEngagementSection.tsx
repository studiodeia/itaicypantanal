import { motion } from "framer-motion";
import { buildCloudbedsBookingUrl } from "@/lib/booking/cloudbeds";
import { goldButtonClass } from "@/components/pantanal/buttons/GoldButton";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { useLanguage } from "@/i18n/context";
import type { NossoImpactoPageContent } from "@shared/cms-page-content";

type Props = { content: NossoImpactoPageContent["engagement"] };

export const ImpactEngagementSection = ({ content }: Props): JSX.Element => {
  const { lang } = useLanguage();
  return (
    <section className="flex flex-col items-center w-full bg-[#152218]">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="flex flex-col max-w-[1440px] items-center justify-center gap-10 md:gap-12 lg:gap-16 px-5 md:px-8 lg:px-16 py-16 md:py-24 lg:py-[140px] w-full text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="font-heading-xl font-[number:var(--heading-xl-font-weight)] text-[#e3f7ec] text-[length:var(--heading-xl-font-size)] leading-[var(--heading-xl-line-height)] tracking-[var(--heading-xl-letter-spacing)] [font-style:var(--heading-xl-font-style)] max-w-[800px]"
          style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
        >
          {content.heading}
        </motion.h2>

        <motion.a
          variants={fadeUp}
          href={buildCloudbedsBookingUrl({
            locale: lang,
            utmContent: "impacto_section_reservar_experiencia",
          })}
          className={goldButtonClass}
        >
          {content.buttonText}
        </motion.a>
      </motion.div>
    </section>
  );
};
