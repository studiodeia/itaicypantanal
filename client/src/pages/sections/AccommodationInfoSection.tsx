import { Button } from "@/components/ui/button";

export const AccommodationInfoSection = (): JSX.Element => {
  return (
    <section className="min-h-[740px] items-start justify-center z-[6] bg-[linear-gradient(270deg,rgba(21,34,24,0)_0%,rgba(21,34,24,0.64)_100%),linear-gradient(0deg,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0.32)_100%),url(..//figmaAssets/section---acomoda--es.png)] bg-cover bg-center flex flex-col w-full">
      <div className="flex max-w-[1440px] mx-auto items-center gap-[100px] px-16 py-[100px] w-full">
        <div className="flex-1 flex flex-col items-start gap-8">
          <p className="w-fit font-lead-md font-[number:var(--lead-md-font-weight)] text-[#e3f7ec] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]">
            ACOMODAÇÕES
          </p>

          <h2 className="max-w-[582px] text-[#e3f7ec] font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)]">
            Descanso autêntico no coração selvagem
          </h2>

          <p className="font-body-lg font-[number:var(--body-lg-font-weight)] text-[#e3f7ec] text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] [font-style:var(--body-lg-font-style)]">
            Nossas acomodações são projetadas para o descanso e a imersão.
            Confortáveis, climatizadas e com vista para a natureza intocada,
            elas são o ponto de partida perfeito para sua aventura no Pantanal.
          </p>

          <div className="flex items-start gap-8">
            <Button className="h-auto bg-[#ac8042] hover:bg-[#8f6a36] text-[#f2fcf7] text-2xl leading-8 [font-family:'Lato',Helvetica] font-semibold tracking-[0] px-6 py-3 rounded-md">
              Reservar
            </Button>

            <Button
              variant="outline"
              className="h-auto bg-transparent hover:bg-[#e3f7ec]/10 text-[#e3f7ec] border-[#f2fcf7] text-2xl leading-8 [font-family:'Lato',Helvetica] font-semibold tracking-[0] px-6 py-3 rounded-md"
            >
              Mais detalhes
            </Button>
          </div>
        </div>

        <div className="w-[630px] h-full rounded-lg" />
      </div>
    </section>
  );
};
