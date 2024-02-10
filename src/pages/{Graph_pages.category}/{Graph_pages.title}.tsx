import { Link, graphql } from "gatsby";
import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { MDXProvider } from "@mdx-js/react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Img } from "../../components/Img";

export default ({ data }) => {
  return (
    <div>
      <h1>{data.graphPages.title}</h1>
      <GatsbyImage
        alt={data.graphPages.image.alt}
        image={getImage(data.graphPages.image.gatsbyImage)}
        style={{ width: "100%" }}
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
              <img
                src={`https://vestimak-v2.netlify.app/.netlify/images?url=${src}&w=1200&q=25`}
                style={{ width: "100%", height: "auto" }}
                loading={"lazy"}
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
        gatsbyImage(layout: FULL_WIDTH, quality: 35, height: 3)
      }
    }
  }
`;
