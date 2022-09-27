const responseHelper = require("../../helpers");
const employeService = require("./employe.service");

exports.register = async (req, res, next) => {
  const { body } = req;
  const exists = await employeService.empCheck(body);
  if (!exists) {
    const result = await employeService.register(body);
    const { name } = result.response;
    return responseHelper.success(res, result);
    // res.send("successfully register the Employe " + name).status(200);
  }
  res.send(exists);
};
