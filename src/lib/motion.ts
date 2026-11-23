import type { Transition, Variants } from 'motion/react';

/** Shared animation presets so every screen moves the same way. */
export const spring: Transition = { type: 'spring', stiffness: 260, damping: 26 };

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  enter: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, filter: 'blur(6px)', transition: { duration: 0.25 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: spring },
};
