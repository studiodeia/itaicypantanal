import { CalendarIcon, ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const navigationItems = [
  { label: "Início", active: true, hasDropdown: false },
  { label: "Hospedagens", active: false, hasDropdown: true },
  { label: "Experiências", active: false, hasDropdown: true },
  { label: "Nosso impacto", active: false, hasDropdown: false },
  { label: "Contato", active: false, hasDropdown: false },
  { label: "Blog", active: false, hasDropdown: false },
];

export const PantanalHeroSection = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative flex flex-col h-[600px] md:h-[680px] lg:h-[740px] items-center justify-end w-full z-[11] overflow-hidden bg-[linear-gradient(0deg,rgba(21,34,24,0.5)_0%,rgba(21,34,24,0)_100%),linear-gradient(180deg,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0)_100%),linear-gradient(0deg,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0.32)_100%)]">
      <header className="absolute top-0 left-0 w-full flex flex-col items-center justify-center gap-2 px-4 md:px-8 lg:px-10 py-4 md:py-6 lg:py-8 z-20">
        <nav className="flex max-w-[1360px] items-center justify-between w-full">
          <img
            className="w-[100px] md:w-[115px] lg:w-[130.43px] h-auto"
            alt="Logo"
            src="/figmaAssets/logo.svg"
            data-testid="img-logo"
          />

          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              className="h-auto gap-1 md:gap-2 px-2 md:px-3 py-2 md:py-2.5 text-[#a8cab9] font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]"
              data-testid="button-language"
            >
              PT
              <ChevronDownIcon className="w-5 h-5 md:w-7 md:h-7" />
            </Button>

            <Button
              className="h-auto gap-2 px-3 py-1.5 bg-[#ac8042] text-[#f2fcf7] rounded font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]"
              data-testid="button-reservar-hero"
            >
              Reservar
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-[#e3f7ec]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </Button>
          </div>

          <div className="hidden lg:flex absolute top-[calc(50.00%_-_24px)] left-[calc(50.00%_-_344px)] items-center">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`h-auto gap-2 px-3 py-2.5 rounded-lg ${
                  item.active
                    ? "text-[#e3f7ec]"
                    : "text-[#a8cab9]"
                } font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]`}
                data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
                {item.hasDropdown && <ChevronDownIcon className="w-7 h-7" />}
              </Button>
            ))}
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden flex flex-col items-start w-full max-w-[1360px] bg-[#152218cc] backdrop-blur-md rounded-lg p-4 mt-2">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`h-auto w-full justify-start gap-2 px-3 py-3 rounded-lg ${
                  item.active
                    ? "text-[#e3f7ec]"
                    : "text-[#a8cab9]"
                } font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]`}
                data-testid={`link-mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
                {item.hasDropdown && <ChevronDownIcon className="w-5 h-5" />}
              </Button>
            ))}
          </div>
        )}
      </header>

      <div className="flex flex-col lg:flex-row max-w-[1440px] items-end justify-center gap-8 lg:gap-[100px] px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-[100px] w-full flex-1">
        <div className="flex flex-col items-start justify-end gap-4 lg:gap-0 lg:h-[260px] lg:justify-between flex-1">
          <h1 className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] text-[#e3f7ec] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]" data-testid="text-hero-heading">
            O Pantanal como você nunca sentiu.
          </h1>

          <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] text-[#e3f7ec] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]" data-testid="text-hero-subtitle">
            Elegância essencial em harmonia com o bioma. Uma experiência de
            imersão autêntica, sem excessos e sem concessões.
          </p>
        </div>

        <Card className="w-full lg:w-[522px] bg-[#0a130b33] rounded-lg backdrop-blur-[2.0px] backdrop-brightness-[110%] [-webkit-backdrop-filter:blur(2.0px)_brightness(110%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] border-0" data-testid="card-booking">
          <CardContent className="flex flex-col items-start gap-6 lg:gap-10 p-5 md:p-6 lg:p-8">
            <div className="flex flex-col items-start gap-3 md:gap-4 w-full">
              <h2 className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[#e3f7ec] text-[length:var(--heading-sm-font-size)] tracking-[var(--heading-sm-letter-spacing)] leading-[var(--heading-sm-line-height)] [font-style:var(--heading-sm-font-style)]" data-testid="text-booking-heading">
                Procure por uma data especial
              </h2>

              <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]" data-testid="text-booking-description">
                Elegância essencial em harmonia com o bioma. Uma experiência de
                imersão autêntica, sem
              </p>
            </div>

            <div className="flex h-12 md:h-14 items-center justify-between pl-3 md:pl-5 pr-2 py-2 w-full bg-[#0a130b33] rounded-lg">
              <div className="flex items-center gap-2 md:gap-3.5">
                <CalendarIcon className="w-5 h-5 md:w-7 md:h-7 text-[#e3f7ec]" />

                <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] whitespace-nowrap [font-style:var(--functional-md-font-style)]" data-testid="text-date-range">
                  23/04/2025 - 24/05/2025
                </span>
              </div>

              <Button className="h-auto gap-2 px-3 md:px-4 py-1.5 bg-[#ac8042] rounded text-[#f2fcf7] font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] whitespace-nowrap [font-style:var(--functional-md-font-style)]" data-testid="button-buscar-datas">
                Buscar datas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
