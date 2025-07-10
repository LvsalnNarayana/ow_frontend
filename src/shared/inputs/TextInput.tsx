import { type JSX, useState, type ChangeEvent } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import type { TextInputProps } from "../../interface/TextInputProps.interface";

const TextInput = ({
  name,
  value: initialValue = "",
  onChange,
  label,
  placeholder = "Type Something…",
  helperText = "",
  error = false,
  disabled = false,
  fontSize = "15px",
  helperFontSize = "12px",
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
          mx: 1,
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
        type="text"
        placeholder={placeholder}
        helperText={helperText}
        error={error}
        fullWidth
        disabled={disabled}
        InputProps={{
          sx: (theme) => ({
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
              fontSize: fontSize,
              opacity: 0.5,
            },
            "& .MuiInputBase-input": {
              color: theme.palette.text.primary,
              fontSize: fontSize,
              verticalAlign: "middle",
              display: "flex",
              alignItems: "center",
              lineHeight: 1,
              height: "20px",
              padding: "8px 12px",
              borderWidth: 1,
            },
          }),
        }}
        FormHelperTextProps={{
          sx: (theme) => ({
            mx: 1,
            mt: 1,
            backgroundColor: "transparent",
            fontSize: helperFontSize,
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
