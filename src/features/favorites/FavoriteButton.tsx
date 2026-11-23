import { AnimatePresence, motion } from 'motion/react';
import { useSettings } from '@/features/settings/SettingsContext';
import type { City } from '@/types/weather';

/** Heart button with a "pop" micro-interaction and a burst of particles. */
export function FavoriteButton({ city }: { city: City }) {
  const { isFavorite, toggleFavorite } = useSettings();
  const active = isFavorite(city.id);

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={() => toggleFavorite(city)}
      aria-pressed={active}
      className="relative flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur"
    >
      <motion.span key={String(active)} initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 12 }}>
        {active ? '❤️' : '🤍'}
      </motion.span>
      {active ? 'Saved' : 'Save city'}
      <AnimatePresence>
        {active &&
          Array.from({ length: 6 }).map((_, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute left-6 top-1/2 h-1.5 w-1.5 rounded-full bg-pink-300"
              initial={{ opacity: 1, x: 0, y: 0 }}
              animate={{ opacity: 0, x: Math.cos((i / 6) * Math.PI * 2) * 22, y: Math.sin((i / 6) * Math.PI * 2) * 22 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          ))}
      </AnimatePresence>
    </motion.button>
  );
}
