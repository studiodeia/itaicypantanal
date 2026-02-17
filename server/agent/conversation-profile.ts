export type VisitorIntent =
  | "availability"
  | "rates"
  | "policy"
  | "reservation_help"
  | "general";

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const intentMatchers: Array<{ intent: VisitorIntent; pattern: RegExp }> = [
  {
    intent: "availability",
    pattern:
      /\b(disponibilidade|tem vaga|vagas|availability|available|habitacion disponible|hay lugar|ocupacao)\b/i,
  },
  {
    intent: "rates",
    pattern:
      /\b(preco|precos|tarifa|tarifas|valor|valores|price|prices|rate|rates|precio|precios|tarifa)\b/i,
  },
  {
    intent: "policy",
    pattern:
      /\b(politica|politicas|cancelamento|reembolso|pet|pets|crianca|criancas|policy|policies|cancellation|refund|politica|cancelacion)\b/i,
  },
  {
    intent: "reservation_help",
    pattern:
      /\b(reserva|reservar|booking|book|reservation|reservacion|confirmacao|confirmacao de reserva)\b/i,
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

export function getIntentStyleRules(intent: VisitorIntent): string[] {
  switch (intent) {
    case "availability":
      return [
        "Objetivo desta resposta: disponibilidade.",
        "Formato: 1 frase de resumo + lista curta (max 3 itens) + proximo passo.",
        "Se nao houver disponibilidade clara, ofereca encaminhamento para equipe sem prometer vaga.",
      ];
    case "rates":
      return [
        "Objetivo desta resposta: tarifas/precos.",
        "Formato: resumo curto + valores encontrados (max 3 itens) + disclaimer comercial.",
        "Nunca omita que valores podem variar por data e ocupacao.",
      ];
    case "policy":
      return [
        "Objetivo desta resposta: politica/regras.",
        "Formato: 2 a 4 frases objetivas, sem texto longo.",
        "Se faltar certeza documental, prefira confirmar com equipe.",
      ];
    case "reservation_help":
      return [
        "Objetivo desta resposta: orientar reserva.",
        "Formato: 2 a 4 frases, com passo pratico final (link oficial ou equipe).",
      ];
    default:
      return [
        "Objetivo desta resposta: informacao geral.",
        "Formato: resposta curta (2 a 5 frases), clara e acolhedora.",
      ];
  }
}

