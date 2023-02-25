const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const app = require("../../app");
chai.use(chaiHttp);
const db = require("../../models");
const fs = require("fs");
const { it } = require("mocha");
let token;
let defaultUser = {
  name: "ullas",
  email: "ullasraj.mec@gmail.com",
  password: "Ullas123",
};
let loginUser = {
  email: "ullasraj.mec@gmail.com",
  password: "Ullas123",
};

describe("Testing the project endpoints:", () => {
  before((done) => {
    chai
      .request(app)
      .post("/api/employe/register")
      .send(defaultUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  before((done) => {
    chai
      .request(app)
      .post("/api/employe/login")
      .send(loginUser)
      .end((err, res) => {
        token = res.body.jwt_token;
        res.should.have.status(200);
        done();
      });
  });
  after((done) => {
    db.Employe.destroy({ where: {} }).then((err) => {
      done();
    });
  });

  describe("New project creation endpoints: ", () => {
    it("It should create new project", (done) => {
      chai
        .request(app)
        .post("/api/project/new")
        .send({ name: "project1", department: "Node.js" })
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
