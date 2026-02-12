import { motion } from "framer-motion";
import { Bird, ShieldCheck, Users } from "lucide-react";
import { stagger, fadeUp, cardItem, viewport } from "@/lib/motion";

const highlights = [
  {
    icon: Bird,
    title: "166+ Espécies avistadas",
    description: "Registradas em apenas 5 dias de expedição",
  },
  {
    icon: ShieldCheck,
    title: "Acesso Exclusivo IBAMA",
    description: "Áreas protegidas com biodiversidade única",
  },
  {
    icon: Users,
    title: "Guias Especializados",
    description: "Ornitólogos certificados e fotógrafos experientes",
  },
];

export const BirdHighlightsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#344e41]">
      <div className="flex flex-col max-w-[1440px] items-center gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Title */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.h2
            variants={fadeUp}
            className="text-center font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#f2fcf7] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            Por Que Escolher Nossa Expedição
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-6 lg:gap-[32px] w-full"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              variants={cardItem}
              className="flex flex-col items-start gap-16 md:gap-0 md:justify-between w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] h-auto md:h-[260px] lg:h-[272px] bg-[#263a30] rounded-lg p-8 md:p-7 lg:p-[32px]"
            >
              <item.icon
                className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 text-[#e3f7ec]"
                strokeWidth={1.5}
              />

              <div className="flex flex-col gap-2">
                <h3
                  className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[#e3f7ec] text-[length:var(--heading-sm-font-size)] tracking-[var(--heading-sm-letter-spacing)] leading-[var(--heading-sm-line-height)] [font-style:var(--heading-sm-font-style)]"
                  style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
                >
                  {item.title}
                </h3>

                <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
