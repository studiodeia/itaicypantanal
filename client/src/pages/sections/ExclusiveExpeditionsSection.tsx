import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Link } from "wouter";
import { ChevronRightIcon } from "@/lib/icons";
import { fadeIn, fadeUp, stagger, cardItem, viewport, ease } from "@/lib/motion";
import type { HomePageContent } from "@shared/cms-page-content";

const defaultExpeditionsContent: HomePageContent["expeditions"] = {
  label: "NOSSOS SERVIÇOS",
  heading: "Expedições Exclusivas no Coração do Pantanal",
  description:
    "Nossas atividades são desenhadas para uma conexão profunda com o ecossistema. Escolha a sua expedição.",
  items: [
    {
      title: "Pesca Esportiva Cota Zero",
      description:
        "Em águas bem conservadas, a pesca transcende — uma imersão tática com guias nativos que dominam o rio.",
      backgroundImage: "/images/home/expedition-pesca.webp",
      href: "/pesca",
    },
    {
      title: "Birdwatching",
      description:
        "166 espécies catalogadas em nosso santuário. Guias ornitólogos conduzem expedições imersivas ao amanhecer.",
      backgroundImage: "/images/home/expedition-birdwatching.webp",
      href: "/observacao-de-aves",
    },
    {
      title: "Ecoturismo",
      description:
        "Trilhas guiadas, passeios de barco e safáris fotográficos no coração do Pantanal intocado.",
      backgroundImage: "/images/home/expedition-ecoturismo.webp",
      href: "/ecoturismo",
    },
  ],
  buttonText: "Quero conhecer",
};

type Props = { content?: HomePageContent["expeditions"] };

/** Fallback href mapping when CMS data doesn't include href */
const expeditionHrefFallback: Record<string, string> = {
  "Pesca Esportiva Cota Zero": "/pesca",
  "Birdwatching": "/observacao-de-aves",
  "Ecoturismo": "/ecoturismo",
};

export const ExclusiveExpeditionsSection = ({ content: contentProp }: Props): JSX.Element => {
  const content = contentProp ?? defaultExpeditionsContent;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="flex flex-col items-center justify-end w-full bg-[#344e41]">
      <div className="flex flex-col max-w-[1440px] items-center gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        {/* Section header */}
        <motion.header variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[32px] w-full">
          <motion.p variants={fadeIn} className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]" data-testid="text-services-label">
            {content.label}
          </motion.p>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 md:gap-6 lg:gap-[100px] w-full">
            <motion.h2 variants={fadeUp} className="w-full lg:w-[664px] font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]" data-testid="text-services-heading">
              {content.heading}
            </motion.h2>

            <motion.p variants={fadeUp} className="w-full lg:flex-1 font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              {content.description}
            </motion.p>
          </div>
        </motion.header>

        {/* Cards — LayoutGroup coordena a transição de flex entre os cards */}
        <LayoutGroup>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col md:flex-row w-full items-stretch gap-4 md:gap-6 lg:gap-[32px]">
            {content.items.map((expedition, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={index}
                  variants={cardItem}
                  layout
                  className={`w-full min-w-0 ${isActive ? "lg:flex-[2]" : "lg:flex-[1]"}`}
                  transition={{ layout: { duration: 0.45, ease: [0.25, 0.4, 0.25, 1] } }}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <Link href={expedition.href ?? expeditionHrefFallback[expedition.title] ?? "#"} className="block no-underline w-full h-full">
                    {/* Card — bg escuro + imagem a 20% opacity + gradiente na base */}
                    <div
                      className="relative w-full h-[464px] md:h-[560px] lg:h-[740px] rounded-[8px] overflow-hidden flex flex-col justify-end cursor-pointer bg-[#152218]"
                      data-testid={`card-expedition-${index}`}
                    >
                      {/* Imagem de fundo a 20% opacity */}
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: `url(${expedition.backgroundImage})` }}
                        aria-hidden="true"
                      />
                      {/* Gradiente: escuro na base, transparente no topo */}
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(21,34,24,0.88) 33%, rgba(21,34,24,0) 75%)" }}
                        aria-hidden="true"
                      />

                      {/* Conteúdo */}
                      <div className="relative flex flex-col gap-6 md:gap-8 lg:gap-[40px] items-start p-5 md:p-6 lg:p-[32px] w-full">
                        <div className="flex flex-col items-start gap-3 md:gap-4 lg:gap-[20px] w-full">
                          <h3 className="font-heading-md font-[number:var(--heading-md-font-weight)] text-[#e3f7ec] text-[length:var(--heading-md-font-size)] tracking-[var(--heading-md-letter-spacing)] leading-[var(--heading-md-line-height)] [font-style:var(--heading-md-font-style)]">
                            {expedition.title}
                          </h3>

                          {/* Descrição: animada por height/opacity ao mudar o card ativo */}
                          <motion.div
                            data-expedition-desc
                            className="overflow-hidden"
                            initial={false}
                            animate={{
                              height: isActive ? "auto" : 0,
                              opacity: isActive ? 1 : 0,
                            }}
                            transition={{
                              height: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
                              opacity: { duration: 0.3, delay: isActive ? 0.1 : 0, ease },
                            }}
                          >
                            <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
                              {expedition.description}
                            </p>
                          </motion.div>
                        </div>

                        {/* Botão: borda completa no card ativo, sem borda nos inativos (desktop) */}
                        <div
                          className={`flex items-center gap-[8px] w-full py-3 md:py-4 lg:h-[56px] lg:py-[12px] lg:px-[24px] rounded-none lg:rounded-[6px] ${
                            isActive
                              ? "border border-[#f2fcf7] lg:border lg:border-[#f2fcf7]"
                              : "border-b border-[#f2fcf7] lg:border-0"
                          }`}
                          data-testid={`button-expedition-details-${index}`}
                        >
                          <span className="flex-1 font-functional-md font-[number:var(--functional-md-font-weight)] text-[#f2fcf7] text-[length:var(--functional-md-font-size)] lg:text-[24px] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] lg:leading-[32px] [font-style:var(--functional-md-font-style)] lg:font-[number:var(--functional-lg-font-weight)] lg:whitespace-nowrap">
                            {content.buttonText}
                          </span>
                          <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-[#f2fcf7]" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
};
