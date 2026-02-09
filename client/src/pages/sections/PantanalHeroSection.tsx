import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const navigationItems = [
  { label: "Início", active: true, hasDropdown: false },
  { label: "Hospedagens", active: false, hasDropdown: true },
  { label: "Experiências", active: false, hasDropdown: true },
  { label: "Nosso impacto", active: false, hasDropdown: false },
  { label: "Contato", active: false, hasDropdown: false },
  { label: "Blog", active: false, hasDropdown: false },
];

export const PantanalHeroSection = (): JSX.Element => {
  return (
    <section className="relative flex flex-col h-[740px] items-center justify-end w-full z-[11] overflow-hidden bg-[linear-gradient(0deg,rgba(21,34,24,0.5)_0%,rgba(21,34,24,0)_100%),linear-gradient(180deg,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0)_100%),linear-gradient(0deg,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0.32)_100%)]">
      <header className="absolute top-0 left-0 w-full flex flex-col items-center justify-center gap-2 px-10 py-8">
        <nav className="flex max-w-[1360px] items-center justify-between w-full">
          <img
            className="w-[130.43px] h-10"
            alt="Logo"
            src="/figmaAssets/logo.svg"
          />

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="h-auto gap-2 px-3 py-2.5 text-[#a8cab9] hover:text-[#e3f7ec] hover:bg-transparent font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]"
            >
              PT
              <ChevronDownIcon className="w-7 h-7" />
            </Button>

            <Button className="h-auto gap-2 px-3 py-1.5 bg-[#ac8042] hover:bg-[#ac8042]/90 text-[#f2fcf7] rounded font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
              Reservar
            </Button>
          </div>

          <div className="absolute top-[calc(50.00%_-_24px)] left-[calc(50.00%_-_344px)] flex items-center">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`h-auto gap-2 px-3 py-2.5 rounded-lg hover:bg-transparent ${
                  item.active
                    ? "text-[#e3f7ec] hover:text-[#e3f7ec]"
                    : "text-[#a8cab9] hover:text-[#e3f7ec]"
                } font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]`}
              >
                {item.label}
                {item.hasDropdown && <ChevronDownIcon className="w-7 h-7" />}
              </Button>
            ))}
          </div>
        </nav>
      </header>

      <div className="flex max-w-[1440px] items-end justify-center gap-[100px] px-16 py-[100px] w-full flex-1">
        <div className="flex flex-col h-[260px] items-start justify-between flex-1">
          <h1 className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] text-[#e3f7ec] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]">
            O Pantanal como você nunca sentiu.
          </h1>

          <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] text-[#e3f7ec] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
            Elegância essencial em harmonia com o bioma. Uma experiência de
            imersão autêntica, sem excessos e sem concessões.
          </p>
        </div>

        <Card className="w-[522px] h-[260px] bg-[#0a130b33] rounded-lg backdrop-blur-[2.0px] backdrop-brightness-[110%] [-webkit-backdrop-filter:blur(2.0px)_brightness(110%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] border-0">
          <CardContent className="flex flex-col items-start gap-10 p-8 h-full">
            <div className="flex flex-col items-start gap-4 w-full">
              <h2 className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[#e3f7ec] text-[length:var(--heading-sm-font-size)] tracking-[var(--heading-sm-letter-spacing)] leading-[var(--heading-sm-line-height)] [font-style:var(--heading-sm-font-style)]">
                Procure por uma data especial
              </h2>

              <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                Elegância essencial em harmonia com o bioma. Uma experiência de
                imersão autêntica, sem
              </p>
            </div>

            <div className="flex h-14 items-center justify-between pl-5 pr-2 py-2 w-full bg-[#0a130b33] rounded-lg">
              <div className="flex items-center gap-3.5">
                <CalendarIcon className="w-7 h-7 text-[#e3f7ec]" />

                <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] whitespace-nowrap [font-style:var(--functional-md-font-style)]">
                  23/04/2025 - 24/05/2025
                </span>
              </div>

              <Button className="h-auto gap-2 px-4 py-1.5 bg-[#ac8042] hover:bg-[#ac8042]/90 rounded text-[#f2fcf7] font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] whitespace-nowrap [font-style:var(--functional-md-font-style)]">
                Buscar datas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
