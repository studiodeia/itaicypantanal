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
import { useSharedCmsSections } from "@/lib/cms/shared-content";
import { fadeIn, fadeUp, stagger, viewport } from "@/lib/motion";
import { useLanguage } from "@/i18n/context";
import { BLOG_ENABLED } from "@/lib/features";

const socialLinks = [
  { Icon: Instagram, href: "https://www.instagram.com/pousadaitaicy/", label: "Instagram" },
  { Icon: Facebook,  href: "#",                                         label: "Facebook" },
  { Icon: Youtube,   href: "https://www.youtube.com/@pousadaitaicy6660", label: "YouTube" },
];

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
  if (normalized.includes("call") || normalized.includes("phone")) return Phone;
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
  // BLOG: guarded by BLOG_ENABLED feature flag (see client/src/lib/features.ts)
  const pousadaLinks = BLOG_ENABLED
    ? footer.pousadaLinks
    : footer.pousadaLinks.filter((link) => link.href !== "/blog");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const newsletterCopy = useMemo(() => {
    if (lang === "en") {
      return {
        emailPlaceholder: "Your e-mail",
        emailValidation: "Please enter a valid e-mail.",
        success: "Thanks! You're subscribed.",
        submitError: "Could not submit now. Please try again.",
      };
    }
    if (lang === "es") {
      return {
        emailPlaceholder: "Tu correo electrónico",
        emailValidation: "Ingrese un correo electrónico válido.",
        success: "¡Gracias! Estás suscrito.",
        submitError: "No fue posible enviar ahora. Inténtalo nuevamente.",
      };
    }
    return {
      emailPlaceholder: footer.newsletterInputPlaceholder,
      emailValidation: "Informe um e-mail válido.",
      success: "Obrigado! Você foi inscrito.",
      submitError: "Não foi possível enviar agora. Tente novamente.",
    };
  }, [footer.newsletterInputPlaceholder, lang]);

  async function handleNewsletterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === "submitting") return;

    const email = newsletterEmail.trim();

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
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
      setNewsletterEmail("");
    } catch {
      setSubmitState("error");
      setSubmitMessage(newsletterCopy.submitError);
    }
  }

  return (
    <footer className="flex flex-col items-center w-full bg-[#263a30]">
      <div className="flex flex-col w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-10 py-16 md:py-24 lg:py-[100px] gap-16 md:gap-20 lg:gap-[100px]">

        {/* Main layout: stacked → lg: 5-col grid (2+1+1+1) */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-16 lg:gap-6 xl:gap-8 2xl:gap-10 items-start w-full">

          {/* LEFT: spans 2 cols */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col gap-8 lg:col-span-2 min-w-0"
          >
            <motion.img
              variants={fadeIn}
              className="h-10 w-auto max-w-full self-start"
              alt="Itaicy Pantanal Eco Lodge"
              src="/images/icons/footer-logo.svg"
              data-testid="img-footer-logo"
            />

            <motion.h2
              variants={fadeUp}
              className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)] max-w-[488px]"
              data-testid="text-footer-heading"
            >
              {footer.heading}
            </motion.h2>

            {/* Socials + Newsletter grouped with tighter spacing */}
            <motion.div variants={fadeIn} className="flex flex-col gap-6">
              <div
                className="flex items-center gap-3"
                data-testid="img-social-links"
                aria-label="Redes sociais"
              >
                {socialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-[4px] bg-[#344e41] text-[#e3f7ec] hover:bg-[#ac8042] transition-all duration-300 shrink-0"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-[#a8cab9] text-[18px] leading-[1.5] [font-family:'Lato',sans-serif]">
                  {footer.newsletterLabel}
                </span>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                  <div className="flex items-center bg-[#344e41] h-[56px] rounded-[8px] w-full max-w-[458px] pl-5 pr-2 py-2 gap-2">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder={newsletterCopy.emailPlaceholder}
                      aria-label={newsletterCopy.emailPlaceholder}
                      className="flex-1 min-w-0 bg-transparent text-[#e3f7ec] text-sm [font-family:'Lato',sans-serif] placeholder:text-[#a8cab9] outline-none"
                      data-testid="input-email-newsletter"
                    />
                    <GoldButton
                      data-testid="button-newsletter-submit"
                      type="submit"
                      disabled={submitState === "submitting"}
                      className="h-auto py-2 px-4 shrink-0 text-sm"
                    >
                      {footer.newsletterButtonLabel}
                    </GoldButton>
                  </div>
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
                </form>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: stacked → sm: flex-row → lg: grid contents (each 1 col) */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-10 lg:contents items-start">

            {/* POUSADA */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-col gap-5"
            >
              <h3 className="text-xs font-bold tracking-[0.24em] uppercase text-[#a8cab9]">
                {footer.pousadaHeading}
              </h3>
              <ul className="flex flex-col gap-2">
                {pousadaLinks.map((link, index) => (
                  <li key={index}>
                    <FooterLink
                      href={link.href}
                      className="text-[#e3f7ec] text-[18px] leading-[1.5] [font-family:'Lato',sans-serif] hover:text-[#ac8042] transition-colors"
                    >
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* EXPERIÊNCIAS */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-col gap-5"
            >
              <h3 className="text-xs font-bold tracking-[0.24em] uppercase text-[#a8cab9]">
                {footer.experienciasHeading}
              </h3>
              <ul className="flex flex-col gap-2">
                {footer.experienciasLinks.map((link, index) => (
                  <li key={index}>
                    <FooterLink
                      href={link.href}
                      className="text-[#e3f7ec] text-[18px] leading-[1.5] [font-family:'Lato',sans-serif] hover:text-[#ac8042] transition-colors"
                    >
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* FALE CONOSCO */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-col gap-5"
            >
              <h3 className="text-xs font-bold tracking-[0.24em] uppercase text-[#a8cab9]">
                {footer.contactHeading}
              </h3>
              <address className="flex flex-col gap-4 not-italic">
                {footer.contactInfo.map((contact, index) => {
                  const ContactIcon = resolveFooterContactIcon(contact.icon);
                  const isEmail = contact.icon.toLowerCase().includes("mail");
                  return (
                    <div key={index} className="flex items-start gap-3 min-w-0">
                      <ContactIcon className="w-5 h-5 mt-[3px] flex-shrink-0 text-[#a8cab9]" />
                      {isEmail ? (
                        <a
                          href={`mailto:${contact.text}`}
                          className="min-w-0 break-all text-[#e3f7ec] text-base leading-[1.5] [font-family:'Lato',sans-serif] hover:text-[#ac8042] transition-colors"
                        >
                          {contact.text}
                        </a>
                      ) : (
                        <span className="min-w-0 text-[#e3f7ec] text-base leading-[1.5] [font-family:'Lato',sans-serif]">
                          {contact.text}
                        </span>
                      )}
                    </div>
                  );
                })}
              </address>
            </motion.div>

          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#a8cab9]/30" />

        {/* Bottom bar */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <motion.p
            variants={fadeIn}
            className="font-body-sm font-[number:var(--body-sm-font-weight)] text-[#a8cab9] text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)] italic md:max-w-[548px]"
          >
            &ldquo;{footer.bottomDescription.split(/\.\s+/).map((sentence, i, arr) => (
              <span key={i}>
                {i > 0 && <br />}
                {i < arr.length - 1 ? sentence + "." : sentence}
              </span>
            ))}&rdquo;
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="flex flex-col gap-4 items-end"
          >
            <p
              className="text-[10px] text-[#a8cab9]/70 tracking-widest uppercase"
              data-testid="text-copyright"
            >
              {footer.copyright}
            </p>
            <nav className="flex flex-wrap items-center gap-y-2 justify-end">
              {footer.legalLinks.map((link, index) => (
                <span key={index} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-3 text-[#a8cab9]/40 text-[10px]">•</span>
                  )}
                  <FooterLink
                    href={link.href}
                    className="text-[10px] text-[#a8cab9]/70 tracking-widest uppercase hover:text-[#ac8042] transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </FooterLink>
                </span>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};
