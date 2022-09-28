const db = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { MESSAGES } = require("../../config");
const { BadRequestException } = require("../../helpers/errorResponse");

exports.register = async (employe) => {
  const salt = await bcrypt.genSalt(10);
  employe.password = await bcrypt.hash(employe.password, salt);
  const response = await db.Employe.create(employe);
  return { response };
};

exports.login = async (employe) => {
  const result = await db.Employe.findOne({
    where: {
      email: employe.email,
    },
  });
  if (!result) throw new BadRequestException(MESSAGES.USER.LOGIN.INVALID_CREDS);
  const validPassword = await bcrypt.compare(employe.password, result.password);
  if (!validPassword)
    throw new BadRequestException(MESSAGES.USER.LOGIN.INVALID_CREDS);
  const token = jwt.sign({ user_email: employe.email }, process.env.TOKEN_KEY);
  return token;
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

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, "uploads");
  },
  filename: (req, file, next) => {
    next(null, Date.now() + path.extname(file.originalname));
  },
});

exports.uploaded = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, next) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return next(null, true);
    }
    next("give proper file format to upload");
  },
}).single("image");

exports.upload = async (req, res) => {
  console.log("hi");
};
// } multer({

//   storage: storage,
// limits: { fileSize: "1000000" },
// fileFilter: (req, file, next) => {
//   const fileTypes = /jpeg|jpg|png/;
//   const mimeType = fileTypes.test(file.mimetype);
//   const extname = fileTypes.test(path.extname(file.originalname));

//   if (mimeType && extname) {
//     return next(null, true);
//   }
//   next("give proper file format to upload");
// },
// }).single("image");
