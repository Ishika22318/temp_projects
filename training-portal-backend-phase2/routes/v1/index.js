const express = require('express');
const {
  getReports,
  getAllUsersReports,
  exportInternData,
  getTopandPoorPerformer,
} = require('../../controllers/reportController');
const {
  getAllUsers,
  addUser,
  getAllBatchDates,
  updateUser,
  exportUsers,
  importUsers,
  getSingleUser,
} = require('../../controllers/usersController');
const {
  getAllCourses,
  getACourse,
  fetchManyCourse,
  createOneCourse,
  fetchSingleCourse,
  updateOne,
  deleteCourse, exportCourses, deleteBulkCourses
} = require('../../controllers/courses');
const {
  fetchManyRoles,
  createOneRole,
  deleteJobRole,
} = require('../../controllers/jobRoles');
const {
  getAllWeeklyStatues,
  getAllCoursesStatusCount,
  updateWeeklyStatusForUserOnCourse,
  handleEmailNotification,
} = require('../../controllers/weeklyStatusesController');

const cors = require('cors');
const bodyParser = require('body-parser');
const loginController = require('../../controllers/loginController');
const { requireAuth } = require('../../middlewares/authMiddleware');
const multer = require('multer');

const {
  getAllBatches,
  getABatch,
  addBatches,
  updateBatch,
  deleteBatches,
  exportBatch,
  getCoursesNameandId,
  importBatch,
} = require('../../controllers/batchController'); 

const { fetchMany } = require('../../controllers/courses');

const router = express.Router();

router.route('/training').get(requireAuth, getAllCourses);
router.route('/training/:id').get(requireAuth, getACourse);




// CRUD routes for Courses
router.route("/course").get(requireAuth, fetchManyCourse);
router.route("/course").post(requireAuth, createOneCourse);
router.route("/course/:id").get(requireAuth, fetchSingleCourse);
router.route("/course/:id").put(requireAuth, updateOne);
router.route("/course/:id").delete(requireAuth, deleteCourse);
router.route("/export/course").post(exportCourses);
router.route("/course").delete(requireAuth, deleteBulkCourses);

// JobRoles
router.route('/job-role').get(requireAuth, fetchManyRoles);
router.route('/job-role').post(requireAuth, createOneRole);
router.route('/job-role/:id').delete(requireAuth, deleteJobRole);
router.route('/reports/:id').get(requireAuth, getReports);

// Users
router.route('/users').get(requireAuth, getAllUsers);
router.route('/users/batches-date').get(requireAuth, getAllBatchDates);
router.route('/users/:id').get(requireAuth, getSingleUser);
router.route('/users/:id').put(requireAuth, updateUser);
router.route('/users').post(requireAuth, addUser);
router.route('/export/users').post(requireAuth, exportUsers);

router.route('/weeklyStatus').get(requireAuth, getAllWeeklyStatues);
router.route('/coursesStatusCount').get(requireAuth, getAllCoursesStatusCount);
router.route('/weeklyStatusCourseAdd').post(updateWeeklyStatusForUserOnCourse);
router.route('/sendEmailNotificationAction').post(handleEmailNotification);
router.route('/login').post(loginController);
router
  .route('/performance/getAllUsersReports')
  .get(requireAuth, getAllUsersReports);
router.route('/performance/getInternInfo').post(exportInternData);
router.route('/performance/getTopandPoorPerformer').get(getTopandPoorPerformer);

// New code :
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });
router
  .route('/import/users')
  .post(requireAuth, upload.array('files'), importUsers);

router.route('/batch').get(requireAuth, getAllBatches);

router.route('/batch/:id').get(requireAuth, getABatch);

router.route('/batch').post(requireAuth, addBatches);

router.route('/batch').put(requireAuth, updateBatch);

router.route('/batch').delete(requireAuth, deleteBatches);

router.route('/batch/exportBatch').post(requireAuth, exportBatch);

router.route('/course').get(fetchMany);

router.route('/coursesNameAndId').get( getCoursesNameandId);

router.route('/job-role').get(fetchManyRoles);

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

router
  .route('/batch/importBatch')
  .post(requireAuth, upload.array('files'), importBatch);

module.exports = router;
