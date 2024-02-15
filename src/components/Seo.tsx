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
      {/* <link rel="preload" href="https://fonts.googleapis.com" />
      <link
        rel="preload"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      /> */}
      <link href="/test.css" rel="stylesheet" rel="preload"></link>
    </>
  );
};
