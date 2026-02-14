import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "@/lib/icons";
import { useSharedCmsSections } from "@/lib/cms/shared-content";
import { fadeIn, fadeUp, stagger, cardItem, viewport } from "@/lib/motion";

export const ImmersionTestimonialsSection = (): JSX.Element => {
  const { testimonials } = useSharedCmsSections();

  return (
    <section className="flex flex-col items-center justify-end bg-[#344e41] w-full">
      <div className="flex flex-col max-w-[1440px] items-center justify-end gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-10 py-12 md:py-16 lg:py-[100px] w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[32px] w-full lg:px-[24px]"
        >
          <motion.div
            variants={fadeIn}
            className="flex items-center w-fit font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] whitespace-nowrap [font-style:var(--lead-md-font-style)]"
            data-testid="text-testimonials-label"
          >
            {testimonials.label}
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 md:gap-6 lg:gap-[100px] w-full">
            <motion.h2
              variants={fadeUp}
              className="w-full lg:w-[664px] font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
              data-testid="text-testimonials-heading"
            >
              {testimonials.heading}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="w-full lg:flex-1 font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]"
            >
              {testimonials.description}
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex items-center gap-4 md:gap-6 lg:gap-[32px] w-full overflow-x-auto pb-4 scrollbar-hide"
        >
          {testimonials.items.map((item, index) => (
            <motion.div key={index} variants={cardItem} className="flex-shrink-0">
              <Card
                className="flex-shrink-0 w-[310px] md:w-[360px] lg:w-[443px] h-[400px] md:h-[420px] lg:h-[464px] bg-[#263a30] border-none rounded-lg overflow-hidden"
                data-testid={`card-testimonial-${index}`}
              >
                <CardContent className="flex flex-col items-start justify-between h-full p-8 md:p-6 lg:p-[32px] gap-6 md:gap-8 lg:gap-[32px]">
                  <div className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[32px] w-full">
                    <h3 className="w-full font-heading-md font-[number:var(--heading-md-font-weight)] text-[#e3f7ec] text-[length:var(--heading-md-font-size)] tracking-[var(--heading-md-letter-spacing)] leading-[var(--heading-md-line-height)] [font-style:var(--heading-md-font-style)]">
                      {item.title}
                    </h3>

                    <blockquote className="w-full font-body-lg font-[number:var(--body-lg-font-weight)] text-[#a8cab9] text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] [font-style:var(--body-lg-font-style)] line-clamp-5">
                      {item.quote}
                    </blockquote>
                  </div>

                  <div className="flex flex-col items-start gap-1 w-full">
                    <p className="w-full font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
                      {item.author}
                    </p>

                    <div className="inline-flex items-center">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="w-4 h-4 md:w-5 md:h-5 text-[#d6a35d]"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
