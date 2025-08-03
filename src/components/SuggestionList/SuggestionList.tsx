"use client";
import React from "react";
import styles from "./SuggestionList.module.scss";

export type Suggestion = {
  name: string;
  country: string;
  lat: number;
  lon: number;
};

type SuggestionListProps = {
  suggestions: Suggestion[];
  onSelect: (suggestion: Suggestion) => void;
};

export const SuggestionList: React.FC<SuggestionListProps> = ({
  suggestions,
  onSelect,
}) => {
  return (
    <ul className={`${styles.suggestions__list} unmarked`}>
      {suggestions.map((city, index) => (
        <li
          key={`${city.name}-${city.lat}-${city.lon}-${index}`}
          className={styles.suggestions__item}
          onMouseDown={(e) => {
            e.preventDefault();
            onSelect(city);
          }}
        >
          {city.name}, {city.country}
        </li>
      ))}
    </ul>
  );
};
