import type { Units } from '@/types/weather';

export const tempUnit = (units: Units) => (units === 'celsius' ? '°C' : '°F');
export const round = (n: number) => Math.round(n);

export function weekday(isoDate: string, short = true) {
  return new Date(isoDate + 'T12:00:00').toLocaleDateString('en-GB', { weekday: short ? 'short' : 'long' });
}

export function hourLabel(isoDateTime: string) {
  return isoDateTime.slice(11, 16);
}

export function cityLabel(c: { name: string; admin1?: string; country: string }) {
  return [c.name, c.admin1, c.country].filter(Boolean).join(', ');
}
