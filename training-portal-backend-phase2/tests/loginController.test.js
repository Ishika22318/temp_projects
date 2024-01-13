const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const loginController = require("../controllers/loginController");
const { expect } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

describe("loginController", () => {
  afterEach(() => {
    sinon.restore(); // Clear all stubs, spies, and mocks
  });

  it("Login with valid credentials", async () => {
    const req = {
      body: {
        email: "suprith@quantiphi.com",
        password: "Suprith@123",
      },
    };

    sinon.stub(User, "findOne").resolves({
      email: "suprith@quantiphi.com",
      password: "hashed_password",
      name: "Suprith",
      role: "SD",
    });

    sinon.stub(bcrypt, "compare").resolves(true);

    sinon.stub(jwt, "sign").returns("mocked_token");

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      set: sinon.stub(),
    };

    await loginController(req, res);

    expect(User.findOne).to.have.been.calledWith({ email: "suprith@quantiphi.com" });
    expect(bcrypt.compare).to.have.been.calledWith("Suprith@123", "hashed_password");
    expect(jwt.sign).to.have.been.calledWith(
      {
        email: "suprith@quantiphi.com",
        name: "Suprith",
        role: "SD",
      },
      "secret123",
      { expiresIn: "1h" }
    );
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({
      status: "ok",
      user: "mocked_token",
      role: "SD",
    });
    expect(res.set).to.have.been.calledWith("x-auth", "mocked_token");
  });

  it("Login with non-existent user", async () => {
    const req = {
      body: {
        email: "nonexistent@quantiphi.com",
        password: "SomePassword",
      },
    };

    sinon.stub(User, "findOne").resolves(null);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await loginController(req, res);

    expect(User.findOne).to.have.been.calledWith({ email: "nonexistent@quantiphi.com" });
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ status: "false", message: "user not found" });
  });
});
