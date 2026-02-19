import { motion } from "framer-motion";
import { resolveIcon } from "@/lib/icon-resolver";
import { fadeIn, fadeUp, scaleIn, stagger, cardItem, viewport } from "@/lib/motion";
import { useLanguage } from "@/i18n/context";
import { t } from "@/i18n/ui-strings";
import type { NossoImpactoPageContent } from "@shared/cms-page-content";

type Props = { content: NossoImpactoPageContent["rioVivo"] };

export const RioVivoSection = ({ content }: Props): JSX.Element => {
  const { lang } = useLanguage();
  return (
    <section className="flex flex-col items-center w-full bg-[#344e41]">
      <div className="flex flex-col max-w-[1440px] gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Section header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-6 md:gap-8"
        >
          <motion.span variants={fadeIn} className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#d7a45d] text-[length:var(--lead-md-font-size)] tracking-[3.84px] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)] uppercase">
            {t("impact", "livingRiver", lang)}
          </motion.span>
          <motion.div variants={fadeUp} className="flex flex-col lg:flex-row gap-6 lg:gap-[100px] items-start lg:items-center">
            <h2
              className="lg:w-[664px] shrink-0 font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            >
              {content.heading}
            </h2>
            <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              {content.description}
            </p>
          </motion.div>
        </motion.div>

        {/* Content: Image + Cycle */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[64px] items-center">
          {/* Image */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="w-full lg:w-1/2 h-[320px] md:h-[400px] lg:h-[480px] rounded-lg overflow-hidden bg-[#263a30]"
          >
            <img
              src="/images/pesca-fish-4.webp"
              alt="Pesque e solte no Pantanal"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Cycle steps */}
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="grid grid-cols-2 gap-6"
            >
              {content.steps.map((step, index) => {
                const Icon = resolveIcon(step.iconName);
                return (
                  <motion.div
                    key={index}
                    variants={cardItem}
                    className="flex flex-col items-center gap-3 p-6 rounded-lg bg-[#263a30]"
                    data-testid={`cycle-step-${index}`}
                  >
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[rgba(172,128,66,0.15)]">
                      <Icon className="w-7 h-7 text-[#d7a45d]" strokeWidth={1.5} />
                    </div>
                    <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
                      {step.title}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Cycle connector text */}
            <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] leading-[var(--body-sm-line-height)] tracking-[var(--body-sm-letter-spacing)] [font-style:var(--body-sm-font-style)] text-center">
              {t("impact", "riverCycle", lang)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
