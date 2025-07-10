import { type CustomPaletteOptions, type ThemeColors } from "./themeInterfaces";

export function DarkPalette(colors: ThemeColors): CustomPaletteOptions {
  return {
    mode: "dark",
    primary: {
      main: colors.dark.primary.main,
      light: colors.dark.primary.light,
      dark: colors.dark.primary.dark,
      contrastText: colors.dark.text.primary,
    },
    secondary: {
      main: colors.dark.secondary.main,
      light: colors.dark.secondary.light,
      dark: colors.dark.secondary.dark,
      contrastText: colors.dark.text.primary,
    },
    text: {
      primary: colors.dark.text.primary,
      secondary: colors.dark.text.secondary,
      disabled: colors.dark.text.disabled,
    },
    background: {
      default: colors.dark.background.default,
      paper: colors.dark.background.paper,
    },
    divider: colors.dark.divider,
    action: {
      active: colors.dark.primary.main,
      hover: `${colors.dark.primary.dark}80`,
      selected: colors.dark.primary.dark,
      disabled: colors.dark.text.disabled,
      disabledBackground: colors.dark.text.hint,
      focus: colors.dark.primary.light,
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
      hoverOpacity: 0.08,
      selectedOpacity: 0.08,
      disabledOpacity: 0.38,
    },
  };
}

export function LightPalette(colors: ThemeColors): CustomPaletteOptions {
  return {
    mode: "light",
    primary: {
      main: colors.light.primary.main,
      light: colors.light.primary.light,
      dark: colors.light.primary.dark,
      contrastText: colors.light.text.primary,
    },
    secondary: {
      main: colors.light.secondary.main,
      light: colors.light.secondary.light,
      dark: colors.light.secondary.dark,
      contrastText: colors.light.text.primary,
    },
    text: {
      primary: colors.light.text.primary,
      secondary: colors.light.text.secondary,
      disabled: colors.light.text.disabled,
    },
    background: {
      default: colors.light.background.default,
      paper: colors.light.background.paper,
    },
    divider: colors.light.divider,
    action: {
      active: colors.light.primary.main,
      hover: colors.light.primary.light,
      selected: colors.light.primary.dark,
      disabled: colors.light.text.disabled,
      disabledBackground: colors.light.text.hint,
      focus: colors.light.primary.light,
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
      hoverOpacity: 0.08,
      selectedOpacity: 0.08,
      disabledOpacity: 0.38,
    },
  };
}
