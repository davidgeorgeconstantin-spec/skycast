import { useQuery } from '@tanstack/react-query';
import { searchCities } from '@/lib/api';
import { useDebounce } from './useDebounce';

export function useCitySearch(query: string) {
  const debounced = useDebounce(query.trim(), 350);
  return useQuery({
    queryKey: ['cities', debounced],
    queryFn: ({ signal }) => searchCities(debounced, signal),
    enabled: debounced.length >= 2, // don't search for 0–1 letters
    staleTime: 1000 * 60 * 60,
  });
}
