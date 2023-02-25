const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const app = require("../../app");
chai.use(chaiHttp);
let token;
const { defaultUser, user } = require("./details");

let id;
describe("User login endpoints:", () => {
  before((done) => {
    chai
      .request(app)
      .post("/api/employe/register")
      .send(defaultUser)
      .end((err, res) => {
        done();
      });
  });
  it("Should not login the user with incomplete parameters", (done) => {
    chai
      .request(app)
      .post("/api/employe/login")
      .send({
        email: "ullasraj1998@gmail.com",
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("Should succssfully login user", (done) => {
    chai
      .request(app)
      .post("/api/employe/login")
      .send(user)
      .end((err, res) => {
        token = res.body.jwt_token;
        id = res.body.id;
        expect(res.status).to.equal(200);

        done();
      });
  });

  it("Should not login user with invalid credential", (done) => {
    chai
      .request(app)
      .post("/api/employe/login")
      .send({ email: "ullas.raj1ahhjh@gmail.com", password: "Ullas1" })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
});
