import { GetServerDataProps, Link, graphql } from "gatsby";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Image } from "@unpic/react";
import { blurhashToCssGradientString } from "@unpic/placeholder";
import { SetPageViews, fetchGraphQL } from "../../components";

const ArticleTemplate = ({
  shouldRefetch,
  views,
  title,
  heroUrl,
  markdown,
}) => {
  const placeholder = blurhashToCssGradientString(
    "LKGS7Kx^Nz$x.A%2xuM{9aj[s.M|"
  );
  return (
    <>
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        {shouldRefetch && <div>should refetch</div>}
        <h2>Страницата е статична (гледания: {views})</h2>
        <Link to="/">back</Link>
        <h1>{title}</h1>
        {/* <SetPageViews title={data.graphPages.slug} /> */}
        <Image
          src={`https://vestimak-v2.netlify.app/.netlify/images?url=${heroUrl}&q=35`}
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
          {markdown}
        </Markdown>
      </div>
    </>
  );
};

export default ({ data, serverData }) => {
  return (
    <>
      {!serverData?.shouldRefetch ? (
        <ArticleTemplate
          shouldRefetch={serverData?.shouldRefetch}
          views={serverData?.views}
          title={data.graphPages.title}
          heroUrl={`${data.graphPages.image}`}
          markdown={data.graphPages?.body}
        />
      ) : (
        <ArticleTemplate
          shouldRefetch={serverData?.shouldRefetch}
          views={serverData?.views}
          title={serverData.title}
          heroUrl={`${serverData.image}`}
          markdown={serverData?.body}
        />
      )}
    </>
  );
};

export const query = graphql`
  query ($id: String!) {
    graphPages(id: { eq: $id }) {
      title
      slug
      body
      image
    }
  }
`;

export const getServerData = async (props: GetServerDataProps) => {
  const { data } = await fetchGraphQL(
    /* GraphQL */ `
      query GetViews($slug: String!) {
        pages_by_pk(slug: $slug) {
          views
          updated_at
        }
      }
    `,
    "GetViews",
    { slug: props.params?.title }
  );
  if (
    new Date(props.pageContext.fetched_at) <
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
          }
        }
      `,
      "GetFrechPage",
      { slug: props.params.title }
    );
    return {
      props: {
        ...result.data.pages_by_pk,
        shouldRefetch: true,
        views: data.pages_by_pk.views + 1,
      },
    };
  }
  return {
    props: { views: data.pages_by_pk.views + 1 },
  };
};
