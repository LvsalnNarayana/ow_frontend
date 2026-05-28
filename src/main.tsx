// External
import { StrictMode } from "react";
import { BrowserRouter } from "react-router";


// Parent, Sibling, Index
import "./index.css";
import { createRoot } from "react-dom/client";


// MUI
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";


// Parent, Sibling, Index
import App from "./App.tsx";
import { theme } from "./theme/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <CssBaseline />
          <App />
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
