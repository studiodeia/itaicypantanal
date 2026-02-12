import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

interface MotionProviderProps {
  children: ReactNode;
}

export const MotionProvider = ({ children }: MotionProviderProps) => (
  <LazyMotion features={domAnimation}>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LazyMotion>
);
