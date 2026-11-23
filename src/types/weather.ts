export type Units = 'celsius' | 'fahrenheit';

/** A place returned by the Open-Meteo geocoding API. */
export interface City {
  id: number;
  name: string;
  country: string;
  countryCode?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  time: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  isDay: boolean;
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  max: number;
  min: number;
  rainChance: number;
  sunrise: string;
  sunset: string;
}

export interface HourlyPoint {
  time: string;
  temperature: number;
  rainChance: number;
}

export interface Forecast {
  timezone: string;
  current: CurrentWeather;
  daily: DailyForecast[];
  hourly: HourlyPoint[]; // next 24 hours
}

export type WeatherKind = 'clear' | 'partly' | 'cloudy' | 'fog' | 'rain' | 'snow' | 'storm';
