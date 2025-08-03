import React from "react";
import { WeatherFieldData } from "./utils/weatherFieldsUtils";

export const WeatherField: React.FC<WeatherFieldData> = ({
  label,
  value,
  unit,
}) => (
  <p>
    <strong>{label}:</strong> {value}
    {unit}
  </p>
);
