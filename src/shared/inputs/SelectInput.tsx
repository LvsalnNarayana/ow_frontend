// External
import { useState } from "react";


// MUI
import {
  Stack,
  Select,
  MenuItem,
  Typography,
  FormHelperText,
  type SelectChangeEvent,
} from "@mui/material";


// Parent, Sibling, Index
import type { SelectInputProps } from "../../interface/SelectInputProps.interface";

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  onChange,
  options = [],
  error = false,
  helperText = "",
  placeholder = "",
  disabled = false,
  fontSize = "14px",
  helperFontSize = "12px",
  optionFontSize = "14px",
  value: initialValue = "",
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
          p: 0,
          outline: "none",
          borderRadius: "6px",
          color: theme.palette.text.primary,
          "&.Mui-disabled": {
            backgroundColor: theme.palette.action.disabledBackground,
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error.main,
          },
          "& .MuiInputBase-input.MuiSelect-select": {
            height: "20px",
            minHeight: "20px",
          },
          "&.Mui-error:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error.main,
          },
          "&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error.main,
          },
          "& .MuiInputBase-input::placeholder": {
            opacity: 0.8,
            color: theme.palette.text.primary,
          },
          "&.Mui-disabled.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.disabled,
          },
          "&.Mui-disabled:hover .MuiOutlinedInput-notchedOutline": {
            backgroundColor: theme.palette.action.disabledBackground,
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
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: 1,
            outline: "none",
            borderColor: error
              ? theme.palette.error.main
              : theme.palette.divider,
          },
          "& .MuiInputBase-input": {
            borderWidth: 1,
            lineHeight: 1,
            display: "flex",
            fontSize: fontSize,
            padding: "8px 12px",
            alignItems: "center",
            verticalAlign: "middle",
            color: value
              ? theme.palette.text.primary
              : `${theme.palette.text.primary}80`,
          },
        })}
        MenuProps={{
          disableAutoFocusItem: true,
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
        }}
        autoFocus={false}
        inputProps={{
          id: `input_${name}`,
          name,
          "aria-label": `${name}_input`,
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
