import { Link, graphql } from "gatsby";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Image } from "@unpic/react";
import { blurhashToCssGradientString } from "@unpic/placeholder";

export default ({ data }) => {
  const placeholder = blurhashToCssGradientString(
    "LKGS7Kx^Nz$x.A%2xuM{9aj[s.M|"
  );
  return (
    <div>
      <h2>Страницата е статична</h2>
      <h1>{data.graphPages.title}</h1>
      <Image
        src={`${data.graphPages.image.url}&q=35`}
        alt="A lovely bath"
        layout="constrained"
        width={800}
        background={placeholder}
        aspectRatio={40 / 21}
        priority
      />
      <Markdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[]}
        components={{
          a: ({ children, href }) => {
            return <Link to={href}>{children}</Link>;
          },
          img: ({ src }) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                src={`https://vestimak-v2.netlify.app/.netlify/images?url=${src}&q=35`}
                alt="A lovely bath"
                layout="constrained"
                width={800}
                background={placeholder}
                aspectRatio={40 / 21}
              />
            </div>
          ),
        }}
      >
        {data.graphPages?.body.html}
      </Markdown>
    </div>
  );
};

export const query = graphql`
  query ($id: String!) {
    graphPages(id: { eq: $id }) {
      id
      title
      created_at
      body {
        html
      }
      image {
        url
        # gatsbyImage(layout: FULL_WIDTH, quality: 35, height: 3)
      }
    }
  }
`;
