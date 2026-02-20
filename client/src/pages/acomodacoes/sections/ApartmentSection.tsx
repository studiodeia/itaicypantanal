import { motion } from "framer-motion";
import { ChevronRight, type LucideIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { fadeUp, scaleIn, stagger, viewport } from "@/lib/motion";
import { buildCloudbedsBookingUrl } from "@/lib/booking/cloudbeds";

interface ApartmentFeature {
  icon: LucideIcon;
  label: string;
}

interface ApartmentSectionProps {
  title: string;
  description: string;
  features: ApartmentFeature[];
  image: string;
  ctaText?: string;
  imagePosition?: "left" | "right";
}

export const ApartmentSection = ({
  title,
  description,
  features,
  image,
  ctaText = "Verificar disponibilidade",
  imagePosition = "left",
}: ApartmentSectionProps): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full">
      <div className="flex flex-col max-w-[1440px] items-center px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <motion.div
          className={cn(
            "flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-[100px] w-full items-center",
            imagePosition === "right" && "lg:flex-row-reverse"
          )}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* Image */}
          <motion.div className="w-full lg:w-1/2 aspect-[4/3] rounded-xl overflow-hidden" variants={scaleIn}>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              data-testid={`img-apartment-${title.toLowerCase().replace(/\s+/g, "-")}`}
            />
          </motion.div>

          {/* Content */}
          <motion.div className="w-full lg:w-1/2 flex flex-col gap-6 md:gap-8" variants={fadeUp}>
            <h2
              className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
              data-testid={`text-apartment-title-${title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {title}
            </h2>

            <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              {description}
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 p-2 bg-[rgba(10,19,12,0.2)] rounded-lg font-body-sm font-[number:var(--body-sm-font-weight)] text-[#cfebdd] text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]"
                >
                  <feature.icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                  {feature.label}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-6 pt-2">
              <div className="w-full h-px bg-[rgba(168,202,185,0.2)]" />
              <a
                href={buildCloudbedsBookingUrl({ utmContent: "acomodacoes_section_verificar_disponibilidade" })}
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover inline-flex items-center gap-2 font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)] w-fit group"
                data-testid={`link-apartment-cta-${title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {ctaText}
                <ChevronRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

