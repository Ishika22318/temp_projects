const Role = {
  ADMIN: "admin",
  USER: "user",
  INTERN: "Intern",
  MENTOR: "MENTOR",
};

const ErrorMessage = {
  EMAIL_EXISTS: "Email already exists",
  INTERNAL_ERROR: "Internal Server Error",
  USER_NOT_FOUND: "User Not Found",
  TAG_LIMIT: "A user cannot be tagged to more than 4 mentors/interns",
};

const Successful = {
  SUCCESS_MESSAGE: "User added successfully to DB",
  FETCHED_SUCCESS: "User Fetched Successfully",
  UPDATED_SUCCESS: "User Updated Successfully",
};

const Reports_Constant = {
  NOT_FOUND: "Data Not found for user",
  SUCCESS: "Success. Returns the Performance Report Management data.",
  ERROR: "Error fetching project reports",
  UNAUTHORIZED: "Unauthorized user!",
};

const Encoded_Password = {
  default_Password: "$2b$10$7AR1YAjFsHvEEFTz9/AFp.Ua5ZeYxNFdvN7on8CcPUxo9iVjVcGuq",
};

const batchDates = ["Jun'23-Aug'23", "Sep'23-Nov'23", "Dec'23-Feb'24"];

module.exports = {Role, ErrorMessage, Successful, Reports_Constant, batchDates , Encoded_Password };
