import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { GetServerDataProps, GetServerDataReturn, Link } from "gatsby";
import { Image } from "@unpic/react";
import { blurhashToCssGradientString } from "@unpic/placeholder";
import { SetPageViews } from "../../components";

const IndexPage = ({ serverData }) => {
  const placeholder = blurhashToCssGradientString(
    "LKGS7Kx^Nz$x.A%2xuM{9aj[s.M|"
  );
  return (
    <div>
      <h2>Страницата е динамична (гледания: {serverData.views})</h2>
      <h1>{serverData.title}</h1>
      <SetPageViews title={serverData.slug} />
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
  const { errors, data } = await fetchMyQuery(props.params?.title_slug);
  if (!data?.pages_by_pk || errors) {
    console.log({ data, errors });
    return { status: 404, props: {} };
  }
  return {
    props: {
      md: data.pages_by_pk.body,
      ...data.pages_by_pk,
      views: data.pages_by_pk.views + 1,
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
  query MyQuery($slug: String!) {
    pages_by_pk(slug: $slug) {
      id
      body
      image
      title
      views
      slug
    }
  }
`;

function fetchMyQuery(id) {
  return fetchGraphQL(operationsDoc, "MyQuery", { slug: id });
}

export default IndexPage;
