import { motion } from "framer-motion";
import { ChevronRight } from "@/lib/icons";
import { fadeIn, fadeUp, stagger, cardItem, viewport } from "@/lib/motion";

const culinaryImages = [
  {
    src: "/images/acomodacoes/culinaria-1.webp",
    alt: "Prato regional do Pantanal",
    tag: "Café da manhã",
  },
  {
    src: "/images/acomodacoes/culinaria-2.webp",
    alt: "Almoço preparado com ingredientes locais",
    tag: "Almoço",
  },
  {
    src: "/images/acomodacoes/culinaria-3.webp",
    alt: "Jantar sofisticado na pousada",
    tag: "Jantar",
  },
  {
    src: "/images/acomodacoes/culinaria-4.webp",
    alt: "Lanche e petiscos regionais",
    tag: "Lanche",
  },
];

export const CulinarySection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#fcf4ed]">
      <div className="flex flex-col max-w-[1440px] items-stretch gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Header */}
        <motion.div
          className="flex flex-col items-start gap-6 md:gap-8 w-full"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.span
            className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#8aad9c] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]"
            data-testid="text-culinary-label"
            variants={fadeIn}
          >
            CULINÁRIA
          </motion.span>

          <motion.div
            className="flex flex-col lg:flex-row items-start gap-4 md:gap-6 lg:gap-[100px] w-full"
            variants={fadeUp}
          >
            <h2
              className="w-full lg:w-auto lg:flex-1 font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#263a30] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
              data-testid="text-culinary-heading"
            >
              O Sabor Autêntico do Pantanal
            </h2>

            <p className="w-full lg:flex-1 font-body-md font-[number:var(--body-md-font-weight)] text-[#446354] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              Nossa gastronomia é focada no essencial: ingredientes locais
              frescos e um preparo cuidadoso, resultando em uma comida autêntica
              e reconfortante após um dia de expedição.
            </p>
          </motion.div>
        </motion.div>

        {/* Image gallery — 4 in a row */}
        <motion.div
          className="flex gap-4 md:gap-6 lg:gap-[32px] w-full h-[200px] md:h-[260px] lg:h-[316px] overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {culinaryImages.map((item, index) => (
            <motion.div
              key={index}
              className="relative flex-shrink-0 w-[75%] md:w-[45%] lg:w-auto lg:flex-1 h-full rounded-xl overflow-hidden group"
              data-testid={`card-culinary-${index}`}
              variants={cardItem}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 snap-start"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(21,34,24,0) 0%, rgba(21,34,24,0.5) 100%)",
                }}
              />

              {/* Tag pill */}
              <span className="absolute bottom-4 left-4 lg:bottom-[32px] lg:left-[32px] inline-flex items-center px-3 py-1 bg-[rgba(10,19,12,0.4)] rounded-full font-body-sm font-[number:var(--body-sm-font-weight)] text-[#e3f7ec] text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                {item.tag}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.a
          href="#"
          className="flex items-center justify-between w-full py-4 border-b border-[#344E41] transition-all duration-300 group hover:border-[#263a30]"
          data-testid="link-culinary-cta"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <span className="link-hover font-functional-md font-[number:var(--functional-md-font-weight)] text-[#263a30] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
            Conheça nossa gastronomia
          </span>
          <ChevronRight className="w-5 h-5 text-[#263a30] transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
        </motion.a>
      </div>
    </section>
  );
};

