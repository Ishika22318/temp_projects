import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GreentickIcon from "../assets/icon/GreentickIcon";
import CrossIcon from "../assets/icon/CrossIcon";
import { AiOutlineMail, AiOutlineClockCircle, AiOutlineCheckCircle } from "react-icons/ai";

import InfoIcon from "@mui/icons-material/Info";

export const RELEASED_ICONS = {
  true: <GreentickIcon />,
  false: <CrossIcon />,
};

export const ACTION_FUNCTIONS = {
  Edit: {
    label: "Edit",
    icon: <EditIcon />,
  },
  Delete: {
    label: "Delete",
    icon: <DeleteIcon />,
  },
  Mail: {
    label: "Mail",
    icon: <AiOutlineMail />,
  },
  Info: {
    label: "Info",
    icon: <InfoIcon />,
  },
};
export const STATUS_FUNCTIONS = {
  true: {
    label: "Active",
    style: {
      className: "active-status",
    },
  },
  false: {
    label: "Inactive",
    style: {
      className: "inactive-status",
    },
  },
  Completed: {
    label: (
      <>
        <AiOutlineCheckCircle /> Completed
      </>
    ),
    style: {
      className: "data-done-status-tabelcell-container",
    },
  },
  "Not Started": {
    label: "Not Started",
    style: {
      className: "Not Started",
    },
  },
  "In Progress": {
    label: (
      <>
        <AiOutlineClockCircle /> In Progress
      </>
    ),
    style: {
      className: "data-status-tabelcell-container",
    },
  },
  Created: {
    // label: "Created",
    label: (
      <>
        <AiOutlineClockCircle /> Created{" "}
      </>
    ),
    style: {
      className: "Created",
    },
  },
  "Always Target": {
    label: "Always Target",
    style: {
      className: "Always-Target",
    },
  },
  Blocked: {
    label: (
      <>
        <AiOutlineClockCircle /> Blocked{" "}
      </>
    ),
    style: {
      className: "Blocked",
    },
  },

  "Mostly Target": {
    label: "Mostly Target",
    style: {
      className: "Mostly-Target",
    },
  },
  "Mostly Outstanding": {
    label: "Mostly Outstanding",
    style: {
      className: "Mostly-Outstanding",
    },
  },
  "Always Outstanding" : {
    label : "Always Outstanding",
    style : {
      className : "Always-Outstanding"
    }
  },
  "Threshold" : {
    label : "Threshold",
    style : {
      className : "Threshold"
    }
  },
  "Below Threshold" : {
    label : "Below Threshold",
    style : {
      className : "Below-Threshold"
    }
  }
};

export const SCORECARD = [
  { label: "Assessment", dataKey: "assessment", color: "Blue" },
  { label: "Mock Project", dataKey: "mockProject", color: "Blue" },
  {
    label: "Attendance & Participation",
    dataKey: "attendanceParticipation",
    color: "Green",
  },
  { label: "Time Management", dataKey: "timeManagement", color: "Green" },
  {
    label: "Communication Skills",
    dataKey: "communicationSkill",
    color: "Green",
  },
];

export const HEADERS = {
  USERS: "Users",
};

// Constants or an object to represent job roles
export const JOB_ROLES = {
  FRAMEWORK_ENGINEER: "Framework Engineer",
  BUSINESS_ANALYST: "Business Analyst",
  DATA_ENGINEER: "Data Engineer",
  MACHINE_LEARNING_ENGINEER: "Machine Learning Engineer",
  PLATFORM_ENGINEER: "Platform Engineer",
};

// Constants or an object to represent roles
export const USER_ROLES = {
  INTERN: "Intern",
  MENTOR: "Mentor",
  ADMIN: "Admin",
};

// Constants or an object to represent released options
export const RELEASED_OPTIONS = {
  true: "Yes",
  false: "No",
};

// Constants or an object to represent user status options
export const USER_STATUS_OPTIONS = {
  true: "Active",
  false: "Inactive",
};

export const TABLE_HEADERS = {
  Intern: [
    { id: "name", label: "Employee Name" },
    { id: "jobRole", label: "Job Role" },
    { id: "released", label: "Released" },
    { id: "addedBy", label: "Added by" },
    { id: "addedDate", label: "Added" },
    { id: "updatedDate", label: "Updated" },
    { id: "status", label: "Status" },
    { id: "action", label: "Edit", customAction: "Edit" },
  ],
  Mentor: [
    { id: "name", label: "Employee Name" },
    { id: "jobRole", label: "Job Role" },
    { id: "addedBy", label: "Added by" },
    { id: "addedDate", label: "Added" },
    { id: "updatedDate", label: "Updated" },
    { id: "status", label: "Status" },
    { id: "action", label: "Edit", customAction: "Edit" },
  ],
  Admin: [
    { id: "name", label: "Employee Name" },
    { id: "addedBy", label: "Added by" },
    { id: "addedDate", label: "Added" },
    { id: "updatedDate", label: "Updated" },
    { id: "status", label: "Status" },
    { id: "action", label: "Edit", customAction: "Edit" },
  ],
};

export const ErrorMessages = {
  FAILED_TO_FETCH_DATA: "Failed to fetch data",
  FAILED_TO_UPDATE_USER_DATA: "Failed to update user data",
  AN_ERROR_OCCURRED: "An error occurred",
  FAILED_TO_FETCH_BATCH_DATE: "Failed to fetch batch date",
  DOWNLOAD_ERROR: "An error in Downloading",
  ERROR_ADDING_USER: "Error adding user:",
  ERROR_SENDING_FILE_DATA: "Error sending file data",
};

export const dashboardTableHeaader = [
  { id: "mentorName", label: "Mentor", type: "object" },
  { id: "internName", label: "Intern", type: "object" },
  { id: "status", label: "Status", type: "string" },
  { id: "startDate", label: "Start Date", type: "string" },
  { id: "endDate", label: "End Date", type: "string" },
  { id: "action", label: "Action", customAction: "Mail" },
];

export const coursesHeader = [
  { id: "courseName", label: "CourseName", type: "object" },
  { id: "createdBy", label: "CreatedBy", type: "object" },
  { id: "courseStartDate", label: "Start Date", type: "string" },
  { id: "courseType", label: "CourseType", type: "string" },
  { id: "isActive", label: "Status", type: "string" },
  { id: "updatedOn", label: "UpdatedOn", type: "string" },

  { id: "action", label: "Action", customAction: ["Info", "Edit", "Delete"] },
];

export const BATCH_HEADERS = [
  { id: "batch_name", label: "Batch Name" },
  { id: "created_by", label: "Created By" },
  { id: "start_date", label: "Start Date" },
  { id: "end_date", label: "End Date" },
  { id: "status", label: "Status" },
  { id: "updated_on", label: "Updated On" },
  { id: "action", label: "Action", customAction: ["Delete", "Edit"] },
];

export const REPORT_HEADERS = [
  // { id: "checkbox", label: "", padding: "checkbox", selectAll: true },
  { id: "name", label: "Employee" },
  { id: "jobRole", label: "Job Role" },
  { id: "grade", label: "Status" },
  {id : "score", label: "Score"},
  { id: "action", label: "Action", customAction: "Info" },

];

export const INTERNS_DETAILS = [
  { id: "name", label: "Employee Name" },
  { id: "email", label: "Email ID" },
  { id: "jobRole", label: "Job Role" },
  { id: "released", label: "Released" },
  { id: "status", label: "Status" },
];
