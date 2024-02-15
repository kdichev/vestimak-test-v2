import { ThemeProvider } from "@emotion/react";
import React, { FC, PropsWithChildren } from "react";
import { theme } from "../theme";

export const WrapRootElement: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
