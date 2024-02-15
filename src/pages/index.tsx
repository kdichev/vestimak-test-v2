import React from "react";
import { Link } from "gatsby";
import slugify from "@sindresorhus/slugify";
import { fetchGraphQL } from "../components";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Container,
  Toolbar,
} from "@mui/material";

const IndexPage = ({ serverData }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AppBar>
        <Toolbar>ВЕСТИМАК</Toolbar>
      </AppBar>
      <Toolbar></Toolbar>

      <Container sx={{ pt: 1 }}>
        <Button color="primary" variant="contained" sx={{ mb: 1 }}>
          Test
        </Button>
        {serverData.pages.map((i) => {
          return (
            <Card sx={{ mb: 1 }}>
              <CardContent>
                <Link to={`/${slugify(i.category)}/${slugify(i.title)}`}>
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
