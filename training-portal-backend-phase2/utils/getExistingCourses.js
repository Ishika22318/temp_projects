const _ = require('lodash');

exports.getExistingCourses = async (coursesID, findOneCourse) => {
    const presentCoursesID = [];

    // Using map to create an array of Promises
    const promises = _.map(coursesID, id => findOneCourse({ "_id": id }));

    // Wait for all Promises to resolve using Promise.all
    const results = await Promise.all(promises);

    // Loop through the results to find the existing courses
    _.forEach(results, (course, index) => {
        if (course) {
            presentCoursesID.push(coursesID[index]);
        }
    });

    return presentCoursesID;
};
