import { ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const expeditions = [
  {
    title: "Pesca Esportiva Cota Zero",
    description:
      "Em águas privativas, a pesca transcende, uma imersão tática com guias que leem o rio.",
    backgroundImage: "url(..//figmaAssets/image.png)",
    width: "w-[664px]",
  },
  {
    title: "Birdwatching",
    description: null,
    backgroundImage: "url(..//figmaAssets/image-1.png)",
    width: "flex-1",
  },
  {
    title: "Ecoturismo",
    description: null,
    backgroundImage: "url(..//figmaAssets/image-2.png)",
    width: "flex-1",
  },
];

export const ExclusiveExpeditionsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-end w-full bg-[#344e41]">
      <div className="flex flex-col max-w-[1440px] items-center justify-end gap-[100px] px-16 py-[100px] w-full">
        <header className="flex flex-col items-start gap-8 w-full">
          <p className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]">
            NOSSOS SERVIÇOS
          </p>

          <div className="flex items-center gap-[100px] w-full">
            <h2 className="w-[664px] font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]">
              Expedições Exclusivas no Coração do Pantanal
            </h2>

            <p className="flex-1 font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              Nossas atividades são desenhadas para uma conexão profunda com o
              ecossistema. Escolha a sua expedição.
            </p>
          </div>
        </header>

        <div className="flex w-[1360px] h-[740px] items-center gap-8 ml-[-24.00px] mr-[-24.00px]">
          {expeditions.map((expedition, index) => (
            <Card
              key={index}
              className={`${expedition.width} h-full rounded-lg overflow-hidden border-0 bg-[linear-gradient(0deg,rgba(21,34,24,0.5)_0%,rgba(21,34,24,0)_100%),linear-gradient(0deg,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0.32)_100%),${expedition.backgroundImage}] bg-center bg-cover`}
            >
              <CardContent className="flex flex-col justify-end h-full p-8">
                <div className="flex flex-col items-start gap-10">
                  <div className="flex flex-col items-start gap-5 w-full">
                    <h3 className="font-heading-md font-[number:var(--heading-md-font-weight)] text-[#e3f7ec] text-[length:var(--heading-md-font-size)] tracking-[var(--heading-md-letter-spacing)] leading-[var(--heading-md-line-height)] [font-style:var(--heading-md-font-style)]">
                      {expedition.title}
                    </h3>

                    {expedition.description && (
                      <p className="w-[355px] font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
                        {expedition.description}
                      </p>
                    )}
                  </div>

                  <button className="flex items-center justify-between w-full py-4 border-b border-[#f2fcf7] cursor-pointer hover:opacity-80 transition-opacity">
                    <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
                      Mais detalhes
                    </span>
                    <ChevronRightIcon className="w-6 h-6 text-[#e3f7ec]" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
