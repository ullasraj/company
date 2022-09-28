const jwt = require("jsonwebtoken");
const { UnAuthorizedException } = require("../helpers/errorResponse");
validateToken = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) throw new UnAuthorizedException("Token Required");
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    if (decoded) {
      req.employe = decoded;
      next();
    } else {
      throw new UnAuthorizedException("Unauthorized Access!");
    }
  } catch (err) {
    next(err);
  }
};
module.exports = { validateToken };
