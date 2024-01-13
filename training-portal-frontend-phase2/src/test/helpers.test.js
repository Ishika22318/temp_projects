// Import the function to be tested
const {
  refactorAllCoursesData,
  refactorCourseContentData,
  countTopicsAndSubtopics,
} = require('../utils/helpers');
// Sample input data
const inputData = {
  success: true,
  data: [
    {
      completed_course: 16,
      progressed_course: 1,
      total_course: 22,
      startdate: '2023-05-04',
      Role: 'SD',
      data: [
        {
          courseDuration: 2,
          label: 'technical',
          course: 'HTML',
          description: 'asdfghjkl',
          courseUrl:"http://www.google.com",
          _id: '648997d286be95a1125202e0',
          days: [
            {
              DAY: 1,
              startTime: '09:00',
              endTime: '13:00',
              label: 'COURSE',
              week: 1,
              date: '2023-05-04',
            },
            {
              DAY: 2,
              startTime: '11:00',
              endTime: '12:00',
              label: 'COURSE',
              week: 1,
              date: '2023-05-05',
            },
            {
              DAY: 2,
              label: 'ASSESSMENT',
              url: 'https://google.com',
              description:"description",
              startTime: '14:00',
              endTime: '15:00',
              week: 1,
              date: '2023-05-05',
            },
            {
              DAY: 2,
              label: 'ASSIGNMENT',
              url: 'https://google.com',
              description:"description",
              startTime: '15:00',
              endTime: '16:00',
              week: 1,
              date: '2023-05-05',
            },
          ],
          courseContent: [],
        },
      ],
    },
  ],
};
const expectedOutput = [
  {
    week: 'Week 1',
    label: 'technical',
    link: 'http://www.google.com',
    course: 'HTML'
  },
];
test('refactorAllCoursesData should refactor the input data correctly', () => {
  const result = refactorAllCoursesData(inputData);
  expect(result).toEqual(expectedOutput);
});
const inputCourseData = {
  success: true,
  data: {
    courseDuration: 2,
    label: 'technical',
    course: 'HTML',

    description: 'asdfghjkl',
    courseUrl:"https://www.google.com",
    days: [
      {
        DAY: 1,
        startTime: '09:00',
        endTime: '13:00',
        label: 'COURSE',
      },
      {
        DAY: 2,
        startTime: '11:00',
        endTime: '12:00',
        label: 'COURSE',
      },
      {
        DAY: 2,
        label: 'ASSESSMENT',
        url: 'https://google.com',
        description:"description",
        startTime: '14:00',
        endTime: '15:00',
      },
      {
        DAY: 2,
        label: 'ASSIGNMENT',
        url: 'https://google.com',
        description:"description",
        startTime: '15:00',
        endTime: '16:00',
      },
    ],
    courseContent: [
      {
        topic: 'Introduction to HTML',
        subtopics: [Array],
      },
      {
        topic: 'HTML Text Formatting',
        subtopics: [Array],
      },
      {
        topic: 'HTML Lists and Tables',
        subtopics: [Array],
      },
      {
        topic: 'HTML Forms',
        subtopics: [Array],
      },
    ],
  },
};

const expectedCourseOutput = {
  courseContent: [
    { topic: 'Introduction to HTML', subtopics: [Array] },
    { topic: 'HTML Text Formatting', subtopics: [Array] },
    { topic: 'HTML Lists and Tables', subtopics: [Array] },
    { topic: 'HTML Forms', subtopics: [Array] },
  ],
  course: 'HTML',
  courseUrl:"https://www.google.com",
    assessmentObject:  {
        description: "description",
        label: "Assessment",
        link: "https://google.com",
       },
     assignmentObject:  {
        description: "description",
         label: "Assignment",
        link: "https://google.com",
     }
};

// Test case
test('refactorAllCoursesData should refactor the input data correctly', () => {
  const result = refactorCourseContentData(inputCourseData);
  expect(result).toEqual(expectedCourseOutput);
});

const countTopicsData = {
  courseDuration: 2,
  label: 'technical',
  course: 'HTML',
  description: 'asdfghjkl',
  days: [
    {
      DAY: 1,
      startTime: '09:00',
      endTime: '13:00',
      label: 'COURSE',
      week: 1,
      date: '2023-05-04',
    },
    {
      DAY: 2,
      startTime: '11:00',
      endTime: '12:00',
      label: 'COURSE',
      week: 1,
      date: '2023-05-05',
    },
    {
      DAY: 2,
      label: 'ASSESSMENT',
      url: 'https://google.com',
      startTime: '14:00',
      endTime: '15:00',
      week: 1,
      date: '2023-05-05',
    },
    {
      DAY: 2,
      label: 'ASSIGNMENT',
      url: 'https://google.com',
      startTime: '15:00',
      endTime: '16:00',
      week: 1,
      date: '2023-05-05',
    },
  ],
  courseContent: [
    {
      topic: 'Introduction to HTML',
      subtopics: [
        'HTML syntax',
        'Basic document structure',
        'HTML tags and elements',
      ],
    },
    {
      topic: 'HTML Text Formatting',
      subtopics: [
        'Headings and paragraphs',
        'Text formatting tags',
        'Semantic markup',
      ],
    },
    {
      topic: 'HTML Lists and Tables',
      subtopics: [
        'Ordered and unordered lists',
        'Nested lists',
        'Creating tables',
        'Table headers and cells',
      ],
    },
    {
      topic: 'HTML Forms',
      subtopics: [
        'Form elements and attributes',
        'Input types (text, checkbox, radio, etc.)',
        'Form validation',
      ],
    },
  ],
};

const expectedCountOutput = {
  topicCount: 4,
  subtopicCount: 13,
};

test('refactorAllCoursesData should refactor the input data correctly', () => {
  const result = countTopicsAndSubtopics(countTopicsData);
  expect(result).toEqual(expectedCountOutput);
});
