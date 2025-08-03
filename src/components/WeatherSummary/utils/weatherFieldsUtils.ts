import { formatTime, getWindDirection } from "@/utils";
import { WeatherData } from "../types/WeatherData";

export interface WeatherFieldData {
  label: string;
  value: string | number;
  unit: string;
}

export const getStandardWeatherFields = (
  data: WeatherData,
): WeatherFieldData[] => {
  const { main, visibility, clouds, sys, timezone = 0 } = data;

  return [
    {
      label: "Humidity",
      value: main.humidity,
      unit: "%",
    },
    {
      label: "Pressure",
      value: main.pressure,
      unit: " hPa",
    },
    {
      label: "Cloudiness",
      value: clouds?.all ?? "?",
      unit: "%",
    },
    {
      label: "Visibility",
      value: visibility ? `${visibility / 1000} km` : "N/A",
      unit: "",
    },
    {
      label: "Sunrise",
      value: formatTime(sys.sunrise, timezone),
      unit: "",
    },
    {
      label: "Sunset",
      value: formatTime(sys.sunset, timezone),
      unit: "",
    },
  ];
};

export const getConditionalWeatherFields = (
  data: WeatherData,
): WeatherFieldData[] => {
  const { main, wind } = data;
  const fields: WeatherFieldData[] = [];

  if (main.temp_min !== undefined && main.temp_max !== undefined) {
    fields.push({
      label: "Min/Max",
      value: `${Math.round(main.temp_min)}°C / ${Math.round(main.temp_max)}°C`,
      unit: "",
    });
  }

  const windInfo = `${wind.speed} m/s, direction: ${getWindDirection(wind.deg)}${
    wind.gust ? ` (gusts up to ${wind.gust} m/s)` : ""
  }`;

  fields.push({
    label: "Wind",
    value: windInfo,
    unit: "",
  });

  return fields;
};
