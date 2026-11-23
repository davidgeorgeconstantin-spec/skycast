import { AnimatePresence, motion } from 'motion/react';
import { useId, useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router';
import { useCitySearch } from '@/hooks/useCitySearch';
import { cityPath } from '@/lib/routes';
import { cn } from '@/lib/cn';
import type { City } from '@/types/weather';

/** Accessible autocomplete (combobox): type, use ↑ ↓ and Enter, or click. */
export function CitySearch() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const navigate = useNavigate();
  const listId = useId();
  const { data: cities = [], isFetching, isError } = useCitySearch(query);

  function choose(city: City) {
    setOpen(false);
    setQuery('');
    navigate(cityPath(city));
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open || cities.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => (h + 1) % cities.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => (h - 1 + cities.length) % cities.length);
    } else if (e.key === 'Enter') {
      const city = cities[highlight];
      if (city) choose(city);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  const showList = open && query.trim().length >= 2;

  return (
    <div className="relative w-full max-w-xl">
      <div className="transition-transform duration-200 focus-within:scale-[1.02] flex items-center gap-3 rounded-2xl border border-white/20 bg-white/15 px-4 py-3 shadow-2xl shadow-indigo-900/30 backdrop-blur-xl">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="text-white/70">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-label="Search for a city"
          placeholder="Search a city… e.g. Bucharest"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setHighlight(0);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={onKeyDown}
          className="w-full bg-transparent text-lg placeholder:text-white/50 focus:outline-none"
        />
        {isFetching && <motion.span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} />}
      </div>

      <AnimatePresence>
        {showList && (
          <motion.ul
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-900/90 p-1.5 shadow-2xl backdrop-blur-xl"
          >
            {isError && <li className="px-3 py-2 text-sm text-rose-300">Could not search right now.</li>}
            {!isError && !isFetching && cities.length === 0 && <li className="px-3 py-2 text-sm text-white/60">No cities found.</li>}
            {cities.map((c, i) => (
              <motion.li
                key={c.id}
                role="option"
                aria-selected={i === highlight}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={() => choose(c)}
                className={cn('relative cursor-pointer rounded-xl px-3 py-2', i === highlight && 'text-slate-900')}
              >
                {i === highlight && <motion.span layoutId="search-highlight" className="absolute inset-0 -z-10 rounded-xl bg-white" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />}
                <span className="font-medium">{c.name}</span>
                <span className={cn('ml-2 text-sm', i === highlight ? 'text-slate-600' : 'text-white/50')}>{[c.admin1, c.country].filter(Boolean).join(', ')}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
