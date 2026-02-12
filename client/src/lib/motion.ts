import type { Variants, Transition } from "framer-motion";

// Easing organico (suave, nao mecanico)
export const ease = [0.25, 0.4, 0.25, 1] as const;

// Viewport config padrao — trigger cedo, animar uma vez
export const viewport = { once: true, amount: 0.15 } as const;

// Transicao padrao
export const transition: Transition = { duration: 0.6, ease };

// --- VARIANTS ---

// Fade up (uso mais comum: titulos, paragrafos, cards)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition },
};

// Fade in (sem translate, para labels e elementos leves)
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease } },
};

// Scale in (para imagens hero e cards grandes)
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
};

// Container stagger (para grids e listas)
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// Stagger mais lento (para hero elements)
export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

// Card item (usado dentro de stagger container)
export const cardItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition },
};
