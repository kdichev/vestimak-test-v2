import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "gatsby";
import React from "react";

export const Navigation = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">
            <Link to="/">ВЕСТИМАК</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
    </>
  );
};
