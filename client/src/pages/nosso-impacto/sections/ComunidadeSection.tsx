import { motion } from "framer-motion";
import { fadeIn, fadeUp, scaleIn, stagger, viewport } from "@/lib/motion";
import type { NossoImpactoPageContent } from "@shared/cms-page-content";

type Props = { content: NossoImpactoPageContent["comunidade"] };

export const ComunidadeSection = ({ content }: Props): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#344e41]">
      <div className="flex flex-col lg:flex-row max-w-[1440px] gap-12 lg:gap-[64px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full items-center">
        {/* Image — desaturated */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="w-full lg:w-1/2 h-[360px] md:h-[440px] lg:h-[560px] rounded-lg overflow-hidden bg-[#263a30]"
        >
          <img
            src={content.image}
            alt="Guia local do Pantanal"
            className="w-full h-full object-cover grayscale-[30%]"
            data-testid="img-comunidade"
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-6 md:gap-8 w-full lg:w-1/2"
        >
          <motion.span variants={fadeIn} className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#d7a45d] text-[length:var(--lead-md-font-size)] tracking-[3.84px] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)] uppercase">
            COMUNIDADE & RAÍZES
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            {content.heading}
          </motion.h2>

          {content.body.map((paragraph, i) => (
            <motion.p key={i} variants={fadeUp} className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              {paragraph}
            </motion.p>
          ))}

          <motion.div variants={fadeUp} className="flex flex-col gap-4 pt-4 border-t border-[#446354]">
            <div className="flex items-center gap-4">
              <span className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[#d7a45d] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] [font-style:var(--display-lg-font-style)]">
                100%
              </span>
              <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#a8cab9] text-[length:var(--functional-md-font-size)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
                Dos guias são moradores da região
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
