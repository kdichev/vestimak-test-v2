import React from "react";
import { GatsbyBrowser } from "gatsby";
import { WrapRootElement } from "./src/components/WrapRootElement";
import { WrapPageElement } from "./src/components/WrapPageElement";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}) => {
  return <WrapRootElement>{element}</WrapRootElement>;
};

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => {
  return <WrapPageElement>{element}</WrapPageElement>;
};
