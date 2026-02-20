import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@/lib/icons";
import type { BlogArticle } from "../data";
import { BlogArticleCard } from "../components/BlogArticleCard";
import { stagger, fadeUp, cardItem, viewport } from "@/lib/motion";

interface BlogRecentSectionProps {
  recentArticles: BlogArticle[];
}

export const BlogRecentSection = ({
  recentArticles,
}: BlogRecentSectionProps): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#263a30]">
      <div className="flex flex-col max-w-[1440px] gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Section Title + Arrows */}
        <motion.div
          className="flex items-center justify-between"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.h2
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            variants={fadeUp}
          >
            Mais Recentes
          </motion.h2>

          <div className="hidden md:flex items-center gap-2">
            <button className="flex items-center justify-center w-12 h-12 bg-[#344e41] rounded text-[#e3f7ec] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90">
              <ChevronLeft className="w-6 h-6" strokeWidth={2} />
            </button>
            <button className="flex items-center justify-center w-12 h-12 bg-[#344e41] rounded text-[#e3f7ec] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90">
              <ChevronRight className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>
        </motion.div>

        {/* Cards Row */}
        <motion.div
          className="flex flex-col md:flex-row gap-8 md:gap-6 lg:gap-[32px]"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {recentArticles.map((article) => (
            <motion.div key={article.slug} className="w-full md:flex-1" variants={cardItem}>
              <BlogArticleCard article={article} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

