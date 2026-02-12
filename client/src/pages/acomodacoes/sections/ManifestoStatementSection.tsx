import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";

export const ManifestoStatementSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#263a30]">
      <div className="flex flex-col max-w-[1440px] items-start px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <motion.p
          className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[#e3f7ec] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]"
          style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          data-testid="text-manifesto-statement"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          Nossos apartamentos são projetados para o{" "}
          <span className="text-[#d7a45d]">conforto essencial</span>,
          garantindo que você tenha o{" "}
          <span className="text-[#d7a45d]">refúgio perfeito</span> após um dia
          de expedição.
        </motion.p>
      </div>
    </section>
  );
};
