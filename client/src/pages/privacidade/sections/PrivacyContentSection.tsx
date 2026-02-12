import { useCallback } from "react";
import { motion } from "framer-motion";
import { fadeIn, fadeUp, viewport } from "@/lib/motion";

const sections = [
  { id: "dados-coletados", label: "1. Quais Dados Coletamos?" },
  { id: "uso-dados", label: "2. Como Usamos Seus Dados?" },
  { id: "compartilhamento", label: "3. Compartilhamento de dados" },
  { id: "protecao", label: "4. Como Protegemos Seus Dados?" },
  { id: "direitos-lgpd", label: "5. Seus Direitos (LGPD)" },
  { id: "alteracoes", label: "6. Alterações Nesta Política" },
];

export const PrivacyContentSection = (): JSX.Element => {
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="bg-pantanal-cream w-full">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[100px] max-w-[1440px] mx-auto px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] items-start">
        {/* Sidebar - Table of Contents */}
        <motion.aside
          className="w-full lg:w-[414px] shrink-0 flex flex-col gap-5 lg:sticky lg:top-8"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="bg-[#f5e8db] rounded-lg p-5 flex flex-col gap-5">
            <h2
              className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[length:var(--heading-sm-font-size)] leading-[var(--heading-sm-line-height)] text-pantanal-darkText-primary tracking-[var(--heading-sm-letter-spacing)] [font-style:var(--heading-sm-font-style)]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            >
              Sessões
            </h2>

            <div className="w-full h-px bg-pantanal-border-muted" />

            <nav className="flex flex-col">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="flex items-center px-3 py-2.5 font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] leading-[var(--functional-md-line-height)] text-pantanal-darkText-primary tracking-[var(--functional-md-letter-spacing)] [font-style:var(--functional-md-font-style)] text-left transition-colors duration-200 hover:text-pantanal-gold rounded cursor-pointer"
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={scrollToTop}
            className="bg-[#f5e8db] rounded-lg p-5 w-full font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] leading-[var(--functional-md-line-height)] text-pantanal-darkText-primary tracking-[var(--functional-md-letter-spacing)] [font-style:var(--functional-md-font-style)] text-center transition-colors duration-200 hover:text-pantanal-gold cursor-pointer"
          >
            Voltar ao topo
          </button>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-12 text-pantanal-darkText-primary min-w-0">
          {/* Intro */}
          <motion.div
            className="font-body-lg font-[number:var(--body-lg-font-weight)] text-[length:var(--body-lg-font-size)] leading-relaxed lg:leading-[48px] text-pantanal-darkText-primary tracking-[var(--body-lg-letter-spacing)] [font-style:var(--body-lg-font-style)]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <p className="mb-6">
              A sua privacidade é uma prioridade para a Itaici Ecoturismo
              ("Nós", "Nosso"). Esta Política de Privacidade explica como
              coletamos, usamos, armazenamos e protegemos as informações
              pessoais de nossos visitantes e clientes ("Você") ao usar nosso
              site.
            </p>
            <p>
              Estamos comprometidos com a transparência e a proteção dos seus
              dados, em conformidade com a Lei Geral de Proteção de Dados
              (LGPD).
            </p>
          </motion.div>

          {/* Section 1 */}
          <motion.h2
            id="dados-coletados"
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] text-pantanal-darkText-primary tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)] scroll-mt-8"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            1. Quais Dados Coletamos?
          </motion.h2>
          <motion.div
            className="font-body-lg font-[number:var(--body-lg-font-weight)] text-[length:var(--body-lg-font-size)] leading-relaxed lg:leading-[48px] text-pantanal-darkText-primary tracking-[var(--body-lg-letter-spacing)] [font-style:var(--body-lg-font-style)]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <p className="mb-6">
              Coletamos informações que você nos fornece e dados gerados
              automaticamente durante sua navegação:
            </p>
            <ul className="list-disc ml-9 flex flex-col gap-0">
              <li>
                <strong className="font-semibold">
                  Informações Fornecidas por Você:
                </strong>{" "}
                Inclui dados de identificação pessoal como nome, e-mail e número
                de telefone que você insere ao preencher formulários de contato,
                de reserva ou ao solicitar o download de materiais (como nossos
                guias de espécies).
              </li>
              <li>
                <strong className="font-semibold">
                  Informações de Reserva:
                </strong>{" "}
                Para gerenciar sua estadia, podemos coletar informações sobre as
                datas da sua viagem e preferências. O processamento final do
                pagamento é feito por nosso parceiro de reservas externo e
                seguro.
              </li>
              <li>
                <strong className="font-semibold">
                  Informações de Navegação (Cookies):
                </strong>{" "}
                Coletamos dados anônimos sobre como você interage com nosso site
                (como endereço IP, tipo de navegador, páginas visitadas e tempo
                de permanência) para melhorar sua experiência.
              </li>
            </ul>
          </motion.div>

          {/* Section 2 */}
          <motion.h2
            id="uso-dados"
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] text-pantanal-darkText-primary tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)] scroll-mt-8"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            2. Como Usamos Seus Dados?
          </motion.h2>
          <motion.div
            className="font-body-lg font-[number:var(--body-lg-font-weight)] text-[length:var(--body-lg-font-size)] leading-relaxed lg:leading-[48px] text-pantanal-darkText-primary tracking-[var(--body-lg-letter-spacing)] [font-style:var(--body-lg-font-style)]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <p className="mb-6">
              Utilizamos suas informações pessoais com os seguintes objetivos:
            </p>
            <ul className="list-disc ml-9 flex flex-col gap-0">
              <li>
                <strong className="font-semibold">
                  Processar sua Reserva:
                </strong>{" "}
                Para confirmar e gerenciar sua expedição, comunicar detalhes
                importantes sobre sua estadia e garantir que sua experiência seja
                tranquila.
              </li>
              <li>
                <strong className="font-semibold">
                  Prestar Atendimento:
                </strong>{" "}
                Para responder às suas dúvidas, solicitações e fornecer o suporte
                necessário.
              </li>
              <li>
                <strong className="font-semibold">
                  Melhorar Nosso Site:
                </strong>{" "}
                Analisamos dados de navegação para entender como nossos
                visitantes usam o site, otimizando o layout, o conteúdo e a
                performance.
              </li>
              <li>
                <strong className="font-semibold">
                  Marketing e Comunicação (com seu consentimento):
                </strong>{" "}
                Para enviar e-mails sobre nossos pacotes, promoções especiais e
                conteúdos relevantes do nosso blog. Você pode optar por não
                receber essas comunicações a qualquer momento.
              </li>
            </ul>
          </motion.div>

          {/* Section 3 */}
          <motion.h2
            id="compartilhamento"
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] text-pantanal-darkText-primary tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)] scroll-mt-8"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            3. Com Quem Compartilhamos Seus Dados?
          </motion.h2>
          <motion.div
            className="font-body-lg font-[number:var(--body-lg-font-weight)] text-[length:var(--body-lg-font-size)] leading-relaxed lg:leading-[48px] text-pantanal-darkText-primary tracking-[var(--body-lg-letter-spacing)] [font-style:var(--body-lg-font-style)]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <p className="mb-6">
              A Itaici Ecoturismo não vende, aluga ou comercializa suas
              informações pessoais.
            </p>
            <p className="mb-6">
              O compartilhamento de dados é estritamente limitado a parceiros
              operacionais essenciais para a prestação do nosso serviço, como o
              nosso motor de reservas externo, que possui seus próprios e
              rigorosos padrões de segurança.
            </p>
            <p>
              Também poderemos compartilhar informações se formos obrigados por
              lei ou para proteger nossos direitos legais.
            </p>
          </motion.div>

          {/* Section 4 */}
          <motion.h2
            id="protecao"
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] text-pantanal-darkText-primary tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)] scroll-mt-8"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            4. Como Protegemos Seus Dados?
          </motion.h2>
          <motion.div
            className="font-body-lg font-[number:var(--body-lg-font-weight)] text-[length:var(--body-lg-font-size)] leading-relaxed lg:leading-[48px] text-pantanal-darkText-primary tracking-[var(--body-lg-letter-spacing)] [font-style:var(--body-lg-font-style)]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <p>
              Implementamos um conjunto de medidas de segurança técnicas e
              administrativas para proteger seus dados pessoais contra acesso não
              autorizado, perda, alteração ou destruição. Isso inclui o uso de
              criptografia (SSL) e controles de acesso restrito.
            </p>
          </motion.div>

          {/* Section 5 */}
          <motion.h2
            id="direitos-lgpd"
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] text-pantanal-darkText-primary tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)] scroll-mt-8"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            5. Seus Direitos (LGPD)
          </motion.h2>
          <motion.div
            className="font-body-lg font-[number:var(--body-lg-font-weight)] text-[length:var(--body-lg-font-size)] leading-relaxed lg:leading-[48px] text-pantanal-darkText-primary tracking-[var(--body-lg-letter-spacing)] [font-style:var(--body-lg-font-style)]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <p className="mb-6">
              Você, como titular dos dados, tem o direito de:
            </p>
            <ul className="list-disc ml-9 flex flex-col gap-0 mb-6">
              <li>Confirmar se estamos tratando seus dados.</li>
              <li>Acessar, corrigir ou atualizar suas informações.</li>
              <li>
                Solicitar a anonimização ou eliminação de dados que considere
                desnecessários.
              </li>
              <li>
                Revogar seu consentimento para o marketing a qualquer momento.
              </li>
            </ul>
            <p>
              Para exercer seus direitos ou tirar dúvidas sobre esta política,
              entre em contato conosco através do e-mail:
              [seu-email-de-contato@itaici.com.br]
            </p>
          </motion.div>

          {/* Section 6 */}
          <motion.h2
            id="alteracoes"
            className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] text-pantanal-darkText-primary tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)] scroll-mt-8"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            6. Alterações Nesta Política
          </motion.h2>
          <motion.div
            className="font-body-lg font-[number:var(--body-lg-font-weight)] text-[length:var(--body-lg-font-size)] leading-relaxed lg:leading-[48px] text-pantanal-darkText-primary tracking-[var(--body-lg-letter-spacing)] [font-style:var(--body-lg-font-style)]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente para
              refletir novas práticas ou mudanças na legislação. A versão mais
              recente estará sempre disponível nesta página, e a data da última
              atualização será indicada no topo.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
