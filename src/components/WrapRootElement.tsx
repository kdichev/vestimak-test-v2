import { ThemeProvider } from "@emotion/react";
import React, { FC, PropsWithChildren } from "react";
import { theme } from "../theme";
import { CssBaseline, GlobalStyles, lighten } from "@mui/material";

export const WrapRootElement: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
