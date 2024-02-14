"use client";
import React from "react";

export async function fetchGraphQL(
  operationsDoc,
  operationName,
  variables,
  fetchOptions = {}
) {
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
    ...fetchOptions,
  });

  return await result.json();
}

export const SetPageViews = ({ title }) => {
  console.log(title);
  React.useEffect(() => {
    const fn = async () => {
      await fetchGraphQL(
        /* GraphQL */ `
          mutation MutatePageViewsTestis($slug: String!, $views: Int = 1) {
            update_pages_by_pk(
              pk_columns: { slug: $slug }
              _inc: { views: $views }
            ) {
              views
            }
          }
        `,
        "MutatePageViewsTestis",
        { slug: title },
        { priority: "low" }
      );
    };
    fn();
  }, []);
  return null;
};
