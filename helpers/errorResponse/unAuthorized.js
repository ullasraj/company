const { HTTP_CODES } = require("../../config");
class UnAuthorizedException extends Error {
  constructor(message) {
    super(message);
    this.type = "UnAuthorized";
    this.statusCode = HTTP_CODES.UNAUTHORIZED;
  }
}

module.exports = UnAuthorizedException;
