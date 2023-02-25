const jwt = require("../utils/jwt");

const { UnAuthorizedException } = require("../helpers/errorResponse");
validateToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new UnauthorizedException("MESSAGES.ERRORS.TOKEN_HEADER_NOT_FOUND");
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new UnAuthorizedException("Token Required");
    const decoded = await jwt.verifyToken(token);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      throw new UnAuthorizedException("Invalid token");
    }
  } catch (err) {
    next(err);
  }
};
module.exports = { validateToken };
