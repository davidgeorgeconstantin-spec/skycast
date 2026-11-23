import type { City } from '@/types/weather';

/** Build the URL of a city page. All city data travels in the URL, so links can be shared. */
export function cityPath(c: City) {
  const params = new URLSearchParams({ name: c.name, country: c.country, id: String(c.id) });
  if (c.admin1) params.set('region', c.admin1);
  return `/city/${c.latitude.toFixed(4)}/${c.longitude.toFixed(4)}?${params}`;
}
