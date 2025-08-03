"use client";
import Image from "next/image";
import styles from "./CityCard.module.scss";
import { useWeather } from "@/hooks/useCityWeather";
import { getWeatherIconUrl } from "@/api";
import { CardSkeleton } from "../CardSkeleton";
import { RiDeleteBin5Line } from "react-icons/ri";
import Link from "next/link";

type WeatherCardProps = { city: string; onDelete: (city: string) => void };

export const CityCard = ({ city, onDelete }: WeatherCardProps) => {
  const { data, isLoading, isError, refetch } = useWeather(city);

  if (isLoading) return <CardSkeleton />;
  if (isError || !data)
    return <div className={styles.card}>Error loading weather for {city}</div>;

  const iconUrl = getWeatherIconUrl(data.weather[0].icon);

  return (
    <Link href={`/city/${encodeURIComponent(city)}`} className={styles.card}>
      <div className={styles.card__header}>
        <h3 className="title--05">
          {data.name}, {data.sys.country}
        </h3>
        <Image
          src={iconUrl}
          alt={data.weather[0].description}
          width={70}
          height={70}
          className={styles.icon}
        />
      </div>
      <div className={styles.card__main}>
        <span>Temperature {Math.round(data.main.temp)}°C</span>
        <span>Feels like {Math.round(data.main.feels_like)}°C</span>
        <span>{data.weather[0].description}</span>
      </div>
      <button
        className={`${styles.card__updateBtn} button--accent`}
        onClick={() => refetch()}
      >
        <span>Update weather</span>
      </button>
      <button
        className={styles.card__deleteBtn}
        onClick={() => onDelete(city)}
        aria-label={`Delete ${city}`}
      >
        <RiDeleteBin5Line />
      </button>
    </Link>
  );
};
