import React from "react";
import { GetServerDataProps, GetServerDataReturn, Link } from "gatsby";
import { ArticleTemplate } from "../../templates/ArticlePage";
import { fetchGraphQL } from "../../components";

const IndexPage = ({ serverData }) => {
  return (
    <>
      <ArticleTemplate
        shouldRefetch={serverData?.shouldRefetch}
        views={serverData?.views}
        title={serverData.title}
        heroUrl={`${serverData.image}`}
        markdown={serverData?.body}
        slug={serverData.slug}
      />
    </>
  );
};

export const getServerData = async (
  props: GetServerDataProps
): GetServerDataReturn => {
  const { errors, data } = await fetchGraphQL(
    /* GraphQL */ `
      query MyQuery($slug: String!) @cached {
        pages_by_pk(slug: $slug) {
          body
          image
          title
          views
          slug
        }
      }
    `,
    "MyQuery",
    { slug: props.params?.title_slug }
  );

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

export default IndexPage;
