import { motion } from 'motion/react';
import { Link } from 'react-router';
import { PageTransition } from '@/components/layout/PageTransition';
import { WeatherBackground } from '@/components/layout/WeatherBackground';
import { CitySearch } from '@/features/search/CitySearch';
import { FavoritesGrid } from '@/features/favorites/FavoritesGrid';
import { cityPath } from '@/lib/routes';
import { fadeUp, staggerContainer } from '@/lib/motion';
import type { City } from '@/types/weather';

const POPULAR: City[] = [
  { id: 683506, name: 'Bucharest', country: 'Romania', latitude: 44.43225, longitude: 26.10626 },
  { id: 2643743, name: 'London', country: 'United Kingdom', latitude: 51.50853, longitude: -0.12574 },
  { id: 5128581, name: 'New York', country: 'United States', latitude: 40.71427, longitude: -74.00597 },
  { id: 1850147, name: 'Tokyo', country: 'Japan', latitude: 35.6895, longitude: 139.69171 },
  { id: 2950159, name: 'Berlin', country: 'Germany', latitude: 52.52437, longitude: 13.41053 },
];

const TITLE = 'Weather, beautifully simple.';

export function HomePage() {
  return (
    <PageTransition>
      <WeatherBackground kind="default" />
      <section className="flex flex-col items-center pt-10 text-center sm:pt-20">
        {/* Each word animates in with a small stagger */}
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl" aria-label={TITLE}>
          {TITLE.split(' ').map((word, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="mr-[0.25em] inline-block"
              initial={{ opacity: 0, y: 30, rotateX: -60 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 200, damping: 18 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 max-w-xl text-white/75">
          Search any city in the world for the current weather, a 24-hour chart and a 7-day forecast. Free data from Open-Meteo.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8 flex w-full justify-center">
          <CitySearch />
        </motion.div>

        <motion.ul variants={staggerContainer} initial="hidden" animate="show" className="mt-6 flex flex-wrap justify-center gap-2">
          {POPULAR.map((c) => (
            <motion.li key={c.id} variants={fadeUp}>
              <Link to={cityPath(c)}>
                <motion.span whileHover={{ scale: 1.06, backgroundColor: 'rgba(255,255,255,0.25)' }} whileTap={{ scale: 0.95 }} className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
                  {c.name}
                </motion.span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </section>
      <FavoritesGrid />
    </PageTransition>
  );
}
