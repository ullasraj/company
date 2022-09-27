const HTTP_CODES = require("../config/httpCodes");
const { message } = require("../modules/employe/employe.validation");

const formatResponse = (res, statusCode, message = "Success", data) =>
  res.status(statusCode).json({
    message,
    data,
  });

exports.success = (res, data, message) =>
  formatResponse(res, HTTP_CODES.OK, message, data);
