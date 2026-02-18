import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "@/lib/icons";
import { fadeIn, fadeUp, stagger, cardItem, viewport } from "@/lib/motion";
import type { BirdSpecies } from "../data";
import { BirdSpeciesCard } from "../components/BirdSpeciesCard";

const BIRDS_PER_PAGE = 9;

interface AllBirdsSectionProps {
  allBirds: BirdSpecies[];
  categories: string[];
}

export const AllBirdsSection = ({
  allBirds,
  categories,
}: AllBirdsSectionProps): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState<string>("Todas");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBirds = useMemo(() => {
    let birds = allBirds;

    // Filter by category
    if (activeCategory !== "Todas") {
      birds = birds.filter((b) => b.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      birds = birds.filter(
        (b) =>
          b.commonName.toLowerCase().includes(q) ||
          b.scientificName.toLowerCase().includes(q),
      );
    }

    return birds;
  }, [activeCategory, searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBirds.length / BIRDS_PER_PAGE),
  );
  const paginatedBirds = filteredBirds.slice(
    (currentPage - 1) * BIRDS_PER_PAGE,
    currentPage * BIRDS_PER_PAGE,
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <section className="flex flex-col items-center w-full bg-[#fcf4ed]">
      <div className="flex flex-col max-w-[1440px] gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Section Header */}
        <motion.div
          className="flex flex-col gap-6 md:gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.span className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#8aad9c] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]" variants={fadeIn}>
            O COMPÊNDIO COMPLETO
          </motion.span>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-[100px] items-start lg:items-center">
            <motion.h2
              className="lg:w-[664px] shrink-0 font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#263a30] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
              variants={fadeUp}
            >
              Todas as Espécies
            </motion.h2>
            <motion.p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#446354] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]" variants={fadeUp}>
              Pesquise por nome ou filtre por categoria para encontrar a espécie
              que você procura.
            </motion.p>
          </div>
        </motion.div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8aad9c]" />
            <input
              type="text"
              placeholder="Buscar espécie..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-transparent border-b border-[#263a30]/20 font-functional-md font-[number:var(--functional-md-font-weight)] text-[#263a30] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)] placeholder:text-[#8aad9c] focus:outline-none focus:border-pantanal-gold transition-colors duration-200"
            />
          </div>

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
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Birds Grid */}
        <AnimatePresence mode="wait">
          {paginatedBirds.length > 0 ? (
            <motion.div
              key={`${currentPage}-${activeCategory}-${searchQuery}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-[32px]"
              variants={stagger}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {paginatedBirds.map((bird) => (
                <motion.div key={bird.slug} variants={cardItem}>
                  <BirdSpeciesCard bird={bird} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="flex flex-col items-center justify-center py-16 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#446354] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] text-center">
                Nenhuma espécie encontrada para esta busca.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("Todas");
                }}
                className="font-functional-md font-[number:var(--functional-md-font-weight)] text-pantanal-gold text-[length:var(--functional-md-font-size)] hover:underline"
              >
                Limpar filtros
              </button>
            </motion.div>
          )}
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

