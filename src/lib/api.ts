import type { City, Forecast, Units } from '@/types/weather';

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

/** Small fetch wrapper: throws a readable error for non-2xx responses. */
async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return (await res.json()) as T;
}

// ---- Raw API shapes (only the fields we use) ----
interface GeoResponse {
  results?: {
    id: number;
    name: string;
    country: string;
    country_code?: string;
    admin1?: string;
    latitude: number;
    longitude: number;
  }[];
}

interface ForecastResponse {
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
    is_day: number;
  };
  hourly: { time: string[]; temperature_2m: number[]; precipitation_probability: number[] };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    sunrise: string[];
    sunset: string[];
  };
}

export async function searchCities(query: string, signal?: AbortSignal): Promise<City[]> {
  const params = new URLSearchParams({ name: query, count: '6', language: 'en', format: 'json' });
  const data = await getJson<GeoResponse>(`${GEO_URL}?${params}`, signal);
  return (data.results ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    country: r.country,
    countryCode: r.country_code,
    admin1: r.admin1,
    latitude: r.latitude,
    longitude: r.longitude,
  }));
}

export async function getForecast(lat: number, lon: number, units: Units, signal?: AbortSignal): Promise<Forecast> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day',
    hourly: 'temperature_2m,precipitation_probability',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
    temperature_unit: units,
    wind_speed_unit: 'kmh',
    timezone: 'auto',
    forecast_days: '7',
  });
  const d = await getJson<ForecastResponse>(`${FORECAST_URL}?${params}`, signal);

  // Keep only the next 24 hours, starting from the current hour.
  const startIndex = Math.max(0, d.hourly.time.findIndex((t) => t >= d.current.time.slice(0, 13)));
  const hourly = d.hourly.time.slice(startIndex, startIndex + 24).map((time, i) => ({
    time,
    temperature: d.hourly.temperature_2m[startIndex + i] ?? 0,
    rainChance: d.hourly.precipitation_probability[startIndex + i] ?? 0,
  }));

  return {
    timezone: d.timezone,
    current: {
      time: d.current.time,
      temperature: d.current.temperature_2m,
      feelsLike: d.current.apparent_temperature,
      humidity: d.current.relative_humidity_2m,
      windSpeed: d.current.wind_speed_10m,
      weatherCode: d.current.weather_code,
      isDay: d.current.is_day === 1,
    },
    daily: d.daily.time.map((date, i) => ({
      date,
      weatherCode: d.daily.weather_code[i] ?? 0,
      max: d.daily.temperature_2m_max[i] ?? 0,
      min: d.daily.temperature_2m_min[i] ?? 0,
      rainChance: d.daily.precipitation_probability_max[i] ?? 0,
      sunrise: d.daily.sunrise[i] ?? '',
      sunset: d.daily.sunset[i] ?? '',
    })),
    hourly,
  };
}
