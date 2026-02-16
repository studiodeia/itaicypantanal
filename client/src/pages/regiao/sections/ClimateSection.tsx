import { motion } from "framer-motion";
import { Sun, CloudRain, Droplets, Leaf } from "@/lib/icons";
import { fadeIn, fadeUp, stagger, cardItem, viewport } from "@/lib/motion";
import type { RegiaoPageContent } from "@shared/cms-page-content";

const seasonIcons = [Sun, Leaf, CloudRain, Droplets];

type Props = { content: RegiaoPageContent["climate"] };

export const ClimateSection = ({ content }: Props): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#f5f0eb]">
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
            <h2 className="lg:w-[664px] shrink-0 font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#152218] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]">
              {content.heading}
            </h2>
            <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#4a6741] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              {content.description}
            </p>
          </motion.div>
        </motion.div>

        {/* Season cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {content.seasons.map((season, index) => {
            const Icon = seasonIcons[index] ?? Sun;
            return (
              <motion.div
                key={index}
                variants={cardItem}
                className="flex flex-col gap-4 p-6 rounded-lg bg-white border border-[#e8ddd0]"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(172,128,66,0.1)]">
                  <Icon className="w-6 h-6 text-[#d7a45d]" strokeWidth={1.5} />
                </div>
                <h3 className="font-functional-lg font-[number:var(--functional-lg-font-weight)] text-[#152218] text-[length:var(--functional-lg-font-size)] tracking-[var(--functional-lg-letter-spacing)] leading-[var(--functional-lg-line-height)]">
                  {season.period}
                </h3>
                <div className="flex flex-col gap-1 text-[#4a6741]">
                  <span className="font-functional-sm text-[length:var(--functional-sm-font-size)]">
                    {season.temperature}
                  </span>
                  <span className="font-functional-sm text-[length:var(--functional-sm-font-size)] text-[#d7a45d]">
                    {season.rainfall}
                  </span>
                </div>
                <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[#4a6741] text-[length:var(--body-sm-font-size)] leading-[var(--body-sm-line-height)] tracking-[var(--body-sm-letter-spacing)]">
                  {season.characteristics}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
