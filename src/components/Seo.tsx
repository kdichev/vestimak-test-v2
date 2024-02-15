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
      <link href="/test.css" rel="stylesheet"></link>
      <link
        href="/notosans/v35/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyAaBN9d.ttf"
        rel="preload"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link
        href="/notosans/v35/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A99d.ttf"
        rel="preload"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link
        href="/notosans/v35/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyCjA99d.ttf"
        rel="preload"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link
        href="/notosans/v35/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyAaBN9d.ttf"
        rel="preload"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
    </>
  );
};
