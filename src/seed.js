const { data } = require("./seed.json");
const fs = require("fs");
async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch("https://apt-gannet-46.hasura.app/v1/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

const operationsDoc = /* GraphQL */ `
  mutation MyMutation($objects: [pages_insert_input!]!) {
    insert_pages(
      objects: $objects
      on_conflict: { constraint: pages_title_key }
    ) {
      affected_rows
    }
  }
`;

function executeMyMutation(objects) {
  return fetchGraphQL(operationsDoc, "MyMutation", {
    objects: data.allMarkdownRemark.nodes.map((i) => ({
      title: i.frontmatter.title,
      body: i.rawMarkdownBody,
      category: i.frontmatter.category,
      image:
        "https://storage.googleapis.com/vestimak-image-storage/strandzha-park.jpg",
    })),
  });
}

async function startExecuteMyMutation(objects) {
  const { errors, data } = await executeMyMutation(objects);

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}

startExecuteMyMutation();
