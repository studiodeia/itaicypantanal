import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    title: "Titulo impactante",
    quote:
      '"Elegância essencial em harmonia com o bioma. Uma experiência de imersão autêntica, sem excessos e sem concessões.Elegância essencial em harmonia com o bioma. Uma experiência de imersão autêntica, sem excessos e sem concessões."',
    author: "Lucas Vieira, BRA",
    stars: [
      "/figmaAssets/star-8.svg",
      "/figmaAssets/star-5.svg",
      "/figmaAssets/star-16.svg",
      "/figmaAssets/star-2.svg",
      "/figmaAssets/star-9.svg",
    ],
  },
  {
    title: "Titulo impactante",
    quote:
      '"Elegância essencial em harmonia com o bioma. Uma experiência de imersão autêntica, sem excessos e sem concessões.Elegância essencial em harmonia com o bioma. Uma experiência de imersão autêntica, sem excessos e sem concessões."',
    author: "Lucas Vieira, BRA",
    stars: [
      "/figmaAssets/star-10.svg",
      "/figmaAssets/star-24.svg",
      "/figmaAssets/star-21.svg",
      "/figmaAssets/star-11.svg",
      "/figmaAssets/star-13.svg",
    ],
  },
  {
    title: "Titulo impactante",
    quote:
      '"Elegância essencial em harmonia com o bioma. Uma experiência de imersão autêntica, sem excessos e sem concessões.Elegância essencial em harmonia com o bioma. Uma experiência de imersão autêntica, sem excessos e sem concessões."',
    author: "Lucas Vieira, BRA",
    stars: [
      "/figmaAssets/star-1.svg",
      "/figmaAssets/star-4.svg",
      "/figmaAssets/star-15.svg",
      "/figmaAssets/star-3.svg",
      "/figmaAssets/star-7.svg",
    ],
  },
  {
    title: "Titulo impactante",
    quote:
      '"Elegância essencial em harmonia com o bioma. Uma experiência de imersão autêntica, sem excessos e sem concessões.Elegância essencial em harmonia com o bioma. Uma experiência de imersão autêntica, sem excessos e sem concessões."',
    author: "Lucas Vieira, BRA",
    stars: [
      "/figmaAssets/star-20.svg",
      "/figmaAssets/star-17.svg",
      "/figmaAssets/star-14.svg",
      "/figmaAssets/star-12.svg",
      "/figmaAssets/star-19.svg",
    ],
  },
  {
    title: "Titulo impactante",
    quote:
      '"Elegância essencial em harmonia com o bioma. Uma experiência de imersão autêntica, sem excessos e sem concessões.Elegância essencial em harmonia com o bioma. Uma experiência de imersão autêntica, sem excessos e sem concessões."',
    author: "Lucas Vieira, BRA",
    stars: [
      "/figmaAssets/star-23.svg",
      "/figmaAssets/star-18.svg",
      "/figmaAssets/star-22.svg",
      "/figmaAssets/star.svg",
      "/figmaAssets/star-6.svg",
    ],
  },
];

export const ImmersionTestimonialsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-end bg-[#344e41] w-full">
      <div className="flex flex-col max-w-[1440px] items-center justify-end gap-[100px] px-16 py-[100px] w-full">
        <div className="flex flex-col items-start gap-8 w-full">
          <div className="flex items-center justify-center w-fit font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] whitespace-nowrap [font-style:var(--lead-md-font-style)]">
            DEPOIMENTOS
          </div>

          <div className="flex items-center gap-[100px] w-full">
            <h2 className="w-[664px] font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] flex items-center justify-center tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]">
              Relatos de quem viveu a real imersão
            </h2>

            <p className="flex-1 font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] flex items-center justify-center tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              O que nossos viajantes dizem sobre a experiência autêntica de se
              desconectar na natureza selvagem da Itaicy Ecoturismo.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 w-full overflow-x-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="flex-shrink-0 w-[443px] h-[464px] bg-[#263a30] border-none rounded-lg overflow-hidden"
            >
              <CardContent className="flex flex-col items-start justify-between h-full p-8 gap-[34px]">
                <div className="flex flex-col items-start gap-8 w-full">
                  <h3 className="flex items-center justify-center w-full font-heading-md font-[number:var(--heading-md-font-weight)] text-[#e3f7ec] text-[length:var(--heading-md-font-size)] tracking-[var(--heading-md-letter-spacing)] leading-[var(--heading-md-line-height)] [font-style:var(--heading-md-font-style)]">
                    {testimonial.title}
                  </h3>

                  <blockquote className="flex items-center justify-center w-full font-body-lg font-[number:var(--body-lg-font-weight)] text-[#a8cab9] text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] [font-style:var(--body-lg-font-style)]">
                    {testimonial.quote}
                  </blockquote>
                </div>

                <div className="flex flex-col items-start gap-1 w-[379px]">
                  <p className="flex items-center justify-center w-full font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
                    {testimonial.author}
                  </p>

                  <div className="inline-flex items-center">
                    {testimonial.stars.map((star, starIndex) => (
                      <img
                        key={starIndex}
                        className="w-5 h-5"
                        alt="Star"
                        src={star}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
