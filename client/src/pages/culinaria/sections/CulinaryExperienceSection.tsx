import { motion } from "framer-motion";
import { stagger, fadeIn, fadeUp, viewport } from "@/lib/motion";
import { Divider } from "@/components/Divider";
import { OptimizedImage } from "@/components/OptimizedImage";
import type { CulinariaPageContent } from "@shared/cms-page-content";

const experienceImages = [
  { src: "/images/culinaria-experience-1", alt: "Experiência gastronômica 1" },
  { src: "/images/culinaria-experience-2", alt: "Experiência gastronômica 2" },
  { src: "/images/culinaria-experience-3", alt: "Experiência gastronômica 3" },
  { src: "/images/culinaria-experience-4", alt: "Experiência gastronômica 4" },
];

type Props = { content: CulinariaPageContent["experience"] };

export const CulinaryExperienceSection = ({ content }: Props): JSX.Element => {
  return (
    <section
      className="relative flex flex-col items-center w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          `linear-gradient(180deg, rgba(21,34,24,0) 36.3%, rgba(21,34,24,0.64) 73.3%), linear-gradient(0deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.32) 100%), url("${content.image}")`,
      }}
    >
      <div className="flex flex-col lg:flex-row max-w-[1440px] items-end gap-8 md:gap-12 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full min-h-[600px] md:min-h-[800px] lg:min-h-[1000px]">
        {/* Left: text content */}
        <motion.div
          className="flex flex-col flex-1 items-start gap-6 md:gap-8 text-[#e3f7ec]"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.span
            className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]"
            data-testid="text-experience-label"
            variants={fadeIn}
          >
            EXPERIÊNCIA
          </motion.span>

          <motion.h2
            className="max-w-[582px] font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            data-testid="text-experience-heading"
            variants={fadeUp}
          >
            {content.heading}
          </motion.h2>

          {content.body.map((paragraph, i) => (
            <motion.p
              key={i}
              className="font-body-md font-[number:var(--body-md-font-weight)] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]"
              variants={fadeUp}
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        {/* Right: image grid + divider */}
        <motion.div
          className="flex flex-col gap-8 w-full lg:w-[630px] shrink-0"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="flex gap-8 md:gap-6 lg:gap-[32px]">
            {experienceImages.map((img, idx) => (
              <div
                key={idx}
                className="flex-1 h-[80px] md:h-[100px] lg:h-[133px] rounded-lg overflow-hidden"
              >
                <OptimizedImage
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <Divider theme="dark" />
        </motion.div>
      </div>
    </section>
  );
};
