import {
  listItemIconClasses,
  listItemTextClasses,
  svgIconClasses,
  typographyClasses,
  type Theme,
} from "@mui/material";

export default function componentStyleOverrides(
  theme: Theme
): Theme["components"] {
  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
        disableFocusRipple: true,
        disableTouchRipple: true,
        variant: "contained" as const,
      },
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
          borderRadius: theme.shape.borderRadius,
          textTransform: "none",
          padding: theme.spacing(0.75, 1.75),
          lineHeight: 1,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined" as const,
        fullWidth: true,
        size: "small" as const,
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            outline: "none",
            borderWidth: 1,
            borderColor: theme.palette.divider,
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 1,
            outline: "none",
            borderColor: theme.palette.primary.main,
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
            fontSize: 16,
            opacity: 0.5,
          },
          "& .MuiInputBase-input": {
            color: theme.palette.text.primary,
            fontSize: 16,
            verticalAlign: "middle",
            display: "flex",
            alignItems: "center",
            lineHeight: 1,
            height: "20px",
            padding: "8px 12px",
            borderWidth: 1,
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: "outlined" as const,
        fullWidth: true,
        size: "small" as const,
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          [`& .${typographyClasses.root}`]: {
            fontSize: 12,
          },
        },
      },
    },
    MuiMenuItem: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: theme.palette.action.selected,
          },
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.action.selected,
          },
          [`& .${listItemIconClasses.root} .${svgIconClasses.root}`]: {
            fontSize: 18,
            color:
              theme?.palette?.mode === "light"
                ? theme?.palette?.getContrastText(theme?.palette?.primary?.main)
                : theme?.palette?.text?.primary,
          },
          [`&.Mui-selected .${listItemTextClasses.root} .${typographyClasses.root}`]:
            {
              color:
                theme?.palette?.mode === "light"
                  ? theme?.palette?.getContrastText(
                      theme?.palette?.primary?.main
                    )
                  : theme?.palette?.text?.primary,
            },

          [`&.Mui-selected .${listItemIconClasses.root} .${svgIconClasses.root}`]:
            {
              fontSize: 14,
              color:
                theme?.palette?.mode === "light"
                  ? theme?.palette?.getContrastText(
                      theme?.palette?.primary?.main
                    )
                  : theme?.palette?.text?.primary,
            },
          "&.Mui-disabled": {
            backgroundColor: theme.palette.action.disabledBackground,
          },
          "&.Mui-disabled:hover": {
            backgroundColor: theme.palette.action.disabledBackground,
          },
          [`& .${listItemIconClasses.root}`]: {
            minWidth: "auto",
            fontSize: 16,
            color:
              theme?.palette?.mode === "light"
                ? theme?.palette?.getContrastText(theme?.palette?.primary?.main)
                : theme?.palette?.text?.primary,
          },
          [`& .${listItemTextClasses.root} .${typographyClasses.root}`]: {
            fontSize: 14,
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          marginRight: 10,
          minWidth: "auto",
        },
      },
    },
    MuiToggleButton: {
      defaultProps: {
        size: "small" as const,
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
    MuiToggleButtonGroup: {
      defaultProps: {
        size: "small" as const,
      },
      styleOverrides: {
        root: {
          "& .MuiToggleButton-root": {
            border: `1px solid ${theme.palette.common.white}80`,
            "&.Mui-selected": {
              backgroundColor: theme.palette.action.selected,
            },
            "&:hover": {
              backgroundColor: `${theme.palette.action.hover}`,
            },
            "&.Mui-selected:hover": {
              backgroundColor: `${theme.palette.action.hover}`,
            },
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        rounded: {
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          lineHeight: 1,
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "transparent",
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: "8px",
            backgroundColor: theme.palette.grey[700],
            minHeight: "24px",
            border: "1px solid transparent",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: theme.palette.grey[500],
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: theme.palette.grey[500],
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: theme.palette.grey[500],
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: theme.palette.action.selected,
          },
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.action.selected,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.radius.xs,
          "& .MuiTabs-indicator": {
            height: 4,
            borderRadius: theme.shape.radius.xs,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 18,
          fontWeight: 500,
          letterSpacing: 0.75,
          textTransform: "capitalize",
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
        },
      },
    },
  };
}
