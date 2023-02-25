const responseHelper = require("../../helpers");
const employeService = require("./employe.service");

exports.register = async (req, res, next) => {
  try {
    const { body } = req;

    const result = await employeService.register(body);

    return responseHelper.success(res, result);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { body } = req;
    const result = await employeService.login(body);

    res.send(result);
  } catch (error) {
    next(error);
  }
};

exports.home = async (req, res, next) => {
  res.send(req.user);
};

exports.upload = async (req, res, next) => {
  try {
    const result = await employeService.profile(req.params.id, req.file);
    return responseHelper.success(res, result);
  } catch (error) {
    next(error);
  }
};

exports.uploadFile = async (req, res, next) => {
  employeService.uploaded(req, res, (err) => {
    if (err) {
      res.status(400).send(err);
    }
    next();
  });
};
