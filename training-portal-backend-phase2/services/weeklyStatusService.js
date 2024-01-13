const weeklyStatuses = require("../models/weeklyStatus");
const batch = require("../models/Batch");
const userDetails = require("./userService");
const user = require("../models/UserModel");
const { EMAIL_USER,EMAIL_PASSWORD } = require("../config/env");
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { findAllCourse } = require("./coursesService");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
    }
    });

async function sendEmailNotification(mailId,subject,text) {
  let to
  if(mailId==='all'){
    const mentorEmails = await user.find({ role: 'Mentor' }); 
    to =  mentorEmails.map((mentor) => mentor.email);
    console.log(mentorEmails,to)
    }
    else
      {
        to=mailId;
    }
  const mailOptions = {
    from: "19bcs1543@gmail.com",  // replace with your Gmail email
    to,
    subject,
    text
  };
  console.log(mailOptions)
  // Send the email
  try{
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error("Error sending mail " + error.message);
    }
    return info;
  })
}catch(err){
  throw new Error("Error  " + error.message);
}
}


async function getAllWeeklyStats() { 
  try {
    const data = await weeklyStatuses.find().exec();
    return data;
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching user details: " + error.message);
  }
}

async function getSortingDataFields() {
  try{
    // const temp = await weeklyStatuses.distinct("batchId");
    const temp = await weeklyStatuses.aggregate([
      { $unwind: "$batchId" },
      { $group: { _id: "$batchId" } },
      { $project: { _id: 0, batchId: "$_id" } }
    ]);
    
    const distinctBatchIds = temp.map(entry => entry.batchId);
    const jobRoles = await weeklyStatuses.distinct("jobRole")
    const batches = await Promise.all(distinctBatchIds
      .filter(batchId => batchId !== null && batchId !== undefined)
      .map(async (item) => {
      
      try{
      const batchData = await batch.findById(item);
     
      if (batchData) {
       
        const batchName = batchData['batch_name'];
        return  [batchName,item];
      }
    }catch(err){
      console.log(error)
    }
    }));
    
    return [batches, jobRoles]
  } catch (error) {
    throw new Error("Error fetching user details: " + error.message);
  }
}

async function mapInternsToMentors() {
    try{
        const data = await userDetails()
        const internMentorMap = {};
        data.forEach(person => {
            if (person.role === 'Intern') {
            const internEmail = person.email;
            const mentorNames = person.assignedMentors.map(mentor => [mentor.name,mentor.email,person.name]);
            internMentorMap[internEmail] = mentorNames;
            }
        });
        return internMentorMap;
    } catch (error) {
      console.log(error)
        throw new Error("Error fetching user details: " + error.message);
      }
}

async function processWeeklyData(showBatch,showRole) {
    try{
        const weeklyData = await getAllWeeklyStats()
        const courseStatusCounts = {};
    
        weeklyData.forEach(async user => {
          if((showBatch==='all' || user.batchId.includes(showBatch))&&(showRole==='all' || showRole===user.jobRole)){

            if(user.batchId.includes(showBatch)){
              const { coursesID } = await findbySelectField({_id:showBatch}, { coursesID: 1 });       
              // const courseData = await findAllCourse({ _id: coursesID });
              // const courseData = await findAllCourse({ _id: coursesID });
              // const currCourse= courseData.map((item)=>{
              //   return item.courseName
              // })
              for (const week in user.weeklyStatus) {
                user.weeklyStatus[week].forEach(course => {
                  if(coursesID.includes(course.courseURL)){  
                    const courseName = course.courseName;
                    const courseId = course.courseURL
                    const status = course.status;
            
                    if (!courseStatusCounts[courseName]) {
                        courseStatusCounts[courseName] = {
                        "Not Started": 0,
                        "In Progress": 0,
                        "Completed":0,
                        "Total": 0,
                        courseId,
                    };
                  }
                  courseStatusCounts[courseName][status]++;
                  courseStatusCounts[courseName]["Total"]++;
                }});
            }
            }else{
            for (const week in user.weeklyStatus) {
                user.weeklyStatus[week].forEach(course => {
                const courseName = course.courseName;
                const courseId = course.courseURL
                const status = course.status;
        
                if (!courseStatusCounts[courseName]) {
                    courseStatusCounts[courseName] = {
                    "Not Started": 0,
                    "In Progress": 0,
                    "Completed":0,
                    "Total": 0,
                    courseId,
                };
              }
              courseStatusCounts[courseName][status]++;
              courseStatusCounts[courseName]["Total"]++;
                });
            }
          }
          }
        });
        return courseStatusCounts;
    } catch (error) {
        throw new Error("Error fetching user details: " + error.message);
      }  
  }

//   function getWeekFromDate(dateStr,duration) {
//     try {
//         const date = new Date(dateStr);
//         if (!isNaN(date)) {
//             const dayOfWeek = date.getUTCDay() === 0 ? 7 : date.getUTCDay();
//             const dateWithMondayAsStart = new Date(date);
//             dateWithMondayAsStart.setUTCDate(date.getUTCDate() + 4 - dayOfWeek);
//             const year = dateWithMondayAsStart.getUTCFullYear();
//             const startOfYear = new Date(Date.UTC(year, 0, 1));
//             const weekNumber = Math.ceil(((dateWithMondayAsStart - startOfYear) / 86400000 + 1) / 7);
//             return weekNumber.toString().padStart(2, '0'); // Return week number as a string with leading zeros
//         } else {
//             throw new Error("Invalid date string: " + dateStr);
//         }
//     } catch (error) {
//         throw new Error("Error converting date: " + error.message);
//     }
// }
function getEndWeekOfCourse(startDateStr, duration) {
  try {
    const startDate = new Date(startDateStr);
    if (!isNaN(startDate)) {
      const startDayOfWeek = startDate.getUTCDay() === 0 ? 7 : startDate.getUTCDay();
      const workDaysRemaining = duration - (5 - startDayOfWeek) - 1;

      const weeksRequired = Math.ceil(workDaysRemaining / 5); // Calculate the number of weeks required
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getUTCDate() + workDaysRemaining + weeksRequired * 2); // Add weekends

      const year = endDate.getUTCFullYear();
      const startOfYear = new Date(Date.UTC(year, 0, 1));
      const weekNumber = Math.ceil(((endDate - startOfYear) / 86400000 + 1) / 7);

      return weekNumber.toString().padStart(2, '0') // Return week number as a string with leading zeros
    } else {
      throw new Error("Invalid start date string: " + startDateStr);
    }
  } catch (error) {
    throw new Error("Error converting start date: " + error.message);
  }
}

function getStartAndEndDateOfWeek(weekString) {
    // Extract the week number from the string (assuming it's in the format "weekXX")
    const weekNumber = parseInt(weekString.slice(4), 10);  
    if (isNaN(weekNumber) || weekNumber < 1 || weekNumber > 53) {
      throw new Error("Invalid week number.");
    }
  
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
  
    const januaryFirst = new Date(currentYear, 0, 1); // January 1st of the current year
    const daysToAdd = (weekNumber - 1) * 7; // Calculate the number of days to add to January 1st
    const startDate = new Date(januaryFirst);
    startDate.setDate(januaryFirst.getDate() + daysToAdd);
  
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // The end date is 6 days after the start date
  
    return { startDate, endDate };
  }

function checkAllCompletedStatus(statusArray) {
    const statuses =statusArray.map(item => item.status);
  
    const allCompleted = statuses.every(status => status === "Completed");
  
    return allCompleted ? "Completed" : "In Progress";
  }

  const getRandomStatus = () => {
    const statuses = ["Completed", "In Progress", "Not Started"];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  };

  // '*/2 * * * *' '0 0 * * 6' 
  cron.schedule('0 0 * * 6', async () => {
    // This function will be executed every sat 12am
   
    try {
      const weeklyStats = await getAllWeeklyStats();
  
      for (const weeklyItem of weeklyStats) {
        if (weeklyItem.weeklyStatus !== undefined && weeklyItem.weeklyStatus !== null ) {
          let userWeeklyStatus = weeklyItem.weeklyStatus;
          const id = weeklyItem._id;
          Object.keys(weeklyItem.weeklyStatus).forEach( key=> {
            // const { startDate, endDate } = getStartAndEndDateOfWeek(key);
            // const today = new Date();
            // if (today>startDate && today>endDate){
              // const temp = weeklyItem.weeklyStatus[key].map(item =>  ({courseName:item.courseName,status:"Completed"}))
              // userWeeklyStatus[key]=temp
            // }else if (today>startDate && today<endDate){
            //   const temp = weeklyItem.weeklyStatus[key].map(item =>  ({courseName:item.courseName,status:"In Progress"}))
            //   userWeeklyStatus[key]=temp
            // }
            const temp = weeklyItem.weeklyStatus[key].map(item => ({
              courseName: item.courseName,
              status: getRandomStatus(),
            }));
            
            userWeeklyStatus[key] = temp;
          });
          console.log(userWeeklyStatus)
  
           const updatedUserStatus = await weeklyStatuses.findByIdAndUpdate(id, { weeklyStatus: userWeeklyStatus }, {
            new: true,
          });
  
          if (!updatedUserStatus) {
            console.log(true);
          }
        }
      }  
      // Send the response once, after the loop completes
      // res.status(200).json({ success: true, message: "Added Successfully" });
    } catch (err) {
      console.log(err)
      // res.status(500).json({ success: false, error: "Internal Server Error" });
    }
    // Add your desired functionality here
  });
  


 async function findbySelectField (query, selectfield) {
    return await batch
      .find(query, selectfield)
      .lean()
      .then((response) => {
        return response[0];
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

    
module.exports = {
    getAllWeeklyStats,
    mapInternsToMentors,
    processWeeklyData,
    checkAllCompletedStatus,
    getStartAndEndDateOfWeek,
    getEndWeekOfCourse,
    sendEmailNotification,
    getSortingDataFields,
    findbySelectField
}
