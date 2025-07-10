import { type ThemeColors } from "./themeInterfaces";

const themeColors: ThemeColors = {
  light: {
    primary: {
      main: "#5b84fa",
      light: "#bdcefd",
      dark: "#3f5caf",
    },
    secondary: {
      main: "#4A4A4A",
      light: "#6e6e6e",
      dark: "#333333",
    },
    text: {
      primary: "#212121", // ~87% black on white
      secondary: "#616161", // ~60% black
      disabled: "#9e9e9e", // ~38% black
      hint: "#bdbdbd", // ~23% black
    },
    background: {
      default: "#fafafa", // very light grey
      paper: "#ffffff", // pure white surfaces
    },
    divider: "#e0e0e0", // very light grey
  },

  dark: {
    primary: {
      main: "#5b84fa",
      light: "#7b9cfb",
      dark: "#3f5caf",
    },
    secondary: {
      main: "#4A4A4A",
      light: "#6e6e6e",
      dark: "#333333",
    },
    text: {
      primary: "#ffffff", // full white
      secondary: "#e0e0e0", // ~87% white
      disabled: "#9e9e9e", // ~62% white
      hint: "#757575", // ~46% white
    },
    background: {
      default: "#252525", // main dark bg
      paper: "#353535", // slightly lighter surface
    },
    divider: "#616161", // medium grey for dividers
  },
};

export default themeColors;
