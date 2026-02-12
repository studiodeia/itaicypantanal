import { motion } from "framer-motion";
import { fadeIn, fadeUp, scaleIn, stagger, cardItem, viewport } from "@/lib/motion";

const features = [
  {
    number: "01",
    title: "Sustentabilidade",
    description: "Práticas eco-friendly em todas as nossas operações",
  },
  {
    number: "02",
    title: "Excelência",
    description: "Guias especializados e equipamentos de primeira linha",
  },
  {
    number: "03",
    title: "Hospitalidade",
    description: "Atendimento personalizado para cada hóspede",
  },
];

export const AuthenticRestSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center w-full bg-[#263a30]">
      <div className="flex flex-col lg:flex-row max-w-[1440px] items-center gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewport} className="w-full lg:flex-1 lg:max-w-[780px] h-[464px] md:min-h-[400px] md:h-auto lg:h-[816px] rounded-lg bg-[url(/images/home/about-us.webp)] bg-cover bg-center" data-testid="img-about-us" />

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[32px] py-0 lg:py-[32px] flex-1 w-full">
          <motion.p variants={fadeIn} className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]" data-testid="text-about-label">
            SOBRE NÓS
          </motion.p>

          <motion.h2 variants={fadeUp} className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)]" data-testid="text-about-heading">
            Bem-vindo ao Nosso Refúgio Natural
          </motion.h2>

          <motion.div variants={fadeUp} className="flex flex-col items-start gap-4 md:gap-6 w-full">
            <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
              Localizada no coração de uma das regiões mais biodiversas do
              mundo, nossa pousada oferece uma experiência única de conexão com
              a natureza.
            </p>

            <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
              Com mais de 15 anos de experiência em ecoturismo, nos dedicamos a
              proporcionar momentos inesquecíveis enquanto preservamos e
              protegemos nosso ambiente natural.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-0 md:gap-0 lg:gap-[32px] w-full">
            {features.map((feature, index) => (
              <motion.div variants={cardItem} key={feature.number} className={index > 0 ? "border-t border-[#a8cab9] pt-6 md:pt-6 lg:pt-[24px]" : ""}>
                <div className="flex items-start gap-4 md:gap-6 lg:gap-[24px]">
                  <div className="flex w-8 pt-[6px]">
                    <span className="font-body-xs font-[number:var(--body-xs-font-weight)] text-[#6c927f] text-[length:var(--body-xs-font-size)] tracking-[var(--body-xs-letter-spacing)] leading-[var(--body-xs-line-height)] [font-style:var(--body-xs-font-style)]">
                      {feature.number}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 lg:gap-[8px] flex-1">
                    <h3 className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[#e3f7ec] text-[length:var(--heading-sm-font-size)] tracking-[var(--heading-sm-letter-spacing)] leading-[var(--heading-sm-line-height)] [font-style:var(--heading-sm-font-style)]" data-testid={`text-feature-title-${feature.number}`}>
                      {feature.title}
                    </h3>

                    <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
