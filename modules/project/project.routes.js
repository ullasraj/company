const express = require("express");
const router = express.Router();
const projectController = require("./project.controller");

router.post("/new", projectController.register);
router.get("/all", projectController.getAll);
router.get("/:id", projectController.project);
module.exports = router;
