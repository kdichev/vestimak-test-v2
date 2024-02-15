import { ThemeProvider } from "@emotion/react";
import React, { FC, PropsWithChildren } from "react";
import { theme } from "../theme";
import { CssBaseline } from "@mui/material";

export const WrapRootElement: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
