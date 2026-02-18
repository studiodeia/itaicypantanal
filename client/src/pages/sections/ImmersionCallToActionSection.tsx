import { motion } from "framer-motion";
import { BookingDatePicker } from "@/components/BookingDatePicker";
import { useSharedCmsSections } from "@/lib/cms/shared-content";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export const ImmersionCallToActionSection = (): JSX.Element => {
  const { immersionCta } = useSharedCmsSections();

  return (
    <section
      className="items-center flex-[0_0_auto] z-[1] flex flex-col relative w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), url("${immersionCta.backgroundImage}")`,
      }}
    >
      <div className="flex flex-col max-w-[1440px] h-[844px] md:min-h-[800px] md:h-auto lg:h-[1000px] items-start justify-between px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] relative w-full">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-full md:max-w-[520px] lg:max-w-[684px] text-[#e3f7ec] relative font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)]"
          data-testid="text-cta-heading"
        >
          {immersionCta.heading}
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col w-full md:max-w-[520px] lg:max-w-[592px] items-start gap-8 md:gap-10 lg:gap-[48px] relative mt-8 md:mt-0"
        >
          <motion.p
            variants={fadeUp}
            className="relative self-stretch font-body-lg font-[number:var(--body-lg-font-weight)] text-[#e3f7ec] text-[20px] md:text-[length:var(--body-lg-font-size)] leading-[1.5] md:leading-[var(--body-lg-line-height)] tracking-[var(--body-lg-letter-spacing)] [font-style:var(--body-lg-font-style)]"
          >
            {immersionCta.description}
          </motion.p>

          <motion.div variants={fadeUp}>
            <BookingDatePicker variant="cta" className="self-stretch" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

