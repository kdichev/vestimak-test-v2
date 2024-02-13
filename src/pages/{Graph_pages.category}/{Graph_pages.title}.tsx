import { GetServerDataProps, Link, graphql } from "gatsby";
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
    <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
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

export const getServerData = (props: GetServerDataProps) => {
  console.log(props.headers);
  return { status: 200 };
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
