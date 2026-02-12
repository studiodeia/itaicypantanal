import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/OptimizedImage";
import { fadeIn, fadeUp, scaleIn, stagger, viewport } from "@/lib/motion";

const pillars = [
  {
    number: "01",
    title: "Cota Zero (Pesque e Solte)",
    description:
      "Praticamos rigorosamente a conservação. O peixe é um troféu vivo que retorna ao rio, garantindo o equilíbrio do ecossistema e o futuro do esporte.",
  },
  {
    number: "02",
    title: "Zonas de Acesso Restrito",
    description:
      "Navegue por rios e corixos dentro de áreas protegidas e exclusivas, longe da competição e do ruído do turismo convencional.",
  },
  {
    number: "03",
    title: "Piloteiros Nativos",
    description:
      "Nossos guias nasceram na região e dominam a leitura do rio. Eles conhecem os pontos de caça do Dourado e as técnicas para maximizar sua performance.",
  },
];

export const PescaSobreNosSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#263a30]">
      <div className="flex flex-col lg:flex-row max-w-[1440px] items-center gap-8 md:gap-12 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Left: Image */}
        <motion.div
          className="w-full lg:flex-1 h-[300px] md:h-[500px] lg:h-[904px] rounded-lg overflow-hidden"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <OptimizedImage
            src="/images/pesca-about-1"
            alt="Pesca esportiva no Pantanal"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          className="flex flex-col flex-1 gap-8 py-0 lg:py-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* Label */}
          <motion.span
            className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]"
            data-testid="text-pesca-about-label"
            variants={fadeIn}
          >
            NOSSA FILOSOFIA
          </motion.span>

          {/* Title */}
          <motion.h2
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            data-testid="text-pesca-about-heading"
            variants={fadeUp}
          >
            Alta Performance e Preservação
          </motion.h2>

          {/* Description */}
          <motion.p
            className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]"
            variants={fadeUp}
          >
            Trazemos ao Pantanal a expertise técnica de nossas 13 operações na
            Amazônia. Nossa estrutura é desenhada para o pescador esportivo que
            busca desafio técnico e troféus, em um ambiente onde a pressão de
            pesca é controlada e os gigantes do rio são respeitados.
          </motion.p>

          {/* Pillars */}
          <div className="flex flex-col gap-8">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                className={`flex gap-6 items-start pt-6 ${
                  idx > 0 ? "border-t border-[#446354]" : ""
                }`}
                data-testid={`pillar-pesca-${idx}`}
                variants={fadeUp}
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
