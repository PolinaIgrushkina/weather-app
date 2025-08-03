const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface HourlyForecastItem {
  dt: number;
  main: {
    temp: number;
  };
}

interface ForecastResponse {
  list: HourlyForecastItem[];
}

export const getHourlyForecast = async (
  city: string,
): Promise<HourlyForecastItem[]> => {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch forecast: ${res.statusText}`);
  }

  const data: ForecastResponse = await res.json();

  return data.list.slice(0, 8);
};
