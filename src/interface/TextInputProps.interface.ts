import type { TextFieldProps } from "@mui/material";

export interface TextInputProps
  extends Omit<TextFieldProps<"outlined">, "variant" | "onChange"> {
  name: string;
  label?: string;
  onChange: (e: string | number | boolean) => void;
  value?: string | number | boolean;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  fontSize?: string;
  helperFontSize?: string;
  type?: "text" | "number" | "password" | "email" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "month" | "week" | "color" | "file" | "range" | "checkbox" | "radio" | "hidden" | "button" | "submit" | "reset" | "image" | "month" | "week" | "datetime-local" | "month" | "week" | "datetime-local" | "month" | "week" | "datetime-local" | "month" | "week" | "datetime-local" | "month" | "week" | "datetime-local" | "month" | "week" | "datetime-local" | "month" | "week" | "datetime-local" | "month" | "week" | "datetime-local" | "month" | "week" | "datetime-local" | "month" | "week" | "datetime-local" | "month" | "week" | "datetime-local" | "month" | "week" | "datetime-local";
}
