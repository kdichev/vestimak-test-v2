import { blue, grey, red } from "@mui/material/colors";
import {
  createTheme,
  lighten,
  responsiveFontSizes,
} from "@mui/material/styles";

// A custom theme for this app
export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#d7210a",
      },
      background: { default: "#f1f1f1" },
    },
    typography: {
      fontSize: 18,
      fontFamily: ['"Noto Sans"', "monospace", "sans-serif"].join(","),
    },
  })
);
// console.log(theme);
