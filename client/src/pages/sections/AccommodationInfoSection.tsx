import { Button } from "@/components/ui/button";

export const AccommodationInfoSection = (): JSX.Element => {
  return (
    <section className="h-[868px] md:min-h-[600px] md:h-auto lg:min-h-[740px] items-start justify-end md:justify-center z-[6] bg-[linear-gradient(270deg,rgba(21,34,24,0)_0%,rgba(21,34,24,0.64)_100%),linear-gradient(0deg,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0.32)_100%),url(..//figmaAssets/section---acomoda--es.png)] bg-cover bg-center flex flex-col w-full">
      <div className="flex max-w-[1440px] mx-auto items-center gap-8 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-10 py-12 md:py-16 lg:py-[100px] w-full">
        <div className="flex-1 flex flex-col items-start gap-6 md:gap-8">
          <p className="w-fit font-lead-md font-[number:var(--lead-md-font-weight)] text-[#e3f7ec] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]" data-testid="text-accommodations-label">
            ACOMODAÇÕES
          </p>

          <h2 className="max-w-[582px] text-[#e3f7ec] font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)]" data-testid="text-accommodations-heading">
            Descanso autêntico no coração selvagem
          </h2>

          <p className="font-body-lg font-[number:var(--body-lg-font-weight)] text-[#e3f7ec] text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] [font-style:var(--body-lg-font-style)]">
            Nossas acomodações são projetadas para o descanso e a imersão.
            Confortáveis, climatizadas e com vista para a natureza intocada,
            elas são o ponto de partida perfeito para sua aventura no Pantanal.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 lg:gap-8">
            <Button className="h-auto bg-[#ac8042] text-[#f2fcf7] text-lg md:text-xl lg:text-2xl leading-7 md:leading-8 [font-family:'Lato',Helvetica] font-semibold tracking-[0] px-5 md:px-6 py-2.5 md:py-3 rounded-md" data-testid="button-reservar-accommodations">
              Reservar
            </Button>

            <Button
              variant="outline"
              className="h-auto bg-transparent text-[#e3f7ec] border-[#f2fcf7] text-lg md:text-xl lg:text-2xl leading-7 md:leading-8 [font-family:'Lato',Helvetica] font-semibold tracking-[0] px-5 md:px-6 py-2.5 md:py-3 rounded-md"
              data-testid="button-accommodations-details"
            >
              Mais detalhes
            </Button>
          </div>
        </div>

        <div className="hidden lg:block w-[630px] h-full rounded-lg" />
      </div>
    </section>
  );
};
