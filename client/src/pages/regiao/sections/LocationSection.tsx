import { motion } from "framer-motion";
import { MapPin } from "@/lib/icons";
import { fadeIn, fadeUp, stagger, viewport } from "@/lib/motion";
import type { RegiaoPageContent } from "@shared/cms-page-content";

type Props = { content: RegiaoPageContent["location"] };

export const LocationSection = ({ content }: Props): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#f5f0eb]">
      <div className="flex flex-col max-w-[1440px] gap-12 md:gap-16 px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-6 md:gap-8"
        >
          <motion.span
            variants={fadeIn}
            className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#d7a45d] text-[length:var(--lead-md-font-size)] tracking-[3.84px] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)] uppercase"
          >
            {content.label}
          </motion.span>
          <motion.div
            variants={fadeUp}
            className="flex flex-col lg:flex-row gap-6 lg:gap-[100px] items-start"
          >
            <h2 className="lg:w-[664px] shrink-0 font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#152218] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]">
              {content.heading}
            </h2>
            <div className="flex flex-col gap-4">
              <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#4a6741] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
                {content.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-5 h-5 text-[#d7a45d]" strokeWidth={1.5} />
                <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#344e41] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)]">
                  {content.coordinates}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
