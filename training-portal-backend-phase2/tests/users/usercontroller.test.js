const assert = require("chai").assert;
const sinon = require("sinon");
const userController = require("../controllers/userController");
const User = require("../models/UserModel");
const { ErrorMessage, Successful, batchDates } = require("../utils/constants");

describe("userController", function () {
  describe("getAllUsers", function () {
    it("should return a list of users", async function () {
      const users = [{ name: "User 1" }, { name: "User 2" }];
      const userDetailsStub = sinon.stub(User, "find").resolves(users);
      const req = {};
      const res = {
        status: function (code) {
          return {
            json: function (data) {
              assert.equal(code, 200);
              assert.isTrue(data.success);
              assert.deepEqual(data.message, Successful.FETCHED_SUCCESS);
              assert.deepEqual(data.data, users);
            },
          };
        },
      };

      await userController.getAllUsers(req, res);

      userDetailsStub.restore();
    });

    it("should handle errors and return a 500 status code", async function () {
      const error = new Error("Internal server error");
      const userDetailsStub = sinon.stub(User, "find").rejects(error);
      const req = {};
      const res = {
        status: function (code) {
          return {
            json: function (data) {
              assert.equal(code, 500);
              assert.isFalse(data.success);
              assert.deepEqual(data.error, ErrorMessage.INTERNAL_ERROR);
            },
          };
        },
      };

      await userController.getAllUsers(req, res);

      userDetailsStub.restore();
    });
  });

  describe("addUser", function () {
    it("should add a new user", async function () {
      const userData = {
        email: "newuser@example.com",
        name: "New User",
        contact: "1234567890",
        batchId: "12345",
        role: "Intern",
        jobRole: "Developer",
      };
      const newUser = new User(userData);
      const saveStub = sinon.stub(newUser, "save").resolves(newUser);
      const req = {
        body: userData,
        data: { name: "Added By User" },
      };
      const res = {
        status: function (code) {
          return {
            json: function (data) {
              assert.equal(code, 200);
              assert.isTrue(data.success);
              assert.deepEqual(data.message, Successful.SUCCESS_MESSAGE);
              assert.deepEqual(data.data, newUser);
            },
          };
        },
      };

      await userController.addUser(req, res);

      saveStub.restore();
    });

    it("should handle existing user and return a 400 status code", async function () {
      const userData = {
        email: "existinguser@example.com",
        name: "Existing User",
        contact: "1234567890",
        batchId: "12345",
        role: "Intern",
        jobRole: "Developer",
      };
      const existingUser = new User(userData);
      const findOneStub = sinon.stub(User, "findOne").resolves(existingUser);
      const req = {
        body: userData,
      };
      const res = {
        status: function (code) {
          return {
            json: function (data) {
              assert.equal(code, 400);
              assert.isFalse(data.success);
              assert.deepEqual(data.error, ErrorMessage.EMAIL_EXISTS);
            },
          };
        },
      };

      await userController.addUser(req, res);

      findOneStub.restore();
    });

    it("should handle errors and return a 500 status code", async function () {
      const userData = {
        email: "newuser@example.com",
        name: "New User",
        contact: "1234567890",
        batchId: "12345",
        role: "Intern",
        jobRole: "Developer",
      };
      const newUser = new User(userData);
      const saveStub = sinon.stub(newUser, "save").rejects(new Error("Internal server error"));
      const req = {
        body: userData,
        data: { name: "Added By User" },
      };
      const res = {
        status: function (code) {
          return {
            json: function (data) {
              assert.equal(code, 500);
              assert.isFalse(data.success);
              assert.deepEqual(data.error, ErrorMessage.INTERNAL_ERROR);
            },
          };
        },
      };

      await userController.addUser(req, res);

      saveStub.restore();
    });
  });

  // You can continue adding similar test cases for other methods like getSingleUser, updateUser, exportUsers, and importUsers.
});
