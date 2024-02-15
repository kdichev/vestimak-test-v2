import { GetServerData, Link, PageProps, graphql } from "gatsby";
import React, { FC } from "react";
import { fetchGraphQL } from "../../components";
import { ArticleTemplate } from "../../templates/ArticlePage";
import slugify from "@sindresorhus/slugify";

const ArticlePage: FC<PageProps<Queries.StaticArticlePageQuery, {}, {}>> = ({
  data,
  serverData,
}) => {
  return (
    <>
      {serverData.executionTime}
      {!serverData.shouldRefetch ? (
        <ArticleTemplate
          shouldRefetch={serverData.shouldRefetch}
          views={serverData.pages_by_pk.views + 1}
          title={data.pages_by_pk?.title}
          heroUrl={`${data.pages_by_pk?.image}`}
          markdown={data.pages_by_pk?.body}
          slug={data.pages_by_pk?.slug}
        />
      ) : (
        <ArticleTemplate
          shouldRefetch={serverData.shouldRefetch}
          views={serverData.pages_by_pk.views + 1}
          title={serverData.pages_by_pk.title}
          heroUrl={serverData.pages_by_pk.image}
          markdown={serverData.pages_by_pk.body}
          slug={serverData.pages_by_pk.slug}
        />
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {serverData.pages.map((i) => (
          <Link to={`/${slugify(i.category)}/${slugify(i.title)}`}>
            {i.title}
          </Link>
        ))}
      </div>
    </>
  );
};

export const query = graphql`
  query StaticArticlePage($id: String!) {
    pages_by_pk: graphPages(id: { eq: $id }) {
      title
      slug
      body
      image
    }
  }
`;

export const getServerData: GetServerData<{}> = async (props) => {
  const startTime = new Date().getTime();
  const { data } = await fetchGraphQL(
    /* GraphQL */ `
      query GetViews($slug: String!) @cached {
        pages_by_pk(slug: $slug) {
          views
          updated_at
        }
        pages(
          order_by: { created_at: desc }
          where: { slug: { _neq: $slug } }
        ) {
          title
          category
        }
      }
    `,
    "GetViews",
    { slug: props.params?.title }
  );
  if (
    new Date(props?.pageContext?.fetched_at) <
    new Date(data.pages_by_pk.updated_at)
  ) {
    const result = await fetchGraphQL(
      /* GraphQL */ `
        query GetFrechPage($slug: String!) @cached {
          pages_by_pk(slug: $slug) {
            body
            image
            title
            slug
            views
          }
        }
      `,
      "GetFrechPage",
      { slug: props.params?.title }
    );
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;

    return {
      props: {
        shouldRefetch: true,
        executionTime,
        ...data,
        ...result.data,
      },
    };
  }
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;

  return {
    props: { executionTime, ...data },
  };
};

export default ArticlePage;
