import { motion } from 'motion/react';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { GlassCard } from '@/components/ui/GlassCard';
import { describeWeather } from '@/lib/weatherCodes';
import { tempUnit } from '@/lib/format';
import { fadeUp, staggerContainer } from '@/lib/motion';
import type { CurrentWeather, DailyForecast, Units } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';

interface Props {
  current: CurrentWeather;
  today?: DailyForecast;
  units: Units;
}

export function CurrentWeatherCard({ current, today, units }: Props) {
  const { label, kind } = describeWeather(current.weatherCode);
  const stats = [
    { label: 'Feels like', value: `${Math.round(current.feelsLike)}${tempUnit(units)}` },
    { label: 'Humidity', value: `${current.humidity}%` },
    { label: 'Wind', value: `${Math.round(current.windSpeed)} km/h` },
    { label: 'Rain chance', value: `${today?.rainChance ?? 0}%` },
  ];

  return (
    <GlassCard className="relative overflow-hidden p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-widest text-white/70">Now</p>
          <p className="mt-1 flex items-start text-7xl font-bold tracking-tighter sm:text-8xl">
            <AnimatedNumber value={current.temperature} />
            <span className="mt-3 text-3xl font-medium text-white/70">{tempUnit(units)}</span>
          </p>
          <p className="text-lg font-medium">{label}</p>
          {today && (
            <p className="text-sm text-white/70">
              H {Math.round(today.max)}° · L {Math.round(today.min)}°
            </p>
          )}
        </div>
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.15 }}>
          <WeatherIcon kind={kind} isDay={current.isDay} size={150} />
        </motion.div>
      </div>

      <motion.dl variants={staggerContainer} initial="hidden" animate="show" className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="rounded-2xl bg-white/10 p-3">
            <dt className="text-xs uppercase tracking-wide text-white/60">{s.label}</dt>
            <dd className="mt-1 text-lg font-semibold">{s.value}</dd>
          </motion.div>
        ))}
      </motion.dl>
    </GlassCard>
  );
}
