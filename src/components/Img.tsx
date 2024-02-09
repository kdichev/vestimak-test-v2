"use client";

import React from "react";

import { Blurhash } from "react-blurhash";

export const Img = ({ src, alt }) => {
  const [imageLoaded, setLoaded] = React.useState(false);
  return (
    <p>
      <div style={{ display: !imageLoaded ? "block" : "none" }}>
        <Blurhash
          hash="eJGbn:tmNf$xaz.A%2%2Iofk9aj[s.Ipoe%gWBR+n#j]xuRjafWBj["
          width={1200}
          height={630}
          punch={1}
          style={{ width: "100%", height: "auto", aspectRatio: "2/1" }}
        />
      </div>
      <div style={{ display: imageLoaded ? "block" : "none" }}>
        <img
          src={`https://wonderful-lily-8ced63.netlify.app/.netlify/images?url=${src}&w=1200&q=25`}
          style={{ width: "100%", height: "auto", aspectRatio: "2/1" }}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </p>
  );
};
