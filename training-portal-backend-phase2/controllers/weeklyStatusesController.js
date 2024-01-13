const WeeklyStatus = require("../models/weeklyStatus");
const jobroles=require("../models/JobRoles")
const {
  getAllWeeklyStats,
  mapInternsToMentors,
  processWeeklyData,
  checkAllCompletedStatus,
  getStartAndEndDateOfWeek,
  getEndWeekOfCourse,
  sendEmailNotification,
  getSortingDataFields,
  findbySelectField } = require("../services/weeklyStatusService");
const { calculateDate, getACourseService, findAllCourse, findOneCourse, createCourse, updateCourse, deleteCourse } = require("../services/coursesService");


async function handleEmailNotification(req, res) {
  console.log(req.body);
  const mailId = req.body.email;
  const name = req.body.name;
  const internName = req.body.internName;
  let text;
  console.log(req.body,mailId,'hey')
  if (mailId === "all") {
    text = `it's an urgent reminder to please update the scores of all the interns as soon as possible`;
  } else {
    text = ` ${name} you are requested to update the scores of ${internName} as soon as possible`;
  }
  try {
    const mailReq = await sendEmailNotification(
      mailId,
      "reminder notification",
      text,
     
    );
    res.status(200).json({ success: true, message: "mail sent successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, error: "error occured, try again later" });
  }
}

async function getAllWeeklyStatues(req, res) {
  try {
    const showBatch = req.query.showBatch;
    const showRole = req.query.showRole;
    console.log(showBatch, showRole);
    const weeklyStats = await getAllWeeklyStats();
    let coursesid=[]
    if(showBatch !==null && showBatch!==undefined && showBatch!=='all'){
    const { coursesID } = await findbySelectField({_id:showBatch}, { coursesID: 1 }); 
    coursesid=coursesID
    }
    const mentorData = await mapInternsToMentors();
    const weeklyData = [];
    let itemId = 1;
    for (const weeklyItem of weeklyStats) {
      if (
        (showBatch === "all" || weeklyItem.batchId.includes(showBatch)) &&
        (showRole === "all" || showRole === weeklyItem.jobRole)
      ) {
        if (
          weeklyItem.weeklyStatus !== undefined &&
          weeklyItem.weeklyStatus !== null
        ) {
          Object.keys(weeklyItem.weeklyStatus).forEach((key) => {
            if(weeklyItem.batchId.includes(showBatch)){
              
              let temp = weeklyItem.weeklyStatus[key].filter((item)=>{
                return coursesid.includes(item.courseURL)
              })
              console.log('temp',temp)
              if (temp.length>0){
              const status = checkAllCompletedStatus(
                temp
              );
              console.log('status',status)
              const { startDate, endDate } = getStartAndEndDateOfWeek(key);
              console.log('date',startDate,endDate)
              const today = new Date();
              if (today > startDate) {
                if (
                  mentorData[weeklyItem.email] &&
                  mentorData[weeklyItem.email].length > 0
                ) {
                  // if (mentorData[weeklyItem.email].length > 0) {
                  mentorData[weeklyItem.email].map((mentor) => {
                    const Week = {
                      id: itemId++,
                      mentor: {
                        image:
                          "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-250nw-1714666150.jpg",
                        name: mentor[0],
                      },
                      intern: {
                        image:
                          "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
                        name: mentor[2],
                      },
                      status: status,
                      startDate: startDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }),
                      endDate: endDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }),
                      action: mentor[1],
                    };
                    
                    weeklyData.push(Week);
                  });
                }
              }
            }
            }else{
            const status = checkAllCompletedStatus(
              weeklyItem.weeklyStatus[key]
            );
            const { startDate, endDate } = getStartAndEndDateOfWeek(key);
            const today = new Date();
            if (today > startDate) {
              if (
                mentorData[weeklyItem.email] &&
                mentorData[weeklyItem.email].length > 0
              ) {
                // if (mentorData[weeklyItem.email].length > 0) {
                mentorData[weeklyItem.email].map((mentor) => {
                  const Week = {
                    id: itemId++,
                    mentor: {
                      image:
                        "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-250nw-1714666150.jpg",
                      name: mentor[0],
                    },
                    intern: {
                      image:
                        "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp",
                      name: mentor[2],
                    },
                    status: status,
                    startDate: startDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }),
                    endDate: endDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }),
                    action: mentor[1],
                  };
                  weeklyData.push(Week);
                });
              }
            }
          }
          });
        }
      }
    }
    console.log('datatatata',weeklyData)
    res
      .status(200)
      .json({
        success: true,
        message: "success",
        weeklyData,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function getAllCoursesStatusCount(req, res) {
  try {
    const allCoursesStatusCount = await processWeeklyData(
      req.query.showBatch,
      req.query.showRole
    );
    const fieldData=await getSortingDataFields();

    res
      .status(200)
      .json({
        success: true,
        message: "success",
        roleData:fieldData[1],
        batchData:fieldData[0],
        allCoursesStatusCount,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

const getRandomStatus = () => {
  const statuses = ["Completed", "In Progress", "Not Started"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};

async function createWeeklyStatusForUser(userData, batchId, batchFlag) {
  try {
    let userWeeklyStatus = {
      email: userData.email,
      jobRole: userData.jobRole,
      batchId:[],
      weeklyStatus: {},
    };

    if (batchId !== null && batchId !== undefined) {
      userWeeklyStatus.batchId = batchId;
    } else {
      userWeeklyStatus.batchId = userData.batchId;
    }

    if (userWeeklyStatus.batchId !== null && userWeeklyStatus.batchId !== undefined) {
      const batch = userWeeklyStatus.batchId;
      const jobRole = await jobroles.find(
        { roleName: userWeeklyStatus.jobRole },
        { projection: { _id: 1 } }
      );
      
      const jobId = jobRole[0] ? jobRole[0]._id.toString() : null;
      for (const item of batch) {
        const { coursesID, start_date } = await findbySelectField({_id:item}, { coursesID: 1, start_date: 1 });
      
      if (coursesID && coursesID.length > 0) {
       
        const courseData = await findAllCourse({ _id: coursesID });

        if (courseData && courseData.length > 0) {
          await Promise.all(courseData.map(async (course) => {       

            if(course.isActive && (course.jobRole===null || course.jobRole===jobId)){
              console.log("yes",jobId, " ", course.courseName)
              const courseLabel = course.courseName;
              const courseLink = course._id.toString();         
              const futureDate = calculateDate(start_date, course.courseStarting);
              const endWeek = getEndWeekOfCourse(futureDate, course.courseDuration);
              const weekKey = "week" + endWeek;
          
              userWeeklyStatus.weeklyStatus[weekKey] = userWeeklyStatus.weeklyStatus[weekKey] || [];
          
              const existingCourse = userWeeklyStatus.weeklyStatus[weekKey].find(
                (existingCourse) => existingCourse.courseName === courseLabel
              );
          
              if (existingCourse) {
                // Update fields if the course already exists
                Object.assign(existingCourse, { courseURL: courseLink });
                // Update other fields as needed
              } else {
                // Add the course if it doesn't exist
                userWeeklyStatus.weeklyStatus[weekKey].push({
                  courseName: courseLabel,
                  courseURL: courseLink,
                  status:getRandomStatus(),
                });
              }
            }
          }));
        }
      }
    }
    }

    // find the existing document by email and update it
    const existingWeeklyStatus = await WeeklyStatus.findOne({ email: userWeeklyStatus.email });
    if(existingWeeklyStatus){
      if (existingWeeklyStatus.weeklyStatus) {
        // Remove entries for courses that are not present in the new data
        Object.keys(existingWeeklyStatus.weeklyStatus).forEach((weekKey) => {
          existingWeeklyStatus.weeklyStatus[weekKey] = (existingWeeklyStatus.weeklyStatus[weekKey] || []).filter(
            (existingCourse) =>
              userWeeklyStatus.weeklyStatus[weekKey]?.some(
                (newCourse) => newCourse.courseName === existingCourse?.courseName
              )
          );
        });

        // Update existing courses
        Object.keys(userWeeklyStatus.weeklyStatus).forEach((weekKey) => {
          existingWeeklyStatus.weeklyStatus[weekKey] = existingWeeklyStatus.weeklyStatus[weekKey] || [];

          userWeeklyStatus.weeklyStatus[weekKey]?.forEach((newCourse) => {
            const existingCourseIndex = existingWeeklyStatus.weeklyStatus[weekKey].findIndex(
              (existingCourse) => existingCourse.courseName === newCourse.courseName
            );

            if (existingCourseIndex !== -1) {
              // Update fields for the existing course
              existingWeeklyStatus.weeklyStatus[weekKey][existingCourseIndex].courseURL = newCourse.courseURL;
              // Update other fields as needed
            } else {
              // Add the course if it doesn't exist
              existingWeeklyStatus.weeklyStatus[weekKey].push(newCourse);
            }
          });
        });

        // Remove empty weeks
        existingWeeklyStatus.weeklyStatus = Object.fromEntries(
          Object.entries(existingWeeklyStatus.weeklyStatus).filter(([_, courses]) => courses.length > 0)
        );

        existingWeeklyStatus.email = userWeeklyStatus.email;
        existingWeeklyStatus.jobRole = userWeeklyStatus.jobRole;
        existingWeeklyStatus.batchId = userWeeklyStatus.batchId;
        existingWeeklyStatus.markModified('weeklyStatus'); // Mark the field as modified
        await existingWeeklyStatus.save();
      } else if(existingWeeklyStatus){
        existingWeeklyStatus.email = userWeeklyStatus.email;
        existingWeeklyStatus.jobRole = userWeeklyStatus.jobRole;
        existingWeeklyStatus.batchId = userWeeklyStatus.batchId;
        existingWeeklyStatus.weeklyStatus=userWeeklyStatus.weeklyStatus; // Mark the field as modified
        await existingWeeklyStatus.save();
      }else{
        // Handle the case where the document doesn't exist
        const weeklyStatus = new WeeklyStatus(userWeeklyStatus);
        await weeklyStatus.save();
      }
    }else{
        // Handle the case where the document doesn't exist
        const weeklyStatus = new WeeklyStatus(userWeeklyStatus);
        await weeklyStatus.save();
      }
    // Save the weekly status to the database
    return userWeeklyStatus;
  } catch (error) {
    console.log(error)
    throw new Error("Error creating/updating weekly status: " + error.message);
  }
}


async function updateWeeklyStatusForUserOnCourse(req, res) {
  try {
    const newCourse = req.body;
    const weeklyStats = await getAllWeeklyStats();

    for (const weeklyItem of weeklyStats) {
      if (newCourse.jobRole === weeklyItem.jobRole) {
        let userWeeklyStatus;
        if (
          weeklyItem.weeklyStatus !== undefined &&
          weeklyItem.weeklyStatus !== null
        ) {
          userWeeklyStatus = weeklyItem.weeklyStatus;
        } else {
          userWeeklyStatus = {};
        }
        const id = weeklyItem._id;
        const courseLabel = newCourse.courseName;
        const endWeek = getEndWeekOfCourse(
          newCourse.courseStartdate,
          newCourse.courseDuration
        );

        const weekKey = "week" + endWeek;
        if (!userWeeklyStatus[weekKey]) {
          userWeeklyStatus[weekKey] = [];
        }

        userWeeklyStatus[weekKey].push({
          courseName: courseLabel,
          status: "Not Started", // Initial status, you can update this as needed
        });

        const updatedUserStatus = await WeeklyStatus.findByIdAndUpdate(
          id,
          { weeklyStatus: userWeeklyStatus },
          {
            new: true,
          }
        );

        if (!updatedUserStatus) {
          console.log(true);
        }
      }
    }
    // Send the response once, after the loop completes
    res.status(200).json({ success: true, message: "Added Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

module.exports = {
  createWeeklyStatusForUser,
  getAllWeeklyStatues,
  getAllCoursesStatusCount,
  updateWeeklyStatusForUserOnCourse,
  handleEmailNotification,
};
