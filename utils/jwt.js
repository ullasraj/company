const { BadRequestException } = require("../helpers/errorResponse");
const jwt = require("jsonwebtoken");

exports.verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) throw new BadRequestException("invalid Token");
      resolve(decoded);
    });
  });
};
exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_KEY);
};
