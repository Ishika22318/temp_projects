import React, { useEffect, useState } from "react";
// import WeeklyEvaluationTableSearchBar from "./weekly-evaluation-table-search-bar";
import { IconButton, InputAdornment, TextField, Typography, Alert, Snackbar } from "@mui/material";
import DropDownListMenu from "./drop-down-menu";
import { AiOutlineMail } from "react-icons/ai";
import GenericTable from "../genericTable/genricTable";
import { dashboardTableHeaader } from "../../utils/constants";
import { sendEmailNotificationAction } from "../../utils/url";
import { postEmailNotification } from "../../services/apicall";

const WeeklyEvaluationComponent = ({ data, selectedRoleDropdown, selectedWeeks }) => {
  const [uniqueMentors, setUniqueMentors] = useState([]);
  const [uniqueInterns, setUniqueInterns] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleMentorChange = (event) => {
    setSelectedMentor(event.target.value);
  };
  const handleRowSelect = (selectedRowIds) => {
    setSelectedRows(selectedRowIds);
  };
  const flattenedData = data

    .filter((item) => selectedMentor !== null && item.mentor.name === selectedMentor.name)
    .flatMap((item) => [
      {
        action: item.action,
        endDate: item.endDate,
        id: item.id,
        internImage: item.intern.image,
        internName: item.intern.name,
        mentorImage: item.mentor.image,
        mentorName: item.mentor.name,
        startDate: item.startDate,
        status: item.status,
      },
    ]);
  // console.log("flattenedData", flattenedData);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleEmailAction = async (emailData) => {
    try {
      let emailMsg = "Email Sent Successfully";
      let emailPostData = {
        email: emailData.action,
        name: emailData.mentorName,
        internName: emailData.internName + " of week : " + emailData.startDate + "-" + emailData.endDate,
      };
      if (emailData.action === "all") {
        emailMsg = "Email successfully sent to all";
      }
      if (emailData.action === "all" && selectedRows.length > 0) {
        const selectedNames = selectedRows.map((item) => {
          emailPostData.email = data[item - 1].action;
          emailPostData.name = data[item - 1].mentor.name;
          return data[item - 1].intern.name + " of week : " + data[item - 1].startDate + "-" + data[item - 1].endDate;
        });
        // emailPostData.email= flattenedData[0].email,
        emailPostData.internName = selectedNames.join(" and ");

        emailMsg = "Email successfully sent to selected members";
      }
      const token = localStorage.getItem("token");
      console.log(emailPostData);

      const res = await postEmailNotification(sendEmailNotificationAction, token, emailPostData);
      setSnackbarMessage(res.data);
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage(err.data);
      setSnackbarOpen(true);
      console.log(err);
    }
  };

  useEffect(() => {
    const uniqueMentorsArray = [];
    const uniqueInternsArray = [];
    const mentorNames = new Set();
    const internNames = new Set();
    data.forEach((item) => {
      const mentor = item.mentor;
      const mentorName = mentor.name;
      if (mentorName !== "none" && !mentorNames.has(mentorName)) {
        mentorNames.add(mentorName);
        uniqueMentorsArray.push(mentor);
      }
    });
    data.forEach((item) => {
      const intern = item.intern;
      const internName = intern.name;
      if (internName !== "none" && !internNames.has(internName)) {
        internNames.add(internName);
        uniqueInternsArray.push(intern);
      }
    });

    setUniqueMentors(uniqueMentorsArray);
    if (uniqueMentorsArray.length > 0) {
      setSelectedMentor(uniqueMentorsArray[0]);
    }
    setUniqueInterns(uniqueInternsArray);
  }, [data]);
  // console.log("uniqueMentors", uniqueMentors, "uniqueInterns", uniqueInterns);

  return (
    <>
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity={snackbarMessage.success === true ? "success" : "error"} onClose={handleSnackbarClose}>
          {snackbarMessage.success === true ? snackbarMessage.message : snackbarMessage.error}
        </Alert>
      </Snackbar>
      {/* {console.log("uniqueMentors", uniqueMentors)} */}
      <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>Weekly Evaluation</Typography>
      <div style={{ paddingRight: "50px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", alignContent: "space-evenly" }}>
          <p className="dashboard-text">Interns</p>
          <div style={{ paddingLeft: "20px" }}></div>
          <p className="dashboard-text">Mentors</p>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", alignContent: "space-evenly" }}>
          <div class="dashboard-circle-intern">
            <p className="dashboard-count-text">{uniqueInterns.length}</p>
          </div>
          <div style={{ paddingLeft: "60px" }}></div>
          <div className="dashboard-circle-mentor">
            <p className="dashboard-count-text">{uniqueMentors.length}</p>
          </div>
          <div style={{ paddingLeft: "20px" }}></div>
        </div>
      </div>
      <div className="wrapper-dashboard">
        <span style={{ display: "inline" }}>
          <div className="drop-down-div">
            <DropDownListMenu mentorData={uniqueMentors} selectedMentor={selectedMentor} handleMentorChange={handleMentorChange} />
          </div>
          <div className="send-all-actions-div">
            <TextField
              value="Send Notifications"
              sx={{ fontSize: "1.5rem" }}
              size="small"
              onClick={(e) => handleEmailAction({ action: "all", mentorName: "all", internName: "all", startDate: "", endDate: "" })}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <AiOutlineMail />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </span>
      </div>
      <div className="weekly-evaluation-table-div">
        {/* <WeeklyEvaluationTableSearchBar data={data} selectedMentor={selectedMentor} /> */}

        <GenericTable headers={dashboardTableHeaader} data={flattenedData} selectedRows={selectedRows} onRowSelect={handleRowSelect} handleEmailAction={handleEmailAction} />
      </div>
    </>
  );
};
export default WeeklyEvaluationComponent;
