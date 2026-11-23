import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { City, Units } from '@/types/weather';

interface SettingsValue {
  units: Units;
  toggleUnits: () => void;
  favorites: City[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (city: City) => void;
}

const SettingsContext = createContext<SettingsValue | null>(null);

/** Global settings (units + favorite cities), saved in localStorage. */
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [units, setUnits] = useLocalStorage<Units>('skycast:units', 'celsius');
  const [favorites, setFavorites] = useLocalStorage<City[]>('skycast:favorites', []);

  const value = useMemo<SettingsValue>(
    () => ({
      units,
      toggleUnits: () => setUnits((u) => (u === 'celsius' ? 'fahrenheit' : 'celsius')),
      favorites,
      isFavorite: (id) => favorites.some((c) => c.id === id),
      toggleFavorite: (city) =>
        setFavorites((prev) =>
          prev.some((c) => c.id === city.id) ? prev.filter((c) => c.id !== city.id) : [city, ...prev],
        ),
    }),
    [units, favorites, setUnits, setFavorites],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside <SettingsProvider>');
  return ctx;
}
