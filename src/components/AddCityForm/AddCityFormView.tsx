import React from "react";
import styles from "./AddCityForm.module.scss";
import { SuggestionList } from "../SuggestionList";
import type { RawSuggestion } from "@/api/getCitySuggestions";
import type { FormData } from "./AddCityForm";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface AddCityFormViewProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  isSubmitting: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  cityInput: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectSuggestion: (suggestion: RawSuggestion) => void;
  suggestions: RawSuggestion[];
  showSuggestions: boolean;
  setShowSuggestions: (value: boolean) => void;
}

const AddCityFormView: React.FC<AddCityFormViewProps> = ({
  register,
  errors,
  isSubmitting,
  onSubmit,
  cityInput,
  onInputChange,
  onSelectSuggestion,
  suggestions,
  showSuggestions,
  setShowSuggestions,
}) => {
  return (
    <div className={styles.form__wrapper} style={{ position: "relative" }}>
      <form
        onSubmit={onSubmit}
        className={`${styles.form__form} ${
          showSuggestions ? styles.form__formActive : ""
        }`}
        role="form"
        autoComplete="off"
      >
        <input
          type="text"
          placeholder="Enter a city"
          {...register("city")}
          value={cityInput || ""}
          onChange={onInputChange}
          disabled={isSubmitting}
          className={`${styles.form__input} ${
            errors.city ? styles.form__inputError : ""
          }`}
          onFocus={() => cityInput.length >= 2 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="button--accent"
        >
          <span>Add City</span>
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <SuggestionList
          suggestions={suggestions}
          onSelect={onSelectSuggestion}
        />
      )}

      {errors.city && (
        <p className={styles.form__error}>{errors.city.message}</p>
      )}
    </div>
  );
};

export default AddCityFormView;
