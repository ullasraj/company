const express = require("express");
const router = express.Router();
const employeController = require("./employe.controller");
const validationMiddleware = require("../../middlewares/validation");
const auth = require("../../middlewares/authorization");
const employeSchema = require("./employe.validation");

const { multer } = require("../../utils");
router.post(
  "/register",
  validationMiddleware(employeSchema.register),
  employeController.register
);

router.post(
  "/login",
  validationMiddleware(employeSchema.login),
  employeController.login
);
router.post("/home", auth.validateToken, employeController.home);
router.put("/:id/profile", multer.uploadImage, employeController.upload);
// router.put(
//   "/:id/profil",
//   employeController.uploadFile,
//   employeController.upload
// );
module.exports = router;
