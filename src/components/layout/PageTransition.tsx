import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { pageVariants } from '@/lib/motion';

/** Wrap every page so route changes fade/slide in and out. */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="enter" exit="exit" className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
      {children}
    </motion.main>
  );
}
