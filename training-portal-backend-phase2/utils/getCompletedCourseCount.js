// gives the count of total no of courses,
// total no of courses in progress,
// total no of courses completed

exports.getCompletedCourseCount = (completionStatus) => {
  let currdate = new Date();
  // change the date format
  let currentdate = currdate.toISOString().split("T")[0];

  // logic ---
  let completed_course = 0;
  let progressed_course = 0;
  for (let course of completionStatus) {
    const startDate = new Date(course.startDate);
    const start_date = startDate.toISOString().split("T")[0];
    const endDate = new Date(course.endDate);
    const end_date = endDate.toISOString().split("T")[0];
    if (start_date <= currentdate && end_date >= currentdate) {
      progressed_course += 1;
      break;
    }
    if (start_date > currentdate) {
      break;
    }

    completed_course += 1;
  }
  return {
    completed_course,
    progressed_course,
    total_course: completionStatus.length,
  };
};
