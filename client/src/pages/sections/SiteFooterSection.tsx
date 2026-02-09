import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const pousadaLinks = [
  { label: "Home", href: "#" },
  { label: "Acomodações", href: "#" },
  { label: "Culinária", href: "#" },
  { label: "Nosso Impacto", href: "#" },
  { label: "Blog", href: "#" },
];

const experienciasLinks = [
  { label: "Birdwatching", href: "#" },
  { label: "Pesca Esportiva", href: "#" },
  { label: "Ecoturismo Imersivo", href: "#" },
];

const contactInfo = [
  {
    icon: PhoneIcon,
    text: "+55 (XX) XXXX-XXXX",
  },
  {
    icon: MailIcon,
    text: "reservas@pousadaitaicy.com.br",
  },
  {
    icon: MapPinIcon,
    text: "Pantanal Sul-Mato-Grossense, Mato Grosso do Sul, Brasil",
  },
];

const legalLinks = [
  { label: "Política de Privacidade", href: "#" },
  { label: "Política de Cookies", href: "#" },
  { label: "Sitemap", href: "#" },
  { label: "Termos de Uso", href: "#" },
];

export const SiteFooterSection = (): JSX.Element => {
  return (
    <footer className="flex flex-col items-center justify-end w-full bg-[#263a30]">
      <div className="flex flex-col max-w-[1440px] items-center justify-end gap-10 md:gap-16 lg:gap-[100px] px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <div className="flex flex-col lg:flex-row items-start gap-10 md:gap-12 lg:gap-[100px] w-full">
          <div className="flex flex-col items-start gap-8 md:gap-10 lg:gap-12 flex-1 w-full">
            <img
              className="w-[100px] md:w-[115px] lg:w-[130.43px] h-auto"
              alt="Footer logo"
              src="/figmaAssets/footer-logo.svg"
              data-testid="img-footer-logo"
            />

            <h2 className="max-w-full lg:max-w-[488px] font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)]" data-testid="text-footer-heading">
              O Pantanal como você nunca sentiu.
            </h2>

            <div className="flex flex-col items-start gap-4 md:gap-6 w-full">
              <img
                className="flex-[0_0_auto]"
                alt="Footer social links"
                src="/figmaAssets/footer-social-links-container.svg"
                data-testid="img-social-links"
              />

              <div className="flex flex-col items-start gap-3 md:gap-4 w-full">
                <label className="font-body-md font-[number:var(--body-md-font-weight)] text-[#e3f7ec] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
                  Diário de Campo Itaicy
                </label>

                <div className="flex w-full max-w-[458px] h-12 md:h-14 items-center justify-between pl-3 md:pl-5 pr-2 py-2 bg-[#344e41] rounded-lg">
                  <Input
                    type="email"
                    placeholder="Seu e-mail"
                    className="border-0 bg-transparent text-[#e3f7ec] font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)] placeholder:text-[#e3f7ec] focus-visible:ring-0 focus-visible:ring-offset-0 h-auto p-0"
                    data-testid="input-email-newsletter"
                  />

                  <Button className="h-auto px-3 md:px-4 py-1.5 bg-[#ac8042] rounded text-[#f2fcf7] font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]" data-testid="button-newsletter-submit">
                    Enviar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <nav className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 w-full lg:w-auto">
            <div className="flex flex-col items-start gap-4 md:gap-6">
              <h3 className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]">
                POUSADA
              </h3>

              <ul className="flex flex-col items-start gap-2">
                {pousadaLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] whitespace-nowrap [font-style:var(--functional-md-font-style)] hover:underline"
                      data-testid={`link-footer-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-start gap-4 md:gap-6">
              <h3 className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]">
                EXPERIÊNCIAS
              </h3>

              <ul className="flex flex-col items-start gap-2">
                {experienciasLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] whitespace-nowrap [font-style:var(--functional-md-font-style)] hover:underline"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-start gap-4 md:gap-6 col-span-2 md:col-span-1">
              <h3 className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]">
                FALE CONOSCO
              </h3>

              <address className="flex flex-col items-start gap-2 not-italic">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center gap-3 md:gap-4">
                    <contact.icon className="w-5 h-5 md:w-6 md:h-6 text-[#e3f7ec] flex-shrink-0" />
                    <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
                      {contact.text}
                    </span>
                  </div>
                ))}
              </address>
            </div>
          </nav>
        </div>

        <Separator className="bg-[#a8cab9] h-px" />

        <div className="flex flex-col md:flex-row items-center md:items-center md:justify-between gap-4 md:gap-6 w-full">
          <p className="max-w-full md:max-w-[548px] font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)] text-center md:text-left">
            Um refúgio genuíno e sofisticado no coração do Pantanal. Um refúgio
            genuíno e sofisticado no coração do Pantanal.Um refúgio genuíno e
          </p>

          <div className="flex flex-col items-center md:items-end gap-3 md:gap-4">
            <p className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] text-center md:text-right tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]" data-testid="text-copyright">
              &copy; 2025 Itaicy Pantanal Eco Lodge. Todos os direitos reservados.
            </p>

            <nav className="flex flex-wrap items-center justify-center md:justify-end gap-1 md:gap-2">
              {legalLinks.map((link, index) => (
                <div key={index} className="inline-flex items-center gap-1 md:gap-2">
                  {index > 0 && (
                    <span className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                      &bull;
                    </span>
                  )}
                  <a
                    href={link.href}
                    className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] whitespace-nowrap [font-style:var(--body-sm-font-style)] hover:underline"
                    data-testid={`link-legal-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
