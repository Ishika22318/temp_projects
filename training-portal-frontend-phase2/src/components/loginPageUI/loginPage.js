import * as React from "react";
import "./loginPage.css";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { loginUrl } from "../../utils/url";
import QuantLogo from "../../assets/login_Images/Quantiphi_logo.png";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    fontSize: "16px",
    color: "var(--neutral-neutral-0, #0A0A0A)",
    marginBottom: "8px",
    fontStyle: "normal",
    fontFamily: "poppins",
    fontWeight: "400",
  },
  inputField: {
    width: "100%",
    fontSize: "14px",
    borderRadius: "4px",
    "&::placeholder": {
      fontStyle: "normal",
      fontWeight: "400",
      fontFamily: "poppins",
      color: "var(--neutral-neutral-0, #0A0A0A)",
      paddingLeft: "8px",
    },
  },
  submitButton: {
    background: "var(--primary-primary-30, #0D4896)",
    textTransform: "none",
    width: "100%",
    padding: "12px 25px",
    gap: "8px",
    fontSize: "16px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "24px",
    color: "var(--white, #FFF)",
  },
}));

export default function Form() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.user) {
      const { role } = data;
      localStorage.setItem("token", data.user);
      localStorage.setItem("role", role);
      if(role==="Intern"){
        navigate("/learning")
      }else if(role==="Admin"){
        navigate("/admin")
      };
    } else {
      alert("Please check Username and Password");
    }
  }

  return (
    <div className="login-page-body">
      <img className="comp-logo" src={QuantLogo} />
      <div className="App-heading">
        <h1>Fresher's Training Portal</h1>
      </div>
      <div className="login-container mt-5 pt-5 mx-4" onSubmit={loginUser}>
        <form className="formpage" data-testid="login-form">
          <h1 className="form-heading">Welcome!</h1>
          <p className="form-para">Sign in to your account</p>
          <div className="content">
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <InputLabel className={classes.inputLabel} htmlFor="email">
                  Email
                </InputLabel>
                <TextField
                  className={classes.inputField}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="john.doe@gmail.com"
                  InputProps={{
                    classes: {
                      input: classes.inputField,
                    },
                  }}
                />
              </Grid>

              <Grid item>
                <InputLabel className={classes.inputLabel} htmlFor="password">
                  Password
                </InputLabel>
                <TextField
                  className={classes.inputField}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="*********"
                  InputProps={{
                    classes: {
                      input: classes.inputField,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </div>

          <br />

          <div className="Rec-Password">
            <a>Recover Password?</a>
          </div>
          <br />
          <br />
          {/* <button data-testid="submit" type="submit" className="PrimaryButton">Submit</button> */}
          <Button variant="contained" className={classes.submitButton} data-testid="submit" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
