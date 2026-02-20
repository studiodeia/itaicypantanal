import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight } from "@/lib/icons";
import { fadeIn, fadeUp, stagger, viewport } from "@/lib/motion";
import type { NossoImpactoPageContent } from "@shared/cms-page-content";

type Props = { content: NossoImpactoPageContent["biodiversidade"] };

const ANIMATION_DURATION = 2000;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export const BiodiversidadeSection = ({ content }: Props): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const [counts, setCounts] = useState<number[]>(content.counters.map(() => 0));

  const animateCounts = useCallback(() => {
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
      const eased = easeOutCubic(progress);

      setCounts(content.counters.map((s) => Math.round(s.target * eased)));

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [content.counters]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCounts();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [animateCounts]);

  return (
    <section ref={sectionRef} className="flex flex-col items-center w-full bg-[#263a30]">
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
            BIODIVERSIDADE
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)] max-w-[664px]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            {content.heading}
          </motion.h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[32px]"
        >
          {content.counters.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-3 p-8 rounded-lg bg-[#344e41]"
              data-testid={`bio-stat-${index}`}
            >
              <span className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[#d7a45d] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]">
                {counts[index]}
                {stat.suffix}
              </span>
              <span className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[3.84px] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)] uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA link */}
        <Link
          href="/observacao-de-aves"
          className="flex items-center justify-between w-full py-4 border-b border-[#f2fcf7] transition-all duration-300 group no-underline"
        >
          <span className="link-hover font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
            Veja nosso inventário de vida selvagem
          </span>
          <ChevronRight
            className="w-5 h-5 text-[#e3f7ec] transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={2}
          />
        </Link>
      </div>
    </section>
  );
};
