import { GetServerData, HeadFC, Link, PageProps, graphql } from "gatsby";
import React, { FC } from "react";
import { fetchGraphQL } from "../../components";
import { ArticleTemplate } from "../../templates/ArticlePage";
import slugify from "@sindresorhus/slugify";
import { Typography } from "@mui/material";

const ArticlePage: FC<PageProps<Queries.StaticArticlePageQuery, {}, {}>> = ({
  data,
  serverData,
}) => {
  return (
    <>
      <Typography>
        Мѣс­тни­тѣ из­бо­ри сѫ по­водъ да си при­пом­нѭ какъ се прък­на
        „Бъл­гар­ски ос­вѣ­до­ми­тель“. От­дав­на бѣхъ рѣ­шилъ, че има са­мо
        единъ на­чинъ да се про­бу­та ста­ри­ятъ пра­во­писъ за нѣ­що
        съв­рѣ­мен­но: ка­то се пол­зва за пи­са­не на съв­рѣ­ме­ненъ
        бъл­гар­ски и по съв­рѣ­мен­ни те­ми.
      </Typography>
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

export const Head: HeadFC = (props) => {
  const { data, serverData } = props;
  return (
    <>
      <html lang="en" />
      <title>{serverData?.pages_by_pk?.title || data.pages_by_pk.title}</title>
      <meta
        name="description"
        content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      ></link>
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
