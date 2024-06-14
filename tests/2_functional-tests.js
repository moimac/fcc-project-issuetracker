const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);
let testerId;
suite("Functional Tests", function () {
  this.timeout(15000);
  // Create an issue with every field: POST request to /api/issues/{project}
  test("Create an issue with every field: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/{project}")
      .send({
        issue_title: "test",
        issue_text: "test",
        created_by: "test",
        assigned_to: "test",
        status_text: "test",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, "test");
        assert.equal(res.body.issue_text, "test");
        assert.equal(res.body.created_by, "test");
        assert.equal(res.body.assigned_to, "test");
        assert.equal(res.body.status_text, "test");
        testerId = res.body._id;
        done();
      });
  });
  // Create an issue with only required fields: POST request to /api/issues/{project}
  test("Create an issue with only required fields: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/{project}")
      .send({
        issue_title: "test",
        issue_text: "test",
        created_by: "test",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, "test");
        assert.equal(res.body.issue_text, "test");
        assert.equal(res.body.created_by, "test");
        testerId = res.body._id;
        done();
      });
  });
  // Create an issue with missing required fields: POST request to /api/issues/{project}
  test("Create an issue with missing required fields: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/{project}")
      .send({})
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "required field(s) missing");
        done();
      });
  });
  // View issues on a project: GET request to /api/issues/{project}
  test("View issues on a project: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/{project}")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
  });

  // View issues on a project with one filter: GET request to /api/issues/{project}
  test("View issues on a project with one filter: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/{project}?open=true")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
  });

  // View issues on a project with multiple filters: GET request to /api/issues/{project}
  test("View issues on a project with multiple filters: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/{project}?open=true&assigned_to=test")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
  });

  // Update one field on an issue: PUT request to /api/issues/{project}
  test("Update one field on an issue: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/{project}")
      .send({
        _id: testerId,
        issue_title: "updated",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.result, "successfully updated");
        assert.equal(res.body._id, testerId);
        done();
      });
  });

  // Update multiple fields on an issue: PUT request to /api/issues/{project}
  test("Update multiple fields on an issue: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/{project}")
      .send({
        _id: testerId,
        issue_title: "updated",
        issue_text: "test",
        created_by: "updated",
        assigned_to: "test",
        status_text: "updated",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.result, "successfully updated");
        assert.equal(res.body._id, testerId);
        done();
      });
  });

  // Update an issue with missing _id: PUT request to /api/issues/{project}
  test("Update an issue with missing _id: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/{project}")
      .send({})
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "missing _id");
        done();
      });
  });

  // Update an issue with no fields to update: PUT request to /api/issues/{project}
  test("Update an issue with no fields to update: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/{project}")
      .send({
        _id: testerId,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "no update field(s) sent");
        done();
      });
  });

  // Update an issue with an invalid _id: PUT request to /api/issues/{project}
  test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/{project}")
      .send({
        _id: "5e8888888888888888888888",
        issue_title: "updated",
        issue_text: "test",
        created_by: "updated",
        assigned_to: "test",
        status_text: "updated",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "could not update");
        done();
      });
  });

  // Delete an issue: DELETE request to /api/issues/{project}
  test("Delete an issue: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/{project}")
      .send({
        _id: testerId,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.result, "successfully deleted");
        assert.equal(res.body._id, testerId);
        done();
      });
  });

  // Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
  test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/{project}")
      .send({
        _id: "5e8888888888888888888888",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "could not delete");
        done();
      });
  });

  // Delete an issue with missing _id: DELETE request to /api/issues/{project}
  test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/{project}")
      .send({})
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "missing _id");
        done();
      });
  });
});
