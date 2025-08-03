import { create } from "zustand";
import { persist } from "zustand/middleware";

type CityStore = {
  cities: string[];
  setCities: (cities: string[]) => void;
  addCity: (city: string) => void;
  removeCity: (city: string) => void;
};

const defaultCities = [
  "Kyiv",
  "Dnipro",
  "Lviv",
  "Donetsk",
  "Istanbul",
  "Alanya",
  "London",
  "New York",
];

export const useCityStore = create<CityStore>()(
  persist(
    (set, get) => ({
      cities: get()?.cities?.length ? get().cities : defaultCities,
      setCities: (cities) => set({ cities }),
      addCity: (city) => {
        if (!get().cities.includes(city)) {
          set({ cities: [...get().cities, city] });
        }
      },
      removeCity: (city) => {
        set({ cities: get().cities.filter((c) => c !== city) });
      },
    }),
    { name: "city-storage" },
  ),
);
