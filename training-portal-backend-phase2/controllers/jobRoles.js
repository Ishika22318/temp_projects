const { findAllJobRoles, createJobRoles, findOneJobRole, deleteJobRole } = require("../services/jobRoleService");

exports.fetchManyRoles = async (req, res, next) => {
  try {
    const jobRoles = await findAllJobRoles({});
    if (jobRoles && jobRoles.length > 0) {
      res.status(200).json({
        success: true,
        message: "Successfully fetched all Job Roles",
        data: jobRoles,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Job Roles data not found ",
        data: jobRoles,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Something went wrong!", error: error });
  }
};

exports.createOneRole = async (req, res, next) => {
  try {
    // Request Body for creation of new job roles
    const body = req.body;

    // Fetch role of the user creating a job roles
    const role = req.data.role || "Intern";

    // Appending the request body recieved
    body["createdBy"] = req.data.email || "admin@quantiphi.com";
    body["updatedOn"] = new Date();
    body["createdOn"] = new Date();

    if (role !== "Admin") {
      res.status(402).json({
        success: false,
        message: "Access denied. You are not authorized to create a job roles. Please get in touch with the admin if you believe you should have this permission.",
        data: [],
      });
    } else {
      const roleNameExists = await findOneJobRole({ roleName: body.roleName });
      if (roleNameExists && Object.keys(roleNameExists).length > 0) {
        res.status(200).json({
          success: true,
          message: "Job role name already exists. It must be a unique name",
          data: [],
        });
      } else {
        const jobRole = await createJobRoles(body);
        res.status(200).json({
          success: true,
          message: "Job role created successfully",
          data: jobRole,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Something went wrong!", error: error });
  }
};
exports.deleteJobRole = async (req, res, next) => {
  try {
    // Use your model's delete method to delete the job role by ID
    const jobRoleId = req.params.id;

    const jobExists = await findOneJobRole({ _id: jobRoleId });

    if (jobExists && Object.keys(jobExists).length > 0) {
      const deletedJobRole = await deleteJobRole(jobRoleId);

      if (deletedJobRole && deletedJobRole.deletedCount >= 1) {
        res.status(200).json({
          success: true,
          message: "Job Role deleted successfully",
          data: deletedJobRole,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Job Role not deleted ",
          data: deletedJobRole,
        });
      }
    } else {
      res.status(200).json({
        success: false,
        message: " Job Role  does not exist",
        data: course,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Something went wrong!", error: error });
  }
};
