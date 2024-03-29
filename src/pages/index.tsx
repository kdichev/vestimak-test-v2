import React from "react";
import { GetServerData, HeadFC, Link } from "gatsby";
import slugify from "@sindresorhus/slugify";
import { fetchGraphQL } from "../components";
import { Button, Card, CardContent, Container } from "@mui/material";
import { Seo } from "../components/Seo";

const IndexPage = ({ serverData }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Container sx={{ pt: 1 }}>
        <Button color="primary" variant="contained" sx={{ mb: 1 }}>
          Test
        </Button>
        {serverData.pages.map((i) => {
          return (
            <Card sx={{ mb: 1 }}>
              <CardContent>
                <Link to={`/${slugify(i.category)}/${i.slug}/`}>
                  {i.title} (гледания: {i.views})
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </Container>
    </div>
  );
};

export const Head: HeadFC = (props) => {
  return (
    <>
      <Seo title="Начало" description="добро дойдовде" />
    </>
  );
};

export const getServerData: GetServerData<{}> = async () => {
  const { errors, data } = await fetchGraphQL(
    /* GraphQL */ `
      query MyQuerytest @cached {
        pages(order_by: { created_at: desc }) {
          title
          category
          views
          slug
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
};

export default IndexPage;
