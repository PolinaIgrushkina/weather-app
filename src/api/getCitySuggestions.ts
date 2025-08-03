const BASE_URL = "https://api.openweathermap.org/geo/1.0/direct";
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export interface RawSuggestion {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
}

export const getCitySuggestions = async (
  query: string,
  limit = 5,
): Promise<RawSuggestion[]> => {
  const res = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(query)}&limit=${limit}&appid=${API_KEY}`,
  );

  if (!res.ok) throw new Error("Error fetching city suggestions");

  return res.json();
};
