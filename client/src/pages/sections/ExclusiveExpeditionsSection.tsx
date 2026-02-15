import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "@/lib/icons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
        "Em águas privativas, a pesca transcende, uma imersão tática com guias que leem o rio.",
      backgroundImage: "/images/home/expedition-pesca.webp",
    },
    {
      title: "Birdwatching",
      description:
        "166 espécies catalogadas em nosso santuário. Guias ornitólogos conduzem expedições imersivas ao amanhecer.",
      backgroundImage: "/images/home/expedition-birdwatching.webp",
    },
    {
      title: "Ecoturismo",
      description:
        "Trilhas guiadas, passeios de barco e safáris fotográficos no coração do Pantanal intocado.",
      backgroundImage: "/images/home/expedition-ecoturismo.webp",
    },
  ],
  buttonText: "Quero conhecer",
};

type Props = { content?: HomePageContent["expeditions"] };

export const ExclusiveExpeditionsSection = ({ content: contentProp }: Props): JSX.Element => {
  const content = contentProp ?? defaultExpeditionsContent;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="flex flex-col items-center justify-end w-full bg-[#344e41]">
      <div className="flex flex-col max-w-[1440px] items-center justify-end gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-10 py-12 md:py-16 lg:py-[100px] w-full">
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

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col md:flex-row w-full items-stretch gap-4 md:gap-6 lg:gap-[32px]">
          {content.items.map((expedition, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={index}
                variants={cardItem}
                className={`w-full transition-all duration-700 [transition-timing-function:cubic-bezier(0.25,0.4,0.25,1)] ${
                  isActive
                    ? "lg:w-[500px] xl:w-[664px] lg:flex-shrink-0"
                    : "lg:flex-1 lg:min-w-0"
                }`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <Card
                  className="w-full h-[464px] md:h-[500px] lg:h-[500px] xl:h-[664px] rounded-lg overflow-hidden border-0 bg-center bg-cover bg-no-repeat cursor-pointer"
                  style={{ backgroundImage: `linear-gradient(0deg, rgba(21,34,24,0.5) 0%, rgba(21,34,24,0) 100%), linear-gradient(0deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.32) 100%), url(${expedition.backgroundImage})` }}
                  data-testid={`card-expedition-${index}`}
                >
                  <CardContent className="flex flex-col justify-end h-full p-5 md:p-6 lg:p-[32px]">
                    <div className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[40px]">
                      <div className="flex flex-col items-start gap-3 md:gap-5 lg:gap-[20px] w-full">
                        <h3 className="font-heading-md font-[number:var(--heading-md-font-weight)] text-[#e3f7ec] text-[length:var(--heading-md-font-size)] tracking-[var(--heading-md-letter-spacing)] leading-[var(--heading-md-line-height)] [font-style:var(--heading-md-font-style)]">
                          {expedition.title}
                        </h3>

                        {/* Description — Framer Motion height:"auto" on desktop, CSS !important override keeps visible on mobile */}
                        <motion.div
                          data-expedition-desc
                          className="overflow-hidden"
                          initial={false}
                          animate={{
                            height: isActive ? "auto" : 0,
                            opacity: isActive ? 1 : 0,
                          }}
                          transition={{ duration: 0.5, ease }}
                        >
                          <p className="max-w-[355px] font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
                            {expedition.description}
                          </p>
                        </motion.div>
                      </div>

                      <Button
                        variant="ghost"
                        className="flex items-center justify-between w-full py-3 md:py-4 lg:h-[56px] lg:py-[12px] px-0 lg:px-[24px] border-b lg:border-b-0 border-[#f2fcf7] rounded-none lg:rounded-[6px] h-auto"
                        data-testid={`button-expedition-details-${index}`}
                      >
                        <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] lg:text-[#f2fcf7] text-[length:var(--functional-md-font-size)] lg:text-[24px] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] lg:leading-[32px] [font-style:var(--functional-md-font-style)] lg:font-[number:var(--functional-lg-font-weight)]">
                          {content.buttonText}
                        </span>
                        <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-[#e3f7ec] lg:text-[#f2fcf7]" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
