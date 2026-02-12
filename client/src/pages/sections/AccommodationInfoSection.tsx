import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeIn, fadeUp, stagger, viewport } from "@/lib/motion";

export const AccommodationInfoSection = (): JSX.Element => {
  return (
    <section className="h-[868px] md:min-h-[600px] md:h-auto lg:h-[740px] items-start justify-end md:justify-center z-[6] bg-[linear-gradient(270deg,rgba(21,34,24,0)_0%,rgba(21,34,24,0.64)_100%),linear-gradient(0deg,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0.32)_100%),url(/images/home/accommodations-bg.webp)] bg-cover bg-center flex flex-col w-full">
      <div className="flex max-w-[1440px] mx-auto items-center gap-8 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="flex-1 flex flex-col items-start gap-6 md:gap-8 lg:gap-[32px]">
          <motion.p variants={fadeIn} className="w-fit font-lead-md font-[number:var(--lead-md-font-weight)] text-[#e3f7ec] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]" data-testid="text-accommodations-label">
            ACOMODAÇÕES
          </motion.p>

          <motion.h2 variants={fadeUp} className="max-w-[582px] text-[#e3f7ec] font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)]" data-testid="text-accommodations-heading">
            Descanso autêntico no coração selvagem
          </motion.h2>

          <motion.p variants={fadeUp} className="font-body-lg font-[number:var(--body-lg-font-weight)] text-[#e3f7ec] text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] [font-style:var(--body-lg-font-style)]">
            Nossas acomodações são projetadas para o descanso e a imersão.
            Confortáveis, climatizadas e com vista para a natureza intocada,
            elas são o ponto de partida perfeito para sua aventura no Pantanal.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 lg:gap-[32px]">
            <Button className="h-auto lg:h-[56px] bg-[#ac8042] hover:bg-[#8f6a35] text-[#f2fcf7] text-lg md:text-xl lg:text-[24px] leading-7 md:leading-8 lg:leading-[32px] font-functional-lg font-[number:var(--functional-lg-font-weight)] tracking-[0] px-5 md:px-6 lg:px-[24px] py-2.5 md:py-3 lg:py-[12px] rounded-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]" data-testid="button-reservar-accommodations">
              Reservar
            </Button>

            <Button
              variant="outline"
              className="h-auto lg:h-[56px] bg-transparent text-[#e3f7ec] border-[#f2fcf7] text-lg md:text-xl lg:text-[24px] leading-7 md:leading-8 lg:leading-[32px] font-functional-lg font-[number:var(--functional-lg-font-weight)] tracking-[0] px-5 md:px-6 lg:px-[24px] py-2.5 md:py-3 lg:py-[12px] rounded-md transition-all duration-300 hover:bg-[#f2fcf7] hover:text-[#152218] hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(242,252,247,0.3)]"
              data-testid="button-accommodations-details"
            >
              Mais detalhes
            </Button>
          </motion.div>
        </motion.div>

        <div className="hidden lg:block w-[630px] h-full rounded-lg" />
      </div>
    </section>
  );
};
