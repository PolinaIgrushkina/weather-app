import { useEffect, useState } from "react";
import { getCitySuggestions, RawSuggestion } from "@/api/getCitySuggestions";

export const useCitySuggestions = (
  cityInput: string,
  hasSelectedSuggestion: boolean,
) => {
  const [suggestions, setSuggestions] = useState<RawSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (hasSelectedSuggestion || (cityInput?.trim().length ?? 0) < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(() => {
      getCitySuggestions(cityInput)
        .then((data) => {
          setSuggestions(data);
          setShowSuggestions(data.length > 0);
        })
        .catch(() => {
          setSuggestions([]);
          setShowSuggestions(false);
        });
    }, 400);

    return () => clearTimeout(timer);
  }, [cityInput, hasSelectedSuggestion]);

  return { suggestions, showSuggestions, setShowSuggestions };
};
