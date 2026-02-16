import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import type { CmsManifesto } from "@shared/cms-page-content";

type Props = { content: CmsManifesto };

export const EcoManifestoSection = ({ content }: Props): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#263a30]">
      <motion.div
        className="flex flex-col max-w-[1440px] items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.p
          className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[#e3f7ec] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]"
          style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          variants={fadeUp}
        >
          {content.segments.map((seg, i) =>
            seg.isHighlight ? (
              <span key={i} className="text-[#d7a45d]">
                {seg.text}
              </span>
            ) : (
              seg.text
            )
          )}
        </motion.p>
      </motion.div>
    </section>
  );
};
