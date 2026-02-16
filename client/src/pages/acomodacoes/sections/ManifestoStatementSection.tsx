import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";
import type { CmsManifesto } from "@shared/cms-page-content";

type Props = { content: CmsManifesto };

export const ManifestoStatementSection = ({ content }: Props): JSX.Element => {
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
      </div>
    </section>
  );
};
