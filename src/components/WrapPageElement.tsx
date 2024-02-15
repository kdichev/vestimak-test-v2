import React, { FC, PropsWithChildren } from "react";
import { Navigation } from "./Navigation";

export const WrapPageElement: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};
