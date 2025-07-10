import type { TextFieldProps } from "@mui/material";

export interface TextInputProps
  extends Omit<TextFieldProps<"outlined">, "variant" | "onChange"> {
  name: string;
  label?: string;
  onChange: (e: string | number | boolean) => void;
  value?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  fontSize?: string;
  helperFontSize?: string;
}
