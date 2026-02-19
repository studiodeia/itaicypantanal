import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "@/lib/icons";
import type { BlogArticle } from "../data";
import { BlogArticleCard } from "../components/BlogArticleCard";
import { stagger, fadeUp, cardItem, viewport } from "@/lib/motion";
import { useLanguage } from "@/i18n/context";
import { getBlogCategoryLabel, t } from "@/i18n/ui-strings";

const ARTICLES_PER_PAGE = 9;

interface BlogCategoriesSectionProps {
  allArticles: BlogArticle[];
  categories: string[];
}

export const BlogCategoriesSection = ({
  allArticles,
  categories,
}: BlogCategoriesSectionProps): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState<string>("Todas");
  const [currentPage, setCurrentPage] = useState(1);
  const { lang } = useLanguage();

  const filteredArticles =
    activeCategory === "Todas"
      ? allArticles
      : allArticles.filter((a) => a.categories.includes(activeCategory));

  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE),
  );
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE,
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <section className="flex flex-col items-center w-full bg-[#fcf4ed]">
      <div className="flex flex-col max-w-[1440px] gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Section Title + Filters */}
        <motion.div
          className="flex flex-col gap-8 md:gap-12"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.h2
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#263a30] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            variants={fadeUp}
          >
            {t("blog", "allCategories", lang)}
          </motion.h2>

          {/* Filters + Sort */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-2 font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)] transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-[#f5e8db] text-[#263a30] rounded-lg"
                      : "text-[#263a30] rounded-full hover:bg-[#f5e8db]/50"
                  }`}
                >
                  {getBlogCategoryLabel(cat, lang)}
                </button>
              ))}
            </div>

            {/* Sort dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#8aad9c] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
                {t("blog", "sortBy", lang)}
              </span>
              <button className="flex items-center gap-2 px-3 py-2.5">
                <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#263a30] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
                  {t("blog", "mostRecent", lang)}
                </span>
                <ChevronDown className="w-5 h-5 text-[#263a30]" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Article Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPage}-${activeCategory}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-[32px]"
            variants={stagger}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {paginatedArticles.map((article) => (
              <motion.div key={article.slug} variants={cardItem}>
                <BlogArticleCard article={article} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-12 h-12 bg-[#f5e8db] rounded text-[#263a30] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 disabled:opacity-40 disabled:hover:translate-y-0"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={2} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex items-center justify-center w-12 h-12 rounded font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 ${
                    currentPage === page
                      ? "bg-[#ac8042] text-[#f2fcf7]"
                      : "bg-[#f5e8db] text-[#263a30]"
                  }`}
                >
                  {String(page).padStart(2, "0")}
                </button>
              ),
            )}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-12 h-12 bg-[#f5e8db] rounded text-[#263a30] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 disabled:opacity-40 disabled:hover:translate-y-0"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

