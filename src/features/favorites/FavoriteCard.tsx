import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Skeleton } from '@/components/ui/Skeleton';
import { useForecast } from '@/hooks/useForecast';
import { describeWeather } from '@/lib/weatherCodes';
import { cityPath } from '@/lib/routes';
import { tempUnit } from '@/lib/format';
import { WeatherIcon } from '@/features/weather/WeatherIcon';
import { useSettings } from '@/features/settings/SettingsContext';
import type { City } from '@/types/weather';

export function FavoriteCard({ city }: { city: City }) {
  const { units, toggleFavorite } = useSettings();
  const { data, isLoading } = useForecast(city.latitude, city.longitude, units);
  const info = data ? describeWeather(data.current.weatherCode) : null;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group relative"
    >
      <Link to={cityPath(city)} className="block rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl transition-colors hover:bg-white/15">
        <p className="font-semibold">{city.name}</p>
        <p className="text-xs text-white/60">{city.country}</p>
        {isLoading || !data || !info ? (
          <Skeleton className="mt-4 h-14" />
        ) : (
          <div className="mt-3 flex items-center justify-between">
            <span className="text-4xl font-bold">
              {Math.round(data.current.temperature)}
              <span className="text-lg text-white/60">{tempUnit(units)}</span>
            </span>
            <WeatherIcon kind={info.kind} isDay={data.current.isDay} size={56} />
          </div>
        )}
      </Link>
      <button
        onClick={() => toggleFavorite(city)}
        aria-label={`Remove ${city.name} from favorites`}
        className="absolute right-3 top-3 rounded-full bg-black/20 px-2 py-0.5 text-sm opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
      >
        ✕
      </button>
    </motion.li>
  );
}
