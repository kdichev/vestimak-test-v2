import { grey, red } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// A custom theme for this app
export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#d7210a",
      },
      // background: { default: grey[100] },
    },
    typography: {
      fontSize: 18,
      fontFamily: ['"Noto Sans"', "monospace", "sans-serif"].join(","),
    },
  })
);
// console.log(theme);
