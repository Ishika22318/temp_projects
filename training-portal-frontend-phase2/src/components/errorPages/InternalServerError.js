import "./error_pages.css";
import { Box, Grid } from "@mui/material";
import React from "react";

function InternalServerError() {
  return (
    <div className="error_pages_body">
      <Box sx={{ flexGrow: 1, paddingTop: "10%", paddingLeft: "4%" }}>
        <Grid container>
          <Grid xs={12} sm={12} md={10} lg={10} xl={10}>
            <Grid xs={12} sm={12} md={12} lg={10} xl={8}>
              <h1 className="error_pages_h1"> Internal Server Error </h1>
            </Grid>

            <Grid xs={12} sm={12} md={12} lg={10} xl={12}>
              <h2 className="error_pages_h2"> 500. That's an error.</h2>
            </Grid>

            <Grid xs={12} sm={12} md={12} lg={10} xl={6}>
              <h4 className="error_pages_h4"> The server has encountered a situation.Please try after some time. </h4>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default InternalServerError;
