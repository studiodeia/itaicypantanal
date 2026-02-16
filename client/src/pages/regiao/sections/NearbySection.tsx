import { motion } from "framer-motion";
import { Navigation } from "@/lib/icons";
import { fadeIn, fadeUp, stagger, cardItem, viewport } from "@/lib/motion";
import type { RegiaoPageContent } from "@shared/cms-page-content";

type Props = { content: RegiaoPageContent["nearby"] };

export const NearbySection = ({ content }: Props): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#344e41]">
      <div className="flex flex-col max-w-[1440px] gap-12 md:gap-16 px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Header */}
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
            <h2 className="lg:w-[664px] shrink-0 font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]">
              {content.heading}
            </h2>
            <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              {content.description}
            </p>
          </motion.div>
        </motion.div>

        {/* Place cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {content.places.map((place, index) => (
            <motion.div
              key={index}
              variants={cardItem}
              className="flex flex-col gap-4 p-8 rounded-lg bg-[#263a30]"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(172,128,66,0.15)]">
                  <Navigation className="w-5 h-5 text-[#d7a45d]" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="font-functional-lg font-[number:var(--functional-lg-font-weight)] text-[#e3f7ec] text-[length:var(--functional-lg-font-size)] tracking-[var(--functional-lg-letter-spacing)] leading-[var(--functional-lg-line-height)]">
                    {place.name}
                  </span>
                  <span className="font-functional-sm text-[#d7a45d] text-[length:var(--functional-sm-font-size)]">
                    {place.distance}
                  </span>
                </div>
              </div>
              <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] leading-[var(--body-sm-line-height)] tracking-[var(--body-sm-letter-spacing)] [font-style:var(--body-sm-font-style)]">
                {place.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
