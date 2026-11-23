import { cn } from '@/lib/cn';

/** Shimmering placeholder shown while data is loading. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('skeleton rounded-xl bg-white/10', className)} />;
}
