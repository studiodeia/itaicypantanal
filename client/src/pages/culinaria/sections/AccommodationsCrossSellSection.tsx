import { motion } from "framer-motion";
import { stagger, fadeIn, fadeUp, scaleIn, viewport } from "@/lib/motion";
import { ChevronRight } from "@/lib/icons";
import { OptimizedImage } from "@/components/OptimizedImage";
import type { CulinariaPageContent } from "@shared/cms-page-content";

type Props = { content: CulinariaPageContent["crossSell"] };

export const AccommodationsCrossSellSection = ({ content }: Props): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#fcf4ed]">
      <div className="flex flex-col lg:flex-row max-w-[1440px] items-center gap-8 md:gap-12 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Left: Image */}
        <motion.div
          className="w-full lg:flex-1 lg:max-w-[780px] h-[300px] md:h-[450px] lg:h-[672px] rounded-lg overflow-hidden"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <OptimizedImage
            src={content.image}
            alt="Acomodações Itaicy"
            className="w-full h-full object-cover"
            data-testid="img-crosssell-accommodation"
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          className="flex flex-col gap-6 md:gap-8 w-full lg:w-[480px] shrink-0 py-0 lg:py-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.span
            className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#446354] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]"
            data-testid="text-crosssell-label"
            variants={fadeIn}
          >
            ACOMODAÇÕES
          </motion.span>

          <motion.h2
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#263a30] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            data-testid="text-crosssell-heading"
            variants={fadeUp}
          >
            {content.heading}
          </motion.h2>

          <motion.p
            className="font-body-md font-[number:var(--body-md-font-weight)] text-[#446354] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]"
            variants={fadeUp}
          >
            {content.description}
          </motion.p>

          <motion.a
            href={content.buttonHref}
            className="flex items-center justify-between w-full py-4 border-b border-[#344e41] transition-all duration-300 group"
            data-testid="link-crosssell-acomodacoes"
            variants={fadeUp}
          >
            <span className="link-hover font-functional-md font-[number:var(--functional-md-font-weight)] text-[#263a30] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
              {content.buttonText}
            </span>
            <ChevronRight className="w-5 h-5 text-[#263a30] transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
