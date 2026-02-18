import { motion } from "framer-motion";
import { fadeIn, fadeUp, scaleIn, stagger, cardItem, viewport } from "@/lib/motion";
import { NumberedFeatureItem } from "@/components/pantanal/cards/NumberedFeatureItem";
import type { HomePageContent } from "@shared/cms-page-content";

type Props = { content: HomePageContent["aboutUs"] };

export const AuthenticRestSection = ({ content }: Props): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center w-full bg-pantanal-dark-secondary">
      <div className="flex flex-col lg:flex-row max-w-[1440px] items-center gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewport} className="w-full lg:flex-1 lg:max-w-[780px] h-[464px] md:min-h-[400px] md:h-auto lg:h-[816px] rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${content.image})` }} data-testid="img-about-us" />

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[32px] py-0 lg:py-[32px] flex-1 w-full">
          <motion.p variants={fadeIn} className="font-lead-md font-[number:var(--lead-md-font-weight)] text-pantanal-light-muted text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]" data-testid="text-about-label">
            {content.label}
          </motion.p>

          <motion.h2 variants={fadeUp} className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-pantanal-light-primary text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)]" data-testid="text-about-heading">
            {content.heading}
          </motion.h2>

          <motion.div variants={fadeUp} className="flex flex-col items-start gap-4 md:gap-6 w-full">
            {content.body.map((paragraph, i) => (
              <p key={i} className="font-body-md font-[number:var(--body-md-font-weight)] text-pantanal-light-muted text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-0 md:gap-0 lg:gap-[32px] w-full">
            {(content.features ?? []).map((feature, index) => (
              <motion.div variants={cardItem} key={feature.number}>
                <NumberedFeatureItem
                  number={feature.number}
                  title={feature.title}
                  description={feature.description}
                  theme="dark"
                  showBorder={index > 0}
                  data-testid={`text-feature-title-${feature.number}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
