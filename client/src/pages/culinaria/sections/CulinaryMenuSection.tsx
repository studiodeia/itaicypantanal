import { useState } from "react";
import { motion } from "framer-motion";
import { stagger, fadeIn, fadeUp, viewport } from "@/lib/motion";
import { ChevronRight } from "@/lib/icons";
import { OptimizedImage } from "@/components/OptimizedImage";
import { buildCloudbedsBookingUrl } from "@/lib/booking/cloudbeds";
import { useLanguage } from "@/i18n/context";
import type { CmsSobreNos } from "@shared/cms-page-content";

const menuImages = [
  { src: "/images/culinaria-menu-1", tag: "Termo para dar vontade" },
  { src: "/images/culinaria-menu-2" },
  { src: "/images/culinaria-menu-3" },
  { src: "/images/culinaria-menu-4" },
  { src: "/images/culinaria-menu-5" },
  { src: "/images/culinaria-menu-6" },
  { src: "/images/culinaria-menu-7" },
  { src: "/images/culinaria-menu-8" },
];

type Props = { content: CmsSobreNos; buttonText?: string };

export const CulinaryMenuSection = ({ content, buttonText }: Props): JSX.Element => {
  const { lang } = useLanguage();
  const tabs = (content.features ?? []).map((f) => ({
    id: f.title.toLowerCase(),
    label: `${f.number} ${f.title}`,
  }));
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "carnes");

  return (
    <section className="flex flex-col items-center w-full bg-[#263a30]">
      <div className="flex flex-col max-w-[1440px] gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Section Header — split layout */}
        <motion.div
          className="flex flex-col gap-6 md:gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.span
            className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]"
            data-testid="text-menu-label"
            variants={fadeIn}
          >
            {content.label}
          </motion.span>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-[100px] items-start lg:items-center">
            <motion.h2
              className="lg:w-[664px] shrink-0 font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
              data-testid="text-menu-heading"
              variants={fadeUp}
            >
              {content.heading}
            </motion.h2>
            {content.body.map((paragraph, i) => (
              <motion.p
                key={i}
                className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]"
                variants={fadeUp}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Tab navigation */}
        <div className="flex border-b border-[#446354] overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[160px] px-6 md:px-8 py-6 md:py-8 text-left font-functional-lg font-[number:var(--functional-lg-font-weight)] text-[length:var(--functional-lg-font-size)] leading-[var(--functional-lg-line-height)] tracking-[var(--functional-lg-letter-spacing)] [font-style:var(--functional-lg-font-style)] transition-colors duration-200 ${
                activeTab === tab.id
                  ? "text-[#e3f7ec] border-b-[3px] border-[#f2fcf7]"
                  : "text-[#a8cab9]"
              }`}
              data-testid={`tab-menu-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Image grid — 4x2 */}
        <div className="flex flex-col gap-8 md:gap-6 lg:gap-[32px]">
          {/* Row 1 */}
          <div className="flex gap-8 md:gap-6 lg:gap-[32px] h-[200px] md:h-[260px] lg:h-[316px] overflow-x-auto lg:overflow-visible scrollbar-hide">
            {menuImages.slice(0, 4).map((img, idx) => (
              <div
                key={idx}
                className="relative flex-shrink-0 w-[85%] md:w-[45%] lg:w-auto lg:flex-1 h-full rounded-lg overflow-hidden"
              >
                <OptimizedImage
                  src={img.src}
                  alt={`Prato ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {img.tag && (
                  <>
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(0deg, rgba(21,34,24,0.5) 19.7%, rgba(21,34,24,0) 62.4%)",
                      }}
                    />
                    <span className="absolute bottom-4 left-4 lg:bottom-[32px] lg:left-[32px] bg-[rgba(10,19,12,0.4)] text-[#f2fcf7] px-3 py-1 rounded-full font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)] whitespace-nowrap">
                      {img.tag}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex gap-8 md:gap-6 lg:gap-[32px] h-[200px] md:h-[260px] lg:h-[316px] overflow-x-auto lg:overflow-visible scrollbar-hide">
            {menuImages.slice(4, 8).map((img, idx) => (
              <div
                key={idx}
                className="relative flex-shrink-0 w-[85%] md:w-[45%] lg:w-auto lg:flex-1 h-full rounded-lg overflow-hidden"
              >
                <OptimizedImage
                  src={img.src}
                  alt={`Prato ${idx + 5}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <a
          href={buildCloudbedsBookingUrl({
            locale: lang,
            utmContent: "culinaria_section_fazer_reserva",
          })}
          className="flex items-center justify-between w-full py-4 border-b border-[#f2fcf7] transition-all duration-300 group"
          data-testid="link-menu-reserva"
        >
          <span className="link-hover font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
            {buttonText ?? "Fazer uma reserva"}
          </span>
          <ChevronRight className="w-5 h-5 text-[#e3f7ec] transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
        </a>
      </div>
    </section>
  );
};
