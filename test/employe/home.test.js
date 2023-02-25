const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../../app");
chai.use(chaiHttp);
let token;
const { defaultUser, user } = require("./details");
describe("Home page endpoints: ", () => {
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
        token = res.body.jwt_token;
        done();
      });
  });
  it("Should access to the home page with valid", (done) => {
    chai
      .request(app)
      .post("/api/employe/home")
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it("Should not access to the home page with without token", (done) => {
    chai
      .request(app)
      .post("/api/employe/home")
      .set({ Authorization: `Bearer ` })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
  it("Should not access to the home page with with invalid token", (done) => {
    const Invalid_token = "invalid token";
    chai
      .request(app)
      .post("/api/employe/home")
      .set({ Authorization: `Bearer ${Invalid_token}` })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
});
