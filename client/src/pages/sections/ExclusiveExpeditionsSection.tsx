import { ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const expeditions = [
  {
    title: "Pesca Esportiva Cota Zero",
    description:
      "Em águas privativas, a pesca transcende, uma imersão tática com guias que leem o rio.",
    backgroundImage: "url(..//figmaAssets/image.png)",
  },
  {
    title: "Birdwatching",
    description: null,
    backgroundImage: "url(..//figmaAssets/image-1.png)",
  },
  {
    title: "Ecoturismo",
    description: null,
    backgroundImage: "url(..//figmaAssets/image-2.png)",
  },
];

export const ExclusiveExpeditionsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-end w-full bg-[#344e41]">
      <div className="flex flex-col max-w-[1440px] items-center justify-end gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-10 py-12 md:py-16 lg:py-[100px] w-full">
        <header className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[32px] w-full">
          <p className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]" data-testid="text-services-label">
            NOSSOS SERVIÇOS
          </p>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 md:gap-6 lg:gap-[100px] w-full">
            <h2 className="w-full lg:w-[664px] font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]" data-testid="text-services-heading">
              Expedições Exclusivas no Coração do Pantanal
            </h2>

            <p className="w-full lg:flex-1 font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              Nossas atividades são desenhadas para uma conexão profunda com o
              ecossistema. Escolha a sua expedição.
            </p>
          </div>
        </header>

        <div className="flex flex-col md:flex-row w-full items-center gap-4 md:gap-6 lg:gap-[18px]">
          {expeditions.map((expedition, index) => (
            <Card
              key={index}
              className={`w-full ${index === 0 ? 'md:w-[55%] lg:w-[664px]' : 'md:flex-1 lg:w-[330px]'} h-[464px] md:h-[500px] lg:h-[740px] rounded-lg overflow-hidden border-0 bg-[linear-gradient(0deg,rgba(21,34,24,0.5)_0%,rgba(21,34,24,0)_100%),linear-gradient(0deg,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0.32)_100%),${expedition.backgroundImage}] bg-center bg-cover`}
              data-testid={`card-expedition-${index}`}
            >
              <CardContent className="flex flex-col justify-end h-full p-5 md:p-6 lg:p-[32px]">
                <div className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[40px]">
                  <div className="flex flex-col items-start gap-3 md:gap-5 lg:gap-[20px] w-full">
                    <h3 className="font-heading-md font-[number:var(--heading-md-font-weight)] text-[#e3f7ec] text-[length:var(--heading-md-font-size)] tracking-[var(--heading-md-letter-spacing)] leading-[var(--heading-md-line-height)] [font-style:var(--heading-md-font-style)]">
                      {expedition.title}
                    </h3>

                    {expedition.description && (
                      <p className="max-w-[355px] font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
                        {expedition.description}
                      </p>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    className="flex items-center justify-between w-full py-3 md:py-4 lg:h-[56px] lg:py-[12px] px-0 lg:px-[24px] border-b lg:border-b-0 border-[#f2fcf7] rounded-none lg:rounded-[6px] h-auto"
                    data-testid={`button-expedition-details-${index}`}
                  >
                    <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] lg:text-[#f2fcf7] text-[length:var(--functional-md-font-size)] lg:text-[24px] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] lg:leading-[32px] [font-style:var(--functional-md-font-style)] [font-family:'Lato',Helvetica] lg:font-semibold">
                      Quero conhecer
                    </span>
                    <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-[#e3f7ec] lg:text-[#f2fcf7]" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
