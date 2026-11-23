# Soluții: Proiectul 2, SkyCast

> Încearcă singur înainte! Soluțiile tale pot arăta altfel și pot fi la fel de bune.

## Soluția 1: rafale de vânt

`src/lib/api.ts`:
```ts
current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_gusts_10m,weather_code,is_day',
// în ForecastResponse.current:
wind_gusts_10m: number;
// în maparea current:
windGusts: d.current.wind_gusts_10m,
```
`src/types/weather.ts` → în `CurrentWeather`: `windGusts: number;`
`src/features/weather/CurrentWeatherCard.tsx` → în `stats`:
```ts
{ label: 'Gusts', value: `${Math.round(current.windGusts)} km/h` },
```
(Cu 5 carduri, schimbă grila în `sm:grid-cols-5`.)

## Soluția 2: „Updated X min ago”

`src/pages/CityPage.tsx`:
```tsx
import { useEffect, useState } from 'react';

const { data, isLoading, isError, error, refetch, dataUpdatedAt } = useForecast(...);
const [now, setNow] = useState(() => Date.now());

useEffect(() => {
  const id = setInterval(() => setNow(Date.now()), 30_000);
  return () => clearInterval(id);
}, []);

const minutes = dataUpdatedAt ? Math.floor((now - dataUpdatedAt) / 60_000) : null;

// sub <p> cu țara:
{minutes !== null && (
  <p className="text-xs text-white/50">{minutes === 0 ? 'Updated just now' : `Updated ${minutes} min ago`}</p>
)}
```

## Soluția 3: pagina About

`src/pages/AboutPage.tsx`:
```tsx
import { PageTransition } from '@/components/layout/PageTransition';

export function AboutPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-2xl py-16">
        <h1 className="text-4xl font-bold">About SkyCast</h1>
        <p className="mt-4 text-white/80">
          SkyCast is a learning project built with React, TypeScript, TanStack Query and Motion.
          Weather data comes from the free Open-Meteo API.
        </p>
      </div>
    </PageTransition>
  );
}
```
`src/App.tsx`: `<Route path="/about" element={<AboutPage />} />` (înainte de `*`).
`src/components/layout/Header.tsx`: lângă logo, `<Link to="/about" className="text-sm text-white/80 hover:text-white">About</Link>`.

## Soluția 4: hover pe rândurile prognozei

`src/features/weather/ForecastList.tsx`:
```tsx
<motion.li
  key={d.date}
  variants={fadeUp}
  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
  className="grid ... rounded-xl px-2"
>
```

## Soluția 5: puncte pe grafic

`src/features/weather/HourlyChart.tsx`, în `points.map(...)`, în interiorul `<g>`:
```tsx
{i % 3 === 0 && (
  <motion.circle
    cx={x(i)}
    cy={y(p.temperature)}
    r={3.5}
    fill="#fde68a"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 1.2 + i * 0.03, type: 'spring', stiffness: 400 }}
  />
)}
```
