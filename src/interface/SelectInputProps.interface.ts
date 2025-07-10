// import type { SelectChangeEvent } from "@mui/material";
import type { JSX } from "react";

export interface SelectInputProps {
  name: string;
  label?: string | JSX.Element;
  onChange: (e: string | number) => void;
  options?: { value: string; label: string }[];
  value?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  fontSize?: string;
  helperFontSize?: string;
  optionFontSize?: string;
}
