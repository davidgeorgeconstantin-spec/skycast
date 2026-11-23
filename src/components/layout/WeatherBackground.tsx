import { AnimatePresence, motion } from 'motion/react';
import { createPortal } from 'react-dom';
import { KIND_GRADIENT } from '@/lib/weatherCodes';
import type { WeatherKind } from '@/types/weather';

/**
 * Full-screen gradient that cross-fades when the weather type changes.
 * Rendered with a portal into <body>, because a parent with `transform` would break `position: fixed`.
 */
export function WeatherBackground({ kind }: { kind: WeatherKind | 'default' }) {
  const gradient = kind === 'default' ? 'from-indigo-500 via-sky-600 to-slate-900' : KIND_GRADIENT[kind];
  return createPortal(
    <AnimatePresence>
      <motion.div
        key={kind}
        aria-hidden="true"
        className={`fixed inset-0 -z-10 bg-gradient-to-br ${gradient}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      />
    </AnimatePresence>,
    document.body,
  );
}
