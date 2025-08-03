const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (city: string) => {
  const res = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`,
  );
  if (!res.ok) throw new Error("Error fetching weather data");
  return res.json();
};
