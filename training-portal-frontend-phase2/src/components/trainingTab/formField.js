import React, { useState, useEffect } from "react";
import GenericInputField from "./GenericInputField";
import { makeStyles } from "@mui/styles";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: "#D9DAE4",
    margin: "6px",
    padding: "16px",
  },
  headline: {
    color: "#0D4896",
    fontSize: "20px",
  },
  button: {
    color: "#0D4896 !important",
  },
}));

const FormField = (props) => {
  const location = useLocation();
  const {
    control,
    formState: { errors },
    trigger,
  } = useForm();
  const { value, item, onChange } = props;

  const shouldRenderTooltip = ["courseDuration", "courseStarting"].includes(item.name);

  const classes = useStyles();

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", paddingTop: "12px", paddingBottom: "12px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: "8px" }}>{item.label}</label>
        {shouldRenderTooltip && (
          <Tooltip title={item.tooltipTitle} arrow>
            <InfoIcon style={{ marginLeft: "5px", cursor: "pointer", color: "#666" }} />
          </Tooltip>
        )}
      </div>
      <Controller
        name={item.name}
        control={control}
        defaultValue=""
        rules={item.rules}
        render={({ field }) => (
          <GenericInputField
            label=""
            showFormLabel={false}
            formLabel={item.label}
            defaultValue={item.label}
            error={errors[item.name] && errors[item.name].message}
            {...field}
            value={value}
            onBlur={async () => {
              // Trigger validation when the field loses focus
              await trigger(field.name);
            }}
            onChange={(e) => {
              // Trigger validation when the input changes
              field.onChange(e);
              onChange(e, field.name);
              trigger(field.name);
            }}
          />
        )}
      />
    </div>
  );
};

export default FormField;
