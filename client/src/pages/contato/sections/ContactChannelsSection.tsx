import { motion } from "framer-motion";
import { resolveIcon } from "@/lib/icon-resolver";
import { fadeUp, stagger, cardItem, scaleIn, viewport } from "@/lib/motion";
import type { ContatoPageContent } from "@shared/cms-page-content";

type Props = { content: ContatoPageContent["channels"] };

export const ContactChannelsSection = ({ content }: Props): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#344e41]">
      <div className="flex flex-col max-w-[1440px] items-center gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full overflow-hidden">
        {/* Title */}
        <motion.h2
          className="text-center font-heading-xl font-[number:var(--heading-xl-font-weight)] text-[#e3f7ec] text-[length:var(--heading-xl-font-size)] leading-[var(--heading-xl-line-height)] tracking-[var(--heading-xl-letter-spacing)] [font-style:var(--heading-xl-font-style)] w-full"
          style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          data-testid="text-channels-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {content.heading}
        </motion.h2>

        {/* Channel cards */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-[32px] w-full"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {content.items.map((channel, index) => {
            const Icon = resolveIcon(channel.iconName);
            return (
            <motion.div
              key={index}
              className="flex flex-col items-start justify-between w-full md:flex-1 h-auto md:h-[260px] lg:h-[272px] bg-[#263a30] rounded-lg p-6 md:p-7 lg:p-[32px]"
              data-testid={`card-channel-${index}`}
              variants={cardItem}
            >
              <Icon
                className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 text-[#e3f7ec]"
                strokeWidth={1.5}
              />

              <div className="flex flex-col gap-2 mt-4 md:mt-0">
                <h3
                  className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[#e3f7ec] text-[length:var(--heading-sm-font-size)] tracking-[var(--heading-sm-letter-spacing)] leading-[var(--heading-sm-line-height)] [font-style:var(--heading-sm-font-style)]"
                  style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
                >
                  {channel.title}
                </h3>

                <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
                  {channel.info}
                </p>
              </div>
            </motion.div>
            );
          })}
        </motion.div>

        {/* Map placeholder */}
        <motion.div
          className="w-full h-[280px] md:h-[360px] lg:h-[428px] rounded-2xl overflow-hidden bg-[#263a30]"
          data-testid="map-container"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843.8!2d-56.08!3d-15.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPousada+Itaicy+Pantanal!5e0!3m2!1spt-BR!2sbr"
            className="w-full h-full border-0 rounded-2xl"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Pousada Itaicy Pantanal"
          />
        </motion.div>
      </div>
    </section>
  );
};

