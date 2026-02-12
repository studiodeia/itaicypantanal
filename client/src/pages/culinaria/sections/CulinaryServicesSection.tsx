import { motion } from "framer-motion";
import { stagger, fadeIn, fadeUp, cardItem, viewport } from "@/lib/motion";
import { OptimizedImage } from "@/components/OptimizedImage";

const services = [
  {
    src: "/images/culinaria-services-1",
    title: "Café da Manhã com Vista",
    description: "Desfrute do seu café observando o despertar do Pantanal.",
    large: true,
  },
  {
    src: "/images/culinaria-services-2",
    title: "Almoço no Refúgio",
    large: false,
  },
  {
    src: "/images/culinaria-services-3",
    title: "Jantar à Luz de Velas",
    large: false,
  },
];

export const CulinaryServicesSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full bg-[#344e41]">
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
            data-testid="text-services-label"
            variants={fadeIn}
          >
            NOSSOS SERVIÇOS
          </motion.span>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-[100px] items-start lg:items-center">
            <motion.h2
              className="lg:w-[664px] shrink-0 font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
              data-testid="text-services-heading"
              variants={fadeUp}
            >
              O Ciclo da Sua Imersão Gastronômica
            </motion.h2>
            <motion.p
              className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]"
              variants={fadeUp}
            >
              Da alvorada ao anoitecer, sua experiência gastronômica está inclusa
              e conectada à sua expedição.
            </motion.p>
          </div>
        </motion.div>

        {/* Service cards — 1 large + 2 small */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-[32px] h-auto md:h-[500px] lg:h-[740px]"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className={`relative overflow-hidden rounded-lg ${
                service.large
                  ? "w-full md:w-1/2 h-[300px] md:h-full"
                  : "w-full md:flex-1 h-[250px] md:h-full"
              }`}
              data-testid={`card-service-${idx}`}
              variants={cardItem}
            >
              <OptimizedImage
                src={service.src}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(21,34,24,0.88) 32.8%, rgba(21,34,24,0) 75.5%)",
                }}
              />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 lg:p-[32px] flex flex-col gap-3 md:gap-5">
                <h3
                  className="font-heading-md font-[number:var(--heading-md-font-weight)] text-[#e3f7ec] text-[length:var(--heading-md-font-size)] leading-[var(--heading-md-line-height)] tracking-[var(--heading-md-letter-spacing)] [font-style:var(--heading-md-font-style)]"
                  style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
                >
                  {service.title}
                </h3>
                {service.description && (
                  <p className="max-w-[355px] font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
                    {service.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
