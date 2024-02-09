import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { GetServerDataProps, Link } from "gatsby";
import { Img } from "../../components/Img";
import fs from "fs";

const IndexPage = ({ serverData, data }) => {
  return (
    <div>
      <h1>{serverData.title}</h1>
      <Img src={serverData.image} />
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
                src={`https://wonderful-lily-8ced63.netlify.app/.netlify/images?url=${src}&w=1200&q=25`}
                style={{ width: "100%", height: "auto" }}
                loading={"lazy"}
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

export const getServerData = async (props: GetServerDataProps) => {
  const { errors, data } = await fetchMyQuery(props.params.title);

  if (errors) {
    // handle those errors like a pro
    // console.error(errors);
  }

  // do something great with this precious data
  if (!data.pages_by_pk) {
    return { props: {}, status: 404 };
  }
  fs.writeFileSync("./test-data.json", JSON.stringify(data.pages_by_pk));
  return {
    props: { md: data.pages_by_pk.body, ...data.pages_by_pk },
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
  query MyQuery($id: String!) @cached {
    pages_by_pk(slug: $id) {
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
  return fetchGraphQL(operationsDoc, "MyQuery", { id });
}

export default IndexPage;
