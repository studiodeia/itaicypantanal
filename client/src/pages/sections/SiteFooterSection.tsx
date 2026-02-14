import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRightIcon,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSharedCmsSections } from "@/lib/cms/shared-content";
import { fadeIn, stagger, viewport } from "@/lib/motion";

const socialIcons = [Instagram, Facebook, Youtube];

function resolveFooterContactIcon(iconPath: string) {
  const normalized = iconPath.toLowerCase();

  if (normalized.includes("call") || normalized.includes("phone")) {
    return Phone;
  }

  if (normalized.includes("mail")) {
    return Mail;
  }

  if (
    normalized.includes("location") ||
    normalized.includes("map") ||
    normalized.includes("pin")
  ) {
    return MapPin;
  }

  return Phone;
}

export const SiteFooterSection = (): JSX.Element => {
  const { footer } = useSharedCmsSections();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest],
    );
  };

  return (
    <footer className="flex flex-col items-center justify-end w-full bg-[#263a30]">
      <div className="flex flex-col max-w-[1440px] items-center justify-end gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-10 py-12 md:py-16 lg:py-[100px] w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col md:flex-row md:flex-wrap md:gap-12 lg:grid lg:gap-x-16 lg:gap-y-0 items-start gap-10 w-full"
          style={{ gridTemplateColumns: "1fr 1fr auto auto auto" }}
        >
          <motion.div
            variants={fadeIn}
            className="flex flex-col items-start gap-8 md:gap-10 lg:gap-12 w-full md:w-full lg:col-span-2"
          >
            <img
              className="w-[100px] md:w-[115px] lg:w-[130.435px] h-auto lg:h-[40px]"
              alt="Itaicy Pantanal Eco Lodge"
              src="/images/icons/footer-logo.svg"
              data-testid="img-footer-logo"
            />

            <h2
              className="max-w-full lg:max-w-[488px] font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)]"
              data-testid="text-footer-heading"
            >
              {footer.heading}
            </h2>

            <div className="flex flex-col items-start gap-4 md:gap-6 w-full">
              <div
                className="inline-flex items-center gap-3"
                data-testid="img-social-links"
                aria-label="Redes sociais"
              >
                {socialIcons.map((Icon, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#a8cab9] text-[#e3f7ec]"
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                ))}
              </div>

              <div className="flex flex-col items-start gap-3 md:gap-4 w-full">
                <label className="font-body-md font-[number:var(--body-md-font-weight)] text-[#e3f7ec] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)]">
                  {footer.newsletterLabel}
                </label>

                <div className="flex flex-wrap gap-2">
                  {footer.newsletterInterests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1 rounded-full border text-sm transition-all duration-300 ${
                        selectedInterests.includes(interest)
                          ? "bg-[#ac8042] border-[#ac8042] text-[#f2fcf7]"
                          : "bg-transparent border-[#a8cab9] text-[#a8cab9] hover:border-[#e3f7ec] hover:text-[#e3f7ec]"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>

                <div className="flex w-full max-w-[458px] h-12 md:h-14 items-center justify-between pr-2 py-2 bg-transparent border-b border-[#a8cab9] transition-colors duration-300 focus-within:border-[#ac8042]">
                  <Input
                    type="email"
                    placeholder={footer.newsletterInputPlaceholder}
                    className="border-0 bg-transparent text-[#e3f7ec] font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)] placeholder:text-[#a8cab9] focus-visible:ring-0 focus-visible:ring-offset-0 h-auto p-0 shadow-none"
                    data-testid="input-email-newsletter"
                  />

                  <Button
                    className="h-auto px-3 md:px-4 py-2 bg-[#ac8042] hover:bg-[#8f6a35] rounded text-[#f2fcf7] font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[length:var(--functional-sm-font-size)] tracking-[var(--functional-sm-letter-spacing)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90"
                    data-testid="button-newsletter-submit"
                  >
                    {footer.newsletterButtonLabel}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col w-full md:hidden">
            {footer.mobileNavLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center justify-between py-4 border-b border-[#a8cab9] font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]"
              >
                {link.label}
                <ChevronRightIcon className="w-5 h-5 text-[#e3f7ec]" />
              </a>
            ))}
          </div>

          <nav className="hidden md:flex md:gap-12 lg:contents">
            <motion.div variants={fadeIn} className="flex flex-col items-start gap-4 md:gap-6">
              <h3 className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]">
                POUSADA
              </h3>
              <ul className="flex flex-col items-start gap-2">
                {footer.pousadaLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] whitespace-nowrap [font-style:var(--functional-md-font-style)] hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="flex flex-col items-start gap-4 md:gap-6">
              <h3 className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]">
                EXPERIENCIAS
              </h3>
              <ul className="flex flex-col items-start gap-2">
                {footer.experienciasLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] whitespace-nowrap [font-style:var(--functional-md-font-style)] hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="flex flex-col items-start gap-4 md:gap-6">
              <h3 className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]">
                FALE CONOSCO
              </h3>
              <address className="flex flex-col items-start gap-2 not-italic">
                {footer.contactInfo.map((contact, index) => {
                  const ContactIcon = resolveFooterContactIcon(contact.icon);
                  return (
                    <div key={index} className="flex items-center gap-3 md:gap-4">
                      <ContactIcon className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-[#a8cab9]" />
                      <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]">
                        {contact.text}
                      </span>
                    </div>
                  );
                })}
              </address>
            </motion.div>
          </nav>
        </motion.div>

        <div className="w-full h-px bg-[#a8cab9]" />

        <div className="flex flex-col md:flex-row items-center md:items-center md:justify-between gap-4 md:gap-6 w-full">
          <p className="max-w-full md:max-w-[548px] font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)] text-center md:text-left">
            {footer.bottomDescription}
          </p>

          <div className="flex flex-col items-center md:items-end gap-3 md:gap-4">
            <p
              className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] text-center md:text-right tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]"
              data-testid="text-copyright"
            >
              {footer.copyright}
            </p>

            <nav className="flex flex-wrap items-center justify-center md:justify-end gap-1 md:gap-2">
              {footer.legalLinks.map((link, index) => (
                <div key={index} className="inline-flex items-center gap-1 md:gap-2">
                  {index > 0 && (
                    <span className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                      &bull;
                    </span>
                  )}
                  <a
                    href={link.href}
                    className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] whitespace-nowrap [font-style:var(--body-sm-font-style)] hover:underline"
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


