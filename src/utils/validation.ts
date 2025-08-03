import * as yup from "yup";

export const citySchema = yup.object().shape({
  city: yup
    .string()
    .trim()
    .required("City is required")
    .min(2, "City must be at least 2 characters"),
});
