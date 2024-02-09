const {
  sourceAllNodes,
  createSchemaCustomization,
  compileNodeQueries,
  readOrGenerateDefaultFragments,
  buildNodeDefinitions,
  loadSchema,
  createDefaultQueryExecutor,
} = require(`gatsby-graphql-source-toolkit`);
const { print } = require(`gatsby/graphql`);
const fs = require(`fs-extra`);
import he from "he";
import { GatsbyNode } from "gatsby";
const debugDir = __dirname + `/.cache/graphcms-compiled-queries`;
const fragmentsDir = __dirname + `/graphcms-fragments`;
import probe from "probe-image-size";
import { sourceNodeChanges } from "gatsby-graphql-source-toolkit";
const path = require("path");

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

const operationsDoc = `
  query NewPages($_gt: timestamptz!) {
    pages(where: {updated_at: {_gt: $_gt}}) {
      id
      title
      image
      body
    }
  }
`;

function fetchNewPages(_gt) {
  return fetchGraphQL(operationsDoc, "NewPages", { _gt: _gt });
}

async function writeCompiledQueries(nodeDocs) {
  await fs.ensureDir(debugDir);
  for (const [remoteTypeName, document] of nodeDocs) {
    await fs.writeFile(
      debugDir + `/${remoteTypeName}.graphql`,
      print(document)
    );
  }
}

async function createSourcingConfig(gatsbyApi) {
  const execute = createDefaultQueryExecutor(
    "https://apt-gannet-46.hasura.app/v1/graphql",
    {},
    { concurrency: 10 }
  );
  const schema = await loadSchema(execute);

  const possibleTypes = [{ name: "pages" }];

  const gatsbyNodeTypes = possibleTypes.map((type) => ({
    remoteTypeName: type.name,
    queries: /* GraphQL */ `
        query LIST_${type.name.toUpperCase()}($limit: Int) @cached {
          ${type.name}(limit: $limit, offset: $offset) {
            ..._${type.name}Id_
          }
        }
        query NODE_${type.name.toUpperCase()} {
          ${type.name}_by_pk(id: $id) { ..._${type.name}Id_ }
        }
        fragment _${type.name}Id_ on ${type.name} { __typename id }
      `,
  }));

  fs.ensureDir(fragmentsDir);

  const fragments = await readOrGenerateDefaultFragments(fragmentsDir, {
    schema,
    gatsbyNodeTypes,
  });

  const documents = compileNodeQueries({
    schema,
    gatsbyNodeTypes,
    customFragments: fragments,
  });

  await writeCompiledQueries(documents);

  return {
    gatsbyApi,
    schema,
    execute,
    gatsbyTypePrefix: `Graph_`,
    gatsbyNodeDefs: buildNodeDefinitions({ gatsbyNodeTypes, documents }),
    paginationAdapters: [
      {
        name: "LimitOffset",
        expectedVariableNames: [`limit`, `offset`],
        start() {
          return {
            variables: { limit: 500, offset: 0 },
            hasNextPage: true,
          };
        },
        next(state, page) {
          const limit = Number(state.variables.limit) ?? 500;
          const offset = Number(state.variables.offset) + limit;

          return {
            variables: { limit, offset },
            // hasNextPage: page.length === limit,
            hasNextPage: false,
          };
        },
        concat(result, page) {
          return [...result, page];
        },
        getItems(pageOrResult) {
          return pageOrResult;
        },
      },
    ],
  };
}

export const sourceNodes: GatsbyNode["sourceNodes"] = async (gatsbyApi) => {
  const lastBuildTime = await gatsbyApi.cache.get(`LAST_BUILD_TIME`);

  const config = await createSourcingConfig(gatsbyApi);
  if (lastBuildTime) {
    const { errors, data } = await fetchNewPages(
      new Date(lastBuildTime).toISOString()
    );
    if (errors) {
      console.error(errors);
    }
    await sourceNodeChanges(config, {
      nodeEvents: data.pages.map((i) => ({
        eventName: "UPDATE",
        remoteTypeName: "pages",
        remoteId: { __typename: "pages", id: i.id },
      })),
    });
  } else {
    await sourceAllNodes(config);
    await gatsbyApi.cache.set(`LAST_BUILD_TIME`, Date.now());
    console.log("endSourceing");
    const nodes = gatsbyApi.getNodes();
    // const a = nodes.reduce((acc, node) => {
    //   if (node.internal.type === "Graph_pages") {
    //     console.log({
    //       ...acc,
    //       [node.image]: [...(acc[node.image] || []), node.id],
    //     });
    //     return { ...acc, [node.image]: [...(acc[node.image] || []), node.id] };
    //   }
    //   return acc;
    // }, {});
    // Object.entries(a).forEach(([nodeImage, ids]) => {
    //   const pathname = new URL(nodeImage).pathname;
    //   const fileNameWithExtension = path.basename(pathname);
    //   const extension = path.extname(fileNameWithExtension);
    //   const fileNameWithoutExtension = path.basename(
    //     fileNameWithExtension,
    //     extension
    //   );
    //   // const imageAttr = await probe(nodeImage);
    //   const imageData = {
    //     url: `https://wonderful-lily-8ced63.netlify.app/.netlify/images?url=${nodeImage}`,
    //     placeholderUrl: `https://wonderful-lily-8ced63.netlify.app/.netlify/images?url=${nodeImage}&w=%width%&h=%height%`,
    //     mimeType: "image/jpg",
    //     filename: fileNameWithoutExtension,
    //     width: 1200,
    //     height: 630,
    //     alt: `Red and rosa infinity thingy floating in air`,
    //     source_image: ids,
    //   };
    //   const assetId = `ImageAsset:${gatsbyApi.createNodeId(
    //     `${nodeImage}-image`
    //   )}`;
    //   gatsbyApi.actions.createNode({
    //     ...imageData,
    //     id: assetId,
    //     parent: nodeImage,
    //     children: [],
    //     internal: {
    //       type: `ImageAsset`,
    //       contentDigest: gatsbyApi.createContentDigest(imageData),
    //     },
    //   });
    // });
    nodes.forEach(async (node) => {
      if (node.internal.type === "Graph_pages") {
        const nodeId = `MarkdownNode:${gatsbyApi.createNodeId(
          `${node.id}-body`
        )}`;
        const mdNode = {
          id: nodeId,
          parent: node.id,
          internal: {
            type: `MarkdownNode`,
            mediaType: "text/markdown",
            content: he.decode(node["body"]),
            contentDigest: gatsbyApi.createContentDigest(node["body"]),
          },
        };
        gatsbyApi.actions.createNode(mdNode);

        const pathname = new URL(node.image).pathname;
        const fileNameWithExtension = path.basename(pathname);
        const extension = path.extname(fileNameWithExtension);
        const fileNameWithoutExtension = path.basename(
          fileNameWithExtension,
          extension
        );
        // const imageAttr = await probe(node.image);
        const imageData = {
          url: `https://wonderful-lily-8ced63.netlify.app/.netlify/images?url=${node.image}`,
          placeholderUrl: `https://wonderful-lily-8ced63.netlify.app/.netlify/images?url=${node.image}&w=%width%&h=%height%`,
          mimeType: "image/jpg",
          filename: fileNameWithoutExtension,
          width: 1200,
          height: 630,
          alt: `Red and rosa infinity thingy floating in air`,
          source_image: node.image,
        };
        const assetId = `ImageAsset:${gatsbyApi.createNodeId(
          `${node.id}-image`
        )}`;
        gatsbyApi.actions.createNode({
          ...imageData,
          id: assetId,
          parent: node.id,
          children: [],
          internal: {
            type: `ImageAsset`,
            contentDigest: gatsbyApi.createContentDigest(imageData),
          },
        });
      }
    });
  }
  // await gatsbyApi.cache.set(`LAST_BUILD_TIME`, Date.now());
};

// exports.shouldOnCreateNode = ({ node }) => node.internal.type === "Graph_pages";

// const onCreateNode: GatsbyNode["onCreateNode"] = async ({
//   node,
//   actions: { createNode },
//   createNodeId,
//   createContentDigest,
// }) => {
//   if (node.internal.type === "Graph_pages") {
//     const nodeId = `MarkdownNode:${createNodeId(`${node.id}-body`)}`;
//     const mdNode = {
//       id: nodeId,
//       parent: node.id,
//       internal: {
//         type: `MarkdownNode`,
//         mediaType: "text/markdown",
//         content: he.decode(node["body"]),
//         contentDigest: createContentDigest(node["body"]),
//       },
//     };
//     createNode(mdNode);

//     const pathname = new URL(node.image).pathname;
//     const fileNameWithExtension = path.basename(pathname);
//     const extension = path.extname(fileNameWithExtension);
//     const fileNameWithoutExtension = path.basename(
//       fileNameWithExtension,
//       extension
//     );
//     const imageAttr = await probe(node.image);
//     const imageData = {
//       url: `https://wonderful-lily-8ced63.netlify.app/.netlify/images?url=${node.image}`,
//       placeholderUrl: `https://wonderful-lily-8ced63.netlify.app/.netlify/images?url=${node.image}&w=%width%&h=%height%`,
// mimeType: imageAttr.mime,
// filename: fileNameWithoutExtension,
// width: imageAttr.width,
// height: imageAttr.height,
//       alt: `Red and rosa infinity thingy floating in air`,
//       source_image: node.image,
//     };
//     const assetId = `ImageAsset:${createNodeId(`${node.id}-image`)}`;
//     createNode({
//       ...imageData,
//       id: assetId,
//       parent: node.id,
//       children: [],
//       internal: {
//         type: `ImageAsset`,
//         contentDigest: createContentDigest(imageData),
//       },
//     });
//   }
// };

exports.createSchemaCustomization = async (gatsbyApi) => {
  const config = await createSourcingConfig(gatsbyApi);
  await createSchemaCustomization(config);
  gatsbyApi.actions.createTypes(/* GraphQL */ `
    type Graph_pages implements Node {
      body: MarkdownRemark @link(by: "rawMarkdownBody")
      image: ImageAsset @link(by: "source_image")
    }

    type ImageAsset implements Node & RemoteFile {
      source_image: String!
      alt: String!
    }
  `);
};
