"use client";
import React from "react";
import isEmpty from "is-empty";
import { useCityStore } from "@/store/cityStore";
import { CityCard } from "../CityCard";
import styles from "./CityList.module.scss";

export const CityList = () => {
  const cities = useCityStore((state) => state.cities);
  const removeCity = useCityStore((state) => state.removeCity);

  return (
    <div className={styles.list}>
      {!isEmpty(cities) &&
        cities.map((city) => (
          <CityCard
            key={city}
            city={city}
            onDelete={(cityToDelete) => removeCity(cityToDelete)}
          />
        ))}
    </div>
  );
};
