const express = require("express");
const router = express.Router();
const employeController = require("./employe.controller");
const validationMiddleware = require("../../middlewares/validation");
const employeSchema = require("./employe.validation");
router.post(
  "/register",
  validationMiddleware(employeSchema.register),
  employeController.register
);

module.exports = router;
