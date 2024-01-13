import React from "react";
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, Typography, Grid, Divider } from "@mui/material";
import { USER_STATUS_OPTIONS } from "../../../utils/constants";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-phone-number-input/style.css";
import "./editScreenComponents.css";

const CommonFields = ({ userData, handleChange }) => {
  return (
    <>
      <Typography className="typographyStyle">User Email</Typography>
      <TextField name="email" fullWidth value={userData.email} disabled className="inputFieldEmail" />
      <Grid container spacing={3} className="marginTop">
        <Grid item xs={6}>
          <Typography className="typographyStyle">User Name</Typography>
          <TextField name="name" fullWidth value={userData.name} onChange={handleChange} className="inputField" />
        </Grid>

        <Grid item xs={6}>
          <Typography className="typographyStyle">User Contact</Typography>

          <ReactPhoneInput
            name="contact"
            value={userData.contact}
            onChange={(value) => {
              handleChange({
                target: {
                  name: "contact",
                  value: value,
                },
              });
            }}
            className="phoneInputField"
            country={"in"}
          />
        </Grid>
      </Grid>

      <Divider className="divider" />

      <FormControl component="fieldset" className="statusField">
        <Typography className="typographyStyle">User Status</Typography>
        <RadioGroup name="status" value={userData.status} onChange={handleChange}>
          <div>
            {Object.entries(USER_STATUS_OPTIONS).map(([key, label]) => (
              <FormControlLabel key={key} value={key} control={<Radio />} label={label === USER_STATUS_OPTIONS.true ? USER_STATUS_OPTIONS.true : USER_STATUS_OPTIONS.false} />
            ))}
          </div>
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default CommonFields;
