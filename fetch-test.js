const postcss = require("postcss");
const postcssJs = require("postcss-js");
const fse = require("fs-extra");

const fn = async () => {
  const a = await fetch(
    "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap&subset=cyrillic"
  );
  const b = await a.text();
  console.log(b);
  const root = postcss.parse(b);
  //   console.log(root);
  const css = postcssJs.objectify(root);
  const result = await Promise.all(
    css["@font-face"].map(async (i, index) => {
      const url = i.src.match(/url\(([^)]+)\)/)[1];

      const promise = await fetch(url);
      const file = await promise.text();

      fse.outputFile(
        "./static/" + url.replace("https://fonts.gstatic.com/s/", ""),
        file
      );

      return {
        ...i,
        src: `url(/${url.replace(
          "https://fonts.gstatic.com/s/",
          ""
        )}) format('truetype');`,
      };
    })
  );
  //   console.log(
  //     (await postcss().process({ "@font-face": result }, { parser: postcssJs }))
  //       .css
  //   );
  fse.outputFile(
    "./static/test.css",
    (await postcss().process({ "@font-face": result }, { parser: postcssJs }))
      .css
  );

  //   console.log(result);
};

fn().catch(console.log);
