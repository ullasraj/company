const chai = require("chai");
const expect = chai.expect;
const employeService = require("../../modules/employe/employe.service");
const fs = require("fs");
const { defaultUser } = require("./details");

describe("Employee service unit testing", () => {
  it("Should register the user", async () => {
    const res = await employeService.register(defaultUser);
    expect(res).to.have.property("id");
    expect(res.name).to.equal(defaultUser.name);
    expect(res.email).to.equal(defaultUser.email);
  });
});
