const mongoose = require('mongoose');
const validator = require('validator');

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //validating the email id of the user
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new error('Email is invalid');
        }
      },
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    jobRole: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    batchId: [String],
    addedBy: {
      type: String,
    },
    addedDate: {
      type: Date,
    },
    updatedDate: {
      type: Date,
    },
    released: {
      type: Boolean,
    },
    status: {
      type: Boolean,
    },
    coursesCompleted: {
      type: Number,
    },
    coursesPending: {
      type: Number,
    },
    contact: {
      type: String,
      required: true,
    },
    assignedMentors: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          unique: true,
          required: true,
          validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Email is invalid',
          },
        },
      },
    ],
    assignedInterns: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Email is invalid',
          },
        },
      },
    ],
  },
  { collection: 'user' },
);

const model = mongoose.model('UserData', User);

module.exports = model;
