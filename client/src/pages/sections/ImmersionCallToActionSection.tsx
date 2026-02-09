import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ImmersionCallToActionSection = (): JSX.Element => {
  return (
    <section className="items-center flex-[0_0_auto] z-[1] bg-[linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%),url(..//figmaAssets/section---cta.png)_50%_50%_/_cover] flex flex-col relative w-full">
      <div className="flex flex-col max-w-[1440px] h-[844px] md:min-h-[800px] md:h-auto lg:min-h-[1000px] items-start justify-between px-5 md:px-8 lg:px-10 py-12 md:py-16 lg:py-[100px] relative w-full">
        <h2 className="max-w-full md:max-w-[520px] lg:max-w-[684px] text-[#e3f7ec] relative font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)]" data-testid="text-cta-heading">
          Sua imersão no Pantanal selvagem começa aqui.
        </h2>

        <div className="flex flex-col w-full md:max-w-[520px] lg:max-w-[592px] items-start gap-8 md:gap-10 lg:gap-12 relative mt-8 md:mt-0">
          <p className="relative self-stretch font-body-lg font-[number:var(--body-lg-font-weight)] text-[#e3f7ec] text-[20px] md:text-[length:var(--body-lg-font-size)] leading-[1.5] md:leading-[var(--body-lg-line-height)] tracking-[var(--body-lg-letter-spacing)] [font-style:var(--body-lg-font-style)]">
            Uma experiência autêntica de ecoturismo, observação de aves ou pesca
            esportiva espera por você. Selecione as datas da sua expedição e
            garanta seu lugar em nosso refúgio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0 p-5 sm:pl-3 md:pl-5 sm:pr-2 sm:py-2 relative self-stretch w-full bg-[#0a130b33] rounded-lg backdrop-blur-[2.0px] backdrop-brightness-[110%] [-webkit-backdrop-filter:blur(2.0px)_brightness(110%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)]">
            <div className="inline-flex items-center gap-2 md:gap-3.5 relative">
              <CalendarIcon className="relative w-5 h-5 md:w-7 md:h-7 text-[#e3f7ec]" />

              <div className="inline-flex items-center justify-center gap-2 relative">
                <span className="relative flex items-center justify-center w-fit font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] whitespace-nowrap [font-style:var(--functional-md-font-style)]" data-testid="text-cta-date-range">
                  23/04/2025 - 24/05/2025
                </span>
              </div>
            </div>

            <Button className="inline-flex items-center justify-center gap-2 px-3 md:px-4 py-1.5 relative bg-[#ac8042] rounded h-auto w-full sm:w-auto" data-testid="button-buscar-datas-cta">
              <span className="text-[#f2fcf7] text-[length:var(--functional-md-font-size)] leading-[var(--functional-md-line-height)] relative flex items-center justify-center w-fit font-functional-md font-[number:var(--functional-md-font-weight)] tracking-[var(--functional-md-letter-spacing)] whitespace-nowrap [font-style:var(--functional-md-font-style)]">
                Buscar datas
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
