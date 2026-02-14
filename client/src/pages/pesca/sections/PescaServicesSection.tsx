import { motion } from "framer-motion";
import { ChevronRight } from "@/lib/icons";
import { OptimizedImage } from "@/components/OptimizedImage";
import { buildCloudbedsBookingUrl } from "@/lib/booking/cloudbeds";
import { fadeIn, fadeUp, stagger, cardItem, viewport } from "@/lib/motion";

const fishSpecies = [
  {
    scientificName: "Pseudoplatystoma corruscans",
    commonName: "Zebra do Pantanal",
    description:
      "Um dos peixes mais icônicos da região, conhecido por suas listras distintivas e força em batalhas de pesca.",
    tag: "Fauna",
    src: "/images/pesca-fish-1",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
  },
  {
    scientificName: "Cichla ocellaris",
    commonName: "Tucunaré",
    description:
      "Famoso entre os pescadores esportivos, o tucunaré é conhecido por sua agressividade e habilidade de luta.",
    tag: "Fauna",
    src: "/images/pesca-fish-2",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
  },
  {
    scientificName: "Leporinus friderici",
    commonName: "Pacu",
    description:
      "Um peixe de carne saborosa, o pacu é alvo de muitas pescarias e intrigante por sua velocidade na água.",
    tag: "Fauna",
    src: "/images/pesca-fish-3",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
  },
  {
    scientificName: "Salminus brasiliensis",
    commonName: "Dourado",
    description:
      "Considerado o rei dos rios, o dourado é famoso por sua luta intensa e é um dos mais procurados na pesca esportiva.",
    tag: "Fauna",
    src: "/images/pesca-fish-4",
    author: "Lucas Vieira",
    date: "09 de Agosto, 2025",
  },
];

export const PescaServicesSection = (): JSX.Element => {
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
            data-testid="text-pesca-services-label"
            variants={fadeIn}
          >
            O SANTUÁRIO
          </motion.span>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-[100px] items-start lg:items-center">
            <motion.h2
              className="lg:w-[664px] shrink-0 font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
              data-testid="text-pesca-services-heading"
              variants={fadeUp}
            >
              Os Gigantes do Nosso Rio
            </motion.h2>
            <motion.p
              className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]"
              variants={fadeUp}
            >
              O Dourado é o rei, mas não reina sozinho. Nossas águas abrigam uma
              variedade incrível de desafios esportivos. Conheça seus
              adversários.
            </motion.p>
          </div>
        </motion.div>

        {/* Fish cards — 2x2 grid */}
        <div className="flex flex-col gap-8 md:gap-6 lg:gap-[32px]">
          {/* Row 1 */}
          <motion.div
            className="flex flex-col md:flex-row gap-8 md:gap-6 lg:gap-[32px]"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {fishSpecies.slice(0, 2).map((fish, idx) => (
              <motion.div key={idx} variants={cardItem} className="w-full md:flex-1">
                <FishCard fish={fish} index={idx} />
              </motion.div>
            ))}
          </motion.div>
          {/* Row 2 */}
          <motion.div
            className="flex flex-col md:flex-row gap-8 md:gap-6 lg:gap-[32px]"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {fishSpecies.slice(2, 4).map((fish, idx) => (
              <motion.div key={idx + 2} variants={cardItem} className="w-full md:flex-1">
                <FishCard fish={fish} index={idx + 2} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA contextual — conversão do pescador */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 w-full p-6 md:p-8 lg:p-10 bg-[#344e41] rounded-lg">
          <div className="flex flex-col gap-3 flex-1">
            <h3
              className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[#e3f7ec] text-[length:var(--heading-sm-font-size)] leading-[var(--heading-sm-line-height)] tracking-[var(--heading-sm-letter-spacing)] [font-style:var(--heading-sm-font-style)]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            >
              Pronto para pescar os gigantes do Pantanal?
            </h3>
            <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)] max-w-[600px]">
              Barcos equipados com sonar, piloteiros nativos e acesso exclusivo a
              zonas de pesca restrita. Sua melhor pescaria começa aqui.
            </p>
          </div>
          <a
            href={buildCloudbedsBookingUrl({
              utmContent: "pesca_section_reservar_expedicao",
            })}
            className="flex items-center justify-center h-14 px-6 bg-[#ac8042] hover:bg-[#8f6a35] rounded-[6px] text-[#f2fcf7] font-['Lato',sans-serif] font-semibold text-base lg:text-lg whitespace-nowrap shrink-0 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]"
          >
            Reservar Expedição de Pesca
          </a>
        </div>

        {/* Bottom CTA */}
        <a
          href="#"
          className="flex items-center justify-between w-full py-4 border-b border-[#f2fcf7] transition-all duration-300 group"
          data-testid="link-pesca-guia"
        >
          <span className="link-hover font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
            Ver guia de espécies completo
          </span>
          <ChevronRight
            className="w-5 h-5 text-[#e3f7ec] transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={2}
          />
        </a>
      </div>
    </section>
  );
};

interface FishCardProps {
  fish: (typeof fishSpecies)[number];
  index: number;
}

const FishCard = ({ fish, index }: FishCardProps): JSX.Element => {
  return (
    <div
      className="relative flex flex-col justify-end w-full md:flex-1 h-[500px] md:h-[600px] lg:h-[910px] rounded-lg overflow-hidden group"
      data-testid={`card-fish-${index}`}
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
      <div className="absolute top-6 left-6 bg-[rgba(10,19,12,0.4)] text-[#f2fcf7] px-3 py-1 rounded-full font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
        {fish.tag}
      </div>

      {/* Content */}
      <div className="relative flex flex-col gap-8 md:gap-10 p-5 md:p-6 lg:p-[32px]">
        {/* Text content */}
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

        {/* Footer */}
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

          <button className="flex items-center gap-1.5 px-4 py-2 rounded text-[#f2fcf7] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90">
            <span className="font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)]">
              Saiba mais
            </span>
            <ChevronRight className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};



