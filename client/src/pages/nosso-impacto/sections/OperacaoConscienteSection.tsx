import { motion } from "framer-motion";
import { resolveIcon } from "@/lib/icon-resolver";
import { fadeIn, fadeUp, stagger, cardItem, viewport } from "@/lib/motion";
import { useLanguage } from "@/i18n/context";
import { t } from "@/i18n/ui-strings";
import type { NossoImpactoPageContent } from "@shared/cms-page-content";

type Props = { content: NossoImpactoPageContent["operacao"] };

export const OperacaoConscienteSection = ({ content }: Props): JSX.Element => {
  const { lang } = useLanguage();
  return (
    <section className="flex flex-col items-center w-full bg-[#263a30]">
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
            {t("impact", "consciousOperation", lang)}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)] max-w-[664px]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            {content.heading}
          </motion.h2>
        </motion.div>

        {/* Practice cards grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[32px]"
        >
          {content.practices.map((practice, index) => {
            const Icon = resolveIcon(practice.iconName);
            return (
              <motion.div
                key={index}
                variants={cardItem}
                className="flex flex-col items-start gap-5 p-8 rounded-lg bg-[#344e41]"
                data-testid={`practice-${index}`}
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[rgba(172,128,66,0.15)]">
                  <Icon
                    className="w-7 h-7 text-[#d7a45d]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3
                  className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[#e3f7ec] text-[length:var(--heading-sm-font-size)] tracking-[var(--heading-sm-letter-spacing)] leading-[var(--heading-sm-line-height)] [font-style:var(--heading-sm-font-style)]"
                  style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
                >
                  {practice.title}
                </h3>
                <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
                  {practice.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
