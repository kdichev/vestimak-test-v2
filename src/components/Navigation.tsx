import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "gatsby";
import React from "react";

export const Navigation = () => {
  return (
    <>
      <AppBar variant="outlined" color="default">
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
