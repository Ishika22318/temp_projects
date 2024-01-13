import React, { useState, useEffect } from "react";
import { FormControl, Grid, Box, Stack, Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { trainingcourseManagementAPI } from "../../utils/url";
import { toast } from "react-toastify";
import PageTitle from "../reportTab/pageTitle";
import { COURSE_FORM_LIST, SUBTOPIC_FORM_LIST, TOPIC_FORM_LIST } from "./courseForm";
import FormField from "./formField";
import { set } from "lodash";
import RadioField from "./radioField";
import DropdownField from "./dropDownField";
import TextAreaField from "./GenericTextAreaField";

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
    cursor: "pointer",
  },
  deleteButton: {
    color: "#CC2A14 !important",
    marginTop: "25px",
    cursor: "pointer",
  },
}));

const getToken = () => {
  return localStorage.getItem("token");
};

const EditForm = () => {
  const location = useLocation();
  const classes = useStyles();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    reset,
  } = useForm();
  const [courseData, setCourseData] = useState({});
  const [topics, setTopics] = useState([{ id: 1, showRemove: false, value: "" }]);
  const [subtopics, setSubtopics] = useState([{ topicId: 1, id: 1, value: "" }]);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [updatedCourses, setUpdatedCourses] = useState({});

  useEffect(() => {
    const data = location.state;
    if (data) {
      const { courseName, courseDescription, courseType, courseDuration, courseURL, assessmentURL, assignmentURL, details } = data;
      setCourseData(data);
      setUpdatedDetails(details);

      // Create an object to set the initial state
      const fieldValues = {
        courseName,
        courseDescription,
        courseType,
        courseDuration,
        courseURL,
        assessmentURL,
        assignmentURL,
      };

      // Extract topics and subtopics from the `details` array
      const topicsData = details.map((detail) => {
        return {
          id: detail._id,
          value: detail.topic,
          showRemove: true,
        };
      });

      const subtopicsData = details.reduce((acc, detail) => {
        const subtopics = detail.subTopic.map((subtopic, i = 0) => {
          return {
            topicId: detail._id,
            id: detail._id + "subtopicIndex" + i,
            value: subtopic,
          };
        });
        return [...acc, ...subtopics];
      }, []);

      setTopics(topicsData);
      setSubtopics(subtopicsData);

      // Prefill topics and subtopics
      topicsData.forEach((topic) => {
        fieldValues[`topic${topic.id}`] = topic.value;
      });

      subtopicsData.forEach((subtopic) => {
        fieldValues[`subtopic${subtopic.id}`] = subtopic.value;
      });

      // Use the fieldValues object to reset the form
      reset(fieldValues);
    } else {
      console.error("Error: No data in row object");
    }
  }, [location.state]);

  const onSubmit = async (data) => {
    try {
      if (Object.keys(updatedCourses).length === 0) {
        toast.success("Nothing to be updated", {
          onClose: () => {
            // Redirect the user to the 'displaycourses' page
            navigate("/courses");
          },
        });
        return;
      }

      if (updatedCourses.details) {
        const updatedDetailsCopy = [...updatedCourses.details];
        updatedDetailsCopy.forEach((detail) => {
          delete detail._id;
          if (Array.isArray(detail.subTopic)) {
            detail.subTopic = detail.subTopic.filter((subtopic) => subtopic.trim() !== "");
          }
        });

        const filteredDetailsCopy = updatedDetailsCopy.filter((detail) => {
          return Array.isArray(detail.subTopic) && detail.subTopic.length > 0;
        });

        const updatedCoursesCopy = { ...updatedCourses, details: filteredDetailsCopy };
        setUpdatedCourses(updatedCoursesCopy);
      }

      console.log("Updated Courses:", updatedCourses);

      const token = getToken();

      if (!token) {
        console.error("No token available. User may not be logged in.");
        return;
      }

      const response = await fetch(`${trainingcourseManagementAPI}/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCourses),
      });

      if (response.ok) {
        const responseData = await response.json();
        // Show a success toast notification
        toast.success("Course updated successfully", {
          onClose: () => {
            // Redirect the user to the 'displaycourses' page
            navigate("/courses");
          },
        });
      } else {
        console.error("Error updating course data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const onChangeField = (value, fieldName) => {
    if (fieldName.startsWith("topic") || fieldName.startsWith("subtopic")) {
      const topicId = fieldName.split("topic")[1].split("sub")[0];
      const subTopicId = parseInt(fieldName.split("subtopicIndex")[1]);

      if (subTopicId || subTopicId === 0) {
        updatedDetails.forEach((detail) => {
          if (detail._id === topicId) {
            detail.subTopic[subTopicId] = value;
          }
        });
      } else if (updatedDetails.some((detail) => detail._id === topicId)) {
        updatedDetails.forEach((detail) => {
          if (detail._id === topicId) {
            detail.topic = value;
          }
        });
      } else if (!updatedDetails.some((detail) => detail._id === topicId)) {
        const newTopic = {
          topic: value,
          _id: topicId,
          subTopic: [],
        };
        updatedDetails.push(newTopic);
      }
      const x = set(updatedCourses, ["details"], updatedDetails);
      setUpdatedCourses(x);
    } else {
      if (fieldName === "courseType" && (value === "Generic Training" || value === "Soft Skills Training")) {
        const x = set(updatedCourses, ["jobRole"], null);
        setUpdatedCourses(x);
      }
      const x = set(updatedCourses, [fieldName], value);
      setUpdatedCourses(x);
    }
  };

  const addField = (topicId) => {
    const existingSubtopics = subtopics.filter((subtopic) => subtopic.topicId === topicId);
    let maxSubtopicId = -1;

    if (existingSubtopics.length > 0) {
      maxSubtopicId = Math.max(...existingSubtopics.map((subtopic) => parseInt(subtopic.id.replace(`${topicId}subtopicIndex`, ""))));
    }

    const newFieldId = `${topicId}subtopicIndex${maxSubtopicId + 1}`;
    setSubtopics([...subtopics, { topicId, id: newFieldId, value: "" }]);
  };

  const addTopic = () => {
    const newTopicId = topics.length + 1;
    const newTopic = { id: newTopicId, showRemove: true, value: "" };
    setTopics([...topics, newTopic]); // Prepend the new topic to the topics array
    addField(newTopicId);
  };

  const removeField = (id) => {
    const topicId = id.split("topic")[1].split("sub")[0];
    const subTopicId = parseInt(id.split("subtopicIndex")[1]);
    const updatedSubtopics = subtopics.filter((subtopic) => subtopic.id !== topicId + "subtopicIndex" + subTopicId);
    setSubtopics(updatedSubtopics);

    updatedDetails.forEach((detail) => {
      if (detail._id === topicId) {
        delete detail.subTopic[subTopicId];
      }
    });

    const x = set(updatedCourses, ["details"], updatedDetails);
    setUpdatedCourses(x);
  };

  const removeTopic = (id) => {
    const updatedTopics = topics.filter((topic) => topic.id !== id);
    setTopics(updatedTopics);
    const updatedSubtopics = subtopics.filter((subtopic) => subtopic.topicId !== id);
    setSubtopics(updatedSubtopics);
    const updatedDetailsCopy = updatedDetails.filter((detail) => detail._id !== id);
    const x = set(updatedCourses, ["details"], updatedDetailsCopy);
    setUpdatedCourses(x);
  };

  const handleInputChange = (fieldId, value) => {
    // Update the value of the specific field
    const updatedSubtopics = subtopics.map((subtopic) => (subtopic.id === fieldId ? { ...subtopic, value } : subtopic));
    setSubtopics(updatedSubtopics);
  };

  return (
    <div className="col-12 px-0 mt-5 pt-3">
      <PageTitle key="title" title="Edit Course" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl style={{ padding: "25px", width: "100%" }}>
          <Grid container spacing={2}>
            {COURSE_FORM_LIST.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={4}>
                {item.type === "radio" ? (
                  <RadioField item={item} value={location.state[item.name]} onChange={onChangeField} />
                ) : item.type === "select" ? (
                  <DropdownField item={item} value={location.state[item.name]} onChange={onChangeField} options={item.options} />
                ) : item.type === "textArea" ? (
                  <TextAreaField item={item} value={location.state[item.name]} onChange={onChangeField} />
                ) : (
                  <FormField item={item} value={location.state[item.name]} onChange={onChangeField} />
                )}
              </Grid>
            ))}
          </Grid>
        </FormControl>
      </form>
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
              {TOPIC_FORM_LIST.map((item) => (
                <FormField item={item} value={topic.value} onChange={(value) => onChangeField(value, `topic${topic.id}`)}></FormField>
              ))}
              <div style={{ marginTop: "12px" }}>
                <p className={classes.headline}>
                  Sub Topics{"  "}
                  <AddBoxIcon className={classes.button} onClick={() => addField(topic.id)} />
                </p>
                {subtopics.map((subtopic) =>
                  subtopic.topicId === topic.id ? (
                    <div key={subtopic.id} style={{ display: "flex", alignItems: "center" }}>
                      {SUBTOPIC_FORM_LIST.map((item) => (
                        <FormField item={item} value={subtopic.value} onChange={(value) => onChangeField(value, `topic${subtopic.id}`)}></FormField>
                      ))}
                      {subtopic.id !== 1 ? <DeleteIcon className={classes.deleteButton} onClick={() => removeField(`topic${subtopic.id}`)} /> : <DeleteIcon className={classes.deleteButton} style={{ display: "none" }} />}
                    </div>
                  ) : null
                )}
              </div>
            </FormControl>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box position="sticky" bottom={0} backgroundColor="#fff" p={2} borderTop="1px solid #ccc">
          <Box display="flex" justifyContent="flex-end">
            <Stack spacing={2} direction="row">
              <Button
                variant="text"
                className={classes.button}
                onClick={() => {
                  navigate("/courses");
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: isValid ? "#0D4896" : "#CCCCCC", // Change background color based on validity
                  color: "#FFF",
                  outline: "none !important",
                }}
                type="submit" // Disable the Button if there are validation errors
              >
                Save
              </Button>
            </Stack>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default EditForm;
