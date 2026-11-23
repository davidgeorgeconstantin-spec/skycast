import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { hourLabel } from '@/lib/format';
import type { HourlyPoint } from '@/types/weather';

const W = 720;
const H = 180;
const PAD = 24;

/** SVG line chart of the next 24 hours. The line "draws itself" with pathLength. */
export function HourlyChart({ points }: { points: HourlyPoint[] }) {
  const [active, setActive] = useState<number | null>(null);
  if (points.length < 2) return null;

  const temps = points.map((p) => p.temperature);
  const min = Math.min(...temps) - 1;
  const max = Math.max(...temps) + 1;
  const x = (i: number) => PAD + (i / (points.length - 1)) * (W - PAD * 2);
  const y = (t: number) => H - PAD - ((t - min) / (max - min)) * (H - PAD * 2);

  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.temperature).toFixed(1)}`).join(' ');
  const area = `${line} L${x(points.length - 1)},${H - PAD} L${x(0)},${H - PAD} Z`;
  const activePoint = active !== null ? points[active] : undefined;

  return (
    <GlassCard>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-white/70">Next 24 hours</h2>
        <AnimatePresence mode="wait">
          {activePoint && (
            <motion.span key={activePoint.time} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm">
              {hourLabel(activePoint.time)} · <b>{Math.round(activePoint.temperature)}°</b> · 💧{activePoint.rainChance}%
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full touch-none" onMouseLeave={() => setActive(null)} role="img" aria-label="Temperature for the next 24 hours">
        <defs>
          <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#fde68a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path d={area} fill="url(#area)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }} />
        <motion.path
          d={line}
          fill="none"
          stroke="#fde68a"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
        {points.map((p, i) => (
          <g key={p.time} onMouseEnter={() => setActive(i)} onTouchStart={() => setActive(i)}>
            <rect x={x(i) - (W - PAD * 2) / (points.length - 1) / 2} y={0} width={(W - PAD * 2) / (points.length - 1)} height={H} fill="transparent" />
            {i % 3 === 0 && (
              <text x={x(i)} y={H - 4} textAnchor="middle" className="fill-white/60 text-[11px]">
                {hourLabel(p.time)}
              </text>
            )}
          </g>
        ))}
        {activePoint && active !== null && (
          <motion.circle layout cx={x(active)} cy={y(activePoint.temperature)} r={6} fill="#fff" stroke="#f59e0b" strokeWidth={3} />
        )}
      </svg>
    </GlassCard>
  );
}
