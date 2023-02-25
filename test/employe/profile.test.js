const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../../app");
chai.use(chaiHttp);
const db = require("../../models");
const fs = require("fs");
let token, id;
const { defaultUser, user } = require("./details");
describe("Profile page endpoints:", () => {
  before((done) => {
    chai
      .request(app)
      .post("/api/employe/register")
      .send(defaultUser)
      .end((err, res) => {
        done();
      });
  });
  before((done) => {
    chai
      .request(app)
      .post("/api/employe/login")
      .send(user)
      .end((err, res) => {
        id = res.body.id;
        token = res.body.jwt_token;
        done();
      });
  });
  it("Should upload profile image successfully", (done) => {
    chai
      .request(app)
      .put(`/api/employe/${id}/profile`)
      .set({ Authorization: `Bearer ${token}` })
      .attach("image", fs.readFileSync(`${__dirname}/file/pic.png`), "pic.png")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it("Should not upload profile in informat file", (done) => {
    chai
      .request(app)
      .put(`/api/employe/${id}/profile`)
      .set({ Authorization: `Bearer ${token}` })
      .attach(
        "image",
        fs.readFileSync(`${__dirname}/file/test.txt`),
        "test.txt"
      )
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });
});
