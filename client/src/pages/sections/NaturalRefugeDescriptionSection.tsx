import { Separator } from "@/components/ui/separator";

const impactItems = [
  {
    number: "01",
    title: "Biodiversidade Exclusiva",
    description:
      "Acesso a áreas protegidas onde 166 espécies de aves foram catalogadas.",
  },
  {
    number: "02",
    title: "Apoio Comunitário",
    description:
      "Parte de nossa receita é revertida diretamente para as comunidades indígenas locais.",
  },
  {
    number: "03",
    title: "Preservação Oficial",
    description:
      "Somos os únicos com autorização do IBAMA para operar em milhões de hectares protegidos.",
  },
];

export const NaturalRefugeDescriptionSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center w-full bg-[#fcf4ed]">
      <div className="flex flex-col lg:flex-row max-w-[1440px] items-center gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <div className="w-full lg:flex-1 lg:max-w-[780px] h-[464px] md:min-h-[400px] lg:h-[816px] bg-[url(/figmaAssets/img-1.png)] bg-cover bg-center rounded-lg" data-testid="img-impact" />

        <div className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[32px] py-8 lg:py-[32px] flex-1 w-full">
          <p className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#446354] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]" data-testid="text-impact-label">
            NOSSO IMPACTO
          </p>

          <h2 className="self-stretch text-[#263a30] font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)]" data-testid="text-impact-heading">
            Compromisso com a Natureza, Impacto na Comunidade
          </h2>

          <div className="flex flex-col items-start gap-6 md:gap-8 lg:gap-[32px] self-stretch w-full">
            {impactItems.map((item, index) => (
              <div key={item.number} className={index > 0 ? "border-t border-[#a8cab9] pt-6 lg:pt-[24px] w-full" : "w-full"}>
                <div className="flex items-start gap-4 md:gap-6 lg:gap-[24px]">
                  <div className="flex w-[32px] items-start pt-[6px]">
                    <span className="flex-1 [font-family:'Lato',Helvetica] font-normal text-[#8aad9c] text-[14px] leading-[20px]">
                      {item.number}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col items-start gap-2 lg:gap-[8px]">
                    <h3 className="self-stretch [font-family:'Playfair_Display',Helvetica] font-medium text-[#263a30] text-[length:var(--heading-sm-font-size)] lg:text-[24px] tracking-[var(--heading-sm-letter-spacing)] leading-[var(--heading-sm-line-height)] lg:leading-[32px]" data-testid={`text-impact-title-${item.number}`}>
                      {item.title}
                    </h3>

                    <p className="self-stretch [font-family:'Lato',Helvetica] font-normal text-[#446354] text-[length:var(--body-md-font-size)] lg:text-[18px] tracking-[0] leading-[var(--body-md-line-height)] lg:leading-[28px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
