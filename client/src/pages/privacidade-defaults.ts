import type { PrivacidadePageContent } from "@shared/cms-page-content";

export const privacidadeDefaults: PrivacidadePageContent = {
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
