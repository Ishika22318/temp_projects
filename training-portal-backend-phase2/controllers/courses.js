const { Parser } = require("json2csv")
const { getAllCoursesService, getACourseService, calculateDate, findAllCourse, findOneCourse, createCourse, updateCourse, deleteCourse, deleteBulkCourses } = require("../services/coursesService");
const { findbySelectField } = require("../services/batchService");
const trainingcourses = require("../models/Courses");
const { hasChanges } = require("../utils/differenceObject");
const Course = require("../models/Course")
const { getExistingCourses } = require("../utils/getExistingCourses")



// @desc       Get all courses with additional date and week details
// @route      /api/v1/training/:role -->GET
// @access     Public

exports.getAllCourses = async (req, res, next) => {
  try {
    // get the role of user from decoded token from middleware
    const role = req.data.role;

    // get all the courses
    const courses = await getAllCoursesService(role);
    if (!courses[0].data) {
      res.status(200).json({ success: true, message: "No courses found for this role" });
    } else {
      res.status(200).json({ success: true, data: courses });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: err });
  }
};

// @desc       Get single course
// @route      /api/v1/training/:role/:id -->GET
// @access     Public

exports.getACourse = async (req, res, next) => {
  try {
    // get the role of user from decode token from middleware
    const role = req.data.role;
    // get the course id
    const id = req.params.id;

    const { RoleWiseCourseData, courseIndex } = await getACourseService(role, id);

    if (RoleWiseCourseData === null || courseIndex === -1) {
      res.status(404).json({ success: false, message: "No courses found" });
    } else {
      const selectedCourse = RoleWiseCourseData[courseIndex];
      res.status(200).json({ success: true, data: selectedCourse });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: "Something went wrong!", error: err });
  }
};

exports.fetchManyCourse = async (req, res, next) => {
  try {
    // Destructuring the request query
    const { jobrole, batch } = req.query;
    const jobRole = jobrole==="null" ? null : jobrole;
    /**
     * Fetch all courses
     * Step 1: Check for request query
     *            IF jobRole & batch exist => Proceed to Step 2
     *              ELSE throw message => Parameter missing
     * Step 1: Fetch all the course IDs for a given batch
     *            IF the course exists => Proceed to Step 3
     *              ELSE throw message => No course assigned
     * Step2: Find all courses for the recieved course IDs and JobRole
     *            IF course data exists => return successful message with the data
     *              ELSE throw message => No data
     */

    if (batch) {
      const { coursesID, start_date } = await findbySelectField({ _id: batch }, { coursesID: 1, start_date: 1 });
      if (coursesID && coursesID.length > 0) {
        const course = await findAllCourse({ _id: coursesID, jobRole: jobRole });
        console.log('courseid', coursesID, 'jobrole', jobRole, 'courses', course)
        if (course && course.length > 0) {
          const resCourse = course.map((item) => {
            return {
              ...item,
              startDate: calculateDate(start_date, item.courseStarting)
            };
          });
          console.log(resCourse)
          res.status(200).json({ success: true, message: "Successfully fetched all courses", data: resCourse });
        } else {
          res.status(200).json({ success: true, message: "Course data not found ", data: course });
        }
      } else {
        res.status(200).json({ success: true, message: "Batch does not have any courses assigned", data: coursesID });
      }
    } else {
      res.status(400).json({ success: false, message: "Batch or Job Role parameter are missing", data: [] });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Something went wrong!", error: error });
  }
};

exports.fetchSingleCourse = async (req, res, next) => {
  try {
    var courseId = req.params.id;
    // const courseId = ; // Assuming the course _id is provided as a URL parameter

    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID parameter is missing" });
    }

    // Use Mongoose's findById method to find the course by its _id
    const course = await findOneCourse({ _id: courseId });

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // If the course is found, return it in the response
    res.status(200).json({ success: true, message: "Successfully fetched the course", data: course });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ success: false, message: "Something went wrong!", error: error });
  }
};

exports.createOneCourse = async (req, res, next) => {
  try {
    // Request Body for creation of new course
    const body = req.body;

    // Fetch role of the user creating a course
    const role = req.data.role || "Intern";

    // Appending the request body recieved
    body["createdBy"] = req.data.email || "admin@quantiphi.com";
    body["updatedOn"] = new Date();
    body["createdOn"] = new Date();
    body["isActive"] = true;

    /**
     * Create a new course
     * Step 1: Verifying the correct role is allowed to create a new course
     *            IF the user role is NE to Admin => throw error message => Access denied
     *              ELSE proceed to Step 2.
     * Step 2: To check the course name already exists for a given Batch and Job Profile.
     *            IF exists => throw error message => Unique course name
     *              ELSE create a new course and return successful message
     */
    if (role !== "Admin") {
      res
        .status(402)
        .json({ success: false, message: "Access denied. You are not authorized to create a course. Please get in touch with the admin if you believe you should have this permission.", data: [] });
    } else {
      const courseExists = await findOneCourse({ jobRole: body.jobRole, courseName: body.courseName });
      if (courseExists && Object.keys(courseExists).length > 0) {
        res.status(200).json({ success: true, message: "Course name already exists. It must be a unique name", data: [] });
      } else {
        const course = await createCourse(body);
        res.status(200).json({ success: true, message: "Course created successfully", data: course });
      }
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Something went wrong!", error: error });
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    // Request Body for updation of course
    const body = req.body;
    const courseID = req.params.id;

    const existingCourse = await findOneCourse({ _id: courseID });

    if (existingCourse && Object.keys(existingCourse).length > 0) {
      const isDifferent = hasChanges(existingCourse, body);
      body["updatedOn"] = new Date();

      if (isDifferent) {
        const updatedCourse = await updateCourse(courseID, body);
        res.status(200).json({ success: true, message: "Course updated successfully", data: updatedCourse });
      } else {
        res.status(200).json({ success: false, message: "No values are to be updated", data: [] });
      }
    } else {
      res.status(200).json({ success: false, message: "Course does not exist", data: [] });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Something went wrong!", error: error });
  }
};

exports.fetchMany = async (req, res, next) => {
  try {
    // Destructuring the request query
    const { jobRole, batch } = req.query;
    /**
     * Fetch all courses
     * Step 1: Check for request query
     *            IF jobRole & batch exist => Proceed to Step 2
     *              ELSE throw message => Parameter missing
     * Step 1: Fetch all the course IDs for a given batch
     *            IF the course exists => Proceed to Step 3
     *              ELSE throw message => No course assigned
     * Step2: Find all courses for the recieved course IDs and JobRole
     *            IF course data exists => return successful message with the data
     *              ELSE throw message => No data
     */
    if (jobRole && batch) {
      const { coursesID } = await findbySelectField({ batch_name: batch }, { coursesID: 1 });
      if (coursesID && coursesID.length > 0) {
        const course = await findAllCourse({ _id: coursesID, jobRole: jobRole });
        if (course && course.length > 0) {
          res.status(200).json({ success: true, message: "Successfully fetched all courses", data: course });
        } else {
          res.status(200).json({ success: true, message: "Course data not found ", data: course });
        }
      } else {
        res.status(200).json({ success: true, message: "Batch does not have any courses assigned", data: coursesID });
      }
    } else {
      res.status(400).json({ success: false, message: "Batch or Job Role parameter are missing", data: [] });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Something went wrong!", error: error });
  }
};

exports.createOne = async (req, res, next) => {
  try {
    // Request Body for creation of new course
    const body = req.body;

    // Fetch role of the user creating a course
    const role = req.data.role || "Intern";

    // Appending the request body recieved
    body["createdBy"] = req.data.email || "admin@quantiphi.com";
    body["updatedOn"] = new Date();
    body["createdOn"] = new Date();
    body["isActive"] = true;

    /**
     * Create a new course
     * Step 1: Verifying the correct role is allowed to create a new course
     *            IF the user role is NE to Admin => throw error message => Access denied
     *              ELSE proceed to Step 2.
     * Step 2: To check the course name already exists for a given Batch and Job Profile.
     *            IF exists => throw error message => Unique course name
     *              ELSE create a new course and return successful message
     */
    if (role !== "Admin") {
      res
        .status(402)
        .json({ success: false, message: "Access denied. You are not authorized to create a course. Please get in touch with the admin if you believe you should have this permission.", data: [] });
    } else {
      const courseExists = await findOneCourse({ jobRole: body.jobRole, courseName: body.courseName });
      if (courseExists && Object.keys(courseExists).length > 0) {
        res.status(200).json({ success: true, message: "Course name already exists. It must be a unique name", data: [] });
      } else {
        const course = await createCourse(body);
        res.status(200).json({ success: true, message: "Course created successfully", data: course });
      }
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Something went wrong!", error: error });
  }
};

// @desc       Delete a course by course ID
// @route      /api/v1/training/courses/:id --> DELETE
// @access     Admin
exports.deleteCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;

    // Check if the course ID is provided
    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID parameter is missing", data: [] });
    }

    // Use Mongoose's findOneCourse method to find the course by its _id
    const course = await findOneCourse({ _id: courseId });

    if (!course) {
      return res.status(200).json({ success: false, message: "Course not found", data: [] });
    }

    // Check if the user has the necessary permissions (e.g., admin)
    const userRole = req.data.role;
    if (userRole !== "Admin") {
      return res.status(200).json({ success: false, message: "Access denied. You are not authorized to delete a course. Please contact the admin for permission.", data: [] });
    }

    const data = await deleteCourse(courseId);

    if (data && data.deletedCount >= 1) {
      res.status(200).json({ success: true, message: "Course deleted successfully", data: data });
    } else {
      res.status(200).json({ success: false, message: "No course was deleted", data: data });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Something went wrong!", error: error });
  }
};

exports.deleteBulkCourses = async (req, res, next) => {
  try {
    const coursesID = req.body.coursesID;

    // Check if the course ID is provided
    if (!coursesID) {
      return res.status(400).json({ success: false, message: "Courses ID parameter is missing", data: [] });
    }

    // Check if the user has the necessary permissions (e.g., admin)
    const userRole = req.data.role;

    if (userRole !== "Admin") {
      return res.status(200).json({ success: false, message: "Access denied. You are not authorized to delete a course. Please contact the admin for permission.", data: [] });
    }

    let presentCoursesID = await getExistingCourses(coursesID, findOneCourse)

    const data = await deleteBulkCourses(presentCoursesID);

    if (data && data.deletedCount >= 1) {
      res.status(200).json({ success: true, message: "Course deleted successfully", data: data });
    } else {
      res.status(200).json({ success: false, message: "No course was deleted", data: data });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Something went wrong!", error: error });
  }
};

// Function to download courses CSV file
exports.exportCourses = async (req, res) => {
  try {
    let courses = [];
    let courseData;
    console.log('Backend', req.body);
    if (req.body.length === 0) {
      courseData = await trainingcourses.find({}).exec();
    } else {
      courseData = await trainingcourses.find({ _id: { $in: req.body } }).exec();
    }
  
    courseData.forEach((course) => {
      let {
        courseName,
        courseDescription,
        createdBy,
        courseType,
        courseDuration,
        isActive,
        updatedOn,
        details,
        createdOn,
        courseURL, 
        assessmentURL,
        assignmentURL
      } = course;
  
      // Extract topics and subtopics
      let topics = details.map((detail) => detail.topic);
      let subtopics = details.map((detail) => detail.subTopic.join(', '));
  
      courses.push({
        courseName,
        courseDescription,
        createdBy,
        courseType,
        courseDuration,
        isActive,
        updatedOn,
        createdOn,
        courseURL,
        assessmentURL,
        assignmentURL,
        topics: topics.join(', '), // Convert topics to a comma-separated string
        subtopics: subtopics.join(', '), // Convert subtopics to a comma-separated string
      });
    });
  
    const csvFields = [
      "Course Name",
      "courseDescription",
      "Created By",
      "Course Type",
      "courseDuration",
      "Is Active",
      "Updated On",
      "Created On",
      "Course URL",
      "assessmentURL",
      "assignmentURL",
      "Topics",
      "Subtopics",
    ];
    const parser = new Parser({ csvFields });
    const csvData = parser.parse(courses);
    res.setHeader('Content-Type', 'csv');
    res.setHeader('Content-Disposition', 'attachment; filename=coursesData.csv');
    res.status(200).end(csvData);
  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
}