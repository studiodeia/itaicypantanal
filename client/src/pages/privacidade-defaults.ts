import type { PrivacidadePageContent } from "@shared/cms-page-content";
import type { LocalizedDefaults } from "@/lib/cms/page-content";

const pt: PrivacidadePageContent = {
  hero: {
    title: "Políticas de Privacidade",
    lastUpdated: "[Data]",
  },
  sections: [
    {
      id: "dados-coletados",
      title: "1. Quais Dados Coletamos?",
      content: [
        "Coletamos informações que você nos fornece e dados gerados automaticamente durante sua navegação:",
        "**Informações Fornecidas por Você:** Inclui dados de identificação pessoal como nome, e-mail e número de telefone que você insere ao preencher formulários de contato, de reserva ou ao solicitar o download de materiais (como nossos guias de espécies).",
        "**Informações de Reserva:** Para gerenciar sua estadia, podemos coletar informações sobre as datas da sua viagem e preferências. O processamento final do pagamento é feito por nosso parceiro de reservas externo e seguro.",
        "**Informações de Navegação (Cookies):** Coletamos dados anônimos sobre como você interage com nosso site (como endereço IP, tipo de navegador, páginas visitadas e tempo de permanência) para melhorar sua experiência.",
      ],
    },
    {
      id: "uso-dados",
      title: "2. Como Usamos Seus Dados?",
      content: [
        "Utilizamos suas informações pessoais com os seguintes objetivos:",
        "**Processar sua Reserva:** Para confirmar e gerenciar sua expedição, comunicar detalhes importantes sobre sua estadia e garantir que sua experiência seja tranquila.",
        "**Prestar Atendimento:** Para responder às suas dúvidas, solicitações e fornecer o suporte necessário.",
        "**Melhorar Nosso Site:** Analisamos dados de navegação para entender como nossos visitantes usam o site, otimizando o layout, o conteúdo e a performance.",
        "**Marketing e Comunicação (com seu consentimento):** Para enviar e-mails sobre nossos pacotes, promoções especiais e conteúdos relevantes do nosso blog. Você pode optar por não receber essas comunicações a qualquer momento.",
      ],
    },
    {
      id: "compartilhamento",
      title: "3. Com Quem Compartilhamos Seus Dados?",
      content: [
        "A Itaici Ecoturismo não vende, aluga ou comercializa suas informações pessoais.",
        "O compartilhamento de dados é estritamente limitado a parceiros operacionais essenciais para a prestação do nosso serviço, como o nosso motor de reservas externo, que possui seus próprios e rigorosos padrões de segurança.",
        "Também poderemos compartilhar informações se formos obrigados por lei ou para proteger nossos direitos legais.",
      ],
    },
    {
      id: "protecao",
      title: "4. Como Protegemos Seus Dados?",
      content: [
        "Implementamos um conjunto de medidas de segurança técnicas e administrativas para proteger seus dados pessoais contra acesso não autorizado, perda, alteração ou destruição. Isso inclui o uso de criptografia (SSL) e controles de acesso restrito.",
      ],
    },
    {
      id: "direitos-lgpd",
      title: "5. Seus Direitos (LGPD)",
      content: [
        "Você, como titular dos dados, tem o direito de:",
        "Confirmar se estamos tratando seus dados.",
        "Acessar, corrigir ou atualizar suas informações.",
        "Solicitar a anonimização ou eliminação de dados que considere desnecessários.",
        "Revogar seu consentimento para o marketing a qualquer momento.",
        "Para exercer seus direitos ou tirar dúvidas sobre esta política, entre em contato conosco através do e-mail: [seu-email-de-contato@itaici.com.br]",
      ],
    },
    {
      id: "alteracoes",
      title: "6. Alterações Nesta Política",
      content: [
        "Podemos atualizar esta Política de Privacidade periodicamente para refletir novas práticas ou mudanças na legislação. A versão mais recente estará sempre disponível nesta página, e a data da última atualização será indicada no topo.",
      ],
    },
  ],
};

const en: PrivacidadePageContent = {
  hero: {
    title: "Privacy Policy",
    lastUpdated: "[Date]",
  },
  sections: [
    {
      id: "dados-coletados",
      title: "1. What Data Do We Collect?",
      content: [
        "We collect information you provide to us and data automatically generated during your browsing:",
        "**Information You Provide:** Includes personal identification data such as name, email, and phone number that you enter when filling out contact forms, booking forms, or when requesting the download of materials (such as our species guides).",
        "**Booking Information:** To manage your stay, we may collect information about your travel dates and preferences. Final payment processing is handled by our secure external booking partner.",
        "**Browsing Information (Cookies):** We collect anonymous data about how you interact with our website (such as IP address, browser type, pages visited, and time spent) to improve your experience.",
      ],
    },
    {
      id: "uso-dados",
      title: "2. How Do We Use Your Data?",
      content: [
        "We use your personal information for the following purposes:",
        "**Process Your Booking:** To confirm and manage your expedition, communicate important details about your stay, and ensure your experience runs smoothly.",
        "**Provide Support:** To respond to your questions, requests, and provide the necessary assistance.",
        "**Improve Our Website:** We analyze browsing data to understand how our visitors use the site, optimizing layout, content, and performance.",
        "**Marketing and Communication (with your consent):** To send emails about our packages, special promotions, and relevant blog content. You can opt out of these communications at any time.",
      ],
    },
    {
      id: "compartilhamento",
      title: "3. With Whom Do We Share Your Data?",
      content: [
        "Itaicy Ecotourism does not sell, rent, or trade your personal information.",
        "Data sharing is strictly limited to essential operational partners for the provision of our service, such as our external booking engine, which maintains its own strict security standards.",
        "We may also share information if required by law or to protect our legal rights.",
      ],
    },
    {
      id: "protecao",
      title: "4. How Do We Protect Your Data?",
      content: [
        "We implement a set of technical and administrative security measures to protect your personal data against unauthorized access, loss, alteration, or destruction. This includes the use of encryption (SSL) and restricted access controls.",
      ],
    },
    {
      id: "direitos-lgpd",
      title: "5. Your Rights (LGPD — Brazilian Data Protection Law)",
      content: [
        "You, as the data subject, have the right to:",
        "Confirm whether we are processing your data.",
        "Access, correct, or update your information.",
        "Request the anonymization or deletion of data you consider unnecessary.",
        "Revoke your consent for marketing at any time.",
        "To exercise your rights or ask questions about this policy, contact us at: [contact-email@itaicy.com.br]",
      ],
    },
    {
      id: "alteracoes",
      title: "6. Changes to This Policy",
      content: [
        "We may update this Privacy Policy periodically to reflect new practices or changes in legislation. The most recent version will always be available on this page, and the date of the last update will be indicated at the top.",
      ],
    },
  ],
};

const es: PrivacidadePageContent = {
  hero: {
    title: "Política de Privacidad",
    lastUpdated: "[Fecha]",
  },
  sections: [
    {
      id: "dados-coletados",
      title: "1. ¿Qué Datos Recopilamos?",
      content: [
        "Recopilamos información que nos proporciona y datos generados automáticamente durante su navegación:",
        "**Información Proporcionada por Usted:** Incluye datos de identificación personal como nombre, correo electrónico y número de teléfono que ingresa al completar formularios de contacto, de reserva o al solicitar la descarga de materiales (como nuestras guías de especies).",
        "**Información de Reserva:** Para gestionar su estadía, podemos recopilar información sobre las fechas de su viaje y preferencias. El procesamiento final del pago lo realiza nuestro socio de reservas externo y seguro.",
        "**Información de Navegación (Cookies):** Recopilamos datos anónimos sobre cómo interactúa con nuestro sitio web (como dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia) para mejorar su experiencia.",
      ],
    },
    {
      id: "uso-dados",
      title: "2. ¿Cómo Usamos Sus Datos?",
      content: [
        "Utilizamos su información personal con los siguientes objetivos:",
        "**Procesar su Reserva:** Para confirmar y gestionar su expedición, comunicar detalles importantes sobre su estadía y garantizar que su experiencia transcurra sin contratiempos.",
        "**Brindar Atención:** Para responder a sus preguntas, solicitudes y proporcionar el soporte necesario.",
        "**Mejorar Nuestro Sitio:** Analizamos datos de navegación para entender cómo nuestros visitantes utilizan el sitio, optimizando el diseño, el contenido y el rendimiento.",
        "**Marketing y Comunicación (con su consentimiento):** Para enviar correos electrónicos sobre nuestros paquetes, promociones especiales y contenidos relevantes de nuestro blog. Puede optar por no recibir estas comunicaciones en cualquier momento.",
      ],
    },
    {
      id: "compartilhamento",
      title: "3. ¿Con Quién Compartimos Sus Datos?",
      content: [
        "Itaicy Ecoturismo no vende, alquila ni comercializa su información personal.",
        "El intercambio de datos está estrictamente limitado a socios operativos esenciales para la prestación de nuestro servicio, como nuestro motor de reservas externo, que cuenta con sus propios y rigurosos estándares de seguridad.",
        "También podremos compartir información si estamos obligados por ley o para proteger nuestros derechos legales.",
      ],
    },
    {
      id: "protecao",
      title: "4. ¿Cómo Protegemos Sus Datos?",
      content: [
        "Implementamos un conjunto de medidas de seguridad técnicas y administrativas para proteger sus datos personales contra acceso no autorizado, pérdida, alteración o destrucción. Esto incluye el uso de cifrado (SSL) y controles de acceso restringido.",
      ],
    },
    {
      id: "direitos-lgpd",
      title: "5. Sus Derechos (LGPD — Ley Brasileña de Protección de Datos)",
      content: [
        "Usted, como titular de los datos, tiene el derecho de:",
        "Confirmar si estamos tratando sus datos.",
        "Acceder, corregir o actualizar su información.",
        "Solicitar la anonimización o eliminación de datos que considere innecesarios.",
        "Revocar su consentimiento para el marketing en cualquier momento.",
        "Para ejercer sus derechos o resolver dudas sobre esta política, contáctenos a través del correo: [su-email-de-contacto@itaicy.com.br]",
      ],
    },
    {
      id: "alteracoes",
      title: "6. Cambios en Esta Política",
      content: [
        "Podemos actualizar esta Política de Privacidad periódicamente para reflejar nuevas prácticas o cambios en la legislación. La versión más reciente siempre estará disponible en esta página, y la fecha de la última actualización se indicará en la parte superior.",
      ],
    },
  ],
};

export const privacidadeDefaults: LocalizedDefaults<"/politica-de-privacidade"> = { pt, en, es };
