import _ from 'lodash';
import { createFilterOptions } from "@mui/material/Autocomplete";
export const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.name,

});
// refactors courses according to our needs after API call
export const refactorAllCoursesData = (data) => {
  let refactoredData = [];
  for (let singleCourse of data.data[0].data) {
    const modifiedRowData = {
      // week: "Week " + singleCourse.days[0].week,
      label: singleCourse.label,
      link: singleCourse.courseUrl,
      course: singleCourse.course
    };
    refactoredData.push(modifiedRowData);
  }
  return refactoredData
}

export const refactorAllCoursesData2= (data)=>{
  let refactoredData = [];
  for (let singleCourse of data.data[0].data) {
    const modifiedRowData = {
      week: "Week " + singleCourse.days[0].week,
      label: singleCourse.label,
      link: singleCourse.courseUrl,
      course: singleCourse.course
    };
    refactoredData.push(modifiedRowData);
  }
  return refactoredData
}


export const refactorjobRoleData = (data) => {
  return _.map(data.data, (item) => ({ _id: item._id, name: item.roleName }));
}
export const refactorBatchData = (data) => {
  return _.map(data.data, (item) => ({ _id: item._id, name: item.batch_name }));
}
export const refactorAllTrainingCoursesData = (data) => {
  let refactoredData = [];
  for (let singleCourse of data.data) {
    const email = singleCourse.createdBy
    const match = email.match(/^(.*?)\.(.*?)\d*@/);
    let fullName = '';
    if (match && match.length >= 3) {
      const firstName = match[1];
      const lastName = match[2];
      fullName = `${firstName} ${lastName}`;
    } else {
      fullName = email.split('@')[0]; // Use the part before '@' as the full name if no dot is found
    }
    const modifiedRowData = {
      // week: "Week " + singleCourse.days[0].week,
      _id: singleCourse._id,
      id: singleCourse._id,

      courseName: singleCourse.courseName,
      createdBy: fullName,
      courseStartDate: createdateObject(singleCourse.startDate),
      courseType: singleCourse.courseType,
      status: singleCourse.isActive,
      updatedOn: createdateObject(singleCourse.updatedOn),
    };
    refactoredData.push(modifiedRowData);
  }
  return refactoredData
}
const createdateObject = (timestamp) => {
  const dateObject = new Date(timestamp);
  const moment = require('moment');
  // Get the date components (year, month, day)
  const formattedDate = moment(dateObject).format('DD/MM/YYYY');
  return formattedDate;
}
// creates required object according to our needs after API call
export const refactorCourseContentData = (result) => {
  let courseUrl = result.data.courseUrl

  console.log(result.data)
  let len = result.data["days"].length - 1;
  let assessmentDescription = result.data["days"][len - 1].url ? result.data["days"][len - 1].description : undefined;
  let assignmentDescription = result.data["days"][len - 1].url ? result.data["days"][len - 1].description : undefined;
  let assessment = result.data["days"][len - 1].url ? result.data["days"][len - 1].url : undefined;
  let assignment = result.data["days"][len].url ? result.data["days"][len].url : undefined;
  let resultObject = {
    courseContent: result.data.courseContent,
    course: result.data.course,
    courseUrl: courseUrl,
    assessmentObject: {
      label: "Assessment",
      link: assessment,
      description: assessmentDescription
    },
    assignmentObject: {
      label: "Assignment",
      link: assignment,
      description: assignmentDescription
    },
    // description:description
    // assessment,
    // assignment,
  }

  return resultObject
}

// gets total topic count and subtopic count of a course
export const countTopicsAndSubtopics = (courseContentData) => {
  let topicCount = 0;
  let subtopicCount = 0;

  for (let courseContent of courseContentData.courseContent) {
    topicCount += 1;

    for (let subTopic of courseContent.subtopics) {
      subtopicCount += 1;
    }
  }
  return { topicCount, subtopicCount }
}


