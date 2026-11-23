import { useQuery } from '@tanstack/react-query';
import { getForecast } from '@/lib/api';
import type { Units } from '@/types/weather';

export function useForecast(lat: number, lon: number, units: Units) {
  return useQuery({
    queryKey: ['forecast', lat, lon, units],
    queryFn: ({ signal }) => getForecast(lat, lon, units, signal),
    staleTime: 1000 * 60 * 10, // weather is "fresh" for 10 minutes
    enabled: Number.isFinite(lat) && Number.isFinite(lon),
  });
}
