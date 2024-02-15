import React, { FC } from "react";

export const Seo: FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  return (
    <>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap"
        rel="stylesheet"
      ></link>
    </>
  );
};
