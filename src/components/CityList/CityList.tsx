"use client";
import { useCityStore } from "@/store/cityStore";
import isEmpty from "is-empty";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./CityList.module.scss";
import { CityCard } from "../CityCard";

export const CityList = () => {
  const cities = useCityStore((state) => state.cities);
  const removeCity = useCityStore((state) => state.removeCity);
  const queryClient = useQueryClient();

  const handleRefetchAll = () => {
    cities.forEach((city) => {
      queryClient.invalidateQueries({ queryKey: ["weather", city] });
    });
  };

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
      {!isEmpty(cities) && (
        <button onClick={handleRefetchAll}>
          Update weather for all cities
        </button>
      )}
    </div>
  );
};
