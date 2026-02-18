import { motion } from "framer-motion";
import { fadeIn, fadeUp, scaleIn, stagger, cardItem, viewport } from "@/lib/motion";
import { NumberedFeatureItem } from "@/components/pantanal/cards/NumberedFeatureItem";
import type { HomePageContent } from "@shared/cms-page-content";

type Props = { content: HomePageContent["impact"] };

export const NaturalRefugeDescriptionSection = ({ content }: Props): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center w-full bg-pantanal-cream">
      <div className="flex flex-col lg:flex-row max-w-[1440px] items-center gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewport} className="w-full lg:flex-1 lg:max-w-[780px] h-[464px] md:min-h-[400px] lg:h-[816px] bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${content.image})` }} data-testid="img-impact" />

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[32px] py-8 lg:py-[32px] flex-1 w-full">
          <motion.p variants={fadeIn} className="font-lead-md font-[number:var(--lead-md-font-weight)] text-pantanal-darkText-secondary text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]" data-testid="text-impact-label">
            {content.label}
          </motion.p>

          <motion.h2 variants={fadeUp} className="self-stretch text-pantanal-darkText-primary font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)]" data-testid="text-impact-heading">
            {content.heading}
          </motion.h2>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[32px] self-stretch w-full">
            {content.items.map((item, index) => (
              <motion.div variants={cardItem} key={item.number}>
                <NumberedFeatureItem
                  number={item.number}
                  title={item.title}
                  description={item.description}
                  theme="light"
                  showBorder={index > 0}
                  data-testid={`text-impact-title-${item.number}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
