import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";

export const CulinaryManifestoSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#263a30]">
      <div className="flex flex-col max-w-[1440px] items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <motion.p
          className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[#e3f7ec] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]"
          style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          data-testid="text-culinary-manifesto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          A{" "}
          <span className="text-[#d7a45d]">alma do Pantanal</span>, a técnica
          do mundo. Ingredientes locais colhidos no dia,{" "}
          <span className="text-[#d7a45d]">técnicas de alta gastronomia</span>{" "}
          e o tempo que cada prato merece — uma cozinha autoral que honra a
          terra e surpreende o paladar.
        </motion.p>
      </div>
    </section>
  );
};
