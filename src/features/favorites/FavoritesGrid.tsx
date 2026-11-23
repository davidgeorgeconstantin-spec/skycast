import { AnimatePresence, motion } from 'motion/react';
import { useSettings } from '@/features/settings/SettingsContext';
import { FavoriteCard } from './FavoriteCard';

export function FavoritesGrid() {
  const { favorites } = useSettings();
  if (favorites.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/70">Your favorites</h2>
      <motion.ul layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {favorites.map((c) => (
            <FavoriteCard key={c.id} city={c} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
