export type VisitorIntent =
  | "availability"
  | "rates"
  | "policy"
  | "reservation_help"
  | "negotiation"
  | "fishing"
  | "birdwatching"
  | "package_inquiry"
  | "day_use"
  | "general";

export type VisitorProfile =
  | "pescador"
  | "birdwatcher"
  | "familia"
  | "casal"
  | "grupo"
  | "unknown";

export type VisitorStage = "E1" | "E2" | "E3" | "E4";

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const intentMatchers: Array<{ intent: VisitorIntent; pattern: RegExp }> = [
  {
    // V8: Sensitive commercial requests — must escalate immediately
    intent: "negotiation",
    pattern:
      /\b(desconto|descontos|promoção|promocao|promo|upgrade|upgradar|parcelar|parcelamento|corporativo|fidelidade|voucher|coupon|cupom|negociar|negociacao|condições especiais|condicoes especiais|deal|special offer)\b/i,
  },
  {
    // V12: Birdwatching before fishing (more specific pattern)
    intent: "birdwatching",
    pattern:
      /\b(passaro|passaros|ave|aves|bird|birds|birdwatching|observa[cç][aã]o de aves|tuiuiu|arara|tucano|jacana|gaviao|coruja|ornitologia|species|pajaros|wildlife photo)\b/i,
  },
  {
    // V11 Day Use (specific variant of fishing)
    intent: "day_use",
    pattern:
      /\b(day use|dia de pesca|passeio de um dia|visita diurna|somente o dia|so o dia|sem hospedagem|apenas o dia)\b/i,
  },
  {
    // V11: Package inquiry
    intent: "package_inquiry",
    pattern:
      /\b(pacote|pacotes|all inclusive|all-inclusive|pensao completa|tudo incluso|o que inclui|o que esta incluso|inclui o que|pacote de pesca)\b/i,
  },
  {
    // Fishing (after birdwatching and day_use to avoid false positives)
    intent: "fishing",
    pattern:
      /\b(pesca|pescar|pescaria|peixe|peixes|isca|tuvira|lancha|guia de pesca|dourado|pacu|tucunare|piranha|fishing|angling)\b/i,
  },
  {
    // V3: Availability
    intent: "availability",
    pattern:
      /\b(disponibilidade|tem vaga|vagas|availability|available|habitacion disponible|hay lugar|ocupacao)\b/i,
  },
  {
    // V4: Explicit price/rate queries
    intent: "rates",
    pattern:
      /\b(quanto custa|qual o preco|qual o valor|qual a tarifa|tarifas|tarifa|preco|precos|valor|valores|price|prices|rate|rates|precio|precios|quanto fica|quanto seria|custa quanto|diaria|diarias)\b/i,
  },
  {
    // V2: Policies
    intent: "policy",
    pattern:
      /\b(politica|politicas|cancelamento|reembolso|pet|pets|crianca|criancas|policy|policies|cancellation|refund|cancelacion)\b/i,
  },
  {
    // H0: Reservation help
    intent: "reservation_help",
    pattern:
      /\b(reserva|reservar|booking|book|reservation|reservacion|confirmacao|minha reserva|codigo de reserva|ja tenho reserva)\b/i,
  },
];

export function detectVisitorIntent(message: string): VisitorIntent {
  const normalized = normalizeText(message);

  for (let index = 0; index < intentMatchers.length; index += 1) {
    const matcher = intentMatchers[index];
    if (matcher.pattern.test(normalized)) {
      return matcher.intent;
    }
  }

  return "general";
}

const profileMatchers: Array<{ profile: VisitorProfile; pattern: RegExp }> = [
  {
    profile: "pescador",
    pattern:
      /\b(pesca|pescar|pescaria|peixe|dourado|pacu|tucunare|lancha|guia de pesca|tuvira|isca|angling|fish)\b/i,
  },
  {
    profile: "birdwatcher",
    pattern:
      /\b(passaro|passaros|ave|aves|bird|birds|birdwatching|observa[cç][aã]o|tuiuiu|arara|tucano|fotografo|fotografia|wildlife|ornitologia)\b/i,
  },
  {
    profile: "familia",
    pattern:
      /\b(familia|filhos|filhas|criancas|crianca|kids|children|child|familia numerosa)\b/i,
  },
  {
    profile: "casal",
    pattern:
      /\b(casal|lua de mel|honeymoon|romantico|romantica|dois adultos|eu e minha|eu e meu|partner|couple)\b/i,
  },
  {
    profile: "grupo",
    pattern:
      /\b(grupo|grupos|empresa|retiro corporativo|evento|equipe corporativa|team building|group tour)\b/i,
  },
];

export function detectVisitorProfile(message: string): VisitorProfile {
  const normalized = normalizeText(message);

  for (let index = 0; index < profileMatchers.length; index += 1) {
    const matcher = profileMatchers[index];
    if (matcher.pattern.test(normalized)) {
      return matcher.profile;
    }
  }

  return "unknown";
}

export function detectVisitorStage(
  message: string,
  historyLength: number,
): VisitorStage {
  const normalized = normalizeText(message);

  // E4: Existing guest
  if (
    /\b(ja tenho reserva|minha reserva|codigo de reserva|reservation code|check.in amanha|checkin amanha|hóspede)\b/.test(
      normalized,
    )
  ) {
    return "E4";
  }

  // E3: Clear booking intent
  if (
    /\b(quero reservar|vou reservar|finalizar reserva|confirmar reserva|pronto para reservar|book now|fechar reserva)\b/.test(
      normalized,
    )
  ) {
    return "E3";
  }

  // E2: Comparing — has price questions with conversation context
  if (
    historyLength >= 2 &&
    /\b(quanto|preco|valor|tarifa|comparar|opcao|opcoes|alternativa|\d{1,2}[/\-]\d{1,2})\b/.test(
      normalized,
    )
  ) {
    return "E2";
  }

  // E1: Exploring
  return "E1";
}

export function getIntentStyleRules(
  intent: VisitorIntent,
  profile: VisitorProfile = "unknown",
): string[] {
  switch (intent) {
    case "negotiation":
      return [
        "Objetivo: solicitação comercial sensível (desconto/upgrade/negociação).",
        "REGRA ABSOLUTA: não prometa desconto, upgrade, condição especial ou parcelamento.",
        "Resposta padrão: 'Para condições especiais, nossa equipe pode avaliar diretamente. Posso encaminhar sua mensagem?'",
        "Sempre escalone para equipe humana sem exceção.",
      ];

    case "fishing":
      return [
        "Objetivo: interesse em pesca esportiva.",
        "Enfatize: 100% Cota Zero, guia especializado, lancha equipada, tuviras inclusas, combustível incluso, estrutura completa.",
        "Antes de preço: confirme número de pescadores e datas.",
        "Recomende: pacote All Inclusive com Pesca.",
        "Upsell contextual (nunca empurrado): ofereça safári noturno como complemento.",
        "Nunca prometer captura garantida.",
      ];

    case "birdwatching":
      return [
        "Objetivo: interesse em observação de aves / birdwatching.",
        "Enfatize: 166 espécies catalogadas (estudo técnico Mai/2024), espécies ameaçadas, espécies restritas ao Pantanal.",
        "Posicione como especialista: 'Temos um dos maiores levantamentos ornitológicos do Pantanal.'",
        "Janela ideal para birdwatching: abril a setembro.",
        "Upsell contextual: deslocamento embarcado + trilhas especializadas.",
        "Nunca exagerar ou inventar espécies.",
      ];

    case "package_inquiry":
      return [
        "Objetivo: consulta sobre pacotes disponíveis.",
        "Apresente os 3 pacotes: All Inclusive sem pesca, All Inclusive com pesca, Day Use pesca.",
        "Antes de recomendar: confirme perfil (pescador ou natureza/relaxamento?).",
        "Estrutura obrigatória: o que inclui → valores base → disclaimer → CTA.",
      ];

    case "day_use":
      return [
        "Objetivo: consulta sobre Day Use Pesca.",
        "Day Use inclui: café da manhã, almoço, bebidas, lancha, guia, combustível, tuviras.",
        "Valores base: individual R$ 1.550 | dupla R$ 1.350/pessoa | trio R$ 1.100/pessoa.",
        "Sempre incluir disclaimer de variação e perguntar datas.",
      ];

    case "availability":
      return [
        "Objetivo: verificar disponibilidade de acomodações.",
        "Se datas não informadas: 'Você já tem datas em mente ou ainda está avaliando períodos?'",
        "Sempre inclua: 'Disponibilidade sujeita a confirmação no momento da reserva.'",
        "Se sem disponibilidade: ofereça encaminhamento sem prometer vaga.",
      ];

    case "rates":
      return [
        "Objetivo: informar tarifas e preços.",
        "Estrutura obrigatória: 1) Reconhecimento 2) Contexto/o que inclui 3) Valores 4) Disclaimer 5) CTA.",
        "OBRIGATÓRIO: 'Valores a partir de, sujeitos a variação conforme datas, ocupação e disponibilidade. Confirmação final no motor de reservas.'",
        profile === "pescador"
          ? "Perfil pescador detectado: recomende All Inclusive com Pesca."
          : "Recomende All Inclusive sem pesca (padrão) ou com pesca conforme perfil.",
        "Feche com: 'Quer que eu verifique as datas exatas para você agora?'",
      ];

    case "policy":
      return [
        "Objetivo: esclarecer políticas e regras.",
        "Formato: 2 a 4 frases objetivas, sem blocos longos.",
        "Sempre inclua: 'Confira os termos completos no momento da reserva.'",
        "Se faltar certeza documental: prefira confirmar com equipe.",
      ];

    case "reservation_help":
      return [
        "Objetivo: consultar reserva existente ou orientar nova reserva.",
        "Reserva existente — fluxo obrigatório (1 pergunta por vez): 1) código da reserva → 2) e-mail.",
        "Após getReservation OK: apresente os dados em LISTA CURTA com quebra de linha — check-in, check-out, acomodação, status. Máximo 4 linhas.",
        "Depois pergunte: 'Precisa de alguma alteração?' — só ofereça contato da equipe SE o hóspede pedir (WhatsApp primeiro, nunca 3 canais juntos).",
        "Se falhar: 'Não encontrei com esses dados. Quer que a equipe verifique?' — sem revelar se a reserva existe.",
        "Nova reserva: datas → ocupação → CTA motor de reservas.",
        "Se API fora: 'No momento não consigo acessar. Posso pedir à equipe?' — nunca expor erro técnico.",
      ];

    default:
      return getGeneralStyleRules(profile);
  }
}

function getGeneralStyleRules(profile: VisitorProfile): string[] {
  const base = [
    "Objetivo: informação geral ou saudação.",
    "Se for saudação simples (oi, olá, hello): 1 frase acolhedora + ofereça ajuda.",
    "Nunca assuma que o usuário quer disponibilidade ou preço sem pedir explicitamente.",
    "Identifique perfil com 1 pergunta estratégica: 'Sua viagem é mais para pesca, observação de aves ou descanso na natureza?'",
  ];

  switch (profile) {
    case "pescador":
      base.push(
        "Perfil pescador detectado: destaque pesca 100% Cota Zero como diferencial único.",
      );
      break;
    case "birdwatcher":
      base.push(
        "Perfil birdwatcher detectado: destaque as 166 espécies catalogadas e trilhas estruturadas.",
      );
      break;
    case "familia":
      base.push(
        "Perfil família detectado: enfatize estrutura completa, segurança e atividades para todos.",
      );
      break;
    case "casal":
      base.push(
        "Perfil casal detectado: enfatize privacidade, imersão e experiência exclusiva na natureza.",
      );
      break;
    case "grupo":
      base.push(
        "Perfil grupo detectado: encaminhe para equipe humana para condições especiais de grupo.",
      );
      break;
    default:
      break;
  }

  return base;
}
