import React from "react";
import { GatsbyBrowser } from "gatsby";
import { WrapRootElement } from "./src/components/WrapRootElement";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}) => {
  return <WrapRootElement>{element}</WrapRootElement>;
};
