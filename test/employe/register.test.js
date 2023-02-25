const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const app = require("../../app");
chai.use(chaiHttp);
const db = require("../../models");
const employeService = require("../../modules/employe/employe.service");
const fs = require("fs");
const { defaultUser } = require("./details");
let User = {
  name: "ullas",
  email: "ullas.mec@gmail.com",
};
describe("User registration endpoints: ", () => {
  it("should register user", (done) => {
    chai
      .request(app)
      .post("/api/employe/register")
      .send(defaultUser)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it("Should not register user with incomplete parameters", (done) => {
    chai
      .request(app)
      .post("/api/employe/register")
      .send(User)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });
  it("Should not register user with invalid email", (done) => {
    chai
      .request(app)
      .post("/api/employe/register")
      .send({
        name: "ullas",
        email: "ullas.com",
        password: "Ullas123",
      })
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });
});
