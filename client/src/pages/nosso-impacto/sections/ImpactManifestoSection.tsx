import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export const ImpactManifestoSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#263a30]">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="flex flex-col max-w-[1440px] items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full"
      >
        <motion.p
          variants={fadeUp}
          className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[#e3f7ec] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]"
          style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          data-testid="text-impact-manifesto"
        >
          Cada hóspede que chega à Itaicy se torna parte de algo maior:{" "}
          <span className="text-[#d7a45d]">guardiões de um ecossistema</span>{" "}
          que sustenta milhares de espécies. Sua estadia não é apenas uma
          viagem — é um ato de{" "}
          <span className="text-[#d7a45d]">preservação</span>.
        </motion.p>
      </motion.div>
    </section>
  );
};
