// material-ui
import { createTheme, type Palette } from "@mui/material/styles";

// project imports
import componentStyleOverrides from "./componentStyleOverrides";
import themeTypography from "./typography";
import { DarkPalette } from "./palette";
import themeColors from "./colors";

export const theme = createTheme({
  palette: DarkPalette(themeColors) as Palette,
  typography: themeTypography(),
  shape: {
    borderRadius: 8,
    radius: {
      xs: 2,
      sm: 4,
      md: 6,
      lg: 8,
      xl: 12,
    },
  },
});

theme.components = componentStyleOverrides(theme);
