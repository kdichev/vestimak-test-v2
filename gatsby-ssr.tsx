import React from "react";
import { GatsbySSR } from "gatsby";
import { WrapRootElement } from "./src/components/WrapRootElement";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
  return <WrapRootElement>{element}</WrapRootElement>;
};
