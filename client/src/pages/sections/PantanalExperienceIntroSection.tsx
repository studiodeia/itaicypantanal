import { motion } from "framer-motion";
import { ChevronRightIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { useSharedCmsSections } from "@/lib/cms/shared-content";
import { fadeIn, fadeUp, stagger, viewport } from "@/lib/motion";

export const PantanalExperienceIntroSection = (): JSX.Element => {
  const { homeManifesto } = useSharedCmsSections();

  return (
    <section className="flex flex-col items-center justify-center bg-[#263a30] w-full relative z-10">
      <div className="flex flex-col max-w-[1440px] items-center px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[32px] w-full"
        >
          <motion.p
            variants={fadeIn}
            className="w-full font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]"
            data-testid="text-manifesto-label"
          >
            {homeManifesto.label}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="w-full text-left [font-family:'Playfair_Display',Helvetica] font-normal text-[length:var(--display-lg-font-size)] tracking-[0] leading-[var(--display-lg-line-height)]"
            data-testid="text-manifesto-heading"
          >
            {homeManifesto.segments.map((segment, index) => (
              <span
                key={index}
                className="font-[number:var(--display-lg-font-weight)] leading-[var(--display-lg-line-height)] font-display-lg [font-style:var(--display-lg-font-style)] tracking-[var(--display-lg-letter-spacing)] text-[length:var(--display-lg-font-size)]"
                style={{ color: segment.color }}
              >
                {segment.text}
              </span>
            ))}
          </motion.h2>

          <Button
            variant="ghost"
            className="hidden items-center justify-between gap-4 px-0 py-3 md:py-4 w-full h-auto border-b border-solid border-[#f2fcf7] rounded-none"
            data-testid="button-manifesto-details"
          >
            <span className="hidden flex-1 text-left font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
              {homeManifesto.detailsButtonLabel}
            </span>
            <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 text-[#e3f7ec]" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};


