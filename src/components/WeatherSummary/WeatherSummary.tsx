"use client";
import React from "react";
import Image from "next/image";
import { getWeatherIconUrl } from "@/api";
import { WeatherData } from "./types/WeatherData";
import {
  getStandardWeatherFields,
  getConditionalWeatherFields,
} from "./utils/weatherFieldsUtils";
import styles from "./WeatherSummary.module.scss";
import { WeatherField } from "./WeatherField";

interface WeatherSummaryProps {
  data: WeatherData;
}

export const WeatherSummary: React.FC<WeatherSummaryProps> = ({ data }) => {
  const { weather, main } = data;
  const iconUrl = getWeatherIconUrl(data.weather[0].icon);

  const standardFields = getStandardWeatherFields(data);
  const conditionalFields = getConditionalWeatherFields(data);

  return (
    <div className={styles.weatherSummary__container}>
      <div className={styles.weatherSummary__header}>
        <Image
          src={iconUrl}
          alt={weather[0].description}
          width={70}
          height={70}
        />
        <h2 className="title--05">{weather[0].description}</h2>
      </div>

      <div className={styles.weatherSummary__main}>
        <p>
          <strong>{Math.round(main.temp)}°C</strong> (feels like{" "}
          {Math.round(main.feels_like)}°C)
        </p>

        {standardFields.map((field, index) => (
          <WeatherField key={index} {...field} />
        ))}

        {conditionalFields.map((field, index) => (
          <WeatherField key={`conditional-${index}`} {...field} />
        ))}
      </div>
    </div>
  );
};
