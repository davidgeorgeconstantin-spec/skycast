import { motion } from 'motion/react';
import { Link, useParams, useSearchParams } from 'react-router';
import { PageTransition } from '@/components/layout/PageTransition';
import { WeatherBackground } from '@/components/layout/WeatherBackground';
import { ErrorState } from '@/components/ui/ErrorState';
import { CurrentWeatherCard } from '@/features/weather/CurrentWeatherCard';
import { ForecastList } from '@/features/weather/ForecastList';
import { HourlyChart } from '@/features/weather/HourlyChart';
import { WeatherSkeleton } from '@/features/weather/WeatherSkeleton';
import { FavoriteButton } from '@/features/favorites/FavoriteButton';
import { useSettings } from '@/features/settings/SettingsContext';
import { useForecast } from '@/hooks/useForecast';
import { describeWeather } from '@/lib/weatherCodes';
import type { City } from '@/types/weather';

export function CityPage() {
  const { lat = '', lon = '' } = useParams();
  const [params] = useSearchParams();
  const { units } = useSettings();

  const city: City = {
    id: Number(params.get('id') ?? 0),
    name: params.get('name') ?? 'Unknown place',
    country: params.get('country') ?? '',
    admin1: params.get('region') ?? undefined,
    latitude: Number(lat),
    longitude: Number(lon),
  };

  const { data, isLoading, isError, error, refetch } = useForecast(city.latitude, city.longitude, units);
  const kind = data ? describeWeather(data.current.weatherCode).kind : 'default';

  return (
    <PageTransition>
      <WeatherBackground kind={kind} />
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link to="/" className="text-sm text-white/70 hover:text-white">
            ← Back to search
          </Link>
          <motion.h1 layoutId={`city-${city.id}`} className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
            {city.name}
          </motion.h1>
          <p className="text-white/70">{[city.admin1, city.country].filter(Boolean).join(', ')}</p>
        </div>
        <FavoriteButton city={city} />
      </div>

      {isLoading && <WeatherSkeleton />}
      {isError && <ErrorState message={(error as Error).message} onRetry={() => refetch()} />}
      {data && (
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5">
            <CurrentWeatherCard current={data.current} today={data.daily[0]} units={units} />
            <HourlyChart points={data.hourly} />
          </div>
          <ForecastList days={data.daily} />
        </div>
      )}
    </PageTransition>
  );
}
