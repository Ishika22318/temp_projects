const jobroles = require("../models/JobRoles");

// DB Query to fetch a single job role for the respective query params
exports.findOneJobRole = async (query) => {
  return await jobroles
    .findOne(query)
    .lean()
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

// DB Query to fetch all job for the respective query params
exports.findAllJobRoles = async (query) => {
  return await jobroles
    .find(query)
    .lean()
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

// DB Query to create a single job role for the respective request body
exports.createJobRoles = async (body) => {
  return await jobroles
    .create(body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
exports.deleteJobRole = async (jobRoleId) => {
  try {
    const deletedJobRole = await jobroles.deleteOne({ _id: jobRoleId });
    return deletedJobRole;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
