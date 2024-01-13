const {
  ErrorMessage,
  Successful,
  batchDates,
  Encoded_Password,
} = require('../utils/constants');

const mongoose = require('mongoose');
const userDetails = require('../services/userService');
const WeeklyStatus = require('../models/weeklyStatus');
const user = require('../models/UserModel');
const { Parser } = require('json2csv');
const { createWeeklyStatusForUser } = require('./weeklyStatusesController');
const coursesData = require('./dummyCourseData');

const csv1 = require('csvtojson');

const image = require('../utils/image_base64');

// Function to Get All Users
async function getAllUsers(req, res) {
  try {
    const users = await userDetails();

    const usersData = [];
    for (const user of users) {
      const userData = {
        role: user.role,
        profilePicture: user.profilePicture,
        id: user._id,
        email: user.email,
        name: user.name,
        jobRole: user.jobRole,
        batchId: user.batchId,
        addedBy: user.addedBy,
        addedDate: user.addedDate?.toISOString().slice(0, 10) || null,
        updatedDate: user.updatedDate?.toISOString().slice(0, 10) || null,
        contact: user.contact,
        status: user.status ? 'true' : 'false',
        released: user.released ? 'true' : 'false',
      };

      if (user.role === 'Mentor') {
        userData.assignedInterns = user.assignedInterns;
      } else if (user.role === 'Intern') {
        userData.assignedMentors = user.assignedMentors;
      }

      usersData.push(userData);
    }

    const responseObject = {
      success: true,
      message: Successful.FETCHED_SUCCESS,
      data: usersData,
    };

    res.status(200).json(responseObject);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: ErrorMessage.INTERNAL_ERROR });
  }
}

// Function to add User
async function addUser(req, res) {
  try {
    const email = req.body.email;

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      console.log('Existing User', ErrorMessage.EMAIL_EXISTS);
      return res
        .status(400)
        .json({ success: false, error: ErrorMessage.EMAIL_EXISTS });
    }
    const name = req.body.name;
    const contact = req.body.contact;
    const batchId = [];                 // 
    const role = req.body.role;
    const jobRole = req.body.jobRole;
    const profilePicture = 'data:image/jpeg;base64,' + image;
    const addedBy = req.data.name;
    const password = Encoded_Password.default_Password;
    const currentDate = new Date();
    const newUser = new user({
      email,
      name,
      contact,
      role,
      batchId,
      jobRole,
      status: true,
      released: false,
      addedDate: currentDate,
      updatedDate: currentDate,
      addedBy: addedBy,
      profilePicture,
      password,
    });

    // console.log('Shifted', newUser);
    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: Successful.SUCCESS_MESSAGE });
  } catch (error) {
    console.error('Error adding user:', error);
    res
      .status(500)
      .json({ success: false, error: ErrorMessage.INTERNAL_ERROR });
  }
}

// Function to get a single User
async function getSingleUser(req, res) {
  try {
    const userId = req.params.id;
    const initialUserData = await user.findById(userId);

    if (!initialUserData) {
      res
        .status(404)
        .json({ success: false, error: ErrorMessage.USER_NOT_FOUND });
      return;
    }

    const userData = {
      role: initialUserData.role,
      profilePicture: initialUserData.profilePicture,
      id: initialUserData._id,
      email: initialUserData.email,
      name: initialUserData.name,
      jobRole: initialUserData.jobRole,
      batchId: initialUserData.batchId,
      addedBy: initialUserData.addedBy,
      addedDate: initialUserData.addedDate?.toISOString().slice(0, 10) || null,
      updatedDate:
        initialUserData.updatedDate?.toISOString().slice(0, 10) || null,
      contact: initialUserData.contact,
      status: initialUserData.status ? 'true' : 'false',
      released: initialUserData.released ? 'true' : 'false',
      assignedInterns: initialUserData.assignedInterns,
      assignedMentors: initialUserData.assignedMentors,
    };

    const responseObject = {
      success: true,
      message: Successful.FETCHED_SUCCESS,
      data: userData,
    };

    res.status(200).json(responseObject);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: ErrorMessage.INTERNAL_ERROR });
  }
}

// Function to Update Users
async function updateUser(req, res) {
  const userId = req.params.id;
  const updatedUserData = req.body;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const initialUserData = await user.findById(userId).session(session);
      // Check if the name is being updated
      if (
        updatedUserData.name &&
        updatedUserData.name !== initialUserData.name
      ) {
        // Update the user's name
        initialUserData.name = updatedUserData.name;
        await initialUserData.save();

        // Update the user's name in associations
        async function updateAssociationsName(userEmails, updatedName) {
          for (const userEmail of userEmails) {
            const userToUpdate = await user
              .findOne({ email: userEmail })
              .session(session);
            if (userToUpdate) {
              userToUpdate.assignedMentors.forEach((mentor) => {
                if (mentor.email === initialUserData.email) {
                  mentor.name = updatedName;
                }
              });
              userToUpdate.assignedInterns.forEach((intern) => {
                if (intern.email === initialUserData.email) {
                  intern.name = updatedName;
                }
              });
              await userToUpdate.save();
            }
          }
        }

        await updateAssociationsName(
          initialUserData.assignedMentors.map((mentor) => mentor.email),
          updatedUserData.name,
        );
        await updateAssociationsName(
          initialUserData.assignedInterns.map((intern) => intern.email),
          updatedUserData.name,
        );
      }
      console.log(updatedUserData.status, typeof(updatedUserData.status))
      if(updatedUserData.status === 'false' || updatedUserData.status === false){
        const delRes = await WeeklyStatus.findOneAndUpdate(
          { email: initialUserData.email },
          { $set: { batchId: [], weeklyStatus: {} } },
        );
      }else if (
        initialUserData.role !== updatedUserData.role ||
        initialUserData.jobRole !== updatedUserData.jobRole ||
        (initialUserData.status === false && updatedUserData.status === 'true')
      ) {
        try {
          const delRes = await WeeklyStatus.findOneAndUpdate(
            { email: initialUserData.email },
            { $set: { batchId: [], weeklyStatus: {} } },
            
          );
          if (updatedUserData.role === 'Intern' && (updatedUserData.status === 'true' || updatedUserData.status === true)) {
            const userWeeklyStatus = await createWeeklyStatusForUser(
              updatedUserData,
              initialUserData.batchId,
            );
          }
        } catch (error) {
          console.error('Error updating or creating weekly status:', error);
        }
      }

      if (!initialUserData) {
        return res.status(404).json({ message: ErrorMessage.USER_NOT_FOUND });
      }
      const {
        role: initialRole,
        assignedMentors: initialMentors,
        assignedInterns: initialInterns,
        email: initialEmail,
        name: initialName,
      } = initialUserData;
      const {
        role: updatedRole,
        assignedMentors: updatedMentors,
        assignedInterns: updatedInterns,
      } = updatedUserData;

      // Determine which mentors and interns have been removed
      const removedMentors = initialMentors
        .map((mentor) => mentor.email)
        .filter(
          (mentorEmail) =>
            !updatedMentors.some((mentor) => mentor.email === mentorEmail),
        );
      const removedInterns = initialInterns
        .map((intern) => intern.email)
        .filter(
          (internEmail) =>
            !updatedInterns.some((intern) => intern.email === internEmail),
        );

      // Handle role change
      if (initialRole !== updatedRole) {
        async function updateAssignedUsers(users, email, property) {
          for (const userEmail of users.map((user) => user.email)) {
            const userToUpdate = await user
              .findOne({ email: userEmail })
              .session(session);
            if (userToUpdate) {
              userToUpdate[property] = userToUpdate[property].filter(
                (item) => item.email !== email,
              );
              await userToUpdate.save();
            }
          }
        }

        await updateAssignedUsers(
          initialMentors,
          initialEmail,
          'assignedInterns',
        );
        await updateAssignedUsers(
          initialInterns,
          initialEmail,
          'assignedMentors',
        );

        // Clear assignedInterns and assignedMentors arrays for the user
        initialUserData.assignedInterns = [];
        initialUserData.assignedMentors = [];

        initialUserData.role = updatedRole; // Set the new role

        // Save the updated user data after clearing arrays and changing the role
        const updatedUserWithClearedArraysAndRole =
          await initialUserData.save();

        // Now return the updated user data
        return res.status(200).json(updatedUserWithClearedArraysAndRole);
      }

      // Update user's data
      initialUserData.set(updatedUserData);
      initialUserData.updatedDate = new Date();

      async function updateUserData(userEmails, property, filterCallback) {
        for (const userEmail of userEmails) {
          const userToUpdate = await user
            .findOne({ email: userEmail })
            .session(session);
          if (userToUpdate) {
            userToUpdate[property] =
              userToUpdate[property].filter(filterCallback);
            await userToUpdate.save();
          }
        }
      }

      await updateUserData(
        removedMentors,
        'assignedInterns',
        (intern) => intern.email !== initialEmail,
      ); // Update mentor data for removed interns
      await updateUserData(
        removedInterns,
        'assignedMentors',
        (mentor) => mentor.email !== initialEmail,
      ); // Update intern data for removed mentors

      const updatedUser = await initialUserData.save(); // Save the updated user data

      async function addNewAssociationsIfNotExists(
        updatedData,
        initialData,
        name,
        email,
        property,
      ) {
        if (!Array.isArray(initialData)) {
          initialData = [];
        }

        for (const updatedUser of updatedData) {
          if (
            !initialData.some(
              (initialUser) => initialUser.email === updatedUser.email,
            )
          ) {
            const userToUpdate = await user
              .findOne({ email: updatedUser.email })
              .session(session);
            if (userToUpdate) {
              userToUpdate[property].push({ name: name, email: email });
              await userToUpdate.save();
            }
          }
        }
      }

      await addNewAssociationsIfNotExists(
        updatedMentors,
        initialMentors,
        initialName,
        initialEmail,
        'assignedInterns',
      );
      await addNewAssociationsIfNotExists(
        updatedInterns,
        initialInterns,
        initialName,
        initialEmail,
        'assignedMentors',
      );

      const responseObject = {
        success: true,
        message: Successful.UPDATED_SUCCESS,
        data: updatedUser,
      };

      //  return res.status(200).json(updatedUser);
      return res.status(200).json(responseObject);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: ErrorMessage.INTERNAL_ERROR });
  } finally {
    session.endSession();
  }
}

// Function to download Users CSV file
async function exportUsers(req, res) {
  try {
    let users = [];
    let userData;
    // console.log('Backend', req.body);
    if (req.body.length === 0) {
      userData = await user.find({}).exec();
    } else {
      userData = await user.find({ _id: { $in: req.body } }).exec();
    }

    userData.forEach((user) => {
      let { name, jobRole, released, addedBy, addedDate, updatedDate, status } =
        user;

      // condition for released
      released =
        released === null || released === '' || released === undefined
          ? '-'
          : released;
      // condtiton for jobRole
      jobRole =
        jobRole === null || jobRole === '' || jobRole === undefined
          ? '-'
          : jobRole;
      users.push({
        name,
        jobRole,
        released,
        addedBy,
        addedDate,
        updatedDate,
        status,
      });
    });

    const csvFields = [
      'Name',
      'jobRole',
      'released',
      'addedBy',
      'addedDate',
      'updatedDate',
      'status',
    ];
    const parser = new Parser({ csvFields });
    const csvData = parser.parse(users);
    res.setHeader('Content-Type', 'csv');
    res.setHeader('Content-Disposition', 'attachment; filename=usersData.csv');
    res.status(200).end(csvData);
  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
}

// Function to upload Users CSV file data to DB
async function importUsers(req, res) {
  try {
    // Check if any files were uploaded
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ status: 400, success: false, msg: 'No files uploaded' });
    }

    const userData = [];

    // Process each uploaded file
    for (const file of req.files) {
      const response = await csv1().fromFile(file.path);
      const currentDate = new Date();
      const addedBy = req.body.name;
      for (let x = 0; x < response.length; x++) {
        userData.push({
          email: response[x].email,
          name: response[x].name,
          contact: response[x].contact,
          role: response[x].role,
          batchId:
            response[x].batchId === undefined ? [] : response[x].batchId,
          released:
            response[x].released === undefined ? false : response[x].released,
          jobRole:
            response[x].jobRole === undefined ? null : response[x].jobRole,
          status: true,
          password: Encoded_Password.default_Password,
          profilePicture:
            'data:image/jpeg;base64,' +
            (response[x].profilePicture !== undefined
              ? response[x].profilePicture
              : image),
          addedDate: currentDate,
          updatedDate: currentDate,
          addedBy: addedBy,
        });
      }
    }
    // console.log("Batch Data to save", userData);

    // Insert all the data into MongoDB in one go
    await user.insertMany(userData);

    res.status(200).json({ status: 200, success: true, msg: 'CSVs Imported' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 400, success: false, msg: error.message });
  }
}

async function getAllBatchDates(req, res) {
  try {
    res.status(200).json({ data: batchDates });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: ErrorMessage.INTERNAL_ERROR });
  }
}

module.exports = {
  getAllUsers,
  getSingleUser,
  addUser,
  getAllBatchDates,
  updateUser,
  exportUsers,
  importUsers,
};
