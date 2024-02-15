import { red } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// A custom theme for this app
export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#d7210a",
      },
    },
    typography: {
      fontSize: 16,
      fontFamily: ['"Noto Sans"', "monospace", "sans-serif"].join(","),
    },
  })
);
console.log(theme);
