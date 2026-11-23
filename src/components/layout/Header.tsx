import { Link } from 'react-router';
import { motion } from 'motion/react';
import { useSettings } from '@/features/settings/SettingsContext';
import type { Units } from '@/types/weather';

const OPTIONS: { value: Units; label: string }[] = [
  { value: 'celsius', label: '°C' },
  { value: 'fahrenheit', label: '°F' },
];

export function Header() {
  const { units, toggleUnits } = useSettings();

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
      <Link to="/" className="group flex items-center gap-3">
        <motion.img
          src="./favicon.svg"
          alt=""
          className="h-10 w-10"
          whileHover={{ rotate: -12, scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        />
        <span className="text-xl font-bold tracking-tight">SkyCast</span>
      </Link>

      {/* Segmented control: the white "pill" slides with a shared layout animation */}
      <div role="radiogroup" aria-label="Temperature units" className="relative flex rounded-full bg-white/10 p-1 backdrop-blur">
        {OPTIONS.map((o) => (
          <button
            key={o.value}
            role="radio"
            aria-checked={units === o.value}
            onClick={() => units !== o.value && toggleUnits()}
            className="relative z-10 rounded-full px-4 py-1.5 text-sm font-semibold"
          >
            {units === o.value && (
              <motion.span layoutId="units-pill" className="absolute inset-0 -z-10 rounded-full bg-white" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
            )}
            <span className={units === o.value ? 'text-slate-900' : 'text-white/80'}>{o.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
}
