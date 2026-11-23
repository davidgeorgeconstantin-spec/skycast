import { useEffect, useState } from 'react';

/** Returns `value` only after it stopped changing for `delay` ms. */
export function useDebounce<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id); // cleanup: cancel the previous timer
  }, [value, delay]);
  return debounced;
}
