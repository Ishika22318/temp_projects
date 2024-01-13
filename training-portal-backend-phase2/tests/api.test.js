const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../index");

chai.use(chaiHttp);



describe("API tests", () => {
  it("GET /api/v1/reports/:id=> should return final reports when valid user ID is provided", async function () {
  

    const userId = "madhwan@quantiphi.com";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZGh3YW5AcXVhbnRpcGhpLmNvbSIsInJvbGUiOiJTRCIsImlhdCI6MTY4Nzk1NzY2N30.XwQ_8zXnk5xGCkEH5blcDxzkX0bu50NauUEn3d5F8vI";

    const response = await chai
      .request(app)
      .get(`/api/v1/reports/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("data");
    expect(response.body).to.have.property(
      "message",
      "Success. Returns the Performance Report Management data."
    );
    expect(response.body.data.averageScore).to.be.equal(3.36);

    expect(response.body.data).to.have.property("name", "Madhwan");
    const firstWeek = response.body.data.weeks[0];
    expect(firstWeek)
      .to.have.property("mentorFeedbacks")
      .that.is.an("array")
      .with.lengthOf(3);
  });

  it("GET /api/v1/reports/:id=> should return an error when invalid user ID is provided", async function () {
  

    const userId = "wrong@quantiphi.com";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZGh3YW5AcXVhbnRpcGhpLmNvbSIsInJvbGUiOiJTRCIsImlhdCI6MTY4Nzk1NzY2N30.XwQ_8zXnk5xGCkEH5blcDxzkX0bu50NauUEn3d5F8vI";

    const response = await chai
      .request(app)
      .get(`/api/v1/reports/${userId}`)
      .set("Authorization", `Bearer ${token}`); // Pass the dummy token in the request header

    expect(response).to.have.status(401);
    expect(response.body).to.have.property("error", "Unauthorized user!");
  });

  it("GET /api/v1/training => should return the courses object for the given role ", async function () {
   

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZGh3YW5AcXVhbnRpcGhpLmNvbSIsInJvbGUiOiJTRCIsImlhdCI6MTY4Nzk1NzY2N30.XwQ_8zXnk5xGCkEH5blcDxzkX0bu50NauUEn3d5F8vI";

    const response = await chai
      .request(app)
      .get(`/api/v1/training`)
      .set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("data");

    const [data] = response.body.data;
    expect(data).to.be.an("object");
    expect(data).to.have.property("completed_course");
    expect(data).to.have.property("Role");
  });

  it("GET /api/v1/training => should return no course found if there are no courses for given role", async function () {
    

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZGh3YW5AcXVhbnRpcGhpLmNvbSIsInJvbGUiOiJERSIsImlhdCI6MTY4ODM2OTM4OSwiZXhwIjoyMDAzNzI5Mzg5fQ.gti8JxzpESmnGjShowCryZdovUiaZ87Ca_AcYt-hnhw";

    const response = await chai
      .request(app)
      .get(`/api/v1/training`)
      .set("Authorization", `Bearer ${token}`); // Pass the dummy token in the request header

    expect(response).to.have.status(200);
    expect(response.body).to.have.property(
      "message",
      "No courses found for this role"
    );
    expect(response.body).to.have.property("success", true);
  });

  it("GET /api/v1/training/:course => should return the course object for the given course in URL", async function () {
   

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZGh3YW5AcXVhbnRpcGhpLmNvbSIsInJvbGUiOiJTRCIsImlhdCI6MTY4Nzk1NzY2N30.XwQ_8zXnk5xGCkEH5blcDxzkX0bu50NauUEn3d5F8vI";

    const response = await chai
      .request(app)
      .get(`/api/v1/training/HTML`)
      .set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("data");

    const data = response.body.data;
    expect(data).to.be.an("object");
    expect(data).to.have.property("label");
    expect(data).to.have.property("courseContent");
  });

  it("GET /api/v1/training/course => should return no course if the course name is wrong", async function () {
   

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZGh3YW5AcXVhbnRpcGhpLmNvbSIsInJvbGUiOiJERSIsImlhdCI6MTY4ODM2OTM4OSwiZXhwIjoyMDAzNzI5Mzg5fQ.gti8JxzpESmnGjShowCryZdovUiaZ87Ca_AcYt-hnhw";

    const response = await chai
      .request(app)
      .get(`/api/v1/training/WrongCourse`)
      .set("Authorization", `Bearer ${token}`); // Pass the dummy token in the request header

    expect(response).to.have.status(404);
    expect(response.body).to.have.property("message", "No courses found");
    expect(response.body).to.have.property("success", false);
  });





  it("GET /api/v1/batch/:id=> should return a batch details with provided batch id", async function () {
  
    const batchId = "650e7d936ec48a1b8d3ead57";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZGh3YW5AcXVhbnRpcGhpLmNvbSIsInJvbGUiOiJTRCIsImlhdCI6MTY4Nzk1NzY2N30.XwQ_8zXnk5xGCkEH5blcDxzkX0bu50NauUEn3d5F8vI";

    const response = await chai
      .request(app)
      .get(`/api/v1/batch/${batchId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("data");
  });

  it("GET /api/v1/performance/getAllUsersReports => should return all users report for admin", async function () {
  
    const token =
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZGh3YW5AcXVhbnRpcGhpLmNvbSIsInJvbGUiOiJTRCIsImlhdCI6MTY4Nzk1NzY2N30.XwQ_8zXnk5xGCkEH5blcDxzkX0bu50NauUEn3d5F8vI";
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNoaXZhbS5SYWlAcXVhbnRpcGhpLmNvbSIsIm5hbWUiOiJTaGl2YW0gUmFpIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjk4MTI3NzA0LCJleHAiOjE2OTgxNDkzMDR9.Vj-MVtOwv0ZLRv8Y8QHbNUOlfIu5P_pidljIiae-rM0"
    const response = await chai
      .request(app)
      .get(`/api/v1/performance/getAllUsersReports`)
      .set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("array");
    // expect(response.body).to.have.property("data");
    // expect(response.body).to.have.property(
    //   "message",
    //   "Success. Returns the Performance Report Management data."
    // );
    // expect(response.body.data.averageScore).to.be.equal(3.36);

    // expect(response.body.data).to.have.property("name", "Madhwan");
    // const firstWeek = response.body.data.weeks[0];
    // expect(firstWeek)
    //   .to.have.property("mentorFeedbacks")
    //   .that.is.an("array")
    //   .with.lengthOf(3);
  });

  it("GET /api/v1/performance/getInternInfo => should return single user report for admin", async function () {
  
    const token =
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZGh3YW5AcXVhbnRpcGhpLmNvbSIsInJvbGUiOiJTRCIsImlhdCI6MTY4Nzk1NzY2N30.XwQ_8zXnk5xGCkEH5blcDxzkX0bu50NauUEn3d5F8vI";
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNoaXZhbS5SYWlAcXVhbnRpcGhpLmNvbSIsIm5hbWUiOiJTaGl2YW0gUmFpIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjk4MTI3NzA0LCJleHAiOjE2OTgxNDkzMDR9.Vj-MVtOwv0ZLRv8Y8QHbNUOlfIu5P_pidljIiae-rM0"
    const response = await chai
      .request(app)
      .post(`/api/v1/performance/getInternInfo`)
      .send([])
      .set("Authorization", `Bearer ${token}`)
      

    expect(response).to.have.status(200);
    // expect(response.body).to.be.an("array");
    // expect(response.body).to.have.property("data");
    // expect(response.body).to.have.property(
    //   "message",
    //   "Success. Returns the Performance Report Management data."
    // );
    // expect(response.body.data.averageScore).to.be.equal(3.36);

    // expect(response.body.data).to.have.property("name", "Madhwan");
    // const firstWeek = response.body.data.weeks[0];
    // expect(firstWeek)
    //   .to.have.property("mentorFeedbacks")
    //   .that.is.an("array")
    //   .with.lengthOf(3);
  });



});
