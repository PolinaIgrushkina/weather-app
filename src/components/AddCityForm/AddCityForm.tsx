"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { citySchema } from "@/utils";
import { getCurrentWeather } from "@/api/getCurrentWeather";
import { useCityStore } from "@/store/cityStore";
import AddCityFormView from "./AddCityFormView";
import { useCitySuggestions } from "@/hooks/useCitySuggestions";
import type { RawSuggestion } from "@/api/getCitySuggestions";

export type FormData = {
  city: string;
};

export const AddCityForm: React.FC = () => {
  const { addCity } = useCityStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(citySchema),
  });

  const cityInput = watch("city");
  const [hasSelectedSuggestion, setHasSelectedSuggestion] = useState(false);

  const { suggestions, showSuggestions, setShowSuggestions } =
    useCitySuggestions(cityInput, hasSelectedSuggestion);

  const onSelectSuggestion = (suggestion: RawSuggestion) => {
    const cityText = suggestion.state
      ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`;

    setValue("city", cityText, { shouldValidate: true });
    setHasSelectedSuggestion(true);
    setShowSuggestions(false);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasSelectedSuggestion(false);
    setValue("city", e.target.value);
  };

  const onSubmit = async (data: FormData) => {
    const trimmedCity = data.city.trim();
    try {
      await getCurrentWeather(trimmedCity);
      addCity(trimmedCity);
      reset();
      setHasSelectedSuggestion(false);
      setShowSuggestions(false);
    } catch {
      setError("city", {
        type: "manual",
        message: "City not found",
      });
    }
  };

  return (
    <AddCityFormView
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      cityInput={cityInput}
      onInputChange={onInputChange}
      onSelectSuggestion={onSelectSuggestion}
      suggestions={suggestions}
      showSuggestions={showSuggestions}
      setShowSuggestions={setShowSuggestions}
    />
  );
};
