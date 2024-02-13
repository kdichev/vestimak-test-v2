import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { GetServerDataProps, GetServerDataReturn, Link } from "gatsby";
import { Image } from "@unpic/react";
import { blurhashToCssGradientString } from "@unpic/placeholder";

const IndexPage = ({ serverData, data }) => {
  const placeholder = blurhashToCssGradientString(
    "LKGS7Kx^Nz$x.A%2xuM{9aj[s.M|"
  );
  return (
    <div>
      <h2>Страницата е динамична (гледания: {serverData.views})</h2>
      <h1>{serverData.title}</h1>
      <Image
        src={`https://vestimak-v2.netlify.app/.netlify/images?url=${serverData.image}&q=35`}
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
        {serverData.md}
      </Markdown>
    </div>
  );
};

export const getServerData = async (
  props: GetServerDataProps
): GetServerDataReturn => {
  console.log(props.params);
  const { errors, data } = await fetchMyQuery(props.params?.title_slug);
  if (!data?.pages_by_pk?.id || errors) {
    console.log({ data, errors });
    return { status: 404, props: {} };
  }
  const a = await fetchGraphQL(
    /* GraphQL */ `
      mutation MutatePageViews($slug: String = "", $views: Int = 1) {
        update_pages_by_pk(
          pk_columns: { slug: $slug }
          _inc: { views: $views }
        ) {
          views
        }
      }
    `,
    "MutatePageViews",
    { slug: props.params?.title_slug }
  );
  console.log({ a });
  return {
    props: {
      md: data.pages_by_pk.body,
      ...data.pages_by_pk,
      views: a.data.update_pages_by_pk.views,
    },
  };
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

const operationsDoc = /* GraphQL */ `
  query MyQuery($slug: String!) @cached {
    pages_by_pk(slug: $slug) {
      id
      body
      created_at
      id
      image
      title
      updated_at
      category
    }
  }
`;

function fetchMyQuery(id) {
  return fetchGraphQL(operationsDoc, "MyQuery", { slug: id });
}

export default IndexPage;
