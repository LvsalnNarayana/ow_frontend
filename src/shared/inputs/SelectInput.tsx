import { useState } from "react";
import {
  Stack,
  MenuItem,
  Select,
  Typography,
  FormHelperText,
  type SelectChangeEvent,
} from "@mui/material";
import type { SelectInputProps } from "../../interface/SelectInputProps.interface";

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  onChange,
  options = [],
  value: initialValue = "",
  placeholder = "",
  helperText = "",
  error = false,
  disabled = false,
  fontSize = "14px",
  helperFontSize = "12px",
  optionFontSize = "14px",
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <Stack gap={1} width={"100%"}>
      {label && (
        <Typography
          component="label"
          variant="body1"
          fontSize={fontSize}
          id={`label_${name}`}
          htmlFor={`input_${name}`}
          // sx={{ mx: 1 }}
        >
          {label}
        </Typography>
      )}
      <Select
        value={value}
        onChange={handleChange}
        error={error}
        disabled={disabled}
        size="small"
        variant="outlined"
        margin="none"
        sx={(theme) => ({
          color: theme.palette.text.primary,
          borderRadius: "6px",
          outline: "none",
          p: 0,
          "& .MuiOutlinedInput-notchedOutline": {
            outline: "none",
            borderWidth: 1,
            borderColor: error
              ? theme.palette.error.main
              : theme.palette.divider,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: error
              ? theme.palette.error.main
              : theme.palette.primary.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 1.5,
            borderColor: error
              ? theme.palette.error.main
              : theme.palette.primary.main,
          },
          "&.Mui-disabled": {
            backgroundColor: theme.palette.action.disabledBackground,
          },
          "&.Mui-disabled:hover .MuiOutlinedInput-notchedOutline": {
            backgroundColor: theme.palette.action.disabledBackground,
          },
          "&.Mui-disabled.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.disabled,
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error.main,
          },
          "&.Mui-error:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error.main,
          },
          "&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error.main,
          },
          "& .MuiInputBase-input::placeholder": {
            color: theme.palette.text.primary,
            opacity: 0.8,
          },
          "& .MuiInputBase-input": {
            color: value
              ? theme.palette.text.primary
              : `${theme.palette.text.primary}80`,
            fontSize: fontSize,
            verticalAlign: "middle",
            display: "flex",
            alignItems: "center",
            lineHeight: 1,
            padding: "8px 12px",
            borderWidth: 1,
          },
          "& .MuiInputBase-input.MuiSelect-select": {
            height: "20px",
            minHeight: "20px",
          },
        })}
        MenuProps={{
          PaperProps: {
            elevation: 0,
            sx: (theme) => ({
              mt: 1,
              maxHeight: 200,
              overflowY: "auto",
              borderRadius: "6px",
              border: `1px solid ${theme.palette.divider}`,
              "& .MuiMenuItem-root": {
                fontSize: optionFontSize,
              },
            }),
          },
          disableAutoFocusItem: true,
        }}
        autoFocus={false}
        inputProps={{
          "aria-label": `${name}_input`,
          id: `input_${name}`,
          name,
        }}
        displayEmpty
      >
        {placeholder && (
          <MenuItem value="" disabled sx={{ fontSize: optionFontSize }}>
            {placeholder}
          </MenuItem>
        )}
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            sx={{ fontSize: optionFontSize }}
            value={opt.value}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText
          id={`helper_${name}`}
          sx={(theme) => ({
            mx: 1,
            mt: 0.5,
            fontSize: helperFontSize,
            color: disabled
              ? theme.palette.text.disabled
              : error
              ? theme.palette.error.main
              : theme.palette.text.secondary,
          })}
        >
          {helperText}
        </FormHelperText>
      )}
    </Stack>
  );
};

export default SelectInput;
