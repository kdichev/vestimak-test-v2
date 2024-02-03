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
const path = require("path");

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
    "https://apt-gannet-46.hasura.app/v1/graphql"
  );
  const schema = await loadSchema(execute);

  const possibleTypes = [{ name: "pages" }];

  const gatsbyNodeTypes = possibleTypes.map((type) => ({
    remoteTypeName: type.name,
    queries: /* GraphQL */ `
        query LIST_${type.name.toUpperCase()} {
          ${type.name.toLowerCase()}(limit: $limit, offset: $offset) {
            ..._${type.name}Id_
          }
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
  };
}

exports.sourceNodes = async (gatsbyApi) => {
  const config = await createSourcingConfig(gatsbyApi);
  await sourceAllNodes(config);
};

export const onCreateNode: GatsbyNode["onCreateNode"] = async ({
  node,
  actions: { createNode, createNodeField, deleteNode },
  createNodeId,
  createContentDigest,
}) => {
  if (node.internal.type === "Graph_pages") {
    const nodeId = `MarkdownNode:${createNodeId(`${node.id}-body`)}`;
    const mdNode = {
      id: nodeId,
      parent: node.id,
      internal: {
        type: `MarkdownNode`,
        mediaType: "text/markdown",
        content: he.decode(node["body"]),
        contentDigest: createContentDigest(node["body"]),
      },
    };
    createNode(mdNode);

    const pathname = new URL(node.image).pathname;
    const fileNameWithExtension = path.basename(pathname);
    const extension = path.extname(fileNameWithExtension);
    const fileNameWithoutExtension = path.basename(
      fileNameWithExtension,
      extension
    );
    const imageAttr = await probe(node.image);
    const imageData = {
      url: `https://wonderful-lily-8ced63.netlify.app/.netlify/images?url=${node.image}`,
      placeholderUrl: `https://wonderful-lily-8ced63.netlify.app/.netlify/images?url=${node.image}&w=%width%&h=%height%`,
      mimeType: imageAttr.mime,
      filename: fileNameWithoutExtension,
      width: imageAttr.width,
      height: imageAttr.height,
      alt: `Red and rosa infinity thingy floating in air`,
    };
    const assetId = `ImageAsset:${createNodeId(`${node.id}-image`)}`;
    createNode({
      ...imageData,
      id: assetId,
      parent: node.id,
      children: [],
      internal: {
        type: `ImageAsset`,
        contentDigest: createContentDigest(imageData),
      },
    });

    // createNodeField({ node, name: "body___NODE", value: nodeId });
    // createNodeField({ node, name: "image___NODE", value: assetId });
  }
};

exports.createSchemaCustomization = async (gatsbyApi) => {
  const config = await createSourcingConfig(gatsbyApi);
  // const { createTypes } = gatsbyApi.actions;
  await createSchemaCustomization(config);
  gatsbyApi.actions.createTypes(/* GraphQL */ `
    type Graph_pages implements Node {
      image: ImageAsset @link
      body: MarkdownNode @link
    }

    type ImageAsset implements Node & RemoteFile {
      alt: String!
    }
  `);
};
