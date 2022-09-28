const responseHelper = require("../../helpers");
const employeService = require("./employe.service");
const multer = require("multer");

exports.register = async (req, res, next) => {
  const { body } = req;
  const exists = await employeService.empCheck(body);
  if (!exists) {
    const result = await employeService.register(body);
    // const { name } = result.response;
    return responseHelper.success(res, result);
  }
  res.send(exists);
};

exports.login = async (req, res, next) => {
  const { body } = req;
  const result = await employeService.login(body);
  res.send(result);
};

exports.home = async (req, res, next) => {
  res.send("welcome home page");
};

// exports.upload = async (req, res, next) => {
//   console.log(file);
//   const result = await employeService.upload(req);
//   res.send(result);
// };
exports.upload = async (req, res) => {
  console.log(req.file);
};

exports.uploadFile = async (req, res) => {
  const result = await employeService.uploaded(req, res, (err) => {
    if (err) {
      res.status(400).send("something wrong");
    }
    res.send(req.file);
  });
};
