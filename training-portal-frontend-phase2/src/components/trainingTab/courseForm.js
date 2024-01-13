const TEXT_REGEX = /^[a-zA-Z0-9&,-\s]*$/;
const NUMBER_REGEX = /^[0-9]*$/;
// const URL_REGEX = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
const URL_REGEX = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9]+(\.[-a-zA-Z0-9]+)+([/?]\S*)?$/;
function validateUrl(url) {
  console.log("URL in validateUrl:", url);

  // Test the URL against the regular expression
  if (!URL_REGEX.test(url)) {
    console.log("Invalid URL format. Please enter a valid URL.");
    return "Invalid URL format. Please enter a valid URL.";
  }

  // Parse the URL using the DOM
  var parser = document.createElement("a");
  parser.href = url;

  // Check for protocol
  if (!parser.protocol || parser.protocol === ":") {
    console.log("Missing protocol. Please include http:// or https:// in the URL.");
    return "Missing protocol. Please include http:// or https:// in the URL.";
  }

  // Check for valid domain
  if (!parser.hostname) {
    console.log("Invalid domain. Please enter a valid domain.");
    return "Invalid domain. Please enter a valid domain.";
  }

  // If all checks pass, the URL is considered valid
  console.log("Validation Result: Valid URL");
  return "Valid URL";
}
export const COURSE_FORM_LIST = [
  {
    name: "courseName",
    label: "Course Name",
    type: "text",
    isRequired: true,
    defaultValue: "",
    rules: {
      required: "Course Name is required",
      minLength: {
        value: 3,
        message: "Course Name must be at least 3 characters",
      },
      maxLength: {
        value: 72,
        message: "Course Name must be less than 72 characters",
      },
      pattern: {
        value: TEXT_REGEX,
        message: "Course Name can only alphanumeric characters,no special characters",
      },
    },
  },
  {
    name: "assignmentURL",
    label: "Assignment URL",
    type: "url",
    isRequired: true,
    defaultValue: "",
    rules: {
      validate: async (value) => {
        const trimmedValue = (value || "").trim();

        if (!trimmedValue) {
          return true;
        }

        const validationResult = validateUrl(trimmedValue);

        if (validationResult !== "Valid URL") {
          return "Invalid Assignment URL";
        }

        return true;
      },
    },
  },
  {
    name: "assessmentURL",
    label: "Assessment URL",
    type: "url",
    isRequired: true,
    defaultValue: "",
    rules: {
      validate: async (value) => {
        const trimmedValue = (value || "").trim();

        if (!trimmedValue) {
          return true;
        }

        const validationResult = validateUrl(trimmedValue);

        if (validationResult !== "Valid URL") {
          return "Invalid Assessment URL";
        }

        return true;
      },
    },
  },

  {
    name: "courseURL",
    label: "Course URL",
    type: "url",
    isRequired: true,
    defaultValue: "",
    rules: {
      validate: async (value) => {
        const trimmedValue = (value || "").trim();

        if (!trimmedValue) {
          return "Course URL is required";
        }

        const validationResult = validateUrl(trimmedValue);

        if (validationResult !== "Valid URL") {
          return "Invalid Course URL";
        }

        return true;
      },
    },
  },
  {
    name: "courseDuration",
    label: "Course Duration",
    type: "numeric",
    isRequired: true,
    defaultValue: "",
    rules: {
      required: "Course Duration is required",
      minLength: {
        value: 1,
        message: "Course Duration must be at least 1 characters",
      },
      pattern: {
        value: NUMBER_REGEX, // Use a regular expression to allow only numeric input
        message: "Course Duration must be a number",
      },
    },
    tooltipTitle: "Number of days in which the Course Should be Completed",
  },

  {
    name: "courseStarting",
    label: "Course Starting",
    type: "numeric",
    isRequired: true,
    defaultValue: "",
    rules: {
      required: "Course Starting is required",
      minLength: {
        value: 1,
        message: "Course Starting must be at least 1 characters",
      },
      pattern: {
        value: NUMBER_REGEX, // Use a regular expression to allow only numeric input
        message: "Course Starting must be a number",
      },
    },
    tooltipTitle: "Number of Days after which the course start from batch starting date",
  },
  {
    name: "courseDescription",
    label: "Course Description",
    type: "textArea",
    isRequired: true,
    defaultValue: "",
    rules: {
      required: "Course Description is required",
      minLength: {
        value: 15,
        message: "Course Description must be at least 15 characters",
      },
      maxLength: {
        value: 240,
        message: "Course Description must be less than 240 characters",
      },
    },
  },
  {
    name: "courseType",
    label: "Course Type",
    type: "select",
    isRequired: true,
    defaultValue: "",
    options: [
      { value: "Generic Training", label: "Generic Training" },
      { value: "Soft Skills Training", label: "Soft Skills Training" },
      { value: "Technical Skills Training", label: "Technical Skills Training" },
      { value: "Certification Training", label: "Certification Training" },
      // Add more options as needed
    ],
    rules: {
      required: "Course Type is required",
    },
  },
  {
    name: "isActive",
    label: "Status",
    type: "radio",
    isRequired: true,
    defaultValue: "",
    rules: {
      required: "Status is required",
    },
  },
];
export const TOPIC_FORM_LIST = [
  {
    name: "topic",
    label: "Topic",
    type: "text",
    isRequired: true,
    defaultValue: "",
    rules: {
      required: "Topic is required",
      minLength: {
        value: 3,
        message: "Topic must be at least 3 characters",
      },
      maxLength: {
        value: 72,
        message: "Topic must be less than 72 characters",
      },
      pattern: {
        value: TEXT_REGEX,
        message: "Topic can only alphanumeric characters,no special characters",
      },
    },
  },
];
export const SUBTOPIC_FORM_LIST = [
  {
    name: "subtopic",
    label: "Sub-Topic",
    type: "text",
    isRequired: true,
    defaultValue: "",
    rules: {
      required: "Subtopic is required",
      minLength: {
        value: 3,
        message: "Subtopic must be at least 3 characters",
      },
      maxLength: {
        value: 72,
        message: "Subtopic must be less than 72 characters",
      },
      pattern: {
        value: TEXT_REGEX,
        message: "Subtopic can only alphanumeric characters,no special characters",
      },
    },
  },
];
