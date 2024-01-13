const chai = require("chai");
const expect = chai.expect;
const mongoose = require("mongoose");
const sinon = require("sinon");
const connectionFile = require("../databaseManager");
const { url } = require("../config/env");
describe("Connection File", () => {
  describe("connectToDatabase", () => {
    let connectStub;
    let consoleLogStub;
    let consoleErrorStub;

    beforeEach(() => {
      connectStub = sinon.stub(mongoose, "connect");
      consoleLogStub = sinon.stub(console, "log");
      consoleErrorStub = sinon.stub(console, "error");
    });

    afterEach(() => {
      connectStub.restore();
      consoleLogStub.restore();
      consoleErrorStub.restore();
    });

    it("should connect to MongoDB with the correct parameters", async () => {
      const mongoURI = url;
      const connectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

      await connectionFile.connectToDatabase();

      expect(connectStub.calledOnceWithExactly(mongoURI, connectOptions)).to.be
        .true;
      expect(consoleLogStub.calledOnceWithExactly("Connected to MongoDB")).to.be
        .true;
      expect(consoleErrorStub.called).to.be.false;
    });

    it("should log an error if there is an error connecting to MongoDB", async () => {
      const error = new Error("Connection error");
      connectStub.rejects(error);

      await connectionFile.connectToDatabase();

      expect(connectStub.calledOnce).to.be.true;
      expect(consoleLogStub.called).to.be.false;
      expect(
        consoleErrorStub.calledOnceWithExactly(
          "Error connecting to MongoDB:",
          error
        )
      ).to.be.true;
    });
  });
});
