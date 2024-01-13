const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../../index"); 

chai.use(chaiHttp);

describe("Users API tests", () => {
  
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNoaXZhbS5SYWlAcXVhbnRpcGhpLmNvbSIsIm5hbWUiOiJTaGl2YW0gUmFpIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjk3Nzk5MjY3LCJleHAiOjE2OTc4MjA4Njd9.WkSoDHsPuw7nKWRV6oWgpmT_53Z-OTxbrnjQQru_bD4";


  const testUser = {
    email: "testuser@quantiphi.com",
    name: "Test User",
    contact: "1234567890",
    batchId: "batch123",
    jobRole: "Framework Engineer",
    role: "Intern",
  };

  // Store the MongoDB ID of the created user
  let createdUserId;

  // Test GET /users
  it("GET /users => should return a list of users", async function () {
    const response = await chai
      .request(app)
      .get("/api/v1/users") // Adjust the URL based on your routes
      .set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("data");
  });

  // Test POST /users
  it("POST /users => should add a new user", async function () {
    const response = await chai
      .request(app)
      .post("/api/v1/users") // Adjust the URL based on your routes
      .set("Authorization", `Bearer ${token}`)
      .send(testUser);

    expect(response).to.have.status(200);
    expect(response.body).to.have.property("data");
    expect(response.body.data.email).to.equal(testUser.email);

    // Store the created user's MongoDB ID for later tests
    createdUserId = response.body.data._id;
  });

  // Test GET /users/{id}
  it("GET /api/v1/users/{id} => should return  information of User with unique MongoDB Id", async function () {
    const response = await chai
      .request(app)
      .get(`/api/v1/users/${createdUserId}`) // Use the ID of the user you created
      .set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(200);
    expect(response.body).to.have.property("data");
    expect(response.body.data.email).to.equal(testUser.email);
  });

  // Test PUT /users/{id}
  it("PUT /api/v1/users/{id} => should update  information of  User with unique MongoDB Id", async function () {
    const updatedUserData = { 
      name: "Madhwan Phatare Update" ,
      role: "Intern",
      profilePicture: "https://i.stack.imgur.com/l60Hf.png",
      id: "64f5eec4f5236428955d9caf",
      email: "madhwan.phadtare@quantiphi.com",
      jobRole: "Data Engineer",
      batchId: "J2J",
      addedBy: "Admin 1",
      addedDate: "2023-05-04",
      updatedDate: "2023-10-20",
      contact: "910043543534",
      status: "true",
      released: "true",
      assignedInterns: [],
      assignedMentors: [
        {
          name: "Harish S",
          email: "harish.s@quantiphi.com",
          _id: "653018ac8a1bbe8c79eaa630"
        },
        {
          name: "Moses Arepelli",
          email: "moses.arepelli@quantiphi.com",
          _id: "653276b72721c69399298e64"
        }
      ]


    };


  
    
    const response = await chai
      .request(app)
      .put(`/api/v1/users/64f5eec4f5236428955d9caf`) // Use the ID of the user you created
      .set("Authorization", `Bearer ${token}`)
      .send(updatedUserData);

    expect(response).to.have.status(200);
    expect(response.body).to.have.property("data");
   // expect(response.body.data.name).to.equal(updatedUserData.name);
  });


});
