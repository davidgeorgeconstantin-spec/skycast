import { motion, useReducedMotion } from 'motion/react';
import type { WeatherKind } from '@/types/weather';

interface WeatherIconProps {
  kind: WeatherKind;
  isDay?: boolean;
  size?: number;
}

/** Animated SVG icon: spinning sun, drifting clouds, falling rain / snow, flashing lightning. */
export function WeatherIcon({ kind, isDay = true, size = 64 }: WeatherIconProps) {
  const reduce = useReducedMotion();
  const loop = (d: number) => (reduce ? { duration: 0 } : { duration: d, repeat: Infinity, ease: 'easeInOut' as const });

  const sun = (
    <motion.g animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} style={{ originX: '32px', originY: '26px' }}>
      <circle cx="32" cy="26" r="10" fill="#fde047" />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x="31" y="8" width="2" height="6" rx="1" fill="#fde047" transform={`rotate(${i * 45} 32 26)`} />
      ))}
    </motion.g>
  );
  const moon = <path d="M38 14a12 12 0 1 0 6 22 10 10 0 0 1-6-22z" fill="#e0e7ff" />;
  const cloud = (dark = false) => (
    <motion.path
      d="M18 48h28a9 9 0 0 0 0-18 12 12 0 0 0-23 3 7.5 7.5 0 0 0-5 15z"
      fill={dark ? '#94a3b8' : '#ffffff'}
      animate={reduce ? undefined : { x: [0, 3, 0] }}
      transition={loop(4)}
    />
  );
  const drops = (snow = false) =>
    [22, 32, 42].map((x, i) => (
      <motion.circle
        key={x}
        cx={x}
        cy={52}
        r={snow ? 2.2 : 1.6}
        fill={snow ? '#f8fafc' : '#7dd3fc'}
        animate={reduce ? undefined : { y: [0, 8], opacity: [1, 0] }}
        transition={{ duration: snow ? 1.8 : 0.9, repeat: Infinity, delay: i * 0.25, ease: 'easeIn' }}
      />
    ));

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={kind}>
      {(kind === 'clear' || kind === 'partly') && (isDay ? sun : moon)}
      {kind !== 'clear' && cloud(kind === 'storm' || kind === 'fog')}
      {kind === 'rain' && drops()}
      {kind === 'snow' && drops(true)}
      {kind === 'storm' && (
        <motion.path d="M33 46l-6 9h5l-3 7 9-11h-5l3-5z" fill="#facc15" animate={reduce ? undefined : { opacity: [0, 1, 0, 1, 0] }} transition={{ duration: 2.4, repeat: Infinity }} />
      )}
    </svg>
  );
}
