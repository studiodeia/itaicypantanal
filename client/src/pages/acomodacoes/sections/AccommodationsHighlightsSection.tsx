import { motion } from "framer-motion";
import { resolveIcon } from "@/lib/icon-resolver";
import { fadeUp, stagger, cardItem, viewport } from "@/lib/motion";
import type { CmsHighlights } from "@shared/cms-page-content";

type Props = { content: CmsHighlights };

export const AccommodationsHighlightsSection = ({ content }: Props): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-pantanal-dark-primary">
      <div className="flex flex-col max-w-[1440px] items-center gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Title — centered */}
        <motion.h2
          className="text-center font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
          data-testid="text-highlights-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {content.heading}
        </motion.h2>

        {/* Cards — flex-wrap, gap 32px */}
        <motion.div
          className="flex flex-wrap gap-4 md:gap-6 lg:gap-[32px] w-full"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {content.items.map((item, index) => {
            const Icon = resolveIcon(item.iconName);
            return (
              <motion.div
                key={index}
                className="flex flex-col items-start justify-between w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] h-auto md:h-[260px] lg:h-[272px] bg-[#263a30] rounded-lg p-6 md:p-7 lg:p-[32px]"
                data-testid={`card-highlight-${index}`}
                variants={cardItem}
              >
                <Icon className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 text-[#e3f7ec]" strokeWidth={1.5} />

                <div className="flex flex-col gap-2 mt-4 md:mt-0">
                  <h3 className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[#e3f7ec] text-[length:var(--heading-sm-font-size)] tracking-[var(--heading-sm-letter-spacing)] leading-[var(--heading-sm-line-height)] [font-style:var(--heading-sm-font-style)]">
                    {item.title}
                  </h3>

                  <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
