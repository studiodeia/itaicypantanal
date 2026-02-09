import { Separator } from "@/components/ui/separator";

const features = [
  {
    number: "01",
    title: "Sustentabilidade",
    description: "Práticas eco-friendly em todas as nossas operações",
  },
  {
    number: "02",
    title: "Excelência",
    description: "Guias especializados e equipamentos de primeira linha",
  },
  {
    number: "03",
    title: "Hospitalidade",
    description: "Atendimento personalizado para cada hóspede",
  },
];

export const AuthenticRestSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center w-full bg-[#263a30]">
      <div className="flex max-w-[1440px] items-center gap-[100px] px-16 py-[100px] w-full">
        <div className="flex-1 max-w-[780px] h-full min-h-[600px] rounded-lg bg-[url(/figmaAssets/img.png)] bg-cover bg-center" />

        <div className="flex flex-col items-start gap-8 py-8 flex-1">
          <p className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]">
            SOBRE NÓS
          </p>

          <h2 className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)]">
            Bem-vindo ao Nosso Refúgio Natural
          </h2>

          <div className="flex flex-col items-start gap-6 w-full">
            <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
              Localizada no coração de uma das regiões mais biodiversas do
              mundo, nossa pousada oferece uma experiência única de conexão com
              a natureza.
            </p>

            <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
              Com mais de 15 anos de experiência em ecoturismo, nos dedicamos a
              proporcionar momentos inesquecíveis enquanto preservamos e
              protegemos nosso ambiente natural.
            </p>
          </div>

          <div className="flex flex-col gap-8 w-full">
            {features.map((feature, index) => (
              <div key={feature.number}>
                {index > 0 && <Separator className="bg-[#446354] mb-8" />}
                <div className="flex items-start gap-6">
                  <div className="flex w-8 pt-1.5">
                    <span className="font-body-xs font-[number:var(--body-xs-font-weight)] text-[#6c927f] text-[length:var(--body-xs-font-size)] tracking-[var(--body-xs-letter-spacing)] leading-[var(--body-xs-line-height)] [font-style:var(--body-xs-font-style)]">
                      {feature.number}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[#e3f7ec] text-[length:var(--heading-sm-font-size)] tracking-[var(--heading-sm-letter-spacing)] leading-[var(--heading-sm-line-height)] [font-style:var(--heading-sm-font-style)]">
                      {feature.title}
                    </h3>

                    <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
                      {feature.description}
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
