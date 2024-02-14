import React from "react";
import { Link } from "gatsby";
import slugify from "@sindresorhus/slugify";

const IndexPage = ({ serverData, data }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {serverData.pages.map((i) => (
        <Link to={`${slugify(i.category)}/${slugify(i.title)}`}>
          {i.title} (гледания: {i.views})
        </Link>
      ))}
    </div>
  );
};

// export const query = graphql`
//   {
//     imageAsset {
//       gatsbyImage(layout: FULL_WIDTH, width: 600)
//     }
//   }
// `;

export async function getServerData() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  // console.log(data);
  return {
    props: data,
  };
}

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
  query MyQuerytest {
    pages(order_by: { created_at: desc }) {
      title
      category
      views
    }
  }
`;

function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, "MyQuerytest", {});
}

export default IndexPage;
