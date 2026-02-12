import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export const ImpactEngagementSection = (): JSX.Element => {
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
          Faça parte deste legado.
        </motion.h2>

        <motion.a
          variants={fadeUp}
          href="#reservar"
          className="inline-flex items-center justify-center h-14 px-8 bg-[#ac8042] hover:bg-[#8f6a35] rounded-[6px] text-[#f2fcf7] font-['Lato',sans-serif] font-semibold text-base lg:text-lg whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]"
        >
          Reservar Minha Experiência Consciente
        </motion.a>
      </motion.div>
    </section>
  );
};
