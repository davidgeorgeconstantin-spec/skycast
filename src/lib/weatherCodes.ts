import type { WeatherKind } from '@/types/weather';

/** WMO weather codes used by Open-Meteo → label + visual kind. */
const CODES: Record<number, { label: string; kind: WeatherKind }> = {
  0: { label: 'Clear sky', kind: 'clear' },
  1: { label: 'Mainly clear', kind: 'partly' },
  2: { label: 'Partly cloudy', kind: 'partly' },
  3: { label: 'Overcast', kind: 'cloudy' },
  45: { label: 'Fog', kind: 'fog' },
  48: { label: 'Rime fog', kind: 'fog' },
  51: { label: 'Light drizzle', kind: 'rain' },
  53: { label: 'Drizzle', kind: 'rain' },
  55: { label: 'Dense drizzle', kind: 'rain' },
  61: { label: 'Light rain', kind: 'rain' },
  63: { label: 'Rain', kind: 'rain' },
  65: { label: 'Heavy rain', kind: 'rain' },
  71: { label: 'Light snow', kind: 'snow' },
  73: { label: 'Snow', kind: 'snow' },
  75: { label: 'Heavy snow', kind: 'snow' },
  77: { label: 'Snow grains', kind: 'snow' },
  80: { label: 'Rain showers', kind: 'rain' },
  81: { label: 'Rain showers', kind: 'rain' },
  82: { label: 'Violent showers', kind: 'rain' },
  85: { label: 'Snow showers', kind: 'snow' },
  86: { label: 'Snow showers', kind: 'snow' },
  95: { label: 'Thunderstorm', kind: 'storm' },
  96: { label: 'Thunderstorm, hail', kind: 'storm' },
  99: { label: 'Thunderstorm, hail', kind: 'storm' },
};

export function describeWeather(code: number) {
  return CODES[code] ?? { label: 'Unknown', kind: 'cloudy' as WeatherKind };
}

/** Background gradient per weather kind (Tailwind classes). */
export const KIND_GRADIENT: Record<WeatherKind, string> = {
  clear: 'from-sky-400 via-sky-500 to-indigo-600',
  partly: 'from-sky-500 via-indigo-500 to-violet-600',
  cloudy: 'from-slate-500 via-slate-600 to-slate-800',
  fog: 'from-zinc-400 via-slate-500 to-slate-700',
  rain: 'from-blue-600 via-indigo-700 to-slate-900',
  snow: 'from-cyan-200 via-sky-400 to-indigo-500',
  storm: 'from-violet-800 via-slate-800 to-black',
};
