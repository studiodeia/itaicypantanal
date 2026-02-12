import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/OptimizedImage";
import { stagger, fadeIn, fadeUp, scaleIn, viewport } from "@/lib/motion";

const pillars = [
  {
    number: "01",
    title: "Guias Experts",
    description:
      "Nossos guias possuem mais de 15 anos de experiência e conhecem intimamente os comportamentos e rotas de cada espécie.",
  },
  {
    number: "02",
    title: "Acesso Exclusivo",
    description:
      "Possuímos autorização do IBAMA para operar em áreas protegidas, longe do turismo convencional.",
  },
  {
    number: "03",
    title: "Imersão Contemplativa",
    description:
      "Oferecemos uma experiência que vai além do turismo, focada em uma imersão científica e verdadeiramente contemplativa.",
  },
];

export const BirdSobreNosSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#263a30]">
      <div className="flex flex-col lg:flex-row max-w-[1440px] items-center gap-8 md:gap-12 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Left: Image */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="w-full lg:flex-1 h-[300px] md:h-[500px] lg:h-[904px] rounded-lg overflow-hidden"
        >
          <OptimizedImage
            src="/images/bird-about-1"
            alt="Observação de aves no Pantanal"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col flex-1 gap-8 py-0 lg:py-8"
        >
          {/* Label */}
          <motion.span variants={fadeIn} className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]">
            NOSSA FILOSOFIA
          </motion.span>

          {/* Title */}
          <motion.h2
            variants={fadeUp}
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            Observação Consciente e Imersiva
          </motion.h2>

          {/* Description */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              No coração do Pantanal, praticamos a observação de aves com
              respeito absoluto ao habitat natural.
            </p>
            <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              Cada expedição é planejada para minimizar o impacto ambiental,
              enquanto maximiza suas oportunidades de avistamento.
            </p>
          </motion.div>

          {/* Pillars */}
          <motion.div variants={fadeUp} className="flex flex-col gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className={`flex gap-6 items-start pt-6 ${
                  idx > 0 ? "border-t border-[#446354]" : ""
                }`}
              >
                <span className="w-8 pt-[6px] font-body-xs font-[number:var(--body-xs-font-weight)] text-[#6c927f] text-[length:var(--body-xs-font-size)] leading-[var(--body-xs-line-height)] [font-style:var(--body-xs-font-style)]">
                  {pillar.number}
                </span>
                <div className="flex flex-col flex-1 gap-2">
                  <h3
                    className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[#e3f7ec] text-[length:var(--heading-sm-font-size)] tracking-[var(--heading-sm-letter-spacing)] leading-[var(--heading-sm-line-height)] [font-style:var(--heading-sm-font-style)]"
                    style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
