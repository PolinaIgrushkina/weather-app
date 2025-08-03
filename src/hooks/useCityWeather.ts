import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather } from "@/api/getCurrentWeather";

type WeatherData = {
  id: number;
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
};

export const useWeather = (city: string) =>
  useQuery<WeatherData>({
    queryKey: ["weather", city],
    queryFn: () => getCurrentWeather(city),
    refetchInterval: 3600000,
  });
