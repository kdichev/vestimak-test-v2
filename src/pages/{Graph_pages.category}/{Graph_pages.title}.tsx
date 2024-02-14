import { GetServerDataProps, Link, graphql } from "gatsby";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Image } from "@unpic/react";
import { blurhashToCssGradientString } from "@unpic/placeholder";
import { SetPageViews } from "../../components";

export default ({ data, serverData }) => {
  const placeholder = blurhashToCssGradientString(
    "LKGS7Kx^Nz$x.A%2xuM{9aj[s.M|"
  );
  console.log(data.graphPages.slug);
  return (
    <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
      <h2>Страницата е статична (гледания: {serverData?.views})</h2>
      <Link to="/">back</Link>
      <h1>{data.graphPages.title}</h1>
      <SetPageViews title={data.graphPages.slug} />
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

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch("https://apt-gannet-46.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "x-hasura-admin-secret":
        "1aTiWfxI4Jym4Mg3POblQsKqMZRarCzSM6nMJVZ2IO10E6OcRY8Fc64d3o7MXGKF",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

export const getServerData = async (props: GetServerDataProps) => {
  const { data } = await fetchGraphQL(
    /* GraphQL */ `
      query GetViews($slug: String!) {
        pages_by_pk(slug: $slug) {
          views
          updated_at
        }
      }
    `,
    "GetViews",
    { slug: props.params?.title }
  );
  return {
    props: { views: data.pages_by_pk.views + 1 },
  };
};

export const query = graphql`
  query ($id: String!) {
    graphPages(id: { eq: $id }) {
      id
      title
      created_at
      slug
      body {
        html
      }
      image {
        url
      }
    }
  }
`;
