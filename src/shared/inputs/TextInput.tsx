// External
import { type JSX, useState, type ChangeEvent } from "react";


// MUI
import { Stack, TextField, Typography } from "@mui/material";


// Parent, Sibling, Index
import type { TextInputProps } from "../../interface/TextInputProps.interface";

const TextInput = ({
  name,
  label,
  onChange,
  error = false,
  type = "text",
  helperText = "",
  disabled = false,
  fontSize = "14px",
  helperFontSize = "12px",
  value: initialValue = "",
  placeholder = "Type Something…",
}: TextInputProps): JSX.Element => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e?.target?.value);
  };

  return (
    <Stack gap={label ? 1 : 0} width={"100%"}>
      <Typography
        component={"label"}
        variant="body1"
        fontSize={fontSize}
        id={`label_${name}`}
        htmlFor={`input_${name}`}
        sx={{
          mx: 0,
        }}
      >
        {label}
      </Typography>
      <TextField
        name={name}
        variant="outlined"
        id={`input_${name}`}
        value={value}
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        helperText={helperText}
        error={error}
        fullWidth
        disabled={disabled}
        InputProps={{
          sx: (theme) => ({
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
            "&.Mui-error:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.error.main,
            },
            "&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.error.main,
            },
            "&.Mui-disabled.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.text.disabled,
            },

            "&.Mui-disabled:hover .MuiOutlinedInput-notchedOutline": {
              backgroundColor: theme.palette.action.disabledBackground,
            },
            "& .MuiInputBase-input::placeholder": {
              opacity: 0.5,
              fontSize: fontSize,
              color: theme.palette.text.primary,
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
              height: "20px",
              display: "flex",
              fontSize: fontSize,
              padding: "8px 12px",
              alignItems: "center",
              verticalAlign: "middle",
              color: theme.palette.text.primary,
            },
          }),
        }}
        FormHelperTextProps={{
          sx: (theme) => ({
            mx: 1,
            mt: 1,
            fontSize: helperFontSize,
            backgroundColor: "transparent",
            color: disabled
              ? theme.palette.text.disabled
              : error
              ? theme.palette.error.main
              : theme.palette.text.secondary,
          }),
        }}
      />
    </Stack>
  );
};

export default TextInput;
