import { motion } from 'motion/react';
import { GlassCard } from '@/components/ui/GlassCard';
import { describeWeather } from '@/lib/weatherCodes';
import { weekday } from '@/lib/format';
import { fadeUp, staggerContainer } from '@/lib/motion';
import type { DailyForecast } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';

export function ForecastList({ days }: { days: DailyForecast[] }) {
  // Range of the whole week, used to draw each day's min–max bar.
  const weekMin = Math.min(...days.map((d) => d.min));
  const weekMax = Math.max(...days.map((d) => d.max));
  const span = Math.max(1, weekMax - weekMin);

  return (
    <GlassCard>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/70">7-day forecast</h2>
      <motion.ul variants={staggerContainer} initial="hidden" animate="show" className="divide-y divide-white/10">
        {days.map((d, i) => {
          const { label, kind } = describeWeather(d.weatherCode);
          const left = ((d.min - weekMin) / span) * 100;
          const width = ((d.max - d.min) / span) * 100;
          return (
            <motion.li key={d.date} variants={fadeUp} className="grid grid-cols-[3.5rem_2.5rem_1fr_auto] items-center gap-3 py-2.5">
              <span className="font-medium">{i === 0 ? 'Today' : weekday(d.date)}</span>
              <WeatherIcon kind={kind} size={36} />
              <div className="flex items-center gap-3">
                <span className="w-8 text-right text-sm text-white/60">{Math.round(d.min)}°</span>
                <div className="relative h-1.5 flex-1 rounded-full bg-white/15" title={label}>
                  <motion.div
                    className="absolute h-full rounded-full bg-gradient-to-r from-sky-300 via-amber-300 to-orange-400"
                    style={{ left: `${left}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(width, 4)}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <span className="w-8 text-sm font-semibold">{Math.round(d.max)}°</span>
              </div>
              <span className="w-12 text-right text-xs text-sky-200">{d.rainChance > 0 ? `💧${d.rainChance}%` : ''}</span>
            </motion.li>
          );
        })}
      </motion.ul>
    </GlassCard>
  );
}
