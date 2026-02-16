import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "@/lib/icons";
import { NavHeader } from "@/components/NavHeader";
import { fadeIn, fadeUp, scaleIn, staggerSlow, viewport } from "@/lib/motion";
import type { CmsHero, ContatoPageContent } from "@shared/cms-page-content";

type Props = {
  content: CmsHero;
  formTitle: string;
  steps: ContatoPageContent["steps"];
};

export const ContactHeroSection = ({ content, formTitle, steps }: Props): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    message: "",
  });

  const handleMenuStateChange = useCallback((isOpen: boolean) => {
    setMenuOpen(isOpen);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdvance = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const inputClasses =
    "w-full bg-transparent border-0 border-b border-[#a8cab9] rounded-none px-0 py-3 text-[#e3f7ec] font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)] placeholder:text-[#a8cab9] focus:border-[#ac8042] focus:outline-none transition-colors duration-300";

  return (
    <section className="relative flex flex-col h-[844px] md:h-[680px] lg:h-[1080px] items-center justify-end w-full z-[11] overflow-hidden">
      {/* Background image */}
      <img
        src={content.backgroundImage ?? "/images/culinaria-cta-bg.webp"}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-[filter,transform] duration-300 ${
          menuOpen ? "blur-[8px] scale-105" : ""
        }`}
      />

      {/* Overlay gradients */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          menuOpen
            ? "z-[3] glass-overlay-hero"
            : "z-[1]"
        }`}
        style={
          !menuOpen
            ? {
                background:
                  "linear-gradient(0deg, rgba(21,34,24,0.5) 19.7%, rgba(21,34,24,0) 62.4%), linear-gradient(180deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0) 11.6%), linear-gradient(90deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.32) 100%)",
              }
            : undefined
        }
      />

      {/* Navigation */}
      <NavHeader onMenuStateChange={handleMenuStateChange} />

      {/* Hero content */}
      <div className="relative z-[2] flex flex-col max-w-[1440px] items-start justify-end gap-8 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full flex-1">
        {/* Top: Title left + Form card right */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between w-full gap-8">
          {/* Left: Label + Title */}
          <motion.div
            className="flex flex-col items-start gap-8 w-full lg:max-w-[738px] overflow-hidden"
            variants={staggerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <motion.span
              className="font-lead-md font-[number:var(--lead-md-font-weight)] text-[#d7a45d] text-[length:var(--lead-md-font-size)] tracking-[3.84px] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)] uppercase"
              variants={fadeIn}
            >
              {content.label}
            </motion.span>

            <motion.h1
              className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] text-[#e3f7ec] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)] max-w-[600px]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
              variants={fadeUp}
            >
              {content.heading}
            </motion.h1>
          </motion.div>

          {/* Right: Contact form card */}
          <motion.form
            onSubmit={handleSubmit}
            className="w-full lg:w-[460px] shrink-0 bg-[rgba(10,19,12,0.2)] rounded-lg backdrop-blur-[2px] backdrop-brightness-[110%] [-webkit-backdrop-filter:blur(2px)_brightness(110%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] p-6 md:p-8 flex flex-col gap-6"
            data-testid="form-contact"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {/* Header: title + step indicator */}
            <div className="flex items-center justify-between">
              <h2
                className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[#e3f7ec] text-[length:var(--heading-sm-font-size)] tracking-[var(--heading-sm-letter-spacing)] leading-[var(--heading-sm-line-height)] [font-style:var(--heading-sm-font-style)]"
                style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
              >
                {formTitle}
              </h2>
              <span className="font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[#a8cab9] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)]">
                {step}/3
              </span>
            </div>

            {/* Step 1: Email */}
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={steps.placeholders[0] ?? "E-mail"}
                  className={inputClasses}
                  required
                  data-testid="input-contact-email"
                />
                <button
                  type="button"
                  onClick={handleAdvance}
                  className="flex items-center justify-center h-14 w-full border border-[#f2fcf7] rounded-[6px] text-[#f2fcf7] font-['Lato',sans-serif] font-semibold text-base lg:text-lg transition-all duration-300 hover:bg-[#f2fcf7] hover:text-[#152218] hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]"
                  data-testid="button-avancar"
                >
                  {steps.buttonNext}
                </button>
              </div>
            )}

            {/* Step 2: Name + Phone */}
            {step === 2 && (
              <div className="flex flex-col gap-6">
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={steps.placeholders[1] ?? "Nome completo"}
                  className={inputClasses}
                  required
                />
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={steps.placeholders[2] ?? "Telefone / WhatsApp"}
                  className={inputClasses}
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center justify-center h-14 flex-1 border border-[#a8cab9] rounded-[6px] text-[#a8cab9] font-['Lato',sans-serif] font-semibold text-base transition-all duration-300 hover:border-[#e3f7ec] hover:text-[#e3f7ec]"
                  >
                    {steps.buttonBack}
                  </button>
                  <button
                    type="button"
                    onClick={handleAdvance}
                    className="flex items-center justify-center h-14 flex-1 border border-[#f2fcf7] rounded-[6px] text-[#f2fcf7] font-['Lato',sans-serif] font-semibold text-base transition-all duration-300 hover:bg-[#f2fcf7] hover:text-[#152218] hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]"
                  >
                    {steps.buttonNext}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Message + Submit */}
            {step === 3 && (
              <div className="flex flex-col gap-6">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={steps.placeholders[3] ?? "Sua mensagem..."}
                  rows={3}
                  className={`${inputClasses} resize-none`}
                  required
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center justify-center h-14 flex-1 border border-[#a8cab9] rounded-[6px] text-[#a8cab9] font-['Lato',sans-serif] font-semibold text-base transition-all duration-300 hover:border-[#e3f7ec] hover:text-[#e3f7ec]"
                  >
                    {steps.buttonBack}
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center h-14 flex-1 bg-[#ac8042] hover:bg-[#8f6a35] rounded-[6px] text-[#f2fcf7] font-['Lato',sans-serif] font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]"
                  >
                    {steps.buttonSubmit}
                  </button>
                </div>
              </div>
            )}
          </motion.form>
        </div>

        {/* Bottom: border-top + description + scroll */}
        <motion.div
          className="flex flex-col md:flex-row items-start justify-between gap-6 w-full border-t border-[#f2fcf7] pt-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <p className="max-w-[600px] font-body-md font-[number:var(--body-md-font-weight)] text-[#e3f7ec] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
            {content.description}
          </p>

          <div className="hidden md:flex items-center gap-2 text-[#e3f7ec] shrink-0">
            <span className="font-body-md font-[number:var(--body-md-font-weight)] text-[length:var(--body-md-font-size)] tracking-[var(--body-md-letter-spacing)] leading-[var(--body-md-line-height)] [font-style:var(--body-md-font-style)] whitespace-nowrap">
              {content.scrollHint ?? "Deslize para baixo"}
            </span>
            <ArrowDown className="w-6 h-6" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};



