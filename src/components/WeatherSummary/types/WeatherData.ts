// src/components/WeatherSummary/types/WeatherData.ts
export interface WeatherData {
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min?: number;
    temp_max?: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility?: number;
  clouds?: {
    all: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  timezone?: number;
}
