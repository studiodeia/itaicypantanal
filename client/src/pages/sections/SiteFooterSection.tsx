import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "@/lib/icons";
import { GoldButton } from "@/components/pantanal/buttons/GoldButton";
import { Input } from "@/components/ui/input";
import { useSharedCmsSections } from "@/lib/cms/shared-content";
import { fadeIn, fadeUp, stagger, staggerSlow, viewport } from "@/lib/motion";
import { useLanguage } from "@/i18n/context";

const socialIcons = [Instagram, Facebook, Youtube];

/** Render internal links with Wouter's Link, external/file links with <a> */
function FooterLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const isInternal = href.startsWith("/") && !href.endsWith(".xml");
  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function resolveFooterContactIcon(iconPath: string) {
  const normalized = iconPath.toLowerCase();
  if (normalized.includes("call") || normalized.includes("phone"))
    return Phone;
  if (normalized.includes("mail")) return Mail;
  if (
    normalized.includes("location") ||
    normalized.includes("map") ||
    normalized.includes("pin")
  )
    return MapPin;
  return Phone;
}

export const SiteFooterSection = (): JSX.Element => {
  const { lang } = useLanguage();
  const { footer } = useSharedCmsSections();
  const [newsletterName, setNewsletterName] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const newsletterCopy = useMemo(() => {
    if (lang === "en") {
      return {
        heading: "Connect with Nature",
        helper:
          "Subscribe to the Itaicy Field Journal and choose your interests.",
        namePlaceholder: "Your name",
        emailPlaceholder: "Your e-mail",
        nameValidation: "Please enter your name.",
        emailValidation: "Please enter a valid e-mail.",
        success: "Thanks. Your preferences were saved.",
        submitError: "Could not submit now. Please try again.",
      };
    }
    if (lang === "es") {
      return {
        heading: "Conectate con la Naturaleza",
        helper:
          "Suscribete al Diario de Campo Itaicy y selecciona tus intereses.",
        namePlaceholder: "Tu nombre",
        emailPlaceholder: "Tu correo electronico",
        nameValidation: "Ingrese su nombre.",
        emailValidation: "Ingrese un correo electronico valido.",
        success: "Gracias. Tus preferencias fueron guardadas.",
        submitError: "No fue posible enviar ahora. Intentalo nuevamente.",
      };
    }
    return {
      heading: "Conecte-se com a Natureza",
      helper: `Inscreva-se no ${footer.newsletterLabel} e selecione seus interesses.`,
      namePlaceholder: "Seu nome",
      emailPlaceholder: footer.newsletterInputPlaceholder,
      nameValidation: "Informe seu nome.",
      emailValidation: "Informe um e-mail valido.",
      success: "Obrigado. Suas preferencias foram salvas.",
      submitError: "Nao foi possivel enviar agora. Tente novamente.",
    };
  }, [footer.newsletterInputPlaceholder, footer.newsletterLabel, lang]);

  const newsletterInterests = useMemo(() => {
    const base = Array.isArray(footer.newsletterInterests)
      ? footer.newsletterInterests.filter((item): item is string => Boolean(item))
      : [];
    const restOption =
      lang === "en" ? "I want to Rest" : lang === "es" ? "Quiero Descansar" : "Descanso";
    const hasRest = base.some((item) => {
      const normalized = item
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      return (
        normalized.includes("descanso") ||
        normalized.includes("rest") ||
        normalized.includes("descansar")
      );
    });
    return hasRest ? base : [...base, restOption];
  }, [footer.newsletterInterests, lang]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest],
    );
  };

  async function handleNewsletterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === "submitting") return;

    const name = newsletterName.trim();
    const email = newsletterEmail.trim();

    if (name.length < 2) {
      setSubmitState("error");
      setSubmitMessage(newsletterCopy.nameValidation);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitState("error");
      setSubmitMessage(newsletterCopy.emailValidation);
      return;
    }

    setSubmitState("submitting");
    setSubmitMessage(null);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          interests: selectedInterests,
          source: "footer-newsletter",
          locale: lang,
        }),
      });

      if (!response.ok) {
        let apiMessage = newsletterCopy.submitError;
        try {
          const data = (await response.json()) as { message?: string };
          if (typeof data.message === "string" && data.message.trim().length > 0) {
            apiMessage = data.message;
          }
        } catch {
          // keep fallback message
        }
        setSubmitState("error");
        setSubmitMessage(apiMessage);
        return;
      }

      setSubmitState("success");
      setSubmitMessage(newsletterCopy.success);
      setNewsletterName("");
      setNewsletterEmail("");
      setSelectedInterests([]);
    } catch {
      setSubmitState("error");
      setSubmitMessage(newsletterCopy.submitError);
    }
  }

  return (
    <footer className="flex flex-col items-center w-full bg-[#263a30]">
      <div className="flex flex-col items-center w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-16 py-16 md:py-24 gap-16 md:gap-20">

        {/* Logo + Heading + Socials */}
        <motion.div
          className="flex flex-col items-center text-center gap-8"
          variants={staggerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div variants={fadeIn}>
            <img
              className="h-10 w-auto"
              alt="Itaicy Pantanal Eco Lodge"
              src="/images/icons/footer-logo.svg"
              data-testid="img-footer-logo"
            />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)] max-w-[540px]"
            data-testid="text-footer-heading"
          >
            {footer.heading}
          </motion.h2>

          <motion.div
            variants={fadeIn}
            className="flex items-center gap-4"
            data-testid="img-social-links"
            aria-label="Redes sociais"
          >
            {socialIcons.map((Icon, index) => (
              <span
                key={index}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#a8cab9] text-[#e3f7ec] hover:bg-[#ac8042] hover:border-[#ac8042] transition-all duration-300 cursor-pointer"
              >
                <Icon className="w-5 h-5" />
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Nav grid — A Pousada + Experiências */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full border-y border-[#a8cab9]/30 py-12 md:py-16 text-center md:text-left"
        >
          <motion.div
            variants={fadeIn}
            className="flex flex-col gap-5 items-center md:items-start"
          >
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#ac8042]">
              {footer.pousadaHeading}
            </h3>
            <ul className="flex flex-col gap-3">
              {footer.pousadaLinks.map((link, index) => (
                <li key={index}>
                  <FooterLink
                    href={link.href}
                    className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)] hover:text-[#ac8042] transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="flex flex-col gap-5 items-center md:items-start"
          >
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#ac8042]">
              {footer.experienciasHeading}
            </h3>
            <ul className="flex flex-col gap-3">
              {footer.experienciasLinks.map((link, index) => (
                <li key={index}>
                  <FooterLink
                    href={link.href}
                    className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)] hover:text-[#ac8042] transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Fale Conosco — centered contact info */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center gap-6 text-center"
        >
          <motion.h3
            variants={fadeIn}
            className="text-xs font-bold tracking-[0.2em] uppercase text-[#ac8042]"
          >
            {footer.contactHeading}
          </motion.h3>

          <address className="flex flex-col items-center gap-4 not-italic">
            {footer.contactInfo.map((contact, index) => {
              const ContactIcon = resolveFooterContactIcon(contact.icon);
              const isEmail = contact.icon.toLowerCase().includes("mail");
              return (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="flex items-start gap-3"
                >
                  <ContactIcon className="w-5 h-5 flex-shrink-0 text-[#ac8042] mt-0.5" />
                  {isEmail ? (
                    <a
                      href={`mailto:${contact.text}`}
                      className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)] underline underline-offset-4 decoration-[#ac8042]/40 hover:text-[#ac8042] transition-colors"
                    >
                      {contact.text}
                    </a>
                  ) : (
                    <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)] text-left">
                      {contact.text}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </address>
        </motion.div>

        {/* Newsletter card */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="w-full bg-white/5 rounded-2xl p-8 md:p-12 flex flex-col items-center text-center gap-8"
        >
          <div className="flex flex-col items-center gap-3">
            <motion.h3
              variants={fadeUp}
              className="font-heading-md font-[number:var(--heading-md-font-weight)] text-[#e3f7ec] text-[length:var(--heading-md-font-size)] tracking-[var(--heading-md-letter-spacing)] leading-[var(--heading-md-line-height)] [font-style:var(--heading-md-font-style)]"
            >
              {newsletterCopy.heading}
            </motion.h3>
            <motion.p
              variants={fadeIn}
              className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]"
            >
              {newsletterCopy.helper}
            </motion.p>
          </div>

          {/* Interest pills */}
          <motion.div
            variants={stagger}
            className="flex flex-wrap justify-center gap-3"
          >
            {newsletterInterests.map((interest) => (
              <motion.button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                variants={fadeIn}
                aria-pressed={selectedInterests.includes(interest)}
                className={`px-5 py-2 rounded-full border text-xs font-medium transition-all duration-300 ${
                  selectedInterests.includes(interest)
                    ? "bg-[#ac8042] border-[#ac8042] text-[#f2fcf7]"
                    : "bg-transparent border-[#a8cab9] text-[#a8cab9] hover:border-[#e3f7ec] hover:text-[#e3f7ec]"
                }`}
              >
                {interest}
              </motion.button>
            ))}
          </motion.div>

          {/* Name + email + submit */}
          <motion.form
            variants={fadeIn}
            className="flex w-full flex-col items-center gap-4"
            onSubmit={handleNewsletterSubmit}
          >
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="w-full h-12 flex items-center border-b border-[#a8cab9] transition-colors duration-300 focus-within:border-[#ac8042]">
                <Input
                  type="text"
                  value={newsletterName}
                  onChange={(event) => setNewsletterName(event.target.value)}
                  placeholder={newsletterCopy.namePlaceholder}
                  aria-label={newsletterCopy.namePlaceholder}
                  className="border-0 bg-transparent text-[#e3f7ec] font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)] placeholder:text-[#a8cab9] focus-visible:ring-0 focus-visible:ring-offset-0 h-auto p-0 shadow-none text-center sm:text-left"
                  data-testid="input-name-newsletter"
                  required
                />
              </div>
              <div className="w-full h-12 flex items-center border-b border-[#a8cab9] transition-colors duration-300 focus-within:border-[#ac8042]">
                <Input
                  type="email"
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  placeholder={newsletterCopy.emailPlaceholder}
                  aria-label={newsletterCopy.emailPlaceholder}
                  className="border-0 bg-transparent text-[#e3f7ec] font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)] placeholder:text-[#a8cab9] focus-visible:ring-0 focus-visible:ring-offset-0 h-auto p-0 shadow-none text-center sm:text-left"
                  data-testid="input-email-newsletter"
                  required
                />
              </div>
            </div>
            <GoldButton
              data-testid="button-newsletter-submit"
              type="submit"
              disabled={submitState === "submitting"}
            >
              {footer.newsletterButtonLabel}
            </GoldButton>
            {submitMessage ? (
              <p
                className={`text-xs ${
                  submitState === "success" ? "text-[#a8cab9]" : "text-[#f2b3b3]"
                }`}
                data-testid="text-newsletter-submit-status"
                role={submitState === "error" ? "alert" : "status"}
              >
                {submitMessage}
              </p>
            ) : null}
          </motion.form>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="w-full border-t border-[#a8cab9]/30 pt-10 flex flex-col gap-8"
        >
          <motion.p
            variants={fadeIn}
            className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)] italic leading-relaxed text-center"
          >
            &ldquo;{footer.bottomDescription}&rdquo;
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <p
              className="text-[10px] text-[#a8cab9]/70 tracking-widest uppercase text-center md:text-left whitespace-nowrap"
              data-testid="text-copyright"
            >
              {footer.copyright}
            </p>

            <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-2">
              {footer.legalLinks.map((link, index) => (
                <FooterLink
                  key={index}
                  href={link.href}
                  className="text-[10px] text-[#a8cab9]/70 tracking-widest uppercase hover:text-[#ac8042] transition-colors whitespace-nowrap"
                >
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};
