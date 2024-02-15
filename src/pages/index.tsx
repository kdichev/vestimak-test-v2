import React from "react";
import { Link } from "gatsby";
import slugify from "@sindresorhus/slugify";
import { fetchGraphQL } from "../components";

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

export async function getServerData() {
  const { errors, data } = await fetchGraphQL(
    /* GraphQL */ `
      query MyQuerytest @cached {
        pages(order_by: { created_at: desc }) {
          title
          category
          views
        }
      }
    `,
    "MyQuerytest",
    {}
  );

  if (errors) {
    console.error(errors);
  }
  return {
    props: data,
  };
}

export default IndexPage;
