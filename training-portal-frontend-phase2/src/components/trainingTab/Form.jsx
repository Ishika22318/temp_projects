import React, { useState } from "react";
import { FormControl, Grid, Box, Stack, Button, MenuItem, Select, InputLabel, FormLabel, FormHelperText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Tooltip from "@mui/material/Tooltip";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import GenericInputField from "./GenericInputField";
import { makeStyles } from "@mui/styles";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import { courseUrl } from "../../utils/url";
import PageTitle from "../reportTab/pageTitle";
import GenericTextAreaField from "./GenericTextAreaField";
const URL_REGEX = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9]+(\.[-a-zA-Z0-9]+)+([/?]\S*)?$/;

const useStyles = makeStyles((theme) => ({
  container: {
    height: "90%",
    width: "100%",
    marginTop: "80px",
  },
  form: {
    borderTop: "9px solid #D9DAE4",
    borderBottom: "9px solid #D9DAE4",
    marginBottom: "15px",
    padding: "5px",
  },
  box: {
    backgroundColor: "#D9DAE4",
    margin: "6px",
    padding: "16px",
  },
  headline: {
    color: "#0D4896",
    fontSize: "20px",
  },
  iconbutton: {
    backgroundColor: "transparent",
    border: "none",
  },
  addIcon: {
    color: "#0D4896",
    fontSize: "30px",
  },
  delIcon: {
    color: "#0D4896",
    fontSize: "30px",
  },
}));

const Form = (params) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const location = useLocation();

  const jobRole = location.state.jobRole;
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm();

  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isMessageBoxOpen, setMessageBoxOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  //   setShowSuccessMessage(true);
  // }

  const onSubmit = async (data) => {
    try {
      // Adapt the received data to match the Mongoose schema
      const details = [];

      // Iterate over topics
      topics.forEach((topic) => {
        const topicData = {
          topic: data[`topic${topic.id}`],
          subTopic: [],
        };

        // Iterate over subtopics associated with this topic
        subtopics.forEach((subtopic) => {
          if (subtopic.topicId === topic.id) {
            topicData.subTopic.push(data[`subtopic${subtopic.id}`]);
          }
        });

        details.push(topicData);
      });

      const adaptedData = {
        jobRole: data.courseType === "Generic Training" || data.courseType === "Certification Training" || data.courseType === "Soft Skills" ? null : jobRole, // Assuming "role" maps to "jobRole" in the schema
        courseName: data.courseName,
        courseDescription: data.courseDescription,
        courseType: data.courseType, // You need to specify where "courseType" comes from
        courseDuration: parseInt(data.courseDuration),
        courseStarting: parseInt(data.courseStarting),
        courseURL: data.courseUrl,
        assessmentURL: data.assessmentUrl,
        assignmentURL: data.assignmentUrl,
        details: details,
      };
      console.log(adaptedData);
      const token = getToken(); // Retrieve the token from localStorage

      if (!token) {
        // Handle the case where the token is not available (e.g., user is not logged in)
        console.error("No token available. User may not be logged in.");
        return;
      }

      const response = await fetch(courseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(adaptedData), // Send the adapted data
      });

      if (response.ok) {
        // Successful response
        const responseData = await response.json();
        // console.log("Data from the backend", responseData);
        setIsSuccessDialogOpen(true);
        // After showing the success message, you can navigate back
        setTimeout(() => {
          navigate("/courses"); // Go back to the previous page
        }, 3000); // Redirect after 3 seconds (adjust the delay as needed)
      } else {
        // Handle errors here
        console.error("Error submitting form data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleCloseSuccessDialog = () => {
    setIsSuccessDialogOpen(false);
  };
  const [topics, setTopics] = useState([{ id: 1, showRemove: false, value: "" }]);
  const [subtopics, setSubtopics] = useState([{ topicId: 1, id: 1, value: "" }]);

  const addField = (topicId) => {
    const newFieldId = subtopics.length + 1;
    setSubtopics([...subtopics, { topicId, id: newFieldId, value: "" }]);
  };

  const addTopic = () => {
    const newTopicId = topics.length + 1;
    setTopics([...topics, { id: newTopicId, showRemove: true, value: "" }]);
    addField(newTopicId);
  };

  const removeField = (id) => {
    const updatedSubtopics = subtopics.filter((subtopic) => subtopic.id !== id);
    setSubtopics(updatedSubtopics);
  };

  const removeTopic = (id) => {
    const updatedTopics = topics.filter((topic) => topic.id !== id);
    setTopics(updatedTopics);
    // Also remove associated subtopics
    const updatedSubtopics = subtopics.filter((subtopic) => subtopic.topicId !== id);
    setSubtopics(updatedSubtopics);
  };

  const handleInputChange = (fieldId, value) => {
    // Update the value of the specific field
    const updatedSubtopics = subtopics.map((subtopic) => (subtopic.id === fieldId ? { ...subtopic, value } : subtopic));
    setSubtopics(updatedSubtopics);
  };

  const handleButtonClick = () => {
    // Navigate to the '/training' route
    navigate("/courses");
  };
  function validateUrl(url) {
    console.log("URL in validateUrl:", url);

    // Test the URL against the regular expression
    if (!URL_REGEX.test(url)) {
      console.log("Invalid URL format. Please enter a valid URL.");
      return "Invalid URL format. Please enter a valid URL.";
    }

    // Parse the URL using the DOM
    var parser = document.createElement("a");
    parser.href = url;

    // Check for protocol
    if (!parser.protocol || parser.protocol === ":") {
      console.log("Missing protocol. Please include http:// or https:// in the URL.");
      return "Missing protocol. Please include http:// or https:// in the URL.";
    }

    // Check for valid domain
    if (!parser.hostname) {
      console.log("Invalid domain. Please enter a valid domain.");
      return "Invalid domain. Please enter a valid domain.";
    }

    // If all checks pass, the URL is considered valid
    console.log("Validation Result: Valid URL");
    return "Valid URL";
  }

  return (
    <div className="col-12 px-0 mt-5 pt-3">
      <PageTitle key="title" title="Add Course" />
      <div>
        <FormControl style={{ margin: "25px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              {/* label is placeholder , showformlabel is prop to show formlabel & formlabel is the propvlaue */}
              <Controller
                name="courseName"
                control={control}
                defaultValue=""
                rules={{
                  required: "Course Name is required",
                  minLength: {
                    value: 3,
                    message: "Course Name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 72,
                    message: "Course Name must be less than 72 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9\s]*$/,
                    message: "Course Name can only alphanumeric characters,no special characters",
                  },
                }}
                render={({ field }) => (
                  <GenericInputField
                    label="Course Name"
                    showFormLabel={true}
                    formLabel="Course Name"
                    error={errors.courseName && errors.courseName.message}
                    {...field}
                    onBlur={async () => {
                      // Trigger validation when the field loses focus
                      await trigger("courseName");
                    }}
                    onChange={(e) => {
                      // Trigger validation when the input changes
                      field.onChange(e);
                      trigger("courseName");
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="assignmentUrl"
                control={control}
                defaultValue=""
                rules={{
                  validate: async (value) => {
                    const trimmedValue = (value || "").trim();

                    console.log("Original Value:", value);
                    console.log("Trimmed Value:", trimmedValue);

                    // Check if the trimmed value is not empty
                    if (!trimmedValue) {
                      console.log("Empty Value Warning");
                      // Return without showing an error if the value is empty
                      return true;
                    }

                    // Use the validateUrl function for comprehensive URL validation
                    const validationResult = validateUrl(trimmedValue);

                    console.log("Validation Result:", validationResult);

                    if (validationResult !== "Valid URL") {
                      console.log("Invalid URL Warning");
                      return validationResult;
                    }

                    // If the URL is valid, return true
                    return true;
                  },
                }}
                render={({ field }) => (
                  <GenericInputField
                    label="Assignment URL"
                    showFormLabel={true}
                    formLabel="Assignment URL"
                    error={errors.assignmentUrl?.message}
                    {...field}
                    onBlur={async () => {
                      // Trigger validation when the field loses focus
                      await trigger("assignmentUrl");
                    }}
                    onChange={(value) => {
                      // Use the onChange function directly from the field object
                      field.onChange(value);
                      trigger("assignmentUrl");
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="assessmentUrl"
                control={control}
                defaultValue=""
                rules={{
                  validate: async (value) => {
                    const trimmedValue = (value || "").trim();

                    console.log("Original Value:", value);
                    console.log("Trimmed Value:", trimmedValue);

                    if (!trimmedValue) {
                      console.log("Empty Value Warning");
                      // Return without showing an error if the value is empty
                      return true;
                    }

                    const validationResult = validateUrl(trimmedValue);

                    console.log("Validation Result:", validationResult);

                    if (validationResult !== "Valid URL") {
                      console.log("Invalid URL Warning");
                      return validationResult;
                    }

                    return true;
                  },
                }}
                render={({ field }) => (
                  <GenericInputField
                    label="Assessment URL"
                    showFormLabel={true}
                    formLabel="Assessment URL"
                    error={errors.assessmentUrl?.message}
                    {...field}
                    onBlur={async () => {
                      await trigger("assessmentUrl");
                    }}
                    onChange={(value) => {
                      field.onChange(value);
                      trigger("assessmentUrl");
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="courseUrl"
                control={control}
                defaultValue=""
                rules={{
                  validate: async (value) => {
                    const trimmedValue = (value || "").trim();

                    console.log("Original Value:", value);
                    console.log("Trimmed Value:", trimmedValue);

                    if (!trimmedValue) {
                      console.log("Empty Value Warning");
                      return "Course URL is required";
                    }

                    const validationResult = validateUrl(trimmedValue);

                    console.log("Validation Result:", validationResult);

                    if (validationResult !== "Valid URL") {
                      console.log("Invalid URL Warning");
                      return validationResult;
                    }

                    return true;
                  },
                }}
                render={({ field }) => (
                  <GenericInputField
                    label="Course URL"
                    showFormLabel={true}
                    formLabel="Course URL"
                    error={errors.courseUrl?.message}
                    {...field}
                    onBlur={async () => {
                      await trigger("courseUrl");
                    }}
                    onChange={(value) => {
                      field.onChange(value);
                      trigger("courseUrl");
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <Controller
                name="courseDuration"
                control={control}
                defaultValue=""
                rules={{
                  required: "Course Duration is required",
                  minLength: {
                    value: 1,
                    message: "Course Duration must be at least 1 characters",
                  },
                  pattern: {
                    value: /^[0-9]*$/, // Use a regular expression to allow only numeric input
                    message: "Course Duration must be a number",
                  },
                }}
                render={({ field }) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <GenericInputField
                      label="Course Duration"
                      showFormLabel={true}
                      formLabel="Course Duration"
                      error={errors.courseDuration && errors.courseDuration.message}
                      {...field}
                      onBlur={async () => {
                        // Trigger validation when the field loses focus
                        await trigger("courseDuration");
                      }}
                      onChange={(e) => {
                        // Trigger validation when the input changes
                        field.onChange(e);
                        trigger("courseDuration");
                      }}
                    />

                    <Tooltip title="Number of days in which the Course Should be Completed" arrow>
                      <InfoIcon style={{ marginLeft: "5px", marginTop: "25px", cursor: "pointer", color: "#666" }} />
                    </Tooltip>
                  </div>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Controller
                name="courseStarting"
                control={control}
                defaultValue=""
                rules={{
                  required: "Course starting day is required",
                  minLength: {
                    value: 1,
                    message: "Course starting day must be at least 1 characters",
                  },
                  pattern: {
                    value: /^[0-9]*$/, // Use a regular expression to allow only numeric input
                    message: "Course starting day must be a number",
                  },
                }}
                render={({ field }) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <GenericInputField
                      label="Days from Batch Start Date"
                      showFormLabel={true}
                      formLabel="Course Starting Day"
                      error={errors.courseStarting && errors.courseStarting.message}
                      {...field}
                      onBlur={async () => {
                        // Trigger validation when the field loses focus
                        await trigger("courseStarting");
                      }}
                      onChange={(e) => {
                        // Trigger validation when the input changes
                        field.onChange(e);
                        trigger("courseStarting");
                      }}
                    />
                    <Tooltip title="Number of Days after which the course start from batch starting date" arrow>
                      <InfoIcon style={{ marginLeft: "5px", marginTop: "25px", cursor: "pointer", color: "#666" }} />
                    </Tooltip>
                  </div>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="courseType"
                control={control}
                defaultValue=""
                rules={{
                  required: "Course Type is required",
                }}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel style={{ color: "black", fontSize: "14px" }}>Course Type</FormLabel>
                    {field.value === " " && field.value ? null : ( // Display InputLabel based on conditions
                      <InputLabel
                        style={{
                          color: "grey",
                          fontSize: "15px",
                          paddingTop: "13px",
                        }}
                      ></InputLabel>
                    )}
                    <Select
                      sx={{ width: "420px", height: "40px" }}
                      error={!!errors.courseType}
                      {...field}
                      onBlur={async () => {
                        await trigger("courseType");
                      }}
                      value={field.value || ""}
                    >
                      <MenuItem value="" disabled>
                        Select a Course Type
                      </MenuItem>
                      <MenuItem value="Generic Training">Generic Training</MenuItem>
                      <MenuItem value="Soft Skills Training">Soft Skills Training</MenuItem>
                      <MenuItem value="Technical Skills Training">Technical Skills Training</MenuItem>
                      <MenuItem value="Certification Training">Certification Training</MenuItem>
                    </Select>
                    {errors.courseType && <FormHelperText error={!!errors.courseType}>{errors.courseType.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="courseDescription"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <GenericTextAreaField
                    item={{
                      label: "Course Description", // Provide the label property
                      name: "courseDescription",
                      formLabel: "Course Description",
                      rules: {
                        required: "Course Description is required",
                        minLength: {
                          value: 15,
                          message: "Course Description must be at least 15 characters",
                        },
                        maxLength: {
                          value: 240,
                          message: "Course Description must be less than 240 characters",
                        },
                      },
                    }}
                    showFormLabel={true}
                    error={errors.courseDescription && errors.courseDescription.message}
                    {...field}
                    onBlur={async () => {
                      // Trigger validation when the field loses focus
                      await trigger("courseDescription");
                    }}
                    onChange={(e) => {
                      // Trigger validation when the input changes
                      field.onChange(e);
                      trigger("courseDescription");
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </FormControl>
        <div style={{ padding: "25px", width: "100%" }}>
          <p className={classes.headline}>
            Course Content{"  "}
            <AddBoxIcon className={classes.button} onClick={() => addTopic()} />
          </p>
          {topics.map((topic, index) => (
            <div key={topic.id} style={{ border: "1px solid #D9DAE4", borderRadius: "10px", marginBottom: "36px", backgroundColor: "#eeeeee" }}>
              {index === 0 ? (
                <></>
              ) : (
                <div style={{ display: "flex", justifyContent: "flex-end", margin: "12px 12px 0px 12px" }}>
                  <Button onClick={() => removeTopic(topic.id)}>Remove section</Button>
                </div>
              )}
              <FormControl style={{ padding: "25px", width: "100%" }}>
                <Controller
                  name={`topic${topic.id}`}
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Topic is required",
                    minLength: {
                      value: 3,
                      message: "Topic must be at least 3 characters",
                    },
                    maxLength: {
                      value: 72,
                      message: "Topic must be less than 72 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9\s]*$/,
                      message: "Topic can only alphanumeric characters,no special characters",
                    },
                  }}
                  render={({ field }) => (
                    <GenericInputField
                      label="Topic"
                      showFormLabel={true}
                      formLabel="Topic"
                      error={errors[`topic${topic.id}`] && errors[`topic${topic.id}`].message}
                      value={topic.value}
                      //onChange={(e) => handleInputChange(topic.id, e.target.value)}
                      onChange={(e) => {
                        // Trigger validation when the input changes
                        console.log("im here");
                        field.onChange(e);
                        trigger(`topic${topic.id}`);
                        handleInputChange(topic.id, e.target.value);
                      }}
                      onBlur={async () => {
                        // Trigger validation when the field loses focus
                        await trigger(`topic${topic.id}`);
                      }}
                      {...field}
                    />
                  )}
                />
                <div style={{ marginTop: "12px" }}>
                  <p className={classes.headline}>
                    Sub Topics{"  "}
                    <AddBoxIcon className={classes.button} onClick={() => addField(topic.id)} />
                  </p>
                  {subtopics.map((subtopic) =>
                    subtopic.topicId === topic.id ? (
                      <div key={subtopic.id} style={{ display: "flex", alignItems: "center" }}>
                        <Controller
                          name={`subtopic${subtopic.id}`}
                          control={control}
                          defaultValue=""
                          rules={{
                            required: "Subtopic is required",
                            minLength: {
                              value: 3,
                              message: "Subtopic must be at least 3 characters",
                            },
                            maxLength: {
                              value: 72,
                              message: "Subtopic must be less than 72 characters",
                            },
                            pattern: {
                              value: /^[a-zA-Z0-9\s]*$/,
                              message: "Subtopic can only alphanumeric characters,no special characters",
                            },
                          }}
                          render={({ field }) => (
                            <GenericInputField
                              label="Subtopic"
                              showFormLabel={true}
                              formLabel="Subtopic"
                              error={errors[`subtopic${subtopic.id}`] && errors[`subtopic${subtopic.id}`].message}
                              value={subtopic.value}
                              //onChange={(e) => handleInputChange(subtopic.id, e.target.value)}
                              onChange={(e) => {
                                // Trigger validation when the input changes
                                console.log("im here");
                                field.onChange(e);
                                trigger(`subtopic${subtopic.id}`);
                                handleInputChange(subtopic.id, e.target.value);
                              }}
                              onBlur={(e) => {
                                // Trigger validation when the field loses focus
                                field.onBlur(e);
                                trigger(`subtopic${subtopic.id}`);
                              }}
                              {...field}
                            />
                          )}
                        />

                        {subtopic.id !== 1 && (
                          <button className={classes.iconbutton} onClick={() => removeField(subtopic.id)}>
                            <DisabledByDefaultIcon className={classes.delIcon} />
                          </button>
                        )}
                      </div>
                    ) : null
                  )}
                </div>
              </FormControl>
            </div>
          ))}
        </div>
      </div>

      <Box position="sticky" bottom={0} backgroundColor="#fff" p={2} borderTop="1px solid #ccc">
        <Box display="flex" justifyContent="flex-end">
          <Stack spacing={2} direction="row">
            <Button style={{ color: "#0D4896", outline: "none" }} variant="text" onClick={handleButtonClick}>
              Cancel
            </Button>
            <Button
              sx={{
                backgroundColor: isValid ? "#0D4896" : "#CCCCCC", // Change background color based on validity
                color: "#FFF",
                outline: "none !important",
              }}
              //style={{ backgroundColor: "#0D4896", outline: "none" }}
              variant="contained"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid} // Disable the button if there are validation errors
            >
              Create
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onClose={handleCloseSuccessDialog}>
        <DialogTitle>Success!</DialogTitle>
        <DialogContent>
          <DialogContentText>Your Course has been successfully created.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Form;
