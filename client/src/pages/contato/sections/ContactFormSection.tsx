import { useState } from "react";
import { motion } from "framer-motion";
import { goldButtonClass } from "@/components/pantanal/buttons/GoldButton";
import { fadeUp, stagger, scaleIn, viewport } from "@/lib/motion";

const interestOptions = [
  "Pesca Esportiva",
  "Observação de Aves",
  "Ecoturismo",
  "Gastronomia",
  "Hospedagem",
  "Outro",
];

export const ContactFormSection = (): JSX.Element => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    plannedDate: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const inputClasses =
    "w-full bg-transparent border-0 border-b border-[#a8cab9] rounded-none px-0 py-3 text-[#e3f7ec] font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)] placeholder:text-[#a8cab9] focus:border-[#ac8042] focus:outline-none transition-colors duration-300";

  const labelClasses =
    "font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[#a8cab9] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)] uppercase tracking-[1.5px]";

  return (
    <section className="flex flex-col items-center w-full bg-[#263a30]">
      <div className="flex flex-col max-w-[1440px] items-center gap-12 md:gap-16 lg:gap-[100px] px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[100px] w-full">
          {/* Left: intro text */}
          <motion.div
            className="flex flex-col gap-6 lg:w-[440px] shrink-0"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <motion.h2
              className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
              variants={fadeUp}
            >
              Envie sua mensagem
            </motion.h2>
            <motion.p
              className="font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]"
              variants={fadeUp}
            >
              Preencha o formulário e nossa equipe responderá em até 24 horas.
              Se preferir, entre em contato diretamente pelo WhatsApp ou
              e-mail.
            </motion.p>
          </motion.div>

          {/* Right: form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 flex-1 w-full"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="contact-name" className={labelClasses}>
                Nome completo
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome"
                className={inputClasses}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="contact-email" className={labelClasses}>
                E-mail
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className={inputClasses}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="contact-interest" className={labelClasses}>
                Interesse
              </label>
              <select
                id="contact-interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className={`${inputClasses} appearance-none cursor-pointer`}
                required
              >
                <option value="" disabled>
                  Selecione seu interesse
                </option>
                {interestOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="contact-planned-date" className={labelClasses}>
                Data prevista (opcional)
              </label>
              <input
                id="contact-planned-date"
                name="plannedDate"
                type="date"
                value={formData.plannedDate}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="contact-message" className={labelClasses}>
                Mensagem
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Conte-nos sobre sua viagem ideal..."
                rows={4}
                className={`${inputClasses} resize-none`}
                required
              />
            </div>

            <button
              type="submit"
              className={`${goldButtonClass} self-start`}
            >
              Enviar Mensagem
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
