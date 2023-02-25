const db = require("../../models");

const path = require("path");
const { MESSAGES } = require("../../config");
const {
  BadRequestException,
  UnHandledException,
} = require("../../helpers/errorResponse");
const { bcrypt, jwt, multer } = require("../../utils");

exports.register = async (employe) => {
  employe.password = await bcrypt.generatePassword(employe.password);
  const response = await db.Employe.create(employe);

  return {
    id: response.id,
    name: response.name,
    email: response.email,
  };
};

exports.login = async (employe) => {
  const result = await db.Employe.findOne({
    where: {
      email: employe.email,
    },
  });
  if (!result)
    throw new BadRequestException(MESSAGES.EMPLOYE.LOGIN.INVALID_CREDS);
  const validPassword = await bcrypt.verifyPassword(
    employe.password,
    result.password
  );
  if (!validPassword)
    throw new BadRequestException(MESSAGES.EMPLOYE.LOGIN.INVALID_CREDS);
  const token = jwt.generateToken({
    user_email: employe.email,
    user_id: result.id,
  });
  return {
    jwt_token: token,
    id: result.id,
  };
};

exports.empCheck = async (employe) => {
  let response = await db.Employe.findOne({
    where: {
      name: employe.name,
    },
  });
  if (!response) {
    response = await db.Employe.findOne({
      where: {
        email: employe.email,
      },
    });
    if (response) {
      return "Email id exists";
    }
  } else {
    return "username already exists";
  }
  return response;
};

//image storage

exports.uploaded = async (req, res, next) => {
  try {
    await multer(req, res);
    next();
  } catch (err) {
    next(err);
  }
};
exports.profile = async (id, image) => {
  const result = await db.Employe.findOne({
    where: {
      id: id,
    },
  });
  if (!result) throw new BadRequestException(MESSAGES.EMPLOYE.UPDATION.MSG);
  const response = await db.Employe.update(
    {
      profile: image.path,
    },
    { where: { id: id } }
  );
  if (!response) {
    throw new BadRequestException(MESSAGES.EMPLOYE.UPDATION.FAIL);
  }
  return {
    response,
    name: result.name,
  };
};
