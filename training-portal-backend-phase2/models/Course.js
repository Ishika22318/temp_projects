// const mongoose = require("mongoose");

// // Course schema
// const CourseSchema = new mongoose.Schema({
//   startdate: {
//     type: Date,
//     // required: true,
//   },
//   Role: {
//     type: String,
//     // required: true,
//   },

//   jobRole: {
//     type: String,
//     // required: true,
//   },
//   batch: {
//     type: String,
//     // required: true,
//   },
//   data: [
//     {
//       courseDuration: {
//         type: Number,
//         // required: true,
//       },
//       course : {
//         type : String,
//           },
//       label: {
//         type: String,
//         // required: true,
//       },
//       description: {
//         type: String,
//         // required: true,
//       },
//       courseUrl: {
//         type: String,
//       },
//       days: [
//         {
//           DAY: {
//             type: Number,
//             // required: true,
//           },
//           startTime: {
//             type: String,
//             // required: true,
//           },
//           endTime: {
//             type: String,
//             // required: true,
//           },
//           label: {
//             type: String,
//             // required: true,
//           },
//           url: {
//             type: String,
//           },
//           description: {
//             type: String,
//           }
//         },
//       ],
//       courseContent: [
//         {
//           topic: {
//             type: String,
//             // required: true,
//           },
//           subtopics: [
//             {
//               type: String,
//               //   required: true,
//             },
//           ],
//         },
//       ],
//       updatedOn:{
//         type:String,
//       },
//       createdBy:{
//         type:String,
//       },
//       assignmentUrl:{
//         type:String,
//       },
//       assessmentUrl:{
//         type:String,
//       },
//       status:{
//         type:Boolean,
//       }
//     },
//   ],
// });

// module.exports = mongoose.model("Course", CourseSchema);
const mongoose = require("mongoose");

// Course schema
const CourseSchema = new mongoose.Schema({
  startdate: {
    type: Date,
    // required: true,
  },
  Role: {
    type: String,
    // required: true,
  },
  data: [
    {
      courseDuration: {
        type: Number,
        // required: true,
      },
      label: {
        type: String,
        // required: true,
      },
      description: {
        type: String,
        // required: true,
      },
      courseUrl: {
        type: String,
      },
      days: [
        {
          DAY: {
            type: Number,
            // required: true,
          },
          startTime: {
            type: String,
            // required: true,
          },
          endTime: {
            type: String,
            // required: true,
          },
          label: {
            type: String,
            // required: true,
          },
          url: {
            type: String,
          },
          description: {
            type: String,
          }
        },
      ],
      courseContent: [
        {
          topic: {
            type: String,
            // required: true,
          },
          subtopics: [
            {
              type: String,
              //   required: true,
            },
          ],
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Course", CourseSchema);
