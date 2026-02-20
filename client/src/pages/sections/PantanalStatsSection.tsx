import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import type { HomePageContent } from "@shared/cms-page-content";

type Props = { content: HomePageContent["stats"] };

const ANIMATION_DURATION = 2000;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export const PantanalStatsSection = ({ content }: Props): JSX.Element => {
  const stats = content.items;
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const [started, setStarted] = useState(false);

  const animateCounts = useCallback(() => {
    setStarted(true);
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
      const eased = easeOutCubic(progress);

      setCounts(
        stats.map((s) =>
          Number.isInteger(s.target)
            ? Math.round(s.target * eased)
            : Math.round(s.target * eased * 10) / 10
        )
      );

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [stats]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCounts();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [animateCounts]);

  const formatValue = (count: number, index: number) => {
    const s = stats[index];
    const num = Number.isInteger(s.target) ? String(Math.round(count)) : count.toFixed(1);
    return num + s.suffix;
  };

  return (
    <section ref={sectionRef} className="bg-[#263a30] flex flex-col items-center w-full">
      <div className="flex max-w-[1440px] items-end justify-center px-0 md:px-8 lg:px-16 py-0 md:py-16 lg:py-[100px] w-full">
        {/* Mobile: single column, padding 32px, gap 40px | Tablet: 4-col grid | Desktop: flex row */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col items-start gap-[40px] p-8 w-full md:grid md:grid-cols-4 md:gap-8 md:p-0 md:items-center lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-0">
          {stats.map((stat, index) => (
            <motion.div
              variants={fadeUp}
              key={index}
              className="flex flex-col items-center text-center gap-2 self-stretch md:items-start md:text-left"
              data-testid={`stat-${index}`}
            >
              {stat.hasIcon ? (
                <div className={`flex items-center justify-center md:justify-start gap-0 w-full transition-opacity duration-300 ${started ? "opacity-100" : "opacity-0"}`}>
                  <div className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[#e3f7ec] text-[length:var(--display-lg-font-size)] tracking-[var(--display-lg-letter-spacing)] leading-[var(--display-lg-line-height)] [font-style:var(--display-lg-font-style)]">
                    {formatValue(counts[index], index)}
                  </div>
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="w-[2.4em] h-[2.4em] text-[#e3f7ec] shrink-0"
                    aria-label="Rating icon"
                  >
                    {[0, 1, 2, 3, 4].map((i) => {
                      const angle = (i * 72 - 90) * (Math.PI / 180);
                      return (
                        <line
                          key={i}
                          x1="16" y1="16"
                          x2={16 + 13 * Math.cos(angle)}
                          y2={16 + 13 * Math.sin(angle)}
                        />
                      );
                    })}
                  </svg>
                </div>
              ) : (
                <div className={`font-display-lg font-[number:var(--display-lg-font-weight)] text-[#e3f7ec] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)] w-full text-center md:text-left transition-opacity duration-300 ${started ? "opacity-100" : "opacity-0"}`}>
                  {formatValue(counts[index], index)}
                </div>
              )}
              <div className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[3.84px] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)] text-center md:text-left uppercase w-full">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
