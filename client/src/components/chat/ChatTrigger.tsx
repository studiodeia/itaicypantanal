import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bellPaths } from "./bell-paths";
import type { Lang } from "@/i18n/context";

type ChatTriggerMessages = {
  messages: string[];
  hoverLabel: string;
  ariaLabel: string;
};

function getTriggerStrings(lang: Lang): ChatTriggerMessages {
  if (lang === "en") {
    return {
      messages: [
        "Can I help you?",
        "Talk to our team!",
        "Hello! Need anything?",
        "I'm here to help!",
      ],
      hoverLabel: "Chat with AI",
      ariaLabel: "Open AI chat agent",
    };
  }

  if (lang === "es") {
    return {
      messages: [
        "¿Puedo ayudarle?",
        "¡Hable con nuestro equipo!",
        "¡Hola! ¿Necesita algo?",
        "¡Estoy aquí para ayudar!",
      ],
      hoverLabel: "Chatea con la IA",
      ariaLabel: "Abrir agente de IA",
    };
  }

  return {
    messages: [
      "Posso ajudar você?",
      "Fale com nossa equipe!",
      "Olá! Precisa de algo?",
      "Estou aqui para ajudar!",
    ],
    hoverLabel: "Converse com a IA",
    ariaLabel: "Abrir chat com agente de IA",
  };
}

function WaveRing({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-full border border-[#E1A325]"
      initial={{ scale: 1, opacity: 0 }}
      animate={{
        scale: [1, 1.5, 2],
        opacity: [0, 0.25, 0],
      }}
      transition={{
        duration: 2.8,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeOut",
      }}
    />
  );
}

interface ChatTriggerProps {
  lang: Lang;
  onClick: () => void;
}

export function ChatTrigger({ lang, onClick }: ChatTriggerProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const ui = getTriggerStrings(lang);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      if (!hasInteracted) setShowTooltip(true);
    }, 3000);

    const interval = setInterval(() => {
      if (!hasInteracted) {
        setShowTooltip(true);
        setMessageIndex((prev) => (prev + 1) % ui.messages.length);
        setTimeout(() => setShowTooltip(false), 4000);
      }
    }, 8000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [hasInteracted, ui.messages.length]);

  useEffect(() => {
    if (showTooltip && !hasInteracted) {
      const timer = setTimeout(() => setShowTooltip(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip, hasInteracted]);

  return (
    <div className="flex flex-col items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {(showTooltip || isHovered) && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative rounded-2xl border border-amber-100/60 bg-white px-4 py-3 shadow-lg max-w-[200px]"
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 shrink-0">
                <motion.div
                  className="w-1 h-1 rounded-full bg-[#E1A325]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-1 h-1 rounded-full bg-[#E1A325]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-1 h-1 rounded-full bg-[#E1A325]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
                />
              </div>
              <p className="text-sm text-gray-600">
                {isHovered ? ui.hoverLabel : ui.messages[messageIndex]}
              </p>
            </div>
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-amber-100/60 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button wrapper */}
      <div className="relative">
        {/* Wave rings */}
        <WaveRing delay={0} />
        <WaveRing delay={0.7} />
        <WaveRing delay={1.4} />

        <motion.button
          className="relative w-[56px] h-[56px] flex items-center justify-center cursor-pointer bg-transparent border-none p-0"
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -3, 0] }}
          transition={{
            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            setHasInteracted(true);
            setShowTooltip(false);
            onClick();
          }}
          aria-label={ui.ariaLabel}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 665.578 641.202"
          >
            <defs>
              <clipPath id="clip0_trigger">
                <rect fill="white" height="641.202" width="665.578" />
              </clipPath>
            </defs>

            <g clipPath="url(#clip0_trigger)">
              {/* Circle */}
              <path d={bellPaths.circle} fill="#E1A325" />
              {/* Bell dome */}
              <path d={bellPaths.dome} fill="#E1A325" />
              {/* Bell base */}
              <path d={bellPaths.base} fill="#E1A325" />
              {/* Connector */}
              <path d={bellPaths.connector} fill="#E1A325" />
              {/* Bell clapper — animated wiggle on hover */}
              <motion.path
                d={bellPaths.clapper}
                fill="#E1A325"
                animate={
                  isHovered
                    ? {
                        x: [0, -6, 7, -5, 4, -2, 0],
                        y: [0, -1, 0, -1, 0, 0, 0],
                      }
                    : { x: 0, y: 0 }
                }
                transition={
                  isHovered
                    ? {
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 0.8,
                        ease: "easeInOut",
                      }
                    : { duration: 0.3, ease: "easeOut" }
                }
              />
            </g>
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
