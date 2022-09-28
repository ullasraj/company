const express = require("express");
const router = express.Router();
const employeController = require("./employe.controller");
const validationMiddleware = require("../../middlewares/validation");
const auth = require("../../middlewares/authorization");
const employeSchema = require("./employe.validation");
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
router.patch(
  "/profile",
  employeController.uploadFile,
  employeController.upload
);
module.exports = router;
