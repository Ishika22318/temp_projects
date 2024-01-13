import "./error_pages.css";
import {useNavigate} from "react-router-dom";
import {Box, Grid} from "@mui/material";
import {Button} from "@mui/material";
import React from "react";

const AccessDenied = (props) => {
  const navigate = useNavigate();
  const handleRedirectToLogin = () => {
    localStorage.clear();
    props.setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="error_pages_body z_index">
      <Box
        sx={{
          flexGrow: 1,
          paddingTop: "10%",
          paddingLeft: "4%",
          paddingRight: "4%",
        }}>
        <Grid container>
          <Grid xs={12} sm={12} md={10} lg={10} xl={10}>
            <Grid xs={12} sm={12} md={12} lg={10} xl={8}>
              <h1 className="error_pages_h1"> Unauthorised </h1>
            </Grid>

            <Grid xs={12} sm={12} md={12} lg={10} xl={12}>
              <h2 className="error_pages_h2"> 401. Access denied. </h2>
            </Grid>

            <Grid xs={12} sm={12} md={12} lg={10} xl={6}>
              <h4 className="error_pages_h4"> You are not currently authorised to use the portal please login to access it. </h4>
            </Grid>

            <Grid xs={12} sm={8} md={7} lg={6} xl={5}>
              <Button
                variant="outlined"
                className="error_pages_button"
                fullWidth
                onClick={handleRedirectToLogin}
                sx={{
                  boxSizing: "border-box",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px 55px",
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
                }}>
                {/* <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                > */}{" "}
                Go to login &rarr;
                {/* </Link> */}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AccessDenied;
