import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
export const theme = createTheme({
  palette: {
    primary: {
      main: red[700],
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ['"Noto Sans"', "monospace", "sans-serif"].join(","),
  },
});
