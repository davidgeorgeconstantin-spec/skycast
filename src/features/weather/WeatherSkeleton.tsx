import { Skeleton } from '@/components/ui/Skeleton';

export function WeatherSkeleton() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]" aria-busy="true" aria-label="Loading weather">
      <div className="space-y-5">
        <Skeleton className="h-80 rounded-3xl" />
        <Skeleton className="h-56 rounded-3xl" />
      </div>
      <Skeleton className="h-[34rem] rounded-3xl" />
    </div>
  );
}
