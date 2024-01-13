import "./error_pages.css";
import { Box, Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

function PageNotFound(props) {
  const navigate = useNavigate();

  return (
    <div className="error_pages_body">
      <Box
        sx={{
          flexGrow: 1,
          paddingTop: "10%",
          paddingLeft: "4%",
          paddingRight: "4%",
        }}
      >
        <Grid container>
          <Grid xs={12} sm={12} md={10} lg={10} xl={10}>
            <Grid xs={12} sm={12} md={12} lg={10} xl={8}>
              <h1 className="error_pages_h1">Page Not Found</h1>
            </Grid>

            <Grid xs={12} sm={12} md={12} lg={10} xl={12}>
              <h2 className="error_pages_h2">404. That's an error.</h2>
            </Grid>

            <Grid xs={12} sm={12} md={12} lg={10} xl={6}>
              <h4 className="error_pages_h4">The request URL / &lt; {window.location.href} &gt; was not found on this server.</h4>
            </Grid>

            <Grid xs={12} sm={8} md={7} lg={6} xl={5}>
              <Button
                variant="outlined"
                className="error_pages_button"
                fullWidth
                sx={{
                  boxSizing: "border-box",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px 40px",
                  gap: "8px",
                  border: "1px solid #105BBC",
                  borderRadius: "5px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  textAlign: "center",
                  color: "#105BBC",
                  cursor: "pointer",
                }}
                onClick={() => navigate(-1)}
              >
                &larr; Return back
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default PageNotFound;
