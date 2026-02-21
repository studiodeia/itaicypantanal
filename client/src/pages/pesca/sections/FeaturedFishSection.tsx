import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight } from "@/lib/icons";
import { OptimizedImage } from "@/components/OptimizedImage";
import { fadeIn, fadeUp, stagger, cardItem, viewport } from "@/lib/motion";
import type { FishSpecies } from "../data";
import { getFishUrl } from "../cms";

const FeaturedFishCard = ({ fish }: { fish: FishSpecies }): JSX.Element => {
  return (
    <Link
      href={getFishUrl(fish)}
      className="relative flex flex-col justify-end w-full h-[500px] md:h-[600px] lg:h-[910px] rounded-lg overflow-hidden group no-underline"
    >
      {/* Background image */}
      <OptimizedImage
        src={fish.src}
        alt={fish.commonName}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(21,34,24,0.88) 32.8%, rgba(21,34,24,0) 75.5%)",
        }}
      />

      {/* Tag */}
      <div className="absolute top-6 left-6">
        <div className="bg-[rgba(10,19,12,0.4)] text-[#f2fcf7] px-3 py-1 rounded-full font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
          {fish.tag}
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col gap-8 md:gap-10 p-5 md:p-6 lg:p-[32px]">
        <div className="flex flex-col gap-5">
          <span className="font-body-xs font-[number:var(--body-xs-font-weight)] text-[#a8cab9] text-[length:var(--body-xs-font-size)] leading-[var(--body-xs-line-height)] [font-style:var(--body-xs-font-style)]">
            {fish.scientificName}
          </span>
          <h3
            className="font-heading-md font-[number:var(--heading-md-font-weight)] text-[#e3f7ec] text-[length:var(--heading-md-font-size)] leading-[var(--heading-md-line-height)] tracking-[var(--heading-md-letter-spacing)] [font-style:var(--heading-md-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            {fish.commonName}
          </h3>
          <p className="max-w-[648px] font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
            {fish.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#446354] overflow-hidden">
              <img
                src="/images/home/blog-avatar.webp"
                alt={fish.author}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[#cfebdd] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)]">
                {fish.author}
              </span>
              <span className="font-body-xs font-[number:var(--body-xs-font-weight)] text-[#cfebdd] text-[length:var(--body-xs-font-size)] leading-[var(--body-xs-line-height)] [font-style:var(--body-xs-font-style)]">
                {fish.date}
              </span>
            </div>
          </div>

          <span className="flex items-center gap-1.5 px-4 py-2 rounded text-[#f2fcf7] transition-all duration-300 group-hover:-translate-y-0.5">
            <span className="font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)]">
              Saiba mais
            </span>
            <ChevronRight className="w-5 h-5" strokeWidth={2} />
          </span>
        </div>
      </div>
    </Link>
  );
};

interface FeaturedFishSectionProps {
  featuredFish: FishSpecies[];
}

export const FeaturedFishSection = ({
  featuredFish,
}: FeaturedFishSectionProps): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#263a30]">
      <div className="flex flex-col max-w-[1440px] gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <motion.div
          className="flex flex-col gap-6 md:gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.span className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]" variants={fadeIn}>
            CURADORIA ESPECIAL
          </motion.span>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-[100px] items-start lg:items-center">
            <motion.h2
              className="lg:w-[664px] shrink-0 font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
              variants={fadeUp}
            >
              Os Troféus do Rio Cuiabá
            </motion.h2>
            <motion.p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]" variants={fadeUp}>
              Espécies mais disputadas nas expedições de pesca esportiva.
              Adversários que testam técnica, equipamento e paciência.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-8 md:gap-6 lg:gap-[32px]"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {featuredFish.map((fish) => (
            <motion.div key={fish.slug} variants={cardItem} className="w-full md:flex-1 min-w-0">
              <FeaturedFishCard fish={fish} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
